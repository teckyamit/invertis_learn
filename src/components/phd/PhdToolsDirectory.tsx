"use client";

import React, { useState, useMemo } from "react";
import { 
  Search, 
  ExternalLink, 
  Filter, 
  Wrench, 
  BookOpen, 
  CheckCircle, 
  Terminal, 
  Sparkles,
  Layers,
  Tag
} from "lucide-react";
import { RESEARCH_TOOLS, ResearchTool } from "@/data/phdData";

export function PhdToolsDirectory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedAccess, setSelectedAccess] = useState<string>("ALL");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("ALL");

  const categories = useMemo(() => {
    const cats = new Set(RESEARCH_TOOLS.map(t => t.category));
    return ["ALL", ...Array.from(cats)];
  }, []);

  const accessTypes = ["ALL", "Free", "Open-Source", "Freemium", "Institutional"];
  const difficultyLevels = ["ALL", "Beginner", "Intermediate", "Advanced"];

  const filteredTools = useMemo(() => {
    return RESEARCH_TOOLS.filter((tool) => {
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.useCases.some(uc => uc.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCat = selectedCategory === "ALL" || tool.category === selectedCategory;
      const matchesAccess = selectedAccess === "ALL" || tool.accessType === selectedAccess;
      const matchesDiff = selectedDifficulty === "ALL" || tool.difficulty === selectedDifficulty;

      return matchesSearch && matchesCat && matchesAccess && matchesDiff;
    });
  }, [searchTerm, selectedCategory, selectedAccess, selectedDifficulty]);

  const getDifficultyBadge = (d: string) => {
    switch (d) {
      case "Beginner":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Intermediate":
        return "bg-blue-50 text-brand-blue border-blue-200";
      case "Advanced":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getAccessBadge = (a: string) => {
    switch (a) {
      case "Open-Source":
        return "bg-green-100 text-green-800 border-green-200";
      case "Free":
        return "bg-teal-100 text-teal-800 border-teal-200";
      case "Freemium":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Institutional":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Directory Introduction */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 pb-5 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">Research Infrastructure</span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-navy mt-1">
              Ph.D. Research Toolkit Directory
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Curated collection of industry-standard tools, libraries, and frameworks across 10 core doctoral domains. 
              Equipped with setup procedures, verified use cases, and official documentation.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold text-slate-500">Showing</span>
            <div className="font-heading text-2xl font-extrabold text-brand-navy">
              {filteredTools.length} <span className="text-xs font-normal text-slate-500">/ {RESEARCH_TOOLS.length} Tools</span>
            </div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="space-y-3.5">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search tools by name, research purpose, or keywords (e.g., PyTorch, Zotero, LaTeX, BibTeX)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 mr-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Category:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-brand-navy text-white font-bold"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {cat === "ALL" ? "All Categories" : cat}
              </button>
            ))}
          </div>

          {/* Secondary Filters */}
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="font-bold">License / Access:</span>
              <select
                value={selectedAccess}
                onChange={(e) => setSelectedAccess(e.target.value)}
                className="bg-white border border-slate-200 rounded-md px-2.5 py-1 text-xs font-medium text-slate-700 focus:outline-none focus:border-brand-blue"
              >
                {accessTypes.map((acc) => (
                  <option key={acc} value={acc}>{acc === "ALL" ? "All Access Types" : acc}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold">Learning Curve:</span>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="bg-white border border-slate-200 rounded-md px-2.5 py-1 text-xs font-medium text-slate-700 focus:outline-none focus:border-brand-blue"
              >
                {difficultyLevels.map((diff) => (
                  <option key={diff} value={diff}>{diff === "ALL" ? "All Levels" : diff}</option>
                ))}
              </select>
            </div>

            {(searchTerm || selectedCategory !== "ALL" || selectedAccess !== "ALL" || selectedDifficulty !== "ALL") && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("ALL");
                  setSelectedAccess("ALL");
                  setSelectedDifficulty("ALL");
                }}
                className="text-brand-blue hover:underline text-xs font-bold"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center space-y-2">
          <Wrench className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="font-heading font-bold text-slate-700 text-base">No Research Tools Matched</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query or selecting a different category filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs hover:shadow-sm hover:border-slate-300 transition flex flex-col justify-between"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {tool.category}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getAccessBadge(tool.accessType)}`}>
                        {tool.accessType}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getDifficultyBadge(tool.difficulty)}`}>
                        {tool.difficulty}
                      </span>
                    </div>

                    <h3 className="font-heading text-base font-bold text-brand-navy">
                      {tool.name}
                    </h3>
                  </div>

                  <a
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-slate-400 hover:text-brand-blue hover:bg-blue-50 rounded-lg transition"
                    title={`Visit ${tool.name} official site`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Purpose */}
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {tool.purpose}
                </p>

                {/* Setup / Install */}
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 mb-3 font-mono text-[11px] text-slate-700 flex items-start gap-2">
                  <Terminal className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <span className="break-all">{tool.installGuide}</span>
                </div>

                {/* Research Use Cases */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    Doctoral Research Use Cases
                  </span>
                  <ul className="space-y-1">
                    {tool.useCases.map((uc, uIdx) => (
                      <li key={uIdx} className="text-xs text-slate-600 flex items-start gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{uc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Learning / Docs Links */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                <span className="font-medium text-slate-500">Official Resources:</span>
                <div className="flex flex-wrap items-center gap-2">
                  {tool.learningResources.map((lr, lIdx) => (
                    <a
                      key={lIdx}
                      href={lr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-brand-blue hover:underline font-semibold"
                    >
                      <span>{lr.title}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

