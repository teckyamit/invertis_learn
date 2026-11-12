import { db } from "@/lib/db";
import { EngineeringDirectory } from "@/components/engineering/EngineeringDirectory";
import { Cpu, ShieldCheck, BookOpen, Layers, CheckCircle2, ChevronRight } from "lucide-react";
import { CANONICAL_CSE_PROGRAMME_CODES } from "@/lib/admissionModes";
import { compareProgrammesByAcademicLevel } from "@/lib/academicLevels";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Computer Science & Engineering Programs | Invertis Learn",
  description: "Browse verified Computer Science & Engineering programmes at Invertis University — Diploma, B.Tech CSE, Lateral Entry, M.Tech CSE, and Ph.D. in CSE syllabi and study resources.",
};

export default async function EngineeringPage() {
  const engineeringDept = await db.department.findFirst({
    where: {
      OR: [
        { code: "ENG" },
        { name: { contains: "Engineering" } }
      ]
    },
    include: {
      programmes: {
        where: {
          isActive: true,
          code: { in: [...CANONICAL_CSE_PROGRAMME_CODES] },
        },
        orderBy: [
          { hasOfficialSyllabus: "desc" },
          { code: "asc" }
        ],
        include: {
          curriculumVersions: {
            where: { isCurrent: true },
            include: {
              semesters: {
                orderBy: { semesterNumber: "asc" },
                include: {
                  _count: {
                    select: { subjects: true }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  const programmes = engineeringDept?.programmes || [];
  const sortedProgrammes = [...programmes].sort(compareProgrammesByAcademicLevel);
  const activeSyllabusCount = sortedProgrammes.filter(p => p.hasOfficialSyllabus).length;

  return (
    <div className="w-full min-h-screen py-6 sm:py-10">
      <div className="site-container space-y-6 sm:space-y-8">
        {/* Page Header */}
        <div className="card-hero bg-white border border-slate-200 p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 min-w-0">
              <div className="inline-flex items-center space-x-2 text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 mb-1">
                <Cpu className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="truncate">Department of Computer Science & Engineering</span>
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                Computer Science & Engineering Programs
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-4xl leading-relaxed">
                Discover verified Computer Science & Engineering programmes offered at Invertis University across diploma, undergraduate, lateral entry, postgraduate, and doctoral research levels. 
                Access official semester course schemes, isolated subject syllabi, faculty notes, solved past papers, and laboratory manuals across core computing and advanced specializations.
              </p>
            </div>

            {/* Quick Metrics Badges - Responsive Grid without rigid minimum width overflow */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5 w-full lg:w-auto shrink-0">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 sm:p-3.5 text-center sm:text-left lg:text-right min-w-0">
                <div className="font-heading text-lg sm:text-2xl font-bold text-emerald-800">{activeSyllabusCount} Programmes</div>
                <div className="text-[10px] sm:text-[11px] font-medium text-emerald-700 truncate">Full Resources Live</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-3.5 text-center sm:text-left lg:text-right min-w-0">
                <div className="font-heading text-lg sm:text-2xl font-bold text-slate-800">{programmes.length} Total</div>
                <div className="text-[10px] sm:text-[11px] font-medium text-slate-600 truncate">CSE Programmes (Inc. Ph.D.)</div>
              </div>
            </div>
          </div>

          {/* Student Journey Breadcrumbs helper with integrated chevrons to prevent wrapping detachment */}
          <div className="mt-6 pt-5 border-t border-slate-100 space-y-2">
            <span className="text-xs font-semibold text-slate-700 block">Student Navigation Flow:</span>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-slate-600">
              <span className="inline-flex items-center bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium">
                <span>Home</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 ml-1.5 shrink-0" />
              </span>
              <span className="inline-flex items-center bg-blue-100 text-blue-800 px-2.5 py-1 rounded-md font-bold">
                <span>CSE Programs</span>
                <ChevronRight className="w-3.5 h-3.5 text-blue-500 ml-1.5 shrink-0" />
              </span>
              <span className="inline-flex items-center bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium">
                <span>Select Specialization</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 ml-1.5 shrink-0" />
              </span>
              <span className="inline-flex items-center bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium">
                <span>Semester</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 ml-1.5 shrink-0" />
              </span>
              <span className="inline-flex items-center bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium">
                <span>Subject Resources</span>
              </span>
            </div>
          </div>
        </div>

        {/* Engineering Directory List / Tabs */}
        <EngineeringDirectory programmes={sortedProgrammes} />
      </div>
    </div>
  );
}
