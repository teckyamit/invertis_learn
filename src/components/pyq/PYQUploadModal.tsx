"use client";

import React, { useState } from "react";
import { X, Upload, FileText, CheckCircle2, AlertCircle } from "lucide-react";

interface PYQUploadModalProps {
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function PYQUploadModal({
  subjectId,
  subjectCode,
  subjectName,
  isOpen,
  onClose,
  onSuccess,
}: PYQUploadModalProps) {
  const [academicYear, setAcademicYear] = useState("2022-2023");
  const [examType, setExamType] = useState("END_SEMESTER");
  const [title, setTitle] = useState(`${subjectCode} End-Semester Examination (2022-23)`);
  const [hasSolutions, setHasSolutions] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleYearChange = (year: string) => {
    setAcademicYear(year);
    const shortYear = year.replace(/20(\d\d)-20(\d\d)/, "$1-$2");
    const typeLabel = examType === "MID_SEMESTER" ? "Mid-Semester" : "End-Semester";
    setTitle(`${subjectCode} ${typeLabel} Examination (${shortYear})`);
  };

  const handleTypeChange = (type: string) => {
    setExamType(type);
    const shortYear = academicYear.replace(/20(\d\d)-20(\d\d)/, "$1-$2");
    const typeLabel = type === "MID_SEMESTER" ? "Mid-Semester" : "End-Semester";
    setTitle(`${subjectCode} ${typeLabel} Examination (${shortYear})`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a PDF question paper document.");
      return;
    }

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setError("Only PDF files are supported.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("subjectId", subjectId);
      formData.append("title", title);
      formData.append("academicYear", academicYear);
      formData.append("examType", examType);
      formData.append("hasSolutions", hasSolutions ? "true" : "false");
      formData.append("file", file);

      const res = await fetch("/api/pyq", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Upload failed");
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "An error occurred while uploading.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
              <Upload className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Upload Question Paper</h3>
              <p className="text-xs text-slate-400">{subjectCode} • {subjectName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center">
              <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Academic Year Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Examination Academic Session
            </label>
            <select
              value={academicYear}
              onChange={(e) => handleYearChange(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="2023-2024">Session 2023–2024</option>
              <option value="2022-2023">Session 2022–2023</option>
              <option value="2021-2022">Session 2021–2022</option>
              <option value="2020-2021">Session 2020–2021</option>
              <option value="2019-2020">Session 2019–2020</option>
            </select>
          </div>

          {/* Examination Type Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Examination Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "END_SEMESTER", label: "End-Semester" },
                { id: "MID_SEMESTER", label: "Mid-Semester" },
                { id: "BACK_PAPER", label: "Carry Over" },
              ].map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => handleTypeChange(type.id)}
                  className={`py-2 px-2 text-xs font-semibold rounded-lg border transition text-center ${
                    examType === type.id
                      ? "bg-blue-50 border-blue-600 text-blue-900"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Document Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium text-slate-800"
              required
            />
          </div>

          {/* File Picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Official PDF File
            </label>
            <div className="border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-xl p-4 text-center transition bg-slate-50 cursor-pointer">
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
                id="pyq-file-input"
              />
              <label htmlFor="pyq-file-input" className="cursor-pointer block">
                <FileText className="h-8 w-8 text-slate-400 mx-auto mb-1.5" />
                {file ? (
                  <span className="text-xs font-semibold text-blue-700 block truncate">
                    {file.name} ({(file.size / 1024).toFixed(0)} KB)
                  </span>
                ) : (
                  <>
                    <span className="text-xs font-semibold text-slate-700 block">
                      Click to choose question paper PDF
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Accepts university PDF format only
                    </span>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Solutions Checkbox */}
          <div className="flex items-center space-x-2 pt-1">
            <input
              type="checkbox"
              id="hasSolutions"
              checked={hasSolutions}
              onChange={(e) => setHasSolutions(e.target.checked)}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <label htmlFor="hasSolutions" className="text-xs text-slate-700 select-none">
              Answer key or faculty solutions included in this document
            </label>
          </div>

          {/* Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={uploading}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition disabled:opacity-50 flex items-center"
            >
              {uploading ? "Uploading..." : "Save Question Paper"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

