"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { HelpCircle, Check, AlertCircle, Send, X } from "lucide-react";

interface ResourceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: {
    id: string;
    code: string;
    name: string;
    programmeCode?: string;
    semesterNumber?: number;
  };
  initialCategory?: "PYQ" | "NOTES" | "LAB_MANUAL" | "OTHER";
}

export function ResourceRequestModal({
  isOpen,
  onClose,
  subject,
  initialCategory = "PYQ",
}: ResourceRequestModalProps) {
  const [category, setCategory] = useState<"PYQ" | "NOTES" | "LAB_MANUAL" | "OTHER">(initialCategory);
  const [academicYear, setAcademicYear] = useState<string>("2023-2024");
  const [description, setDescription] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/resources/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subjectId: subject.id,
          subjectCode: subject.code,
          subjectName: subject.name,
          programmeCode: subject.programmeCode || "",
          semesterNumber: subject.semesterNumber,
          category,
          academicYear: category === "PYQ" ? academicYear : "",
          description: description.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit resource request.");
      }

      setSuccessMessage(data.message || "Your request has been logged! Curators prioritize frequently requested material.");
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
      label={`Request Study Material · ${subject.code}`}
      onClose={handleClose}
    >
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-blue-50 text-blue-700 rounded-lg">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-slate-900">
                Request Study Material
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

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-xs text-blue-900 leading-relaxed">
          <strong>Cannot find past papers or notes for {subject.name}?</strong>
          <p className="mt-1 text-blue-800">
            Submit a request below. Our academic curation team tracks student demand to source missing official examination papers and faculty notes.
          </p>
        </div>

        {successMessage ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Check className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-emerald-950">Request Submitted</h4>
            <p className="text-xs text-emerald-800 leading-relaxed">{successMessage}</p>
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Requested Resource Category <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { key: "PYQ", label: "Past Paper (PYQ)" },
                  { key: "NOTES", label: "Study Notes" },
                  { key: "LAB_MANUAL", label: "Lab Manual" },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setCategory(item.key as any)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition cursor-pointer ${
                      category === item.key
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {category === "PYQ" && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Examination Session / Year
                </label>
                <select
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="2023-2024">Session 2023–2024</option>
                  <option value="2022-2023">Session 2022–2023</option>
                  <option value="2021-2022">Session 2021–2022</option>
                  <option value="2020-2021">Session 2020–2021</option>
                  <option value="ANY">Any Available Past Year</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Details or Specific Topic <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={500}
                rows={3}
                placeholder="e.g. Need Mid-Semester paper or Unit 2 formula cheat sheet..."
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
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? "Submitting..." : "Submit Request"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
