"use client";
import { provenanceLabel } from "@/lib/resource-policy";
import { Modal } from "@/components/ui/Modal";

import React, { useState, useMemo } from "react";
import {
  Layers,
  BookOpen,
  FileText,
  Presentation,
  Bookmark,
  Download,
  ExternalLink,
  Eye,
  Search,
  Filter,
  CheckCircle2,
  X,
  UserCheck,
  Sparkles
} from "lucide-react";

export interface NoteResource {
  id: string;
  title: string;
  originalFileName: string;
  storedFileName: string;
  provenanceStatus?: string;
  storagePath: string;
  fileSizeBytes: number;
  authorName?: string | null;
  unitNumber?: number | null;
  resourceType?: string | null;
  createdAt: Date | string;
}

interface NotesSectionProps {
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  initialNotes: NoteResource[];
}

export function NotesSection({
  subjectId,
  subjectCode,
  subjectName,
  initialNotes,
}: NotesSectionProps) {
  const [notes] = useState<NoteResource[]>(initialNotes);
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [selectedUnit, setSelectedUnit] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [previewNote, setPreviewNote] = useState<NoteResource | null>(null);

  // Derive unique units available
  const availableUnits = useMemo(() => {
    const units = new Set<number>();
    notes.forEach((n) => {
      if (n.unitNumber !== null && n.unitNumber !== undefined) {
        units.add(n.unitNumber);
      }
    });
    return Array.from(units).sort((a, b) => a - b);
  }, [notes]);

  // Filtered notes
  const filteredNotes = useMemo(() => {
    return notes.filter((n) => {
      const matchesType = selectedType === "ALL" || n.resourceType === selectedType;
      const matchesUnit =
        selectedUnit === "ALL" ||
        (selectedUnit === "FULL" && (n.unitNumber === null || n.unitNumber === undefined)) ||
        (n.unitNumber !== null && n.unitNumber !== undefined && n.unitNumber.toString() === selectedUnit);
      
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        n.title.toLowerCase().includes(q) ||
        (n.authorName && n.authorName.toLowerCase().includes(q)) ||
        (n.resourceType && n.resourceType.toLowerCase().includes(q));

      return matchesType && matchesUnit && matchesSearch;
    });
  }, [notes, selectedType, selectedUnit, searchQuery]);

  const getTypeIcon = (type?: string | null) => {
    switch (type) {
      case "LECTURE_NOTES":
        return <FileText className="h-4 w-4 text-emerald-600" />;
      case "UNIT_SUMMARY":
        return <Bookmark className="h-4 w-4 text-purple-600" />;
      case "PPT_SLIDES":
        return <Presentation className="h-4 w-4 text-blue-600" />;
      case "FORMULA_SHEET":
        return <BookOpen className="h-4 w-4 text-amber-600" />;
      default:
        return <Layers className="h-4 w-4 text-slate-600" />;
    }
  };

  const getTypeBadge = (type?: string | null) => {
    switch (type) {
      case "LECTURE_NOTES":
        return (
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Lecture Notes
          </span>
        );
      case "UNIT_SUMMARY":
        return (
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
            Unit Summary
          </span>
        );
      case "PPT_SLIDES":
        return (
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            Presentation Slides
          </span>
        );
      case "FORMULA_SHEET":
        return (
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            Formula Sheet
          </span>
        );
      default:
        return (
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            Study Material
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-slate-900">
                Faculty Lecture Notes & Learning Resources
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase tracking-wide">
                Phase 3 Verified
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Faculty-approved unit lecture notes, slide presentations, revision summaries, and cheatsheets
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-500 font-medium bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg flex items-center">
          <UserCheck className="h-4 w-4 mr-1.5 text-emerald-600" />
          <span>Faculty-Verified Content</span>
        </div>
      </div>

      {/* Filter and Search Controls (if notes exist) */}
      {notes.length > 0 && (
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-sm">
              <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search notes, topics or faculty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            {/* Resource Type Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-semibold text-slate-500 uppercase tracking-wider mr-1 text-[11px]">
                Type:
              </span>
              {[
                { key: "ALL", label: "All Types" },
                { key: "LECTURE_NOTES", label: "Lecture Notes" },
                { key: "UNIT_SUMMARY", label: "Summaries" },
                { key: "PPT_SLIDES", label: "PPTs" },
                { key: "FORMULA_SHEET", label: "Formula Sheets" },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setSelectedType(t.key)}
                  className={`px-2.5 py-1 rounded-md font-semibold transition ${
                    selectedType === t.key
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Unit Filter Tabs */}
          {availableUnits.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200/60">
              <span className="font-semibold text-slate-500 uppercase tracking-wider mr-1 text-[11px]">
                Unit Scope:
              </span>
              <button
                onClick={() => setSelectedUnit("ALL")}
                className={`px-2.5 py-0.5 rounded-md font-semibold text-[11px] transition ${
                  selectedUnit === "ALL"
                    ? "bg-emerald-700 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                All Modules
              </button>
              {availableUnits.map((u) => (
                <button
                  key={u}
                  onClick={() => setSelectedUnit(u.toString())}
                  className={`px-2.5 py-0.5 rounded-md font-semibold text-[11px] transition ${
                    selectedUnit === u.toString()
                      ? "bg-emerald-700 text-white"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  Unit {u}
                </button>
              ))}
              <button
                onClick={() => setSelectedUnit("FULL")}
                className={`px-2.5 py-0.5 rounded-md font-semibold text-[11px] transition ${
                  selectedUnit === "FULL"
                    ? "bg-emerald-700 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                Comprehensive Course Decks
              </button>
            </div>
          )}
        </div>
      )}

      {/* Notes Grid */}
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotes.map((note) => {
            const formattedSize = note.fileSizeBytes
              ? `${(note.fileSizeBytes / 1024).toFixed(0)} KB`
              : "PDF Document";
            const downloadUrl = `/api/notes/download?file=${encodeURIComponent(
              note.storedFileName
            )}&name=${encodeURIComponent(note.title)}`;
            const staticPdfUrl = `/${note.storagePath}`;

            return (
              <div
                key={note.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 bg-slate-50 rounded-lg border border-slate-100">
                        {getTypeIcon(note.resourceType)}
                      </div>
                      {getTypeBadge(note.resourceType)}
                    </div>

                    {note.unitNumber ? (
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        Unit {note.unitNumber}
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                        Full Course
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                      {note.title}
                    </h3>
        <p className="text-xs text-amber-800 mt-2">{provenanceLabel(note.provenanceStatus)}</p>
                    {note.authorName && (
                      <p className="text-xs text-slate-500 mt-1 flex items-center">
                        <span className="font-medium text-slate-700">{note.authorName}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-400 text-[11px]">{formattedSize}</span>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setPreviewNote(note)}
                      className="inline-flex items-center px-2.5 py-1.5 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition font-medium text-[11px]"
                    >
                      <Eye className="h-3.5 w-3.5 mr-1 text-slate-500" />
                      Preview
                    </button>

                    <a
                      href={downloadUrl}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-white bg-emerald-800 hover:bg-emerald-900 transition font-semibold text-[11px] shadow-sm"
                    >
                      <Download className="h-3.5 w-3.5 mr-1" />
                      Download
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : notes.length > 0 ? (
        <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-8 text-center space-y-2">
          <p className="text-xs font-semibold text-slate-700">No notes match the selected filters.</p>
          <button
            onClick={() => {
              setSelectedType("ALL");
              setSelectedUnit("ALL");
              setSearchQuery("");
            }}
            className="text-xs text-emerald-700 underline font-semibold"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-8 text-center space-y-2">
          <Layers className="h-8 w-8 text-slate-400 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-slate-800">Faculty Notes Being Prepared</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Official lecture notes and slide decks for <strong>{subjectCode}</strong> are currently under review by the academic department.
          </p>
        </div>
      )}

      {/* In-Browser PDF Preview Modal */}
      {previewNote && (
        <Modal label="Notes preview" onClose={() => setPreviewNote(null)}>
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                  {getTypeIcon(previewNote.resourceType)}
                </div>
                <div className="truncate">
                  <h4 className="text-sm font-bold truncate text-white">
                    {previewNote.title}
                  </h4>
                  <div className="flex items-center space-x-2 text-xs text-slate-400 mt-0.5">
                    <span>{subjectCode}</span>
                    <span>•</span>
                    <span>{previewNote.authorName || "Faculty Resource"}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
                <a
                  href={`/${previewNote.storagePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition"
                >
                  <ExternalLink className="h-3.5 w-3.5 mr-1" />
                  Open Tab
                </a>

                <a
                  href={`/api/notes/download?file=${encodeURIComponent(
                    previewNote.storedFileName
                  )}&name=${encodeURIComponent(previewNote.title)}`}
                  className="inline-flex items-center px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm transition"
                >
                  <Download className="h-3.5 w-3.5 mr-1.5" />
                  Download
                </a>

                <button aria-label="Close preview"
                  onClick={() => setPreviewNote(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Embedded PDF Viewer */}
            <div className="flex-1 bg-slate-100 relative">
              <object
                data={`/${previewNote.storagePath}#toolbar=1&navpanes=0`}
                type="application/pdf"
                className="w-full h-full"
              >
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <FileText className="h-12 w-12 text-slate-400 mb-3" />
                  <p className="text-sm font-semibold text-slate-800 mb-2">
                    PDF Preview Not Supported by Browser
                  </p>
                  <a
                    href={`/api/notes/download?file=${encodeURIComponent(
                      previewNote.storedFileName
                    )}&name=${encodeURIComponent(previewNote.title)}`}
                    className="inline-flex items-center px-4 py-2 text-xs font-semibold text-white bg-emerald-800 rounded-lg shadow-sm"
                  >
                    <Download className="h-4 w-4 mr-1.5" />
                    Download Document Instead
                  </a>
                </div>
              </object>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

