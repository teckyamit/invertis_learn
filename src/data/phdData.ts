/**
 * Invertis Learn — Ph.D. in Computer Science & Engineering Hub Data
 * Official university references:
 * - Program: https://www.invertisuniversity.ac.in/doctoral-programmes/phd-cse
 * - Coursework syllabus: https://www.invertisuniversity.ac.in/pdf-course-structure/doctoral/cse-first-year-Syllabus.pdf
 */

export interface PhdProgramOverview {
  programCode: string;
  name: string;
  department: string;
  faculty: string;
  institution: string;
  duration: string;
  degreeLevel: string;
  officialProgramUrl: string;
  officialSyllabusUrl: string;
  eligibility: string[];
  admissionProcess: {
    step: number;
    title: string;
    description: string;
    exemption?: string;
  }[];
  courseworkStructure: {
    paperCode: string;
    title: string;
    credits: number;
    type: "COMPULSORY" | "DEPARTMENTAL" | "ETHICS" | "SEMINAR" | "ELECTIVE";
    description: string;
    modules: {
      title: string;
      topics: string[];
    }[];
    referenceBooks?: string[];
  }[];
  doctoralMilestones: {
    phase: string;
    timeline: string;
    title: string;
    description: string;
    deliverables: string[];
  }[];
}

export interface ResearchTool {
  id: string;
  name: string;
  category: 
    | "Literature Discovery"
    | "Reference Management"
    | "Academic Writing"
    | "Programming & Development"
    | "Machine Learning & Deep Learning"
    | "Data Science & Statistics"
    | "Experiment Tracking"
    | "Version Control"
    | "Research Visualization"
    | "Academic Integrity";
  website: string;
  purpose: string;
  accessType: "Free" | "Open-Source" | "Freemium" | "Institutional" | "Paid";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  installGuide: string;
  useCases: string[];
  learningResources: {
    title: string;
    url: string;
  }[];
}

export interface ResearchTopic {
  id: string;
  area: string;
  title: string;
  fundamentals: string;
  illustrativeProblems: string[];
  keyTools: string[];
  suggestedReading: {
    title: string;
    type: string;
    relevance: string;
  }[];
  methodology: string;
  evaluationMetrics: string[];
}

export interface ResearchTutorial {
  id: string;
  toolName: string;
  tier: "Beginner" | "Intermediate" | "Advanced";
  title: string;
  summary: string;
  estimatedTime: string;
  prerequisites: string[];
  steps: {
    stepNumber: number;
    title: string;
    explanation: string;
    codeSnippet?: string;
    language?: string;
    tip?: string;
  }[];
}

export interface VivaQuestion {
  id: number;
  category: "Problem & Motivation" | "Methodology & Design" | "Experiments & Validation" | "Limitations & Defense" | "Future Work & Contribution";
  question: string;
  examinerFocus: string;
  recommendedResponse: string;
}

