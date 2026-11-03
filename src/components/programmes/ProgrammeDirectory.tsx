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
  Filter, 
  Layers, 
  Sparkles,
  Building2,
  ArrowRight
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
  const [onlySyllabusAvailable, setOnlySyllabusAvailable] = useState<boolean>(false);
  const [onlyLateralEntry, setOnlyLateralEntry] = useState<boolean>(false);

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
      // Category filter
      if (selectedCategory !== "ALL") {
        const cat = prog.category || prog.degreeLevel;
        if (cat !== selectedCategory) return false;
      }

      // Department filter
      if (selectedDeptCode !== "ALL" && prog.department.code !== selectedDeptCode) {
        return false;
      }

      // Syllabus filter
      if (onlySyllabusAvailable && !prog.hasOfficialSyllabus) {
        return false;
      }

      // Lateral Entry filter
      if (onlyLateralEntry && !prog.isLateralEntry) {
        return false;
      }

      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = prog.name.toLowerCase().includes(q);
        const matchesCode = prog.code.toLowerCase().includes(q);
        const matchesDept = prog.department.name.toLowerCase().includes(q);
        const matchesSpecs = prog.specializations ? prog.specializations.toLowerCase().includes(q) : false;
        const matchesCareers = prog.careerProspects ? prog.careerProspects.toLowerCase().includes(q) : false;
        if (!matchesName && !matchesCode && !matchesDept && !matchesSpecs && !matchesCareers) {
          return false;
        }
      }

      return true;
    });
  }, [initialProgrammes, selectedCategory, selectedDeptCode, onlySyllabusAvailable, onlyLateralEntry, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search and Filters Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by programme name, code (e.g. BTECH-CSE), specialization (AI, Cloud, IoT), or department..."
            className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm text-slate-900 placeholder-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-3 text-xs text-slate-400 hover:text-slate-600 bg-slate-100 px-2 py-1 rounded"
            >
              Clear
            </button>
          )}
        </div>

        {/* Level / Category Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-3">
          {[
            { id: "ALL", label: "All Programmes", count: categoryCounts.ALL },
            { id: "UNDERGRADUATE", label: "Undergraduate (UG)", count: categoryCounts.UNDERGRADUATE },
            { id: "POSTGRADUATE", label: "Postgraduate (PG)", count: categoryCounts.POSTGRADUATE },
            { id: "DIPLOMA", label: "Polytechnic & Diploma", count: categoryCounts.DIPLOMA },
            { id: "DOCTORAL", label: "Doctoral (Ph.D.)", count: categoryCounts.DOCTORAL },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1.5 ${
                selectedCategory === tab.id
                  ? "bg-brand-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === tab.id ? "bg-brand-800 text-blue-200" : "bg-slate-200 text-slate-600"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Secondary Filters: Department Dropdown & Checkboxes */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-semibold text-slate-700">Faculty:</span>
            <select
              value={selectedDeptCode}
              onChange={(e) => setSelectedDeptCode(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium max-w-[260px] sm:max-w-none"
            >
              <option value="ALL">All Faculties & Departments (9)</option>
              {departments.map((dept) => (
                <option key={dept.code} value={dept.code}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center space-x-2 text-xs font-medium text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlySyllabusAvailable}
                onChange={(e) => setOnlySyllabusAvailable(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
              <span className="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Official Syllabus Active
              </span>
            </label>

            <label className="flex items-center space-x-2 text-xs font-medium text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyLateralEntry}
                onChange={(e) => setOnlyLateralEntry(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
              <span className="text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                Lateral Entry Only
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <div>
          Showing <span className="font-bold text-slate-800">{filteredProgrammes.length}</span> of{" "}
          <span className="font-bold text-slate-800">{initialProgrammes.length}</span> discovered university programmes
        </div>
        {(searchQuery || selectedCategory !== "ALL" || selectedDeptCode !== "ALL" || onlySyllabusAvailable || onlyLateralEntry) && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("ALL");
              setSelectedDeptCode("ALL");
              setOnlySyllabusAvailable(false);
              setOnlyLateralEntry(false);
            }}
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Grid of Programmes */}
      {filteredProgrammes.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 mb-1">No matching programmes found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
            Try adjusting your search keywords, clearing your filter pills, or selecting a different faculty department.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("ALL");
              setSelectedDeptCode("ALL");
              setOnlySyllabusAvailable(false);
              setOnlyLateralEntry(false);
            }}
            className="px-4 py-2 bg-brand-900 text-white rounded-lg text-xs font-semibold hover:bg-brand-800 transition"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProgrammes.map((prog) => {
            let specsList: string[] = [];
            try {
              if (prog.specializations) {
                specsList = JSON.parse(prog.specializations);
              }
            } catch {
              specsList = prog.specializations ? prog.specializations.split(",") : [];
            }

            return (
              <div
                key={prog.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md transition flex flex-col justify-between overflow-hidden group"
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
                        Lateral Entry (Direct 2nd Yr)
                      </span>
                    )}

                    {prog.hasOfficialSyllabus ? (
                      <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Syllabus Active</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium bg-slate-50 text-slate-500 border border-slate-200 px-2 py-0.5 rounded">
                        Overview Ready
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
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition leading-snug mb-2">
                    <Link href={`/programmes/${prog.code}`}>
                      {prog.name}
                    </Link>
                  </h3>

                  {/* Department */}
                  <div className="flex items-center space-x-1.5 text-xs text-slate-600 mb-3">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{prog.department.name}</span>
                  </div>

                  {/* Specializations (first 3) */}
                  {specsList.length > 0 && (
                    <div className="mb-3">
                      <div className="text-[11px] font-semibold text-slate-500 mb-1">Focus Tracks:</div>
                      <div className="flex flex-wrap gap-1">
                        {specsList.slice(0, 3).map((spec, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] bg-slate-50 text-slate-700 border border-slate-200 px-2 py-0.5 rounded"
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

                  {/* Eligibility snippet */}
                  {prog.eligibility && (
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed bg-slate-50/70 p-2 rounded border border-slate-100">
                      <strong className="text-slate-700">Eligibility:</strong> {prog.eligibility}
                    </p>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="px-5 py-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2">
                  <Link
                    href={`/programmes/${prog.code}`}
                    className="text-xs font-semibold text-slate-700 hover:text-blue-600 flex items-center space-x-1"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {prog.hasOfficialSyllabus ? (
                    <Link
                      href={`/syllabus/${prog.code}`}
                      className="inline-flex items-center space-x-1 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg shadow-sm transition"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Browse Syllabus</span>
                    </Link>
                  ) : (
                    <span className="text-[11px] text-slate-400 italic">
                      PDF Pending
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

