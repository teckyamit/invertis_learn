"use client";

import React, { useState } from "react";
import { Download, ExternalLink, FileText, CheckCircle2 } from "lucide-react";

interface PDFViewerProps {
  filePath: string;
  fileName: string;
  title: string;
  fileSizeBytes?: number;
}

export function PDFViewer({ filePath, fileName, title, fileSizeBytes }: PDFViewerProps) {
  const [downloading, setDownloading] = useState(false);

  // Formatted file size string
  const formattedSize = fileSizeBytes
    ? `${(fileSizeBytes / 1024).toFixed(0)} KB`
    : "PDF Document";

  // Web path to static file
  const staticPdfUrl = `/uploads/syllabus/${fileName}`;
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
      {/* Viewer Header / Toolbar */}
      <div className="bg-slate-900 text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
            <FileText className="h-5 w-5" />
          </div>
          <div className="truncate">
            <h4 className="text-sm font-semibold text-white truncate">{title}</h4>
            <div className="flex items-center space-x-2 text-xs text-slate-400 mt-0.5">
              <span>{fileName}</span>
              <span>•</span>
              <span className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 font-mono">
                {formattedSize}
              </span>
              <span>•</span>
              <span className="text-emerald-400 font-medium">Official Invertis University Document</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href={staticPdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition"
            title="Open PDF in a new tab"
          >
            <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
            Open in Tab
          </a>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="inline-flex items-center px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm transition disabled:opacity-75"
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

      {/* Embedded Object / Iframe */}
      <div className="relative w-full bg-slate-100" style={{ height: "650px" }}>
        <object
          data={`${staticPdfUrl}#toolbar=1&navpanes=0`}
          type="application/pdf"
          className="w-full h-full"
        >
          <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-slate-50">
            <div className="p-4 bg-emerald-50 text-emerald-700 rounded-2xl mb-4">
              <FileText className="h-12 w-12" />
            </div>
            <h5 className="text-lg font-semibold text-slate-900 mb-1">
              Official University Syllabus Document
            </h5>
            <p className="text-sm text-slate-600 max-w-md mb-6">
              Your browser may not support inline PDF preview. You can open the syllabus document directly or download it to your device.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={staticPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 shadow-sm"
              >
                Open in Fullscreen
              </a>
              <button
                onClick={handleDownload}
                className="px-4 py-2 text-sm font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 shadow-sm flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF ({formattedSize})
              </button>
            </div>
          </div>
        </object>
      </div>

      {/* Footer Notice */}
      <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
        <span>Verified authentic curriculum document approved by Invertis University Academic Council</span>
        <span className="font-mono text-slate-400">PDF • Session 2023-2024</span>
      </div>
    </div>
  );
}

