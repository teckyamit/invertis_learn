"use client";

import React, { useState } from "react";
import {
  ExternalLink,
  Globe,
  BookOpen,
  FileCode,
  Laptop,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  Filter
} from "lucide-react";

export interface ExternalResourceItem {
  id: string;
  title: string;
  platform: string;
  url: string;
  description: string;
  category: string;
  unitNumber?: number | null;
  topic?: string | null;
  pricingType: string;
  resourceType: string;
}

interface ExternalResourcesSectionProps {
  subjectCode: string;
  subjectName: string;
  resources: ExternalResourceItem[];
}

export function ExternalResourcesSection({
  subjectCode,
  subjectName,
  resources,
}: ExternalResourcesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  // Extract unique categories
  const categories = Array.from(new Set(resources.map((r) => r.category)));

  const filteredResources =
    selectedCategory === "ALL"
      ? resources
      : resources.filter((r) => r.category === selectedCategory);

  // Helper icon for platform / category
  const getCategoryIcon = (cat: string) => {
    switch (cat.toLowerCase()) {
      case "official documentation":
        return <FileCode className="h-4 w-4 text-blue-600" />;
      case "free online courses":
        return <GraduationCap className="h-4 w-4 text-purple-600" />;
      case "programming practice":
        return <Laptop className="h-4 w-4 text-emerald-600" />;
      default:
        return <Globe className="h-4 w-4 text-emerald-600" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">External Learning Resources</h2>
            <p className="text-xs text-slate-500">
              Curated university courseware, official documentation, interactive tutorials, and practice platforms
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg">
            {resources.length} Verified Sources
          </span>
        </div>
      </div>

      {/* Category Filter Pills (if multiple categories available) */}
      {categories.length > 1 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <button
            onClick={() => setSelectedCategory("ALL")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              selectedCategory === "ALL"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Resources ({resources.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat} ({resources.filter((r) => r.category === cat).length})
            </button>
          ))}
        </div>
      )}

      {/* Resource Cards Grid */}
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="group border border-slate-200 hover:border-emerald-300 rounded-xl p-5 bg-white hover:shadow-sm transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                {/* Meta Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[11px] font-bold px-2 py-0.5 bg-slate-100 text-slate-800 rounded">
                      {res.platform}
                    </span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-50 text-slate-600 border border-slate-200">
                      {res.category}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded text-emerald-800 bg-emerald-50 border border-emerald-200 uppercase tracking-wider">
                    {res.pricingType}
                  </span>
                </div>

                {/* Resource Title */}
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                  {res.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {res.description}
                </p>

                {/* Unit / Topic tag */}
                {(res.unitNumber || res.topic) && (
                  <div className="flex items-center gap-2 pt-1">
                    {res.unitNumber && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                        Unit {res.unitNumber}
                      </span>
                    )}
                    {res.topic && (
                      <span className="text-[11px] text-slate-500 truncate">
                        • {res.topic}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Direct Open in New Tab Action */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium flex items-center">
                  <CheckCircle2 className="h-3 w-3 mr-1 text-emerald-600" />
                  Verified Educational Source
                </span>

                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition group-hover:underline"
                  title={`Open ${res.title} in a new tab`}
                >
                  Visit Resource
                  <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200 p-6">
          <BookOpen className="h-8 w-8 text-slate-400 mx-auto mb-2" />
          <h4 className="text-sm font-semibold text-slate-800">No resources under this category</h4>
          <p className="text-xs text-slate-500 mt-1">
            Try switching to &quot;All Resources&quot; to view available study materials for {subjectCode}.
          </p>
        </div>
      )}

      {/* Quality Notice */}
      <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100 flex items-center justify-between">
        <span>All external links are curated from accredited universities, documentation repositories, and verified academic platforms.</span>
        <span className="hidden sm:inline font-mono">Invertis Academic Repository</span>
      </div>
    </div>
  );
}
