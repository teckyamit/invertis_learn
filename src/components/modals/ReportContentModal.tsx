"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Check, AlertCircle, Flag, X } from "lucide-react";

interface ReportContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: {
    id: string;
    code: string;
    name: string;
  };
  resourceId?: string;
  resourceTitle?: string;
}

export function ReportContentModal({
  isOpen,
  onClose,
  subject,
  resourceId,
  resourceTitle,
}: ReportContentModalProps) {
  const [issueType, setIssueType] = useState<string>("INCORRECT_SYLLABUS");
  const [description, setDescription] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || description.trim().length < 5) {
      setErrorMessage("Please provide a brief description of the issue (at least 5 characters).");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/resources/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subjectId: subject.id,
          subjectCode: subject.code,
          resourceId: resourceId || undefined,
          issueType,
          description: description.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit content report.");
      }

      setSuccessMessage(data.message || "Thank you. Your report has been submitted for curator review.");
      setDescription("");
    } catch (err: any) {
      setErrorMessage(err.message || "Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!submitting) {
      setSuccessMessage("");
      setErrorMessage("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      label={`Report Academic Issue · ${subject.code}`}
      onClose={handleClose}
    >
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-rose-50 text-rose-700 rounded-lg">
              <Flag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-slate-900">
                Report Content or Syllabus Issue
              </h3>
              <p className="text-xs text-slate-500">{subject.code} · {subject.name}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={submitting}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {resourceTitle && (
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
            <span className="font-semibold text-slate-900 block">Referenced Resource:</span>
            <span className="font-mono text-slate-600">{resourceTitle}</span>
          </div>
        )}

        {successMessage ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Check className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-emerald-950">Report Submitted</h4>
            <p className="text-xs text-emerald-800 leading-relaxed">{successMessage}</p>
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Type of Issue <span className="text-rose-500">*</span>
              </label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="INCORRECT_SYLLABUS">Discrepancy in Syllabus / Units</option>
                <option value="BROKEN_PDF">PDF Document Fails to Open or Corrupted</option>
                <option value="WRONG_SEMESTER">Subject Appears in Wrong Semester</option>
                <option value="MISSING_EXPERIMENTS">Missing or Incorrect Lab Experiments</option>
                <option value="INCORRECT_REFERENCE_BOOK">Outdated or Incorrect Reference Books</option>
                <option value="UNAVAILABLE_VIDEO">Video Lecture Link Broken or Deleted</option>
                <option value="OTHER">Other Academic Data Anomaly</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Description of the Discrepancy <span className="text-rose-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                maxLength={1000}
                rows={4}
                placeholder="Please describe what is incorrect or what official syllabus states..."
                className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleClose}
                disabled={submitting}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer disabled:opacity-50"
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{submitting ? "Submitting..." : "Submit Report"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
