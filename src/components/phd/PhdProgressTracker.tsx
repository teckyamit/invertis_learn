"use client";

import React, { useState, useEffect } from "react";
import { 
  CheckCircle2, 
  Circle, 
  Plus, 
  Trash2, 
  Download, 
  Upload, 
  RotateCcw, 
  Calendar, 
  Tag, 
  FlaskConical, 
  FileText, 
  Users, 
  CheckSquare, 
  ShieldCheck,
  AlertCircle
} from "lucide-react";

interface TaskItem {
  id: string;
  title: string;
  category: "Coursework" | "Literature" | "Experiments" | "Writing" | "Admin";
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  dueDate?: string;
}

interface ExperimentLog {
  id: string;
  title: string;
  date: string;
  gitCommit?: string;
  results: string;
  notes: string;
}

interface ManuscriptSubmission {
  id: string;
  title: string;
  targetVenue: string;
  submissionDate: string;
  status: "Drafting" | "Submitted" | "Under Review" | "Revision" | "Accepted" | "Published";
  notes?: string;
}

interface SupervisorMeeting {
  id: string;
  date: string;
  agenda: string;
  actionItems: string;
}

interface PhdTrackerState {
  milestones: { [key: string]: boolean };
  tasks: TaskItem[];
  experiments: ExperimentLog[];
  manuscripts: ManuscriptSubmission[];
  meetings: SupervisorMeeting[];
}

const DEFAULT_MILESTONES = [
  { id: "m1", title: "Complete 12-Credit Ph.D Coursework (Min 55% marks)" },
  { id: "m2", title: "Formulate Research Proposal & Literature Synthesis Matrix" },
  { id: "m3", title: "Defend Research Synopsis before RAC (Registration Confirmation)" },
  { id: "m4", title: "Semester III Progress Review & Baseline Experimentation" },
  { id: "m5", title: "Publish First Peer-Reviewed Paper in SCI/Scopus Journal" },
  { id: "m6", title: "Semester IV Progress Review & Proposed Architecture Validation" },
  { id: "m7", title: "Publish Second Peer-Reviewed Journal / Top Conference Paper" },
  { id: "m8", title: "Semester V Progress Review & Ablation Studies" },
  { id: "m9", title: "Deliver Pre-Submission Seminar (Open RAC Presentation)" },
  { id: "m10", title: "Plagiarism Verification (<10% excluding bibliography)" },
  { id: "m11", title: "Formal Thesis Submission to University Evaluation Panel" },
  { id: "m12", title: "Successful Final Open Viva Voce Defense & Degree Award" }
];

const INITIAL_TASKS: TaskItem[] = [
  { id: "t1", title: "Review PhDRM 101 syllabus modules and reference textbooks", category: "Coursework", status: "COMPLETED" },
  { id: "t2", title: "Set up Zotero desktop with BibTeX auto-sync", category: "Literature", status: "COMPLETED" },
  { id: "t3", title: "Perform Keshav Pass 1 on 15 core papers in thesis area", category: "Literature", status: "IN_PROGRESS" },
  { id: "t4", title: "Reproduce baseline model accuracy from reference paper", category: "Experiments", status: "TODO" },
  { id: "t5", title: "Draft Introduction and Related Work in LaTeX template", category: "Writing", status: "TODO" }
];

const STORAGE_KEY = "invertis_phd_tracker_v1";

