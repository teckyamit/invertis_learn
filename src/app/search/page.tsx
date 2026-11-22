import Link from "next/link";
import { db } from "@/lib/db";
import { activeSubject } from "@/lib/resource-policy";
import { getSearchProgrammes } from "@/lib/catalogue";
import { Search, BookOpen, Layers, ChevronRight, Home, Filter } from "lucide-react";
import { SearchFilterForm } from "@/components/search/SearchFilterForm";
import { getSubjectCodeVariants } from "@/lib/academic-credits";

export const dynamic = "force-dynamic";

export const metadata = { 
  title: "Search Academic Subjects & Syllabi | Invertis Learn",
  description: "Search official course syllabi, past examination papers, faculty lecture notes, and lab manuals across Invertis University programmes by subject code or title."
};

const ACRONYM_SYNONYMS: Record<string, string[]> = {
  dbms: ["Database", "DBMS"],
  os: ["Operating Systems", "Operating System"],
  cn: ["Computer Networks", "Computer Network"],
  dsa: ["Data Structures", "Data Structure", "Algorithms"],
  coa: ["Computer Organization", "Computer Architecture"],
  aca: ["Advanced Computer Architecture", "Computer Architecture"],
  daa: ["Design and Analysis of Algorithms", "Algorithms"],
  se: ["Software Engineering"],
  ai: ["Artificial Intelligence"],
  ml: ["Machine Learning"],
  toc: ["Theory of Computation", "Automata"],
  cd: ["Compiler Design"],
  cg: ["Computer Graphics"],
  cns: ["Cryptography", "Network Security"],
  wt: ["Web Technology", "Web Technologies"],
  oop: ["Object Oriented", "Java Programming"],
  oops: ["Object Oriented", "Java Programming"],
  flat: ["Formal Languages", "Automata"],
  iot: ["Internet of Things"],
  cloud: ["Cloud Computing"],
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const value = (key: string) => typeof params[key] === "string" ? params[key] as string : "";
  const q = value("q").trim().slice(0, 100), programme = value("programme"), semester = Number(value("semester"));
  const page = Math.max(1, Math.min(10000, Math.floor(Number(value("page")) || 1)));

  // Normalized matching & aliases (e.g., MCS102 <-> MCS-102, DEC351 <-> DCS-351)
  const normalizedQ = q.replace(/[\s-]+/g, "");
  const hyphenatedQ = q.replace(/^([A-Za-z]+)[\s-]*(\d+.*)$/, "$1-$2");
  const codeVariants = Array.from(new Set([q, normalizedQ, hyphenatedQ, ...getSubjectCodeVariants(q)])).filter(Boolean);
  const synonyms = ACRONYM_SYNONYMS[q.toLowerCase()] || [];

  const where = {
    ...activeSubject,
    ...(q ? {
      OR: [
        ...codeVariants.map(variant => ({ code: { contains: variant, mode: "insensitive" as const } })),
        { name: { contains: q, mode: "insensitive" as const } },
        ...synonyms.map(syn => ({ name: { contains: syn, mode: "insensitive" as const } }))
      ]
    } : {}),
    semester: {
      ...(semester >= 1 && semester <= 12 ? { semesterNumber: semester } : {}),
      curriculumVersion: {
        isCurrent: true,
        programme: { isActive: true, department: { isActive: true }, ...(programme ? { code: programme } : {}) }
      }
    }
  };

  const [subjects, total, sortedProgrammes] = await Promise.all([
    db.subject.findMany({ 
      where, 
      select: { 
        id: true, 
        code: true, 
        name: true, 
        credits: true,
        subjectType: true,
        semester: { 
          select: { 
            semesterNumber: true, 
            curriculumVersion: { 
              select: { 
                programme: { 
                  select: { 
                    code: true, 
                    name: true 
                  } 
                } 
              } 
            } 
          } 
        } 
      }, 
      orderBy: [{ code: "asc" }, { id: "asc" }], 
      take: 24, 
      skip: (page - 1) * 24 
    }),
    db.subject.count({ where }),
    getSearchProgrammes(),
  ]);

  const pageUrl = (n: number) => `/search?${new URLSearchParams({ q, programme, semester: value("semester"), page: String(n) })}`;

  return (
    <div className="w-full min-h-screen py-8 sm:py-12 bg-slate-50/50">
      <div className="site-container space-y-6 sm:space-y-8">
        {/* Navigation Breadcrumbs */}
        <nav aria-label="Breadcrumbs" className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition inline-flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">Search Subjects</span>
        </nav>

        {/* Search Header */}
        <div className="card-hero bg-white border border-slate-200 p-6 md:p-8 rounded-2xl shadow-sm space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-bold uppercase tracking-wider">
            <Search className="w-3.5 h-3.5 text-blue-600" />
            <span>Academic Resource Discovery</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Find Academic Subjects &amp; Syllabi
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            Search 370+ active subjects across diploma, undergraduate, lateral entry, postgraduate, and doctoral curricula. 
            Supports natural search by subject title or code (e.g. <span className="font-mono text-slate-800">BCS-301</span>, <span className="font-mono text-slate-800">MCS102</span>, or <span className="font-mono text-slate-800">Data Structures</span>).
          </p>
        </div>

        {/* Filter & Search Form */}
        <SearchFilterForm
          initialQ={q}
          initialProgramme={programme}
          initialSemester={value("semester")}
          programmes={sortedProgrammes}
          total={total}
        />

        {/* Results Grid */}
        {subjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map(s => {
              const progCode = s.semester.curriculumVersion.programme.code;
              const semNum = s.semester.semesterNumber;
              return (
                <Link 
                  key={s.id} 
                  href={`/syllabus/${encodeURIComponent(progCode)}/semester/${semNum}/${encodeURIComponent(s.code)}`} 
                  className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-blue-500 hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold px-2.5 py-0.5 bg-slate-900 text-white rounded-md tracking-wider">
                        {s.code}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        {s.subjectType}
                      </span>
                    </div>
                    <h2 className="font-heading font-bold text-slate-900 group-hover:text-blue-600 transition text-sm sm:text-base leading-snug">
                      {s.name}
                    </h2>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>{progCode} • Sem {semNum}</span>
                    <span className="font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      Explore <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No matching subjects found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try a different spelling, alternate subject code, or clear the programme and semester filters to expand your search.
            </p>
            <Link
              href="/search"
              className="inline-flex items-center px-4 py-2 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition mt-2"
            >
              Reset All Filters
            </Link>
          </div>
        )}

        {/* Pagination Navigation */}
        {total > 24 && (
          <nav aria-label="Search results pagination" className="flex items-center justify-between pt-4 border-t border-slate-200 text-xs">
            {page > 1 ? (
              <Link href={pageUrl(page - 1)} className="px-4 py-2 font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                ← Previous Page
              </Link>
            ) : <div />}

            <span className="font-medium text-slate-600">
              Page <strong className="text-slate-900">{page}</strong> of <strong className="text-slate-900">{Math.ceil(total / 24)}</strong>
            </span>

            {page * 24 < total ? (
              <Link href={pageUrl(page + 1)} className="px-4 py-2 font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                Next Page →
              </Link>
            ) : <div />}
          </nav>
        )}
      </div>
    </div>
  );
}
