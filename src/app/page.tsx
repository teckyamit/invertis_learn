import Link from "next/link";
import { db } from "@/lib/db";
import { getCatalogueCounts } from "@/lib/catalogue";
import { 
  BookOpen, 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  FileText, 
  FlaskConical, 
  Layers,
  Wrench,
  ExternalLink,
  Unlock,
  ChevronRight,
  Building2,
  Cpu,
  Sparkles
} from "lucide-react";
import { 
  getProgrammeCurriculumStats, 
  getProgrammeDisplayName 
} from "@/lib/lateralEntry";
import { programSupportsLateral, getProgramAdmissionConfig } from "@/lib/admissionModes";
import { compareProgrammesByAcademicLevel } from "@/lib/academicLevels";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Invertis Learn | Academic Companion",
  description: "Simple, organized, publicly accessible academic resource platform for Invertis University students. Verified syllabi, past examination papers, notes, and lab manuals.",
};

export default async function HomePage() {
  const activeSyllabusProgrammes = await db.programme.findMany({
    where: { 
      hasOfficialSyllabus: true, 
      isActive: true,
      isLateralEntry: false 
    },
    include: {
      curriculumVersions: {
        where: { isCurrent: true },
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
    orderBy: [
      { code: "asc" }
    ]
  });

  // Strictly order programmes by academic hierarchy: Diploma (1), UG (2), PG (3), Doctoral (4)
  const sortedActiveProgrammes = [...activeSyllabusProgrammes].sort(compareProgrammesByAcademicLevel);

  const { totalProgrammes, totalDepartments, totalSubjects, totalResources } = await getCatalogueCounts();

  // Other university departments for the preview section
  const otherDepartments = await db.department.findMany({
    where: {
      NOT: { code: "ENG" }
    },
    include: {
      _count: {
        select: { programmes: true }
      }
    },
    take: 6
  });

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Hero Section - Clean, Academic, Professional */}
      <section className="bg-white border-b border-slate-200 py-12 sm:py-16 lg:py-20 w-full">
        <div className="site-container text-center space-y-6">
          {/* Institutional Header Pill */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Academic Resource Companion • Invertis University, Bareilly</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Academic Materials for <br className="hidden sm:inline" />
            <span className="text-blue-600">Invertis University</span> Students
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Instant, friction-free access to verified course syllabi, past examination papers, faculty lecture notes, 
            and laboratory manuals. <strong>No login or student registration required.</strong>
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2 w-full max-w-lg sm:max-w-none mx-auto">
            <Link
              href="/engineering"
              className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition w-full sm:w-auto min-h-[44px]"
            >
              <Wrench className="w-4 h-4 shrink-0" />
              <span>Explore Engineering Programmes</span>
              <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
            </Link>

            <Link
              href="/resources"
              className="inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition w-full sm:w-auto min-h-[44px]"
            >
              <BookOpen className="w-4 h-4 text-slate-600 shrink-0" />
              <span>Academic Resources Hub</span>
            </Link>

            <a
              href="https://erp.invertisuniversity.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl text-sm font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 transition w-full sm:w-auto min-h-[44px]"
              title="Official Invertis University ERP (Attendance, Marks, Fees)"
            >
              <span>University ERP</span>
              <ExternalLink className="w-4 h-4 text-amber-700 shrink-0" />
            </a>
          </div>

          {/* Zero Authentication Assurance Badge */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-500 pt-2">
            <span className="inline-flex items-center space-x-1.5">
              <Unlock className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Free & Open Access</span>
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="inline-flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Zero Account / Login Barrier</span>
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="inline-flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Official 2023–24 Syllabi</span>
            </span>
          </div>
        </div>
      </section>

      {/* Student Journey: Simple, Predictable Navigation Flow */}
      <section className="py-10 sm:py-12 w-full">
        <div className="site-container">
          <div className="card-hero bg-white border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-1">
              <h2 className="font-heading text-lg sm:text-xl font-bold text-slate-900">
                Straightforward Student Journey
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Locate your course and study resources in seconds with zero complicated menus or authentication gates.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 pt-2">
              {[
                { step: "Step 1", label: "Home", desc: "Select Engineering", active: true },
                { step: "Step 2", label: "Engineering", desc: "B.Tech, M.Tech, Diploma", active: true },
                { step: "Step 3", label: "Programme", desc: "e.g. B.Tech CSE", active: true },
                { step: "Step 4", label: "Semester", desc: "Choose 1 to 8", active: true },
                { step: "Step 5", label: "Subject", desc: "Isolated Course", active: true },
                { step: "Step 6", label: "Resources", desc: "PYQ, Notes, Labs", active: true },
              ].map((s, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-200 text-center relative group hover:border-blue-300 hover:bg-white hover:shadow-2xs transition"
                >
                  <div className="text-[10px] font-mono font-bold text-blue-600 mb-1">{s.step}</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-800">{s.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Currently Available Programmes: Engineering Focus */}
      <section className="pb-12 w-full">
        <div className="site-container space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
                <Wrench className="w-3.5 h-3.5" />
                <span>Current Release Scope</span>
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
                Computer Science & Engineering Programs (Fully Accessible)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Verified academic curricula from the Department of Computer Science & Engineering.
              </p>
            </div>

            <Link
              href="/engineering"
              className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 self-start sm:self-auto"
            >
              <span>View All CSE Programmes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Highlighted Engineering Curricula */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedActiveProgrammes.map((prog) => {
            const stats = getProgrammeCurriculumStats(prog, sortedActiveProgrammes);
            const displayName = getProgrammeDisplayName(prog.code, prog.name);
            const supportsLateral = programSupportsLateral(prog.code);
            const admissionConfig = getProgramAdmissionConfig(prog.code);
            const isDoctoral = prog.category === "DOCTORAL" || prog.code.startsWith("PHD");

            return (
              <div
                key={prog.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm hover:border-blue-300 hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-bold uppercase bg-blue-50 text-blue-700 border border-blue-200">
                        {prog.category || prog.degreeLevel}
                      </span>
                      {supportsLateral && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                          Lateral Entry Available
                        </span>
                      )}
                      {isDoctoral && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          Ph.D. Research
                        </span>
                      )}
                    </div>
                    {stats.hasActiveResources ? (
                      <span className="text-xs font-bold text-emerald-700 flex items-center space-x-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Resources Active</span>
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-slate-500 flex items-center space-x-1 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 shrink-0">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Syllabus Ingestion</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    <Link href={isDoctoral ? "/phd" : `/programmes/${prog.code}`} className="hover:text-blue-600 transition">
                      {displayName}
                    </Link>
                  </h3>
                  <div className="flex items-center space-x-2 text-xs text-slate-500 mb-4 font-mono">
                    <span className="font-bold text-slate-700">{prog.code}</span>
                    <span>•</span>
                    {isDoctoral ? (
                      <span>{prog.durationYears} Years (Doctoral Research & Thesis)</span>
                    ) : supportsLateral ? (
                      <span>{prog.durationYears} Years Regular • {admissionConfig?.lateral?.durationYears ?? 3} Years Lateral</span>
                    ) : (
                      <span>{prog.durationYears} Years Duration</span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-5 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-500">Semesters:</span>{" "}
                      <span className="font-bold text-slate-800">
                        {isDoctoral 
                          ? "1 Sem Coursework + Thesis" 
                          : supportsLateral 
                          ? `${stats.semesterCount} Sem (Lateral: III–VIII)` 
                          : `${stats.semesterCount} Semesters`}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500">Curriculum:</span>{" "}
                      <span className="font-bold text-slate-800">
                        {supportsLateral && stats.lateralSubjectCount
                          ? `Regular: ${stats.subjectCount} • Lateral: ${stats.lateralSubjectCount}`
                          : `${stats.subjectCount} Verified Subjects`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-100">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    {isDoctoral ? (
                      <>
                        <Link
                          href={`/syllabus/${encodeURIComponent(prog.code)}`}
                          className="flex-1 inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm min-h-[38px]"
                        >
                          <BookOpen className="w-3.5 h-3.5 shrink-0" />
                          <span>Open Syllabus</span>
                        </Link>
                        <Link
                          href="/phd"
                          className="inline-flex items-center justify-center space-x-1 px-3.5 py-2.5 rounded-lg text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition min-h-[38px]"
                        >
                          <GraduationCap className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                          <span>Doctoral Hub</span>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          href={`/syllabus/${encodeURIComponent(prog.code)}`}
                          className="flex-1 inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm min-h-[38px]"
                        >
                          <BookOpen className="w-3.5 h-3.5 shrink-0" />
                          <span>Browse Syllabi & Semesters</span>
                        </Link>
                        <Link
                          href={`/pyq/${encodeURIComponent(prog.code)}`}
                          className="inline-flex items-center justify-center space-x-1 px-3.5 py-2.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition min-h-[38px]"
                        >
                          <FileText className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span>PYQs</span>
                        </Link>
                      </>
                    )}
                  </div>

                  {supportsLateral && (
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Need Lateral Entry curriculum?</span>
                      <Link
                        href={`/syllabus/${encodeURIComponent(prog.code)}?entry=lateral`}
                        className="font-bold text-purple-700 hover:text-purple-900 hover:underline inline-flex items-center gap-0.5"
                      >
                        <span>Lateral Entry (Sem III–VIII)</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Engineering Categories Quick Overview Card (Ordered by Academic Level: Diploma -> UG -> PG -> Ph.D.) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-1.5 border-l-4 border-amber-500">
            <div className="text-xs font-bold text-amber-700 uppercase">1. Diploma in CSE</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              3-Year Polytechnic Diploma in Computer Science & Engineering foundational computing education.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-1.5 border-l-4 border-blue-600">
            <div className="text-xs font-bold text-blue-700 uppercase">2. B.Tech CSE & Lateral</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Core Computer Science, AI & ML, Cloud Computing & Cyber Security, and Direct 2nd-Year Lateral Entry.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-1.5 border-l-4 border-indigo-600">
            <div className="text-xs font-bold text-indigo-700 uppercase">3. M.Tech CSE Postgraduate</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Master of Technology in Computer Science & Engineering with advanced research curricula.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-1.5 border-l-4 border-rose-600">
            <div className="text-xs font-bold text-rose-700 uppercase">4. Ph.D. Doctoral Research</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ph.D. in Computer Science & Engineering covering AI, Cybersecurity, Cloud, and Big Data thesis research.
            </p>
          </div>
        </div>
      </div>
    </section>

      {/* Academic Resources 4 Pillars Section */}
      <section className="py-12 bg-white border-y border-slate-200 w-full">
        <div className="site-container space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <span>Comprehensive Library</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
              Everything Needed for Examination Preparation
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Subject-wise isolated documents designed strictly around Invertis University scheme of instruction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link
              href="/syllabus"
              className="bg-slate-50 hover:bg-blue-50/50 rounded-xl border border-slate-200 hover:border-blue-300 p-6 transition group shadow-2xs hover:shadow-xs"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-base font-bold text-slate-900 group-hover:text-blue-600 transition mb-1.5">
                Subject-Wise Syllabi
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Unit outlines, lecture hour distributions, course credits, and recommended reference books.
              </p>
            </Link>

            <Link
              href="/pyq"
              className="bg-slate-50 hover:bg-emerald-50/50 rounded-xl border border-slate-200 hover:border-emerald-300 p-6 transition group shadow-2xs hover:shadow-xs"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-base font-bold text-slate-900 group-hover:text-emerald-700 transition mb-1.5">
                Past Question Papers
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                End-semester, mid-semester, and pre-university question papers with full answer keys.
              </p>
            </Link>

            <Link
              href="/notes"
              className="bg-slate-50 hover:bg-indigo-50/50 rounded-xl border border-slate-200 hover:border-indigo-300 p-6 transition group shadow-2xs hover:shadow-xs"
            >
              <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-base font-bold text-slate-900 group-hover:text-indigo-700 transition mb-1.5">
                Faculty Lecture Notes
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Curated chapter presentations, topic summaries, and quick-revision cheat-sheets.
              </p>
            </Link>

            <Link
              href="/labs"
              className="bg-slate-50 hover:bg-amber-50/50 rounded-xl border border-slate-200 hover:border-amber-300 p-6 transition group shadow-2xs hover:shadow-xs"
            >
              <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <FlaskConical className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-base font-bold text-slate-900 group-hover:text-amber-800 transition mb-1.5">
                Practical Lab Manuals
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Prescribed laboratory experiments, circuit diagrams, starter code templates, and viva Q&A.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Other University Programmes: Clearly Marked "Coming Soon" */}
      <section className="py-12 sm:py-16 w-full">
        <div className="site-container space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded uppercase tracking-wider mb-1">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>Upcoming Curricula</span>
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
                Other University Programmes (Coming Soon)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Departments are visible in the directory; study resources will unlock upon official syllabus ingestion.
              </p>
            </div>

            <Link
              href="/programmes"
              className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-slate-700 hover:text-blue-600 self-start sm:self-auto"
            >
              <span>Explore All 60 Discovered Programmes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Coming Soon Department Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherDepartments.map((dept) => (
              <div
                key={dept.id}
                className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 flex items-center justify-between shadow-2xs hover:border-slate-300 transition"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-[10px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                      {dept.code}
                    </span>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                      Coming Soon
                    </span>
                  </div>
                  <h3 className="font-heading text-xs sm:text-sm font-bold text-slate-900 leading-snug line-clamp-1">
                    {dept.name}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {dept._count.programmes} Discovered Programmes
                  </p>
                </div>

                <Link
                  href="/programmes"
                  className="shrink-0 p-2 text-slate-400 hover:text-blue-600 transition"
                  title="View in directory"
                >
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* University ERP Callout Section */}
      <section className="pb-16 w-full">
        <div className="site-container">
          <div className="bg-gradient-to-r from-slate-900 via-brand-900 to-blue-950 text-white rounded-2xl p-6 sm:p-10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Official Student Portal Link</span>
              </div>
              <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">Looking for University ERP?</h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Invertis Learn provides open academic materials and syllabus frameworks. For student attendance, semester results, 
                fee receipts, and examination hall tickets, access the official Invertis University ERP.
              </p>
            </div>
            <a
              href="https://erp.invertisuniversity.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 shadow-md transition w-full sm:w-auto min-h-[44px]"
            >
              <span>Open University ERP</span>
              <ExternalLink className="w-4 h-4 shrink-0" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
