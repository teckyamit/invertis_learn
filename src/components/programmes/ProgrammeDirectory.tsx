"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Search, 
  GraduationCap, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  Building2, 
  ArrowRight,
  Sparkles,
  Info,
  X,
  AlertCircle,
  Wrench
} from "lucide-react";

interface Department {
  id: string;
  code: string;
  name: string;
}

interface ProgrammeItem {
  id: string;
  code: string;
  name: string;
  category: string;
  degreeLevel: string;
  durationYears: number;
  eligibility: string | null;
  specializations: string | null;
  description: string | null;
  careerProspects: string | null;
  officialSourceUrl: string | null;
  hasOfficialSyllabus: boolean;
  isLateralEntry: boolean;
  department: Department;
}

interface ProgrammeDirectoryProps {
  initialProgrammes: ProgrammeItem[];
  departments: Department[];
}

export function ProgrammeDirectory({ initialProgrammes, departments }: ProgrammeDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedDeptCode, setSelectedDeptCode] = useState<string>("ALL");
  const [onlyEngineering, setOnlyEngineering] = useState<boolean>(false);
  const [comingSoonModalProgramme, setComingSoonModalProgramme] = useState<ProgrammeItem | null>(null);

  // Helper to determine if a programme is in engineering
  const isEngineering = (p: ProgrammeItem) => {
    return p.department.code === "ENG" || p.department.name.toLowerCase().includes("engineering");
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      ALL: initialProgrammes.length,
      UNDERGRADUATE: 0,
      POSTGRADUATE: 0,
      DIPLOMA: 0,
      DOCTORAL: 0,
    };
    initialProgrammes.forEach((p) => {
      const cat = p.category || p.degreeLevel;
      if (counts[cat] !== undefined) {
        counts[cat]++;
      }
    });
    return counts;
  }, [initialProgrammes]);

  // Filtered programmes
  const filteredProgrammes = useMemo(() => {
    return initialProgrammes.filter((prog) => {
      // Engineering only filter
      if (onlyEngineering && !isEngineering(prog)) {
        return false;
      }

      // Category filter
      if (selectedCategory !== "ALL") {
        const cat = prog.category || prog.degreeLevel;
        if (cat !== selectedCategory) return false;
      }

      // Department filter
      if (selectedDeptCode !== "ALL" && prog.department.code !== selectedDeptCode) {
        return false;
      }

      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = prog.name.toLowerCase().includes(q);
        const matchesCode = prog.code.toLowerCase().includes(q);
        const matchesDept = prog.department.name.toLowerCase().includes(q);
        return matchesName || matchesCode || matchesDept;
      }

      return true;
    });
  }, [initialProgrammes, selectedCategory, selectedDeptCode, onlyEngineering, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
        {/* Search Input & Engineering Toggle */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search programmes across all faculties (e.g., Computer Science, Law, MBA, B.Pharm)..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setOnlyEngineering(!onlyEngineering)}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 shrink-0 ${
                onlyEngineering
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Engineering Only</span>
              {onlyEngineering && <span className="text-[10px] bg-white/20 px-1 rounded">Active</span>}
            </button>
          </div>
        </div>

        {/* Category Filter Pills & Department Selector */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">
              Level:
            </span>
            {(["ALL", "UNDERGRADUATE", "POSTGRADUATE", "DIPLOMA", "DOCTORAL"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
                  selectedCategory === cat
                    ? "bg-brand-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat === "ALL" ? "All Levels" : cat.charAt(0) + cat.slice(1).toLowerCase()}
                <span className="ml-1 opacity-70 text-[10px]">({categoryCounts[cat]})</span>
              </button>
            ))}
          </div>

          {/* Department Dropdown */}
          <div className="flex items-center space-x-2">
            <label htmlFor="dept-select" className="text-xs font-semibold text-slate-600 shrink-0">
              Department:
            </label>
            <select
              id="dept-select"
              value={selectedDeptCode}
              onChange={(e) => setSelectedDeptCode(e.target.value)}
              className="text-xs rounded-lg border border-slate-300 py-1.5 px-2 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 max-w-[220px]"
            >
              <option value="ALL">All Departments (9)</option>
              {departments.map((d) => (
                <option key={d.code} value={d.code}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <div>
          Showing <span className="font-bold text-slate-800">{filteredProgrammes.length}</span> of{" "}
          <span className="font-bold text-slate-800">{initialProgrammes.length}</span> university programmes
        </div>
        {(searchQuery || selectedCategory !== "ALL" || selectedDeptCode !== "ALL" || onlyEngineering) && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("ALL");
              setSelectedDeptCode("ALL");
              setOnlyEngineering(false);
            }}
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Grid of Programmes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProgrammes.map((prog) => {
          const isEng = isEngineering(prog);
          let specsList: string[] = [];
          try {
            if (prog.specializations) specsList = JSON.parse(prog.specializations);
          } catch {
            specsList = prog.specializations ? prog.specializations.split(",") : [];
          }

          return (
            <div
              key={prog.id}
              className={`bg-white rounded-xl border transition flex flex-col justify-between overflow-hidden shadow-sm ${
                isEng
                  ? "border-slate-200 hover:border-blue-300 hover:shadow-md"
                  : "border-slate-200/80 bg-slate-50/40"
              }`}
            >
              <div className="p-5">
                {/* Top Badges */}
                <div className="flex flex-wrap items-center gap-1.5 mb-3">
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wider ${
                      prog.category === "UNDERGRADUATE"
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : prog.category === "POSTGRADUATE"
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                        : prog.category === "DIPLOMA"
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-purple-50 text-purple-700 border border-purple-200"
                    }`}
                  >
                    {prog.category}
                  </span>

                  {prog.isLateralEntry && (
                    <span className="text-[10px] font-bold bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200 px-2 py-0.5 rounded">
                      Lateral Entry
                    </span>
                  )}

                  {/* Availability Badge */}
                  {isEng ? (
                    prog.hasOfficialSyllabus ? (
                      <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Syllabus Active</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded">
                        Engineering Branch
                      </span>
                    )
                  ) : (
                    <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-amber-600" />
                      <span>Coming Soon</span>
                    </span>
                  )}
                </div>

                {/* Code and Duration */}
                <div className="flex items-center space-x-2 text-xs text-slate-500 mb-2">
                  <span className="font-mono font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                    {prog.code}
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{prog.durationYears} Years Duration</span>
                  </span>
                </div>

                {/* Programme Name */}
                <h3 className="text-base font-bold text-slate-900 leading-snug mb-2">
                  {isEng ? (
                    <Link
                      href={prog.hasOfficialSyllabus ? `/syllabus/${prog.code}` : `/programmes/${prog.code}`}
                      className="hover:text-blue-600 transition"
                    >
                      {prog.name}
                    </Link>
                  ) : (
                    <button
                      onClick={() => setComingSoonModalProgramme(prog)}
                      className="text-left font-bold hover:text-amber-800 transition"
                    >
                      {prog.name}
                    </button>
                  )}
                </h3>

                {/* Department */}
                <div className="flex items-center space-x-1.5 text-xs text-slate-600 mb-3">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{prog.department.name}</span>
                </div>

                {/* Focus Specializations */}
                {specsList.length > 0 && (
                  <div className="mb-3">
                    <div className="text-[11px] font-semibold text-slate-500 mb-1">Focus Tracks:</div>
                    <div className="flex flex-wrap gap-1">
                      {specsList.slice(0, 3).map((spec, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-slate-50 text-slate-700 border border-slate-200 px-2 py-0.5 rounded"
                        >
                          {spec}
                        </span>
                      ))}
                      {specsList.length > 3 && (
                        <span className="text-[10px] text-slate-400 self-center">
                          +{specsList.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                {isEng ? (
                  prog.hasOfficialSyllabus ? (
                    <>
                      <Link
                        href={`/syllabus/${prog.code}`}
                        className="inline-flex items-center space-x-1 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg shadow-sm transition"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Browse Syllabus</span>
                      </Link>
                      <Link
                        href={`/programmes/${prog.code}`}
                        className="text-xs font-semibold text-slate-600 hover:text-blue-600"
                      >
                        Details
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href={`/programmes/${prog.code}`}
                        className="text-xs font-semibold text-slate-700 hover:text-blue-600 flex items-center space-x-1"
                      >
                        <span>View Branch Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <span className="text-[11px] text-slate-400 italic">
                        Scheme Pending
                      </span>
                    </>
                  )
                ) : (
                  <>
                    <button
                      onClick={() => setComingSoonModalProgramme(prog)}
                      className="inline-flex items-center space-x-1 text-xs font-semibold text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 px-2.5 py-1.5 rounded-lg border border-amber-200 transition"
                    >
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Coming Soon Info</span>
                    </button>
                    {prog.officialSourceUrl && (
                      <a
                        href={prog.officialSourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-slate-500 hover:text-blue-600 inline-flex items-center space-x-0.5"
                      >
                        <span>University Portal</span>
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* "Coming Soon" Information Modal for Non-Engineering Programmes */}
      {comingSoonModalProgramme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 relative">
            <button
              onClick={() => setComingSoonModalProgramme(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded uppercase">
                  Coming Soon • Next Academic Phase
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {comingSoonModalProgramme.name}
                </h3>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs text-slate-600 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Course Code:</span>
                <span className="font-mono font-bold text-slate-900">{comingSoonModalProgramme.code}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Department:</span>
                <span className="text-slate-900">{comingSoonModalProgramme.department.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Programme Duration:</span>
                <span className="text-slate-900">{comingSoonModalProgramme.durationYears} Years</span>
              </div>
              {comingSoonModalProgramme.eligibility && (
                <div className="pt-2 border-t border-slate-200">
                  <span className="font-semibold text-slate-700">Eligibility:</span>{" "}
                  <span>{comingSoonModalProgramme.eligibility}</span>
                </div>
              )}
            </div>

            <div className="bg-blue-50/70 rounded-xl p-4 border border-blue-100 text-xs text-blue-900 space-y-1.5">
              <div className="font-bold flex items-center space-x-1.5">
                <Info className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Current Release Scope Notice</span>
              </div>
              <p className="leading-relaxed">
                For the current release, all <strong>Engineering programmes (B.Tech, M.Tech, and Diploma)</strong> are fully active with isolated syllabi, past exam papers, lecture notes, and lab manuals.
              </p>
              <p className="leading-relaxed text-blue-800">
                Course schemes for {comingSoonModalProgramme.department.name} are currently undergoing official syllabus ingestion to preserve strict academic accuracy without empty pages.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <Link
                href="/engineering"
                onClick={() => setComingSoonModalProgramme(null)}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm transition"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Explore Live Engineering Curricula</span>
              </Link>

              {comingSoonModalProgramme.officialSourceUrl && (
                <a
                  href={comingSoonModalProgramme.officialSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-1 px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 transition"
                >
                  <span>Official University Page</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
