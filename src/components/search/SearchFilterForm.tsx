"use client";

import { useRef, useTransition } from "react";
import Link from "next/link";
import { Search, RotateCcw } from "lucide-react";

interface ProgrammeOption {
  code: string;
  name: string;
}

interface SearchFilterFormProps {
  initialQ: string;
  initialProgramme: string;
  initialSemester: string;
  programmes: ProgrammeOption[];
  total: number;
}

export function SearchFilterForm({
  initialQ,
  initialProgramme,
  initialSemester,
  programmes,
  total,
}: SearchFilterFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  const handleSelectChange = () => {
    if (formRef.current) {
      startTransition(() => {
        formRef.current?.requestSubmit();
      });
    }
  };

  const hasActiveFilters = Boolean(initialQ || initialProgramme || initialSemester);

  return (
    <form
      ref={formRef}
      className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4"
      action="/search"
      method="GET"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Query Input */}
        <div className="lg:col-span-2">
          <label htmlFor="search-q" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Subject Name, Code or Topic
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="search-q"
              name="q"
              defaultValue={initialQ}
              maxLength={100}
              className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="e.g. DBMS, OS, Data Structures, BCS-301, MCS102..."
            />
          </div>
        </div>

        {/* Programme Dropdown */}
        <div>
          <label htmlFor="search-prog" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Academic Programme
          </label>
          <select
            id="search-prog"
            name="programme"
            defaultValue={initialProgramme}
            onChange={handleSelectChange}
            className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition cursor-pointer"
          >
            <option value="">All Programmes</option>
            {programmes.map((p) => (
              <option key={p.code} value={p.code}>
                {p.name} ({p.code})
              </option>
            ))}
          </select>
        </div>

        {/* Semester Dropdown */}
        <div>
          <label htmlFor="search-sem" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Semester
          </label>
          <select
            id="search-sem"
            name="semester"
            defaultValue={initialSemester}
            onChange={handleSelectChange}
            className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition cursor-pointer"
          >
            <option value="">All Semesters</option>
            {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                Semester {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Form Action Controls & Status */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <span role="status" className="text-xs font-medium text-slate-500">
          {isPending ? (
            <span className="text-blue-600 font-semibold animate-pulse">Filtering subjects...</span>
          ) : (
            <>
              Found <strong className="text-slate-900 font-bold">{total}</strong> subjects matching criteria
            </>
          )}
        </span>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Link
              href="/search"
              className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear</span>
            </Link>
          )}
          <button
            type="submit"
            className="px-5 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          >
            Apply Search
          </button>
        </div>
      </div>
    </form>
  );
}