// --------------------------------------------------------------------------
// 1. Ph.D. PROGRAM DETAILS & OFFICIAL COURSEWORK SYLLABUS
// --------------------------------------------------------------------------
export const PHD_PROGRAM_DETAILS: PhdProgramOverview = {
  programCode: "PHD-009",
  name: "Doctor of Philosophy (Ph.D.) in Computer Science & Engineering",
  department: "Department of Computer Science & Engineering",
  faculty: "Invertis Institute of Engineering & Technology (IIET)",
  institution: "Invertis University, Bareilly, Uttar Pradesh",
  duration: "Minimum 3 Years (6 Semesters) — Maximum 6 Years",
  degreeLevel: "Doctoral Degree (Highest Academic Research Credential)",
  officialProgramUrl: "https://www.invertisuniversity.ac.in/doctoral-programmes/phd-cse",
  officialSyllabusUrl: "https://www.invertisuniversity.ac.in/pdf-course-structure/doctoral/cse-first-year-Syllabus.pdf",
  eligibility: [
    "Master’s degree in Engineering / Technology (M.Tech / M.E.) in CSE, IT, ECE, or MCA / M.Sc. in Computer Science from any recognized university with minimum 55% aggregate marks (or equivalent CGPA).",
    "A relaxation of 5% marks (from 55% to 50%) is permissible for candidates belonging to SC, ST, OBC (non-creamy layer), and differently-abled categories under UGC regulations.",
    "Candidates who have qualified UGC-NET (including JRF), CSIR-NET (JRF), SLET, GATE, or hold a recognized Teacher Fellowship are exempt from the written entrance examination."
  ],
  admissionProcess: [
    {
      step: 1,
      title: "Invertis University Ph.D. Entrance Examination (IUCET / Written Test)",
      description: "A comprehensive written test comprising 50% Research Methodology and 50% Subject-Specific Computer Science & Engineering core topics (Algorithms, Networks, Operating Systems, DBMS). Qualifying threshold is 50% marks (45% for reserved categories).",
      exemption: "UGC-NET (JRF), CSIR-NET (JRF), SLET, and GATE qualified candidates are exempt from the written test."
    },
    {
      step: 2,
      title: "Research Proposal Presentation & Departmental Interview",
      description: "Shortlisted candidates appear before the Departmental Research Committee (DRC) to present their tentative research proposal, problem interest, literature awareness, and academic competence.",
    },
    {
      step: 3,
      title: "Research Advisory Committee (RAC) Formation & Supervisor Allocation",
      description: "Upon provisional selection, the university assigns a recognized Ph.D. research supervisor and constitutes the Research Advisory Committee (RAC) to mentor the scholar through coursework and dissertation work.",
    },
    {
      step: 4,
      title: "Coursework Registration & Completion (Mandatory First Year)",
      description: "Scholars must successfully complete minimum prescribed credits of doctoral coursework within the first year with at least 55% aggregate marks (or equivalent Grade B in UGC 10-point scale) to confirm registration.",
    }
  ],
  courseworkStructure: [
    {
      paperCode: "PhDRM 101",
      title: "Research Methodology",
      credits: 4,
      type: "COMPULSORY",
      description: "Foundational compulsory doctoral paper covering systematic research design, scientific investigation, statistical analysis, hypothesis testing, literature synthesis, and scholarly writing.",
      modules: [
        {
          title: "Unit I: Foundations & Objectives of Research",
          topics: [
            "Meaning, objectives, and motivation of scientific and engineering research",
            "Types of research: Descriptive vs. Analytical, Applied vs. Fundamental, Quantitative vs. Qualitative, Conceptual vs. Empirical",
            "Research methods vs. research methodology: epistemology and design principles",
            "Criteria of good scientific research and ethical imperatives"
          ]
        },
        {
          title: "Unit II: Research Problem Formulation & Literature Survey",
          topics: [
            "Identifying, delineating, and formulating engineering research problems",
            "Systematic literature review methodologies (PRISMA framework and synthesis matrices)",
            "Formulation of null and alternate hypotheses (H0 vs. H1)",
            "Research design principles: exploratory, descriptive, experimental, and quasi-experimental designs",
            "Sampling methods, measurement errors, and instrument calibration"
          ]
        },
        {
          title: "Unit III: Data Analysis, Statistical Inference & Software Tools",
          topics: [
            "Quantitative data processing: descriptive statistics, dispersion, and central tendencies",
            "Probability distributions in computer systems: Normal, Poisson, Exponential, and Binomial",
            "Inferential statistics: parametric vs. non-parametric hypothesis tests (t-test, z-test, ANOVA, Mann-Whitney U, Kruskal-Wallis, Chi-square)",
            "Correlation, multi-variable linear regression, and logistic regression analysis",
            "Statistical computing environments: Introduction to R and Python (SciPy/Statsmodels) for experimental data analysis"
          ]
        },
        {
          title: "Unit IV: Scholarly Dissemination, Technical Writing & Reference Management",
          topics: [
            "Structure of an academic engineering paper (IMRaD framework: Introduction, Methods, Results, and Discussion)",
            "Thesis chapter structuring, formatting regulations, and dissertation layout standards",
            "Citation standards: IEEE, ACM, APA, and Vancouver formats",
            "Reference management tools: Automated citation workflows with Zotero, Mendeley, and BibTeX",
            "Conference presentation strategies and peer-review rebuttal formulation"
          ]
        },
        {
          title: "Unit V: Research Ethics, Plagiarism & Intellectual Property Rights",
          topics: [
            "UGC regulations on academic integrity and prevention of plagiarism in higher educational institutions",
            "Similarity detection thresholds, text recycling, self-plagiarism, and attribution ethics",
            "Plagiarism detection tools (Turnitin, Urkund/Ouriginal) and interpretation of similarity reports",
            "Intellectual property rights (IPR): Patents, Copyrights, Trademarks, Trade Secrets, and Technology Transfer",
            "Open source software licensing (GPL, MIT, Apache) and academic data sharing ethics"
          ]
        }
      ]
    },
    {
      paperCode: "PhD-032",
      title: "Advance Research Studies in Computer Engineering",
      credits: 4,
      type: "DEPARTMENTAL",
      description: "Official core departmental doctoral syllabus covering Data Warehousing and Mining, Advanced Computer Networks and Ad-hoc Networks, and Research Simulation Tools (MatLab & NS-2).",
      modules: [
        {
          title: "Module-I (Data Warehouse and Mining)",
          topics: [
            "Introduction to Data Warehousing: Client/Server Computing mode, Parallel processors & Cluster Systems",
            "Data Warehousing Components, Building a Data Warehouse, Mapping the Data Warehousing to a Multiprocessor Architecture",
            "DBMS Schemas for Decision Support (Star, Snowflake and Fact Constellation Schemas)",
            "Introduction to Data Mining: Decision Trees, Neural Networks, Nearest Neighbor & Clustering",
            "Genetic Algorithms, Rule Induction, Selecting & Using the Right Technique"
          ]
        },
        {
          title: "Module-II (Advance Computer Network and Ad-hoc Networks)",
          topics: [
            "Next Generation IP protocol (IPv6), TCP extensions for high speed networks, Introduction to SCTP",
            "P2P file sharing and structured overlay networks",
            "Introduction to wireless and ad-hoc networks, Mobility in networks",
            "Mobile IP, Mobile TCP, advantages and limitations of ad-hoc networks",
            "Routing in Mobile Ad-hoc Networks (MANETs)"
          ]
        },
        {
          title: "Module-III (Simulation & Research Tools)",
          topics: [
            "Introduction to MatLab for computational modeling and algorithmic experimentation",
            "Introduction to NS-2 (Network Simulator 2) for discrete event network protocol simulation and performance evaluation"
          ]
        }
      ]
    },
    {
      paperCode: "PhDCS 103",
      title: "Software Project Management",
      credits: 4,
      type: "ELECTIVE",
      description: "Official doctoral elective syllabus on project management frameworks, PMI processes, lifecycle estimation models, risk controls, and automated test management.",
      modules: [
        {
          title: "MODULE I: Project Overview, Planning Phase & Estimation",
          topics: [
            "Overview of Project Management, PMI Processes, Software project phases, Organizational structures",
            "Project charter, Statement of Work (SOW)",
            "Planning Phase: Development lifecycle models, Matching lifecycles to projects, Project plans, Work Breakdown Structures (WBS)",
            "Estimation and Budgeting: Estimation, Budgeting, Project selection, NPV, ROI, Payback models"
          ]
        },
        {
          title: "MODULE II: Scheduling, Risk & Development Management",
          topics: [
            "Scheduling: Project network diagram fundamentals, PERT techniques, Gantt charts, Critical chain scheduling",
            "Risk and Change Management: Mid-term review, Risk management, Change control, More MS-Project",
            "Development Management: Team models, Requirements process, Configuration management, Software metrics, Programming languages & tools, Managing conflict and motivating",
            "MS-Project: Assigning Resources"
          ]
        },
        {
          title: "MODULE III: Project Control, System Test Process & Final Phases",
          topics: [
            "Project Control: Status reporting, Project metrics, Earned value analysis, Communications Techniques, Process Improvement, MS Project: (a) Resource leveling (b) Other views",
            "System Test Process: Test specifications, Black box and white box testing, Test scripts, Unit and integration testing, Acceptance test specifications, Test tools, MS Project: (a) Reporting",
            "Final Phases & Other Issues: Project Recovery, Documentation, Cutover/Migration Post Project Reviews, Closing, MS Project: (a) Advanced features"
          ]
        }
      ],
      referenceBooks: [
        "S. McConnell, 'Software Project Survival Guide' (1997)",
        "S. Berkun, 'The Art of Project Management', (2005)",
        "C. Larman, 'Agile and Iterative Development: A Manager\'s Guide', (2003)",
        "W. Royce, 'Software Project Management: A Unified Framework', (1998)",
        "J. Highsmith, 'Agile Project Management: Creating Innovative Products', (2004)",
        "T. DeMarco, 'The Deadline: A Novel About Project Management', (1997)",
        "T. DeMarco, 'Peopleware: Productive Projects and Teams', (1999)",
        "E. Bennatan, 'On Time Within Budget: Software Project Management Practices and Techniques', (2000)"
      ]
    },
    {
      paperCode: "PhDCS 104",
      title: "Networking Protocols",
      credits: 4,
      type: "ELECTIVE",
      description: "Official doctoral elective syllabus covering OSI/TCP-IP internetworking, routing algorithms, ATM convergence, client-server socket programming, and IPv6 transitions.",
      modules: [
        {
          title: "MODULE I: Networks & Services, OSI Reference Model & IP Routing",
          topics: [
            "Networks and Services, Approaches to Network Design, The OSI Reference Model",
            "Overview of TCP/IP Architecture, Application Protocols and TCP/IP Utilities",
            "Internet Architecture Interconnection through IP Routers",
            "Internet Protocol (IP), User Datagram Protocol (UDP)"
          ]
        },
        {
          title: "MODULE II: Routing Cores, Multicast, ATM Networks & Internet Services",
          topics: [
            "Routing Cores - peers Algorithms Autonomous Systems Exterior Gateway Protocol Multicast Address",
            "Internet Group Management Protocol (IGMP) and Implementation",
            "TCP/IP over ATM networks: ATM cell Transport, Adaptation Layer, IP Address Building in an ATM network Logical IP subnet Concept ATMARP packet format",
            "Domain name system (DNS), Remote Login (Telnet, Rlogin), File Transfer and Access (FTP, TFTP, NFS), Electronic mail (SMTP, MIME)",
            "Internet Management (SNMP, SNMPV2), Internet Security and Firewall Design, Post Office Protocol (POP), Network News Transfer Protocol (NNTP)"
          ]
        },
        {
          title: "MODULE III: TCP/IP Transport Layer, Socket API & Client-Server Systems",
          topics: [
            "TCP/IP overview - The Transport Layer: TCP and UDP. Elementary TCP Sockets. TCP Client-Server Example",
            "I/O Multiplexing: The select and poll Functions. Socket Options. Elementary UDP Sockets. Elementary Name and Address Conversions",
            "The Client Server Model and Software Design, Concurrent Processing in Client-Server Software, Iterative, Connectionless Servers (UDP), Iterative, Connection-Oriented Servers (TCP), Concurrent, Connection-Oriented Servers (TCP)",
            "Single-Process, Concurrent Servers (TCP). Multiprotocol Servers (TCP, UDP), Multiservice Servers (TCP, UDP). Uniform, Efficient Management of server. Concurrency in clients",
            "TCP/IP Architecture, The Internet Protocol, Limitations of IPv4 and Introduction to IPv6, User Datagram Protocol, Transmission Control Protocol, DHCP, Introduction to Internet Routing Protocols"
          ]
        }
      ],
      referenceBooks: [
        "A. Leon-Garcia, Indra Widjaja, 'Communication Networks', Tata McGraw Hill, 2000",
        "William Stallings, 'Data and Computer Communications', Pearson Education, 7th Edition",
        "Andrew S. Tanenbaum, 'Computer Networks', Prentice Hall India, 4th Edition, 2003",
        "W. Richard Stevens: 'TCP/IP Illustrated vol 1: The Protocols', Pearson Edun. Asia, 2000",
        "Douglas Comer: 'Internetworking with TCP/IP vol.1: Principles, Protocols and Architecture', Prentice Hall, 4th edition, 2000"
      ]
    },
    {
      paperCode: "PhDCS 105",
      title: "Real Time Systems",
      credits: 4,
      type: "ELECTIVE",
      description: "Official doctoral elective syllabus on real-time task scheduling, aperiodic/sporadic servers, priority ceiling protocols, and multiprocessor predictability.",
      modules: [
        {
          title: "MODULE I: Issues in Real Time Computing, Task Models & Scheduling",
          topics: [
            "Time System, Issues in real time computing, Performance measures of Real Time System, Issues in Real Time Computing, Performance measures of Real time Systems, Real Time Application",
            "Task Assignment and Scheduling: Different task model, Scheduling hierarchy, offline vs Online Scheduling, Clock Drives",
            "Model of Real Time System: Processor, resources, temporal parameter, Periodic Task Model, Sporadic Task Model, Precedence Constraints and Data Dependencies, Scheduling hierarchy",
            "Scheduling of Periodic Task: Assumptions, fixed versus dynamic priority algorithms, schedulability test for fixed priority task with arbitrary deadlines"
          ]
        },
        {
          title: "MODULE II: Scheduling of Aperiodic & Sporadic Tasks",
          topics: [
            "Scheduling of Aperiodic and Sporadic Tasks: Assumptions and approaches, deferrable, sporadic servers",
            "Slack stealing in deadline driven and fixed priority systems",
            "Two level scheme for integrated scheduling, Scheduling for applications having flexible constraints"
          ]
        },
        {
          title: "MODULE III: Resources Access Control & Real Time Protocols",
          topics: [
            "Resources and Resource Access Control: Assumptions on resources and their usage, resource contention",
            "Resource access control: Priority Ceiling Protocol, Priority Inheritance protocol, Slack Based Priority Ceiling Protocol, Preemption Ceiling Protocol",
            "Multi Processor Scheduling: Model of multi processor and distributed systems, Scheduling algorithms for end to end periodic tasks in homogeneous/heterogeneous systems, Predictability and validation of dynamic multiprocessor system",
            "Real time Communication: Model of real time Communication, Priority base service For switched network, Weighted Round Robin Service, Medium access Control Protocol, Real Time Protocol"
          ]
        }
      ],
      referenceBooks: [
        "Jane W. S. Liu, 'Real Time Systems', Pearson Education",
        "Krishna C.M, 'Real Time Systems', Mc-Graw Hill Publication"
      ]
    },
    {
      paperCode: "RPE 101",
      title: "Research and Publication Ethics (UGC Mandated)",
      credits: 2,
      type: "ETHICS",
      description: "University Grants Commission (UGC) mandated 2-credit course covering moral philosophy, scientific misconduct, publication ethics, predatory publishing awareness, and database metrics.",
      modules: [
        {
          title: "Philosophy, Ethics & Scientific Misconduct",
          topics: [
            "Moral philosophy, nature of moral judgments and reactions, professional ethics",
            "Scientific misconduct: Fabrication, Falsification, and Plagiarism (FFP)",
            "Redundant and duplicate publications, salami slicing, selective reporting, and misrepresentation of data"
          ]
        },
        {
          title: "Publication Ethics, Predatory Publishing & Metrics",
          topics: [
            "Committee on Publication Ethics (COPE) guidelines and best practices",
            "Authorship disputes, gift and ghost authorship, contributor-ship, and conflicts of interest",
            "Predatory journals and publishers: Identifying fake metrics, deceptive conferences, and hijackings (Think-Check-Submit)",
            "Indexing and citation databases: Web of Science (SCIE), Scopus, PubMed, IEEE Xplore, ACM Digital Library",
            "Research impact metrics: Journal Impact Factor (Clarivate), CiteScore, SNIP, SJR, h-index, g-index, i10-index, and Altmetrics"
          ]
        }
      ]
    },
    {
      paperCode: "PhD-SEM",
      title: "Doctoral Seminar & Research Literature Review",
      credits: 2,
      type: "SEMINAR",
      description: "Critical literature survey paper presented before the Departmental Research Committee (DRC) focusing on candidate's chosen research domain, identifying key gaps, and formulating the initial research proposal.",
      modules: [
        {
          title: "Literature Survey & Seminar Defense",
          topics: [
            "Comprehensive review of minimum 30–50 high-impact peer-reviewed papers in the domain",
            "Preparation of a state-of-the-art survey document with comparative taxonomy",
            "Oral defense and presentation before the Research Advisory Committee (RAC)"
          ]
        }
      ]
    }
  ],
  doctoralMilestones: [
    {
      phase: "Year 1 (Semesters I & II)",
      timeline: "Months 1–12",
      title: "Coursework, RAC Formation & Comprehensive Examination",
      description: "Scholar completes mandatory doctoral coursework papers (PhDRM 101, PhD-032, RPE 101, Seminar), attends RAC progress meetings, and passes the departmental Comprehensive Examination.",
      deliverables: [
        "Coursework grade sheet (minimum 55% aggregate required)",
        "Constitution of Research Advisory Committee (RAC)",
        "Literature review survey paper draft",
        "Clearance of Comprehensive Written/Oral Examination"
      ]
    },
    {
      phase: "Year 1.5 (Semester III)",
      timeline: "Months 12–18",
      title: "Synopsis Presentation & Ph.D. Registration Defense",
      description: "Candidate submits the detailed Ph.D. Synopsis containing research questions, proposed methodology, preliminary results, and work plan, and defends it before the Departmental Research Committee (DRC).",
      deliverables: [
        "Formal Ph.D. Synopsis document submitted to University Academic Council",
        "Successful open oral defense before DRC and external subject expert",
        "Formal Ph.D. Registration Letter issued by the Registrar"
      ]
    },
    {
      phase: "Year 2 to 2.5 (Semesters IV & V)",
      timeline: "Months 18–30",
      title: "Core Research, Experimentation & SCI/Scopus Publications",
      description: "Intensive algorithm development, simulation, dataset collection, baseline benchmarking, and submission of peer-reviewed research papers to indexed journals.",
      deliverables: [
        "Half-yearly progress reports submitted to RAC",
        "Minimum 2 research papers published/accepted in SCI/SCIE/Scopus-indexed peer-reviewed journals",
        "Presentation of research work at recognized IEEE / ACM international conferences",
        "Experimental artifacts, reproducible codebase, and benchmark validation"
      ]
    },
    {
      phase: "Year 3+ (Semester VI & Beyond)",
      timeline: "Months 30–36+",
      title: "Pre-Submission Colloquium, Thesis Submission & Final Defense",
      description: "Candidate delivers the Pre-Submission Seminar, verifies plagiarism thresholds, finalizes the doctoral dissertation, submits for external evaluation, and defends the thesis in an open Viva Voce.",
      deliverables: [
        "Pre-Submission Colloquium approval by DRC",
        "Plagiarism verification certificate (<10% similarity on Turnitin/Urkund excluding bibliography)",
        "Formal Ph.D. Dissertation submitted to Controller of Examinations",
        "Positive evaluation reports from 2 independent external referees",
        "Public Viva Voce defense & award of Doctor of Philosophy degree"
      ]
    }
  ]
};

