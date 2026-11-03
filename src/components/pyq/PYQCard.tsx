"use client";

import React from "react";
import { Download, FileText, Calendar, CheckCircle2, Award, Eye } from "lucide-react";

export interface PYQResource {
  id: string;
  title: string;
  originalFileName: string;
  storedFileName: string;
  storagePath: string;
  fileSizeBytes: number;
  academicYear: string | null;
  examType: string | null;
  hasSolutions: boolean;
  createdAt: string | Date;
}

interface PYQCardProps {
  pyq: PYQResource;
  onPreview?: (pyq: PYQResource) => void;
}

export function PYQCard({ pyq, onPreview }: PYQCardProps) {
  const formattedSize = pyq.fileSizeBytes
    ? `${(pyq.fileSizeBytes / 1024).toFixed(0)} KB`
    : "PDF";

  const downloadUrl = `/api/pyq/download?file=${encodeURIComponent(pyq.storedFileName)}&name=${encodeURIComponent(pyq.title)}`;

  const examTypeLabel =
    pyq.examType === "MID_SEMESTER"
      ? "Mid-Semester Examination"
      : pyq.examType === "BACK_PAPER"
      ? "Carry Over / Back Paper"
      : "End-Semester Examination";

  const examTypeBadge =
    pyq.examType === "MID_SEMESTER"
      ? "bg-amber-50 text-amber-800 border-amber-200"
      : pyq.examType === "BACK_PAPER"
      ? "bg-purple-50 text-purple-800 border-purple-200"
      : "bg-blue-50 text-blue-800 border-blue-200";

  return (
    <div className="bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition p-5 flex flex-col justify-between group">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center text-xs font-bold px-2.5 py-1 bg-slate-900 text-white rounded-md tracking-wider">
            <Calendar className="h-3 w-3 mr-1 text-amber-400" />
            Session {pyq.academicYear || "Past Year"}
          </span>
          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${examTypeBadge}`}>
            {examTypeLabel}
          </span>
        </div>

        {/* Paper Title */}
        <h4 className="font-bold text-slate-900 group-hover:text-blue-800 transition line-clamp-2 text-sm leading-snug mb-2">
          {pyq.title}
        </h4>

        {/* Details */}
        <div className="flex items-center space-x-3 text-xs text-slate-500 mb-4">
          <span className="flex items-center">
            <FileText className="h-3.5 w-3.5 mr-1 text-slate-400" />
            {formattedSize}
          </span>
          <span>•</span>
          {pyq.hasSolutions ? (
            <span className="inline-flex items-center text-emerald-700 font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-emerald-600" />
              Solutions Included
            </span>
          ) : (
            <span className="text-slate-400">Question Paper Only</span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        {onPreview && (
          <button
            onClick={() => onPreview(pyq)}
            className="flex-1 inline-flex items-center justify-center px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
          >
            <Eye className="h-3.5 w-3.5 mr-1 text-slate-500" />
            Preview
          </button>
        )}

        <a
          href={downloadUrl}
          className="flex-1 inline-flex items-center justify-center px-3 py-1.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition"
        >
          <Download className="h-3.5 w-3.5 mr-1" />
          Download
        </a>
      </div>
    </div>
  );
}

