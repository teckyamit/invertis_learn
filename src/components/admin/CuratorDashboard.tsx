"use client";

import { useCallback, useEffect, useState, useId } from "react";
import { Modal } from "@/components/ui/Modal";
import { provenanceLabel } from "@/lib/resource-policy";
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Clock, 
  ExternalLink, 
  Download, 
  RefreshCw, 
  LogOut, 
  Eye, 
  AlertTriangle,
  FolderArchive,
  BookOpen,
  Calendar,
  Layers,
  Trash2,
  FlaskConical,
  FileQuestion,
  HelpCircle,
  Edit3,
  Check,
  EyeOff
} from "lucide-react";
import { NOTE_RESOURCE_TYPES, PRACTICAL_RESOURCE_TYPES } from "@/lib/academic-categories";

type Resource = {
  id: string;
  title: string;
  originalFileName: string;
  storedFileName: string;
  storagePath: string;
  mimeType: string;
  fileSizeBytes: number;
  academicYear: string | null;
  examType: string | null;
  hasSolutions: boolean;
  resourceType: string | null;
  unitNumber: number | null;
  authorName: string | null;
  isPublished: boolean;
  provenanceStatus: string;
  sourceReference: string | null;
  reviewedBy: string | null;
  reviewedAt: string | null;
  reviewNote: string | null;
  createdAt: string;
  subject: {
    id: string;
    code: string;
    name: string;
    semester?: {
      semesterNumber: number;
      curriculumVersion?: {
        programme?: {
          code: string;
          name: string;
        };
      };
    };
  };
  category: {
    code: string;
    name?: string;
  };
};

interface CategoryCounts {
  all: number;
  pyq: number;
  notes: number;
  labs: number;
  labNotes: number;
  practicalFiles: number;
  vivaQuestions: number;
}

interface Counts {
  pending: number;
  approved: number;
  rejected: number;
  total: number;
  byCategory?: CategoryCounts;
}