// --------------------------------------------------------------------------
// 2. PH.D. RESEARCH TOOLKIT (40+ TOOLS ACROSS 10 CATEGORIES)
// --------------------------------------------------------------------------
export const RESEARCH_TOOLS: ResearchTool[] = [
  // Literature Discovery
  {
    id: "tool-google-scholar",
    name: "Google Scholar",
    category: "Literature Discovery",
    website: "https://scholar.google.com",
    purpose: "Universal search engine indexing peer-reviewed papers, preprints, theses, books, and conference proceedings across all disciplines.",
    accessType: "Free",
    difficulty: "Beginner",
    installGuide: "Web-based; sign in with your Google account to create a scholar profile and set publication alerts.",
    useCases: [
      "Broad keyword and author search",
      "Tracking citations and forward citation trees",
      "Exporting formatted BibTeX entries",
      "Monitoring newly published papers via keyword email alerts"
    ],
    learningResources: [
      { title: "Google Scholar Search Operators Guide", url: "https://scholar.google.com/intl/en/scholar/help.html" }
    ]
  },
  {
    id: "tool-semantic-scholar",
    name: "Semantic Scholar",
    category: "Literature Discovery",
    website: "https://www.semanticscholar.org",
    purpose: "AI-powered academic search engine developed by the Allen Institute for AI, providing TLDR summaries and highly influential citation metrics.",
    accessType: "Free",
    difficulty: "Beginner",
    installGuide: "Web-based; create a free account to build research libraries and feed personalized recommendations.",
    useCases: [
      "Fast paper triage using automated TLDR summaries",
      "Differentiating background citations from foundational methodology citations",
      "Discovering seminal papers via graph-based citation mapping"
    ],
    learningResources: [
      { title: "Semantic Scholar FAQ & Research Guide", url: "https://www.semanticscholar.org/faq" }
    ]
  },
  {
    id: "tool-connected-papers",
    name: "Connected Papers",
    category: "Literature Discovery",
    website: "https://www.connectedpapers.com",
    purpose: "Visual tool generating visual graphs of related papers based on co-citation and bibliographic coupling.",
    accessType: "Freemium",
    difficulty: "Beginner",
    installGuide: "Web-based platform. Free tier supports 5 graphs per month; academic discount available.",
    useCases: [
      "Exploring the research landscape of an unfamiliar topic in minutes",
      "Finding seminal antecedent works and recent derivative papers",
      "Visualizing clusters of related methodologies"
    ],
    learningResources: [
      { title: "Connected Papers User Manual", url: "https://www.connectedpapers.com/about" }
    ]
  },
  {
    id: "tool-arxiv",
    name: "arXiv.org",
    category: "Literature Discovery",
    website: "https://arxiv.org",
    purpose: "Premier open-access preprint repository for Computer Science, Mathematics, Physics, and Electrical Engineering.",
    accessType: "Open-Source",
    difficulty: "Beginner",
    installGuide: "Web-based; open access without registration. Free author account required to upload preprints.",
    useCases: [
      "Accessing cutting-edge research 6–18 months before formal journal publication",
      "Publishing author preprints to establish early priority",
      "Daily RSS feeds for cs.AI, cs.LG, cs.CV, cs.CR, and cs.CL categories"
    ],
    learningResources: [
      { title: "arXiv Submission & Discovery Primer", url: "https://info.arxiv.org/help/index.html" }
    ]
  },
  {
    id: "tool-dblp",
    name: "DBLP Computer Science Bibliography",
    category: "Literature Discovery",
    website: "https://dblp.org",
    purpose: "The definitive bibliographical database for computer science, indexing verified conferences, journals, and workshops.",
    accessType: "Free",
    difficulty: "Beginner",
    installGuide: "Web-based; no installation required.",
    useCases: [
      "Finding verified author publication records without disambiguation noise",
      "Verifying volume, issue, and page numbers for conference proceedings",
      "Downloading verified, clean BibTeX records"
    ],
    learningResources: [
      { title: "DBLP Tutorial & API", url: "https://dblp.org/faq/index.html" }
    ]
  },
  {
    id: "tool-scopus",
    name: "Scopus (Elsevier)",
    category: "Literature Discovery",
    website: "https://www.scopus.com",
    purpose: "World's largest abstract and citation database of peer-reviewed literature, scientific journals, books, and conference proceedings.",
    accessType: "Institutional",
    difficulty: "Intermediate",
    installGuide: "Accessible via university library subscription / institutional IP or proxy login.",
    useCases: [
      "Verifying whether a prospective journal is currently indexed in Scopus",
      "Checking journal CiteScore, SJR, and SNIP metrics",
      "Complex Boolean citation searches and author h-index tracking"
    ],
    learningResources: [
      { title: "Scopus Search Guide", url: "https://service.elsevier.com/app/answers/detail/a_id/11236/supporthub/scopus/" }
    ]
  },

  // Reference Management
  {
    id: "tool-zotero",
    name: "Zotero",
    category: "Reference Management",
    website: "https://www.zotero.org",
    purpose: "Free, open-source reference manager that collects, organizes, annotates, cites, and shares research sources.",
    accessType: "Open-Source",
    difficulty: "Beginner",
    installGuide: "Download Zotero desktop application (Windows/macOS/Linux) and install the 'Zotero Connector' extension in Chrome/Firefox.",
    useCases: [
      "One-click paper metadata and PDF saving from browser",
      "Auto-renaming and organizing downloaded PDF files",
      "Exporting auto-updating .bib files for Overleaf via Better BibTeX plugin",
      "Highlighting and taking persistent notes directly inside PDFs"
    ],
    learningResources: [
      { title: "Zotero Quick Start Guide", url: "https://www.zotero.org/support/quick_start_guide" }
    ]
  },
  {
    id: "tool-mendeley",
    name: "Mendeley Reference Manager",
    category: "Reference Management",
    website: "https://www.mendeley.com",
    purpose: "Academic reference manager by Elsevier featuring PDF annotation, shared group libraries, and MS Word citation integration.",
    accessType: "Freemium",
    difficulty: "Beginner",
    installGuide: "Download desktop installer from mendeley.com; install Mendeley Web Importer and Mendeley Cite for Microsoft Word.",
    useCases: [
      "Cloud-synchronized PDF reading across desktop and tablet",
      "Inserting live citations and bibliographies into Microsoft Word",
      "Collaborative reading groups with research team members"
    ],
    learningResources: [
      { title: "Mendeley User Documentation", url: "https://www.mendeley.com/guides" }
    ]
  },
  {
    id: "tool-jabref",
    name: "JabRef",
    category: "Reference Management",
    website: "https://www.jabref.org",
    purpose: "Open-source desktop bibliography manager natively designed around the BibTeX/BibLaTeX format for LaTeX researchers.",
    accessType: "Open-Source",
    difficulty: "Intermediate",
    installGuide: "Download installer from jabref.org (Java-based, multi-platform).",
    useCases: [
      "Direct editing and cleansing of .bib files",
      "Automatic DOI lookup and citation key formatting",
      "Integrating directly with TeXstudio and Emacs"
    ],
    learningResources: [
      { title: "JabRef Documentation", url: "https://docs.jabref.org/" }
    ]
  },

  // Academic Writing
  {
    id: "tool-overleaf",
    name: "Overleaf",
    category: "Academic Writing",
    website: "https://www.overleaf.com",
    purpose: "Collaborative cloud-based LaTeX editor with real-time compilation, version tracking, and thousands of official publisher templates.",
    accessType: "Freemium",
    difficulty: "Beginner",
    installGuide: "Web-based; register with your institutional or personal email address.",
    useCases: [
      "Real-time co-authoring of manuscripts with supervisors",
      "Writing papers using official IEEE, ACM, Springer, and Elsevier templates",
      "Seamless mathematical typesetting and vector graphic placement",
      "Direct Git synchronization and track-changes review"
    ],
    learningResources: [
      { title: "Learn LaTeX in 30 Minutes (Overleaf)", url: "https://www.overleaf.com/learn/latex/Learn_LaTeX_in_30_minutes" }
    ]
  },
  {
    id: "tool-texstudio",
    name: "TeXstudio",
    category: "Academic Writing",
    website: "https://www.texstudio.org",
    purpose: "Powerful offline LaTeX IDE with syntax highlighting, built-in PDF viewer with synctex, structure navigation, and spell checking.",
    accessType: "Open-Source",
    difficulty: "Intermediate",
    installGuide: "First install MiKTeX (Windows) or TeX Live (Linux/macOS), then install TeXstudio from texstudio.org.",
    useCases: [
      "Offline writing of long-form doctoral dissertations",
      "Fast local compilation of large multi-file documents (thesis chapters)",
      "Advanced regex search and replace across chapter files"
    ],
    learningResources: [
      { title: "TeXstudio User Manual", url: "https://texstudio-org.github.io/manual/current/usermanual_en.html" }
    ]
  },
  {
    id: "tool-languagetool",
    name: "LanguageTool",
    category: "Academic Writing",
    website: "https://languagetool.org",
    purpose: "Open-source, privacy-respecting grammar, style, and spell checker supporting over 30 languages.",
    accessType: "Freemium",
    difficulty: "Beginner",
    installGuide: "Install browser extension or desktop app; integrates with LibreOffice, Google Docs, and browser textareas.",
    useCases: [
      "Checking academic tone, passive voice balance, and conciseness",
      "Detecting punctuation inconsistencies and common non-native speaker phrasing errors",
      "Privacy-safe checking of unpublished research drafts"
    ],
    learningResources: [
      { title: "LanguageTool User Guide", url: "https://languagetool.org/insights/" }
    ]
  },

  // Programming & Development
  {
    id: "tool-python",
    name: "Python (CPython)",
    category: "Programming & Development",
    website: "https://www.python.org",
    purpose: "The dominant programming language in computer science research, machine learning, data science, and scientific computing.",
    accessType: "Open-Source",
    difficulty: "Beginner",
    installGuide: "Download Python 3.11+ from python.org or install via Miniconda / Anaconda for isolated scientific environments.",
    useCases: [
      "Developing experimental algorithms and mathematical simulations",
      "Data wrangling, automated web scraping, and benchmark pipelines",
      "Machine learning model training with PyTorch/TensorFlow"
    ],
    learningResources: [
      { title: "Official Python Scientific Tutorial", url: "https://docs.python.org/3/tutorial/" }
    ]
  },
  {
    id: "tool-vscode",
    name: "Visual Studio Code (VS Code)",
    category: "Programming & Development",
    website: "https://code.visualstudio.com",
    purpose: "Lightweight, extensible code editor with first-class support for Python, Jupyter, LaTeX, Git, and remote server development via SSH.",
    accessType: "Open-Source",
    difficulty: "Beginner",
    installGuide: "Download from code.visualstudio.com. Recommended extensions: Python, Pylance, Jupyter, LaTeX Workshop, and Remote - SSH.",
    useCases: [
      "Editing research scripts, Jupyter notebooks, and LaTeX files in one window",
      "Debugging Python research code with interactive breakpoints",
      "Remote development directly on departmental GPU computing servers"
    ],
    learningResources: [
      { title: "VS Code for Python Guide", url: "https://code.visualstudio.com/docs/python/python-tutorial" }
    ]
  },
  {
    id: "tool-docker",
    name: "Docker",
    category: "Programming & Development",
    website: "https://www.docker.com",
    purpose: "Platform for developing, shipping, and running applications in isolated software containers, ensuring 100% reproducible experiments.",
    accessType: "Freemium",
    difficulty: "Intermediate",
    installGuide: "Install Docker Desktop on Windows/macOS or docker-ce on Linux servers.",
    useCases: [
      "Freezing Python versions, CUDA drivers, and library dependencies into reproducible artifacts",
      "Running complex benchmark suites without contaminating the host system",
      "Sharing reproducible evaluation containers for conference artifact evaluation"
    ],
    learningResources: [
      { title: "Docker Curriculum for Researchers", url: "https://docker-curriculum.com/" }
    ]
  },

  // Machine Learning & Deep Learning
  {
    id: "tool-pytorch",
    name: "PyTorch",
    category: "Machine Learning & Deep Learning",
    website: "https://pytorch.org",
    purpose: "The premier open-source deep learning framework based on dynamic computation graphs (Autograd) widely adopted in research.",
    accessType: "Open-Source",
    difficulty: "Intermediate",
    installGuide: "Install via conda or pip: `pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121`",
    useCases: [
      "Designing novel deep neural network architectures and loss functions",
      "Fine-tuning foundation models with GPU/TPU acceleration",
      "Implementing custom backward passes and reinforcement learning loops"
    ],
    learningResources: [
      { title: "PyTorch Deep Learning 60-Minute Blitz", url: "https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html" }
    ]
  },
  {
    id: "tool-huggingface",
    name: "Hugging Face Transformers",
    category: "Machine Learning & Deep Learning",
    website: "https://huggingface.co",
    purpose: "State-of-the-art open-source ecosystem providing thousands of pretrained foundation models (BERT, LLaMA, Mistral, ViT, Whisper).",
    accessType: "Open-Source",
    difficulty: "Intermediate",
    installGuide: "Install via pip: `pip install transformers datasets evaluate accelerate`",
    useCases: [
      "Fine-tuning LLMs with LoRA/QLoRA on specialized datasets",
      "Benchmarking transformer models across NLP and Computer Vision tasks",
      "Hosting research model checkpoints and datasets for open science"
    ],
    learningResources: [
      { title: "Hugging Face NLP Course", url: "https://huggingface.co/learn/nlp-course" }
    ]
  },
  {
    id: "tool-scikit-learn",
    name: "Scikit-Learn",
    category: "Machine Learning & Deep Learning",
    website: "https://scikit-learn.org",
    purpose: "Robust, efficient Python library providing simple and effective tools for predictive data analysis and classical machine learning.",
    accessType: "Open-Source",
    difficulty: "Beginner",
    installGuide: "Install via pip: `pip install scikit-learn`",
    useCases: [
      "Establishing baseline comparisons (SVM, Random Forests, Gradient Boosting)",
      "Cross-validation, hyperparameter grid search, and ROC/AUC computation",
      "Feature engineering, scaling, and dimensionality reduction"
    ],
    learningResources: [
      { title: "Scikit-Learn User Guide", url: "https://scikit-learn.org/stable/user_guide.html" }
    ]
  },

  // Data Science & Statistics
  {
    id: "tool-jupyter",
    name: "Jupyter Notebook & Lab",
    category: "Data Science & Statistics",
    website: "https://jupyter.org",
    purpose: "Interactive web-based computational environment combining live code execution, rich text, mathematics, plots, and rich media.",
    accessType: "Open-Source",
    difficulty: "Beginner",
    installGuide: "Install via pip: `pip install jupyterlab` or launch via Anaconda Navigator.",
    useCases: [
      "Exploratory data analysis (EDA) and rapid algorithmic prototyping",
      "Visualizing intermediate matrices, loss curves, and feature maps",
      "Sharing annotated experimental logs with supervisors"
    ],
    learningResources: [
      { title: "JupyterLab Official Documentation", url: "https://jupyterlab.readthedocs.io/en/stable/" }
    ]
  },
  {
    id: "tool-pandas",
    name: "Pandas",
    category: "Data Science & Statistics",
    website: "https://pandas.pydata.org",
    purpose: "Fast, powerful, and flexible open-source data analysis and manipulation library built on top of NumPy.",
    accessType: "Open-Source",
    difficulty: "Beginner",
    installGuide: "Install via pip: `pip install pandas`",
    useCases: [
      "Cleaning messy experimental telemetry and benchmark datasets",
      "Grouping, aggregating, and reshaping evaluation results into LaTeX tables",
      "Handling time-series, categorical, and missing sensor data"
    ],
    learningResources: [
      { title: "10 Minutes to Pandas", url: "https://pandas.pydata.org/docs/user_guide/10min.html" }
    ]
  },
  {
    id: "tool-scipy",
    name: "SciPy & Statsmodels",
    category: "Data Science & Statistics",
    website: "https://scipy.org",
    purpose: "Fundamental scientific computing libraries in Python providing statistical tests, numerical integration, optimization, and signal processing.",
    accessType: "Open-Source",
    difficulty: "Intermediate",
    installGuide: "Install via pip: `pip install scipy statsmodels`",
    useCases: [
      "Computing p-values and statistical significance (paired t-test, Wilcoxon signed-rank)",
      "Validating whether an algorithm improvement is statistically significant or random",
      "Fitting probability distributions to empirical benchmark data"
    ],
    learningResources: [
      { title: "SciPy Stats Tutorial", url: "https://docs.scipy.org/doc/scipy/tutorial/stats.html" }
    ]
  },

  // Experiment Tracking
  {
    id: "tool-wandb",
    name: "Weights & Biases (W&B)",
    category: "Experiment Tracking",
    website: "https://wandb.ai",
    purpose: "The leading developer platform for machine learning practitioners to track experiments, manage datasets, and optimize models.",
    accessType: "Freemium",
    difficulty: "Intermediate",
    installGuide: "Install via pip: `pip install wandb` and run `wandb login` with your free academic account.",
    useCases: [
      "Real-time tracking of training loss, validation accuracy, and GPU memory usage",
      "Comparing multiple training runs across learning rates and architectures",
      "Automated hyperparameter tuning sweeps (Bayesian, Random, Grid search)",
      "Saving model checkpoints and dataset artifacts"
    ],
    learningResources: [
      { title: "Weights & Biases 5-Minute Quickstart", url: "https://docs.wandb.ai/quickstart" }
    ]
  },
  {
    id: "tool-tensorboard",
    name: "TensorBoard",
    category: "Experiment Tracking",
    website: "https://www.tensorflow.org/tensorboard",
    purpose: "Suite of web applications for inspecting and understanding your machine learning runs and computational graphs.",
    accessType: "Open-Source",
    difficulty: "Beginner",
    installGuide: "Bundled with PyTorch/TensorFlow: `pip install tensorboard`",
    useCases: [
      "Local real-time visualization of loss curves and metric scalars",
      "Visualizing high-dimensional embeddings in 3D with PCA/t-SNE",
      "Displaying generated sample images, audio, and attention weights"
    ],
    learningResources: [
      { title: "TensorBoard PyTorch Tutorial", url: "https://pytorch.org/tutorials/intermediate/tensorboard_tutorial.html" }
    ]
  },

  // Version Control
  {
    id: "tool-git",
    name: "Git",
    category: "Version Control",
    website: "https://git-scm.com",
    purpose: "Distributed version control system designed to handle everything from small to massive projects with speed and integrity.",
    accessType: "Open-Source",
    difficulty: "Beginner",
    installGuide: "Download installer from git-scm.com or install via terminal: `sudo apt install git`",
    useCases: [
      "Maintaining an exact history of every change to your research code",
      "Branching to test experimental ideas without breaking stable code",
      "Tagging specific commits that produced published paper results (e.g. `v1.0-ieee-paper`)"
    ],
    learningResources: [
      { title: "Pro Git Book (Free Online)", url: "https://git-scm.com/book/en/v2" }
    ]
  },
  {
    id: "tool-github",
    name: "GitHub",
    category: "Version Control",
    website: "https://github.com",
    purpose: "Cloud platform for software development and version control using Git, offering issue tracking, code review, and automated CI/CD.",
    accessType: "Freemium",
    difficulty: "Beginner",
    installGuide: "Create account at github.com; apply for GitHub Student/Academic Developer Pack for free Pro features.",
    useCases: [
      "Hosting public research code repositories accompanying paper submissions",
      "Minting permanent Digital Object Identifiers (DOIs) via Zenodo integration",
      "Automated testing of research pipelines with GitHub Actions"
    ],
    learningResources: [
      { title: "GitHub Skills Interactive Tutorials", url: "https://skills.github.com/" }
    ]
  },

  // Research Visualization
  {
    id: "tool-matplotlib",
    name: "Matplotlib & Seaborn",
    category: "Research Visualization",
    website: "https://matplotlib.org",
    purpose: "Comprehensive Python libraries for creating publication-quality static, animated, and interactive visualizations in Python.",
    accessType: "Open-Source",
    difficulty: "Beginner",
    installGuide: "Install via pip: `pip install matplotlib seaborn`",
    useCases: [
      "Exporting vector graphics (.pdf, .eps, .svg) for direct inclusion in LaTeX papers without pixelation",
      "Plotting comparison bar charts, ablation box plots, and confusion matrices",
      "Standardizing typography and color palettes to match IEEE/ACM guidelines"
    ],
    learningResources: [
      { title: "Matplotlib Scientific Plotting Gallery", url: "https://matplotlib.org/stable/gallery/index.html" }
    ]
  },
  {
    id: "tool-drawio",
    name: "Diagrams.net (draw.io)",
    category: "Research Visualization",
    website: "https://app.diagrams.net",
    purpose: "Free, open-source diagramming software for creating publication-ready system architectures, flowcharts, and block diagrams.",
    accessType: "Open-Source",
    difficulty: "Beginner",
    installGuide: "Web-based (app.diagrams.net) or download desktop client for offline diagram editing.",
    useCases: [
      "Drawing proposed model architecture diagrams (CNNs, transformers, cloud pipelines)",
      "Exporting high-resolution vector PDFs and transparent PNGs for LaTeX",
      "Collaborative whiteboard diagramming with research supervisors"
    ],
    learningResources: [
      { title: "draw.io User Manual", url: "https://www.diagrams.net/doc/" }
    ]
  },

  // Academic Integrity
  {
    id: "tool-turnitin",
    name: "Turnitin",
    category: "Academic Integrity",
    website: "https://www.turnitin.com",
    purpose: "Industry-standard similarity detection and plagiarism prevention platform used by universities and academic publishers worldwide.",
    accessType: "Institutional",
    difficulty: "Intermediate",
    installGuide: "Access provided via Invertis University Library / Ph.D. Dean's Office coordinator account.",
    useCases: [
      "Generating mandatory pre-submission thesis similarity reports (UGC threshold <10%)",
      "Checking journal manuscript drafts prior to submission",
      "Identifying uncredited quotations, missing citations, or excessive paraphrasing"
    ],
    learningResources: [
      { title: "Interpreting Turnitin Similarity Reports", url: "https://help.turnitin.com/feedback-studio/turnitin-website/instructor/the-similarity-report/interpreting-the-similarity-report.htm" }
    ]
  }
];

