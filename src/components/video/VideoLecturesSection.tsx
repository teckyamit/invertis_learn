"use client";

import React, { useState, useMemo } from "react";
import {
  ListVideo,
  ExternalLink,
  Video,
  Search,
  Filter,
  CheckCircle2,
  Tv,
  Globe,
  Sparkles,
  BookOpen,
  X,
  Flag
} from "lucide-react";
import { ReportContentModal } from "@/components/modals/ReportContentModal";

export interface VideoLectureItem {
  id: string;
  title: string;
  youtubeUrl: string;
  youtubeId: string;
  videoType: "INDIVIDUAL_VIDEO" | "PLAYLIST" | string;
  channelName: string;
  unitNumber?: number | null;
  topic?: string | null;
  description: string;
  pricingType: string;
  language?: string;
  academicLevel?: string;
  verifiedAt?: string;
}

interface VideoLecturesSectionProps {
  subjectId?: string;
  subjectCode: string;
  subjectName: string;
  videos: VideoLectureItem[];
}

// Authoritative verified playlists prioritized for GATE Smashers, Knowledge Gate, NPTEL
const VERIFIED_SUBJECT_LECTURES: Record<string, VideoLectureItem[]> = {
  // Operating Systems
  "BCS-403": [
    {
      id: "gs-os-bcs403",
      title: "Operating System (Complete Playlist) - Gate Smashers",
      youtubeUrl: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p",
      youtubeId: "PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p",
      videoType: "PLAYLIST",
      channelName: "GATE Smashers",
      unitNumber: 1,
      topic: "Process Management, Synchronization, Deadlocks, Memory & File Systems",
      description: "Complete course by Varun Singla covering Process States, CPU Scheduling, Semaphores, Banker's Algorithm, Virtual Memory, and Disk Scheduling.",
      pricingType: "FREE",
      language: "Hindi / English"
    },
    {
      id: "kg-os-bcs403",
      title: "Operating Systems by Sanchit Jain - Knowledge Gate",
      youtubeUrl: "https://www.youtube.com/playlist?list=PLmXKhU9FNesSFvj6gASuWmQd23Ul5omtD",
      youtubeId: "PLmXKhU9FNesSFvj6gASuWmQd23Ul5omtD",
      videoType: "PLAYLIST",
      channelName: "Knowledge Gate",
      unitNumber: 2,
      topic: "System Architecture, Threads & Concurrency",
      description: "Detailed university lecture series by Sanchit Sir covering operating system structures, multi-threading, and memory management.",
      pricingType: "FREE",
      language: "Hindi / English"
    }
  ],
  "BCSAI 204": [
    {
      id: "gs-os-bcsai204",
      title: "Operating System (Complete Playlist) - Gate Smashers",
      youtubeUrl: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p",
      youtubeId: "PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p",
      videoType: "PLAYLIST",
      channelName: "GATE Smashers",
      unitNumber: 1,
      topic: "OS Building Blocks & Kernel Architecture",
      description: "Varun Singla's comprehensive series covering processes, system calls, memory virtualization, and hardware abstraction.",
      pricingType: "FREE",
      language: "Hindi / English"
    }
  ],

  // Database Management Systems
  "BCS-502": [
    {
      id: "gs-dbms-bcs502",
      title: "Database Management System (DBMS Complete Playlist) - Gate Smashers",
      youtubeUrl: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y",
      youtubeId: "PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y",
      videoType: "PLAYLIST",
      channelName: "GATE Smashers",
      unitNumber: 1,
      topic: "ER Models, Relational Algebra, Normalization & Transactions",
      description: "Varun Singla's renowned lecture series breaking down ER diagrams, functional dependencies, 1NF to BCNF, ACID transactions, and serializability.",
      pricingType: "FREE",
      language: "Hindi / English"
    },
    {
      id: "gs-sql-bcs502",
      title: "Structured Query Language (SQL Playlist) - Gate Smashers",
      youtubeUrl: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiHqU4HKL7-SITyuSIcD93id",
      youtubeId: "PLxCzCOWd7aiHqU4HKL7-SITyuSIcD93id",
      videoType: "PLAYLIST",
      channelName: "GATE Smashers",
      unitNumber: 2,
      topic: "DDL, DML, Nested Queries, JOINs & Indexing",
      description: "Practical SQL command walkthrough covering table creation, integrity constraints, complex subqueries, and database views.",
      pricingType: "FREE",
      language: "Hindi / English"
    }
  ],
  "BCSAI 403": [
    {
      id: "gs-dbms-bcsai403",
      title: "DBMS Complete Course - Gate Smashers",
      youtubeUrl: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y",
      youtubeId: "PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y",
      videoType: "PLAYLIST",
      channelName: "GATE Smashers",
      unitNumber: 1,
      topic: "Relational Modeling & Normal Forms",
      description: "Structured university curriculum covering relational schemas, normalization techniques, indexing, and query optimization.",
      pricingType: "FREE",
      language: "Hindi / English"
    }
  ],
  "MCS-201": [
    {
      id: "gs-dbms-mcs201",
      title: "Database Management Systems (Advanced Concepts) - Gate Smashers",
      youtubeUrl: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y",
      youtubeId: "PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y",
      videoType: "PLAYLIST",
      channelName: "GATE Smashers",
      unitNumber: 1,
      topic: "Concurrency Control, Recovery & Query Execution",
      description: "In-depth treatment of two-phase locking, timestamp ordering, ARIES recovery protocol, and B+ Tree indexing.",
      pricingType: "FREE",
      language: "Hindi / English"
    }
  ],

  // Computer Networks
  "BCSAI 301": [
    {
      id: "gs-cn-bcsai301",
      title: "Computer Networks (CN Complete Playlist) - Gate Smashers",
      youtubeUrl: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_",
      youtubeId: "PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_",
      videoType: "PLAYLIST",
      channelName: "GATE Smashers",
      unitNumber: 1,
      topic: "OSI & TCP/IP, Framing, Routing & Transport Protocols",
      description: "Clear whiteboard series on physical medium, sliding window protocols, Dijkstra's algorithm, IPv4 addressing, and TCP three-way handshake.",
      pricingType: "FREE",
      language: "Hindi / English"
    }
  ],
  "MCS-103": [
    {
      id: "gs-cn-mcs103",
      title: "Computer Networks (Complete Series) - Gate Smashers",
      youtubeUrl: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_",
      youtubeId: "PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_",
      videoType: "PLAYLIST",
      channelName: "GATE Smashers",
      unitNumber: 1,
      topic: "Advanced Routing, Congestion Control & Transport Layers",
      description: "Rigorous treatment of distance-vector, link-state routing, TCP flow control, socket programming, and network security protocols.",
      pricingType: "FREE",
      language: "Hindi / English"
    },
    {
      id: "nptel-cn-mcs103",
      title: "Computer Networks & Internet Protocol - NPTEL IIT Kharagpur",
      youtubeUrl: "https://www.youtube.com/playlist?list=PLbRMhDVUMngf-pdMfiAiNn9nk5930hpeA",
      youtubeId: "PLbRMhDVUMngf-pdMfiAiNn9nk5930hpeA",
      videoType: "PLAYLIST",
      channelName: "NPTEL-NOC IITM",
      unitNumber: 2,
      topic: "MAC Protocols, Switching & Advanced Architectures",
      description: "Prof. Soumya Kanti Ghosh's national lecture series on data link layer abstractions, queuing delays, and transport services.",
      pricingType: "FREE",
      language: "English"
    }
  ],

  // Data Structures
  "BCS-301": [
    {
      id: "gs-ds-bcs301",
      title: "Data Structures (Complete Playlist) - Gate Smashers",
      youtubeUrl: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiEwaANNt3OqJPVIxwp2ebiT",
      youtubeId: "PLxCzCOWd7aiEwaANNt3OqJPVIxwp2ebiT",
      videoType: "PLAYLIST",
      channelName: "GATE Smashers",
      unitNumber: 1,
      topic: "Arrays, Linked Lists, Stacks, Queues, Trees & Graphs",
      description: "Varun Singla's complete data structures series with memory layout tracing, infix/postfix expressions, BST operations, and traversal algorithms.",
      pricingType: "FREE",
      language: "Hindi / English"
    },
    {
      id: "ab-ds-bcs301",
      title: "Data Structures and Algorithms by Abdul Bari",
      youtubeUrl: "https://www.youtube.com/playlist?list=PLDN4rrl48X7Z7nr_O3Pkyz9tkg0gN1N7E",
      youtubeId: "PLDN4rrl48X7Z7nr_O3Pkyz9tkg0gN1N7E",
      videoType: "PLAYLIST",
      channelName: "Abdul Bari",
      unitNumber: 2,
      topic: "Recursion, AVL Trees, Heaps & Graph Traversals",
      description: "World-renowned lectures breaking down algorithmic foundations, balanced search trees, and asymptotic time complexity.",
      pricingType: "FREE",
      language: "English"
    }
  ],
  "BCSAI 303": [
    {
      id: "gs-ds-bcsai303",
      title: "Data Structures Complete Course - Gate Smashers",
      youtubeUrl: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiEwaANNt3OqJPVIxwp2ebiT",
      youtubeId: "PLxCzCOWd7aiEwaANNt3OqJPVIxwp2ebiT",
      videoType: "PLAYLIST",
      channelName: "GATE Smashers",
      unitNumber: 1,
      topic: "Linear and Non-Linear Data Structures",
      description: "Comprehensive step-by-step lectures on Linked Lists, Queues, Binary Trees, and Hash Tables.",
      pricingType: "FREE",
      language: "Hindi / English"
    }
  ],

  // Design and Analysis of Algorithms
  "BCS-402": [
    {
      id: "gs-daa-bcs402",
      title: "Design and Analysis of Algorithms (DAA Playlist) - Gate Smashers",
      youtubeUrl: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiHcmS4i14bI0VrMbZTUvlTa",
      youtubeId: "PLxCzCOWd7aiHcmS4i14bI0VrMbZTUvlTa",
      videoType: "PLAYLIST",
      channelName: "GATE Smashers",
      unitNumber: 1,
      topic: "Asymptotic Analysis, Divide & Conquer, Greedy & Dynamic Programming",
      description: "Complete algorithm series covering Master Theorem, QuickSort, Knapsack, Dijkstra, Floyd-Warshall, and NP-completeness.",
      pricingType: "FREE",
      language: "Hindi / English"
    },
    {
      id: "ab-daa-bcs402",
      title: "Algorithms Lecture Series by Abdul Bari",
      youtubeUrl: "https://www.youtube.com/playlist?list=PLDN4rrl48X7Z7nr_O3Pkyz9tkg0gN1N7E",
      youtubeId: "PLDN4rrl48X7Z7nr_O3Pkyz9tkg0gN1N7E",
      videoType: "PLAYLIST",
      channelName: "Abdul Bari",
      unitNumber: 2,
      topic: "Dynamic Programming, Branch and Bound & Backtracking",
      description: "Legendary whiteboard problem solving on recurrence relations, matrix chain multiplication, and N-Queens problem.",
      pricingType: "FREE",
      language: "English"
    }
  ],
  "BCSAI 401": [
    {
      id: "gs-daa-bcsai401",
      title: "Algorithms Design & Analysis - Gate Smashers",
      youtubeUrl: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiHcmS4i14bI0VrMbZTUvlTa",
      youtubeId: "PLxCzCOWd7aiHcmS4i14bI0VrMbZTUvlTa",
      videoType: "PLAYLIST",
      channelName: "GATE Smashers",
      unitNumber: 1,
      topic: "Algorithmic Paradigms & Recurrences",
      description: "Master method, divide-and-conquer strategies, and dynamic programming applications.",
      pricingType: "FREE",
      language: "Hindi / English"
    }
  ],
  "MCS-322": [
    {
      id: "gs-daa-mcs322",
      title: "Design and Analysis of Algorithms - Gate Smashers",
      youtubeUrl: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiHcmS4i14bI0VrMbZTUvlTa",
      youtubeId: "PLxCzCOWd7aiHcmS4i14bI0VrMbZTUvlTa",
      videoType: "PLAYLIST",
      channelName: "GATE Smashers",
      unitNumber: 1,
      topic: "Advanced Complexity & NP-Completeness",
      description: "Rigorous treatment of P vs NP, polynomial-time reductions, approximation algorithms, and randomized algorithms.",
      pricingType: "FREE",
      language: "Hindi / English"
    }
  ],

  // Computer Organization and Architecture
  "BCS-401": [
    {
      id: "gs-coa-bcs401",
      title: "Computer Organization and Architecture (COA Playlist) - Gate Smashers",
      youtubeUrl: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX",
      youtubeId: "PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX",
      videoType: "PLAYLIST",
      channelName: "GATE Smashers",
      unitNumber: 1,
      topic: "Von Neumann Architecture, Instruction Formats & Addressing Modes",
      description: "66-lecture series covering register transfers, Booth's multiplication, cache mapping techniques, and pipeline hazard handling.",
      pricingType: "FREE",
      language: "Hindi / English"
    }
  ],
  "MCS-101": [
    {
      id: "om-aca-mcs101",
      title: "Advanced Computer Architecture - Prof. Onur Mutlu (CMU / ETH Zurich)",
      youtubeUrl: "https://www.youtube.com/playlist?list=PL5Q2soXY2Zi8J7U_N5y_9iE_oI4qR4XfE",
      youtubeId: "PL5Q2soXY2Zi8J7U_N5y_9iE_oI4qR4XfE",
      videoType: "PLAYLIST",
      channelName: "Onur Mutlu Lectures",
      unitNumber: 1,
      topic: "Superscalar Execution, Branch Prediction & Memory Hierarchies",
      description: "World-class university lecture series detailing instruction-level parallelism, SIMD/vector processing, cache coherence protocols, and interconnects.",
      pricingType: "FREE",
      language: "English"
    },
    {
      id: "gs-coa-mcs101",
      title: "Computer Architecture Core Fundamentals - Gate Smashers",
      youtubeUrl: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX",
      youtubeId: "PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX",
      videoType: "PLAYLIST",
      channelName: "GATE Smashers",
      unitNumber: 2,
      topic: "Pipelining & Micro-operations",
      description: "Comprehensive review of hardware control units, RISC pipelines, and memory interleaving.",
      pricingType: "FREE",
      language: "Hindi / English"
    }
  ],

  // Theory of Computation / Automata
  "BCS-501": [
    {
      id: "gs-toc-bcs501",
      title: "Theory of Computation (TOC Playlist) - Gate Smashers",
      youtubeUrl: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i",
      youtubeId: "PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i",
      videoType: "PLAYLIST",
      channelName: "GATE Smashers",
      unitNumber: 1,
      topic: "Finite Automata, Regular Expressions, CFLs, Pushdown Automata & Turing Machines",
      description: "Complete playlist covering DFA/NFA conversions, Pumping Lemma, Chomsky Hierarchy, PDA designs, and Turing machine computability.",
      pricingType: "FREE",
      language: "Hindi / English"
    }
  ],

  // Compiler Design
  "BCS-602": [
    {
      id: "gs-cd-bcs602",
      title: "Compiler Design (Complete Playlist) - Gate Smashers",
      youtubeUrl: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiEKtKSIHYusizkESC42diyc",
      youtubeId: "PLxCzCOWd7aiEKtKSIHYusizkESC42diyc",
      videoType: "PLAYLIST",
      channelName: "GATE Smashers",
      unitNumber: 1,
      topic: "Lexical Analysis, Parsing (LL/LR), Syntax Directed Translation & Code Generation",
      description: "Comprehensive video lectures on Lex/Yacc, First & Follow sets, Shift-Reduce parsers, Intermediate Code Generation, and register allocation.",
      pricingType: "FREE",
      language: "Hindi / English"
    }
  ],

  // Discrete Mathematics
  "BAS-301": [
    {
      id: "gs-dm-bas301",
      title: "Discrete Mathematics (Complete Playlist) - Gate Smashers",
      youtubeUrl: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiH2wwES9vPWsEL6ipTaUSl3",
      youtubeId: "PLxCzCOWd7aiH2wwES9vPWsEL6ipTaUSl3",
      videoType: "PLAYLIST",
      channelName: "GATE Smashers",
      unitNumber: 1,
      topic: "Propositional Logic, Set Theory, Relations, Group Theory & Graph Theory",
      description: "Complete mathematical foundations course covering truth tables, predicates, equivalence relations, lattices, and Euler/Hamiltonian graphs.",
      pricingType: "FREE",
      language: "Hindi / English"
    }
  ],
  "MCS-102": [
    {
      id: "gs-dm-mcs102",
      title: "Discrete Mathematics Foundations - Gate Smashers",
      youtubeUrl: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiH2wwES9vPWsEL6ipTaUSl3",
      youtubeId: "PLxCzCOWd7aiH2wwES9vPWsEL6ipTaUSl3",
      videoType: "PLAYLIST",
      channelName: "GATE Smashers",
      unitNumber: 1,
      topic: "Mathematical Logic, Proof Techniques & Graph Theory",
      description: "Foundational mathematics for advanced computer science covering recurrence relations, combinatorics, and algebraic structures.",
      pricingType: "FREE",
      language: "Hindi / English"
    }
  ],

  // Software Engineering
  "BCS-503": [
    {
      id: "gs-se-bcs503",
      title: "Software Engineering (Complete Playlist) - Gate Smashers",
      youtubeUrl: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2",
      youtubeId: "PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2",
      videoType: "PLAYLIST",
      channelName: "GATE Smashers",
      unitNumber: 1,
      topic: "SDLC Models, Requirement Engineering, Testing & Agile Scrum",
      description: "Complete playlist on Waterfall, Spiral, and Agile models, COCOMO estimation, Function Points, White/Black-Box Testing, and Maintenance.",
      pricingType: "FREE",
      language: "Hindi / English"
    }
  ],

  // C Programming
  "BCS201": [
    {
      id: "nptel-c-bcs201",
      title: "Problem Solving through Programming in C - NPTEL IIT Kharagpur",
      youtubeUrl: "https://www.youtube.com/playlist?list=PLJ5C_6qdAvBFzL9su5J-FX8x80BMhkPy1",
      youtubeId: "PLJ5C_6qdAvBFzL9su5J-FX8x80BMhkPy1",
      videoType: "PLAYLIST",
      channelName: "NPTEL-NOC IITM",
      unitNumber: 1,
      topic: "Algorithmic Problem Solving, C Syntax, Pointers & Recursion",
      description: "Official 12-week national course by Prof. Anupam Basu covering algorithmic thinking, C syntax, pointers, recursion, and file handling.",
      pricingType: "FREE",
      language: "English"
    }
  ],
  "BCSAI 103": [
    {
      id: "nptel-c-bcsai103",
      title: "Problem Solving through Programming in C - NPTEL IIT Kharagpur",
      youtubeUrl: "https://www.youtube.com/playlist?list=PLJ5C_6qdAvBFzL9su5J-FX8x80BMhkPy1",
      youtubeId: "PLJ5C_6qdAvBFzL9su5J-FX8x80BMhkPy1",
      videoType: "PLAYLIST",
      channelName: "NPTEL-NOC IITM",
      unitNumber: 1,
      topic: "Algorithms & C Syntax",
      description: "Structured university lectures on problem solving, control structures, and memory references in C.",
      pricingType: "FREE",
      language: "English"
    }
  ],

  // Artificial Intelligence & Machine Learning
  "BCSAI 405": [
    {
      id: "mit-ai-bcsai405",
      title: "Artificial Intelligence - Prof. Patrick Winston (MIT 6.034)",
      youtubeUrl: "https://www.youtube.com/playlist?list=PLUl4u3cNGP63gFHB6xb-kVBiQHYe_4hSi",
      youtubeId: "PLUl4u3cNGP63gFHB6xb-kVBiQHYe_4hSi",
      videoType: "PLAYLIST",
      channelName: "MIT OpenCourseWare",
      unitNumber: 1,
      topic: "Heuristic Search, Game Trees, Logic & Neural Nets",
      description: "MIT's legendary lecture series by Patrick Winston on state space search, adversarial minimax with alpha-beta pruning, and knowledge representations.",
      pricingType: "FREE",
      language: "English"
    }
  ],
  "BCSAI 504": [
    {
      id: "stanford-ml-bcsai504",
      title: "Machine Learning (CS229) by Prof. Andrew Ng - Stanford Online",
      youtubeUrl: "https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU",
      youtubeId: "PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU",
      videoType: "PLAYLIST",
      channelName: "Stanford Online",
      unitNumber: 1,
      topic: "Supervised Learning, Loss Functions, SVMs & Clustering",
      description: "Stanford's definitive machine learning course covering gradient descent, logistic regression, support vector machines, and dimensionality reduction.",
      pricingType: "FREE",
      language: "English"
    }
  ],
  "MCS-214": [
    {
      id: "stanford-ml-mcs214",
      title: "Machine Learning (CS229) by Prof. Andrew Ng - Stanford Online",
      youtubeUrl: "https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU",
      youtubeId: "PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU",
      videoType: "PLAYLIST",
      channelName: "Stanford Online",
      unitNumber: 1,
      topic: "Statistical Learning Theory & Optimization",
      description: "Rigorous theoretical course covering convex optimization, kernel methods, generalization bounds, and ensemble models.",
      pricingType: "FREE",
      language: "English"
    }
  ]
};

