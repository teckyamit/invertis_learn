import Link from "next/link";
import { db } from "@/lib/db";
import { activeSubject } from "@/lib/resource-policy";
import { getSearchProgrammes } from "@/lib/catalogue";
import { Search, BookOpen, Layers, ChevronRight, Home, Filter } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = { 
  title: "Search Academic Subjects & Syllabi | Invertis Learn",
  description: "Search official course syllabi, past examination papers, faculty lecture notes, and lab manuals across Invertis University programmes by subject code or title."
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const value = (key: string) => typeof params[key] === "string" ? params[key] as string : "";
  const q = value("q").trim().slice(0, 100), programme = value("programme"), semester = Number(value("semester"));
  const page = Math.max(1, Math.min(10000, Math.floor(Number(value("page")) || 1)));

  // Normalized matching: handles "MCS102" matching "MCS-102" and vice versa
  const normalizedQ = q.replace(/[\s-]+/g, "");
  const hyphenatedQ = q.replace(/^([A-Za-z]+)[\s-]*(\d+.*)$/, "$1-$2");
  const codeVariants = Array.from(new Set([q, normalizedQ, hyphenatedQ])).filter(Boolean);

  const where = {
    ...activeSubject,
    ...(q ? {
      OR: [
        ...codeVariants.map(variant => ({ code: { contains: variant, mode: "insensitive" as const } })),
        { name: { contains: q, mode: "insensitive" as const } }
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
        <form className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4" action="/search" method="GET">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <label htmlFor="search-q" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Subject Name or Code
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input 
                  id="search-q"
                  name="q" 
                  defaultValue={q} 
                  maxLength={100} 
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" 
                  placeholder="e.g. Data Structures, BCS-301, MCS102..."
                />
              </div>
            </div>

            <div>
              <label htmlFor="search-prog" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Academic Programme
              </label>
              <select 
                id="search-prog"
                name="programme" 
                defaultValue={programme} 
                className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="">All Programmes</option>
                {sortedProgrammes.map(p => (
                  <option key={p.code} value={p.code}>{p.name} ({p.code})</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="search-sem" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Semester
              </label>
              <select 
                id="search-sem"
                name="semester" 
                defaultValue={value("semester")} 
                className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="">All Semesters</option>
                {Array.from({ length: 8 }, (_, i) => i + 1).map(n => (
                  <option key={n} value={n}>Semester {n}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span role="status" className="text-xs font-medium text-slate-500">
              Found <strong className="text-slate-900 font-bold">{total}</strong> subjects matching criteria
            </span>
            <div className="flex items-center gap-2">
              {(q || programme || value("semester")) && (
                <Link
                  href="/search"
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                >
                  Clear Filters
                </Link>
              )}
              <button 
                type="submit" 
                className="px-5 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition shadow-sm cursor-pointer"
              >
                Apply Search
              </button>
            </div>
          </div>
        </form>

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
