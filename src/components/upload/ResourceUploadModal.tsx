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
  BookOpen,
  FlaskConical,
  FileQuestion,
  HelpCircle,
  Code2,
  Layers,
  Sparkles
} from "lucide-react";
import { NOTE_RESOURCE_TYPES, PRACTICAL_RESOURCE_TYPES } from "@/lib/academic-categories";

interface SubjectOption {
  id: string;
  code: string;
  name: string;
  isPracticalEligible?: boolean;
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

export type UploadMode = "NOTES" | "PRACTICAL" | "PYQ";

interface Props {
  mode: UploadMode;
  initialType?: string;
  subjectId?: string;
  subjectCode?: string;
  subjectName?: string;
  programmeCode?: string;
  semesterNumber?: number;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function ResourceUploadModal({
  mode,
  initialType,
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

  // Common Fields
  const [title, setTitle] = useState<string>("");
  const [resourceType, setResourceType] = useState<string>(
    initialType || (mode === "NOTES" ? "COMPLETE_NOTES" : mode === "PRACTICAL" ? "LAB_MANUAL" : "END_SEMESTER")
  );
  const [unitNumber, setUnitNumber] = useState<string>("");
  const [authorName, setAuthorName] = useState<string>("");
  const [sourceReference, setSourceReference] = useState<string>("");
  const [confirmedPermission, setConfirmedPermission] = useState<boolean>(false);

  // Practical Specific
  const [programmingLanguage, setProgrammingLanguage] = useState<string>("C");
  const [experimentNumber, setExperimentNumber] = useState<string>("");

  // PYQ Specific
  const [academicYear, setAcademicYear] = useState<string>("2024-2025");
  const [examType, setExamType] = useState<string>("END_SEMESTER");
  const [hasSolutions, setHasSolutions] = useState<boolean>(false);

  // File & Upload State
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successData, setSuccessData] = useState<{ id: string; reference: string; message: string } | null>(null);

  // Form IDs
  const titleInputId = useId();
  const typeSelectId = useId();
  const unitSelectId = useId();
  const authorInputId = useId();
  const sourceInputId = useId();
  const fileInputId = useId();
  const permissionCheckboxId = useId();
  const langSelectId = useId();
  const yearSelectId = useId();
  const examTypeSelectId = useId();

  // Reset or preset state when modal opens or initial subject changes
  useEffect(() => {
    if (initialSubjectId) {
      setSelectedSubjectId(initialSubjectId);
      setSelectedSubjectCode(initialSubjectCode || "");
      setSelectedSubjectName(initialSubjectName || "");

      if (!title) {
        if (mode === "NOTES") {
          setTitle(`${initialSubjectCode || "Subject"} Complete Notes`);
        } else if (mode === "PRACTICAL") {
          setTitle(`${initialSubjectCode || "Subject"} Laboratory Manual`);
        } else {
          setTitle(`${initialSubjectCode || "Subject"} Question Paper`);
        }
      }
    }
  }, [initialSubjectId, initialSubjectCode, initialSubjectName, mode, title]);

  // Load global hierarchy if needed
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

  const currentProgrammeData = hierarchy.find(p => p.code === selectedProgramme);
  const availableSemesters = currentProgrammeData?.semesters || [];
  const currentSemesterData = availableSemesters.find(s => s.semesterNumber === selectedSemester);
  const availableSubjects = currentSemesterData?.subjects || [];

  const handleSubjectChange = (id: string) => {
    setSelectedSubjectId(id);
    const sub = availableSubjects.find(s => s.id === id);
    if (sub) {
      setSelectedSubjectCode(sub.code);
      setSelectedSubjectName(sub.name);
      if (mode === "NOTES") setTitle(`${sub.code} Study Notes`);
      else if (mode === "PRACTICAL") setTitle(`${sub.code} Practical Manual`);
      else setTitle(`${sub.code} Question Paper`);
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
      setFileError("Only standard PDF documents (.pdf) are permitted.");
      setFile(null);
      return;
    }
    if (selected.size > 10 * 1024 * 1024) {
      setFileError(`File size exceeds 10 MB limit (${(selected.size / (1024 * 1024)).toFixed(1)} MB).`);
      setFile(null);
      return;
    }
    if (selected.size === 0) {
      setFileError("Selected PDF file is empty (0 bytes).");
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
    setConfirmedPermission(false);
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
      setErrorMessage("Please select a valid academic subject.");
      return;
    }

    if (!file) {
      setErrorMessage("Please choose a valid PDF file to upload.");
      return;
    }

    if (!confirmedPermission) {
      setErrorMessage("Please confirm that you have permission to share this educational material.");
      return;
    }

    const formData = new FormData();
    const categoryCode = mode === "NOTES" ? "NOTES" : mode === "PRACTICAL" ? "LAB_MANUAL" : "PYQ";

    formData.set("categoryCode", categoryCode);
    formData.set("subjectId", selectedSubjectId);
    formData.set("title", title || `${selectedSubjectCode} ${mode === "NOTES" ? "Notes" : mode === "PRACTICAL" ? "Practical" : "Paper"}`);
    formData.set("resourceType", resourceType);
    formData.set("authorName", authorName.trim());
    formData.set("sourceReference", sourceReference.trim());
    formData.set("confirmedPermission", confirmedPermission ? "true" : "false");
    formData.set("file", file);

    if (mode === "NOTES") {
      if (unitNumber) formData.set("unitNumber", unitNumber);
    } else if (mode === "PRACTICAL") {
      if (experimentNumber) formData.set("experimentNumber", experimentNumber);
      if (programmingLanguage) formData.set("programmingLanguage", programmingLanguage);
    } else if (mode === "PYQ") {
      formData.set("academicYear", academicYear);
      formData.set("examType", examType);
      formData.set("hasSolutions", hasSolutions ? "true" : "false");
    }

    setUploading(true);

    try {
      const response = await fetch("/api/resources/submit", {
        method: "POST",
        headers: {
          "x-submission-source": "student",
          "x-student-submission": "true",
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Submission failed. Please check the inputs.");
      }

      setSuccessData({
        id: data.id,
        reference: data.reference || data.id.slice(0, 8).toUpperCase(),
        message: data.message || "Submitted successfully and pending curator approval."
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Upload encountered an error. Please retry.");
    } finally {
      setUploading(false);
    }
  }

  const getModalIcon = () => {
    switch (mode) {
      case "NOTES":
        return <BookOpen className="h-5 w-5 text-emerald-600" />;
      case "PRACTICAL":
        return <FlaskConical className="h-5 w-5 text-indigo-600" />;
      case "PYQ":
        return <FileQuestion className="h-5 w-5 text-blue-600" />;
    }
  };

  const getModalTitle = () => {
    switch (mode) {
      case "NOTES":
        return "Upload Study Notes";
      case "PRACTICAL":
        return "Upload Practical Material";
      case "PYQ":
        return "Upload Question Paper";
    }
  };

  const getModalSubtitle = () => {
    switch (mode) {
      case "NOTES":
        return "Contribute unit summaries, handwritten notes, revision sheets, and faculty slides";
      case "PRACTICAL":
        return "Contribute lab manuals, code templates, viva questions, and experiment guides";
      case "PYQ":
        return "Contribute previous-year end-semester and mid-semester examination papers";
    }
  };

  return (
    <Modal label={getModalTitle()} onClose={close}>
      <div className="bg-white rounded-2xl p-6 sm:p-7 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-5 shadow-2xl border border-slate-200">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              {getModalIcon()}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 leading-snug">
                {getModalTitle()}
              </h2>
              <p className="text-xs text-slate-500">{getModalSubtitle()}</p>
            </div>
          </div>
          <button
            onClick={close}
            disabled={uploading}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Success View */}
        {successData ? (
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div className="space-y-1.5 max-w-md mx-auto">
              <h3 className="text-base font-bold text-slate-900">
                Submission Received!
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {successData.message}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 inline-block text-left max-w-sm w-full space-y-1 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Reference Code:</span>
                <span className="font-mono font-bold text-slate-900">{successData.reference}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Target Subject:</span>
                <span className="font-semibold text-slate-800">{selectedSubjectCode}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Verification:</span>
                <span className="text-amber-700 font-semibold">Department Curator Moderation</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={close}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          /* Form View */
          <form onSubmit={submit} className="space-y-4">
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start space-x-2">
                <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Subject Context Header */}
            {initialSubjectId ? (
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-0.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Subject Scope
                </span>
                <div className="font-bold text-slate-900 text-sm">
                  {selectedSubjectCode} · {selectedSubjectName}
                </div>
              </div>
            ) : (
              /* Global Course/Subject Pickers */
              <div className="space-y-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
                <div>
                  <label htmlFor="prog-select" className="font-semibold text-slate-700 block mb-1">
                    Select Programme
                  </label>
                  <select
                    id="prog-select"
                    value={selectedProgramme}
                    onChange={(e) => {
                      setSelectedProgramme(e.target.value);
                      setSelectedSemester("");
                      setSelectedSubjectId("");
                    }}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs"
                  >
                    {hierarchy.map(p => (
                      <option key={p.id} value={p.code}>{p.code} - {p.name}</option>
                    ))}
                  </select>
                </div>

                {availableSemesters.length > 0 && (
                  <div>
                    <label htmlFor="sem-select" className="font-semibold text-slate-700 block mb-1">
                      Select Semester
                    </label>
                    <select
                      id="sem-select"
                      value={selectedSemester}
                      onChange={(e) => setSelectedSemester(Number(e.target.value))}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs"
                    >
                      <option value="">-- Choose Semester --</option>
                      {availableSemesters.map(s => (
                        <option key={s.id} value={s.semesterNumber}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                )}

                {availableSubjects.length > 0 && (
                  <div>
                    <label htmlFor="sub-select" className="font-semibold text-slate-700 block mb-1">
                      Select Subject
                    </label>
                    <select
                      id="sub-select"
                      value={selectedSubjectId}
                      onChange={(e) => handleSubjectChange(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs"
                    >
                      <option value="">-- Choose Subject --</option>
                      {availableSubjects.map(s => {
                        const isEligible = s.isPracticalEligible !== false;
                        return (
                          <option
                            key={s.id}
                            value={s.id}
                            disabled={mode === "PRACTICAL" && !isEligible}
                          >
                            {s.code} - {s.name}{mode === "PRACTICAL" && !isEligible ? " (Theory Only - No Practicals)" : ""}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}
              </div>
            )}

            {/* Practical Eligibility Guard Banner */}
            {mode === "PRACTICAL" && selectedSubjectId && (() => {
              const currentSub = availableSubjects.find(s => s.id === selectedSubjectId);
              if (currentSub && currentSub.isPracticalEligible === false) {
                return (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 flex items-start space-x-2.5">
                    <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-amber-950">Theory-Only Course</span>
                      <span>{selectedSubjectCode} is classified as a theory-only course with no laboratory work prescribed in the curriculum. Practical submissions are not eligible for this subject.</span>
                    </div>
                  </div>
                );
              }
              return null;
            })()}

            {/* Title */}
            <div>
              <label htmlFor={titleInputId} className="block text-xs font-semibold text-slate-700 mb-1">
                Document Title <span className="text-rose-500">*</span>
              </label>
              <input
                id={titleInputId}
                type="text"
                required
                maxLength={180}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={
                  mode === "NOTES"
                    ? "e.g. Unit 1 & 2 Detailed Handwritten Notes"
                    : mode === "PRACTICAL"
                    ? "e.g. Complete Practical Manual with 10 C Programs"
                    : "e.g. 2024 End-Semester Examination Paper"
                }
                className="w-full border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition"
              />
            </div>

            {/* Category / Type Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor={typeSelectId} className="block text-xs font-semibold text-slate-700 mb-1">
                  Resource Category <span className="text-rose-500">*</span>
                </label>
                <select
                  id={typeSelectId}
                  value={resourceType}
                  onChange={(e) => setResourceType(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition"
                >
                  {mode === "NOTES" &&
                    NOTE_RESOURCE_TYPES.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))
                  }
                  {mode === "PRACTICAL" &&
                    PRACTICAL_RESOURCE_TYPES.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))
                  }
                  {mode === "PYQ" && (
                    <>
                      <option value="END_SEMESTER">End-Semester Paper</option>
                      <option value="MID_SEMESTER">Mid-Semester Exam</option>
                      <option value="BACK_PAPER">Carry Over / Back Paper</option>
                    </>
                  )}
                </select>
              </div>

              {/* Mode-specific secondary field */}
              {mode === "NOTES" ? (
                <div>
                  <label htmlFor={unitSelectId} className="block text-xs font-semibold text-slate-700 mb-1">
                    Syllabus Scope
                  </label>
                  <select
                    id={unitSelectId}
                    value={unitNumber}
                    onChange={(e) => setUnitNumber(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition"
                  >
                    <option value="">Complete Syllabus (All Units)</option>
                    <option value="1">Unit 1</option>
                    <option value="2">Unit 2</option>
                    <option value="3">Unit 3</option>
                    <option value="4">Unit 4</option>
                    <option value="5">Unit 5</option>
                  </select>
                </div>
              ) : mode === "PRACTICAL" ? (
                <div>
                  <label htmlFor={langSelectId} className="block text-xs font-semibold text-slate-700 mb-1">
                    Language / Environment
                  </label>
                  <select
                    id={langSelectId}
                    value={programmingLanguage}
                    onChange={(e) => setProgrammingLanguage(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition"
                  >
                    <option value="C">C Language</option>
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                    <option value="C++">C++</option>
                    <option value="SQL">SQL / Relational DB</option>
                    <option value="Linux/Shell">Linux / Shell Scripts</option>
                    <option value="Web/JS">HTML / CSS / JavaScript</option>
                    <option value="Hardware/Circuit">Circuit / HDL / Digital</option>
                    <option value="General">General / Theory Lab</option>
                  </select>
                </div>
              ) : (
                <div>
                  <label htmlFor={yearSelectId} className="block text-xs font-semibold text-slate-700 mb-1">
                    Academic Session
                  </label>
                  <select
                    id={yearSelectId}
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition"
                  >
                    <option value="2024-2025">2024–2025</option>
                    <option value="2023-2024">2023–2024</option>
                    <option value="2022-2023">2022–2023</option>
                    <option value="2021-2022">2021–2022</option>
                  </select>
                </div>
              )}
            </div>

            {/* Contributor & Source Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor={authorInputId} className="block text-xs font-semibold text-slate-700 mb-1">
                  Contributor Name <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  id={authorInputId}
                  type="text"
                  maxLength={120}
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Amit Patel / Department Class"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition"
                />
              </div>

              <div>
                <label htmlFor={sourceInputId} className="block text-xs font-semibold text-slate-700 mb-1">
                  Source or Attribution <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  id={sourceInputId}
                  type="text"
                  maxLength={1000}
                  value={sourceReference}
                  onChange={(e) => setSourceReference(e.target.value)}
                  placeholder="e.g. Lecture notes taken during Class"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition"
                />
              </div>
            </div>

            {/* PDF File Picker */}
            <div>
              <label htmlFor={fileInputId} className="block text-xs font-semibold text-slate-700 mb-1">
                Select PDF Document <span className="text-rose-500">*</span>
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-blue-500 transition bg-slate-50">
                <input
                  id={fileInputId}
                  type="file"
                  accept="application/pdf,.pdf"
                  required
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor={fileInputId} className="cursor-pointer block space-y-1">
                  <Upload className="h-6 w-6 text-slate-400 mx-auto" />
                  <span className="text-xs font-bold text-blue-700 block">
                    {file ? file.name : "Click to select PDF or drag and drop"}
                  </span>
                  <span className="text-[11px] text-slate-400 block">
                    {file
                      ? `${(file.size / 1024).toFixed(0)} KB · Ready to submit`
                      : "PDF file up to 10 MB (1 to 500 pages)"}
                  </span>
                </label>
              </div>
              {fileError && <p className="text-xs text-rose-600 mt-1">{fileError}</p>}
            </div>

            {/* Rights & Permission Confirmation */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label
                htmlFor={permissionCheckboxId}
                className="flex items-start space-x-2 text-xs text-slate-700 cursor-pointer"
              >
                <input
                  id={permissionCheckboxId}
                  type="checkbox"
                  required
                  checked={confirmedPermission}
                  onChange={(e) => setConfirmedPermission(e.target.checked)}
                  className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 mt-0.5"
                />
                <span className="leading-relaxed">
                  I confirm that I have the right to share this educational material and that it does not infringe copyright or university examination policies.
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-end space-x-2.5 border-t border-slate-100">
              <button
                type="button"
                onClick={close}
                disabled={uploading}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading || !file || !confirmedPermission || (mode === "PRACTICAL" && availableSubjects.find(s => s.id === selectedSubjectId)?.isPracticalEligible === false)}
                className="px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition disabled:opacity-50 flex items-center space-x-1.5"
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Submitting PDF…</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-3.5 w-3.5" />
                    <span>Submit for Curator Review</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
