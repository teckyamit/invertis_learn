const { PDFDocument, StandardFonts } = require('pdf-lib');
// Text flows across pages; no content is silently discarded. Legacy source text is not certified.
exports.createPracticePdf = async ({ subjectCode, subjectName, resourceTitle, contentSections }) => {
  const pdf=await PDFDocument.create();
  const regular=await pdf.embedFont(StandardFonts.Helvetica), bold=await pdf.embedFont(StandardFonts.HelveticaBold);
  let page, y;
  const clean=value=>String(value).replace(/[\u2010-\u2015]/g,'-').replace(/[\u2018\u2019]/g,"'").replace(/[\u201c\u201d]/g,'"').replace(/[^\x20-\x7e\n]/g,'?');
  function newPage(){page=pdf.addPage([595,842]);y=780;page.drawText('PRACTICE MATERIAL - NOT AN OFFICIAL UNIVERSITY DOCUMENT',{x:40,y:810,size:8,font:bold});}
  function write(text,size=10,font=regular){
    for(const paragraph of clean(text).split('\n')){
      let line='';
      // Split oversized tokens too, rather than drawing outside the page.
      for(const token of paragraph.split(/\s+/).flatMap(w=>w.match(/.{1,65}/g)||[''])){
        const next=line?line+' '+token:token;
        if(font.widthOfTextAtSize(next,size)>510 && line){draw(line,size,font);line=token;}else line=next;
      }
      draw(line,size,font);
    }
  }
  function draw(line,size,font){if(!page||y<55)newPage();page.drawText(line,{x:42,y,size,font});y-=size+5;}
  newPage();write(`${subjectCode}: ${subjectName}`,14,bold);write(resourceTitle,12,bold);write('Generated study aid. Verify topics and requirements with the original curriculum.');y-=10;
  for(const section of contentSections){if(y<100)newPage();write(section.heading,11,bold);for(const point of section.points)write(point);y-=8;}
  pdf.getPages().forEach((p,i)=>p.drawText(`Practice material | Page ${i+1} of ${pdf.getPageCount()}`,{x:42,y:25,size:8,font:regular}));
  return Buffer.from(await pdf.save());
};