export function PhdProgressTracker() {
  const [activeTab, setActiveTab] = useState<"milestones" | "tasks" | "experiments" | "manuscripts" | "meetings">("milestones");
  const [state, setState] = useState<PhdTrackerState>({
    milestones: { m1: true, m2: true },
    tasks: INITIAL_TASKS,
    experiments: [
      {
        id: "exp-1",
        title: "Baseline ResNet-50 vs Swin-Transformer on benchmark set",
        date: "2026-03-15",
        gitCommit: "commit a4f8e12",
        results: "Top-1 Acc: 78.4% (ResNet), 81.2% (Swin)",
        notes: "Swin achieves higher accuracy but inference latency is 2.3x higher on edge CPU."
      }
    ],
    manuscripts: [
      {
        id: "ms-1",
        title: "Dynamic Token Pruning in Vision Transformers for Low-Power Edge",
        targetVenue: "IEEE Transactions on Pattern Analysis and Machine Intelligence (T-PAMI)",
        submissionDate: "2026-06-20",
        status: "Drafting",
        notes: "Targeting 14-page manuscript with extensive ablation studies."
      }
    ],
    meetings: [
      {
        id: "mt-1",
        date: "2026-04-10",
        agenda: "Literature review taxonomy and baseline dataset selection",
        actionItems: "Run comparative benchmarks on 3 standard datasets and prepare slide deck for RAC."
      }
    ]
  });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setState(JSON.parse(saved));
      }
    } catch {
      // Use defaults if parse fails
    }
  }, []);

  // Save to localStorage on state changes
  const saveState = (newState: PhdTrackerState) => {
    setState(newState);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  };

  // Milestone Toggling
  const toggleMilestone = (id: string) => {
    const updated = {
      ...state,
      milestones: {
        ...state.milestones,
        [id]: !state.milestones[id]
      }
    };
    saveState(updated);
  };

  // Task Handlers
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskCat, setNewTaskCat] = useState<TaskItem["category"]>("Coursework");

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      category: newTaskCat,
      status: "TODO"
    };
    saveState({ ...state, tasks: [...state.tasks, newTask] });
    setNewTaskTitle("");
  };

  const toggleTaskStatus = (id: string) => {
    const updatedTasks = state.tasks.map(t => {
      if (t.id === id) {
        const nextStatus: TaskItem["status"] = 
          t.status === "TODO" ? "IN_PROGRESS" :
          t.status === "IN_PROGRESS" ? "COMPLETED" : "TODO";
        return { ...t, status: nextStatus };
      }
      return t;
    });
    saveState({ ...state, tasks: updatedTasks });
  };

  const deleteTask = (id: string) => {
    saveState({ ...state, tasks: state.tasks.filter(t => t.id !== id) });
  };

  // Experiment Handlers
  const [newExpTitle, setNewExpTitle] = useState("");
  const [newExpResults, setNewExpResults] = useState("");
  const [newExpNotes, setNewExpNotes] = useState("");

  const addExperiment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpTitle.trim()) return;
    const newExp: ExperimentLog = {
      id: `exp-${Date.now()}`,
      title: newExpTitle.trim(),
      date: new Date().toISOString().split("T")[0],
      results: newExpResults.trim() || "Pending verification",
      notes: newExpNotes.trim()
    };
    saveState({ ...state, experiments: [newExp, ...state.experiments] });
    setNewExpTitle("");
    setNewExpResults("");
    setNewExpNotes("");
  };

  const deleteExperiment = (id: string) => {
    saveState({ ...state, experiments: state.experiments.filter(e => e.id !== id) });
  };

  // Manuscript Handlers
  const [newPaperTitle, setNewPaperTitle] = useState("");
  const [newPaperVenue, setNewPaperVenue] = useState("");
  const [newPaperStatus, setNewPaperStatus] = useState<ManuscriptSubmission["status"]>("Drafting");

  const addManuscript = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPaperTitle.trim()) return;
    const newMs: ManuscriptSubmission = {
      id: `ms-${Date.now()}`,
      title: newPaperTitle.trim(),
      targetVenue: newPaperVenue.trim() || "To be decided",
      submissionDate: new Date().toISOString().split("T")[0],
      status: newPaperStatus
    };
    saveState({ ...state, manuscripts: [newMs, ...state.manuscripts] });
    setNewPaperTitle("");
    setNewPaperVenue("");
  };

  const deleteManuscript = (id: string) => {
    saveState({ ...state, manuscripts: state.manuscripts.filter(m => m.id !== id) });
  };

  // Supervisor Meeting Handlers
  const [meetingAgenda, setMeetingAgenda] = useState("");
  const [meetingActions, setMeetingActions] = useState("");

  const addMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingAgenda.trim()) return;
    const newMt: SupervisorMeeting = {
      id: `mt-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      agenda: meetingAgenda.trim(),
      actionItems: meetingActions.trim()
    };
    saveState({ ...state, meetings: [newMt, ...state.meetings] });
    setMeetingAgenda("");
    setMeetingActions("");
  };

  const deleteMeeting = (id: string) => {
    saveState({ ...state, meetings: state.meetings.filter(m => m.id !== id) });
  };

  // Backup Export/Import
  const exportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const dlAnchorElem = document.createElement("a");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `invertis_phd_tracker_${new Date().toISOString().split("T")[0]}.json`);
    dlAnchorElem.click();
  };

  const importBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        saveState(imported);
        alert("Ph.D. progress data successfully imported!");
      } catch {
        alert("Failed to parse JSON file. Please ensure it is a valid backup.");
      }
    };
    reader.readAsText(file);
  };

  const resetTracker = () => {
    if (confirm("Are you sure you want to reset all milestones and tracker logs? This will erase local modifications.")) {
      localStorage.removeItem(STORAGE_KEY);
      setState({
        milestones: { m1: true },
        tasks: INITIAL_TASKS,
        experiments: [],
        manuscripts: [],
        meetings: []
      });
    }
  };

  // Calculate Progress
  const completedMilestones = DEFAULT_MILESTONES.filter(m => state.milestones[m.id]).length;
  const progressPercent = Math.round((completedMilestones / DEFAULT_MILESTONES.length) * 100);

  return (
    <div className="space-y-6">
      {/* Introduction & Privacy Guarantee Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Private Client-Side Storage</span>
              </span>
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-navy">
              Interactive Ph.D. Progression & Dissertation Tracker
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Track doctoral milestones, manage experiment logs, track journal submissions, and record supervisor meeting action items. 
              All data is stored exclusively in your browser&apos;s local storage — zero server sync ensures complete confidentiality for unpublished research.
            </p>
          </div>

          {/* Backup / Export Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={exportBackup}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>

            <label className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>Import JSON</span>
              <input type="file" accept=".json" onChange={importBackup} className="hidden" />
            </label>

            <button
              type="button"
              onClick={resetTracker}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
              title="Reset Tracker to Defaults"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Overall Completion Progress Bar */}
        <div className="pt-5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">Doctoral Milestone Completion</span>
            <span className="font-mono font-bold text-brand-blue">{completedMilestones} of {DEFAULT_MILESTONES.length} Milestones ({progressPercent}%)</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-brand-blue to-emerald-500 transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Tracker Sub-Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("milestones")}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === "milestones"
              ? "bg-brand-navy text-white shadow-2xs"
              : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Milestones ({completedMilestones}/{DEFAULT_MILESTONES.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("tasks")}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === "tasks"
              ? "bg-brand-navy text-white shadow-2xs"
              : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          <span>Research Tasks ({state.tasks.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("experiments")}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === "experiments"
              ? "bg-brand-navy text-white shadow-2xs"
              : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
          }`}
        >
          <FlaskConical className="w-4 h-4" />
          <span>Experiment Logs ({state.experiments.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("manuscripts")}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === "manuscripts"
              ? "bg-brand-navy text-white shadow-2xs"
              : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Manuscripts ({state.manuscripts.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("meetings")}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === "meetings"
              ? "bg-brand-navy text-white shadow-2xs"
              : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Supervisor Meetings ({state.meetings.length})</span>
        </button>
      </div>

      {/* Tab 1: Milestones */}
      {activeTab === "milestones" && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-3">
          <h3 className="font-heading font-bold text-brand-navy text-base mb-2">
            Official Doctoral Progression Milestones
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {DEFAULT_MILESTONES.map((m, idx) => {
              const isChecked = !!state.milestones[m.id];
              return (
                <div
                  key={m.id}
                  onClick={() => toggleMilestone(m.id)}
                  className={`p-3.5 rounded-xl border transition flex items-start gap-3 cursor-pointer ${
                    isChecked
                      ? "bg-emerald-50/50 border-emerald-200/80 text-emerald-950"
                      : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                  }`}
                >
                  <div className="mt-0.5">
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Stage {idx + 1}
                    </span>
                    <span className={`text-xs font-medium leading-snug ${isChecked ? "line-through text-slate-500" : ""}`}>
                      {m.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Research Tasks */}
      {activeTab === "tasks" && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-5">
          <form onSubmit={addTask} className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="text"
              placeholder="Add a new doctoral research task..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-blue"
            />
            <select
              value={newTaskCat}
              onChange={(e) => setNewTaskCat(e.target.value as TaskItem["category"])}
              className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-brand-blue"
            >
              <option value="Coursework">Coursework</option>
              <option value="Literature">Literature</option>
              <option value="Experiments">Experiments</option>
              <option value="Writing">Writing</option>
              <option value="Admin">Admin</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-brand-navy hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </button>
          </form>

          <div className="space-y-2">
            {state.tasks.map((task) => (
              <div
                key={task.id}
                className="p-3 bg-slate-50/70 border border-slate-200 rounded-lg flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => toggleTaskStatus(task.id)}
                    className="cursor-pointer"
                  >
                    {task.status === "COMPLETED" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : task.status === "IN_PROGRESS" ? (
                      <div className="w-4 h-4 rounded-full border-2 border-brand-blue border-t-transparent animate-spin"></div>
                    ) : (
                      <Circle className="w-4 h-4 text-slate-300" />
                    )}
                  </button>
                  <span className={`font-medium ${task.status === "COMPLETED" ? "line-through text-slate-400" : "text-slate-800"}`}>
                    {task.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-700">
                    {task.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => deleteTask(task.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Experiments */}
      {activeTab === "experiments" && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-5">
          <form onSubmit={addExperiment} className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Log New Benchmark / Experiment</span>
            <input
              type="text"
              placeholder="Experiment title (e.g., Token Pruning with spatial pooling on CIFAR-100)..."
              value={newExpTitle}
              onChange={(e) => setNewExpTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-brand-blue"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Key results & metrics (e.g., F1: 89.2%, 1.8x speedup)..."
                value={newExpResults}
                onChange={(e) => setNewExpResults(e.target.value)}
                className="px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-brand-blue"
              />
              <input
                type="text"
                placeholder="Observations / hyperparameter notes..."
                value={newExpNotes}
                onChange={(e) => setNewExpNotes(e.target.value)}
                className="px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-brand-blue"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-brand-navy hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition cursor-pointer"
            >
              Save Experiment Record
            </button>
          </form>

          <div className="space-y-3">
            {state.experiments.map((exp) => (
              <div key={exp.id} className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 text-xs">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 block">{exp.date}</span>
                    <h4 className="font-heading font-bold text-brand-navy text-sm">{exp.title}</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteExperiment(exp.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-mono text-[11px]">
                  <strong>Results:</strong> {exp.results}
                </div>
                {exp.notes && (
                  <p className="text-slate-600 text-xs">
                    <strong>Notes:</strong> {exp.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Manuscripts */}
      {activeTab === "manuscripts" && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-5">
          <form onSubmit={addManuscript} className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Track Manuscript Submission</span>
            <input
              type="text"
              placeholder="Paper title..."
              value={newPaperTitle}
              onChange={(e) => setNewPaperTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-brand-blue"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Target journal / conference (e.g., IEEE T-PAMI, NeurIPS)..."
                value={newPaperVenue}
                onChange={(e) => setNewPaperVenue(e.target.value)}
                className="px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-brand-blue"
              />
              <select
                value={newPaperStatus}
                onChange={(e) => setNewPaperStatus(e.target.value as ManuscriptSubmission["status"])}
                className="px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-brand-blue"
              >
                <option value="Drafting">Drafting</option>
                <option value="Submitted">Submitted</option>
                <option value="Under Review">Under Review</option>
                <option value="Revision">Revision</option>
                <option value="Accepted">Accepted</option>
                <option value="Published">Published</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-brand-navy hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition cursor-pointer"
            >
              Add Manuscript Entry
            </button>
          </form>

          <div className="space-y-3">
            {state.manuscripts.map((ms) => (
              <div key={ms.id} className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200 inline-block mb-1">
                    {ms.status}
                  </span>
                  <h4 className="font-heading font-bold text-brand-navy text-sm">{ms.title}</h4>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Target: <strong>{ms.targetVenue}</strong> • Logged: {ms.submissionDate}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => deleteManuscript(ms.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded self-end sm:self-center cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Supervisor Meetings */}
      {activeTab === "meetings" && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-5">
          <form onSubmit={addMeeting} className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Record Supervisor Meeting & Action Points</span>
            <input
              type="text"
              placeholder="Meeting discussion agenda..."
              value={meetingAgenda}
              onChange={(e) => setMeetingAgenda(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-brand-blue"
            />
            <input
              type="text"
              placeholder="Agreed action points & next deadlines..."
              value={meetingActions}
              onChange={(e) => setMeetingActions(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-brand-blue"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-brand-navy hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition cursor-pointer"
            >
              Save Meeting Record
            </button>
          </form>

          <div className="space-y-3">
            {state.meetings.map((mt) => (
              <div key={mt.id} className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 text-xs">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-xs font-bold text-brand-blue">{mt.date}</span>
                  <button
                    type="button"
                    onClick={() => deleteMeeting(mt.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-slate-800 text-xs">
                  <strong>Agenda:</strong> {mt.agenda}
                </p>
                {mt.actionItems && (
                  <p className="text-slate-600 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <strong>Action Items:</strong> {mt.actionItems}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

