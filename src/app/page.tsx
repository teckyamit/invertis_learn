import Link from "next/link";
import { db } from "@/lib/db";
import { 
  BookOpen, 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  FileText, 
  FlaskConical, 
  Compass, 
  Layers 
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const programmes = await db.programme.findMany({
    include: {
      curriculumVersions: {
        include: {
          semesters: {
            include: {
              _count: {
                select: { subjects: true },
              },
            },
          },
        },
      },
    },
  });

  const totalSubjects = await db.subject.count();
  const totalResources = await db.academicResource.count();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-brand-900 via-brand-950 to-slate-900 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Invertis University Academic Portal • Session 2023–24</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            INVERTIS <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-300">LEARN</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
            *Your Academic Companion* — Official course syllabi, curriculum regulations, and faculty-verified
            academic resources for engineering and technology students.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/syllabus"
              className="inline-flex items-center px-6 py-3.5 rounded-lg text-sm font-bold text-brand-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 shadow-lg shadow-amber-950/20 transition transform hover:-translate-y-0.5"
            >
              <BookOpen className="w-5 h-5 mr-2 text-brand-950" />
              <span>Explore Syllabus Library</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>

            <a
              href="#roadmap"
              className="inline-flex items-center px-6 py-3.5 rounded-lg text-sm font-semibold text-slate-200 bg-white/10 hover:bg-white/15 border border-white/10 transition"
            >
              <span>View Development Roadmap</span>
            </a>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-12 border-t border-slate-800">
            <div className="bg-white/5 backdrop-blur rounded-lg p-4 border border-white/10">
              <div className="text-3xl font-extrabold text-blue-400">{programmes.length}</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Programmes</div>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-lg p-4 border border-white/10">
              <div className="text-3xl font-extrabold text-amber-400">12</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Semesters</div>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-lg p-4 border border-white/10">
              <div className="text-3xl font-extrabold text-emerald-400">{totalSubjects}</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Verified Courses</div>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-lg p-4 border border-white/10">
              <div className="text-3xl font-extrabold text-purple-400">{totalResources}</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Official Syllabi Linked</div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Curricula Loaded */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-900 tracking-tight">
            Curriculum Regulations in Platform
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Mirrored directly from official Invertis Institute of Engineering & Technology syllabi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programmes.map((prog) => {
            const currentVersion = prog.curriculumVersions[0];
            const semesterCount = currentVersion?.semesters.length || 0;
            const subCount = currentVersion?.semesters.reduce(
              (acc, s) => acc + s._count.subjects,
              0
            );

            return (
              <div
                key={prog.id}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800">
                      {prog.degreeLevel}
                    </span>
                    <span className="text-xs font-semibold text-emerald-700 flex items-center">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                      Session 2023–24
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-brand-900 mb-2">
                    {prog.name}
                  </h3>
                  <p className="text-xs text-slate-500 mb-6 font-mono">
                    Code: {prog.code} • Duration: {prog.durationYears} Years
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-6 bg-slate-50 p-3.5 rounded-lg border border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-500">Semesters:</span>{" "}
                      <span className="font-bold text-slate-900">{semesterCount} Semesters</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Verified Subjects:</span>{" "}
                      <span className="font-bold text-slate-900">{subCount} Subjects</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/syllabus/${encodeURIComponent(prog.code)}`}
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold bg-brand-900 text-white hover:bg-brand-800 transition"
                >
                  <span>Browse {prog.code} Syllabi</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Incremental Roadmap Overview */}
      <section id="roadmap" className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Architectural Roadmap
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-900 mt-3">
              Incremental Development Phases
            </h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto mt-2">
              Strictly developed one verified phase at a time with university-authorized sources.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { phase: "Phase 0", title: "Project Foundation & Architecture", status: "COMPLETED", icon: CheckCircle2, active: true, color: "text-emerald-600" },
              { phase: "Phase 1", title: "Syllabus Library (B.Tech & M.Tech CSE)", status: "COMPLETED", icon: CheckCircle2, active: true, color: "text-emerald-600" },
              { phase: "Phase 2", title: "Previous-Year Question Papers (PYQs)", status: "ACTIVE", icon: FileText, active: true, color: "text-blue-600" },
              { phase: "Phase 3", title: "Faculty Notes & Learning Materials", status: "Planned", icon: Layers, active: false, color: "text-slate-400" },
              { phase: "Phase 4", title: "Practical & Laboratory Manuals", status: "Planned", icon: FlaskConical, active: false, color: "text-slate-400" },
              { phase: "Phase 5", title: "Department Knowledge Centre", status: "Planned", icon: GraduationCap, active: false, color: "text-slate-400" },
              { phase: "Phase 6", title: "Career & Skill Roadmaps", status: "Planned", icon: Compass, active: false, color: "text-slate-400" },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-4 rounded-lg border transition ${
                  item.active
                    ? "bg-white border-slate-300 shadow-sm"
                    : "bg-slate-50 border-slate-200 opacity-60"
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <div>
                    <span className="text-xs font-bold font-mono text-slate-500 mr-2">{item.phase}:</span>
                    <span className="text-sm font-semibold text-slate-900">{item.title}</span>
                  </div>
                </div>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    item.status === "COMPLETED"
                      ? "bg-emerald-100 text-emerald-800"
                      : item.status === "CURRENT PRIORITY"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
