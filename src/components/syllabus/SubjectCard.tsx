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
    : "bg-blue-50 text-blue-700 border-blue-200";

  return (
    <div className="card-standard hover:border-blue-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between group overflow-hidden bg-white">
      <div className="p-4 sm:p-6">
        {/* Top Meta: Code & Type Badges */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className="font-mono text-xs font-bold px-2.5 py-1 bg-slate-900 text-white rounded-md tracking-wider">
            {subject.code}
          </span>
          <div className="flex flex-wrap gap-1.5 justify-end">
            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${categoryColor}`}>
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
        <h3 className="font-heading font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2 text-base leading-snug mb-3">
          {subject.name}
        </h3>

        {/* Academic Details Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
          <div className="flex items-center space-x-1.5">
            <Award className="h-3.5 w-3.5 text-blue-600 flex-shrink-0" />
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
      <div className="px-5 sm:px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between group-hover:bg-blue-50/50 transition">
        <span className="text-xs font-bold text-blue-600 group-hover:text-blue-800 flex items-center">
          <FileCheck className="h-3.5 w-3.5 mr-1.5" />
          View Syllabus & PDF
        </span>
        <Link
          href={`/syllabus/${encodeURIComponent(programmeCode)}/semester/${semesterNumber}/${encodeURIComponent(subject.code)}`}
          className="inline-flex items-center text-xs font-bold text-blue-600 group-hover:text-blue-800 group-hover:translate-x-0.5 transition-transform"
        >
          Explore
          <ArrowRight className="h-3.5 w-3.5 ml-1" />
        </Link>
      </div>
    </div>
  );
}

