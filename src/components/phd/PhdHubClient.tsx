"use client";

import React, { useState } from "react";
import { 
  GraduationCap, 
  BookOpen, 
  Wrench, 
  Compass, 
  FileText, 
  Award, 
  CheckSquare, 
  Code2, 
  Briefcase 
} from "lucide-react";

import { PhdHubHeader } from "@/components/phd/PhdHubHeader";
import { PhdOverviewSection } from "@/components/phd/PhdOverviewSection";
import { PhdCourseworkSyllabus } from "@/components/phd/PhdCourseworkSyllabus";
import { PhdToolsDirectory } from "@/components/phd/PhdToolsDirectory";
import { PhdTopicExplorer } from "@/components/phd/PhdTopicExplorer";
import { PhdPublicationGuide } from "@/components/phd/PhdPublicationGuide";
import { PhdThesisVivaGuide } from "@/components/phd/PhdThesisVivaGuide";
import { PhdProgressTracker } from "@/components/phd/PhdProgressTracker";
import { PhdTutorialsSection } from "@/components/phd/PhdTutorialsSection";
import { PhdCareerGuidance } from "@/components/phd/PhdCareerGuidance";

export type PhdTabId = 
  | "overview"
  | "coursework"
  | "tools"
  | "topics"
  | "publication"
  | "thesis-viva"
  | "tracker"
  | "tutorials"
  | "career";

interface TabItem {
  id: PhdTabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  shortLabel: string;
}

const TABS: TabItem[] = [
  { id: "overview", label: "Program Overview & Milestones", icon: GraduationCap, shortLabel: "Overview" },
  { id: "coursework", label: "Coursework Syllabus (12 Credits)", icon: BookOpen, shortLabel: "Syllabus" },
  { id: "tools", label: "Ph.D. Research Toolkit", icon: Wrench, shortLabel: "Tools" },
  { id: "topics", label: "Research Topic Explorer", icon: Compass, shortLabel: "Topics" },
  { id: "publication", label: "Paper Writing & Publication", icon: FileText, shortLabel: "Publication" },
  { id: "thesis-viva", label: "Thesis & Viva Voce (25 Qs)", icon: Award, shortLabel: "Viva Prep" },
  { id: "tracker", label: "Interactive Progress Tracker", icon: CheckSquare, shortLabel: "Tracker" },
  { id: "tutorials", label: "Research Tools Tutorials", icon: Code2, shortLabel: "Tutorials" },
  { id: "career", label: "Faculty & Postdoc Careers", icon: Briefcase, shortLabel: "Career" }
];

export function PhdHubClient({ initialTab = "overview" }: { initialTab?: PhdTabId }) {
  const [activeTab, setActiveTab] = useState<PhdTabId>(initialTab);

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <PhdHubHeader />

      {/* Main Tab Bar Container */}
      <div className="sticky top-16 z-30 bg-slate-50/95 backdrop-blur-md py-2.5 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-y border-slate-200/80 shadow-2xs">
        {/* Desktop / Tablet Scrollable Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  // Optional hash update without reload
                  if (typeof window !== "undefined") {
                    window.history.replaceState(null, "", `#${tab.id}`);
                  }
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-brand-navy text-white shadow-sm ring-1 ring-brand-navy/20"
                    : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/90"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-amber-400" : "text-slate-500"}`} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panels */}
      <div className="transition-opacity duration-200">
        {activeTab === "overview" && <PhdOverviewSection />}
        {activeTab === "coursework" && <PhdCourseworkSyllabus />}
        {activeTab === "tools" && <PhdToolsDirectory />}
        {activeTab === "topics" && <PhdTopicExplorer />}
        {activeTab === "publication" && <PhdPublicationGuide />}
        {activeTab === "thesis-viva" && <PhdThesisVivaGuide />}
        {activeTab === "tracker" && <PhdProgressTracker />}
        {activeTab === "tutorials" && <PhdTutorialsSection />}
        {activeTab === "career" && <PhdCareerGuidance />}
      </div>
    </div>
  );
}