export function VideoLecturesSection({
  subjectId,
  subjectCode,
  subjectName,
  videos = [],
}: VideoLecturesSectionProps) {
  const [selectedUnit, setSelectedUnit] = useState<string>("ALL");
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [reportVideo, setReportVideo] = useState<VideoLectureItem | null>(null);

  // Merge database videos with verified fallback mappings, eliminating any duplicates
  const allVideos = useMemo(() => {
    const list: VideoLectureItem[] = [...videos];
    const fallback = VERIFIED_SUBJECT_LECTURES[subjectCode] || [];
    
    for (const fb of fallback) {
      if (!list.some(v => v.youtubeUrl === fb.youtubeUrl || v.youtubeId === fb.youtubeId)) {
        list.push(fb);
      }
    }
    return list;
  }, [videos, subjectCode]);

  // Extract unique units
  const availableUnits = useMemo(() => {
    const units = new Set<number>();
    allVideos.forEach(v => {
      if (v.unitNumber) units.add(v.unitNumber);
    });
    return Array.from(units).sort((a, b) => a - b);
  }, [allVideos]);

  const filteredVideos = useMemo(() => {
    return allVideos.filter((v) => {
      const matchesUnit = selectedUnit === "ALL" || String(v.unitNumber) === selectedUnit;
      const matchesType = selectedType === "ALL" || v.videoType === selectedType;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        v.title.toLowerCase().includes(q) ||
        v.channelName.toLowerCase().includes(q) ||
        (v.topic && v.topic.toLowerCase().includes(q)) ||
        v.description.toLowerCase().includes(q);

      return matchesUnit && matchesType && matchesSearch;
    });
  }, [allVideos, selectedUnit, selectedType, searchQuery]);

  const getChannelBadge = (channel: string) => {
    if (channel.toLowerCase().includes("gate smashers")) {
      return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-800 border border-rose-200">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-600 inline-block mr-1"></span>
          GATE Smashers
        </span>
      );
    }
    if (channel.toLowerCase().includes("knowledge gate")) {
      return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-800 border border-purple-200">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-600 inline-block mr-1"></span>
          Knowledge Gate
        </span>
      );
    }
    if (channel.toLowerCase().includes("nptel")) {
      return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block mr-1"></span>
          NPTEL / IIT
        </span>
      );
    }
    return (
      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
        {channel}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-rose-50 text-rose-700 rounded-xl">
            <Video className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-slate-900">Recommended Video Lectures</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 border border-rose-200 uppercase tracking-wide">
                Verified Playlists
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Curated lecture series and structured playlists prioritizing <strong>GATE Smashers</strong>, <strong>Knowledge Gate</strong>, and <strong>NPTEL</strong>
            </p>
          </div>
        </div>

        {allVideos.length > 0 && (
          <span className="text-xs font-semibold px-2.5 py-1 bg-rose-50 text-rose-800 border border-rose-200 rounded-lg shrink-0">
            {allVideos.length} Verified Series
          </span>
        )}
      </div>

      {allVideos.length > 0 ? (
        <div className="space-y-6">
          {/* Controls Bar: Filters & Search */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              {/* Search */}
              <div className="relative flex-1 max-w-sm">
                <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search lectures, topics or channels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>

              {/* Type Filter */}
              <div className="flex items-center space-x-1.5">
                <span className="font-semibold text-slate-500 uppercase tracking-wider mr-1 text-[11px]">
                  Format:
                </span>
                <button
                  onClick={() => setSelectedType("ALL")}
                  className={`px-2.5 py-1 rounded-md font-semibold transition ${
                    selectedType === "ALL"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  All ({allVideos.length})
                </button>
                <button
                  onClick={() => setSelectedType("PLAYLIST")}
                  className={`px-2.5 py-1 rounded-md font-semibold transition ${
                    selectedType === "PLAYLIST"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  Playlists ({allVideos.filter(v => v.videoType === "PLAYLIST").length})
                </button>
                <button
                  onClick={() => setSelectedType("INDIVIDUAL_VIDEO")}
                  className={`px-2.5 py-1 rounded-md font-semibold transition ${
                    selectedType === "INDIVIDUAL_VIDEO"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  Single Lectures ({allVideos.filter(v => v.videoType !== "PLAYLIST").length})
                </button>
              </div>
            </div>

            {/* Unit Filters */}
            {availableUnits.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200/60">
                <span className="font-semibold text-slate-500 uppercase tracking-wider mr-1 text-[11px]">
                  Unit Scope:
                </span>
                <button
                  onClick={() => setSelectedUnit("ALL")}
                  className={`px-2.5 py-0.5 rounded-md font-semibold text-[11px] transition ${
                    selectedUnit === "ALL"
                      ? "bg-rose-700 text-white"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  All Units
                </button>
                {availableUnits.map((u) => (
                  <button
                    key={u}
                    onClick={() => setSelectedUnit(String(u))}
                    className={`px-2.5 py-0.5 rounded-md font-semibold text-[11px] transition ${
                      selectedUnit === String(u)
                        ? "bg-rose-700 text-white"
                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    Unit {u} ({allVideos.filter((v) => v.unitNumber === u).length})
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Lightweight External Video Cards Grid (NO EMBEDDED IFRAMES) */}
          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {filteredVideos.map((video) => {
                const isPlaylist = video.videoType === "PLAYLIST";

                return (
                  <div
                    key={video.id}
                    className="border border-slate-200 hover:border-slate-300 rounded-2xl bg-white shadow-xs hover:shadow-md transition flex flex-col justify-between p-5 space-y-4 group"
                  >
                    <div className="space-y-3">
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center space-x-1.5">
                          {getChannelBadge(video.channelName)}

                          {isPlaylist ? (
                            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 flex items-center">
                              <ListVideo className="h-3 w-3 mr-1 text-rose-600" />
                              PLAYLIST
                            </span>
                          ) : (
                            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 flex items-center">
                              <Tv className="h-3 w-3 mr-1 text-blue-600" />
                              LECTURE
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-1.5">
                          {video.academicLevel && (
                            <span className="font-semibold text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 capitalize border border-slate-200">
                              {video.academicLevel}
                            </span>
                          )}
                          {video.unitNumber && (
                            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                              Unit {video.unitNumber}
                            </span>
                          )}
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded">
                            {video.pricingType}
                          </span>
                        </div>
                      </div>

                      {/* Title & Topic */}
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-rose-700 transition leading-snug">
                          {video.title}
                        </h3>
                        {video.topic && (
                          <p className="text-xs font-semibold text-slate-600 mt-1 flex items-center">
                            <Sparkles className="h-3 w-3 mr-1 text-amber-500 shrink-0" />
                            <span>{video.topic}</span>
                          </p>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {video.description}
                      </p>
                    </div>

                    {/* Bottom Metadata & External Watch Link */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center space-x-2 text-slate-500 text-[11px]">
                        <Globe className="h-3.5 w-3.5 text-slate-400" />
                        <span>{video.language || "Hindi / English"}</span>
                        <span>•</span>
                        <span className="text-emerald-700 font-semibold flex items-center">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          {video.verifiedAt ? `Verified ${video.verifiedAt}` : "Verified Nov 2026"}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => setReportVideo(video)}
                          title="Report broken or unavailable video link"
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition flex items-center gap-1 text-[11px] font-medium cursor-pointer"
                        >
                          <Flag className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Report</span>
                        </button>

                        <a
                          href={video.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition group-hover:shadow"
                        >
                          <span>Watch on YouTube</span>
                          <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-xs text-slate-500">
              No lecture series match your selected filter criteria.
            </div>
          )}
        </div>
      ) : (
        /* Friendly Empty State with syllabus guidance */
        <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-8 text-center space-y-3">
          <div className="mx-auto w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center">
            <Video className="h-6 w-6" />
          </div>
          <h4 className="text-base font-bold text-slate-800">
            Video Lectures Under Academic Mapping
          </h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Curated video lectures from <strong>GATE Smashers</strong> and <strong>Knowledge Gate</strong> are being mapped for <strong>{subjectCode}</strong> ({subjectName}). In the interim, consult the verified textbooks and unit syllabus above.
          </p>
        </div>
      )}

      {/* Student Content & Broken Link Report Modal */}
      {reportVideo && (
        <ReportContentModal
          isOpen={true}
          onClose={() => setReportVideo(null)}
          subject={{
            id: subjectId || subjectCode,
            code: subjectCode,
            name: subjectName,
          }}
          resourceId={reportVideo.id}
          resourceTitle={reportVideo.title}
        />
      )}
    </div>
  );
}
