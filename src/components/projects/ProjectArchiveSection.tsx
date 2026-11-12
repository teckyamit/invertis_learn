"use client";
import { provenanceLabel } from "@/lib/resource-policy";

import React, { useState } from "react";
import {
  FolderGit2,
  Download,
  FileText,
  CheckCircle2,
  Calendar,
  Layers,
  Award,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Cloud,
  Lock,
  Wifi,
  Sparkles
} from "lucide-react";

export interface ProjectResourceItem {
  id: string;
  title: string;
  originalFileName: string;
  storedFileName: string;
  provenanceStatus?: string;
  storagePath: string;
  fileSizeBytes: number;
  authorName?: string | null;
  resourceType?: string | null;
}

interface ProjectArchiveSectionProps {
  subjectCode: string;
  subjectName: string;
  projectResources: ProjectResourceItem[];
}

export function ProjectArchiveSection({
  subjectCode,
  subjectName,
  projectResources,
}: ProjectArchiveSectionProps) {
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null);

  const handleDownload = (storedFileName: string, title: string) => {
    setDownloadingFile(storedFileName);
    const link = document.createElement("a");
    link.href = `/api/projects/download?file=${encodeURIComponent(storedFileName)}&name=${encodeURIComponent(title)}`;
    link.download = storedFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloadingFile(null), 2000);
  };

  const projectPhases = [
    {
      phase: "Phase I",
      title: "Problem Formulation & IEEE Synopsis Defense",
      timeline: "Weeks 1 - 3",
      deliverable: "IEEE 4-page synopsis with problem statement, literature survey & Gantt chart.",
      weightage: "20% Weightage"
    },
    {
      phase: "Phase II",
      title: "Architecture Specification & Mid-Term Review",
      timeline: "Weeks 4 - 7",
      deliverable: "SRS documentation, UML structural diagrams, API contracts & prototype demo.",
      weightage: "30% Weightage"
    },
    {
      phase: "Phase III",
      title: "Implementation, Testing & Code Benchmarking",
      timeline: "Weeks 8 - 12",
      deliverable: "End-to-end working software modules, test automation & security audits.",
      weightage: "30% Weightage"
    },
    {
      phase: "Phase IV",
      title: "Technical Dissertation & External Viva Defense",
      timeline: "Weeks 13 - 16",
      deliverable: "Hardbound university project thesis, live production defense & paper preprint.",
      weightage: "20% Weightage"
    }
  ];

  const approvedDomains = [
    { name: "Artificial Intelligence & ML", icon: <Cpu className="h-4 w-4 text-purple-600" />, desc: "LLMs, RAG architectures, Computer Vision, Autonomous Agents" },
    { name: "Cloud & Distributed Systems", icon: <Cloud className="h-4 w-4 text-blue-600" />, desc: "Microservices, Kubernetes, Event-driven architectures, Serverless" },
    { name: "Cyber Security & Cryptography", icon: <Lock className="h-4 w-4 text-rose-600" />, desc: "Zero-Trust networks, Vulnerability scanners, Post-quantum crypto" },
    { name: "IoT & Embedded Telemetry", icon: <Wifi className="h-4 w-4 text-emerald-600" />, desc: "Sensor networks, Edge computing, Autonomous robotics, ROS" }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 bg-indigo-50 text-indigo-700 rounded-xl">
            <FolderGit2 className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-bold px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded">
                PHASE 5
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                Department Knowledge Centre & Capstone Projects
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Official university manuals, IEEE synopsis templates, milestone rubrics, and internship guidelines for {subjectCode}
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-800 border border-indigo-200 rounded-lg self-start sm:self-auto">
          Academic Council Verified
        </span>
      </div>

      {/* Official Project Documents & Download Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center">
            <FileText className="h-4 w-4 mr-2 text-indigo-600" />
            Official Project Manuals & Downloadable Templates
          </h3>
          <span className="text-xs text-slate-500">PDF-1.4 Accredited Documents</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projectResources.length > 0 ? (
            projectResources.map((res) => {
              const formattedSize = res.fileSizeBytes
                ? `${(res.fileSizeBytes / 1024).toFixed(1)} KB`
                : "PDF Manual";
              const isDownloading = downloadingFile === res.storedFileName;

              return (
                <div
                  key={res.id}
                  className="border border-slate-200 hover:border-indigo-300 rounded-xl p-5 bg-slate-50/60 hover:bg-white transition flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-slate-200/80 text-slate-700 rounded uppercase">
                        {res.resourceType || "GUIDELINE"}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {formattedSize}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-700 transition leading-snug">
                      {res.title}
                    </h4>
        <p className="text-xs text-amber-800 mt-2">{provenanceLabel(res.provenanceStatus)}</p>

                    {res.authorName && (
                      <p className="text-xs text-slate-500">
                        Authority: <span className="font-medium text-slate-700">{res.authorName}</span>
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 flex items-center">
                      <ShieldCheck className="h-3.5 w-3.5 mr-1 text-emerald-600" />
                      Session 2023-2024
                    </span>

                    <button
                      onClick={() => handleDownload(res.storedFileName, res.title)}
                      disabled={isDownloading}
                      className="inline-flex items-center px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg shadow-xs transition disabled:opacity-75"
                    >
                      <Download className="h-3.5 w-3.5 mr-1.5" />
                      {isDownloading ? "Downloading..." : "Download PDF"}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-2 text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <p className="text-xs text-slate-500">
                Official project templates are available via the Central Knowledge Centre Hub.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Capstone Lifecycle Timeline */}
      <div className="space-y-4 pt-2">
        <h3 className="text-sm font-bold text-slate-900 flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-indigo-600" />
          Capstone Evaluation Milestones & Rubric
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {projectPhases.map((p, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2 relative"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  {p.phase}
                </span>
                <span className="text-[10px] font-semibold text-slate-500">
                  {p.timeline}
                </span>
              </div>

              <h4 className="text-xs font-bold text-slate-900 leading-snug">
                {p.title}
              </h4>

              <p className="text-[11px] text-slate-600 leading-relaxed">
                {p.deliverable}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                <span className="text-emerald-700 font-bold">{p.weightage}</span>
                <span className="text-slate-400">Formal Review</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Approved Departmental Domains */}
      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center">
            <Sparkles className="h-3.5 w-3.5 mr-1.5 text-indigo-600" />
            Approved Capstone Research & Industry Specializations
          </h4>
          <span className="text-[11px] text-slate-400 font-mono">Invertis Tech Committee</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {approvedDomains.map((d, idx) => (
            <div
              key={idx}
              className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs space-y-1"
            >
              <div className="flex items-center space-x-2">
                {d.icon}
                <span className="text-xs font-bold text-slate-900">{d.name}</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

