"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  GraduationCap, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Search, 
  ArrowRight, 
  Layers, 
  Sparkles,
  FileText,
  FlaskConical,
  Wrench,
  Cpu,
  Building,
  Zap,
  Dna
} from "lucide-react";

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

  // Sub-categorize engineering programmes
  const btechProgrammes = useMemo(() => {
    return programmes.filter(p => 
      p.category === "UNDERGRADUATE" && (p.code.startsWith("BTECH") || p.name.includes("B.Tech") || p.name.includes("Bachelor of Technology"))
    );
  }, [programmes]);

  const mtechProgrammes = useMemo(() => {
    return programmes.filter(p => 
      p.category === "POSTGRADUATE" && (p.code.startsWith("MTECH") || p.name.includes("M.Tech") || p.name.includes("Master of Technology"))
    );
  }, [programmes]);

  const diplomaProgrammes = useMemo(() => {
    return programmes.filter(p => 
      p.category === "DIPLOMA" || p.code.startsWith("DIP") || p.name.includes("Diploma")
    );
  }, [programmes]);

  // Tab counts
  const tabCounts = {
    ALL: programmes.length,
    BTECH: btechProgrammes.length,
    MTECH: mtechProgrammes.length,
    DIPLOMA: diplomaProgrammes.length,
  };

  // Filtered programmes based on tab and search
  const displayedProgrammes = useMemo(() => {
    let list = programmes;
    if (activeTab === "BTECH") list = btechProgrammes;
    else if (activeTab === "MTECH") list = mtechProgrammes;
    else if (activeTab === "DIPLOMA") list = diplomaProgrammes;

    if (!searchQuery.trim()) return list;

    const q = searchQuery.toLowerCase().trim();
    return list.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.code.toLowerCase().includes(q) ||
      (p.specializations && p.specializations.toLowerCase().includes(q))
    );
  }, [programmes, activeTab, btechProgrammes, mtechProgrammes, diplomaProgrammes, searchQuery]);

  // Helper icon for branch
  const getBranchIcon = (code: string) => {
    if (code.includes("CSE") || code.includes("AI") || code.includes("CC") || code.includes("IOT")) {
      return <Cpu className="w-5 h-5 text-blue-600" />;
    }
    if (code.includes("ME")) {
      return <Wrench className="w-5 h-5 text-amber-600" />;
    }
    if (code.includes("CE")) {
      return <Building className="w-5 h-5 text-emerald-600" />;
    }
    if (code.includes("EE")) {
      return <Zap className="w-5 h-5 text-yellow-600" />;
    }
    if (code.includes("BT")) {
      return <Dna className="w-5 h-5 text-purple-600" />;
    }
    return <GraduationCap className="w-5 h-5 text-slate-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Category Tabs & Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Navigation Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveTab("ALL")}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                activeTab === "ALL"
                  ? "bg-brand-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <span>All Engineering</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === "ALL" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
              }`}>
                {tabCounts.ALL}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("BTECH")}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                activeTab === "BTECH"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <span>B.Tech Programmes</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === "BTECH" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
              }`}>
                {tabCounts.BTECH}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("MTECH")}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                activeTab === "MTECH"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <span>M.Tech Programmes</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === "MTECH" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
              }`}>
                {tabCounts.MTECH}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("DIPLOMA")}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                activeTab === "DIPLOMA"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <span>Diploma Engineering</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === "DIPLOMA" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
              }`}>
                {tabCounts.DIPLOMA}
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
              placeholder="Search branch, code, or focus..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            />
          </div>
        </div>
      </div>

      {/* Programme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayedProgrammes.map((prog) => {
          let specs: string[] = [];
          try {
            if (prog.specializations) specs = JSON.parse(prog.specializations);
          } catch {
            specs = prog.specializations ? prog.specializations.split(",") : [];
          }

          const hasCurriculum = prog.hasOfficialSyllabus;
          const currentCurriculum = prog.curriculumVersions?.[0];
          const totalSubjects = currentCurriculum?.semesters.reduce((acc, s) => acc + s._count.subjects, 0) || 0;
          const totalSemesters = currentCurriculum?.semesters.length || (prog.durationYears * 2);

          return (
            <div
              key={prog.id}
              className={`bg-white rounded-xl border transition flex flex-col justify-between overflow-hidden shadow-sm ${
                hasCurriculum
                  ? "border-blue-200 hover:border-blue-400 hover:shadow-md"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="p-5">
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
                  {hasCurriculum ? (
                    <Link href={`/syllabus/${prog.code}`}>
                      {prog.name}
                    </Link>
                  ) : (
                    <span>{prog.name}</span>
                  )}
                </h3>

                {/* Duration & Type Details */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-3">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{prog.durationYears} Years ({prog.durationYears * 2} Semesters)</span>
                  </span>
                  <span>•</span>
                  <span className="capitalize">{prog.category.toLowerCase()}</span>
                  {prog.isLateralEntry && (
                    <>
                      <span>•</span>
                      <span className="text-purple-700 font-semibold">Lateral Entry</span>
                    </>
                  )}
                </div>

                {/* Specializations / Focus Areas */}
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

                {/* Availability Callout */}
                {hasCurriculum ? (
                  <div className="bg-blue-50/70 border border-blue-100 rounded-lg p-2.5 text-xs text-blue-900 space-y-1">
                    <div className="font-semibold flex items-center justify-between">
                      <span>Curriculum Active:</span>
                      <span className="font-mono font-bold text-blue-700">{totalSubjects} Subjects</span>
                    </div>
                    <div className="text-[11px] text-blue-700 flex items-center space-x-3">
                      <span>• Full Syllabi</span>
                      <span>• Solved PYQs</span>
                      <span>• Lab Manuals</span>
                      <span>• Lecture Notes</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-500 line-clamp-2 bg-slate-50 p-2 rounded border border-slate-100">
                    {prog.eligibility ? `Eligibility: ${prog.eligibility}` : "Verified academic branch of Invertis Institute of Engineering & Technology."}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                {hasCurriculum ? (
                  <>
                    <Link
                      href={`/syllabus/${prog.code}`}
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-3.5 py-2 rounded-lg shadow-sm transition"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Open Syllabus & Semesters</span>
                    </Link>

                    <Link
                      href={`/pyq/${prog.code}`}
                      className="inline-flex items-center space-x-1 text-xs font-semibold text-slate-700 hover:text-blue-600"
                    >
                      <span>Question Papers</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </>
                ) : (
                  <>
                    <span className="text-[11px] font-medium text-slate-500 italic">
                      Curriculum ingestion in progress
                    </span>
                    {prog.officialSourceUrl && (
                      <a
                        href={prog.officialSourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center space-x-0.5"
                      >
                        <span>Official Portal</span>
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

      {displayedProgrammes.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <GraduationCap className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-700">No matching engineering programmes found</h3>
          <p className="text-xs text-slate-500 mt-1">Try clearing your search query or selecting a different tab.</p>
        </div>
      )}

      {/* University Departments Directory Callout */}
      <div className="bg-gradient-to-r from-slate-100 to-blue-50/40 rounded-xl border border-slate-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900 mb-1">
            Looking for Other University Faculties?
          </h4>
          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
            Faculty of Management, Pharmaceutical Sciences, Legal Studies, Applied Sciences, Agriculture, Education, and Journalism 
            are listed in the University Directory with <strong>Coming Soon</strong> status as their official course schemes are being digitized.
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

