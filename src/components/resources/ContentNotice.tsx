import React from "react";
import { AlertCircle } from "lucide-react";

interface ContentNoticeProps {
  compact?: boolean;
  className?: string;
}

export function ContentNotice({ compact = false, className = "" }: ContentNoticeProps) {
  return (
    <aside
      className={`bg-amber-50/90 border border-amber-200 text-amber-950 rounded-xl ${
        compact ? "p-3 text-xs" : "p-3.5 sm:p-4 text-xs sm:text-sm"
      } flex items-start gap-3 shadow-2xs leading-relaxed ${className}`}
      aria-label="Academic resource provenance notice"
    >
      <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 shrink-0 mt-0.5" />
      <div className="space-y-1">
        <div className="font-semibold text-amber-900 text-xs sm:text-sm flex items-center gap-1.5">
          <span>Academic Resource Provenance Notice</span>
        </div>
        <p className="text-amber-900/90 text-xs sm:text-[13px] leading-relaxed">
          Educational materials provided here include archived university examination papers, faculty lecture notes, and practical laboratory guides. Document titles, filenames, or institutional headings do not imply direct university sponsorship or accreditation. Students must verify syllabus schemes, unit weightages, and examination policies directly with their respective academic department and the official Invertis ERP.
        </p>
      </div>
    </aside>
  );
}