// --------------------------------------------------------------------------
// 3. RESEARCH TOPIC EXPLORER (12 COMPUTER SCIENCE RESEARCH AREAS)
// --------------------------------------------------------------------------
export const RESEARCH_TOPICS: ResearchTopic[] = [
  {
    id: "topic-ai",
    area: "Artificial Intelligence",
    title: "Neuro-Symbolic AI & Knowledge Representation",
    fundamentals: "Modern AI combines connectionist deep learning representations with symbolic knowledge graphs and logical reasoning engines to enable verifiable, explainable, and sample-efficient decision-making.",
    illustrativeProblems: [
      "[Illustrative] Integrating domain knowledge graphs into deep reinforcement learning for clinical decision support systems.",
      "[Illustrative] Verifiable neuro-symbolic reasoning for autonomous vehicle perception under adverse weather conditions.",
      "[Illustrative] Automated theorem proving and logic-constrained generative modeling for safety-critical systems."
    ],
    keyTools: ["PyTorch", "PyKEEN (Knowledge Embeddings)", "Z3 Theorem Prover", "Neo4j", "Protégé"],
    suggestedReading: [
      { title: "G. Marcus, 'The Next Decades in AI: Four Steps Towards Robust Artificial Intelligence'", type: "Survey", relevance: "Outlines hybrid symbolic-connectionist foundations." },
      { title: "A. Sheth et al., 'Neurosymbolic AI = Perception + Reasoning'", type: "Foundational", relevance: "Industry standard overview of neuro-symbolic taxonomies." }
    ],
    methodology: "Construct dual-stream architectures where symbolic constraints penalize illogical latent transitions; conduct ablation studies comparing pure black-box models against neuro-symbolic hybrids.",
    evaluationMetrics: ["Reasoning Accuracy (%)", "Logical Constraint Satisfaction Rate", "Sample Complexity", "Out-of-Distribution Robustness", "Inference Latency"]
  },
  {
    id: "topic-ml",
    area: "Machine Learning",
    title: "Explainable AI (XAI) & Trustworthy Machine Learning",
    fundamentals: "Developing transparent mathematical formulations and post-hoc attribution methods that explain complex black-box predictions while ensuring algorithmic fairness, robustness, and privacy.",
    illustrativeProblems: [
      "[Illustrative] Faithful feature attribution methods for multi-modal medical diagnostics resistant to adversarial perturbations.",
      "[Illustrative] Algorithmic bias mitigation in automated credit underwriting models under concept drift.",
      "[Illustrative] Counterfactual explanation generation with minimal actionable intervention costs for end users."
    ],
    keyTools: ["SHAP (SHapley Additive exPlanations)", "LIME", "Captum (PyTorch Interpretability)", "AIF360 (Fairness 360)", "Scikit-Learn"],
    suggestedReading: [
      { title: "S. Lundberg & S. Lee, 'A Unified Approach to Interpreting Model Predictions' (NeurIPS)", type: "Seminal Paper", relevance: "Introduced SHAP values derived from game theory." },
      { title: "C. Molnar, 'Interpretable Machine Learning: A Guide for Making Black Box Models Explainable'", type: "Book", relevance: "Complete mathematical handbook for XAI." }
    ],
    methodology: "Quantify fidelity, stability, and human interpretability using rigorous sanity checks (randomization tests); benchmark against baseline feature attribution techniques.",
    evaluationMetrics: ["Infidelity", "Sensitivity-n", "Disparate Impact Ratio", "Robustness to Noise", "User Comprehension Score"]
  },
  {
    id: "topic-dl",
    area: "Deep Learning",
    title: "Self-Supervised Learning & Representation Efficiency",
    fundamentals: "Learning rich, transferrable representations from massive unlabelled multi-modal datasets through masked auto-encoding, contrastive learning, and self-distillation without expensive manual annotations.",
    illustrativeProblems: [
      "[Illustrative] Parameter-efficient contrastive visual representations for few-shot satellite imagery classification.",
      "[Illustrative] Masked latent autoencoders for self-supervised audio-visual event localization.",
      "[Illustrative] Quantization-aware self-distillation for deploying deep vision models on ultra-low-power microcontrollers."
    ],
    keyTools: ["PyTorch", "TorchVision", "Hugging Face", "Timm (PyTorch Image Models)", "Weights & Biases"],
    suggestedReading: [
      { title: "K. He et al., 'Masked Autoencoders Are Scalable Vision Learners' (CVPR)", type: "Landmark Paper", relevance: "Demonstrated masked autoencoding as a universal paradigm." },
      { title: "T. Chen et al., 'A Simple Framework for Contrastive Learning of Visual Representations' (SimCLR)", type: "Seminal Paper", relevance: "Established modern contrastive representation learning." }
    ],
    methodology: "Pre-train on unlabelled target domain data; evaluate downstream transfer via linear probing and fine-tuning across standard benchmarks (ImageNet, CIFAR, DomainNet).",
    evaluationMetrics: ["Top-1 Linear Probe Accuracy (%)", "Fine-Tuning Convergence Rate", "FLOPs & Parameter Count", "Transferability Index"]
  },
  {
    id: "topic-nlp",
    area: "Natural Language Processing",
    title: "Low-Resource Multilingual NLP & Cross-Lingual Transfer",
    fundamentals: "Empowering under-represented languages through cross-lingual transfer, phonetic alignment, zero-shot adaptation, and parameter-efficient adapters.",
    illustrativeProblems: [
      "[Illustrative] Cross-lingual morphological adaptation for low-resource Indic languages in legal domain QA.",
      "[Illustrative] Zero-shot syntactic transfer for code-mixed social media sentiment and stance detection.",
      "[Illustrative] Unsupervised bilingual lexicon induction using topological manifold alignment."
    ],
    keyTools: ["Hugging Face Transformers", "Stanza (Stanford NLP)", "Spacy", "IndicBERT", "fastText"],
    suggestedReading: [
      { title: "A. Conneau et al., 'Unsupervised Cross-lingual Representation Learning at Scale' (XLM-R)", type: "Landmark Paper", relevance: "Foundational multilingual representation learning benchmark." },
      { title: "D. Kakwani et al., 'IndicNLPSuite: Monolingual Corpora and Evaluation Benchmarks for Indic Languages'", type: "Regional Landmark", relevance: "Primary benchmark for Indian low-resource languages." }
    ],
    methodology: "Train language adapters on monolingual corpora; evaluate cross-lingual transfer from high-resource source languages onto low-resource targets using official test splits.",
    evaluationMetrics: ["Macro F1-Score", "BLEU / ROUGE Score", "Cross-Lingual Transfer Gap", "Perplexity"]
  },
  {
    id: "topic-llm",
    area: "Large Language Models",
    title: "Hallucination Mitigation & Retrieval-Augmented Generation (RAG)",
    fundamentals: "Investigating parametric vs. non-parametric knowledge boundaries, factual verification, chain-of-thought verification, and graph-augmented retrieval systems to suppress fabricated model outputs.",
    illustrativeProblems: [
      "[Illustrative] Graph-guided retrieval augmented generation for factual consistency in biomedical literature summarization.",
      "[Illustrative] Self-reflective decoding algorithms for dynamic confidence calibration and hallucination detection in LLMs.",
      "[Illustrative] Context-compressed knowledge injection for long-horizon multi-hop reasoning over enterprise knowledge bases."
    ],
    keyTools: ["LangChain", "LlamaIndex", "vLLM", "Ollama", "ChromaDB / Qdrant", "Hugging Face TRL"],
    suggestedReading: [
      { title: "P. Lewis et al., 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks' (NeurIPS)", type: "Seminal Paper", relevance: "Introduced foundational RAG architecture." },
      { title: "Z. Ji et al., 'Survey of Hallucination in Natural Language Generation' (ACM Computing Surveys)", type: "Survey", relevance: "Comprehensive taxonomy of hallucination causes and fixes." }
    ],
    methodology: "Construct adversarial evaluation benchmarks with counterfactual facts; measure retrieval precision and generation faithfulness with automated and human blind evaluations.",
    evaluationMetrics: ["Context Relevance", "Groundedness / Faithfulness Score", "Answer Relevance", "TruthfulQA Benchmark Score", "Token Generation Latency"]
  },
  {
    id: "topic-cv",
    area: "Computer Vision",
    title: "Robust 3D Scene Reconstruction & Vision-Language Navigation",
    fundamentals: "Bridging 2D camera observations with 3D physical world geometry via Neural Radiance Fields (NeRF), 3D Gaussian Splatting, and embodied spatial reasoning.",
    illustrativeProblems: [
      "[Illustrative] Real-time 3D Gaussian Splatting under sparse view observations and severe illumination changes.",
      "[Illustrative] Zero-shot open-vocabulary 3D semantic segmentation for embodied robotics in unstructured environments.",
      "[Illustrative] Self-supervised monocular depth estimation with temporal consistency constraints in dynamic traffic scenes."
    ],
    keyTools: ["OpenCV", "PyTorch3D", "Nerfstudio", "Gaussian Splatting", "Open3D", "SAM (Segment Anything)"],
    suggestedReading: [
      { title: "B. Mildenhall et al., 'NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis' (ECCV)", type: "Seminal Paper", relevance: "Introduced coordinate-based neural representations." },
      { title: "B. Kerbl et al., '3D Gaussian Splatting for Real-Time Radiance Field Rendering' (SIGGRAPH)", type: "Landmark Paper", relevance: "Revolutionized real-time 3D scene reconstruction." }
    ],
    methodology: "Collect multi-view sequences; optimize Gaussian primitives with differentiable rendering; compute perceptual error metrics on held-out test viewpoints.",
    evaluationMetrics: ["PSNR (Peak Signal-to-Noise Ratio)", "SSIM (Structural Similarity)", "LPIPS (Perceptual Distance)", "Rendering FPS", "Chamfer Distance"]
  },
  {
    id: "topic-sec",
    area: "Cyber Security",
    title: "Adversarial Robustness & AI-Driven Threat Detection",
    fundamentals: "Analyzing structural vulnerabilities in modern networked computing systems and AI models against evasion, poisoning, model inversion, and side-channel exploitation.",
    illustrativeProblems: [
      "[Illustrative] Certified defense against black-box gradient-free adversarial perturbations in autonomous driving vision systems.",
      "[Illustrative] Graph neural network architectures for zero-day smart contract vulnerability detection and exploit prevention.",
      "[Illustrative] Privacy-preserving federated threat intelligence sharing under differential privacy and secure multi-party computation."
    ],
    keyTools: ["CleverHans", "Adversarial Robustness Toolbox (ART)", "Wireshark", "Ghidra", "Suricata", "Slither"],
    suggestedReading: [
      { title: "I. Goodfellow et al., 'Explaining and Harnessing Adversarial Examples' (ICLR)", type: "Seminal Paper", relevance: "Discovered vulnerability of neural networks to linear perturbations." },
      { title: "N. Carlini & D. Wagner, 'Towards Evaluating the Robustness of Neural Networks' (IEEE S&P)", type: "Landmark Paper", relevance: "Established gold-standard CW attack methodology." }
    ],
    methodology: "Design targeted white-box and black-box threat models; evaluate proposed defense mechanisms against state-of-the-art adaptive adversarial attacks under varying budgets.",
    evaluationMetrics: ["Attack Success Rate (ASR)", "Certified Robustness Radius", "False Positive Rate (FPR)", "Detection Latency", "Differential Privacy Epsilon (ε)"]
  },
  {
    id: "topic-cloud",
    area: "Cloud Computing",
    title: "Serverless Optimization & Sustainable Cloud Computing",
    fundamentals: "Advancing autoscaling, resource provisioning, cold-start mitigation, and carbon-aware workload scheduling across distributed multi-tenant cloud data centers.",
    illustrativeProblems: [
      "[Illustrative] Predictive cold-start mitigation in multi-tenant serverless functions using temporal graph neural networks.",
      "[Illustrative] Carbon-aware workload scheduling in hyperscale data centers matching renewable energy generation profiles.",
      "[Illustrative] MicroVM memory de-duplication and memory tiering for high-density edge container deployments."
    ],
    keyTools: ["CloudSim / CloudSim Plus", "OpenWhisk", "Kubernetes", "Prometheus", "Terraform", "Firecracker MicroVM"],
    suggestedReading: [
      { title: "I. Baldini et al., 'Serverless Computing: Current Trends and Open Problems'", type: "Survey", relevance: "The foundational roadmap for serverless systems research." },
      { title: "L. Barroso & U. Hölzle, 'The Datacenter as a Computer: An Introduction to the Design of Warehouse-Scale Machines'", type: "Book", relevance: "Essential reading for cloud infrastructure research." }
    ],
    methodology: "Execute simulated trace-driven evaluations on Azure/Google workload traces; validate findings on bare-metal testbeds under realistic synthetic traffic spikes.",
    evaluationMetrics: ["P99 Latency (ms)", "Cold-Start Frequency", "Resource Utilization Ratio", "Carbon Cost (gCO2eq/req)", "Operating Cost ($/1M requests)"]
  },
  {
    id: "topic-ds",
    area: "Distributed Systems",
    title: "Fault-Tolerant Consensus & Decentralized Storage",
    fundamentals: "Designing asynchronous consensus mechanisms, state-machine replication, and Byzantine Fault Tolerant (BFT) protocols that achieve high throughput and low latency under network partitions.",
    illustrativeProblems: [
      "[Illustrative] High-throughput pipelined Byzantine fault-tolerant consensus for geo-distributed edge federations.",
      "[Illustrative] Asynchronous state synchronization protocols for conflict-free replicated data types (CRDTs) over intermittent links.",
      "[Illustrative] Formal verification of zero-knowledge rollups and decentralized cross-chain bridge protocols."
    ],
    keyTools: ["TLA+ (Formal Specification)", "Go (Golang)", "Rust", "Jepsen (Distributed Testing Framework)", "IPFS"],
    suggestedReading: [
      { title: "L. Lamport, 'Time, Clocks, and the Ordering of Events in a Distributed System' (CACM)", type: "Classic Landmark", relevance: "The foundational paper of distributed computing." },
      { title: "M. Yin et al., 'HotStuff: BFT Consensus with Linearity and Responsiveness'", type: "Landmark Paper", relevance: "Modern pipelined BFT protocol used in enterprise ledgers." }
    ],
    methodology: "Formally verify protocol invariants in TLA+; inject deterministic network partitions, message drops, and Byzantine nodes using Jepsen to test resilience.",
    evaluationMetrics: ["Throughput (Transactions/sec)", "Commit Latency (ms)", "Recovery Time under Partition", "Message Complexity (O(n))", "Byzantine Resilience"]
  },
  {
    id: "topic-iot",
    area: "Internet of Things",
    title: "Edge Intelligence & TinyML in Resource-Constrained IoT",
    fundamentals: "Deploying quantized machine learning inference and lightweight cryptographic protocols directly onto battery-powered microcontrollers with under 256 KB of RAM.",
    illustrativeProblems: [
      "[Illustrative] Adaptive event-triggered inference for TinyML sensor nodes in remote agricultural microclimate monitoring.",
      "[Illustrative] Lightweight post-quantum cryptographic key exchange for LoRaWAN smart-grid deployments.",
      "[Illustrative] Collaborative federated learning across heterogeneous intermittent energy-harvesting edge devices."
    ],
    keyTools: ["TensorFlow Lite for Microcontrollers (TFLM)", "Edge Impulse", "Zephyr RTOS", "C/C++", "NS-3 Network Simulator"],
    suggestedReading: [
      { title: "C. Banbury et al., 'Benchmarking TinyML Systems: Challenges and Direction' (IEEE HotMobile)", type: "Foundational", relevance: "Standard benchmark guidelines for edge IoT ML." },
      { title: "A. Rayes & S. Salam, 'Internet of Things From Hype to Reality: The Road to Digitization'", type: "Book", relevance: "Comprehensive engineering architecture textbook." }
    ],
    methodology: "Benchmark code on physical hardware (ARM Cortex-M4/M7, ESP32) measuring cycle counts, peak SRAM consumption, and milliamp current draw using digital power analyzers.",
    evaluationMetrics: ["Inference Time (ms)", "Peak RAM Usage (KB)", "Energy Consumption per Inference (mJ)", "Accuracy vs. Quantization Loss", "Packet Delivery Ratio"]
  },
  {
    id: "topic-data",
    area: "Data Science & Big Data",
    title: "Scalable Graph Mining & Temporal Knowledge Graphs",
    fundamentals: "Extracting insights from multi-billion edge dynamic networks, temporal knowledge graphs, and heterogeneous information networks using distributed graph representations.",
    illustrativeProblems: [
      "[Illustrative] Inductive representation learning on continuous-time dynamic interaction graphs for financial fraud rings.",
      "[Illustrative] Distributed sub-graph matching and motif counting over massive partitioned social networks.",
      "[Illustrative] Temporal knowledge graph reasoning under incomplete observational history and event forecasting."
    ],
    keyTools: ["PyTorch Geometric (PyG)", "DGL (Deep Graph Library)", "Apache Spark GraphX", "NetworkX", "GraphBLAS"],
    suggestedReading: [
      { title: "W. Hamilton et al., 'Inductive Representation Learning on Large Graphs' (GraphSAGE)", type: "Seminal Paper", relevance: "Pioneered inductive graph neural networks." },
      { title: "Z. Wu et al., 'A Comprehensive Survey on Graph Neural Networks' (IEEE TNNLS)", type: "Survey", relevance: "The primary taxonomy of graph representation learning." }
    ],
    methodology: "Evaluate on standard Open Graph Benchmark (OGB) datasets; compare against baseline transductive and inductive graph neural networks using strict temporal splits.",
    evaluationMetrics: ["Hits@K (Hits@1, Hits@10)", "Mean Reciprocal Rank (MRR)", "Area Under ROC (AUC-ROC)", "Training Scalability (Edges/sec)"]
  },
  {
    id: "topic-se",
    area: "Software Engineering",
    title: "AI-Augmented Software Engineering & Automated Program Repair",
    fundamentals: "Leveraging large language models, program synthesis, and abstract interpretation to automatically detect vulnerabilities, generate unit tests, and synthesize correct software patches.",
    illustrativeProblems: [
      "[Illustrative] Specification-guided automated program repair using execution trace feedback and neural code models.",
      "[Illustrative] Automated security vulnerability patch synthesis with semantic preserving regression guarantees.",
      "[Illustrative] LLM-assisted unit test generation maximizing branch coverage while suppressing false positive test mocks."
    ],
    keyTools: ["Tree-sitter", "CodeQL", "PyDriller", "Defects4J Benchmark", "SonarQube", "LLVM"],
    suggestedReading: [
      { title: "C. Le Goues et al., 'The ManyBugs and IntroClass Benchmarks for Automated Repair of C Programs'", type: "Landmark Benchmark", relevance: "Standard benchmark for program repair research." },
      { title: "M. Pradel & S. Sen, 'DeepBugs: A Learning Approach to Name-based Bug Detection'", type: "Seminal Paper", relevance: "Early pioneer in neural bug detection." }
    ],
    methodology: "Evaluate generated patches against verified bug benchmarks (Defects4J, Bugs.jar); execute full test suites to measure developer plausibility vs. true semantic correctness.",
    evaluationMetrics: ["Repair Success Rate (%)", "Plausible vs. Correct Patch Ratio", "Branch Coverage (%)", "False Alarm Rate", "Execution Overhead"]
  }
];

