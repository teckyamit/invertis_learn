"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ExternalLink,
  RefreshCw,
  Edit3,
  Globe,
  Layers,
  Sparkles,
  ShieldCheck,
  Check,
  X,
  ListVideo,
  BookOpen,
  FileText
} from "lucide-react";

export interface AcademicResourceEntry {
  resourceId: string;
  title: string;
  type: string;
  platform: string;
  provider: string;
  url: string;
  language: string;
  academicLevel: string;
  isFree: boolean;
  verificationStatus: string;
  verificationMethod: string;
  verifiedAt: string;
  qualityScore: number;
  implementationEligible: boolean;
  programmes: string[];
  subjects: string[];
  lastProbeAt?: string;
  lastProbeResult?: any;
}

export function AcademicResourceManager() {
  const [resources, setResources] = useState<AcademicResourceEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Filters
  const [programmeFilter, setProgrammeFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Edit URL modal
  const [editingResource, setEditingResource] = useState<AcademicResourceEntry | null>(null);
  const [newUrl, setNewUrl] = useState("");
  const [probingId, setProbingId] = useState<string | null>(null);

  const fetchResources = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const q = encodeURIComponent(searchQuery.trim());
      const res = await fetch(
        `/api/admin/academic-resources?programme=${programmeFilter}&type=${typeFilter}&status=${statusFilter}&q=${q}`
      );
      if (!res.ok) {
        throw new Error(`Failed to load academic resources (${res.status})`);
      }
      const data = await res.json();
      setResources(data.resources || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch registry");
    } finally {
      setLoading(false);
    }
  }, [programmeFilter, typeFilter, statusFilter, searchQuery]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  // Action: Probe URL
  const handleProbe = async (resourceId: string) => {
    setProbingId(resourceId);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/admin/academic-resources", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resourceId, action: "VERIFY" })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Probe failed");

      setSuccess(`Health probe complete for ${resourceId}: ${data.resource?.verificationStatus}`);
      await fetchResources();
    } catch (err: any) {
      setError(err.message || "Probe request failed");
    } finally {
      setProbingId(null);
    }
  };

  // Action: Toggle Eligibility
  const handleToggleEligibility = async (resourceId: string) => {
    try {
      const res = await fetch("/api/admin/academic-resources", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resourceId, action: "TOGGLE_ELIGIBILITY" })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Action failed");
      await fetchResources();
    } catch (err: any) {
      setError(err.message || "Failed to update eligibility");
    }
  };

  // Action: Save URL
  const handleSaveUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingResource || !newUrl.trim()) return;

    try {
      const res = await fetch("/api/admin/academic-resources", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resourceId: editingResource.resourceId,
          action: "UPDATE_URL",
          newUrl: newUrl.trim()
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      setSuccess(`URL updated successfully for ${editingResource.resourceId}`);
      setEditingResource(null);
      setNewUrl("");
      await fetchResources();
    } catch (err: any) {
      setError(err.message || "URL update failed");
    }
  };

  // Metrics
  const totalCount = resources.length;
  const verifiedCount = resources.filter(r => r.verificationStatus === "page_verified" || r.verificationStatus === "fully_verified").length;
  const unavailableCount = resources.filter(r => r.verificationStatus === "unavailable").length;
  const restrictedCount = resources.filter(r => r.verificationStatus === "access_restricted").length;

  return (
    <div className="space-y-6">
      {/* Overview Metric Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <span className="block text-xs font-semibold text-slate-500 uppercase">Tracked Resources</span>
          <span className="font-heading text-2xl font-bold text-slate-900">{totalCount}</span>
        </div>
        <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 shadow-2xs">
          <span className="block text-xs font-semibold text-emerald-800 uppercase flex items-center">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Page Verified
          </span>
          <span className="font-heading text-2xl font-bold text-emerald-950">{verifiedCount}</span>
        </div>
        <div className="p-4 bg-rose-50/70 rounded-xl border border-rose-200 shadow-2xs">
          <span className="block text-xs font-semibold text-rose-800 uppercase flex items-center">
            <XCircle className="h-3.5 w-3.5 mr-1" /> Unavailable
          </span>
          <span className="font-heading text-2xl font-bold text-rose-950">{unavailableCount}</span>
        </div>
        <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 shadow-2xs">
          <span className="block text-xs font-semibold text-amber-800 uppercase flex items-center">
            <AlertTriangle className="h-3.5 w-3.5 mr-1" /> Access Restricted
          </span>
          <span className="font-heading text-2xl font-bold text-amber-950">{restrictedCount}</span>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError("")}><X className="h-4 w-4" /></button>
        </div>
      )}
      {success && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-between">
          <span>{success}</span>
          <button onClick={() => setSuccess("")}><X className="h-4 w-4" /></button>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search resource title, platform, URL, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <button
            onClick={() => fetchResources()}
            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition flex items-center gap-1.5 shrink-0"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center space-x-1">
            <span className="text-slate-400 font-semibold text-[11px]">Prog:</span>
            {["ALL", "PHD-009", "MTECH-CSE", "BTECH-CSE", "DIP-CSE"].map((p) => (
              <button
                key={p}
                onClick={() => setProgrammeFilter(p)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                  programmeFilter === p ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-1">
            <span className="text-slate-400 font-semibold text-[11px]">Format:</span>
            {["ALL", "playlist", "video", "course", "notes", "textbook"].map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold capitalize transition ${
                  typeFilter === t ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-1">
            <span className="text-slate-400 font-semibold text-[11px]">Status:</span>
            {["ALL", "page_verified", "unavailable", "access_restricted"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                  statusFilter === s ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {s.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resource Table / List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500">Loading academic resources...</div>
        ) : resources.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">No resources match your filter criteria.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Resource & Provider</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Mapped Subjects</th>
                  <th className="py-3 px-4">Status & Score</th>
                  <th className="py-3 px-4 text-right">Curator Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {resources.map((item) => {
                  const isVerified = item.verificationStatus === "page_verified" || item.verificationStatus === "fully_verified";
                  const isUnavailable = item.verificationStatus === "unavailable";
                  const isProbing = probingId === item.resourceId;

                  return (
                    <tr key={item.resourceId} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4 max-w-sm">
                        <div className="font-bold text-slate-900 leading-snug">{item.title}</div>
                        <div className="flex items-center space-x-2 text-[11px] text-slate-500 mt-1">
                          <span className="font-mono text-blue-700 bg-blue-50 px-1 rounded">{item.resourceId}</span>
                          <span>•</span>
                          <span className="font-semibold text-slate-700">{item.provider}</span>
                          <span>•</span>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-700 hover:underline flex items-center"
                          >
                            <span>Link</span>
                            <ExternalLink className="h-3 w-3 ml-0.5" />
                          </a>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded font-mono text-[10px] uppercase font-bold bg-slate-100 text-slate-700">
                          {item.type}
                        </span>
                        <div className="text-[11px] text-slate-400 capitalize mt-0.5">{item.academicLevel}</div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {item.subjects?.map((s) => (
                            <span key={s} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] font-semibold">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                            isVerified
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : isUnavailable
                              ? "bg-rose-50 text-rose-800 border border-rose-200"
                              : "bg-amber-50 text-amber-800 border border-amber-200"
                          }`}
                        >
                          {item.verificationStatus}
                        </span>
                        <div className="text-[11px] text-slate-500 font-medium mt-1">
                          Score: <strong className="text-slate-800">{item.qualityScore}</strong>/100
                        </div>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            type="button"
                            onClick={() => handleProbe(item.resourceId)}
                            disabled={isProbing}
                            title="Perform live outbound URL health check"
                            className="p-1.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition"
                          >
                            <RefreshCw className={`h-3.5 w-3.5 ${isProbing ? "animate-spin text-blue-600" : ""}`} />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setEditingResource(item);
                              setNewUrl(item.url);
                            }}
                            title="Replace resource URL"
                            className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleToggleEligibility(item.resourceId)}
                            title={item.implementationEligible ? "Disable resource" : "Enable resource"}
                            className={`px-2 py-1 rounded text-[10px] font-bold transition ${
                              item.implementationEligible
                                ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                                : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                            }`}
                          >
                            {item.implementationEligible ? "Active" : "Disabled"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit URL Modal */}
      {editingResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-heading font-bold text-sm text-slate-900">
                Replace Resource URL · {editingResource.resourceId}
              </h3>
              <button onClick={() => setEditingResource(null)} className="text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Updating URL for <strong>{editingResource.title}</strong> ({editingResource.provider}).
            </p>

            <form onSubmit={handleSaveUrl} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  New Verified Destination URL
                </label>
                <input
                  type="url"
                  required
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingResource(null)}
                  className="px-3.5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition"
                >
                  Save & Reverity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
