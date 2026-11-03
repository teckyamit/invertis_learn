"use client";

import React, { useState, useMemo } from "react";
import { FileQuestion, Filter, Plus, Calendar, AlertCircle, X, Download, ExternalLink } from "lucide-react";
import { PYQCard, PYQResource } from "./PYQCard";
import { PYQUploadModal } from "./PYQUploadModal";

interface PYQSectionProps {
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  initialPyqs: PYQResource[];
}

export function PYQSection({
  subjectId,
  subjectCode,
  subjectName,
  initialPyqs,
}: PYQSectionProps) {
  const [pyqs, setPyqs] = useState<PYQResource[]>(initialPyqs);
  const [selectedYear, setSelectedYear] = useState<string>("ALL");
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [previewPyq, setPreviewPyq] = useState<PYQResource | null>(null);

  // Derive unique years available
  const availableYears = useMemo(() => {
    const years = new Set<string>();
    pyqs.forEach((p) => {
      if (p.academicYear) years.add(p.academicYear);
    });
    return ["ALL", ...Array.from(years)];
  }, [pyqs]);

  // Filtered papers
  const filteredPyqs = useMemo(() => {
    return pyqs.filter((p) => {
      const matchesYear = selectedYear === "ALL" || p.academicYear === selectedYear;
      const matchesType = selectedType === "ALL" || p.examType === selectedType;
      return matchesYear && matchesType;
    });
  }, [pyqs, selectedYear, selectedType]);

  const refreshPyqs = async () => {
    try {
      const res = await fetch(`/api/pyq?subjectId=${subjectId}`);
      if (res.ok) {
        const data = await res.json();
        setPyqs(data.pyqs || []);
      }
    } catch (e) {
      console.error("Failed to refresh PYQ list", e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-blue-50 text-blue-700 rounded-lg">
            <FileQuestion className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Previous-Year Question Papers (PYQs)
            </h2>
            <p className="text-xs text-slate-500">
              Official past university end-semester and mid-semester examination papers
            </p>
          </div>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="inline-flex items-center justify-center px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-sm transition"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          Upload Question Paper
        </button>
      </div>

      {/* Filter Bar (if papers exist) */}
      {pyqs.length > 0 && (
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Year Filter */}
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-500 uppercase tracking-wider flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              Session:
            </span>
            <div className="flex items-center space-x-1 overflow-x-auto">
              {availableYears.map((yr) => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-2.5 py-1 rounded-md font-semibold transition ${
                    selectedYear === yr
                      ? "bg-blue-700 text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-slate-200 border border-slate-200"
                  }`}
                >
                  {yr === "ALL" ? `All (${pyqs.length})` : yr}
                </button>
              ))}
            </div>
          </div>

          {/* Exam Type Filter */}
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-500 uppercase tracking-wider flex items-center">
              <Filter className="h-3.5 w-3.5 mr-1" />
              Type:
            </span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-white border border-slate-200 rounded-md px-2 py-1 text-xs font-medium text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Types</option>
              <option value="END_SEMESTER">End-Semester Exams</option>
              <option value="MID_SEMESTER">Mid-Semester Exams</option>
              <option value="BACK_PAPER">Carry Over / Back</option>
            </select>
          </div>
        </div>
      )}

      {/* Results Grid */}
      {filteredPyqs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPyqs.map((pyq) => (
            <PYQCard
              key={pyq.id}
              pyq={pyq}
              onPreview={(item) => setPreviewPyq(item)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center">
          <div className="mx-auto w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
            <FileQuestion className="h-6 w-6" />
          </div>
          <h4 className="text-base font-bold text-slate-800 mb-1">
            {pyqs.length === 0
              ? `No Question Papers Uploaded for ${subjectCode} Yet`
              : "No papers match your selected filter"}
          </h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto mb-5 leading-relaxed">
            {pyqs.length === 0
              ? "Official previous-year end-semester and mid-semester papers for this subject can be archived here. Faculty members and department admins can upload verified papers."
              : "Try switching sessions or exam types to view all archived papers."}
          </p>
          <button
            onClick={() => {
              if (pyqs.length === 0) {
                setUploadModalOpen(true);
              } else {
                setSelectedYear("ALL");
                setSelectedType("ALL");
              }
            }}
            className="inline-flex items-center px-4 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
          >
            {pyqs.length === 0 ? (
              <>
                <Plus className="h-3.5 w-3.5 mr-1.5" />
                Upload First Past Paper
              </>
            ) : (
              "Reset Filters"
            )}
          </button>
        </div>
      )}

      {/* Upload Modal */}
      <PYQUploadModal
        subjectId={subjectId}
        subjectCode={subjectCode}
        subjectName={subjectName}
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onSuccess={refreshPyqs}
      />

      {/* In-Browser PDF Preview Modal */}
      {previewPyq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-4xl w-full h-[85vh] border border-slate-200 shadow-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
              <div className="truncate">
                <h4 className="text-sm font-semibold truncate text-white">{previewPyq.title}</h4>
                <p className="text-xs text-slate-400">
                  Session {previewPyq.academicYear} • Invertis University Official Examination Paper
                </p>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <a
                  href={`/uploads/pyq/${previewPyq.storedFileName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center"
                >
                  <ExternalLink className="h-3.5 w-3.5 mr-1" />
                  New Tab
                </a>
                <a
                  href={`/api/pyq/download?file=${encodeURIComponent(previewPyq.storedFileName)}&name=${encodeURIComponent(previewPyq.title)}`}
                  className="px-3 py-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center"
                >
                  <Download className="h-3.5 w-3.5 mr-1" />
                  Download
                </a>
                <button
                  onClick={() => setPreviewPyq(null)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Embedded PDF Viewer */}
            <div className="flex-1 bg-slate-100">
              <object
                data={`/uploads/pyq/${previewPyq.storedFileName}#toolbar=1`}
                type="application/pdf"
                className="w-full h-full"
              >
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <p className="text-sm text-slate-600 mb-4">
                    PDF preview not supported in this browser.
                  </p>
                  <a
                    href={`/api/pyq/download?file=${encodeURIComponent(previewPyq.storedFileName)}&name=${encodeURIComponent(previewPyq.title)}`}
                    className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 rounded-lg shadow-sm"
                  >
                    Download Question Paper PDF
                  </a>
                </div>
              </object>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
