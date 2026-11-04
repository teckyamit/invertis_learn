"use client";

import React, { useState } from "react";
import { Download, ExternalLink, FileText, CheckCircle2, ShieldCheck } from "lucide-react";

interface PDFViewerProps {
  filePath: string;
  fileName: string;
  title: string;
  fileSizeBytes?: number;
}

/**
 * Universal Official Syllabus PDF Document Card
 * (Phase 3 Standard: Zero embedded iframe/object viewers; pure validated download action)
 */
export function PDFViewer({ filePath, fileName, title, fileSizeBytes }: PDFViewerProps) {
  const [downloading, setDownloading] = useState(false);

  // Formatted file size string
  const formattedSize = fileSizeBytes
    ? `${(fileSizeBytes / 1024).toFixed(0)} KB`
    : "PDF Document";

  // Web path to static file
  const staticPdfUrl = filePath
    ? (filePath.startsWith("/") ? filePath : `/${filePath}`)
    : `/uploads/syllabus/${fileName}`;
  const downloadUrl = `/api/syllabus/download?file=${encodeURIComponent(fileName)}&name=${encodeURIComponent(title)}`;

  const handleDownload = () => {
    setDownloading(true);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloading(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Document Information & Action Bar */}
      <div className="bg-slate-900 text-white p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5 min-w-0">
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl flex-shrink-0">
            <FileText className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-semibold text-white truncate">{title}</h4>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-1">
              <span className="font-mono text-slate-300">{fileName}</span>
              <span>•</span>
              <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono text-[11px]">
                {formattedSize}
              </span>
              <span>•</span>
              <span className="text-emerald-400 font-medium">Official Invertis University Document</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-shrink-0 w-full sm:w-auto">
          <a
            href={staticPdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-3.5 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl transition flex-1 sm:flex-initial"
            title="Open PDF in a new tab"
          >
            <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
            Open in Tab
          </a>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-sm transition disabled:opacity-75 flex-1 sm:flex-initial"
            title="Download PDF"
          >
            {downloading ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 mr-1.5 animate-pulse text-emerald-200" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="h-3.5 w-3.5 mr-1.5" />
                Download PDF
              </>
            )}
          </button>
        </div>
      </div>

      {/* Footer Notice */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
        <span className="flex items-center">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 mr-1.5 flex-shrink-0" />
          Verified authentic curriculum document approved by Invertis University Academic Council
        </span>
        <span className="font-mono text-slate-400 hidden sm:inline">PDF • Session 2023-2024</span>
      </div>
    </div>
  );
}
