"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { GraduationCap, ArrowRight, Bookmark, X, Check, BookOpen, FileText } from "lucide-react";
import { getProgramAdmissionConfig, getLateralSemesterRangeRoman } from "@/lib/admissionModes";

interface SavedSemester {
  programmeCode: string;
  programmeName: string;
  semesterNumber: number;
  entryMode: "regular" | "lateral";
}

const STORAGE_KEY = "invertis_learn_my_semester_v1";

const PROGRAMME_CHOICES = [
  { code: "DIP-CSE", name: "Diploma in CSE", maxSem: 6, supportsLateral: true, lateralMin: 3 },
  { code: "BTECH-CSE", name: "B.Tech CSE (Regular)", maxSem: 8, supportsLateral: true, lateralMin: 3 },
  { code: "BTECH-CSE-AI", name: "B.Tech CSE (AI & ML)", maxSem: 8, supportsLateral: true, lateralMin: 3 },
  { code: "BTECH-CSE-CC", name: "B.Tech CSE (Cloud Computing)", maxSem: 8, supportsLateral: true, lateralMin: 3 },
  { code: "MTECH-CSE", name: "M.Tech CSE", maxSem: 4, supportsLateral: false, lateralMin: 1 },
];

export function MySemesterWidget() {
  const [mounted, setMounted] = useState(false);
  const [saved, setSaved] = useState<SavedSemester | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form states
  const [selectedProgCode, setSelectedProgCode] = useState<string>("BTECH-CSE");
  const [entryMode, setEntryMode] = useState<"regular" | "lateral">("regular");
  const [selectedSem, setSelectedSem] = useState<number>(3);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.programmeCode && parsed.semesterNumber) {
          setSaved(parsed);
          setSelectedProgCode(parsed.programmeCode);
          setEntryMode(parsed.entryMode || "regular");
          setSelectedSem(parsed.semesterNumber);
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const currentProg = PROGRAMME_CHOICES.find(p => p.code === selectedProgCode) || PROGRAMME_CHOICES[1];

  const minSem = entryMode === "lateral" && currentProg.supportsLateral ? currentProg.lateralMin : 1;
  const maxSem = currentProg.maxSem;

  const handleSave = () => {
    const sem = Math.min(Math.max(selectedSem, minSem), maxSem);
    const data: SavedSemester = {
      programmeCode: currentProg.code,
      programmeName: currentProg.name,
      semesterNumber: sem,
      entryMode: currentProg.supportsLateral ? entryMode : "regular",
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setSaved(data);
      setIsEditing(false);
    } catch {
      // Storage unavailable
    }
  };

  const handleClear = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setSaved(null);
      setIsEditing(false);
    } catch {
      // Storage unavailable
    }
  };

  if (!mounted) return null;

  // Active personalized shortcut card
  if (saved && !isEditing) {
    const syllabusHref = `/syllabus/${encodeURIComponent(saved.programmeCode)}/semester/${saved.semesterNumber}${
      saved.entryMode === "lateral" ? "?entry=lateral" : ""
    }`;
    const pyqHref = `/pyq/${encodeURIComponent(saved.programmeCode)}/semester/${saved.semesterNumber}`;

    return (
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-blue-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30 text-xs font-semibold">
                <Bookmark className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span>My Semester Shortcut</span>
              </span>
              {saved.entryMode === "lateral" && (
                <span className="px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-200 border border-purple-400/30 text-[10px] font-bold">
                  Lateral Entry
                </span>
              )}
            </div>
            <h2 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-white">
              {saved.programmeName} · Semester {saved.semesterNumber}
            </h2>
            <p className="text-xs text-blue-200">
              Instant 1-click access to your verified subjects, syllabi, notes, and previous-year papers.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
            <Link
              href={syllabusHref}
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 transition shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-900" />
              <span>Open Semester Syllabi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href={pyqHref}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition"
            >
              <FileText className="w-3.5 h-3.5 text-blue-300" />
              <span>PYQs</span>
            </Link>

            <button
              onClick={() => setIsEditing(true)}
              className="text-xs text-blue-300 hover:text-white underline px-2 py-1 cursor-pointer"
              title="Change your current semester preference"
            >
              Change
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Setup / Edit Form
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-blue-50 text-blue-700 rounded-xl">
            <Bookmark className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Personalize Your Academic Shortcut</h3>
            <p className="text-xs text-slate-500">Pick your course and semester for quick 1-click access. Stored locally, zero login required.</p>
          </div>
        </div>
        {saved && (
          <button
            onClick={() => setIsEditing(false)}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Programme</label>
          <select
            value={selectedProgCode}
            onChange={(e) => {
              setSelectedProgCode(e.target.value);
              const next = PROGRAMME_CHOICES.find(p => p.code === e.target.value);
              if (next && !next.supportsLateral) setEntryMode("regular");
            }}
            className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {PROGRAMME_CHOICES.map(p => (
              <option key={p.code} value={p.code}>{p.name}</option>
            ))}
          </select>
        </div>

        {currentProg.supportsLateral && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Admission Mode</label>
            <select
              value={entryMode}
              onChange={(e) => setEntryMode(e.target.value as "regular" | "lateral")}
              className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="regular">Regular Scheme (Sem 1 to {currentProg.maxSem})</option>
              <option value="lateral">
                Lateral Entry (Sem {getLateralSemesterRangeRoman(currentProg.code)})
              </option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Current Semester</label>
          <select
            value={selectedSem}
            onChange={(e) => setSelectedSem(Number(e.target.value))}
            className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Array.from({ length: maxSem - minSem + 1 }, (_, i) => minSem + i).map(s => (
              <option key={s} value={s}>Semester {s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        {saved ? (
          <button
            onClick={handleClear}
            className="text-xs text-rose-600 hover:text-rose-800 font-semibold cursor-pointer"
          >
            Remove Shortcut
          </button>
        ) : <div />}

        <div className="flex items-center space-x-2">
          {saved && (
            <button
              onClick={() => setIsEditing(false)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleSave}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition shadow-sm cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Save Shortcut</span>
          </button>
        </div>
      </div>
    </div>
  );
}
