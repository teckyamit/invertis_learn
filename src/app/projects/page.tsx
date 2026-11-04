import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import {
  FolderGit2,
  FileText,
  Download,
  Calendar,
  Layers,
  ChevronRight,
  ShieldCheck,
  Award,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Cpu,
  GraduationCap
} from "lucide-react";

export const revalidate = 3600;

export default async function ProjectsHubPage() {
  // Fetch all PROJECT_ARCHIVE category resources
  const projectResources = await db.academicResource.findMany({
    where: {
      category: { code: "PROJECT_ARCHIVE" },
      isPublished: true,
    },
    include: {
      subject: {
        include: {
          semester: {
            include: {
              curriculumVersion: {
                include: { programme: true },
              },
            },
          },
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  // Unique document templates
  const uniqueTemplates = Array.from(
    new Map(projectResources.map((r) => [r.storedFileName, r])).values()
  );

  // Capstone subjects
  const capstoneSubjects = await db.subject.findMany({
    where: {
      OR: [
        { code: { in: ["BCS-753", "BCS-754", "BCS-854"] } },
        { code: { in: ["BCSAI 706", "BCSAI 801", "BCSAI 802"] } },
        { code: { in: ["MCS-151", "MCS-251", "MCS351", "MCS393", "MCS-394"] } },
      ],
      semester: {
        curriculumVersion: {
          isCurrent: true,
          programme: { department: { code: "ENG" } },
        },
      },
    },
    include: {
      semester: {
        include: {
          curriculumVersion: {
            include: { programme: true },
          },
        },
      },
      resources: {
        where: { category: { code: "PROJECT_ARCHIVE" } },
      },
    },
    orderBy: [
      { semester: { curriculumVersion: { programme: { code: "asc" } } } },
      { semester: { semesterNumber: "asc" } },
    ],
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Hero Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full text-xs font-bold uppercase tracking-wider">
                <FolderGit2 className="h-3.5 w-3.5 text-indigo-600" />
                <span>Phase 5: Knowledge Centre</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Department Knowledge Centre & Capstone Projects
              </h1>
              <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                Official Invertis University capstone guidelines, IEEE format synopsis templates, evaluation rubrics, and internship handbooks for undergraduate and postgraduate engineering students.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 self-start sm:self-auto flex-shrink-0">
              <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-center">
                <span className="block text-xl font-bold text-slate-900">{capstoneSubjects.length}</span>
                <span className="text-[11px] text-slate-500 font-medium">Capstone Courses</span>
              </div>
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-2 text-center">
                <span className="block text-xl font-bold text-indigo-700">{uniqueTemplates.length}</span>
                <span className="text-[11px] text-indigo-800 font-medium">Official Templates</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
            <span className="flex items-center">
              <ShieldCheck className="h-3.5 w-3.5 mr-1 text-emerald-600" />
              Invertis Academic Regulations 2023-2024
            </span>
            <span>•</span>
            <span className="flex items-center">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-blue-600" />
              IEEE 2-Column Standard Synopsis
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Award className="h-3.5 w-3.5 mr-1 text-purple-600" />
              100% Free & Open Access
            </span>
          </div>
        </div>

        {/* Capstone Milestone & Evaluation Framework */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-indigo-600" />
              Department Capstone Evaluation Lifecycle & Timeline
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Standardized 4-phase milestone progression for Invertis University final-year engineering projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">Phase I • Weeks 1-3</span>
                <span className="text-xs font-bold text-slate-700">20% Marks</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">IEEE 4-Page Synopsis Defense</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Formulation of problem statement, comprehensive literature survey, and Gantt chart review before the Departmental Project Committee.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded">Phase II • Weeks 4-7</span>
                <span className="text-xs font-bold text-slate-700">30% Marks</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">Architecture & Mid-Term Review</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                System Requirements Specification (SRS), UML architectural diagrams, API schemas, and interactive proof-of-concept demonstration.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-purple-100 bg-purple-50/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2 py-0.5 rounded">Phase III • Weeks 8-12</span>
                <span className="text-xs font-bold text-slate-700">30% Marks</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">Implementation & Verification</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full-scale module development, unit/integration testing suite, performance benchmarking, and internal departmental code audit.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Phase IV • Weeks 13-16</span>
                <span className="text-xs font-bold text-slate-700">20% Marks</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">Dissertation & Viva Defense</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Final hardbound thesis submission according to university formatting guidelines, external viva examination, and research paper preprint.
              </p>
            </div>
          </div>
        </div>

        {/* Official Downloadable Templates Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-indigo-600" />
              Official Handbooks & Downloadable IEEE Templates
            </h2>
            <span className="text-xs text-slate-500 font-mono">PDF-1.4 Formats</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {uniqueTemplates.map((tpl) => {
              const formattedSize = tpl.fileSizeBytes
                ? `${(tpl.fileSizeBytes / 1024).toFixed(1)} KB`
                : "PDF Guide";

              return (
                <div
                  key={tpl.id}
                  className="bg-white border border-slate-200 hover:border-indigo-300 rounded-xl p-5 shadow-2xs hover:shadow-sm transition flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded uppercase">
                      {tpl.resourceType || "DOCUMENT"}
                    </span>

                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-700 transition leading-snug">
                      {tpl.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      Authority: {tpl.authorName || "Faculty of Engineering & Technology"}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">{formattedSize}</span>

                    <a
                      href={`/api/projects/download?file=${encodeURIComponent(tpl.storedFileName)}&name=${encodeURIComponent(tpl.title)}`}
                      className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg shadow-2xs transition"
                      title="Download official PDF"
                    >
                      <Download className="h-3.5 w-3.5 mr-1" />
                      Download
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Capstone & Research Courses Directory */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center">
                <GraduationCap className="h-5 w-5 mr-2 text-indigo-600" />
                Department Capstone, Internship & Thesis Courses
              </h2>
              <p className="text-xs text-slate-500">
                Direct access to project workspaces, milestone timelines, and evaluation criteria
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capstoneSubjects.map((sub) => {
              const sem = sub.semester;
              const prog = sem.curriculumVersion.programme;
              const subjectUrl = `/syllabus/${encodeURIComponent(prog.code)}/semester/${sem.semesterNumber}/${encodeURIComponent(sub.code)}`;

              return (
                <Link
                  key={sub.id}
                  href={subjectUrl}
                  className="bg-white border border-slate-200 hover:border-indigo-400 rounded-xl p-5 shadow-2xs hover:shadow-sm transition flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold px-2.5 py-0.5 bg-slate-900 text-white rounded">
                        {sub.code}
                      </span>
                      <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">
                        {sub.subjectType}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-700 transition">
                      {sub.name}
                    </h3>

                    <p className="text-xs text-slate-500">
                      {prog.name} • {sem.title}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-indigo-700 font-semibold group-hover:underline">
                    <span>Open Capstone Workspace</span>
                    <ArrowRight className="h-3.5 w-3.5 transition transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
