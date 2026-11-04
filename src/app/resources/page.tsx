import { db } from "@/lib/db";
import Link from "next/link";
import { 
  BookOpen, 
  FileText, 
  Layers, 
  FlaskConical, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  GraduationCap, 
  Sparkles,
  ShieldCheck,
  Download,
  FolderOpen
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Academic Resources Hub | Invertis Learn",
  description: "Access verified course syllabi, past examination papers, faculty lecture notes, and laboratory manuals for Invertis University.",
};

export default async function ResourcesPage() {
  const totalResources = await db.academicResource.count();
  const totalSubjects = await db.subject.count();
  const categories = await db.resourceCategory.findMany();

  // Fetch subjects with resource counts
  const subjectsWithResources = await db.subject.findMany({
    where: {
      resources: { some: {} }
    },
    include: {
      resources: {
        include: { category: true }
      },
      semester: {
        include: {
          curriculumVersion: {
            include: { programme: true }
          }
        }
      }
    },
    take: 12
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 mb-3">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Free & Open Academic Materials • No Login Required</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Academic Resources Library
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
                Centralized repository of verified educational materials for Invertis University students.
                Download authentic syllabi, previous semester exam papers with answer keys, faculty notes, and laboratory viva guides.
              </p>
            </div>

            <div className="flex sm:flex-col gap-2 shrink-0">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center sm:text-right">
                <div className="text-xl font-extrabold text-blue-900">{totalResources}+ Files</div>
                <div className="text-[11px] font-medium text-blue-700">Verified Resources</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* 1. Syllabi */}
          <div className="bg-white rounded-xl border border-slate-200 hover:border-blue-300 p-5 shadow-sm transition flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 border border-blue-100">
                <BookOpen className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-slate-900 mb-1">Syllabus Library</h2>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Strict subject-wise course outlines, credit schemes, unit breakdowns, and textbook references.
              </p>
            </div>
            <Link
              href="/syllabus"
              className="inline-flex items-center justify-between text-xs font-bold text-blue-600 hover:text-blue-800 pt-3 border-t border-slate-100"
            >
              <span>Browse Syllabi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 2. PYQ */}
          <div className="bg-white rounded-xl border border-slate-200 hover:border-blue-300 p-5 shadow-sm transition flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-100">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-slate-900 mb-1">Previous Year Papers</h2>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                End-semester, mid-semester, and pre-university examination papers from 2021 to 2024.
              </p>
            </div>
            <Link
              href="/pyq"
              className="inline-flex items-center justify-between text-xs font-bold text-emerald-700 hover:text-emerald-900 pt-3 border-t border-slate-100"
            >
              <span>Browse PYQ Library</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 3. Notes */}
          <div className="bg-white rounded-xl border border-slate-200 hover:border-blue-300 p-5 shadow-sm transition flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 border border-indigo-100">
                <Layers className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-slate-900 mb-1">Faculty Notes</h2>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Curated chapter presentations, unit-wise handwritten summaries, and revision cheat-sheets.
              </p>
            </div>
            <Link
              href="/notes"
              className="inline-flex items-center justify-between text-xs font-bold text-indigo-600 hover:text-indigo-800 pt-3 border-t border-slate-100"
            >
              <span>Browse Notes Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 4. Labs */}
          <div className="bg-white rounded-xl border border-slate-200 hover:border-blue-300 p-5 shadow-sm transition flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-4 border border-amber-100">
                <FlaskConical className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-slate-900 mb-1">Lab Manuals & Viva</h2>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Practical lab experiments, circuit wiring guides, starter code templates, and viva voce Q&A.
              </p>
            </div>
            <Link
              href="/labs"
              className="inline-flex items-center justify-between text-xs font-bold text-amber-700 hover:text-amber-900 pt-3 border-t border-slate-100"
            >
              <span>Browse Lab Manuals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Featured Subjects with Full Academic Resources */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Quick Subject Resources Access
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Jump directly into complete learning workspaces featuring isolated syllabi, past papers, notes, and lab manuals.
              </p>
            </div>
            <Link
              href="/engineering"
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
            >
              <span>View All Engineering Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjectsWithResources.map((subject) => {
              const progCode = subject.semester.curriculumVersion.programme.code;
              const semNumber = subject.semester.semesterNumber;
              const pyqCount = subject.resources.filter(r => r.category.code === "PYQ").length;
              const noteCount = subject.resources.filter(r => r.category.code === "NOTES").length;
              const labCount = subject.resources.filter(r => r.category.code === "LAB_MANUAL").length;

              return (
                <div
                  key={subject.id}
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 bg-slate-50/50 hover:bg-white transition space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-700 bg-slate-200 px-1.5 py-0.5 rounded">
                      {subject.code}
                    </span>
                    <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Sem {semNumber}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 leading-snug line-clamp-1">
                    {subject.name}
                  </h3>

                  <div className="flex items-center gap-2 text-[10px] text-slate-600">
                    <span className="bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-200">
                      {pyqCount} PYQs
                    </span>
                    <span className="bg-indigo-50 text-indigo-800 px-1.5 py-0.5 rounded border border-indigo-200">
                      {noteCount} Notes
                    </span>
                    {labCount > 0 && (
                      <span className="bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded border border-amber-200">
                        {labCount} Lab Guides
                      </span>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                    <Link
                      href={`/syllabus/${progCode}/semester/${semNumber}/${subject.code}`}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                    >
                      <span>Open Workspace</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* University ERP Callout Card */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Official Student Portal</span>
            </div>
            <h3 className="text-xl font-bold tracking-tight">Need Official Attendance, Marks, or Fee Receipts?</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Invertis Learn provides open academic study materials. For administrative records, semester grade cards, admit cards, 
              and examination registration, please access the official <strong>Invertis University ERP</strong>.
            </p>
          </div>
          <a
            href="https://erp.invertisuniversity.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center space-x-2 px-5 py-3 rounded-lg text-xs font-bold text-brand-950 bg-amber-400 hover:bg-amber-300 shadow-md transition"
          >
            <span>Open University ERP</span>
            <span className="text-sm">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
