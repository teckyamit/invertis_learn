import { db } from "@/lib/db";
import { ProgrammeDirectory } from "@/components/programmes/ProgrammeDirectory";
import { GraduationCap, ShieldCheck, Sparkles, Building2, ExternalLink } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Academic Programmes & Course Catalog | Invertis Learn",
  description: "Explore all 60 undergraduate, postgraduate, polytechnic diploma, and doctoral programmes offered by Invertis University across 9 academic faculties.",
};

export default async function ProgrammesPage() {
  const departments = await db.department.findMany({
    where: { isActive: true },
    select: {
      id: true,
      code: true,
      name: true,
    },
    orderBy: { name: "asc" },
  });

  const programmes = await db.programme.findMany({
    where: { isActive: true },
    include: {
      department: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },
    },
    orderBy: [
      { hasOfficialSyllabus: "desc" },
      { category: "asc" },
      { name: "asc" },
    ],
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Hero Header */}
        <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-slate-900 rounded-2xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Official Institutional Course Directory</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
              Invertis University Academic Catalog
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              Discover official academic programmes across all 4 university levels: Undergraduate, Postgraduate, 
              Polytechnic Diploma, and Doctoral research. Filter by faculty, inspect specializations, verify eligibility criteria, 
              and explore official curriculum structures.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2 border-t border-white/10">
              <div className="flex items-center space-x-1.5">
                <Building2 className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-white">9 Faculties / Departments</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1.5">
                <GraduationCap className="w-4 h-4 text-blue-400" />
                <span className="font-semibold text-white">60 Discovered Programmes</span>
              </div>
              <span>•</span>
              <a
                href="https://www.invertisuniversity.ac.in/ug-programmes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-amber-300 hover:text-amber-200 underline font-medium"
              >
                <span>invertisuniversity.ac.in</span>
                <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Directory Client Filter and Grid */}
        <ProgrammeDirectory initialProgrammes={programmes} departments={departments} />
      </div>
    </div>
  );
}

