import { test, expect } from "@playwright/test";
import { PDFDocument } from "pdf-lib";

test("mobile navigation, search, and dialog keyboard behavior", async ({ page }) => {
  const errors: string[]=[];page.on("pageerror",error=>errors.push(error.message));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("heading",{level:1})).toBeVisible();
  await page.getByRole("button",{name:"Toggle navigation menu"}).click();
  await page.getByRole("link",{name:"Engineering",exact:true}).first().click();
  await expect(page).toHaveURL(/engineering/);
  await page.goto("/search?q=BCS-301&programme=BTECH-CSE&semester=3");
  await page.getByRole("link",{name:/BCS-301.*Data Structures/}).click();
  await page.getByRole("button",{name:"Upload Question Paper",exact:true}).click();
  const dialog=page.getByRole("dialog",{name:"Submit question paper"});
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");await expect(dialog).not.toBeVisible();
  await expect(page.getByRole("button",{name:"Upload Question Paper",exact:true})).toBeFocused();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBeTruthy();
  expect(errors).toEqual([]);
});

test("curator submission stays private until reviewed and can be withdrawn", async ({ page, request, baseURL }) => {
  await page.goto("/admin");
  await page.getByLabel("Curator access key").fill("isolated-browser-tests-only-00000000000000000000");
  await page.getByRole("button",{name:"Sign in",exact:true}).click();
  await expect(page.getByRole("button",{name:"Sign out"})).toBeVisible();
  const api=page.request;
  const current=await (await api.get("/api/admin/resources?pending=false")).json();
  // Public listing exposes subject IDs, not credentials.
  const papers=await (await request.get("/api/pyq?limit=1")).json();
  const subjectId=papers.pyqs[0].subjectId;
  const origin={origin:baseURL!};
  const fields={subjectId,title:"Regression practice paper",academicYear:"2026-2027",examType:"END_SEMESTER",hasSolutions:"false",sourceReference:"Isolated regression fixture"};
  const invalid=await api.post("/api/pyq",{headers:origin,multipart:{...fields,file:{name:"fake.pdf",mimeType:"application/pdf",buffer:Buffer.from("Not a PDF")}}});expect(invalid.status()).toBe(400);
  const large=await api.post("/api/pyq",{headers:origin,multipart:{...fields,file:{name:"large.pdf",mimeType:"application/pdf",buffer:Buffer.alloc(10*1024*1024+1)}}});expect(large.status()).toBe(413);
  const pdf=await PDFDocument.create();pdf.addPage();const bytes=Buffer.from(await pdf.save());
  const upload=await api.post("/api/pyq",{headers:origin,multipart:{...fields,file:{name:"fixture.pdf",mimeType:"application/pdf",buffer:bytes}}});expect(upload.status()).toBe(201);
  const {id}=await upload.json();
  expect((await request.get(`/api/pyq/download?id=${id}`)).status()).toBe(404);
  const pending=await (await api.get("/api/admin/resources?pending=true")).json();
  const resource=pending.resources.find((r:{id:string})=>r.id===id);expect(resource).toBeTruthy();
  expect((await request.get('/'+resource.storagePath)).status()).toBe(404);
  expect((await api.get(`/api/pyq/download?id=${id}`)).status()).toBe(200);
  const review={id,publish:true,provenanceStatus:"PRACTICE",sourceReference:"Isolated regression fixture",reviewedBy:"Regression curator",reviewNote:"PDF reviewed as practice test fixture"};
  expect((await api.patch("/api/admin/resources",{headers:{origin:"https://foreign.example"},data:review})).status()).toBe(403);
  expect((await api.patch("/api/admin/resources",{headers:origin,data:review})).status()).toBe(200);
  expect((await request.get(`/api/pyq/download?id=${id}`)).status()).toBe(200);
  expect((await request.get('/'+resource.storagePath)).status()).toBe(200);
  expect((await api.patch("/api/admin/resources",{headers:origin,data:{...review,publish:false}})).status()).toBe(200);
  expect((await request.get('/'+resource.storagePath)).status()).toBe(404);
  expect((await request.get(`/api/pyq/download?id=${id}`)).status()).toBe(404);
  expect(current.total).toBeGreaterThan(0);
});

test("lateral-entry resource navigation works at desktop and mobile widths",async({page})=>{
  for(const width of [390,768,1440]){
    await page.setViewportSize({width,height:900});
    for(const family of ['notes','labs','pyq']){
      const response=await page.goto(`/${family}/BTECH-CSE-LE/semester/3`);expect(response?.status()).toBe(200);
      await expect(page.getByRole('heading',{level:1})).toBeVisible();
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBeTruthy();
    }
  }
});
