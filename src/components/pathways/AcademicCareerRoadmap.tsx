"use client";

import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  CheckCircle2,
  Circle,
  RotateCcw,
  BookOpen,
  Award,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Scale,
  FileText,
  School,
  Microscope,
  Compass,
  Briefcase,
  Layers,
  Sparkles,
  ShieldCheck
} from "lucide-react";

interface MilestoneStep {
  id: string;
  stepNumber: number;
  title: string;
  category: string;
  description: string;
  actionItems: string[];
  keyRegulation?: string;
}

const ROADMAP_STEPS: MilestoneStep[] = [
  {
    id: "step-1-mtech-qualification",
    stepNumber: 1,
    title: "M.Tech Qualification & Core Academic Foundation",
    category: "Academic Qualification",
    description: "Complete a 2-year Master of Technology (e.g., M.Tech in Computer Science & Engineering) from an AICTE/UGC recognized university with First Class honors.",
    actionItems: [
      "Maintain minimum 60% marks or 6.75/10 CGPA (First Class benchmark in B.Tech and/or M.Tech)",
      "Complete advanced coursework (MCS-102 Advanced OS, MCS-151 Adv Architecture, MCS-214 Distributed Systems)",
      "Focus thesis dissertation on an original, rigorous problem with verifiable experimental data",
      "Gain laboratory mentoring or teaching assistantship experience during semesters 3 and 4"
    ],
    keyRegulation: "AICTE Gazette Notification 1st March 2019 — Clause 5.1 (Qualifications for Engineering Disciplines)"
  },
  {
    id: "step-2-eligibility-verification",
    stepNumber: 2,
    title: "Eligibility Verification Under Applicable AICTE & UGC Rules",
    category: "Regulatory Verification",
    description: "Verify your exact degree nomenclature and grade criteria against institutional recruitment notifications before applying.",
    actionItems: [
      "Verify First Class or equivalent in either B.E./B.Tech or M.E./M.Tech in the appropriate branch",
      "Check institutional classification: AICTE-affiliated engineering college vs. UGC-governed university department",
      "Note that for pure engineering faculty positions, NET is not conducted by NTA/UGC; M.Tech First Class is the minimum entry qualification",
      "Ensure graduation from an AICTE-approved or UGC-recognized institution (such as Invertis University)"
    ],
    keyRegulation: "AICTE 7th CPC Regulations 2019 / UGC Regulations on Minimum Qualifications 2018"
  },
  {
    id: "step-3-teaching-portfolio",
    stepNumber: 3,
    title: "Teaching Portfolio, Pedagogy & Demo Lecture Readiness",
    category: "Pedagogy & Classroom Readiness",
    description: "Formulate a professional teaching philosophy dossier based on modern Outcome-Based Education (OBE) principles and Bloom's Taxonomy.",
    actionItems: [
      "Design 2 complete Course Outcomes (CO) to Program Outcomes (PO) mapping matrix samples",
      "Prepare 3 polished, 15-minute demonstration lectures (e.g., Virtual Memory Paging, Red-Black Trees, RSA Cryptography)",
      "Master whiteboard diagramming, pedagogical pacing, and responsive student questioning techniques",
      "Assemble laboratory assignment sheets and rubrics for undergraduate practicals"
    ],
    keyRegulation: "National Board of Accreditation (NBA) Outcome-Based Education (OBE) Guidelines"
  },
  {
    id: "step-4-research-preparation",
    stepNumber: 4,
    title: "Research Methodology, Thesis & Peer-Reviewed Publications",
    category: "Research & Academic Integrity",
    description: "Establish an active research track record by publishing genuine findings in reputable, indexed academic journals and conferences.",
    actionItems: [
      "Publish at least 1-2 research papers in Scopus-indexed, SCI/SCIE, or UGC-CARE Listed Group I/II journals",
      "Present research papers at reputable IEEE, ACM, or Springer peer-reviewed conferences",
      "Ensure strict compliance with UGC Plagiarism Regulations 2018 (similarity threshold <10%, exclude bibliography)",
      "Establish verified profiles on Google Scholar, ORCID, Scopus Author ID, and ResearchGate"
    ],
    keyRegulation: "UGC (Promotion of Academic Integrity and Prevention of Plagiarism in HEIs) Regulations, 2018"
  },
  {
    id: "step-5-net-preparation",
    stepNumber: 5,
    title: "UGC-NET Preparation (Subject Code 87 - Where Applicable)",
    category: "Competitive Examination",
    description: "Prepare for UGC-NET Computer Science and Applications for positions in University Departments (BCA/MCA/M.Sc) or JRF eligibility.",
    actionItems: [
      "Master Paper 1: Teaching Aptitude, Research Methodology, Comprehension, Higher Education Governance (50 Questions / 100 Marks)",
      "Master Paper 2: CS & Applications (Discrete Math, Computer Architecture, Data Structures, Algorithms, TOC, OS, DBMS, Networks, AI) (100 Questions / 200 Marks)",
      "Clarify jurisdictional scope: NET is NOT universally required for AICTE B.Tech faculty, but mandatory for UGC university CS/IT/MCA posts",
      "Target NET-JRF cutoff score to secure doctoral fellowship funding (Junior Research Fellowship)"
    ],
    keyRegulation: "NTA UGC-NET Computer Science Syllabus (Subject Code 87)"
  },
  {
    id: "step-6-academic-cv",
    stepNumber: 6,
    title: "Academic CV, Teaching Dossier & Research Statement Compilation",
    category: "Dossier Preparation",
    description: "Construct a comprehensive academic curriculum vitae distinct from corporate resumes, emphasizing scholarship, pedagogy, and service.",
    actionItems: [
      "Detail M.Tech dissertation title, research advisor, methodology, and experimental results",
      "Document complete publication record with titles, all co-authors, ISSN/ISBN, DOI links, and journal impact factor",
      "Include list of subjects competent to teach at undergraduate and diploma levels",
      "List verified Faculty Development Programs (FDPs), NPTEL Swayam certifications, and technical workshops attended"
    ],
    keyRegulation: "Standard University Academic Performance Indicator (API) / CAS Proforma Format"
  },
  {
    id: "step-7-faculty-applications",
    stepNumber: 7,
    title: "Faculty Applications, Screening & Selection Committee Interviews",
    category: "Job Applications & Selection",
    description: "Track authentic recruitment advertisements and systematically prepare for selection committee evaluations, written screenings, and demo lectures.",
    actionItems: [
      "Monitor official vacancies via UGC CU-Chayan, AICTE Portal, University employment portals, and National Career Service",
      "Submit complete verification portfolios (degree certificates, marksheets, caste/category certificates if applicable)",
      "Prepare for technical panel interviews covering core computer science fundamentals and thesis viva questions",
      "Deliver a compelling 15-minute mock micro-teaching session before a faculty assessment committee"
    ],
    keyRegulation: "Model Selection Committee Norms as prescribed by UGC Regulations 2018 & State Higher Education Acts"
  },
  {
    id: "step-8-phd-planning",
    stepNumber: 8,
    title: "Ph.D. Planning & Long-Term Career Advancement (CAS)",
    category: "Doctoral Research & CAS Promotion",
    description: "Plan doctoral enrollment (full-time or part-time for serving faculty) to enable long-term progression to Associate Professor and Professor.",
    actionItems: [
      "Formulate a detailed 10-page Ph.D. research proposal with literature review, problem statement, and proposed methodology",
      "Explore doctoral entrance pathways: GATE score, UGC-NET JRF, PMRF (Prime Minister's Research Fellowship), or university RET exams",
      "Understand Career Advancement Scheme (CAS): Level 10 (Entry Assistant Professor) → Level 11 → Level 12 → Level 13A (Associate Professor)",
      "Recognize that Ph.D. is mandatory under 7th CPC for promotion to Associate Professor and Professor ranks"
    ],
    keyRegulation: "UGC 7th CPC Career Advancement Scheme (CAS) Framework & AICTE Ph.D. Norms"
  }
];

