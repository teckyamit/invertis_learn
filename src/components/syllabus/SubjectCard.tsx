import React from "react";
import Link from "next/link";
import { BookOpen, Award, Clock, ArrowRight, FileCheck, Layers } from "lucide-react";

interface SubjectCardProps {
  programmeCode: string;
  semesterNumber: number;
  subject: {
    id: string;
    code: string;
    name: string;
    credits: number;
    subjectType: string;
    lectureHours: number;
    tutorialHours: number;
    practicalHours: number;
    electiveGroup: string | null;
    evaluationMarks: string | null;
  };
}

export function SubjectCard({ programmeCode, semesterNumber, subject }: SubjectCardProps) {
  const isPractical = subject.subjectType === "PRACTICAL";
  const isElective = !!subject.electiveGroup;

  const categoryColor = isPractical
    ? "bg-purple-50 text-purple-700 border-purple-200"
    : isElective
    ? "bg-amber-50 text-amber-700 border-amber-200"
    : "bg-emerald-50 text-emerald-700 border-emerald-200";

  return (
    <div className="bg-white rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between group overflow-hidden">
      <div className="p-5">
        {/* Top Meta: Code & Type Badges */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className="font-mono text-xs font-bold px-2.5 py-1 bg-slate-900 text-white rounded-md tracking-wider">
            {subject.code}
          </span>
          <div className="flex flex-wrap gap-1.5 justify-end">
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${categoryColor}`}>
              {subject.subjectType}
            </span>
            {subject.electiveGroup && (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {subject.electiveGroup}
              </span>
            )}
          </div>
        </div>

        {/* Subject Title */}
        <h3 className="font-bold text-slate-900 group-hover:text-emerald-800 transition line-clamp-2 text-base leading-snug mb-3">
          {subject.name}
        </h3>

        {/* Academic Details Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
          <div className="flex items-center space-x-1.5">
            <Award className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
            <span>
              Credits: <strong className="text-slate-900 font-semibold">{subject.credits}</strong>
            </span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Clock className="h-3.5 w-3.5 text-slate-500 flex-shrink-0" />
            <span>
              L-T-P: <strong className="text-slate-900 font-semibold">{subject.lectureHours}-{subject.tutorialHours}-{subject.practicalHours}</strong>
            </span>
          </div>
        </div>

        {/* Evaluation scheme preview if available */}
        {subject.evaluationMarks && (
          <div className="mt-2.5 flex items-center space-x-1.5 text-[11px] text-slate-500">
            <Layers className="h-3 w-3 text-slate-400 flex-shrink-0" />
            <span className="truncate">{subject.evaluationMarks}</span>
          </div>
        )}
      </div>

      {/* Card Action Link */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between group-hover:bg-emerald-50/50 transition">
        <span className="text-xs font-semibold text-emerald-700 group-hover:text-emerald-800 flex items-center">
          <FileCheck className="h-3.5 w-3.5 mr-1" />
          View Syllabus & PDF
        </span>
        <Link
          href={`/syllabus/${encodeURIComponent(programmeCode)}/semester/${semesterNumber}/${encodeURIComponent(subject.code)}`}
          className="inline-flex items-center text-xs font-semibold text-emerald-700 group-hover:text-emerald-800 group-hover:translate-x-0.5 transition-transform"
        >
          Explore
          <ArrowRight className="h-3.5 w-3.5 ml-1" />
        </Link>
      </div>
    </div>
  );
}