// --------------------------------------------------------------------------
// 4. PUBLICATION & PAPER GUIDE DATA & TEMPLATES
// --------------------------------------------------------------------------
export const PUBLICATION_GUIDE = {
  paperReadingMethod: {
    title: "Keshav's 3-Pass Method for Reading Research Papers",
    author: "Prof. S. Keshav (University of Waterloo)",
    passes: [
      {
        passNumber: 1,
        title: "Pass 1: The Bird's-Eye View (5 to 10 Minutes)",
        actions: [
          "Carefully read the Title, Abstract, and Introduction.",
          "Read section and subsection headings, ignoring details.",
          "Glance at figures, diagrams, and table captions.",
          "Read the Conclusions section.",
          "Glance over the reference list to see which familiar authors/papers are cited."
        ],
        questionsAnswered: [
          "Category: What type of paper is this (measurement, analysis, prototype, survey)?",
          "Context: Which other papers is it related to? Which theoretical bases were used?",
          "Correctness: Do the underlying assumptions appear valid?",
          "Contributions: What are the main claimed contributions?",
          "Clarity: Is the paper well-written?"
        ]
      },
      {
        passNumber: 2,
        title: "Pass 2: Grasping the Content (1 Hour)",
        actions: [
          "Read with greater care, but ignore fine mathematical proofs or low-level engineering details.",
          "Check figures and graphs closely: Are axes labeled? Are error bars present? Are trends statistically convincing?",
          "Mark unread references for subsequent reading.",
          "Highlight unfamiliar terms, concepts, and technical claims."
        ],
        questionsAnswered: [
          "Can you summarize the main thrust of the paper and its evidence to someone else?",
          "Is this paper relevant enough to your research to warrant a third, in-depth pass?"
        ]
      },
      {
        passNumber: 3,
        title: "Pass 3: Deep Dissection & Virtual Re-Implementation (2 to 4 Hours)",
        actions: [
          "Attempt to mentally recreate the paper: assume you are doing the work, anticipate what the authors did at each decision point.",
          "Identify and challenge every assumption in every theorem, architecture choice, or baseline experiment.",
          "Pinpoint implicit assumptions, unstated trade-offs, and boundary failure cases.",
          "Formulate future research ideas inspired by the paper's shortcomings."
        ],
        questionsAnswered: [
          "Can you reconstruct the entire architecture from memory?",
          "Where are the hidden weaknesses, unstated edge cases, and future research opportunities?"
        ]
      }
    ]
  },
  latexTemplateSnippet: `% IEEE Conference / Journal Paper LaTeX Skeleton
\\documentclass[conference]{IEEEtran}
\\usepackage{amsmath,amsfonts,amssymb}
\\usepackage{graphicx}
\\usepackage{booktabs}
\\usepackage{cite}
\\usepackage{url}
\\usepackage{hyperref}

\\begin{document}

\\title{A Novel Framework for Scalable Neural Computation Under Uncertainty}

\\author{
\\IEEEauthorblockN{First Author\\IEEEauthorrefmark{1}, Research Supervisor\\IEEEauthorrefmark{2}}
\\IEEEauthorblockA{Department of Computer Science \\& Engineering\\\\
Invertis Institute of Engineering \\& Technology, Invertis University, Bareilly, India\\\\
Email: \\{first.author, supervisor\\}@invertis.org}
}

\\maketitle

\\begin{abstract}
Concise, quantitative abstract (150-250 words) stating the exact research problem, the limitations of existing state-of-the-art approaches, the proposed methodology, key experimental results, and practical impact.
\\end{abstract}

\\begin{IEEEkeywords}
Artificial Intelligence, Machine Learning, Benchmark Evaluation, Empirical Software Engineering.
\\end{IEEEkeywords}

\\section{Introduction}
Establish domain context, real-world motivation, limitation of current approaches, and clearly list author contributions as bullet points.

\\section{Related Work}
Systematic literature review categorizing existing paradigms and explicitly highlighting research gaps.

\\section{Proposed Methodology}
Mathematical formulation, architecture diagrams, algorithmic pseudo-code, and theoretical guarantees.

\\section{Experimental Setup \\& Benchmarking}
Datasets, baseline models, implementation parameters, and statistical validation metrics.

\\section{Results \\& Discussion}
Quantitative results tables, ablation studies, and qualitative analysis with statistical significance tests.

\\section{Conclusion \\& Future Work}
Summary of demonstrated achievements, current limitations, and prospective research directions.

\\bibliographystyle{IEEEtran}
\\bibliography{references}

\\end{document}`,
  literatureMatrixTemplate: `| Paper Citation | Problem Addressed | Proposed Method | Dataset / Environment | Key Findings & Metrics | Limitations / Identified Research Gaps |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Author et al., 2024 (IEEE T-PAMI) | High inference latency in vision transformers | Dynamic token pruning with spatial priors | ImageNet-1K, COCO | 2.1x speedup with <0.4% top-1 accuracy drop | Fails under heavy occlusions; requires pre-trained teacher |
| Smith & Kumar, 2023 (ACM CSUR) | Cold-start latency in serverless edge | Predictive container pre-warming with GNNs | Azure Serverless Traces | 42% reduction in P99 cold-start latency | High memory overhead on low-memory edge gateways |
| Candidate Study, 2026 | [Your Thesis Gap Formulation] | [Your Proposed Architecture] | [Target Benchmarks] | [Expected Metric Targets] | [Addressed In Scope of Chapter 4] |`,
  predatoryJournalChecklist: [
    { rule: "Check UGC-CARE List & Scopus / Web of Science Indexing", desc: "Never rely on journal website claims. Verify indexing status directly inside Scopus.com and Web of Science Master Journal List." },
    { rule: "Investigate Peer-Review Turnaround Time", desc: "Promises of 'Guaranteed Acceptance within 48 Hours' or 'Publication in 3 Days' are universal indicators of predatory operations." },
    { rule: "Inspect the Editorial Board", desc: "Check whether editorial board members are recognized scholars with verifiable university email addresses and Google Scholar profiles in that specific field." },
    { rule: "Check APC Transparency (Article Processing Charges)", desc: "Predatory journals conceal fees until after unreviewed acceptance, then demand exorbitant publication fees." },
    { rule: "Use Think-Check-Submit Framework", desc: "Consult https://thinkchecksubmit.org before submitting to any unfamiliar journal or conference." }
  ]
};

