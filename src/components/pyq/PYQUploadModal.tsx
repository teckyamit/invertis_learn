"use client";

import { useState, useEffect, useId } from "react";
import { Modal } from "@/components/ui/Modal";
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Loader2, 
  ShieldCheck, 
  BookOpen
} from "lucide-react";

interface SubjectOption {
  id: string;
  code: string;
  name: string;
}

interface SemesterOption {
  id: string;
  semesterNumber: number;
  title: string;
  subjects: SubjectOption[];
}

interface ProgrammeOption {
  id: string;
  code: string;
  name: string;
  category: string;
  semesters: SemesterOption[];
}

interface Props {
  subjectId?: string;
  subjectCode?: string;
  subjectName?: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function PYQUploadModal({
  subjectId: initialSubjectId,
  subjectCode: initialSubjectCode,
  subjectName: initialSubjectName,
  isOpen,
  onClose,
  onSuccess
}: Props) {
  const [hierarchy, setHierarchy] = useState<ProgrammeOption[]>([]);
  const [loadingHierarchy, setLoadingHierarchy] = useState(false);

  const [selectedProgramme, setSelectedProgramme] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<number | "">("");
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(initialSubjectId || "");
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>(initialSubjectCode || "");
  const [selectedSubjectName, setSelectedSubjectName] = useState<string>(initialSubjectName || "");

  const [title, setTitle] = useState<string>("");
  const [academicYear, setAcademicYear] = useState<string>("2025-2026");
  const [examType, setExamType] = useState<string>("END_SEMESTER");
  const [hasSolutions, setHasSolutions] = useState<boolean>(false);
  const [sourceReference, setSourceReference] = useState<string>("");

  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>("");

  const [uploading, setUploading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successData, setSuccessData] = useState<{ id: string; reference: string; message: string } | null>(null);

  // Form input IDs
  const programmeSelectId = useId();
  const semesterSelectId = useId();
  const subjectSelectId = useId();
  const titleInputId = useId();
  const yearSelectId = useId();
  const examTypeSelectId = useId();
  const sourceInputId = useId();
  const fileInputId = useId();
  const solutionsCheckboxId = useId();

  // If initial subject changes or is provided
  useEffect(() => {
    if (initialSubjectId) {
      setSelectedSubjectId(initialSubjectId);
      setSelectedSubjectCode(initialSubjectCode || "");
      setSelectedSubjectName(initialSubjectName || "");
      if (!title) {
        setTitle(`${initialSubjectCode || "Subject"} Question Paper`);
      }
    }
  }, [initialSubjectId, initialSubjectCode, initialSubjectName, title]);

  // Fetch catalogue hierarchy if needed (for global selection)
  useEffect(() => {
    if (isOpen && !initialSubjectId && hierarchy.length === 0) {
      setLoadingHierarchy(true);
      fetch("/api/catalogue/hierarchy")
        .then(r => r.json())
        .then(data => {
          if (data.programmes) {
            setHierarchy(data.programmes);
            if (data.programmes.length > 0) {
              setSelectedProgramme(data.programmes[0].code);
            }
          }
        })
        .catch(err => console.error("Error fetching hierarchy:", err))
        .finally(() => setLoadingHierarchy(false));
    }
  }, [isOpen, initialSubjectId, hierarchy.length]);

  // Available semesters for current programme
  const currentProgrammeData = hierarchy.find(p => p.code === selectedProgramme);
  const availableSemesters = currentProgrammeData?.semesters || [];

  // Available subjects for current semester
  const currentSemesterData = availableSemesters.find(s => s.semesterNumber === selectedSemester);
  const availableSubjects = currentSemesterData?.subjects || [];

  const handleProgrammeChange = (code: string) => {
    setSelectedProgramme(code);
    setSelectedSemester("");
    setSelectedSubjectId("");
    setSelectedSubjectCode("");
    setSelectedSubjectName("");
  };

  const handleSemesterChange = (semNum: number) => {
    setSelectedSemester(semNum);
    setSelectedSubjectId("");
    setSelectedSubjectCode("");
    setSelectedSubjectName("");
  };

  const handleSubjectChange = (id: string) => {
    setSelectedSubjectId(id);
    const sub = availableSubjects.find(s => s.id === id);
    if (sub) {
      setSelectedSubjectCode(sub.code);
      setSelectedSubjectName(sub.name);
      setTitle(`${sub.code} Question Paper`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError("");
    const selected = e.target.files?.[0];
    if (!selected) {
      setFile(null);
      return;
    }
    if (!selected.name.toLowerCase().endsWith(".pdf") && selected.type !== "application/pdf") {
      setFileError("Only PDF files (.pdf) are permitted.");
      setFile(null);
      return;
    }
    if (selected.size > 10 * 1024 * 1024) {
      setFileError(`File size exceeds 10 MB limit (${(selected.size / (1024 * 1024)).toFixed(1)} MB).`);
      setFile(null);
      return;
    }
    if (selected.size === 0) {
      setFileError("Selected file is empty.");
      setFile(null);
      return;
    }
    setFile(selected);
  };

  const resetForm = () => {
    setFile(null);
    setFileError("");
    setErrorMessage("");
    setSuccessData(null);
    if (!initialSubjectId) {
      setSelectedSemester("");
      setSelectedSubjectId("");
      setSelectedSubjectCode("");
      setSelectedSubjectName("");
    }
  };

  const close = () => {
    if (!uploading) {
      resetForm();
      onClose();
    }
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");

    if (!selectedSubjectId) {
      setErrorMessage("Please select a valid subject for this paper.");
      return;
    }

    if (!file) {
      setErrorMessage("Please select a PDF document to upload.");
      return;
    }

    const formData = new FormData();
    formData.set("subjectId", selectedSubjectId);
    formData.set("title", title || `${selectedSubjectCode} Question Paper`);
    formData.set("academicYear", academicYear);
    formData.set("examType", examType);
    formData.set("hasSolutions", hasSolutions ? "true" : "false");
    formData.set("sourceReference", sourceReference.trim() || "Student submission");
    formData.set("file", file);

    setUploading(true);

    try {
      const response = await fetch("/api/pyq", {
        method: "POST",
        headers: {
          "x-submission-source": "student",
          "x-student-submission": "true",
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Submission failed. Please check the form.");
      }

      setSuccessData({
        id: data.id,
        reference: data.reference || data.id.slice(0, 8).toUpperCase(),
        message: data.message || "Paper submitted successfully!",
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Submission failed. Please retry.");
    } finally {
      setUploading(false);
    }
  }

  if (!isOpen) return null;

  const fieldClass = "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition";

  return (
    <Modal label="Submit question paper" onClose={close}>
      <div className="bg-white rounded-2xl w-full max-w-xl max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl">
              <Upload className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg sm:text-xl text-slate-900">
                Submit Question Paper
              </h2>
              <p className="text-xs text-slate-500">
                Contribute past examination papers to Invertis Learn
              </p>
            </div>
          </div>
          <button
            onClick={close}
            disabled={uploading}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition disabled:opacity-50"
            aria-label="Close upload"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Submission Info Banner */}
          <div className="p-3.5 bg-blue-50/80 border border-blue-200 rounded-xl flex items-start space-x-3 text-xs text-blue-900">
            <ShieldCheck className="h-4 w-4 text-blue-700 shrink-0 mt-0.5" />
            <div className="space-y-0.5 leading-relaxed">
              <p className="font-semibold text-blue-950">Curator Review Workflow</p>
              <p className="text-blue-800">
                Uploaded papers are stored securely and verified by academic curators before being published publicly for students.
              </p>
            </div>
          </div>

          {/* Success State */}
          {successData ? (
            <div className="py-6 text-center space-y-4">
              <div className="mx-auto w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">Submission Received!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Your question paper has been securely stored in persistent storage and is pending curator review.
                </p>
                <div className="inline-block bg-slate-100 text-slate-800 font-mono text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200">
                  Reference: #{successData.reference}
                </div>
              </div>

              <div className="pt-4 flex justify-center space-x-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                >
                  Submit Another Paper
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl transition"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Upload Form */
            <form onSubmit={submit} className="space-y-4">
              {errorMessage && (
                <div role="alert" className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start space-x-2.5 text-xs text-rose-800">
                  <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Subject Information */}
              {initialSubjectId ? (
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Target Subject
                  </span>
                  <div className="font-semibold text-sm text-slate-900 mt-0.5">
                    {initialSubjectCode} · {initialSubjectName}
                  </div>
                </div>
              ) : (
                /* Dynamic Hierarchy Selection */
                <div className="space-y-3 p-4 bg-slate-50/80 rounded-xl border border-slate-200">
                  <div className="font-semibold text-xs text-slate-700 flex items-center space-x-1.5">
                    <BookOpen className="h-3.5 w-3.5 text-blue-600" />
                    <span>Select Academic Course & Subject</span>
                  </div>

                  {loadingHierarchy ? (
                    <div className="py-4 text-center text-xs text-slate-500 flex items-center justify-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                      <span>Loading academic catalogue...</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Programme Selector */}
                      <div className="sm:col-span-2">
                        <label htmlFor={programmeSelectId} className="block text-xs font-semibold text-slate-700">Programme / Course</label>
                        <select
                          id={programmeSelectId}
                          value={selectedProgramme}
                          onChange={(e) => handleProgrammeChange(e.target.value)}
                          className={fieldClass}
                          required
                        >
                          <option value="">Select Programme</option>
                          {hierarchy.map(p => (
                            <option key={p.id} value={p.code}>{p.name} ({p.code})</option>
                          ))}
                        </select>
                      </div>

                      {/* Semester Selector */}
                      <div>
                        <label htmlFor={semesterSelectId} className="block text-xs font-semibold text-slate-700">Semester</label>
                        <select
                          id={semesterSelectId}
                          value={selectedSemester}
                          onChange={(e) => handleSemesterChange(Number(e.target.value))}
                          disabled={!selectedProgramme}
                          className={`${fieldClass} disabled:opacity-50`}
                          required
                        >
                          <option value="">Select Semester</option>
                          {availableSemesters.map(s => (
                            <option key={s.id} value={s.semesterNumber}>{s.title}</option>
                          ))}
                        </select>
                      </div>

                      {/* Subject Selector */}
                      <div>
                        <label htmlFor={subjectSelectId} className="block text-xs font-semibold text-slate-700">Subject</label>
                        <select
                          id={subjectSelectId}
                          value={selectedSubjectId}
                          onChange={(e) => handleSubjectChange(e.target.value)}
                          disabled={!selectedSemester}
                          className={`${fieldClass} disabled:opacity-50`}
                          required
                        >
                          <option value="">Select Subject</option>
                          {availableSubjects.map(s => (
                            <option key={s.id} value={s.id}>{s.code} - {s.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Title Input */}
              <div>
                <label htmlFor={titleInputId} className="block text-xs font-semibold text-slate-700">
                  Paper Title <span className="text-rose-500">*</span>
                </label>
                <input
                  id={titleInputId}
                  name="title"
                  type="text"
                  required
                  minLength={5}
                  maxLength={180}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. End-Semester Examination 2024"
                  className={fieldClass}
                />
              </div>

              {/* Academic Year & Exam Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor={yearSelectId} className="block text-xs font-semibold text-slate-700">
                    Academic Year <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id={yearSelectId}
                    name="academicYear"
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    className={fieldClass}
                    required
                  >
                    <option value="2026-2027">2026-2027</option>
                    <option value="2025-2026">2025-2026</option>
                    <option value="2024-2025">2024-2025</option>
                    <option value="2023-2024">2023-2024</option>
                    <option value="2022-2023">2022-2023</option>
                    <option value="2021-2022">2021-2022</option>
                  </select>
                </div>

                <div>
                  <label htmlFor={examTypeSelectId} className="block text-xs font-semibold text-slate-700">
                    Exam Type <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id={examTypeSelectId}
                    name="examType"
                    value={examType}
                    onChange={(e) => setExamType(e.target.value)}
                    className={fieldClass}
                    required
                  >
                    <option value="END_SEMESTER">End-Semester</option>
                    <option value="MID_SEMESTER">Mid-Semester</option>
                    <option value="BACK_PAPER">Carry Over / Back Paper</option>
                  </select>
                </div>
              </div>

              {/* Source or Paper Notes */}
              <div>
                <label htmlFor={sourceInputId} className="block text-xs font-semibold text-slate-700">
                  Document Reference / Source Note
                </label>
                <input
                  id={sourceInputId}
                  name="sourceReference"
                  type="text"
                  maxLength={500}
                  value={sourceReference}
                  onChange={(e) => setSourceReference(e.target.value)}
                  placeholder="e.g. Invertis University Regular Examination Paper (Dec 2024)"
                  className={fieldClass}
                />
              </div>

              {/* PDF File Picker */}
              <div>
                <span className="block text-xs font-semibold text-slate-700">
                  Select PDF Document (Max 10 MB) <span className="text-rose-500">*</span>
                </span>
                <div className="mt-1.5 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-4 text-center bg-slate-50/50 transition">
                  <input
                    id={fileInputId}
                    name="file"
                    type="file"
                    accept="application/pdf,.pdf"
                    required
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor={fileInputId} className="cursor-pointer block space-y-2">
                    <FileText className="mx-auto h-8 w-8 text-slate-400" />
                    {file ? (
                      <div>
                        <p className="text-sm font-semibold text-blue-700">{file.name}</p>
                        <p className="text-xs text-slate-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-xs font-semibold text-blue-600 hover:underline">
                          Click to browse or drag & drop PDF here
                        </p>
                        <p className="text-[11px] text-slate-400">PDF must be unencrypted and under 10 MB</p>
                      </div>
                    )}
                  </label>
                </div>
                {fileError && (
                  <p className="text-xs text-rose-600 mt-1 font-medium">{fileError}</p>
                )}
              </div>

              {/* Has Solutions Checkbox */}
              <div className="pt-1">
                <label htmlFor={solutionsCheckboxId} className="flex items-center space-x-2.5 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    id={solutionsCheckboxId}
                    type="checkbox"
                    checked={hasSolutions}
                    onChange={(e) => setHasSolutions(e.target.checked)}
                    className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                  />
                  <span>Includes complete answers or solution guide</span>
                </label>
              </div>

              {/* Form Action Buttons */}
              <div className="pt-3 flex items-center justify-end space-x-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={close}
                  disabled={uploading}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading || !file || !selectedSubjectId}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-sm transition disabled:opacity-50 flex items-center space-x-2"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Saving to Storage...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      <span>Submit for Review</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Modal>
  );
}
