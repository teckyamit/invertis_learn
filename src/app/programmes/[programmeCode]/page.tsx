import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { 
  GraduationCap, 
  Building2, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  FileText, 
  ArrowLeft, 
  ExternalLink, 
  Sparkles, 
  Briefcase, 
  ShieldCheck,
  ChevronRight,
  Layers,
  Wrench,
  ArrowRight
} from "lucide-react";
import { 
  resolveCanonicalCode,
  programSupportsLateral,
  parseEntryMode,
  getActiveEntryDetails,
  getProgramAdmissionConfig
} from "@/lib/admissionModes";
import { EntryModeSelector } from "@/components/common/EntryModeSelector";

interface ProgrammeDetailPageProps {
  params: Promise<{
    programmeCode: string;
  }>;
  searchParams?: Promise<{
    entry?: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params: paramsPromise, searchParams: searchParamsPromise }: ProgrammeDetailPageProps) {
  const params = await paramsPromise;
  const searchParams = searchParamsPromise ? await searchParamsPromise : undefined;
  const rawCode = params.programmeCode;
  const canonicalCode = resolveCanonicalCode(rawCode);
  const entryMode = parseEntryMode(searchParams?.entry);

  const programme = await db.programme.findUnique({
    where: { code: canonicalCode },
    include: { department: true }
  });

  if (!programme) {
    return { title: "Programme Not Found | Invertis Learn" };
  }

  const supportsLateral = programSupportsLateral(canonicalCode);
  const modeTitle = (supportsLateral && entryMode === "lateral") ? "Lateral Entry (Direct 2nd Year)" : "Regular Entry";

  return {
    title: `${programme.name} — ${modeTitle} (${programme.code}) | Invertis Learn`,
    description: `Academic programme details, eligibility criteria, focus areas, and curriculum regulations for ${programme.name} at Invertis University.`,
  };
}

