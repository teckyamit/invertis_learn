"use client";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";

interface Props { subjectId: string; subjectCode: string; subjectName: string; isOpen: boolean; onClose: () => void; onSuccess: () => void; }
export function PYQUploadModal({ subjectId, subjectCode, subjectName, isOpen, onClose, onSuccess }: Props) {
  const [uploading, setUploading] = useState(false), [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  if (!isOpen) return null;
  const close = () => { if (!uploading) { setMessage(""); setSubmitted(false); onClose(); } };
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setMessage("");
    const form = new FormData(e.currentTarget), file = form.get("file");
    if (!(file instanceof File) || !file.size || file.size > 10 * 1024 * 1024) { setMessage("Choose a PDF no larger than 10 MB."); return; }
    form.set("subjectId", subjectId); form.set("hasSolutions", form.get("hasSolutions") === "on" ? "true" : "false");
    setUploading(true);
    try {
      const response = await fetch("/api/pyq", { method: "POST", body: form });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Upload failed");
      setSubmitted(true); setMessage(data.message); onSuccess();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Upload failed. Please retry."); }
    finally { setUploading(false); }
  }
  const field = "mt-1 w-full rounded-lg border border-slate-300 bg-white p-2 text-sm";
  return <Modal label="Submit question paper" onClose={close}>
    <section className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 space-y-4">
      <div className="flex justify-between gap-4"><h2 className="font-bold text-xl">Submit question paper</h2><button aria-label="Close upload" disabled={uploading} onClick={close}>✕</button></div>
      <p className="text-sm text-slate-600">{subjectCode} · {subjectName}</p>
      <p className="text-sm">Curator sign-in is required. Submissions remain private until reviewed. <a href="/admin" target="_blank" rel="noopener noreferrer" className="underline text-blue-700">Open curator dashboard</a></p>
      {message && <p role="status" className="bg-blue-50 text-blue-900 rounded p-3 text-sm">{message}</p>}
      {!submitted && <form onSubmit={submit} className="space-y-4">
        <label className="block">Title<input name="title" required minLength={5} maxLength={180} defaultValue={`${subjectCode} question paper`} className={field}/></label>
        <label className="block">Academic year<input name="academicYear" required pattern="20[0-9]{2}-20[0-9]{2}" placeholder="2026-2027" className={field}/></label>
        <label className="block">Exam type<select name="examType" className={field}><option value="END_SEMESTER">End-semester</option><option value="MID_SEMESTER">Mid-semester</option><option value="BACK_PAPER">Carry over / back paper</option></select></label>
        <label className="block">Source URL or original document reference<textarea name="sourceReference" required minLength={5} maxLength={1000} className={field}/></label>
        <label className="block">PDF (maximum 10 MB)<input name="file" type="file" required accept="application/pdf,.pdf" className={field}/></label>
        <label className="block text-sm"><input type="checkbox" name="hasSolutions"/> Includes an answer key or solutions</label>
        <button disabled={uploading} className="rounded-lg bg-blue-700 text-white px-4 py-2 disabled:opacity-50">{uploading ? "Submitting…" : "Submit for review"}</button>
      </form>}
      {submitted && <button onClick={close} className="text-blue-700 underline">Done</button>}
    </section>
  </Modal>;
}
