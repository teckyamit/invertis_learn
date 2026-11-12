"use client";
import { provenanceLabel } from "@/lib/resource-policy";
import { Modal } from "@/components/ui/Modal";

import React, { useState, useMemo } from "react";
import {
  FlaskConical,
  FileText,
  Code,
  HelpCircle,
  Download,
  ExternalLink,
  Eye,
  Search,
  X,
  CheckCircle2,
  ListOrdered,
  ChevronDown,
  ChevronUp
} from "lucide-react";

export interface LabResource {
  id: string;
  title: string;
  originalFileName: string;
  storedFileName: string;
  provenanceStatus?: string;
  storagePath: string;
  fileSizeBytes: number;
  authorName?: string | null;
  resourceType?: string | null;
  createdAt: Date | string;
}

interface LabManualSectionProps {
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  initialLabs: LabResource[];
  labExperiments?: string[];
}

export function LabManualSection({
  subjectId,
  subjectCode,
  subjectName,
  initialLabs,
  labExperiments = [],
}: LabManualSectionProps) {
  const [labs] = useState<LabResource[]>(initialLabs);
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [previewLab, setPreviewLab] = useState<LabResource | null>(null);
  const [showAllExperiments, setShowAllExperiments] = useState(false);

  // Filtered lab resources
  const filteredLabs = useMemo(() => {
    return labs.filter((l) => {
      const matchesType = selectedType === "ALL" || l.resourceType === selectedType;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        l.title.toLowerCase().includes(q) ||
        (l.authorName && l.authorName.toLowerCase().includes(q)) ||
        (l.resourceType && l.resourceType.toLowerCase().includes(q));

      return matchesType && matchesSearch;
    });
  }, [labs, selectedType, searchQuery]);

  const getTypeIcon = (type?: string | null) => {
    switch (type) {
      case "LAB_MANUAL":
        return <FlaskConical className="h-4 w-4 text-emerald-600" />;
      case "VIVA_QUESTIONS":
        return <HelpCircle className="h-4 w-4 text-purple-600" />;
      case "CODE_TEMPLATE":
        return <Code className="h-4 w-4 text-blue-600" />;
      default:
        return <FileText className="h-4 w-4 text-slate-600" />;
    }
  };

  const getTypeBadge = (type?: string | null) => {
    switch (type) {
      case "LAB_MANUAL":
        return (
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            Laboratory Manual
          </span>
        );
      case "VIVA_QUESTIONS":
        return (
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200">
            Viva Voce Q&A
          </span>
        );
      case "CODE_TEMPLATE":
        return (
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
            Starter Code Template
          </span>
        );
      default:
        return (
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            Practical Material
          </span>
        );
    }
  };

  const displayedExperiments = showAllExperiments
    ? labExperiments
    : labExperiments.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
            <FlaskConical className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-slate-900">
                Official Laboratory Manuals & Practical Materials
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase tracking-wide">
                Phase 4 Verified
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Department lab manuals, code templates, viva voce questions, and experiment guides
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-600 font-medium bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg flex items-center">
          <CheckCircle2 className="h-4 w-4 mr-1.5 text-emerald-600" />
          <span>Curriculum Compliant (Session 2023–24)</span>
        </div>
      </div>

      {/* Prescribed Lab Experiments Card (if available) */}
      {labExperiments && labExperiments.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <ListOrdered className="h-4 w-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-slate-900">
                Prescribed Experiments ({labExperiments.length} Total Exercises)
              </h3>
            </div>
            {labExperiments.length > 6 && (
              <button
                onClick={() => setShowAllExperiments(!showAllExperiments)}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center"
              >
                {showAllExperiments ? (
                  <>
                    Show Less <ChevronUp className="h-3.5 w-3.5 ml-1" />
                  </>
                ) : (
                  <>
                    View All {labExperiments.length} Experiments <ChevronDown className="h-3.5 w-3.5 ml-1" />
                  </>
                )}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {displayedExperiments.map((exp, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-800 flex items-start space-x-2"
              >
                <span className="font-mono font-bold text-emerald-700 flex-shrink-0 mt-0.5">
                  #{idx + 1}
                </span>
                <span className="leading-relaxed">{exp.replace(/^\d+\.\s*/, '')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter and Search Controls (if lab resources exist) */}
      {labs.length > 0 && (
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs">
          {/* Search Input */}
          <div className="relative flex-1 max-w-sm">
            <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search lab manuals, viva or templates..."
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

          {/* Type Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-semibold text-slate-500 uppercase tracking-wider mr-1 text-[11px]">
              Type:
            </span>
            {[
              { key: "ALL", label: "All Practical Docs" },
              { key: "LAB_MANUAL", label: "Lab Manuals" },
              { key: "VIVA_QUESTIONS", label: "Viva Questions" },
              { key: "CODE_TEMPLATE", label: "Code Templates" },
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
      )}

      {/* Lab Resources Grid */}
      {filteredLabs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLabs.map((lab) => {
            const formattedSize = lab.fileSizeBytes
              ? `${(lab.fileSizeBytes / 1024).toFixed(0)} KB`
              : "PDF Document";
            const downloadUrl = `/api/lab-manual/download?file=${encodeURIComponent(
              lab.storedFileName
            )}&name=${encodeURIComponent(lab.title)}`;

            return (
              <div
                key={lab.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 bg-slate-50 rounded-lg border border-slate-100">
                        {getTypeIcon(lab.resourceType)}
                      </div>
                      {getTypeBadge(lab.resourceType)}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                      {lab.title}
                    </h3>
        <p className="text-xs text-amber-800 mt-2">{provenanceLabel(lab.provenanceStatus)}</p>
                    {lab.authorName && (
                      <p className="text-xs text-slate-500 mt-1">
                        Coordinator: <span className="font-medium text-slate-700">{lab.authorName}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-400 text-[11px]">{formattedSize}</span>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setPreviewLab(lab)}
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
      ) : labs.length > 0 ? (
        <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-8 text-center space-y-2">
          <p className="text-xs font-semibold text-slate-700">No lab documents match the selected filter.</p>
          <button
            onClick={() => {
              setSelectedType("ALL");
              setSearchQuery("");
            }}
            className="text-xs text-emerald-700 underline font-semibold"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-8 text-center space-y-2">
          <FlaskConical className="h-8 w-8 text-slate-400 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-slate-800">Lab Manual Under Academic Compilation</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Practical manuals, code templates, and viva questions for <strong>{subjectCode}</strong> are being compiled by the Department of Computer Science & Engineering.
          </p>
        </div>
      )}

      {/* In-Browser PDF Preview Modal */}
      {previewLab && (
        <Modal label="Lab resource preview" onClose={() => setPreviewLab(null)}>
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                  {getTypeIcon(previewLab.resourceType)}
                </div>
                <div className="truncate">
                  <h4 className="text-sm font-bold truncate text-white">
                    {previewLab.title}
                  </h4>
                  <div className="flex items-center space-x-2 text-xs text-slate-400 mt-0.5">
                    <span>{subjectCode}</span>
                    <span>•</span>
                    <span>{previewLab.authorName || "Department Laboratory Resource"}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
                <a
                  href={`/${previewLab.storagePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition"
                >
                  <ExternalLink className="h-3.5 w-3.5 mr-1" />
                  Open Tab
                </a>

                <a
                  href={`/api/lab-manual/download?file=${encodeURIComponent(
                    previewLab.storedFileName
                  )}&name=${encodeURIComponent(previewLab.title)}`}
                  className="inline-flex items-center px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm transition"
                >
                  <Download className="h-3.5 w-3.5 mr-1.5" />
                  Download
                </a>

                <button aria-label="Close preview"
                  onClick={() => setPreviewLab(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Embedded PDF Viewer */}
            <div className="flex-1 bg-slate-100 relative">
              <object
                data={`/${previewLab.storagePath}#toolbar=1&navpanes=0`}
                type="application/pdf"
                className="w-full h-full"
              >
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <FlaskConical className="h-12 w-12 text-slate-400 mb-3" />
                  <p className="text-sm font-semibold text-slate-800 mb-2">
                    PDF Preview Not Supported by Browser
                  </p>
                  <a
                    href={`/api/lab-manual/download?file=${encodeURIComponent(
                      previewLab.storedFileName
                    )}&name=${encodeURIComponent(previewLab.title)}`}
                    className="inline-flex items-center px-4 py-2 text-xs font-semibold text-white bg-emerald-800 rounded-lg shadow-sm"
                  >
                    <Download className="h-4 w-4 mr-1.5" />
                    Download Lab Manual Instead
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