// --------------------------------------------------------------------------
// 5. THESIS WRITING & 25 COMMON VIVA VOCE QUESTIONS
// --------------------------------------------------------------------------
export const THESIS_VIVA_GUIDE = {
  thesisChapters: [
    {
      chapterNumber: 1,
      title: "Chapter 1: Introduction & Research Motivation",
      sections: [
        "1.1 Background and Broad Domain Overview",
        "1.2 Motivation and Real-World Relevance",
        "1.3 Formal Problem Statement and Research Questions",
        "1.4 Explicit List of Research Contributions",
        "1.5 Scope, Delimitations, and Underlying Assumptions",
        "1.6 Organization of the Thesis"
      ]
    },
    {
      chapterNumber: 2,
      title: "Chapter 2: Literature Review & Theoretical Foundations",
      sections: [
        "2.1 Survey Methodology and Selection Criteria",
        "2.2 Taxonomy of Existing Approaches",
        "2.3 Comparative Evaluation and Literature Synthesis Matrix",
        "2.4 Critical Gaps in Existing Literature",
        "2.5 Summary and Formulation of Novelty"
      ]
    },
    {
      chapterNumber: 3,
      title: "Chapter 3: Proposed Architecture & Mathematical Formulations",
      sections: [
        "3.1 System Overview and Architectural Diagram",
        "3.2 Formal Mathematical Formulations and Invariants",
        "3.3 Detailed Component-by-Component Description",
        "3.4 Algorithmic Pseudo-Code and Complexity Analysis",
        "3.5 Theoretical Correctness and Convergence Proofs"
      ]
    },
    {
      chapterNumber: 4,
      title: "Chapter 4: Experimental Methodology & Setup",
      sections: [
        "4.1 Benchmarks and Dataset Characteristics",
        "4.2 Baseline Selection and Justification",
        "4.3 Hardware, Software, and Hyperparameter Configurations",
        "4.4 Evaluation Metrics and Statistical Significance Framework",
        "4.5 Reproducibility and Artifact Availability"
      ]
    },
    {
      chapterNumber: 5,
      title: "Chapter 5: Empirical Results, Ablation Studies & Discussion",
      sections: [
        "5.1 Quantitative Comparative Performance against SOTA",
        "5.2 Component-wise Ablation Analysis",
        "5.3 Sensitivity to Hyperparameters and Perturbations",
        "5.4 Computational Cost, Latency, and Scalability",
        "5.5 Qualitative Case Studies and Failure Analysis"
      ]
    },
    {
      chapterNumber: 6,
      title: "Chapter 6: Conclusions, Limitations & Future Horizons",
      sections: [
        "6.1 Summary of Demonstrated Research Contributions",
        "6.2 Limitations and Boundary Conditions of the Work",
        "6.3 Future Research Directions and Open Problems",
        "6.4 Closing Remarks and Final Takeaways"
      ]
    }
  ],
  vivaQuestions: [
    {
      id: 1,
      category: "Problem & Motivation",
      question: "Can you state your primary research problem in three concise sentences for a general computer scientist?",
      examinerFocus: "Testing whether the candidate has clarity of purpose without getting lost in jargon.",
      recommendedResponse: "State: (1) The high-level challenge, (2) the precise bottleneck causing existing systems to fail, and (3) your exact architectural solution and verified empirical improvement."
    },
    {
      id: 2,
      category: "Problem & Motivation",
      question: "What motivated you to select this specific problem over other competing challenges in the domain?",
      examinerFocus: "Assessing domain maturity and whether the research addresses a real technical bottleneck.",
      recommendedResponse: "Explain the growing divergence between industry needs or theoretical demands and the inability of current methods to scale, citing benchmark data from recent literature."
    },
    {
      id: 3,
      category: "Problem & Motivation",
      question: "What are the core research questions (RQs) that your dissertation explicitly answers?",
      examinerFocus: "Checking alignment between stated research questions and thesis chapters.",
      recommendedResponse: "State RQ1 (investigatory), RQ2 (methodological/design), and RQ3 (empirical/comparative), linking each RQ directly to Chapters 3, 4, and 5."
    },
    {
      id: 4,
      category: "Problem & Motivation",
      question: "Why can't existing commercial or open-source solutions solve your research problem directly?",
      examinerFocus: "Validating that the candidate did not reinvent existing tools or libraries.",
      recommendedResponse: "Highlight the fundamental algorithmic or architectural limitation present in existing solutions (e.g. exponential complexity, inability to handle non-stationary distributions, lack of formal guarantees)."
    },
    {
      id: 5,
      category: "Problem & Motivation",
      question: "What are the key assumptions and boundary conditions of your research?",
      examinerFocus: "Checking intellectual honesty and understanding of where the method is valid.",
      recommendedResponse: "Clearly list the assumptions (e.g., independent and identically distributed data, synchronous communication, specific noise bounds) and explain why these assumptions are reasonable for the intended domain."
    },
    {
      id: 6,
      category: "Methodology & Design",
      question: "What is the single most novel theoretical or algorithmic contribution of your thesis?",
      examinerFocus: "Evaluating candidate's ability to isolate their own contribution from prior art.",
      recommendedResponse: "Name the exact algorithm, mathematical loss function, or protocol you devised; contrast its mechanics directly against the closest prior publication."
    },
    {
      id: 7,
      category: "Methodology & Design",
      question: "How did you arrive at the mathematical formulation of your objective function or algorithm?",
      examinerFocus: "Testing whether the candidate formulated the math themselves or copied standard equations.",
      recommendedResponse: "Walk through the first-principles derivation: starting from the physical or statistical constraint, explaining how each penalty term enforces a desired behavior."
    },
    {
      id: 8,
      category: "Methodology & Design",
      question: "What is the computational complexity (time and space) of your proposed algorithm?",
      examinerFocus: "Fundamental computer science rigor in Big-O analysis.",
      recommendedResponse: "State Big-O time and space complexity in terms of input parameters (e.g., O(N · log N) vs baseline O(N²)); explain the dominant bottleneck in the execution loop."
    },
    {
      id: 9,
      category: "Methodology & Design",
      question: "How do you ensure that your proposed framework scales to real-world, large-scale instances?",
      examinerFocus: "Distinguishing toy prototypes from production-viable research contributions.",
      recommendedResponse: "Explain partitioning, parallelization, vectorization, or caching mechanisms employed; present empirical scaling curves as dataset size grows by orders of magnitude."
    },
    {
      id: 10,
      category: "Methodology & Design",
      question: "Why did you choose this architectural paradigm over alternative modern paradigms (e.g., Transformers vs. GNNs)?",
      examinerFocus: "Testing architectural decision-making and awareness of trade-offs.",
      recommendedResponse: "Compare both paradigms on inductive biases, sample efficiency, memory footprint, and training stability, proving that your choice fits the specific problem topology."
    },
    {
      id: 11,
      category: "Experiments & Validation",
      question: "How did you select your baseline algorithms, and are they current state-of-the-art (SOTA)?",
      examinerFocus: "Ensuring the candidate did not compare against weak or obsolete baselines.",
      recommendedResponse: "Confirm baselines include both classic standard benchmarks and the latest SOTA models from top conferences (within the last 2-3 years), using identical hardware and tuning."
    },
    {
      id: 12,
      category: "Experiments & Validation",
      question: "How did you guard against data leakage between training, validation, and testing sets?",
      examinerFocus: "Scrutinizing experimental integrity and preventing over-optimistic evaluation.",
      recommendedResponse: "Detail the strict splitting procedure: temporal splits for time-series, patient-level splits for medical data, and feature pre-processing fitted strictly on training splits only."
    },
    {
      id: 13,
      category: "Experiments & Validation",
      question: "Are your reported experimental improvements statistically significant?",
      examinerFocus: "Evaluating statistical literacy and rigor beyond raw average numbers.",
      recommendedResponse: "Cite paired t-tests or Wilcoxon signed-rank tests across multiple random seeds (e.g. 5–10 runs), reporting standard deviations and p-values (p < 0.01)."
    },
    {
      id: 14,
      category: "Experiments & Validation",
      question: "What do your ablation studies demonstrate about the individual components of your model?",
      examinerFocus: "Verifying that every introduced component actually pulls its weight.",
      recommendedResponse: "Present ablation table removing component A, then component B; show the measurable drop in performance, demonstrating that both components are essential."
    },
    {
      id: 15,
      category: "Experiments & Validation",
      question: "How reproducible is your research? Have you published the code and datasets?",
      examinerFocus: "Adherence to modern open science and artifact evaluation standards.",
      recommendedResponse: "Point to the anonymized / public GitHub repository with pinned dependency files, Docker container, and random seed specifications."
    },
    {
      id: 16,
      category: "Limitations & Defense",
      question: "Under what specific conditions or adversarial scenarios will your proposed system fail?",
      examinerFocus: "Testing critical thinking and maturity; no system works in 100% of cases.",
      recommendedResponse: "Discuss the failure modes discovered during qualitative analysis (e.g. extreme out-of-distribution shifts, sensor failure, high packet loss), explaining why they occur."
    },
    {
      id: 17,
      category: "Limitations & Defense",
      question: "If a competitor or reviewer argues that your accuracy improvement of 2.3% is too modest, how do you defend it?",
      examinerFocus: "Assessing whether the candidate understands real-world impact vs. raw metric increments.",
      recommendedResponse: "Explain that in safety-critical or high-volume enterprise systems (e.g. healthcare, search ranking), a 2.3% reduction in error represents thousands of prevented failures; also highlight secondary wins (e.g., 40% lower latency)."
    },
    {
      id: 18,
      category: "Limitations & Defense",
      question: "How sensitive is your model to hyperparameter tuning and random initialization seeds?",
      examinerFocus: "Checking if performance was lucky cherry-picking or robustly reproducible.",
      recommendedResponse: "Show hyperparameter sensitivity plots demonstrating a broad basin of convergence rather than a fragile spike."
    },
    {
      id: 19,
      category: "Limitations & Defense",
      question: "What were the primary criticisms raised by the external peer reviewers of your journal papers, and how did you resolve them?",
      examinerFocus: "Checking resilience and responsiveness to professional critique.",
      recommendedResponse: "Summarize Reviewer 2's key critique (e.g., lack of comparison with another baseline or missing ablation), detailing the exact experiments conducted to resolve it."
    },
    {
      id: 20,
      category: "Limitations & Defense",
      question: "If you had an additional year of Ph.D. funding, what single fundamental aspect would you rebuild from scratch?",
      examinerFocus: "Testing hindsight reflection and intellectual growth during the doctoral journey.",
      recommendedResponse: "Discuss a deeper architectural aspect (e.g. moving from a two-stage pipeline to an end-to-end differentiable formulation) that you now understand better."
    },
    {
      id: 21,
      category: "Future Work & Contribution",
      question: "What are the most promising immediate future research directions arising from your thesis?",
      examinerFocus: "Verifying whether the thesis opens new research avenues for future scholars.",
      recommendedResponse: "Outline two concrete next steps: (1) extending the framework to multi-modal data streams, and (2) theoretical bounds on generalization under non-stationary distributions."
    },
    {
      id: 22,
      category: "Future Work & Contribution",
      question: "How can junior Ph.D. scholars or M.Tech students build directly upon your published codebase?",
      examinerFocus: "Academic leadership and ecosystem building.",
      recommendedResponse: "Explain the modular API design, plug-and-play baseline interface, and documented tutorial notebooks included in your repository."
    },
    {
      id: 23,
      category: "Future Work & Contribution",
      question: "What is the societal, industrial, or economic impact of your research findings?",
      examinerFocus: "Connecting academic scholarship to broader societal benefit.",
      recommendedResponse: "Highlight energy savings in cloud data centers, democratized access to medical diagnosis in rural clinics, or enhanced privacy for individual users."
    },
    {
      id: 24,
      category: "Future Work & Contribution",
      question: "Which patents, open-source artifacts, or standards emerged from this doctoral work?",
      examinerFocus: "Translational research and tangible deliverables.",
      recommendedResponse: "List open-source repository stars/forks, registered software copyrights, or patent applications filed through university IPR cell."
    },
    {
      id: 25,
      category: "Future Work & Contribution",
      question: "In what way has this doctoral research transformed you as an independent academic researcher?",
      examinerFocus: "Assessing the ultimate goal of a Ph.D.: intellectual independence.",
      recommendedResponse: "Reflect on learning to embrace negative experimental results, formulating falsifiable hypotheses, writing rigorous peer-reviewed manuscripts, and mentoring junior scholars."
    }
  ]
};

