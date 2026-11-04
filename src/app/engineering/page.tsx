import { db } from "@/lib/db";
import { EngineeringDirectory } from "@/components/engineering/EngineeringDirectory";
import { Wrench, ShieldCheck, BookOpen, Layers, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Engineering Programmes | Invertis Learn",
  description: "Browse verified engineering programmes at Invertis University — B.Tech, M.Tech, and Diploma Engineering syllabi and study resources.",
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
  const activeSyllabusCount = programmes.filter(p => p.hasOfficialSyllabus).length;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 mb-3">
                <Wrench className="w-3.5 h-3.5 text-blue-600" />
                <span>Invertis Institute of Engineering & Technology</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Engineering Programmes
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
                Discover verified undergraduate, postgraduate, and polytechnic diploma engineering programmes offered at Invertis University. 
                Access official semester course schemes, isolated subject syllabi, faculty notes, solved past papers, and laboratory manuals.
              </p>
            </div>

            {/* Quick Metrics Badges */}
            <div className="flex sm:flex-col gap-2 shrink-0">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center sm:text-right">
                <div className="text-xl font-extrabold text-emerald-800">{activeSyllabusCount} Programmes</div>
                <div className="text-[11px] font-medium text-emerald-700">Full Resources Live</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center sm:text-right">
                <div className="text-xl font-extrabold text-slate-800">{programmes.length} Total</div>
                <div className="text-[11px] font-medium text-slate-600">Discovered Branches</div>
              </div>
            </div>
          </div>

          {/* Student Journey Breadcrumbs helper */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Student Navigation Flow:</span>
            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Home</span>
            <span>→</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">Engineering</span>
            <span>→</span>
            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Select Programme</span>
            <span>→</span>
            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Semester</span>
            <span>→</span>
            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Subject Resources</span>
          </div>
        </div>

        {/* Engineering Directory List / Tabs */}
        <EngineeringDirectory programmes={programmes} />
      </div>
    </div>
  );
}

