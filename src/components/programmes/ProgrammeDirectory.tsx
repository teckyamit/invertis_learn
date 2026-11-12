"use client";
import { Modal } from "@/components/ui/Modal";

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
import { 
  getProgramAdmissionConfig, 
  programSupportsLateral 
} from "@/lib/admissionModes";
import {
  compareProgrammesByAcademicLevel,
  groupProgrammesByAcademicLevel,
  ACADEMIC_LEVEL_METADATA
} from "@/lib/academicLevels";

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
  curriculumVersions?: {
    semesters: {
      id: string;
      semesterNumber: number;
      _count?: { subjects: number };
    }[];
  }[];
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

  // Category counts strictly ordered by academic priority: Diploma (1), UG (2), PG (3), Doctoral (4)
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      ALL: initialProgrammes.length,
      DIPLOMA: 0,
      UNDERGRADUATE: 0,
      POSTGRADUATE: 0,
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

  // Filtered programmes strictly ordered by academic tier: Diploma (1), UG (2), PG (3), Doctoral (4)
  const filteredProgrammes = useMemo(() => {
    const list = initialProgrammes.filter((prog) => {
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

    return [...list].sort(compareProgrammesByAcademicLevel);
  }, [initialProgrammes, selectedCategory, selectedDeptCode, onlyEngineering, searchQuery]);

  const renderProgrammeCard = (prog: ProgrammeItem) => {
    const isEng = isEngineering(prog);
    const supportsLateral = programSupportsLateral(prog.code);
    const admissionConfig = getProgramAdmissionConfig(prog.code);

    let specsList: string[] = [];
    try {
      if (prog.specializations) specsList = JSON.parse(prog.specializations);
    } catch {
      specsList = prog.specializations ? prog.specializations.split(",") : [];
    }

    const currentCurriculum = prog.curriculumVersions?.[0];
    const allSemesters = currentCurriculum?.semesters || [];
    const regularSubjectCount = allSemesters.reduce((acc, s) => acc + (s._count?.subjects ?? 0), 0);

    let lateralSubjectCount = 0;
    if (supportsLateral && admissionConfig?.lateral) {
      const latSemesters = allSemesters.filter(
        s => s.semesterNumber >= admissionConfig.lateral!.minSemester && s.semesterNumber <= admissionConfig.lateral!.maxSemester
      );
      lateralSubjectCount = latSemesters.reduce((acc, s) => acc + (s._count?.subjects ?? 0), 0);
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

            {supportsLateral && (
              <span className="text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded">
                Lateral Entry Available
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
              {supportsLateral && admissionConfig?.lateral ? (
                <span>{prog.durationYears} Years Regular • {admissionConfig.lateral.durationYears} Years Lateral</span>
              ) : (
                <span>{prog.durationYears} Years Duration</span>
              )}
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

          {/* Dual Curriculum Stats */}
          {regularSubjectCount > 0 && (
            <div className="bg-blue-50/70 border border-blue-100 rounded-lg p-2.5 text-xs text-blue-900 space-y-1 mb-3">
              <div className="font-semibold flex items-center justify-between">
                <span>Curriculum Active:</span>
                <span className="font-mono font-bold text-blue-700">
                  {supportsLateral && lateralSubjectCount > 0
                    ? `Regular: ${regularSubjectCount} • Lateral: ${lateralSubjectCount}`
                    : `${regularSubjectCount} Verified Subjects`}
                </span>
              </div>
            </div>
          )}

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

        {/* Quick Lateral Entry Link if supported */}
        {supportsLateral && (
          <div className="px-5 py-2.5 bg-purple-50/50 border-t border-purple-100 flex items-center justify-between text-[11px]">
            <span className="text-purple-900 font-medium">Looking for Lateral Entry?</span>
            <Link
              href={prog.hasOfficialSyllabus ? `/syllabus/${prog.code}?entry=lateral` : `/programmes/${prog.code}?entry=lateral`}
              className="font-bold text-purple-700 hover:text-purple-900 hover:underline flex items-center gap-0.5"
            >
              <span>Lateral Entry (Sem III–VIII)</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>
    );
  };

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
            {(["ALL", "DIPLOMA", "UNDERGRADUATE", "POSTGRADUATE", "DOCTORAL"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
                  selectedCategory === cat
                    ? "bg-brand-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat === "ALL" 
                  ? "All Levels" 
                  : cat === "DIPLOMA" 
                  ? "Diploma" 
                  : cat === "UNDERGRADUATE" 
                  ? "UG" 
                  : cat === "POSTGRADUATE" 
                  ? "PG" 
                  : "Ph.D."}
                <span className="ml-1 opacity-70 text-[10px]">({categoryCounts[cat]})</span>
              </button>
            ))}
          </div>

          {/* Department Dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:space-x-2 w-full sm:w-auto">
            <label htmlFor="dept-select" className="text-xs font-semibold text-slate-600 shrink-0">
              Department:
            </label>
            <select
              id="dept-select"
              value={selectedDeptCode}
              onChange={(e) => setSelectedDeptCode(e.target.value)}
              className="text-xs rounded-lg border border-slate-300 py-1.5 px-2 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full sm:w-auto sm:max-w-[240px]"
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

      {/* Programme Listing Sections (Separated into 4 Academic Levels) */}
      {filteredProgrammes.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <GraduationCap className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-700">No matching programmes found</h3>
          <p className="text-xs text-slate-500 mt-1">Try clearing your filters or adjusting your search query.</p>
        </div>
      ) : selectedCategory === "ALL" && !searchQuery.trim() ? (
        <div className="space-y-10">
          {groupProgrammesByAcademicLevel(filteredProgrammes).map((section) => {
            if (section.programmes.length === 0) return null;
            return (
              <section key={section.level} className="space-y-4">
                <div className={`p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${section.meta.headerBorderClass}`}>
                  <div>
                    <div className="flex items-center space-x-2.5">
                      <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        0{section.meta.priority}
                      </span>
                      <h2 className="text-lg font-bold text-slate-900">{section.meta.title}</h2>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${section.meta.badgeClass}`}>
                        {section.programmes.length} {section.programmes.length === 1 ? "Program" : "Programs"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 sm:ml-9">{section.meta.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {section.programmes.map((prog) => renderProgrammeCard(prog))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProgrammes.map((prog) => renderProgrammeCard(prog))}
        </div>
      )}

      {/* "Coming Soon" Information Modal for Non-Engineering Programmes */}
      {comingSoonModalProgramme && (
        <Modal label="Programme information" onClose={() => setComingSoonModalProgramme(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-7 shadow-2xl border border-slate-200 space-y-5 relative">
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
        </Modal>
      )}
    </div>
  );
}