export default async function ProgrammeDetailPage({ params: paramsPromise, searchParams: searchParamsPromise }: ProgrammeDetailPageProps) {
  const params = await paramsPromise;
  const searchParams = searchParamsPromise ? await searchParamsPromise : undefined;
  const rawCode = params.programmeCode;
  const canonicalCode = resolveCanonicalCode(rawCode);

  // If a legacy lateral code was accessed directly, redirect to canonical code with ?entry=lateral
  if (rawCode.toUpperCase() !== canonicalCode.toUpperCase()) {
    redirect(`/programmes/${canonicalCode}?entry=lateral`);
  }

  const entryMode = parseEntryMode(searchParams?.entry);
  const admissionConfig = getProgramAdmissionConfig(canonicalCode);
  const supportsLateral = programSupportsLateral(canonicalCode);
  const activeDetails = getActiveEntryDetails(canonicalCode, entryMode);

  const programme = await db.programme.findUnique({
    where: { code: canonicalCode },
    include: {
      department: true,
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
  });

  if (!programme) {
    notFound();
  }

  let specsList: string[] = [];
  try {
    if (programme.specializations) {
      specsList = JSON.parse(programme.specializations);
    }
  } catch {
    specsList = programme.specializations ? programme.specializations.split(",") : [];
  }

  const activeCurriculum = programme.curriculumVersions[0];
  const allSemesters = activeCurriculum?.semesters || [];

  // Filter semesters dynamically according to admission mode
  const displayedSemesters = supportsLateral && entryMode === "lateral"
    ? allSemesters.filter(s => s.semesterNumber >= activeDetails.minSemester && s.semesterNumber <= activeDetails.maxSemester)
    : allSemesters;

  const totalSubjectsInCurriculum = displayedSemesters.reduce(
    (acc, sem) => acc + sem._count.subjects,
    0
  );

  const isEngineering = programme.department.code === "ENG" || programme.department.name.toLowerCase().includes("engineering");
  const isLateralSelected = supportsLateral && entryMode === "lateral";

  // Dynamic values based on entry mode
  const activeDurationYears = activeDetails.durationYears;
  const activeEligibility = isLateralSelected ? activeDetails.eligibility : (programme.eligibility || activeDetails.eligibility);
  const activeDescription = isLateralSelected ? activeDetails.description : (programme.description || activeDetails.description);

  return (
    <div className="min-h-screen bg-surface-ground py-10">
      <div className="site-container space-y-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs font-medium text-slate-500">
          <Link href="/" className="hover:text-brand-blue transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/programmes" className="hover:text-brand-blue transition">
            Programmes
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-brand-navy font-bold truncate max-w-[200px] sm:max-w-none">
            {programme.code}
          </span>
          {isLateralSelected && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-blue-700 font-bold">Lateral Entry</span>
            </>
          )}
        </nav>

        {/* Back Link */}
        <div>
          <Link
            href="/engineering"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-brand-blue transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Engineering Programs</span>
          </Link>
        </div>

        {/* Programme Header Card */}
        <div className="card-hero p-6 sm:p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-extrabold uppercase px-2.5 py-1 rounded bg-blue-100 text-brand-blue tracking-wider">
              {programme.category || programme.degreeLevel}
            </span>

            {supportsLateral && (
              <span className={`text-xs font-bold px-2.5 py-1 rounded border flex items-center gap-1 ${
                isLateralSelected
                  ? "bg-purple-100 text-purple-900 border-purple-200"
                  : "bg-blue-50 text-blue-800 border-blue-200"
              }`}>
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{isLateralSelected ? "Lateral Entry Scheme (Direct 2nd Year)" : "Regular & Lateral Entry Supported"}</span>
              </span>
            )}

            {isLateralSelected && activeDetails.officialCode && (
              <span className="text-xs font-mono font-bold bg-indigo-100 text-indigo-900 border border-indigo-200 px-2.5 py-1 rounded">
                Official Code: {activeDetails.officialCode}
              </span>
            )}

            {isEngineering ? (
              programme.hasOfficialSyllabus ? (
                <span className="text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Official Syllabi Digitized ({totalSubjectsInCurriculum} Subjects)</span>
                </span>
              ) : (
                <span className="text-xs font-medium bg-blue-50 text-brand-blue border border-blue-200 px-2.5 py-1 rounded">
                  Engineering Branch (Syllabus Ingestion)
                </span>
              )
            ) : (
              <span className="text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-1 rounded flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>Coming Soon (Next Phase)</span>
              </span>
            )}
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight leading-tight mb-2">
            {programme.name}
            {isLateralSelected && (
              <span className="text-blue-700 text-xl sm:text-2xl font-bold ml-2">
                (Lateral Entry)
              </span>
            )}
          </h1>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-600 pt-2 border-t border-slate-100">
            <div className="flex items-center space-x-1 font-mono font-bold text-brand-navy bg-slate-100 px-2 py-0.5 rounded">
              <span>Code: {programme.code}</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{activeDurationYears} Years Duration ({displayedSemesters.length} Semesters)</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <Building2 className="w-4 h-4 text-slate-400" />
              <span>{programme.department.name}</span>
            </div>
            {programme.officialSourceUrl && (
              <>
                <span>•</span>
                <a
                  href={programme.officialSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-brand-blue hover:underline font-semibold"
                >
                  <span>Official Invertis Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                </a>
              </>
            )}
          </div>
        </div>

        {/* Admission Mode Switcher for eligible programmes */}
        {supportsLateral && (
          <EntryModeSelector
            canonicalCode={canonicalCode}
            currentMode={entryMode}
            basePath={`/programmes/${canonicalCode}`}
          />
        )}

        {/* Doctoral Research Hub Feature Banner for Ph.D. */}
        {(canonicalCode === "PHD-009" || programme.category === "DOCTORAL" || programme.code.startsWith("PHD")) && (
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-rose-950 font-bold text-sm sm:text-base">
                <GraduationCap className="w-5 h-5 text-rose-600 flex-shrink-0" />
                <span>Comprehensive Ph.D. Research & Guidance Hub Live</span>
              </div>
              <p className="text-xs text-rose-900/80 max-w-xl leading-relaxed">
                Access the official coursework syllabus (PhDRM 101, PhD-032, RPE 101), 40+ doctoral research tools, 
                computing topic explorer, LaTeX manuscript templates, 25 viva voce defense questions, and an interactive milestone tracker.
              </p>
            </div>
            <Link
              href="/phd"
              className="inline-flex items-center justify-center space-x-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 px-5 py-2.5 rounded-xl shadow-xs transition flex-shrink-0"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Open Ph.D. Research Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* Syllabus Status Callout */}
        {programme.hasOfficialSyllabus ? (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-brand-navy font-bold text-sm sm:text-base">
                <CheckCircle2 className="w-5 h-5 text-brand-blue flex-shrink-0" />
                <span>
                  {isLateralSelected
                    ? `Lateral Entry Curriculum (${displayedSemesters.length} Semesters, ${totalSubjectsInCurriculum} Subjects)`
                    : `Official Semester-by-Semester Curriculum Ready (${totalSubjectsInCurriculum} Subjects)`}
                </span>
              </div>
              <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
                {isLateralSelected
                  ? "Lateral Entry students enter directly in Semester III. Explore the verified curriculum schemes, syllabus units, question papers, and laboratory manuals across Semesters III through VIII."
                  : "Explore the verified hierarchical syllabus structure extracted directly from official university syllabus documents. Review unit breakdowns, recommended textbooks, and question papers."}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/syllabus/${programme.code}${isLateralSelected ? "?entry=lateral" : ""}`}
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 bg-brand-navy hover:bg-brand-blue text-white rounded-lg text-xs font-bold shadow-xs transition"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explore Syllabus Library</span>
              </Link>
              <Link
                href={`/pyq/${programme.code}${isLateralSelected ? "?entry=lateral" : ""}`}
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 bg-white border border-slate-200 hover:border-blue-300 text-brand-navy rounded-lg text-xs font-bold transition"
              >
                <FileText className="w-4 h-4 text-brand-blue" />
                <span>Past Question Papers</span>
              </Link>
            </div>
          </div>
        ) : !isEngineering ? (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
              <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <span>Coming Soon — Current Release Focuses on Engineering</span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              Academic syllabi and materials for <strong>{programme.name}</strong> ({programme.department.name}) 
              are scheduled for upcoming release phases once official curriculum documents are fully ingested. 
              Currently, all Engineering programmes (B.Tech, M.Tech, and Diploma) are live and accessible without any authentication.
            </p>
            <div className="pt-2">
              <Link
                href="/engineering"
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-brand-blue hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-sm"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Explore Live Engineering Programmes</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 shadow-sm space-y-2">
            <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <span>Official University Syllabus Ingestion Pending</span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              In accordance with our strict zero-hallucination policy, subjects and semester course schemes are ONLY 
              unlocked upon direct ingestion of official university curriculum PDFs. No placeholder or fictitious subjects 
              are generated. The verified program overview, eligibility requirements, and focus specializations are provided below.
            </p>
          </div>
        )}

        {/* Overview & Description */}
        {activeDescription && (
          <div className="card-standard p-6 space-y-3 bg-white border border-slate-200 rounded-xl">
            <h2 className="font-heading text-base font-bold text-brand-navy flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-brand-blue" />
              <span>Programme Overview ({isLateralSelected ? "Lateral Entry Scheme" : "Regular Scheme"})</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {activeDescription}
            </p>
          </div>
        )}

        {/* Eligibility Criteria */}
        {activeEligibility && (
          <div className="card-standard p-6 space-y-3 bg-white border border-slate-200 rounded-xl">
            <h2 className="font-heading text-base font-bold text-brand-navy flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Eligibility & Admission Criteria ({isLateralSelected ? "Direct 2nd Year Entry" : "Regular Admission"})</span>
            </h2>
            <div className="bg-surface-ground rounded-lg p-4 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              {activeEligibility}
            </div>
          </div>
        )}

        {/* Specializations & Focus Tracks */}
        {specsList.length > 0 && (
          <div className="card-standard p-6 space-y-3 bg-white border border-slate-200 rounded-xl">
            <h2 className="font-heading text-base font-bold text-brand-navy flex items-center space-x-2">
              <Layers className="w-4 h-4 text-brand-blue" />
              <span>Available Specializations & Focus Tracks</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {specsList.map((spec, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-3 p-3.5 rounded-lg border border-slate-200 bg-surface-ground"
                >
                  <div className="w-6 h-6 rounded-md bg-blue-100 text-brand-blue flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-brand-navy">{spec}</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Curriculum module aligned with industry certification and modern practice.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Career Opportunities */}
        {programme.careerProspects && (
          <div className="card-standard p-6 space-y-3 bg-white border border-slate-200 rounded-xl">
            <h2 className="font-heading text-base font-bold text-brand-navy flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-amber-600" />
              <span>Career Pathways & Industry Roles</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Graduates of this programme are prepared for roles such as:{" "}
              <strong className="text-brand-navy">{programme.careerProspects}</strong>.
            </p>
          </div>
        )}

        {/* Department Info Box */}
        <div className="bg-brand-navy text-white rounded-xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-300">
              Academic Faculty
            </div>
            <div className="font-heading text-lg font-bold text-white">
              {programme.department.name}
            </div>
            {programme.department.description && (
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                {programme.department.description}
              </p>
            )}
          </div>
          <Link
            href="/engineering"
            className="inline-flex items-center space-x-1 text-xs font-bold text-white bg-brand-blue hover:bg-blue-500 px-4 py-2 rounded-lg transition self-start sm:self-center flex-shrink-0"
          >
            <span>Browse Engineering Programs</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