const LOCAL_STORAGE_KEY = "invertis_academic_career_roadmap_v1";

export default function AcademicCareerRoadmap() {
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setCompletedSteps(JSON.parse(stored));
      }
    } catch {
      // LocalStorage access fallback (incognito/sandboxed)
    }
  }, []);

  const toggleStep = (stepId: string) => {
    setCompletedSteps((prev) => {
      const updated = { ...prev, [stepId]: !prev[stepId] };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Storage quota or sandboxed
      }
      return updated;
    });
  };

  const handleReset = () => {
    if (typeof window !== "undefined" && window.confirm("Reset all roadmap progress? You can mark steps again at any time.")) {
      setCompletedSteps({});
      try {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      } catch {
        // Fallback
      }
    }
  };

  const toggleAccordion = (index: number) => {
    setActiveAccordion((prev) => (prev === index ? null : index));
  };

  const completedCount = ROADMAP_STEPS.filter((s) => completedSteps[s.id]).length;
  const progressPercent = Math.round((completedCount / ROADMAP_STEPS.length) * 100);

  return (
    <div className="space-y-10">
      {/* Statutory Guidance & Regulatory Notice */}
      <div className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50/90 via-blue-50/80 to-purple-50/90 p-5 sm:p-6 shadow-xs">
        <div className="flex items-start space-x-3.5">
          <div className="p-2.5 rounded-xl bg-indigo-600 text-white shrink-0 mt-0.5">
            <Scale className="w-5 h-5" />
          </div>
          <div className="space-y-2 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200">
                Official Regulatory Grounding
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs font-semibold text-slate-700">AICTE Gazette 2019 & UGC Regulations 2018</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              Official Regulatory Standards for Engineering Faculty Appointments
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Pursuing a teaching career in higher technical education requires clarity regarding legal qualifications. Under the official <strong>AICTE Gazette Notification (F.No. 61-1/RIFD/7th CPC/2016-17, dated 1st March 2019)</strong>, the minimum qualification for direct recruitment as an <em>Assistant Professor</em> in Engineering & Technology disciplines is a <strong>B.E. / B.Tech and M.E. / M.Tech in the relevant branch with First Class or equivalent in either degree</strong>.
            </p>
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="flex items-start space-x-2 bg-white/80 p-2.5 rounded-lg border border-indigo-100">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>No Universal NET Mandate for Engineering:</strong> National Testing Agency (NTA) does not administer UGC-NET for B.Tech engineering branches. M.Tech First Class qualifies candidates for AICTE engineering institutions.</span>
              </div>
              <div className="flex items-start space-x-2 bg-white/80 p-2.5 rounded-lg border border-indigo-100">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>No Automatic Appointment Guarantee:</strong> M.Tech qualification establishes statutory eligibility, but does not guarantee recruitment. Appointments depend on advertised vacancies and selection committee screening.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Academic Career Roadmap Tracker */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
                <Compass className="w-4 h-4" />
              </span>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900">
                Interactive Academic Career Roadmap
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              Track your step-by-step milestones toward becoming a university faculty member or academic researcher.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <div className="text-right">
              <span className="text-xs font-semibold text-slate-500 block">Overall Progress</span>
              <span className="font-mono text-base sm:text-lg font-bold text-indigo-700">
                {mounted ? `${progressPercent}%` : "0%"}
              </span>
            </div>
            {mounted && completedCount > 0 && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center space-x-1 px-2.5 py-1.5 text-xs text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition"
                title="Reset progress"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700">
              {mounted ? `${completedCount} of ${ROADMAP_STEPS.length} Milestones Achieved` : `0 of ${ROADMAP_STEPS.length} Milestones Achieved`}
            </span>
            <span className="text-slate-500 font-mono">
              Auto-saved locally • Zero login required
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200">
            <div
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${mounted ? progressPercent : 0}%` }}
              role="progressbar"
              aria-valuenow={mounted ? progressPercent : 0}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        {/* Milestone Steps Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {ROADMAP_STEPS.map((step) => {
            const isCompleted = mounted && !!completedSteps[step.id];

            return (
              <div
                key={step.id}
                onClick={() => toggleStep(step.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleStep(step.id);
                  }
                }}
                tabIndex={0}
                role="checkbox"
                aria-checked={isCompleted}
                className={`cursor-pointer rounded-xl border p-4 sm:p-5 transition flex flex-col justify-between space-y-3 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 select-none ${
                  isCompleted
                    ? "bg-indigo-50/60 border-indigo-300 shadow-2xs"
                    : "bg-white hover:bg-slate-50/80 border-slate-200"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center space-x-2.5">
                      <div className="text-indigo-600 shrink-0">
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-indigo-600 fill-indigo-100" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-300" />
                        )}
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        Milestone 0{step.stepNumber}
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {step.category}
                    </span>
                  </div>

                  <h4
                    className={`text-sm sm:text-base font-bold transition ${
                      isCompleted ? "text-indigo-950 line-through decoration-indigo-400" : "text-slate-900"
                    }`}
                  >
                    {step.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Sub-Action Checklist */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-700 block">Deliverables & Action Items:</span>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {step.actionItems.map((item, idx) => (
                      <li key={`${step.id}-action-${idx}`} className="flex items-start space-x-2">
                        <span className="text-indigo-500 font-bold shrink-0">•</span>
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                  {step.keyRegulation && (
                    <div className="mt-2 pt-2 border-t border-dashed border-slate-200 text-[10px] text-slate-500 font-medium">
                      <span className="text-indigo-700 font-semibold">Statutory Standard: </span>
                      {step.keyRegulation}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ten In-Depth Academic Career Sections (Interactive Deep Dive) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
              Comprehensive Academic Guide & Regulatory Reference
            </h3>
            <p className="text-xs text-slate-500">
              Detailed statutory breakdowns, examination syllabi, and recruitment interview strategies.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-400 hidden sm:inline">10 Deep-Dive Modules</span>
        </div>

        {/* Accordion / Tabbed Container */}
        <div className="space-y-3">
          {/* Module 1: Overview */}
          <div className="border border-slate-200 rounded-xl bg-white overflow-hidden transition">
            <button
              type="button"
              onClick={() => toggleAccordion(1)}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-slate-50 transition"
              aria-expanded={activeAccordion === 1}
            >
              <div className="flex items-center space-x-3 min-w-0">
                <span className="p-2 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono text-xs font-bold">
                  01
                </span>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    Overview of Becoming an Assistant Professor After M.Tech
                  </h4>
                  <p className="text-xs text-slate-500 truncate">
                    Academic roles, classroom teaching, lab instruction, and institutional responsibilities.
                  </p>
                </div>
              </div>
              {activeAccordion === 1 ? (
                <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
              )}
            </button>
            {activeAccordion === 1 && (
              <div className="p-4 sm:p-6 bg-slate-50/50 border-t border-slate-100 text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
                <p>
                  Transitioning from postgraduate engineering studies into academia represents a structured career in higher education. As an entry-level <strong>Assistant Professor</strong> (Academic Level 10), faculty members undertake a balanced portfolio spanning three primary pillars:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                  <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1.5">
                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wide text-indigo-700">1. Teaching & Pedagogy</span>
                    <p className="text-xs text-slate-600">Delivering 16 hours of weekly lectures and practical lab sessions for B.Tech/Diploma classes, designing outcome-aligned exams, and evaluating semester papers.</p>
                  </div>
                  <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1.5">
                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wide text-indigo-700">2. Research & Scholarly Output</span>
                    <p className="text-xs text-slate-600">Guiding undergraduate final-year capstone projects, preparing grant applications (DST/SERB/AICTE RPS), and drafting research manuscripts for peer-reviewed indexed journals.</p>
                  </div>
                  <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1.5">
                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wide text-indigo-700">3. Institutional Service</span>
                    <p className="text-xs text-slate-600">Contributing to department accreditation portfolios (NBA Criteria 1–10, NAAC Criteria 1–7), student mentorship, examination cell duties, and curriculum revision panels.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Module 2: AICTE & UGC Eligibility Rules */}
          <div className="border border-slate-200 rounded-xl bg-white overflow-hidden transition">
            <button
              type="button"
              onClick={() => toggleAccordion(2)}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-slate-50 transition"
              aria-expanded={activeAccordion === 2}
            >
              <div className="flex items-center space-x-3 min-w-0">
                <span className="p-2 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono text-xs font-bold">
                  02
                </span>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    Engineering Faculty Eligibility Under AICTE & UGC Statutory Rules
                  </h4>
                  <p className="text-xs text-slate-500 truncate">
                    AICTE Gazette Notification 2019 criteria, First Class mandate, and equivalence norms.
                  </p>
                </div>
              </div>
              {activeAccordion === 2 ? (
                <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
              )}
            </button>
            {activeAccordion === 2 && (
              <div className="p-4 sm:p-6 bg-slate-50/50 border-t border-slate-100 text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
                <p>
                  Eligibility for technical teacher recruitment in India is strictly governed by statutory gazette notifications. The operative standard is the <strong>AICTE Regulations on Pay Scales, Service Conditions and Minimum Qualifications for the Appointment of Teachers and Other Academic Staff in Technical Institutions, 2019 (Gazette Notification dated 1st March 2019)</strong>:
                </p>
                <div className="bg-indigo-50/50 p-3.5 rounded-lg border border-indigo-100 space-y-2">
                  <span className="font-bold text-indigo-900 text-xs">Statutory Clause 5.1 — Assistant Professor (Engineering & Technology):</span>
                  <blockquote className="italic text-xs text-slate-700 border-l-2 border-indigo-500 pl-3">
                    &quot;B.E. / B.Tech. / B.S. and M.E. / M.Tech. / M.S. or Integrated M.Tech. in relevant branch with First Class or equivalent in any one of the degrees.&quot;
                  </blockquote>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                  <li><strong>First Class Definition:</strong> If a class/division is not awarded by the university, minimum 60% marks in aggregate or equivalent CGPA of 6.75 on a 10-point scale is required.</li>
                  <li><strong>Relevant Branch:</strong> The qualifying degrees must be in an allied and relevant branch of Engineering (e.g., B.Tech CSE / IT with M.Tech in CSE, Software Engineering, or Information Security).</li>
                  <li><strong>Statutory Caveat:</strong> Having the minimum qualification does not confer any legal right to appointment. Selection is governed by institutional recruitment guidelines, written screening examinations, and statutory selection committees.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Module 3: Engineering vs UGC-NET Recruitment */}
          <div className="border border-slate-200 rounded-xl bg-white overflow-hidden transition">
            <button
              type="button"
              onClick={() => toggleAccordion(3)}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-slate-50 transition"
              aria-expanded={activeAccordion === 3}
            >
              <div className="flex items-center space-x-3 min-w-0">
                <span className="p-2 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono text-xs font-bold">
                  03
                </span>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    Differences: Engineering Faculty (AICTE) vs. UGC-NET Recruitment
                  </h4>
                  <p className="text-xs text-slate-500 truncate">
                    Why engineering candidates do not have UGC-NET, and when UGC-NET is required.
                  </p>
                </div>
              </div>
              {activeAccordion === 3 ? (
                <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
              )}
            </button>
            {activeAccordion === 3 && (
              <div className="p-4 sm:p-6 bg-slate-50/50 border-t border-slate-100 text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
                <p>
                  A common misconception among postgraduate engineering students is whether they must clear UGC-NET. The table below delineates the statutory jurisdictional divide:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden bg-white">
                    <thead className="bg-slate-100 text-slate-800 font-bold">
                      <tr>
                        <th className="p-2.5 border-b border-slate-200">Parameter</th>
                        <th className="p-2.5 border-b border-slate-200">AICTE Engineering Institutes (B.Tech / M.Tech)</th>
                        <th className="p-2.5 border-b border-slate-200">UGC University Departments (BCA / MCA / B.Sc / M.Sc)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      <tr>
                        <td className="p-2.5 font-semibold text-slate-900">Governing Body</td>
                        <td className="p-2.5">All India Council for Technical Education (AICTE)</td>
                        <td className="p-2.5">University Grants Commission (UGC)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-semibold text-slate-900">Entry Qualification</td>
                        <td className="p-2.5 text-emerald-700 font-semibold">B.Tech + M.Tech First Class in relevant engineering branch</td>
                        <td className="p-2.5 text-blue-700 font-semibold">Master&apos;s degree (55% marks) + UGC-NET or Ph.D.</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-semibold text-slate-900">UGC-NET Requirement</td>
                        <td className="p-2.5 text-slate-700"><strong>Not required.</strong> UGC-NET is not conducted for engineering branches.</td>
                        <td className="p-2.5 text-slate-700"><strong>Mandatory</strong> (Subject Code 87), unless exempt via Ph.D. under UGC 2009/2016.</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-semibold text-slate-900">Doctorate Mandate</td>
                        <td className="p-2.5">Not mandatory at entry level; mandatory for Associate Professor (CAS).</td>
                        <td className="p-2.5">NET or Ph.D. mandatory at entry level; Ph.D. mandatory for CAS promotion.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Module 4: UGC-NET Preparation */}
          <div className="border border-slate-200 rounded-xl bg-white overflow-hidden transition">
            <button
              type="button"
              onClick={() => toggleAccordion(4)}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-slate-50 transition"
              aria-expanded={activeAccordion === 4}
            >
              <div className="flex items-center space-x-3 min-w-0">
                <span className="p-2 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono text-xs font-bold">
                  04
                </span>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    UGC-NET Preparation (Subject Code 87: Computer Science & Applications)
                  </h4>
                  <p className="text-xs text-slate-500 truncate">
                    Paper 1 teaching aptitude, Paper 2 syllabus units, scoring patterns, and JRF cutoff strategy.
                  </p>
                </div>
              </div>
              {activeAccordion === 4 ? (
                <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
              )}
            </button>
            {activeAccordion === 4 && (
              <div className="p-4 sm:p-6 bg-slate-50/50 border-t border-slate-100 text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
                <p>
                  While engineering colleges do not mandate NET, qualifying <strong>UGC-NET Computer Science and Applications (Subject Code 87)</strong> unlocks faculty eligibility in University Computer Science/IT/MCA departments and offers financial independence via the <strong>Junior Research Fellowship (JRF)</strong> (~₹37,000/month + HRA for Ph.D. research).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 text-xs block text-indigo-700">Paper 1: General Paper (50 Questions / 100 Marks)</span>
                    <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                      <li>Teaching Aptitude (Pedagogy, Evaluation systems, MOOCs)</li>
                      <li>Research Aptitude (Positivism, Thesis writing, Ethics)</li>
                      <li>Data Interpretation, Mathematical Reasoning, Reading Comprehension</li>
                      <li>Information & Communication Technology (ICT) in Education</li>
                      <li>People, Development and Environment, Higher Education System</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 text-xs block text-indigo-700">Paper 2: CS & Applications (100 Questions / 200 Marks)</span>
                    <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                      <li>Unit 1: Discrete Structures & Optimization</li>
                      <li>Unit 2: Computer System Architecture & Microprocessors</li>
                      <li>Unit 3: Programming Languages & Computer Graphics</li>
                      <li>Unit 4: Database Management Systems & Data Warehousing</li>
                      <li>Unit 5: System Software and Operating Systems</li>
                      <li>Unit 6: Software Engineering & Agile Methodologies</li>
                      <li>Unit 7: Data Structures and Algorithms Analysis</li>
                      <li>Unit 8: Theory of Computation and Compilers</li>
                      <li>Unit 9: Data Communication and Computer Networks</li>
                      <li>Unit 10: Artificial Intelligence & Knowledge Representation</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Module 5: Ph.D. Admission & Fellowships */}
          <div className="border border-slate-200 rounded-xl bg-white overflow-hidden transition">
            <button
              type="button"
              onClick={() => toggleAccordion(5)}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-slate-50 transition"
              aria-expanded={activeAccordion === 5}
            >
              <div className="flex items-center space-x-3 min-w-0">
                <span className="p-2 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono text-xs font-bold">
                  05
                </span>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    Ph.D. Admission & Research Fellowship Opportunities
                  </h4>
                  <p className="text-xs text-slate-500 truncate">
                    GATE doctoral pathways, UGC-NET JRF, PMRF fellowship, and Part-Time Ph.D. options.
                  </p>
                </div>
              </div>
              {activeAccordion === 5 ? (
                <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
              )}
            </button>
            {activeAccordion === 5 && (
              <div className="p-4 sm:p-6 bg-slate-50/50 border-t border-slate-100 text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
                <p>
                  Although entry as an Assistant Professor in technical institutes does not strictly require a doctorate, earning a Ph.D. is indispensable for career longevity, funded research projects, and CAS promotion to Associate Professor. Multiple pathways exist:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <span className="font-bold text-xs text-indigo-700 block">PMRF Scheme</span>
                    <p className="text-[11px] text-slate-600 mt-1">Prime Minister&apos;s Research Fellowship provides up to ₹70,000–₹80,000/month fellowship with ₹2 Lakh annual contingency for top researchers in IITs, IISc, NITs, and select universities.</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <span className="font-bold text-xs text-indigo-700 block">Institute Teaching Assistantship (GATE)</span>
                    <p className="text-[11px] text-slate-600 mt-1">Candidates with valid GATE score or M.Tech qualification admitted to IITs, NITs, and IIITs receive MoE HTRA fellowship (~₹37,000/month for first 2 years, ₹42,000/month thereafter).</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <span className="font-bold text-xs text-indigo-700 block">Part-Time Ph.D. for Faculty</span>
                    <p className="text-[11px] text-slate-600 mt-1">Working Assistant Professors can pursue a sponsored/external Part-Time Ph.D. at recognized universities while continuing teaching duties with institutional NOC.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Module 6: Teaching Skills & Demo Lecture */}
          <div className="border border-slate-200 rounded-xl bg-white overflow-hidden transition">
            <button
              type="button"
              onClick={() => toggleAccordion(6)}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-slate-50 transition"
              aria-expanded={activeAccordion === 6}
            >
              <div className="flex items-center space-x-3 min-w-0">
                <span className="p-2 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono text-xs font-bold">
                  06
                </span>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    Teaching Skills, Pedagogy & Demonstration Lecture Preparation
                  </h4>
                  <p className="text-xs text-slate-500 truncate">
                    Outcome-Based Education (OBE), Bloom&apos;s Taxonomy, and 15-minute micro-teaching demo tips.
                  </p>
                </div>
              </div>
              {activeAccordion === 6 ? (
                <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
              )}
            </button>
            {activeAccordion === 6 && (
              <div className="p-4 sm:p-6 bg-slate-50/50 border-t border-slate-100 text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
                <p>
                  Every university recruitment process includes a 15–20 minute pedagogical demonstration lecture in front of a departmental expert committee. Success depends heavily on structured execution:
                </p>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <strong className="text-slate-900">1. Bloom&apos;s Taxonomy Alignment:</strong> Clearly state learning objectives using action verbs (e.g., &quot;Analyze&quot; cache replacement strategies rather than just &quot;Know&quot; them).
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <strong className="text-slate-900">2. Whiteboard Discipline:</strong> Divide the board into three zones: Agenda & terms on the left, primary derivation/diagram in the center, and summary/takeaway on the right. Maintain neat handwriting and legible font sizing.
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <strong className="text-slate-900">3. Interactive Questioning:</strong> Don&apos;t deliver a monologue. Pose a conceptual checkpoint question at minute 7 to demonstrate classroom student-engagement ability.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Module 7: Research Methodology, Publications & Ethics */}
          <div className="border border-slate-200 rounded-xl bg-white overflow-hidden transition">
            <button
              type="button"
              onClick={() => toggleAccordion(7)}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-slate-50 transition"
              aria-expanded={activeAccordion === 7}
            >
              <div className="flex items-center space-x-3 min-w-0">
                <span className="p-2 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono text-xs font-bold">
                  07
                </span>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    Research Methodology, Peer-Reviewed Publications & Academic Ethics
                  </h4>
                  <p className="text-xs text-slate-500 truncate">
                    SCI/Scopus/UGC-CARE list, UGC Plagiarism Regulations 2018, and avoiding predatory journals.
                  </p>
                </div>
              </div>
              {activeAccordion === 7 ? (
                <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
              )}
            </button>
            {activeAccordion === 7 && (
              <div className="p-4 sm:p-6 bg-slate-50/50 border-t border-slate-100 text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
                <p>
                  Recruitment scrutiny has escalated dramatically regarding publication credentials. Selection committees verify every article submitted for API scoring:
                </p>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="p-3 bg-white rounded-lg border border-slate-200">
                    <span className="font-bold text-emerald-800 block text-xs">Authentic Indexing Standards</span>
                    <p className="mt-1">Only publish in journals indexed in <strong>Web of Science (SCI/SCIE/ESCI)</strong>, <strong>Scopus</strong>, or the official <strong>UGC-CARE List (Group I & II)</strong>. Avoid predatory journals promising publication in 48 hours for a fee—these are blacklisted by selection panels.</p>
                  </div>
                  <div className="p-3 bg-amber-50/80 rounded-lg border border-amber-200 text-amber-900">
                    <span className="font-bold block text-xs">UGC Plagiarism Regulations 2018 Limits:</span>
                    <ul className="mt-1 list-disc list-inside space-y-0.5 text-[11px]">
                      <li><strong>Level 0 (Similarities up to 10%):</strong> Permissible (Minor similarity, exclude quotes, bibliography, generic equations).</li>
                      <li><strong>Level 1 (Similarities 10% to 40%):</strong> Candidate asked to withdraw manuscript; no penalty if revised.</li>
                      <li><strong>Level 2 (Similarities 40% to 60%):</strong> Severe penalty (candidate debarred from publishing/submitting for 1 year).</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Module 8: Academic CV & Interview Prep */}
          <div className="border border-slate-200 rounded-xl bg-white overflow-hidden transition">
            <button
              type="button"
              onClick={() => toggleAccordion(8)}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-slate-50 transition"
              aria-expanded={activeAccordion === 8}
            >
              <div className="flex items-center space-x-3 min-w-0">
                <span className="p-2 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono text-xs font-bold">
                  08
                </span>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    Academic CV, Teaching Dossier & Selection Committee Interviews
                  </h4>
                  <p className="text-xs text-slate-500 truncate">
                    Academic CV anatomy, API calculations, and typical interview panel technical questions.
                  </p>
                </div>
              </div>
              {activeAccordion === 8 ? (
                <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
              )}
            </button>
            {activeAccordion === 8 && (
              <div className="p-4 sm:p-6 bg-slate-50/50 border-t border-slate-100 text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
                <p>
                  Unlike a standard one-page corporate software resume, an <strong>Academic Curriculum Vitae</strong> is an exhaustive record of scholarly attainment (typically 3–5 pages):
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600">
                  <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block text-indigo-700">Essential Sections of an Academic CV</span>
                    <ul className="list-disc list-inside space-y-0.5">
                      <li>Complete Educational Qualifications with Board/University, CGPA/% and Division</li>
                      <li>M.Tech Dissertation Title, Thesis Abstract & Advisor Name</li>
                      <li>Complete Chronological Publications with DOI, ISSN, Journal Category</li>
                      <li>Subjects Competent to Teach (Undergraduate & Postgraduate)</li>
                      <li>Workshops, FDPs & NPTEL/AICTE Certifications Attended</li>
                      <li>Academic Honors, GATE Score & Memberships (IEEE, ACM, CSI)</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block text-indigo-700">Interview Viva Preparation</span>
                    <ul className="list-disc list-inside space-y-0.5">
                      <li>Deep mastery of basic undergraduate core subjects (OS, DBMS, Data Structures, Networks)</li>
                      <li>Ability to explain your M.Tech research contribution in non-technical terms</li>
                      <li>Understanding of modern teaching tools (Virtual Labs, LMS platforms, Canvas/Moodle)</li>
                      <li>Clear answers regarding long-term research plans and Ph.D. roadmap</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Module 9: Recruitment Portals & Links */}
          <div className="border border-slate-200 rounded-xl bg-white overflow-hidden transition">
            <button
              type="button"
              onClick={() => toggleAccordion(9)}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-slate-50 transition"
              aria-expanded={activeAccordion === 9}
            >
              <div className="flex items-center space-x-3 min-w-0">
                <span className="p-2 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono text-xs font-bold">
                  09
                </span>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    Faculty Recruitment Portals & Official Government Links
                  </h4>
                  <p className="text-xs text-slate-500 truncate">
                    Verified recruitment portals: UGC CU-Chayan, AICTE, NPTEL, and INFLIBNET resources.
                  </p>
                </div>
              </div>
              {activeAccordion === 9 ? (
                <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
              )}
            </button>
            {activeAccordion === 9 && (
              <div className="p-4 sm:p-6 bg-slate-50/50 border-t border-slate-100 text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
                <p>
                  Always track vacancies via verified statutory government platforms and individual official university employment portals:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                  <a
                    href="https://cuchayan.samarth.ac.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white border border-slate-200 hover:border-indigo-400 rounded-lg transition hover:shadow-2xs block space-y-1 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 group-hover:text-indigo-600 transition text-xs">UGC CU-Chayan Portal</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition" />
                    </div>
                    <p className="text-[11px] text-slate-500">Unified recruitment portal for faculty appointments across all Central Universities in India.</p>
                  </a>

                  <a
                    href="https://www.aicte-india.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white border border-slate-200 hover:border-indigo-400 rounded-lg transition hover:shadow-2xs block space-y-1 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 group-hover:text-indigo-600 transition text-xs">AICTE Official Portal</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition" />
                    </div>
                    <p className="text-[11px] text-slate-500">Official technical education guidelines, 7th CPC regulations, and faculty qualification gazettes.</p>
                  </a>

                  <a
                    href="https://swayam.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white border border-slate-200 hover:border-indigo-400 rounded-lg transition hover:shadow-2xs block space-y-1 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 group-hover:text-indigo-600 transition text-xs">SWAYAM / NPTEL Portal</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition" />
                    </div>
                    <p className="text-[11px] text-slate-500">Government online learning platform offering AICTE-approved Faculty Development Programs (FDPs).</p>
                  </a>

                  <a
                    href="https://shodhganga.inflibnet.ac.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white border border-slate-200 hover:border-indigo-400 rounded-lg transition hover:shadow-2xs block space-y-1 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 group-hover:text-indigo-600 transition text-xs">INFLIBNET Shodhganga</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition" />
                    </div>
                    <p className="text-[11px] text-slate-500">National reservoir of Indian Ph.D. theses for conducting comprehensive literature surveys.</p>
                  </a>

                  <a
                    href="https://ugccare.unipune.ac.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white border border-slate-200 hover:border-indigo-400 rounded-lg transition hover:shadow-2xs block space-y-1 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 group-hover:text-indigo-600 transition text-xs">UGC-CARE Reference List</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition" />
                    </div>
                    <p className="text-[11px] text-slate-500">Consortium for Academic and Research Ethics (CARE) verified journal indexing list.</p>
                  </a>

                  <a
                    href="https://anrfonline.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white border border-slate-200 hover:border-indigo-400 rounded-lg transition hover:shadow-2xs block space-y-1 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 group-hover:text-indigo-600 transition text-xs">ANRF (Formerly SERB)</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition" />
                    </div>
                    <p className="text-[11px] text-slate-500">Anusandhan National Research Foundation portal for extramural engineering research grants.</p>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Module 10: Long-Term Academic Progression */}
          <div className="border border-slate-200 rounded-xl bg-white overflow-hidden transition">
            <button
              type="button"
              onClick={() => toggleAccordion(10)}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-slate-50 transition"
              aria-expanded={activeAccordion === 10}
            >
              <div className="flex items-center space-x-3 min-w-0">
                <span className="p-2 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono text-xs font-bold">
                  10
                </span>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    Long-Term Academic Career Progression (7th CPC CAS Hierarchy)
                  </h4>
                  <p className="text-xs text-slate-500 truncate">
                    Academic Levels 10 through 14, promotion timelines, and doctoral prerequisites.
                  </p>
                </div>
              </div>
              {activeAccordion === 10 ? (
                <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
              )}
            </button>
            {activeAccordion === 10 && (
              <div className="p-4 sm:p-6 bg-slate-50/50 border-t border-slate-100 text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
                <p>
                  Career advancement in university systems is structured under the <strong>Career Advancement Scheme (CAS)</strong> aligned with 7th Central Pay Commission recommendations:
                </p>
                <div className="space-y-2.5">
                  <div className="p-3 bg-white rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-slate-900 block text-xs">Assistant Professor (Academic Level 10)</span>
                      <span className="text-[11px] text-slate-500">Entry grade after M.Tech First Class • AGP 6000 / Cell 1 ₹57,700 base pay</span>
                    </div>
                    <span className="text-xs font-mono font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 shrink-0">
                      Entry Grade (0–4/5 Years)
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-slate-900 block text-xs">Assistant Professor (Senior Scale - Academic Level 11)</span>
                      <span className="text-[11px] text-slate-500">Requires 4 years with Ph.D. OR 5 years with M.Tech + 1 FDP/Refresher Course + satisfactory performance</span>
                    </div>
                    <span className="text-xs font-mono font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 shrink-0">
                      CAS Step 1 (AGP 7000)
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-slate-900 block text-xs">Assistant Professor (Selection Grade - Academic Level 12)</span>
                      <span className="text-[11px] text-slate-500">Requires 5 years at Level 11 + published research papers + Faculty Development certification</span>
                    </div>
                    <span className="text-xs font-mono font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 shrink-0">
                      CAS Step 2 (AGP 8000)
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-slate-900 block text-xs">Associate Professor (Academic Level 13A)</span>
                      <span className="text-[11px] text-slate-500">Ph.D. mandatory + 8 years total teaching/research experience + minimum 7 publications in peer-reviewed/UGC-CARE journals</span>
                    </div>
                    <span className="text-xs font-mono font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 shrink-0">
                      Ph.D. Mandatory (AGP 9000)
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-slate-900 block text-xs">Professor / Senior Professor (Academic Level 14 / 15)</span>
                      <span className="text-[11px] text-slate-500">Ph.D. mandatory + 10 years experience + minimum 10 publications + doctoral research guidance</span>
                    </div>
                    <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                      Doctoral Guide (AGP 10000)
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

