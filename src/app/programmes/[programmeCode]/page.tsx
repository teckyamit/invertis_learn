import { notFound } from "next/navigation";
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
  Wrench
} from "lucide-react";

interface ProgrammeDetailPageProps {
  params: {
    programmeCode: string;
  };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: ProgrammeDetailPageProps) {
  const programme = await db.programme.findUnique({
    where: { code: params.programmeCode },
    include: { department: true }
  });

  if (!programme) {
    return { title: "Programme Not Found | Invertis Learn" };
  }

  return {
    title: `${programme.name} (${programme.code}) | Invertis Learn`,
    description: `Academic programme details, eligibility criteria, focus areas, and curriculum regulations for ${programme.name} at Invertis University.`,
  };
}

export default async function ProgrammeDetailPage({ params }: ProgrammeDetailPageProps) {
  const programme = await db.programme.findUnique({
    where: { code: params.programmeCode },
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
  const totalSubjectsInCurriculum = activeCurriculum 
    ? activeCurriculum.semesters.reduce((acc, sem) => acc + sem._count.subjects, 0)
    : 0;

  const isEngineering = programme.department.code === "ENG" || programme.department.name.toLowerCase().includes("engineering");

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs font-medium text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/programmes" className="hover:text-blue-600 transition">
            Programmes
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-bold truncate max-w-[200px] sm:max-w-none">
            {programme.code}
          </span>
        </nav>

        {/* Back Link */}
        <div>
          <Link
            href="/programmes"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Programmes</span>
          </Link>
        </div>

        {/* Programme Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-extrabold uppercase px-2.5 py-1 rounded bg-blue-100 text-blue-800 tracking-wider">
              {programme.category || programme.degreeLevel}
            </span>

            {programme.isLateralEntry && (
              <span className="text-xs font-bold bg-fuchsia-100 text-fuchsia-800 px-2.5 py-1 rounded">
                Lateral Entry (Direct 2nd Year)
              </span>
            )}

            {isEngineering ? (
              programme.hasOfficialSyllabus ? (
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Official Syllabi Digitized ({totalSubjectsInCurriculum} Subjects)</span>
                </span>
              ) : (
                <span className="text-xs font-medium bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded">
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

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
            {programme.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-2 border-t border-slate-100">
            <div className="flex items-center space-x-1 font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
              <span>Code: {programme.code}</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{programme.durationYears} Years Duration</span>
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
                  className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-semibold underline"
                >
                  <span>Official Invertis Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                </a>
              </>
            )}
          </div>
        </div>

        {/* Syllabus Status Callout */}
        {programme.hasOfficialSyllabus ? (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-emerald-900 font-bold text-sm sm:text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>Official Semester-by-Semester Curriculum Ready</span>
              </div>
              <p className="text-xs text-emerald-800 max-w-xl leading-relaxed">
                Explore the verified hierarchical syllabus structure extracted directly from official university syllabus documents.
                Review unit breakdowns, recommended textbooks, and question papers.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/syllabus/${programme.code}`}
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow transition"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explore Syllabus Library</span>
              </Link>
              <Link
                href={`/pyq/${programme.code}`}
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 bg-white border border-emerald-300 hover:bg-emerald-50 text-emerald-900 rounded-lg text-xs font-bold transition"
              >
                <FileText className="w-4 h-4 text-emerald-600" />
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
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-sm"
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
        {programme.description && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Programme Overview</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {programme.description}
            </p>
          </div>
        )}

        {/* Eligibility Criteria */}
        {programme.eligibility && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Eligibility & Admission Criteria</span>
            </h2>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              {programme.eligibility}
            </div>
          </div>
        )}

        {/* Specializations & Focus Tracks */}
        {specsList.length > 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-purple-600" />
              <span>Available Specializations & Focus Tracks</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {specsList.map((spec, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-3 p-3.5 rounded-lg border border-slate-200 bg-slate-50/70"
                >
                  <div className="w-6 h-6 rounded-md bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-800">{spec}</h3>
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
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-amber-600" />
              <span>Career Pathways & Industry Roles</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Graduates of this programme are prepared for roles such as:{" "}
              <strong className="text-slate-900">{programme.careerProspects}</strong>.
            </p>
          </div>
        )}

        {/* Department Info Box */}
        <div className="bg-slate-900 text-white rounded-xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Academic Faculty
            </div>
            <div className="text-lg font-bold text-white">
              {programme.department.name}
            </div>
            {programme.department.description && (
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                {programme.department.description}
              </p>
            )}
          </div>
          <Link
            href="/programmes"
            className="inline-flex items-center space-x-1 text-xs font-bold text-brand-950 bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-lg transition self-start sm:self-center flex-shrink-0"
          >
            <span>Browse All Faculty Programmes</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