// --------------------------------------------------------------------------
// 6. RESEARCH TOOLS LEARNING CENTER (GUIDED STEP-BY-STEP TUTORIALS)
// --------------------------------------------------------------------------
export const RESEARCH_TUTORIALS: ResearchTutorial[] = [
  {
    id: "tut-zotero",
    toolName: "Zotero",
    tier: "Beginner",
    title: "Automated Reference Management & Overleaf BibTeX Integration",
    summary: "Master one-click citation harvesting, automatic PDF organization, and live BibTeX auto-syncing with your Overleaf projects.",
    estimatedTime: "25 mins",
    prerequisites: ["Web browser", "Free Zotero.org account"],
    steps: [
      {
        stepNumber: 1,
        title: "Install Zotero Desktop & Browser Connector",
        explanation: "Download and install Zotero Standalone from zotero.org. Next, install the Zotero Connector extension for your browser (Chrome/Firefox). Log into your Zotero account to enable cloud synchronization of citation metadata.",
      },
      {
        stepNumber: 2,
        title: "Harvesting Citations with One Click",
        explanation: "Navigate to any paper on Google Scholar, IEEE Xplore, ACM Digital Library, or arXiv. Click the Zotero Connector icon in your browser toolbar. Zotero automatically extracts full metadata, author names, publication year, abstract, and downloads the open-access PDF directly to your desktop library."
      },
      {
        stepNumber: 3,
        title: "Install Better BibTeX for Zotero Plugin",
        explanation: "Download the 'Better BibTeX' (BBT) .xpi plugin from retorque.re/zotero-better-bibtex. In Zotero, go to Tools -> Add-ons -> Install Add-on From File. BBT ensures citation keys follow clean academic conventions (e.g. `vaswani2017attention`) and enables live auto-exporting."
      },
      {
        stepNumber: 4,
        title: "Exporting Auto-Syncing BibTeX to Overleaf",
        explanation: "Right-click your research collection in Zotero -> Export Collection -> Choose 'Better BibTeX' format -> Check 'Keep updated'. In Overleaf, go to New File -> From Zotero (or upload the generated `.bib` file) to reference papers with simple `\\cite{key}` commands."
      }
    ]
  },
  {
    id: "tut-overleaf-latex",
    toolName: "Overleaf & LaTeX",
    tier: "Beginner",
    title: "Typesetting Publication-Grade Engineering Papers in LaTeX",
    summary: "Learn to navigate official publisher templates, typeset clean mathematical equations, embed vector graphics, and format cross-references.",
    estimatedTime: "35 mins",
    prerequisites: ["Free Overleaf account"],
    steps: [
      {
        stepNumber: 1,
        title: "Setting Up an Official Publisher Template",
        explanation: "Create a new project in Overleaf using the official IEEE Conference, ACM Primary Article Template, or Springer Nature template. Familiarize yourself with the main `.tex` file structure and the preamble.",
      },
      {
        stepNumber: 2,
        title: "Typesetting Complex Mathematical Formulations",
        explanation: "Use `amsmath` and `amssymb` environments to format loss functions, optimization bounds, and matrix operations with proper notation.",
        language: "latex",
        codeSnippet: `\\begin{equation}
\\mathcal{L}_{total} = \\alpha \\mathcal{L}_{task}(\\hat{y}, y) + \\beta \\sum_{i=1}^{K} D_{KL}(q_i(z) \\parallel p(z))
\\label{eq:total_loss}
\\end{equation}
As derived in Equation~\\ref{eq:total_loss}, the regularizer balances fidelity and latent smoothness.`
      },
      {
        stepNumber: 3,
        title: "Embedding Multi-Subfigure Vector Graphics",
        explanation: "Never use low-resolution JPEGs for research plots. Export plots as PDFs from Python and include them using the `subcaption` or `subfig` packages.",
        language: "latex",
        codeSnippet: `\\begin{figure}[t]
  \\centering
  \\includegraphics[width=0.85\\columnwidth]{figures/architecture_pipeline.pdf}
  \\caption{Overview of the proposed neural architecture showing the dual-stream feature encoder and cross-attention bottleneck.}
  \\label{fig:architecture}
\\end{figure}`
      },
      {
        stepNumber: 4,
        title: "Managing Tables with Booktabs",
        explanation: "Avoid vertical lines in academic tables. Use `booktabs` (`\\toprule`, `\\midrule`, `\\bottomrule`) for clean, professional presentation matching top journal standards."
      }
    ]
  },
  {
    id: "tut-git-github",
    toolName: "Git & GitHub",
    tier: "Intermediate",
    title: "Reproducible Research Repositories & Zenodo DOI Minting",
    summary: "Structure your doctoral research codebase for public release, track dependencies with Git LFS, and mint permanent DOIs for paper citation.",
    estimatedTime: "30 mins",
    prerequisites: ["Git installed locally", "GitHub account"],
    steps: [
      {
        stepNumber: 1,
        title: "Structuring a Standard Research Code Repository",
        explanation: "Organize your codebase cleanly into separate directories for data pre-processing, models, training scripts, configs, and notebooks.",
        language: "bash",
        codeSnippet: `my-phd-research/
├── configs/          # YAML configuration files (hyperparameters)
├── data/             # Raw data download scripts and loaders
├── models/           # PyTorch / TensorFlow model definitions
├── notebooks/        # Exploratory analysis and plotting notebooks
├── scripts/          # Shell scripts to reproduce paper tables
├── requirements.txt  # Pinned Python package dependencies
├── environment.yml   # Conda environment definition
├── LICENSE           # MIT or Apache 2.0 open-source license
└── README.md         # Exact instructions to reproduce results`
      },
      {
        stepNumber: 2,
        title: "Handling Large Model Checkpoints with Git LFS",
        explanation: "Never commit multi-gigabyte `.pth` or `.bin` weight files directly to Git history. Use Git Large File Storage (LFS) to track checkpoints without bloating repo clones.",
        language: "bash",
        codeSnippet: `git lfs install
git lfs track "*.pth"
git lfs track "*.onnx"
git add .gitattributes
git commit -m "Configure Git LFS for model checkpoints"`
      },
      {
        stepNumber: 3,
        title: "Tagging Paper Releases & Minting Zenodo DOIs",
        explanation: "Connect your GitHub repository to Zenodo.org. When your paper is accepted, create a Git release tag (e.g. `v1.0.0-ieee-paper`). Zenodo automatically archives your code and issues a permanent Digital Object Identifier (DOI) to cite in your final publication."
      }
    ]
  },
  {
    id: "tut-pytorch-research",
    toolName: "PyTorch",
    tier: "Intermediate",
    title: "Designing Custom Neural Modules & Deterministic Training Loops",
    summary: "Implement custom PyTorch neural modules, manage seed determinism for reproducibility, and utilize mixed-precision training.",
    estimatedTime: "45 mins",
    prerequisites: ["Basic Python", "NumPy arrays"],
    steps: [
      {
        stepNumber: 1,
        title: "Ensuring 100% Deterministic Reproducibility",
        explanation: "Non-deterministic GPU kernels and unseeded pseudo-random number generators cause research numbers to fluctuate across runs. Pin all seeds upfront.",
        language: "python",
        codeSnippet: `import os, random, torch, numpy as np

def seed_everything(seed=42):
    random.seed(seed)
    os.environ['PYTHONHASHSEED'] = str(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    torch.cuda.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)
    torch.backends.cudnn.deterministic = True
    torch.backends.cudnn.benchmark = False

seed_everything(42)`
      },
      {
        stepNumber: 2,
        title: "Building Custom PyTorch Modules with Autograd",
        explanation: "Inherit from `torch.nn.Module`, initialize learnable weights in `__init__`, and write the computational transformation inside `forward()`.",
        language: "python",
        codeSnippet: `import torch.nn as nn

class ResidualAttentionBlock(nn.Module):
    def __init__(self, embed_dim, num_heads):
        super().__init__()
        self.attn = nn.MultiheadAttention(embed_dim, num_heads, batch_first=True)
        self.norm1 = nn.LayerNorm(embed_dim)
        self.mlp = nn.Sequential(
            nn.Linear(embed_dim, 4 * embed_dim),
            nn.GELU(),
            nn.Linear(4 * embed_dim, embed_dim)
        )
        self.norm2 = nn.LayerNorm(embed_dim)

    def forward(self, x):
        attn_out, _ = self.attn(x, x, x)
        x = self.norm1(x + attn_out)
        x = self.norm2(x + self.mlp(x))
        return x`
      },
      {
        stepNumber: 3,
        title: "Accelerating Training with Automatic Mixed Precision (AMP)",
        explanation: "Use `torch.cuda.amp.autocast()` and `GradScaler()` to speed up training by 2–3x on modern GPUs while cutting VRAM usage in half without loss of numerical stability.",
        language: "python",
        codeSnippet: `scaler = torch.cuda.amp.GradScaler()

for data, target in dataloader:
    optimizer.zero_grad()
    with torch.cuda.amp.autocast():
        output = model(data)
        loss = criterion(output, target)
    scaler.scale(loss).backward()
    scaler.step(optimizer)
    scaler.update()`
      }
    ]
  },
  {
    id: "tut-wandb-tracking",
    toolName: "Weights & Biases (W&B)",
    tier: "Intermediate",
    title: "Tracking Hyperparameter Sweeps & Multi-Run Experiment Telemetry",
    summary: "Ditch manual text-file logging. Automate training metric telemetry, live loss curves, and Bayesian hyperparameter sweeps.",
    estimatedTime: "30 mins",
    prerequisites: ["Python", "PyTorch basics"],
    steps: [
      {
        stepNumber: 1,
        title: "Initializing a W&B Experiment Run",
        explanation: "Log configuration dictionaries and training hyperparameters to make every experiment searchable and reproducible.",
        language: "python",
        codeSnippet: `import wandb

wandb.init(
    project="phd-cse-representation-learning",
    name="baseline-resnet50-lr1e-4",
    config={
        "learning_rate": 1e-4,
        "epochs": 100,
        "batch_size": 64,
        "optimizer": "AdamW"
    }
)`
      },
      {
        stepNumber: 2,
        title: "Logging Training & Validation Scalars",
        explanation: "Stream loss and evaluation metrics per epoch to automatically generate publication-ready comparative charts.",
        language: "python",
        codeSnippet: `for epoch in range(config.epochs):
    train_loss = train_one_epoch(model, dataloader)
    val_acc = evaluate(model, val_loader)
    
    wandb.log({
        "epoch": epoch,
        "train/loss": train_loss,
        "val/top1_accuracy": val_acc
    })`
      },
      {
        stepNumber: 3,
        title: "Configuring Automated Bayesian Sweeps",
        explanation: "Define a YAML sweep configuration over learning rates, dropout ratios, and batch sizes; let W&B agents explore the optimal hyperparameter frontier automatically."
      }
    ]
  }
];

