"use client";

import React, { useState, useMemo } from "react";
import { Search, Filter, BookOpen, AlertCircle } from "lucide-react";
import { SubjectCard } from "./SubjectCard";

interface Subject {
  id: string;
  code: string;
  name: string;
  credits: number;
  subjectType: string;
  lectureHours: number;
  tutorialHours: number;
  practicalHours: number;
  electiveGroup: string | null;
  evaluationMarks: string | null;
}

interface SemesterFilterProps {
  programmeCode: string;
  semesterNumber: number;
  subjects: Subject[];
}

export function SemesterFilter({ programmeCode, semesterNumber, subjects }: SemesterFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("ALL");

  // Derive unique categories present in this semester
  const categories = useMemo(() => {
    const types = new Set<string>();
    subjects.forEach((s) => types.add(s.subjectType));
    const list = Array.from(types);
    return ["ALL", ...list];
  }, [subjects]);

  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      const matchesSearch =
        subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.code.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        selectedType === "ALL" || subject.subjectType === selectedType;

      return matchesSearch && matchesType;
    });
  }, [subjects, searchQuery, selectedType]);

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subjects by name or code (e.g. BCS-301, Data Structures)..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 px-1 py-0.5"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1.5 flex items-center">
            <Filter className="h-3 w-3 mr-1" />
            Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedType(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition whitespace-nowrap ${
                selectedType === cat
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat === "ALL" ? `All (${subjects.length})` : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong className="text-slate-800 font-semibold">{filteredSubjects.length}</strong> of {subjects.length} subjects
        </span>
        {searchQuery && (
          <span>
            Filtered by keyword: &ldquo;{searchQuery}&rdquo;
          </span>
        )}
      </div>

      {/* Subjects Grid */}
      {filteredSubjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSubjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              programmeCode={programmeCode}
              semesterNumber={semesterNumber}
              subject={subject}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center">
          <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-3">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h4 className="text-base font-semibold text-slate-800 mb-1">No subjects found</h4>
          <p className="text-sm text-slate-500 max-w-sm mx-auto mb-4">
            No subjects matched your search &ldquo;{searchQuery}&rdquo; in this category.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedType("ALL");
            }}
            className="px-4 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