export function CuratorDashboard({ authenticated, configured }: { authenticated: boolean; configured: boolean }) {
  const [signedIn, setSignedIn] = useState(authenticated);
  const [key, setKey] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const [resources, setResources] = useState<Resource[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [counts, setCounts] = useState<Counts>({
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0,
    byCategory: { all: 0, pyq: 0, notes: 0, labs: 0, labNotes: 0, practicalFiles: 0, vivaQuestions: 0 }
  });

  // Filter states
  const [filter, setFilter] = useState<string>("pending"); // "pending" | "approved" | "rejected" | "all"
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL"); // "ALL" | "PYQ" | "NOTES" | "LAB_MANUAL" | "LAB_NOTES" | "PRACTICAL_FILE" | "VIVA_QUESTIONS"
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modals state
  const [selected, setSelected] = useState<Resource | null>(null);
  const [rejectingResource, setRejectingResource] = useState<Resource | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  // Form input IDs for access key form
  const accessKeyInputId = useId();

  const load = useCallback(async () => {
    try {
      const q = encodeURIComponent(searchQuery.trim());
      const cat = encodeURIComponent(categoryFilter);
      const response = await fetch(`/api/admin/resources?page=${page}&filter=${filter}&category=${cat}&q=${q}`);
      if (response.status === 401) {
        setSignedIn(false);
        return;
      }
      if (!response.ok) throw new Error("Unable to load resources");
      const result = await response.json();
      setResources(result.resources || []);
      setTotal(result.total || 0);
      if (result.counts) {
        setCounts(result.counts);
      }
    } catch {
      setErrorMessage("Unable to load resources. Please retry.");
    }
  }, [page, filter, categoryFilter, searchQuery]);

  useEffect(() => {
    if (signedIn) void load();
  }, [signedIn, load]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    setErrorMessage("");
    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setKey("");
      setSignedIn(true);
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : "Sign-in failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleReviewSubmit(e: React.FormEvent<HTMLFormElement>, customPublish?: boolean, customStatus?: string) {
    e.preventDefault();
    if (!selected) return;
    setBusy(true);
    setMessage("");
    setErrorMessage("");

    const form = new FormData(e.currentTarget);
    const publish = customPublish !== undefined ? customPublish : form.get("publish") === "on";
    const status = customStatus || (form.get("status") as string);
    const source = (form.get("source") as string) || "";
    const reviewer = (form.get("reviewer") as string) || "Academic Curator";
    const note = (form.get("note") as string) || (publish ? "Approved after academic verification" : "Reviewed and archived");

    try {
      const response = await fetch("/api/admin/resources", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selected.id,
          publish,
          provenanceStatus: status,
          sourceReference: source,
          reviewedBy: reviewer,
          reviewNote: note
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to save review");
      setSelected(null);
      setMessage(`Review saved successfully! Resource ${publish ? "is now published publicly." : "is private / unlisted."}`);
      await load();
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleQuickApprove(res: Resource) {
    setBusy(true);
    setMessage("");
    setErrorMessage("");
    try {
      const response = await fetch("/api/admin/resources", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: res.id,
          publish: true,
          provenanceStatus: "VERIFIED",
          sourceReference: res.sourceReference || "Verified by Department Curator",
          reviewedBy: "Academic Curator",
          reviewNote: "Verified authentic and approved for catalog publication."
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Approval failed");
      setMessage(`"${res.title}" has been approved and published to the student catalog.`);
      await load();
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : "Approval failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleUnpublish(res: Resource) {
    if (!confirm(`Are you sure you want to unpublish "${res.title}"? It will no longer appear on the student website.`)) {
      return;
    }
    setBusy(true);
    setMessage("");
    setErrorMessage("");
    try {
      const response = await fetch("/api/admin/resources", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: res.id,
          publish: false,
          provenanceStatus: "PRACTICE",
          sourceReference: res.sourceReference || "",
          reviewedBy: "Academic Curator",
          reviewNote: "Unpublished from public catalog for revision."
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unpublish failed");
      setMessage(`"${res.title}" has been unpublished and withdrawn from public view.`);
      await load();
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : "Unpublish failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleRejectSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rejectingResource) return;
    if (!rejectionReason.trim() || rejectionReason.trim().length < 5) {
      setErrorMessage("Please enter a rejection reason with at least 5 characters.");
      return;
    }

    setBusy(true);
    setMessage("");
    setErrorMessage("");
    try {
      const response = await fetch("/api/admin/resources", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: rejectingResource.id,
          publish: false,
          provenanceStatus: "REJECTED",
          sourceReference: rejectingResource.sourceReference || "",
          reviewedBy: "Academic Curator",
          reviewNote: rejectionReason.trim()
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Rejection failed");
      setRejectingResource(null);
      setRejectionReason("");
      setMessage(`Resource has been marked as rejected with curator reason.`);
      await load();
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : "Rejection failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleEditMetadataSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingResource) return;
    setBusy(true);
    setMessage("");
    setErrorMessage("");

    const form = new FormData(e.currentTarget);
    const title = (form.get("title") as string)?.trim();
    const resourceType = (form.get("resourceType") as string)?.trim() || null;
    const authorName = (form.get("authorName") as string)?.trim() || null;
    const unitRaw = form.get("unitNumber") as string;
    const unitNumber = unitRaw ? parseInt(unitRaw, 10) : null;
    const sourceReference = (form.get("sourceReference") as string)?.trim() || "";

    try {
      const response = await fetch("/api/admin/resources", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingResource.id,
          publish: editingResource.isPublished,
          provenanceStatus: editingResource.provenanceStatus,
          title: title || editingResource.title,
          resourceType,
          authorName,
          unitNumber,
          sourceReference,
          reviewedBy: "Academic Curator",
          reviewNote: editingResource.reviewNote || "Metadata updated by curator"
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Metadata update failed");
      setEditingResource(null);
      setMessage("Resource metadata updated successfully.");
      await load();
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : "Metadata update failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to permanently delete this resource from database and storage? This action cannot be undone.")) {
      return;
    }
    setBusy(true);
    try {
      const response = await fetch(`/api/admin/resources?id=${encodeURIComponent(id)}`, {
        method: "DELETE"
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to delete");
      if (selected?.id === id) setSelected(null);
      setMessage("Resource has been permanently deleted.");
      await load();
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : "Deletion failed");
    } finally {
      setBusy(false);
    }
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "Unknown size";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return "";
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return isoString;
    }
  };

  const getDownloadUrl = (res: Resource) => {
    const categoryMap: Record<string, string> = {
      PYQ: "pyq",
      SYLLABUS: "syllabus",
      NOTES: "notes",
      LAB_MANUAL: "lab-manual",
      PROJECT_ARCHIVE: "projects"
    };
    const cat = categoryMap[res.category.code] || "pyq";
    return `/api/${cat}/download?id=${res.id}`;
  };

  const getCategoryBadge = (res: Resource) => {
    if (res.category.code === "PYQ") {
      return (
        <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 flex items-center space-x-1">
          <FileQuestion className="h-3 w-3" />
          <span>Question Paper</span>
        </span>
      );
    }
    if (res.category.code === "NOTES") {
      return (
        <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center space-x-1">
          <BookOpen className="h-3 w-3" />
          <span>Study Notes</span>
        </span>
      );
    }
    if (res.category.code === "LAB_MANUAL") {
      if (res.resourceType === "VIVA_QUESTIONS") {
        return (
          <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200 flex items-center space-x-1">
            <HelpCircle className="h-3 w-3" />
            <span>Viva Questions</span>
          </span>
        );
      }
      if (res.resourceType === "PRACTICAL_FILE") {
        return (
          <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center space-x-1">
            <FlaskConical className="h-3 w-3" />
            <span>Practical File</span>
          </span>
        );
      }
      if (res.resourceType === "LAB_NOTES") {
        return (
          <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-teal-50 text-teal-700 border border-teal-200 flex items-center space-x-1">
            <FileText className="h-3 w-3" />
            <span>Lab Notes</span>
          </span>
        );
      }
      return (
        <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center space-x-1">
          <FlaskConical className="h-3 w-3" />
          <span>Lab Manual</span>
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
        {res.category.code}
      </span>
    );
  };

  const field = "w-full border border-slate-300 rounded-xl p-2.5 mt-1 text-slate-900 bg-white text-xs focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition";

  return (
    <div className="site-container py-8 sm:py-12 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-2 border border-blue-200">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
            <span>Academic Curator Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900">
            Unified Resource Moderation Dashboard
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Review, verify, edit, and publish student & faculty contributions across Question Papers, Study Notes, and Practical Materials.
          </p>
        </div>

        {signedIn && (
          <div className="flex items-center space-x-3">
            <button
              onClick={() => void load()}
              disabled={busy}
              className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs transition"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${busy ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={async () => {
                const r = await fetch("/api/admin/session", { method: "DELETE" });
                if (r.ok) {
                  setSignedIn(false);
                  setResources([]);
                }
              }}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign out</span>
            </button>
          </div>
        )}
      </div>

      {/* Notifications */}
      {message && (
        <div role="status" className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start space-x-2.5">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          <span className="font-medium">{message}</span>
        </div>
      )}
      {errorMessage && (
        <div role="alert" className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start space-x-2.5">
          <AlertTriangle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
          <span className="font-medium">{errorMessage}</span>
        </div>
      )}

      {/* Sign-in Form */}
      {!signedIn ? (
        <div className="max-w-md mx-auto my-12 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
          <div className="text-center space-y-1.5">
            <div className="mx-auto w-12 h-12 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center mb-2">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Curator Authentication</h2>
            <p className="text-xs text-slate-500">Enter your secure curator key to review and publish submissions.</p>
          </div>

          {!configured && (
            <div role="status" className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
              Curator access is disabled until the operator configures a secure access key.
            </div>
          )}

          <form onSubmit={login} className="space-y-4">
            <div>
              <label htmlFor={accessKeyInputId} className="block text-xs font-semibold text-slate-700">
                Curator access key
              </label>
              <input
                id={accessKeyInputId}
                type="password"
                autoComplete="current-password"
                required
                value={key}
                onChange={e => setKey(e.target.value)}
                placeholder="Enter 32+ character access key"
                className={field}
              />
            </div>
            <button
              type="submit"
              disabled={busy || !configured}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl shadow-xs transition disabled:opacity-50 text-xs"
            >
              {busy ? "Signing in…" : "Sign in to Curator Dashboard"}
            </button>
          </form>
        </div>
      ) : (
        /* Curator Dashboard Main View */
        <div className="space-y-6">
          {/* Controls Bar: Status Filters, Category Filters & Search */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            {/* Row 1: Status Tabs + Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0">
                <button
                  onClick={() => { setFilter("pending"); setPage(1); }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                    filter === "pending"
                      ? "bg-amber-100 text-amber-900 border border-amber-200"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span>Pending Review</span>
                  {counts.pending > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-200 text-amber-900 font-extrabold">
                      {counts.pending}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => { setFilter("approved"); setPage(1); }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                    filter === "approved"
                      ? "bg-emerald-100 text-emerald-900 border border-emerald-200"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span>Approved & Published</span>
                  {counts.approved > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-200 text-emerald-900 font-extrabold">
                      {counts.approved}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => { setFilter("rejected"); setPage(1); }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                    filter === "rejected"
                      ? "bg-rose-100 text-rose-900 border border-rose-200"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span>Rejected</span>
                  {counts.rejected > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-200 text-rose-900 font-extrabold">
                      {counts.rejected}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => { setFilter("all"); setPage(1); }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                    filter === "all"
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  All ({counts.total})
                </button>
              </div>

              {/* Search Input */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search code, title, contributor, file..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                  className="w-full pl-9 pr-3.5 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 transition"
                />
              </div>
            </div>

            {/* Row 2: Category Filters */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="font-semibold text-slate-500 uppercase tracking-wider mr-1 text-[11px] flex items-center">
                <Filter className="h-3 w-3 mr-1" /> Category:
              </span>

              {[
                { key: "ALL", label: "All Submissions", count: counts.byCategory?.all ?? counts.total },
                { key: "PYQ", label: "Question Papers", count: counts.byCategory?.pyq ?? 0 },
                { key: "NOTES", label: "Study Notes", count: counts.byCategory?.notes ?? 0 },
                { key: "LAB_MANUAL", label: "Lab Manuals", count: counts.byCategory?.labs ?? 0 },
                { key: "LAB_NOTES", label: "Lab Notes", count: counts.byCategory?.labNotes ?? 0 },
                { key: "PRACTICAL_FILE", label: "Practical Files", count: counts.byCategory?.practicalFiles ?? 0 },
                { key: "VIVA_QUESTIONS", label: "Viva Questions", count: counts.byCategory?.vivaQuestions ?? 0 },
              ].map((c) => (
                <button
                  key={c.key}
                  onClick={() => { setCategoryFilter(c.key); setPage(1); }}
                  className={`px-3 py-1 rounded-lg font-semibold transition flex items-center space-x-1.5 ${
                    categoryFilter === c.key
                      ? "bg-slate-800 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <span>{c.label}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    categoryFilter === c.key ? "bg-slate-700 text-white" : "bg-slate-200 text-slate-700"
                  }`}>
                    {c.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Showing {resources.length} of {total} resources</span>
            <span>Page {page}</span>
          </div>

          {/* Resources List */}
          {resources.length > 0 ? (
            <div className="grid gap-4">
              {resources.map((resource) => {
                const progName = resource.subject.semester?.curriculumVersion?.programme?.name;
                const progCode = resource.subject.semester?.curriculumVersion?.programme?.code;
                const semNum = resource.subject.semester?.semesterNumber;

                return (
                  <article
                    key={resource.id}
                    className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 shadow-xs transition space-y-4"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      {/* Left: Metadata */}
                      <div className="space-y-2 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Status Badge */}
                          {resource.isPublished ? (
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                              Published
                            </span>
                          ) : resource.provenanceStatus === "REJECTED" ? (
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                              Rejected
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                              Pending Review
                            </span>
                          )}

                          {/* Classification Badge */}
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
                            {provenanceLabel(resource.provenanceStatus)}
                          </span>

                          {/* Category Badge */}
                          {getCategoryBadge(resource)}

                          {resource.resourceType && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-600">
                              {resource.resourceType.replace(/_/g, " ")}
                            </span>
                          )}

                          {resource.unitNumber && (
                            <span className="text-xs text-slate-600 font-semibold bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                              Unit/Exp {resource.unitNumber}
                            </span>
                          )}

                          {resource.academicYear && (
                            <span className="text-xs text-slate-500 font-medium">
                              Session: {resource.academicYear}
                            </span>
                          )}
                        </div>

                        {/* Title & File Name */}
                        <div>
                          <h2 className="text-base font-bold text-slate-900">
                            {resource.title}
                          </h2>
                          <p className="text-xs text-slate-500 font-mono mt-0.5 truncate">
                            File: {resource.originalFileName} ({formatFileSize(resource.fileSizeBytes)})
                          </p>
                        </div>

                        {/* Academic Hierarchy */}
                        <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-600">
                          <span className="font-semibold text-slate-800">
                            {resource.subject.code} · {resource.subject.name}
                          </span>
                          {progCode && (
                            <>
                              <span>•</span>
                              <span>{progName || progCode}</span>
                            </>
                          )}
                          {semNum && (
                            <>
                              <span>•</span>
                              <span>Semester {semNum}</span>
                            </>
                          )}
                          {resource.authorName && (
                            <>
                              <span>•</span>
                              <span>Contributor: <strong>{resource.authorName}</strong></span>
                            </>
                          )}
                        </div>

                        {/* Source Reference if given */}
                        {resource.sourceReference && (
                          <p className="text-xs text-slate-500 italic">
                            Attribution / Source: {resource.sourceReference}
                          </p>
                        )}

                        {/* Submission Time & Reviewer */}
                        <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                          <span className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>Submitted: {formatDate(resource.createdAt)}</span>
                          </span>
                          {resource.reviewedBy && (
                            <span>Reviewed by: {resource.reviewedBy}</span>
                          )}
                        </div>

                        {resource.reviewNote && (
                          <div className="p-2.5 bg-slate-50 rounded-lg text-xs text-slate-700 border border-slate-100">
                            <span className="font-semibold text-slate-800">Curator Note:</span> {resource.reviewNote}
                          </div>
                        )}
                      </div>

                      {/* Right: Actions */}
                      <div className="flex flex-wrap lg:flex-col items-center lg:items-end gap-2 shrink-0">
                        {/* Preview / View PDF */}
                        <a
                          href={getDownloadUrl(resource) + "&view=inline"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition inline-flex items-center space-x-1"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>View PDF</span>
                        </a>

                        {/* Download PDF */}
                        <a
                          href={getDownloadUrl(resource)}
                          download
                          className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition inline-flex items-center space-x-1"
                        >
                          <Download className="h-3.5 w-3.5" />
                          <span>Download</span>
                        </a>

                        {/* Quick Approve (for pending) */}
                        {!resource.isPublished && resource.provenanceStatus !== "REJECTED" && (
                          <button
                            onClick={() => handleQuickApprove(resource)}
                            disabled={busy}
                            className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition inline-flex items-center space-x-1"
                          >
                            <Check className="h-3.5 w-3.5" />
                            <span>Quick Approve</span>
                          </button>
                        )}

                        {/* Unpublish (for approved) */}
                        {resource.isPublished && (
                          <button
                            onClick={() => handleUnpublish(resource)}
                            disabled={busy}
                            className="px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition inline-flex items-center space-x-1"
                          >
                            <EyeOff className="h-3.5 w-3.5" />
                            <span>Unpublish</span>
                          </button>
                        )}

                        {/* Full Review Modal Trigger */}
                        <button
                          onClick={() => { setSelected(resource); setMessage(""); setErrorMessage(""); }}
                          className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition inline-flex items-center space-x-1"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                          <span>Moderate</span>
                        </button>

                        {/* Reject Button (if pending or approved) */}
                        {resource.provenanceStatus !== "REJECTED" && (
                          <button
                            onClick={() => { setRejectingResource(resource); setRejectionReason(""); }}
                            className="px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition inline-flex items-center space-x-1"
                          >
                            <XCircle className="h-3.5 w-3.5" />
                            <span>Reject</span>
                          </button>
                        )}

                        {/* Edit Metadata */}
                        <button
                          onClick={() => setEditingResource(resource)}
                          className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 underline"
                        >
                          Edit Metadata
                        </button>

                        {/* Delete Permanent */}
                        <button
                          onClick={() => handleDelete(resource.id)}
                          className="p-1 text-slate-300 hover:text-rose-600 rounded transition"
                          title="Delete permanently"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 space-y-3">
              <FolderArchive className="mx-auto h-12 w-12 text-slate-300" />
              <p className="text-sm font-semibold text-slate-700">No resources found</p>
              <p className="text-xs text-slate-500">
                {filter === "pending"
                  ? "All submissions in this category have been moderated! Check published or rejected tabs."
                  : "No resources matched your current category or search criteria."}
              </p>
            </div>
          )}

          {/* Pagination */}
          {total > 25 && (
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 text-xs">
              <button
                disabled={page <= 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="px-4 py-2 font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl disabled:opacity-40 transition"
              >
                Previous
              </button>
              <span className="text-slate-500">Page {page} of {Math.ceil(total / 25)}</span>
              <button
                disabled={page * 25 >= total}
                onClick={() => setPage(p => p + 1)}
                className="px-4 py-2 font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl disabled:opacity-40 transition"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* Review & Decision Modal */}
      {selected && (
        <Modal label="Review resource" onClose={() => { if (!busy) setSelected(null); }}>
          <form
            onSubmit={(e) => handleReviewSubmit(e)}
            className="bg-white rounded-2xl p-6 sm:p-7 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl border border-slate-200"
          >
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">
                  Curator Decision
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-1">{selected.title}</h2>
                <p className="text-xs text-slate-500 font-mono truncate">{selected.originalFileName}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                disabled={busy}
                className="text-slate-400 hover:text-slate-600 p-1 rounded"
              >
                ✕
              </button>
            </div>

            {/* Document Details & Live Link */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-slate-800">{selected.subject.code} · {selected.subject.name}</span>
                <p className="text-slate-500">{formatFileSize(selected.fileSizeBytes)} · {selected.category.code}</p>
              </div>
              <a
                href={getDownloadUrl(selected) + "&view=inline"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline font-semibold flex items-center space-x-1 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs"
              >
                <span>Open PDF</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* Classification */}
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Classification Status <span className="text-rose-500">*</span>
              </label>
              <select
                name="status"
                defaultValue={selected.provenanceStatus === "REJECTED" ? "REJECTED" : selected.provenanceStatus}
                className={field}
              >
                <option value="VERIFIED">Verified Official University Material</option>
                <option value="PRACTICE">Practice & Preparation Material</option>
                <option value="UNVERIFIED">Source Verification Pending</option>
                <option value="REJECTED">Reject / Ineligible Resource</option>
              </select>
            </div>

            {/* Source Reference */}
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Source Reference or Examination Notice
              </label>
              <input
                name="source"
                maxLength={1000}
                defaultValue={selected.sourceReference || ""}
                placeholder="e.g. Invertis University Regular Examination Paper (Dec 2024)"
                className={field}
              />
            </div>

            {/* Reviewer Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Reviewer Name <span className="text-rose-500">*</span>
              </label>
              <input
                name="reviewer"
                minLength={2}
                maxLength={100}
                required
                defaultValue={selected.reviewedBy || "Academic Curator"}
                className={field}
              />
            </div>

            {/* Review Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Review Notes <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="note"
                required
                minLength={3}
                maxLength={1000}
                rows={3}
                defaultValue={selected.reviewNote || "Verified legible and correct syllabus alignment."}
                className={field}
              />
            </div>

            {/* Publish Checkbox */}
            <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100">
              <label className="flex items-center space-x-2.5 text-xs font-medium text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  name="publish"
                  defaultChecked={selected.isPublished}
                  className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                />
                <span>Publish publicly on subject page for all students</span>
              </label>
            </div>

            {/* Actions */}
            <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  disabled={busy}
                  onClick={(e) => {
                    const form = (e.target as HTMLElement).closest("form");
                    if (form) {
                      const pseudoEvent = {
                        preventDefault: () => {},
                        currentTarget: form
                      } as unknown as React.FormEvent<HTMLFormElement>;
                      void handleReviewSubmit(pseudoEvent, false, "REJECTED");
                    }
                  }}
                  className="px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition"
                >
                  Reject Resource
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => setSelected(null)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={busy}
                  className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition disabled:opacity-50"
                >
                  {busy ? "Saving…" : "Save Review"}
                </button>
              </div>
            </div>
          </form>
        </Modal>
      )}

      {/* Reject Resource Modal (Mandatory Reason) */}
      {rejectingResource && (
        <Modal label="Reject submission" onClose={() => setRejectingResource(null)}>
          <form onSubmit={handleRejectSubmit} className="bg-white rounded-2xl p-6 sm:p-7 max-w-md w-full space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center space-x-2 text-rose-700">
              <XCircle className="h-5 w-5" />
              <h3 className="text-base font-bold text-slate-900">Reject Submission</h3>
            </div>
            <p className="text-xs text-slate-600">
              You are rejecting <strong>&quot;{rejectingResource.title}&quot;</strong>. Please provide a clear rejection reason for the audit trail.
            </p>

            <div>
              <label htmlFor="rejection-reason-input" className="block text-xs font-semibold text-slate-700 mb-1">
                Rejection Reason <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="rejection-reason-input"
                required
                minLength={5}
                maxLength={500}
                rows={3}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="e.g. Unreadable scan, incorrect syllabus mapping, or duplicate of existing resource."
                className={field}
              />
            </div>

            <div className="pt-2 flex items-center justify-end space-x-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setRejectingResource(null)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={busy || rejectionReason.trim().length < 5}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition disabled:opacity-50"
              >
                Confirm Rejection
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Metadata Modal */}
      {editingResource && (
        <Modal label="Edit resource metadata" onClose={() => setEditingResource(null)}>
          <form onSubmit={handleEditMetadataSubmit} className="bg-white rounded-2xl p-6 sm:p-7 max-w-lg w-full space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center space-x-2 text-slate-800 border-b border-slate-100 pb-3">
              <Edit3 className="h-5 w-5 text-blue-600" />
              <h3 className="text-base font-bold text-slate-900">Edit Resource Metadata</h3>
            </div>

            <div>
              <label htmlFor="edit-title-input" className="block text-xs font-semibold text-slate-700 mb-1">
                Resource Title
              </label>
              <input
                id="edit-title-input"
                name="title"
                defaultValue={editingResource.title}
                required
                maxLength={180}
                className={field}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="edit-unit-input" className="block text-xs font-semibold text-slate-700 mb-1">
                  Unit / Exp Number
                </label>
                <input
                  id="edit-unit-input"
                  name="unitNumber"
                  type="number"
                  min={1}
                  max={50}
                  defaultValue={editingResource.unitNumber ?? ""}
                  placeholder="e.g. 1"
                  className={field}
                />
              </div>

              <div>
                <label htmlFor="edit-type-input" className="block text-xs font-semibold text-slate-700 mb-1">
                  Resource Subtype
                </label>
                <input
                  id="edit-type-input"
                  name="resourceType"
                  defaultValue={editingResource.resourceType ?? ""}
                  placeholder="e.g. HANDWRITTEN, LAB_NOTES"
                  className={field}
                />
              </div>
            </div>

            <div>
              <label htmlFor="edit-author-input" className="block text-xs font-semibold text-slate-700 mb-1">
                Contributor / Author Name
              </label>
              <input
                id="edit-author-input"
                name="authorName"
                defaultValue={editingResource.authorName ?? ""}
                placeholder="e.g. Student name or Department Faculty"
                className={field}
              />
            </div>

            <div>
              <label htmlFor="edit-source-input" className="block text-xs font-semibold text-slate-700 mb-1">
                Source Reference & Attribution
              </label>
              <input
                id="edit-source-input"
                name="sourceReference"
                defaultValue={editingResource.sourceReference ?? ""}
                placeholder="e.g. Self-authored lecture notes"
                className={field}
              />
            </div>

            <div className="pt-2 flex items-center justify-end space-x-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingResource(null)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={busy}
                className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition disabled:opacity-50"
              >
                Save Metadata
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