// --------------------------------------------------------------------------
// 7. ACADEMIC CAREER GUIDANCE & FACULTY PATHWAYS
// --------------------------------------------------------------------------
export const ACADEMIC_CAREER_GUIDANCE = {
  aicteFacultyNorms: {
    title: "Engineering Faculty Recruitment Norms (AICTE / UGC Gazetted Regulations)",
    overview: "Faculty recruitment and promotions in Computer Science & Engineering are governed by the All India Council for Technical Education (AICTE) Regulations on Minimum Qualifications for Appointment of Teachers in Technical Institutions.",
    cadres: [
      {
        cadre: "Assistant Professor (Entry Level - Level 10)",
        eligibility: "B.E. / B.Tech / B.S. and M.E. / M.Tech / M.S. or Integrated M.Tech in relevant branch with First Class or equivalent in any one of the degrees. Candidates with a Ph.D. in CSE are strongly preferred and eligible for higher entry pay or accelerated increments.",
        note: "While M.Tech holders are eligible to apply for Assistant Professor roles in engineering institutes, university teaching departments and premier institutes (IITs, NITs, Central Universities) increasingly require a Ph.D. degree at the entry level."
      },
      {
        cadre: "Associate Professor (Level 13A1)",
        eligibility: "Ph.D. degree in relevant field AND First class at either Bachelor's or Master's level. Minimum 8 years of teaching, research, or industry experience, of which at least 2 years must be post-Ph.D. Minimum 6 research publications in SCI/Scopus indexed journals.",
        note: "A Ph.D. is strictly mandatory for promotion or direct recruitment to the post of Associate Professor."
      },
      {
        cadre: "Professor (Level 14)",
        eligibility: "Ph.D. degree in relevant field AND First class at either Bachelor's or Master's level. Minimum 10 years of experience in teaching/research/industry, with at least 3 years as Associate Professor. Minimum 10 research publications in SCI/Scopus journals and successful guidance of at least one doctoral scholar."
      }
    ]
  },
  careerPaths: [
    {
      title: "University Faculty & Academic Professorship",
      description: "Tenure-track academic roles in Universities, NITs, IIITs, IITs, and private engineering institutions focusing on teaching, sponsored R&D grants, and doctoral supervision.",
      keyPreparation: [
        "Build a robust publication record in top Q1/Q2 SCI journals",
        "Develop an authentic Teaching Philosophy statement and sample lecture slides",
        "Gain teaching assistantship (TA) experience during doctoral coursework",
        "Formulate a 3-year sponsored research proposal for DST-SERB / AICTE funding"
      ]
    },
    {
      title: "Postdoctoral Research Fellowships (Global & National)",
      description: "Dedicated full-time 1–3 year research appointments focused solely on breakthrough scholarship at premier international or national research institutions.",
      fellowships: [
        { name: "SERB National Post-Doctoral Fellowship (N-PDF)", geography: "India", stipend: "Rs. 55,000 - 60,000/mo + HRA + Rs. 2 Lakh contingency" },
        { name: "Marie Skłodowska-Curie Postdoctoral Fellowships", geography: "European Union", stipend: "Fully funded European research fellowship" },
        { name: "Alexander von Humboldt Foundation Fellowships", geography: "Germany", stipend: "Prestigious long-term research appointments" },
        { name: "Fulbright-Nehru Postdoctoral Research Fellowships", geography: "United States", stipend: "Prestigious Indo-US academic exchange" }
      ]
    },
    {
      title: "Industrial Research Labs & Government Scientific Cadres",
      description: "Lead R&D scientist and research engineer positions in multinational corporate research centers and national defense/space research establishments.",
      employers: [
        "Corporate Research Labs: Microsoft Research (MSR India), Google Research India, IBM Research, Adobe Research, Intel Labs",
        "National Scientific Labs: Defence Research and Development Organisation (DRDO), Indian Space Research Organisation (ISRO), CSIR-CRRI, CDAC"
      ]
    }
  ],
  academicCvGuidelines: [
    { section: "1. Academic Identity & Contact", tips: "Include full name, institutional affiliation, Google Scholar profile link, ORCID iD, LinkedIn, and GitHub profile." },
    { section: "2. Education & Thesis Information", tips: "List Ph.D., M.Tech, and B.Tech details. For Ph.D., state Dissertation Title, Supervisor Name, and graduation/submission year." },
    { section: "3. Publications (Categorized)", tips: "Split publications into: (A) Refereed International Journals (SCI/Scopus with Impact Factors), (B) Peer-Reviewed Conferences, and (C) Book Chapters / Patents. Highlight your own name in bold." },
    { section: "4. Research Grants & Fellowships", tips: "List UGC-JRF, GATE fellowship, travel grants, and seed funding awards." },
    { section: "5. Teaching & Mentoring Experience", tips: "Detail courses taught as Teaching Assistant, laboratory demonstration sessions, and M.Tech/B.Tech projects co-guided." },
    { section: "6. Professional Service & Peer Review", tips: "Mention journals for which you have served as peer reviewer and conferences where you served as program committee member." }
  ]
};

