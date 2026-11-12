import Link from "next/link";
import { db } from "@/lib/db";
import { activeSubject } from "@/lib/resource-policy";
import { compareProgrammesByAcademicLevel } from "@/lib/academicLevels";
export const dynamic = "force-dynamic";
export const metadata = { title: "Find subjects | Invertis Learn" };
export default async function SearchPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const value = (key: string) => typeof params[key] === "string" ? params[key] as string : "";
  const q = value("q").trim().slice(0, 100), programme = value("programme"), semester = Number(value("semester"));
  const page = Math.max(1, Math.min(10000, Math.floor(Number(value("page")) || 1)));
  const where = { ...activeSubject, ...(q ? { OR: [{ code: { contains: q } }, { name: { contains: q } }] } : {}), semester: { ...(semester >= 1 && semester <= 12 ? { semesterNumber: semester } : {}), curriculumVersion: { isCurrent: true, programme: { isActive: true, department: { isActive: true }, ...(programme ? { code: programme } : {}) } } } };
  const [subjects, total, programmes] = await Promise.all([
    db.subject.findMany({ where, select: { id: true, code: true, name: true, semester: { select: { semesterNumber: true, curriculumVersion: { select: { programme: { select: { code: true, name: true } } } } } } }, orderBy: [{ code: "asc" }, { id: "asc" }], take: 24, skip: (page - 1) * 24 }),
    db.subject.count({ where }), db.programme.findMany({ where: { isActive: true, curriculumVersions: { some: { isCurrent: true } } }, select: { code: true, name: true, category: true, degreeLevel: true }, orderBy: { name: "asc" } }),
  ]);
  const sortedProgrammes = [...programmes].sort(compareProgrammesByAcademicLevel);
  const pageUrl = (n: number) => `/search?${new URLSearchParams({ q, programme, semester: value("semester"), page: String(n) })}`;
  return <div className="site-container py-10 space-y-6"><h1 className="text-3xl font-bold">Find a subject</h1>
    <form className="bg-white border rounded-xl p-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4" action="/search">
      <label>Subject name or code<input name="q" defaultValue={q} maxLength={100} className="block w-full border p-2 rounded mt-1" placeholder="Data Structures or BCS-301"/></label>
      <label>Programme<select name="programme" defaultValue={programme} className="block w-full border p-2 rounded mt-1"><option value="">All curricula</option>{sortedProgrammes.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}</select></label>
      <label>Semester<select name="semester" defaultValue={value("semester")} className="block w-full border p-2 rounded mt-1"><option value="">All semesters</option>{Array.from({length:8},(_,i)=>i+1).map(n=><option key={n}>{n}</option>)}</select></label>
      <button className="bg-blue-700 text-white rounded-lg p-2 self-end">Search</button>
    </form>
    <p role="status">{total} subjects found</p>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{subjects.map(s => <Link key={s.id} href={`/syllabus/${s.semester.curriculumVersion.programme.code}/semester/${s.semester.semesterNumber}/${s.code}`} className="bg-white rounded-xl border p-4 hover:border-blue-500"><h2 className="font-bold">{s.code} · {s.name}</h2><p className="text-sm text-slate-600 mt-2">{s.semester.curriculumVersion.programme.code} · Semester {s.semester.semesterNumber}</p></Link>)}</div>
    {!subjects.length && <p>Try a different subject code or clear the programme and semester filters.</p>}
    <nav aria-label="Search results pages" className="flex gap-6">{page > 1 && <Link href={pageUrl(page-1)}>Previous</Link>}<span>Page {page}</span>{page*24 < total && <Link href={pageUrl(page+1)}>Next</Link>}</nav>
  </div>;
}
