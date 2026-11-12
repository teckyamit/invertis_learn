"use client";
import { useCallback, useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { provenanceLabel } from "@/lib/resource-policy";

type Resource = { id: string; title: string; isPublished: boolean; provenanceStatus: string; sourceReference: string | null; reviewedBy: string | null; reviewNote: string | null; subject: { code: string; name: string }; category: { code: string } };
export function CuratorDashboard({ authenticated, configured }: { authenticated: boolean; configured: boolean }) {
  const [signedIn, setSignedIn] = useState(authenticated), [key, setKey] = useState("");
  const [message, setMessage] = useState(""), [busy, setBusy] = useState(false);
  const [resources, setResources] = useState<Resource[]>([]), [page, setPage] = useState(1), [total, setTotal] = useState(0), [pending, setPending] = useState(true);
  const [selected, setSelected] = useState<Resource | null>(null);
  const load = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/resources?page=${page}&pending=${pending}`);
      if (response.status === 401) { setSignedIn(false); return; }
      if (!response.ok) throw new Error("Unable to load resources");
      const result = await response.json(); setResources(result.resources); setTotal(result.total);
    } catch { setMessage("Unable to load resources. Please retry."); }
  }, [page, pending]);
  useEffect(() => { if (signedIn) void load(); }, [signedIn, load]);
  async function login(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setMessage("");
    try { const response = await fetch("/api/admin/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key }) }); const data = await response.json(); if (!response.ok) throw new Error(data.error); setKey(""); setSignedIn(true); }
    catch (e) { setMessage(e instanceof Error ? e.message : "Sign-in failed"); } finally { setBusy(false); }
  }
  async function review(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); if (!selected) return; setBusy(true); setMessage("");
    const form = new FormData(e.currentTarget);
    try {
      const response = await fetch("/api/admin/resources", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: selected.id, publish: form.get("publish") === "on", provenanceStatus: form.get("status"), sourceReference: form.get("source"), reviewedBy: form.get("reviewer"), reviewNote: form.get("note") }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error);
      setSelected(null); setMessage("Review saved. Public pages have been refreshed."); await load();
    } catch (e) { setMessage(e instanceof Error ? e.message : "Save failed"); } finally { setBusy(false); }
  }
  const field = "w-full border border-slate-300 rounded-lg p-2 mt-1 text-slate-900 bg-white";
  return <div className="site-container py-10 space-y-6">
    <h1 className="text-3xl font-bold text-slate-900">Resource review</h1>
    <p className="text-slate-600">Review the source and contents before publishing. Practice materials must be labelled clearly.</p>
    {message && <p role="status" className="rounded-lg bg-blue-50 text-blue-900 p-3">{message}</p>}
    {!signedIn ? <form onSubmit={login} className="max-w-md space-y-4 bg-white border rounded-xl p-6">
      {!configured && <p role="status">Curator access is disabled until the operator configures a secure access key. Public browsing remains available.</p>}
      <label className="block">Curator access key<input type="password" autoComplete="current-password" required value={key} onChange={e => setKey(e.target.value)} className={field} /></label>
      <button disabled={busy || !configured} className="bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50">{busy ? "Signing in…" : "Sign in"}</button>
    </form> : <>
      <div className="flex flex-wrap gap-4 items-center">
        <label><input type="checkbox" checked={pending} onChange={e => { setPending(e.target.checked); setPage(1); }} /> Unpublished only</label>
        <button onClick={() => void load()} className="underline">Refresh</button>
        <button onClick={async () => { const r = await fetch("/api/admin/session", { method: "DELETE" }); if (r.ok) { setSignedIn(false); setResources([]); } }} className="underline">Sign out</button>
        <a href="/search" className="text-blue-700 underline">Find a subject to submit a paper</a>
      </div>
      <p>{total} resources · Page {page}</p>
      <div className="grid gap-3">{resources.map(resource => <article key={resource.id} className="bg-white border rounded-xl p-4 flex flex-wrap justify-between gap-3">
        <div><h2 className="font-semibold">{resource.title}</h2><p className="text-sm text-slate-600">{resource.subject.code} · {resource.category.code} · {resource.isPublished ? "Published" : "Private"}</p><p className="text-sm">{provenanceLabel(resource.provenanceStatus)}</p></div>
        <button className="text-blue-700 underline" onClick={() => { setSelected(resource); setMessage(""); }}>Review</button>
      </article>)}</div>
      {!resources.length && <p>No resources match this filter.</p>}
      <div className="flex gap-4"><button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="disabled:opacity-40">Previous</button><button disabled={page * 25 >= total} onClick={() => setPage(p => p + 1)} className="disabled:opacity-40">Next</button></div>
    </>}
    {selected && <Modal label="Review resource" onClose={() => { if (!busy) setSelected(null); }}>
      <form onSubmit={review} className="bg-white rounded-xl p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-3">
        <h2 className="text-xl font-bold">{selected.title}</h2>
        <a href={`/api/${({ PYQ: "pyq", SYLLABUS: "syllabus", NOTES: "notes", LAB_MANUAL: "lab-manual", PROJECT_ARCHIVE: "projects" } as Record<string,string>)[selected.category.code]}/download?id=${selected.id}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">Open document for review</a>
        <label className="block">Classification<select name="status" defaultValue={selected.provenanceStatus} className={field}><option value="UNVERIFIED">Source verification pending</option><option value="PRACTICE">Practice material</option><option value="VERIFIED">Source reviewed</option></select></label>
        <label className="block">Source URL or document/page reference<input name="source" maxLength={1000} defaultValue={selected.sourceReference || ""} className={field}/></label>
        <label className="block">Reviewer name<input name="reviewer" minLength={2} maxLength={100} required defaultValue={selected.reviewedBy || ""} className={field}/></label>
        <label className="block">Review notes<textarea name="note" required minLength={5} maxLength={1000} defaultValue={selected.reviewNote || ""} className={field}/></label>
        <label className="block"><input type="checkbox" name="publish" defaultChecked={selected.isPublished}/> Publish for students</label>
        {message && <p role="alert" className="text-red-700">{message}</p>}
        <div className="flex gap-4"><button disabled={busy} className="bg-blue-700 text-white rounded-lg px-4 py-2">{busy ? "Saving…" : "Save review"}</button><button type="button" disabled={busy} onClick={() => setSelected(null)}>Cancel</button></div>
      </form>
    </Modal>}
  </div>;
}
