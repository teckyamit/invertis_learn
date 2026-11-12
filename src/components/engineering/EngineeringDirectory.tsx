"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  GraduationCap, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  Search, 
  ArrowRight, 
  Layers, 
  Sparkles,
  FileText,
  Cpu
} from "lucide-react";
import { 
  getProgramAdmissionConfig, 
  programSupportsLateral 
} from "@/lib/admissionModes";
import {
  compareProgrammesByAcademicLevel,
  groupProgrammesByAcademicLevel,
  ACADEMIC_LEVEL_METADATA,
  AcademicLevel
} from "@/lib/academicLevels";

interface Programme {
  id: string;
  code: string;
  name: string;
  category: string;
  degreeLevel: string;
  durationYears: number;
  eligibility: string | null;
  specializations: string | null;
  description: string | null;
  officialSourceUrl: string | null;
  hasOfficialSyllabus: boolean;
  isLateralEntry: boolean;
  curriculumVersions?: {
    semesters: {
      id: string;
      semesterNumber: number;
      _count: { subjects: number };
    }[];
  }[];
}

interface EngineeringDirectoryProps {
  programmes: Programme[];
}

export function EngineeringDirectory({ programmes }: EngineeringDirectoryProps) {
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Categorize CSE programmes according to official university tiers
  const diplomaProgrammes = useMemo(() => {
    return programmes.filter(p => 
      p.category === "DIPLOMA" || p.code.startsWith("DIP") || p.name.includes("Diploma")
    );
  }, [programmes]);

  const btechProgrammes = useMemo(() => {
    return programmes.filter(p => 
      p.category === "UNDERGRADUATE" && (p.code.startsWith("BTECH") || p.name.includes("B.Tech"))
    );
  }, [programmes]);

  // Programmes that offer a verified Lateral Entry scheme
  const lateralEntryProgrammes = useMemo(() => {
    return programmes.filter(p => programSupportsLateral(p.code));
  }, [programmes]);

  const mtechProgrammes = useMemo(() => {
    return programmes.filter(p => 
      p.category === "POSTGRADUATE" || p.code.startsWith("MTECH") || p.name.includes("M.Tech")
    );
  }, [programmes]);

  const phdProgrammes = useMemo(() => {
    return programmes.filter(p => 
      p.category === "DOCTORAL" || p.code.startsWith("PHD") || p.name.includes("Ph.D.")
    );
  }, [programmes]);

  const specializationProgrammes = useMemo(() => {
    return programmes.filter(p => 
      p.code === "BTECH-CSE-AI" || 
      p.code === "BTECH-CSE-CC"
    );
  }, [programmes]);

  // Tab counts for all 7 organizational filters
  const tabCounts = {
    ALL: programmes.length,
    DIPLOMA: diplomaProgrammes.length,
    BTECH: btechProgrammes.length,
    LATERAL: lateralEntryProgrammes.length,
    MTECH: mtechProgrammes.length,
    PHD: phdProgrammes.length,
    SPECIALIZATIONS: specializationProgrammes.length,
  };

  // Filtered programmes based on active filter tab and search query, strictly ordered by academic tier
  const displayedProgrammes = useMemo(() => {
    let list = programmes;
    if (activeTab === "DIPLOMA") list = diplomaProgrammes;
    else if (activeTab === "BTECH") list = btechProgrammes;
    else if (activeTab === "LATERAL") list = lateralEntryProgrammes;
    else if (activeTab === "MTECH") list = mtechProgrammes;
    else if (activeTab === "PHD") list = phdProgrammes;
    else if (activeTab === "SPECIALIZATIONS") list = specializationProgrammes;

    let filtered = list;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      filtered = list.filter(p => {
        const admissionConfig = getProgramAdmissionConfig(p.code);
        const officialCode = admissionConfig?.lateral?.officialCode?.toLowerCase() || "";
        const legacyCodes = admissionConfig?.legacyLateralCodes?.map(c => c.toLowerCase()) || [];

        return (
          p.name.toLowerCase().includes(q) || 
          p.code.toLowerCase().includes(q) ||
          officialCode.includes(q) ||
          legacyCodes.some(c => c.includes(q)) ||
          (p.specializations && p.specializations.toLowerCase().includes(q))
        );
      });
    }

    return [...filtered].sort(compareProgrammesByAcademicLevel);
  }, [programmes, activeTab, diplomaProgrammes, btechProgrammes, lateralEntryProgrammes, mtechProgrammes, phdProgrammes, specializationProgrammes, searchQuery]);

  // Helper icon for CSE specialization & degree tier
  const getBranchIcon = (code: string) => {
    if (code.startsWith("PHD")) {
      return <GraduationCap className="w-5 h-5 text-rose-600" />;
    }
    if (code.includes("AI")) {
      return <Sparkles className="w-5 h-5 text-purple-600" />;
    }
    if (code.includes("CC")) {
      return <Layers className="w-5 h-5 text-sky-600" />;
    }
    if (code.includes("MTECH")) {
      return <GraduationCap className="w-5 h-5 text-indigo-600" />;
    }
    if (code.startsWith("DIP")) {
      return <BookOpen className="w-5 h-5 text-amber-600" />;
    }
    return <Cpu className="w-5 h-5 text-blue-600" />;
  };

  const renderProgrammeCard = (prog: Programme) => {
    let specs: string[] = [];
    try {
      if (prog.specializations) specs = JSON.parse(prog.specializations);
    } catch {
      specs = prog.specializations ? prog.specializations.split(",") : [];
    }

    const hasCurriculum = prog.hasOfficialSyllabus;
    const admissionConfig = getProgramAdmissionConfig(prog.code);
    const supportsLateral = programSupportsLateral(prog.code);

    // Calculate regular subject count and lateral subject count
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
          hasCurriculum
            ? "border-blue-200 hover:border-blue-400 hover:shadow-md"
            : "border-slate-200 hover:border-slate-300"
        }`}
      >
        <div className="p-4 sm:p-5">
          {/* Header Badges */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-200">
                {getBranchIcon(prog.code)}
              </div>
              <div>
                <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                  {prog.code}
                </span>
                {admissionConfig?.regular?.officialCode && (
                  <span className="ml-1.5 font-mono text-[10px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded" title="Official Invertis Program Code">
                    {admissionConfig.regular.officialCode}
                  </span>
                )}
                {supportsLateral && admissionConfig?.lateral?.officialCode && (
                  <span className="ml-1.5 font-mono text-[10px] font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-1.5 py-0.5 rounded" title="Official Lateral Entry Code">
                    {admissionConfig.lateral.officialCode}
                  </span>
                )}
              </div>
            </div>

            {hasCurriculum ? (
              <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Resources Live</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1 text-[11px] font-medium text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>Syllabus Ingestion</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-slate-900 leading-snug mb-2 hover:text-blue-600 transition">
            <Link href={`/programmes/${prog.code}`}>
              {prog.name}
            </Link>
          </h3>

          {/* Duration & Type Details */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-3">
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {prog.category === "DOCTORAL" || prog.code.startsWith("PHD") ? (
                <span>{prog.durationYears} Years (Doctoral Research & Thesis)</span>
              ) : supportsLateral ? (
                <span>{prog.durationYears} Years Regular • {admissionConfig?.lateral?.durationYears} Years Lateral</span>
              ) : (
                <span>{prog.durationYears} Years ({prog.durationYears * 2} Semesters)</span>
              )}
            </span>
            <span>•</span>
            <span className="capitalize">{prog.category.toLowerCase()}</span>

            {supportsLateral && (
              <>
                <span>•</span>
                <span className="text-purple-700 font-semibold bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200 text-[11px]">
                  Lateral Entry Available
                </span>
              </>
            )}

            {(prog.code === "BTECH-CSE-AI" || prog.code === "BTECH-CSE-CC") && (
              <>
                <span>•</span>
                <span className="text-teal-700 font-semibold bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200 text-[11px]">
                  Specialization
                </span>
              </>
            )}

            {(prog.category === "DOCTORAL" || prog.code.startsWith("PHD")) && (
              <>
                <span>•</span>
                <span className="text-rose-700 font-semibold bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200 text-[11px]">
                  Ph.D. Research
                </span>
              </>
            )}
          </div>

          {/* Focus Areas */}
          {specs.length > 0 && (
            <div className="mb-3">
              <div className="text-[11px] font-semibold text-slate-500 mb-1">Focus Areas:</div>
              <div className="flex flex-wrap gap-1">
                {specs.slice(0, 3).map((spec, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] bg-slate-50 text-slate-700 border border-slate-200 px-2 py-0.5 rounded"
                  >
                    {spec}
                  </span>
                ))}
                {specs.length > 3 && (
                  <span className="text-[10px] text-slate-400 self-center">
                    +{specs.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Dual Curriculum Stats */}
          {hasCurriculum ? (
            <div className="bg-blue-50/70 border border-blue-100 rounded-lg p-2.5 text-xs text-blue-900 space-y-1">
              <div className="font-semibold flex items-center justify-between">
                <span>Curriculum Active:</span>
                <span className="font-mono font-bold text-blue-700">
                  {supportsLateral
                    ? `Regular: ${regularSubjectCount} • Lateral: ${lateralSubjectCount}`
                    : `${regularSubjectCount} Subjects`}
                </span>
              </div>
              <div className="text-[11px] text-blue-700 flex items-center space-x-3">
                <span>• Full Syllabi</span>
                <span>• Solved PYQs</span>
                <span>• Lab Manuals</span>
                <span>• Notes</span>
              </div>
            </div>
          ) : (
            <p className="text-[11px] text-slate-500 line-clamp-2 bg-slate-50 p-2 rounded border border-slate-100">
              {prog.eligibility ? `Eligibility: ${prog.eligibility}` : "Verified academic branch of Invertis Institute of Engineering & Technology."}
            </p>
          )}
        </div>

        {/* Action Buttons with Universal Entry Support */}
        <div className="px-4 sm:px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            {(prog.category === "DOCTORAL" || prog.code.startsWith("PHD")) ? (
              <div className="flex items-center justify-between gap-2 w-full">
                <Link
                  href={`/syllabus/${prog.code}`}
                  className="inline-flex items-center justify-center space-x-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg shadow-sm transition flex-1 min-h-[36px]"
                >
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                  <span>Open Syllabus</span>
                </Link>
                <Link
                  href="/phd"
                  className="inline-flex items-center justify-center space-x-1.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-2 rounded-lg transition min-h-[36px]"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>Doctoral Hub</span>
                </Link>
              </div>
            ) : hasCurriculum ? (
              <>
                <Link
                  href={`/syllabus/${prog.code}`}
                  className="inline-flex items-center justify-center space-x-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-3.5 py-2 rounded-lg shadow-sm transition flex-1 min-h-[36px]"
                >
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                  <span>Open Syllabus</span>
                </Link>

                <Link
                  href={`/pyq/${prog.code}`}
                  className="inline-flex items-center justify-center space-x-1 text-xs font-semibold text-slate-700 hover:text-blue-600 px-2 py-2"
                >
                  <span>PYQs</span>
                  <ArrowRight className="w-3 h-3 shrink-0" />
                </Link>
              </>
            ) : (
              <div className="flex items-center justify-between gap-2 w-full">
                <Link
                  href={`/programmes/${prog.code}`}
                  className="inline-flex items-center justify-center space-x-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 px-3 py-2 rounded-lg shadow-xs transition flex-1"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>View Program Overview</span>
                </Link>
                {prog.officialSourceUrl && (
                  <a
                    href={prog.officialSourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center space-x-0.5 px-2 py-1"
                  >
                    <span>Portal</span>
                    <ExternalLink className="w-3 h-3 ml-0.5 shrink-0" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Quick Lateral Entry Link if supported */}
          {supportsLateral && hasCurriculum && (
            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-medium">Looking for Lateral Entry?</span>
              <Link
                href={`/syllabus/${prog.code}?entry=lateral`}
                className="font-bold text-purple-700 hover:text-purple-900 hover:underline flex items-center gap-0.5"
              >
                <span>Lateral Entry (Sem III–VIII)</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Category Tabs & Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Navigation Filter Pills with smooth horizontal swipe on mobile */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0 sm:flex-wrap w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("ALL")}
              className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 shrink-0 ${
                activeTab === "ALL"
                  ? "bg-brand-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <span>All CSE Programs</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === "ALL" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
              }`}>
                {tabCounts.ALL}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("DIPLOMA")}
              className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 shrink-0 ${
                activeTab === "DIPLOMA"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <span>Diploma</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === "DIPLOMA" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
              }`}>
                {tabCounts.DIPLOMA}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("BTECH")}
              className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 shrink-0 ${
                activeTab === "BTECH"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <span>B.Tech</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === "BTECH" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
              }`}>
                {tabCounts.BTECH}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("LATERAL")}
              className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 shrink-0 ${
                activeTab === "LATERAL"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <span>Lateral Entry</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === "LATERAL" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
              }`}>
                {tabCounts.LATERAL}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("MTECH")}
              className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 shrink-0 ${
                activeTab === "MTECH"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <span>M.Tech</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === "MTECH" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
              }`}>
                {tabCounts.MTECH}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("PHD")}
              className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 shrink-0 ${
                activeTab === "PHD"
                  ? "bg-rose-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <span>Ph.D.</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === "PHD" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
              }`}>
                {tabCounts.PHD}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("SPECIALIZATIONS")}
              className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 shrink-0 ${
                activeTab === "SPECIALIZATIONS"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <span>Specializations</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === "SPECIALIZATIONS" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
              }`}>
                {tabCounts.SPECIALIZATIONS}
              </span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search CSE program, code, or specialization..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            />
          </div>
        </div>
      </div>

      {/* Consolidated Programme Cards Grid */}
      {displayedProgrammes.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <GraduationCap className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-700">No matching CSE programs found</h3>
          <p className="text-xs text-slate-500 mt-1">Try clearing your search query or selecting a different filter.</p>
        </div>
      ) : activeTab === "ALL" && !searchQuery.trim() ? (
        <div className="space-y-8">
          {groupProgrammesByAcademicLevel(displayedProgrammes).map((section) => {
            if (section.programmes.length === 0) return null;
            return (
              <div key={section.level} className="space-y-4">
                <div className={`p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${section.meta.headerBorderClass}`}>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold text-slate-400">0{section.meta.priority}</span>
                      <h3 className="text-base font-bold text-slate-900">{section.meta.title}</h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${section.meta.badgeClass}`}>
                        {section.programmes.length} {section.programmes.length === 1 ? "Program" : "Programs"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{section.meta.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {section.programmes.map((prog) => renderProgrammeCard(prog))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedProgrammes.map((prog) => renderProgrammeCard(prog))}
        </div>
      )}

      {/* University Departments Directory Callout */}
      <div className="bg-gradient-to-r from-slate-100 to-blue-50/40 rounded-xl border border-slate-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900 mb-1">
            Looking for Other Engineering Branches or Academic Faculties?
          </h4>
          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
            Non-computing engineering disciplines (Mechanical, Civil, Electrical) and all other university faculties 
            (Management, Computer Applications, Pharmacy, Law, Applied Sciences, Agriculture, Education, Journalism) 
            are catalogued in the Comprehensive University Directory.
          </p>
        </div>
        <Link
          href="/programmes"
          className="shrink-0 inline-flex items-center space-x-1.5 px-4 py-2 bg-white text-slate-800 hover:text-blue-600 font-semibold text-xs rounded-lg border border-slate-300 shadow-sm transition"
        >
          <span>Explore All 9 Departments</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
