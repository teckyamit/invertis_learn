/**
 * Invertis Learn: Career Pathways & Department Specialization Tracks
 * Official curriculum mapping connecting Invertis University engineering subjects
 * to high-demand industry specializations, certifications, and career roadmaps.
 */

export interface PathwayCourse {
  code: string;
  name: string;
  semesterNumber: number;
  programmeCode: string;
  importance: "FOUNDATIONAL" | "CORE" | "SPECIALIZED" | "CAPSTONE";
  roleInPathway: string;
}

export interface IndustryCertification {
  name: string;
  issuer: string;
  code?: string;
  level: "ENTRY" | "ASSOCIATE" | "PROFESSIONAL" | "SPECIALTY";
  description: string;
  verificationUrl?: string;
}

export interface CareerRole {
  title: string;
  typicalLevel: string;
  marketDemand: "VERY_HIGH" | "HIGH" | "STEADY";
  salaryBandIndia: string; // e.g. "₹8 - ₹16 LPA"
}

export interface CareerPathway {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  overview: string;
  badgeColor: string; // CSS color classes
  themeGradient: string;
  mappedSubjectCodes: string[]; // Fast lookup
  courses: PathwayCourse[];
  technicalSkills: {
    languages: string[];
    frameworksAndTools: string[];
    concepts: string[];
  };
  certifications: IndustryCertification[];
  careerRoles: CareerRole[];
  semesterMilestones: {
    id?: string;
    year: string;
    semester: string;
    focus: string;
    deliverable: string;
  }[];
}

export const CAREER_PATHWAYS: CareerPathway[] = [
  {
    id: "ai-ml-engineer",
    slug: "ai-machine-learning",
    title: "Artificial Intelligence & Machine Learning Engineer",
    shortTitle: "AI & ML Systems",
    tagline: "Build scalable neural networks, LLM agent architectures, and autonomous decision systems.",
    overview: "Anchored directly in Invertis University's specialized B.Tech CSE (AI) and advanced elective curricula, this pathway equips engineers with strong mathematical foundations, deep learning frameworks, computer vision, and generative AI production pipelines.",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    themeGradient: "from-purple-600 to-indigo-700",
    mappedSubjectCodes: [
      "BCS201", "BCS-304", "BAS102", "BAS202", "BAS-301", "BCS-301", "BCS-402",
      "IIOT4", "IIOT5", "IIOT6", "BCS-054", "BCS-067", "BCS-073", "BCS-080",
      "BCS-087", "BCS-094", "BCS-095", "BCSAI 101", "BCSAI 201", "BCSAI 301",
      "BCSAI 401", "BCSAI 501", "BCSAI 601", "BCSAI 706", "BCSAI 802"
    ],
    courses: [
      {
        code: "BCS201",
        name: "Programming in C",
        semesterNumber: 2,
        programmeCode: "BTECH-CSE",
        importance: "FOUNDATIONAL",
        roleInPathway: "Algorithmic thinking, memory layout, and computational problem-solving fundamentals."
      },
      {
        code: "BCS-304",
        name: "Python",
        semesterNumber: 3,
        programmeCode: "BTECH-CSE",
        importance: "CORE",
        roleInPathway: "Primary language for data manipulation (NumPy, Pandas), scientific computing, and ML prototyping."
      },
      {
        code: "BCS-301",
        name: "Data Structures",
        semesterNumber: 3,
        programmeCode: "BTECH-CSE",
        importance: "FOUNDATIONAL",
        roleInPathway: "Tree models, graph search algorithms, heaps, and asymptotic complexity optimization."
      },
      {
        code: "BCS-402",
        name: "Design and Analysis of Algorithms",
        semesterNumber: 4,
        programmeCode: "BTECH-CSE",
        importance: "CORE",
        roleInPathway: "Dynamic programming, greedy heuristics, optimization strategies for gradient descent."
      },
      {
        code: "IIOT4",
        name: "Machine Learning",
        semesterNumber: 4,
        programmeCode: "BTECH-CSE",
        importance: "SPECIALIZED",
        roleInPathway: "Supervised and unsupervised models, loss functions, regression, classification, clustering."
      },
      {
        code: "IIOT5",
        name: "Deep Learning",
        semesterNumber: 5,
        programmeCode: "BTECH-CSE",
        importance: "SPECIALIZED",
        roleInPathway: "Multi-layer perceptrons, backpropagation, CNNs, RNNs, transformer attention mechanisms."
      },
      {
        code: "BCS-073",
        name: "Neural Networks",
        semesterNumber: 7,
        programmeCode: "BTECH-CSE",
        importance: "SPECIALIZED",
        roleInPathway: "Neurocomputing theory, activation surfaces, reinforcement learning, model pruning."
      },
      {
        code: "BCS-095",
        name: "Speech and Natural Language Processing",
        semesterNumber: 8,
        programmeCode: "BTECH-CSE",
        importance: "SPECIALIZED",
        roleInPathway: "Tokenization, sequence-to-sequence modeling, vector embeddings, and large language models."
      },
      {
        code: "BCSAI 706",
        name: "Project-I / Capstone AI Defense",
        semesterNumber: 7,
        programmeCode: "BTECH-CSE-AI",
        importance: "CAPSTONE",
        roleInPathway: "End-to-end production AI system deployment conforming to IEEE publication standards."
      }
    ],
    technicalSkills: {
      languages: ["Python", "C++", "SQL", "Julia", "CUDA C"],
      frameworksAndTools: ["PyTorch", "TensorFlow", "scikit-learn", "Hugging Face Transformers", "LangChain", "vLLM", "Docker"],
      concepts: ["Attention Mechanisms", "Fine-Tuning (LoRA)", "RAG Systems", "Vector Embeddings", "Mathematical Optimization", "Model Quantization"]
    },
    certifications: [
      {
        name: "TensorFlow Developer Certificate",
        issuer: "Google / DeepLearning.AI",
        level: "ASSOCIATE",
        description: "Validates building and training computer vision, NLP, and sequential deep learning models."
      },
      {
        name: "AWS Certified Machine Learning - Specialty",
        issuer: "Amazon Web Services",
        code: "MLS-C01",
        level: "SPECIALTY",
        description: "Focuses on deploying, optimizing, and monitoring ML workloads at scale on AWS SageMaker."
      },
      {
        name: "Microsoft Certified: Azure AI Engineer Associate",
        issuer: "Microsoft",
        code: "AI-102",
        level: "ASSOCIATE",
        description: "Covers cognitive services, OpenAI service integration, and responsible AI system architecture."
      }
    ],
    careerRoles: [
      { title: "Machine Learning Engineer", typicalLevel: "Graduate / SDE-I", marketDemand: "VERY_HIGH", salaryBandIndia: "₹9 - ₹18 LPA" },
      { title: "AI Systems Engineer (LLM/GenAI)", typicalLevel: "Associate / Senior", marketDemand: "VERY_HIGH", salaryBandIndia: "₹12 - ₹24 LPA" },
      { title: "Computer Vision Researcher", typicalLevel: "Postgraduate / Specialist", marketDemand: "HIGH", salaryBandIndia: "₹10 - ₹20 LPA" }
    ],
    semesterMilestones: [
      { year: "Year 1", semester: "Sem 1 - 2", focus: "Algorithmic thinking (C language), Linear Algebra, Calculus, Discrete Math", deliverable: "Basic algorithmic problem-solving portfolio on LeetCode/HackerRank." },
      { year: "Year 2", semester: "Sem 3 - 4", focus: "Python scientific stack, Data Structures, Classic Machine Learning algorithms", deliverable: "Kaggle competition participation; trained scikit-learn models from scratch." },
      { year: "Year 3", semester: "Sem 5 - 6", focus: "Deep Learning (PyTorch), Neural Networks, Computer Vision & Transformers", deliverable: "Custom trained CNN and fine-tuned Transformer pipeline deployed on Hugging Face." },
      { year: "Year 4", semester: "Sem 7 - 8", focus: "Generative AI, Agentic Workflows, MLOps, Capstone IEEE Dissertation", deliverable: "Published IEEE project synopsis & production-ready full-stack AI web app." }
    ]
  },
  {
    id: "full-stack-cloud-engineer",
    slug: "full-stack-cloud",
    title: "Full-Stack Web & Cloud Software Engineer",
    shortTitle: "Full-Stack & Cloud",
    tagline: "Design, build, and deploy production-grade distributed microservices and modern web applications.",
    overview: "A comprehensive pathway bridging fundamental software engineering, object-oriented design (Java, C++), database systems, and modern web architectures with enterprise cloud deployment practices.",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    themeGradient: "from-blue-600 to-indigo-800",
    mappedSubjectCodes: [
      "BCS201", "BCS-301", "BCS-402", "BCS-404", "BCS-502", "BCS-503", "BCS-601",
      "BCS-064", "BCS-069", "BCS-075", "BCS-092", "BCS-753", "BCS-854"
    ],
    courses: [
      {
        code: "BCS201",
        name: "Programming in C",
        semesterNumber: 2,
        programmeCode: "BTECH-CSE",
        importance: "FOUNDATIONAL",
        roleInPathway: "Core procedural syntax, memory allocation, pointers, and algorithmic structures."
      },
      {
        code: "BCS-301",
        name: "Data Structures",
        semesterNumber: 3,
        programmeCode: "BTECH-CSE",
        importance: "FOUNDATIONAL",
        roleInPathway: "Linear and non-linear data representation; crucial for coding interviews and fast systems."
      },
      {
        code: "BCS-404",
        name: "Software Engineering",
        semesterNumber: 4,
        programmeCode: "BTECH-CSE",
        importance: "CORE",
        roleInPathway: "SDLC lifecycle, Agile/Scrum methodologies, UML modeling, design patterns, and unit testing."
      },
      {
        code: "BCS-502",
        name: "Data Base Management System",
        semesterNumber: 5,
        programmeCode: "BTECH-CSE",
        importance: "CORE",
        roleInPathway: "Relational schema design, normalization, ACID properties, transactions, and indexing."
      },
      {
        code: "BCS-503",
        name: "Java Programming",
        semesterNumber: 5,
        programmeCode: "BTECH-CSE",
        importance: "CORE",
        roleInPathway: "Enterprise OOP, multi-threading, JVM memory management, and Spring Boot backend foundations."
      },
      {
        code: "BCS-601",
        name: "Computer Networks",
        semesterNumber: 6,
        programmeCode: "BTECH-CSE",
        importance: "CORE",
        roleInPathway: "TCP/IP socket communication, HTTP/1.1 vs HTTP/2/3, DNS, and load balancing."
      },
      {
        code: "BCS-075",
        name: "Client Server Computing",
        semesterNumber: 7,
        programmeCode: "BTECH-CSE",
        importance: "SPECIALIZED",
        roleInPathway: "RESTful architecture, RPC protocols, stateless authentication (JWT/OAuth), and microservices."
      },
      {
        code: "BCS-753",
        name: "Project-II",
        semesterNumber: 7,
        programmeCode: "BTECH-CSE",
        importance: "CAPSTONE",
        roleInPathway: "Production-ready web application with modern frontend, API layer, and containerized deployment."
      }
    ],
    technicalSkills: {
      languages: ["TypeScript", "JavaScript", "Java", "Python", "SQL", "HTML5/CSS3"],
      frameworksAndTools: ["React", "Next.js", "Node.js", "Spring Boot", "Tailwind CSS", "Prisma ORM", "Docker", "PostgreSQL"],
      concepts: ["REST & GraphQL APIs", "Microservices Architecture", "Stateless Authentication", "Database Indexing", "CI/CD Pipelines", "State Management"]
    },
    certifications: [
      {
        name: "AWS Certified Solutions Architect - Associate",
        issuer: "Amazon Web Services",
        code: "SAA-C03",
        level: "ASSOCIATE",
        description: "Validates high-availability, fault-tolerant, and cost-efficient distributed architecture design on AWS."
      },
      {
        name: "Meta Front-End Developer Professional Certificate",
        issuer: "Meta / Coursera",
        level: "ENTRY",
        description: "Covers modern React development, UI/UX responsiveness, accessibility, and client-side testing."
      },
      {
        name: "Oracle Certified Professional: Java SE Developer",
        issuer: "Oracle Corporation",
        code: "1Z0-819",
        level: "PROFESSIONAL",
        description: "Industry benchmark credential validating deep mastery of core enterprise Java."
      }
    ],
    careerRoles: [
      { title: "Full-Stack Software Engineer", typicalLevel: "Graduate / SDE-I", marketDemand: "VERY_HIGH", salaryBandIndia: "₹7 - ₹16 LPA" },
      { title: "Backend Systems Engineer", typicalLevel: "Associate / Mid", marketDemand: "VERY_HIGH", salaryBandIndia: "₹8 - ₹18 LPA" },
      { title: "Frontend Web Architect", typicalLevel: "Associate / Senior", marketDemand: "HIGH", salaryBandIndia: "₹7 - ₹15 LPA" }
    ],
    semesterMilestones: [
      { year: "Year 1", semester: "Sem 1 - 2", focus: "Programming logic in C, Web basics (HTML/CSS/JS), Git/GitHub version control", deliverable: "Interactive personal portfolio site hosted on Vercel/GitHub Pages." },
      { year: "Year 2", semester: "Sem 3 - 4", focus: "Object-oriented programming, Data Structures in Java, Software Engineering practices", deliverable: "Full CRUD application with authentication and relational database schema." },
      { year: "Year 3", semester: "Sem 5 - 6", focus: "Advanced DBMS, Java Spring Boot/Node.js, React/Next.js, Network sockets", deliverable: "Production multi-tier web application with Redis caching and Docker container." },
      { year: "Year 4", semester: "Sem 7 - 8", focus: "Microservices, Distributed Systems, Cloud Deployments, Capstone Project", deliverable: "Scalable cloud-native capstone software platform with automated CI/CD pipeline." }
    ]
  },
  {
    id: "cyber-security-specialist",
    slug: "cyber-security-defense",
    title: "Cyber Security & Information Assurance Specialist",
    shortTitle: "Cyber Security",
    tagline: "Protect enterprise networks, conduct penetration testing, and design cryptographic defense systems.",
    overview: "Built around core operating systems, networking fundamentals, Unix environments, and advanced cryptography, this track develops ethical hackers, SOC analysts, and security engineers prepared for modern threat landscapes.",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
    themeGradient: "from-rose-600 to-red-800",
    mappedSubjectCodes: [
      "BCS201", "BCS-301", "BCS-401", "BCS-403", "BCS-601", "BCS-065", "BCS-079",
      "BCS-083", "BCS-091", "BOE-702", "BCS-754"
    ],
    courses: [
      {
        code: "BCS-403",
        name: "Operating Systems",
        semesterNumber: 4,
        programmeCode: "BTECH-CSE",
        importance: "FOUNDATIONAL",
        roleInPathway: "Kernel mechanisms, memory segmentation, process scheduling, access control lists (ACLs)."
      },
      {
        code: "BCS-601",
        name: "Computer Networks",
        semesterNumber: 6,
        programmeCode: "BTECH-CSE",
        importance: "FOUNDATIONAL",
        roleInPathway: "Packet structure, OSI stack, routing protocols, firewalls, and port monitoring."
      },
      {
        code: "BCS-065",
        name: "Linux Administration",
        semesterNumber: 6,
        programmeCode: "BTECH-CSE",
        importance: "CORE",
        roleInPathway: "User privileges, systemd services, SSH hardening, iptables firewalling, and audit logging."
      },
      {
        code: "BCS-079",
        name: "Unix and Shell Programming",
        semesterNumber: 7,
        programmeCode: "BTECH-CSE",
        importance: "CORE",
        roleInPathway: "Bash automation, log forensics, vulnerability scanning scripts, and cron orchestration."
      },
      {
        code: "BCS-091",
        name: "Cryptography and Network Security",
        semesterNumber: 8,
        programmeCode: "BTECH-CSE",
        importance: "SPECIALIZED",
        roleInPathway: "Symmetric (AES) and asymmetric (RSA/ECC) ciphers, SHA-256 hashing, TLS handshake, PKI infrastructure."
      },
      {
        code: "BCS-083",
        name: "IT in Forensics Science",
        semesterNumber: 8,
        programmeCode: "BTECH-CSE",
        importance: "SPECIALIZED",
        roleInPathway: "Digital evidence gathering, disk imaging, memory forensics, chain-of-custody protocols."
      },
      {
        code: "BOE-702",
        name: "Cyber Law and Ethics",
        semesterNumber: 7,
        programmeCode: "BTECH-CSE",
        importance: "SPECIALIZED",
        roleInPathway: "Indian IT Act 2000, GDPR, data privacy compliance, ethical hacking legal frameworks."
      }
    ],
    technicalSkills: {
      languages: ["Python", "Bash/Shell", "C", "SQL", "PowerShell"],
      frameworksAndTools: ["Wireshark", "Nmap", "Burp Suite", "Metasploit", "Snort / Suricata", "Kali Linux", "Splunk / ELK"],
      concepts: ["Penetration Testing", "Zero-Trust Architecture", "Public Key Infrastructure (PKI)", "Threat Modeling (STRIDE)", "OWASP Top 10", "Incident Response"]
    },
    certifications: [
      {
        name: "CompTIA Security+",
        issuer: "CompTIA",
        code: "SY0-701",
        level: "ENTRY",
        description: "Global benchmark credential establishing baseline cybersecurity problem-solving and operational security."
      },
      {
        name: "Certified Ethical Hacker (CEH)",
        issuer: "EC-Council",
        level: "ASSOCIATE",
        description: "Validates practical methodology for ethical penetration testing and attack vector mitigation."
      },
      {
        name: "Certified Information Systems Security Professional (CISSP)",
        issuer: "ISC2",
        level: "PROFESSIONAL",
        description: "Gold standard for information security management, cryptography, and risk governance."
      }
    ],
    careerRoles: [
      { title: "Cybersecurity Analyst / SOC Tier-1", typicalLevel: "Graduate / Entry", marketDemand: "VERY_HIGH", salaryBandIndia: "₹6 - ₹14 LPA" },
      { title: "Penetration Tester / Ethical Hacker", typicalLevel: "Associate", marketDemand: "HIGH", salaryBandIndia: "₹8 - ₹17 LPA" },
      { title: "Information Security Engineer", typicalLevel: "Senior / Specialist", marketDemand: "VERY_HIGH", salaryBandIndia: "₹11 - ₹22 LPA" }
    ],
    semesterMilestones: [
      { year: "Year 1", semester: "Sem 1 - 2", focus: "C programming memory safety, Computer Fundamentals, Network basics", deliverable: "Basic socket chat program in C demonstrating secure connection." },
      { year: "Year 2", semester: "Sem 3 - 4", focus: "Operating Systems internals, Linux administration, Python scripting for security", deliverable: "Custom automated network port scanner written in Python." },
      { year: "Year 3", semester: "Sem 5 - 6", focus: "Computer Networks deep-dive, Wireshark packet capture, Web application security (OWASP)", deliverable: "Completed TryHackMe / HackTheBox junior penetration testing rooms." },
      { year: "Year 4", semester: "Sem 7 - 8", focus: "Applied Cryptography, Digital Forensics, Cyber Law, Capstone Security Audit", deliverable: "Comprehensive vulnerability assessment and penetration test report for a sample enterprise." }
    ]
  },
  {
    id: "data-systems-analytics-engineer",
    slug: "data-engineering-analytics",
    title: "Data Systems & Big Data Analytics Engineer",
    shortTitle: "Data Systems & Analytics",
    tagline: "Build high-throughput ETL pipelines, distributed data warehouses, and real-time streaming engines.",
    overview: "Maps database fundamentals to enterprise big data architectures. Emphasizes distributed storage (HDFS), SQL query optimization, data warehousing schemas (Star/Snowflake), and analytics processing.",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    themeGradient: "from-emerald-600 to-teal-800",
    mappedSubjectCodes: [
      "BCS201", "BCS-301", "BCS-304", "IIOT3", "BCS-502", "BCS-076", "BCS-085",
      "BCS-088", "BCS-089", "BCS-753"
    ],
    courses: [
      {
        code: "BCS-304",
        name: "Python",
        semesterNumber: 3,
        programmeCode: "BTECH-CSE",
        importance: "CORE",
        roleInPathway: "Data wrangling, ingestion scripts, pandas pipelines, and data quality validations."
      },
      {
        code: "IIOT3",
        name: "Introduction to Data Analytics",
        semesterNumber: 3,
        programmeCode: "BTECH-CSE",
        importance: "CORE",
        roleInPathway: "Exploratory data analysis, statistical measures, hypothesis testing, and reporting."
      },
      {
        code: "BCS-502",
        name: "Data Base Management System",
        semesterNumber: 5,
        programmeCode: "BTECH-CSE",
        importance: "FOUNDATIONAL",
        roleInPathway: "Relational algebra, complex joins, query execution plans, indexes, and B-trees."
      },
      {
        code: "BCS-076",
        name: "Distributed Database",
        semesterNumber: 7,
        programmeCode: "BTECH-CSE",
        importance: "SPECIALIZED",
        roleInPathway: "Two-phase commits, replication strategies, partitioning, and CAP theorem trade-offs."
      },
      {
        code: "BCS-085",
        name: "Big Data Analysis",
        semesterNumber: 8,
        programmeCode: "BTECH-CSE",
        importance: "SPECIALIZED",
        roleInPathway: "Hadoop ecosystem, MapReduce paradigm, Apache Spark resilient distributed datasets (RDDs)."
      },
      {
        code: "BCS-088",
        name: "Data Warehouse and Mining",
        semesterNumber: 8,
        programmeCode: "BTECH-CSE",
        importance: "SPECIALIZED",
        roleInPathway: "OLAP cubes, dimensional modeling (Star vs Snowflake), ETL orchestration, and association rule mining."
      }
    ],
    technicalSkills: {
      languages: ["SQL (Advanced)", "Python", "Scala", "Java", "R"],
      frameworksAndTools: ["Apache Spark", "Apache Kafka", "PostgreSQL", "Snowflake / BigQuery", "dbt", "Airflow", "PowerBI / Tableau"],
      concepts: ["Dimensional Modeling", "Data Lakes vs Lakehouses", "Stream Processing vs Batch", "Schema Evolution", "CDC (Change Data Capture)", "Data Governance"]
    },
    certifications: [
      {
        name: "Databricks Certified Associate Data Engineer",
        issuer: "Databricks",
        level: "ASSOCIATE",
        description: "Validates building reliable data pipelines on Lakehouse architectures using Apache Spark."
      },
      {
        name: "Google Cloud Professional Data Engineer",
        issuer: "Google Cloud",
        level: "PROFESSIONAL",
        description: "Focuses on designing data processing systems, BigQuery analytics, and machine learning pipelines."
      },
      {
        name: "AWS Certified Data Engineer - Associate",
        issuer: "Amazon Web Services",
        code: "DEA-C01",
        level: "ASSOCIATE",
        description: "Covers data ingestion, transformation, security, and lifecycle management on AWS."
      }
    ],
    careerRoles: [
      { title: "Data Engineer", typicalLevel: "Graduate / SDE-I", marketDemand: "VERY_HIGH", salaryBandIndia: "₹8 - ₹17 LPA" },
      { title: "Big Data Platform Engineer", typicalLevel: "Mid / Senior", marketDemand: "HIGH", salaryBandIndia: "₹11 - ₹22 LPA" },
      { title: "Data Analytics Specialist", typicalLevel: "Graduate / Analyst", marketDemand: "HIGH", salaryBandIndia: "₹6 - ₹13 LPA" }
    ],
    semesterMilestones: [
      { year: "Year 1", semester: "Sem 1 - 2", focus: "Basic logic, Excel modeling, Relational data concepts, Math foundations", deliverable: "SQL schema design for a mini bookstore inventory system." },
      { year: "Year 2", semester: "Sem 3 - 4", focus: "Python for Data Analysis (Pandas, Polars), Statistics, Data Structures", deliverable: "Automated data ingestion and cleaning pipeline for open government datasets." },
      { year: "Year 3", semester: "Sem 5 - 6", focus: "Advanced SQL, Index tuning, NoSQL databases, Data visualization dashboards", deliverable: "Interactive PowerBI/Tableau executive dashboard with live SQL backend." },
      { year: "Year 4", semester: "Sem 7 - 8", focus: "Distributed Databases, Apache Spark ETL, Big Data Warehousing, Capstone Pipeline", deliverable: "End-to-end automated streaming ETL pipeline using Kafka and Spark." }
    ]
  },
  {
    id: "cloud-devops-sre-engineer",
    slug: "cloud-devops-sre",
    title: "Cloud DevOps & Site Reliability Engineer (SRE)",
    shortTitle: "Cloud DevOps & SRE",
    tagline: "Automate infrastructure as code, continuous integration, and scalable Kubernetes orchestration.",
    overview: "Combines operating systems, Linux systems administration, computer networks, and distributed systems to mold engineers capable of running resilient cloud systems with 99.99% uptime.",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
    themeGradient: "from-sky-600 to-cyan-800",
    mappedSubjectCodes: [
      "BCS201", "BCS-302", "BCS-401", "BCS-403", "BCS-601", "BCS-065", "BCS-079",
      "BCS-084", "BCS-089", "BCS-754"
    ],
    courses: [
      {
        code: "BCS-302",
        name: "IT Infrastructure Management",
        semesterNumber: 3,
        programmeCode: "BTECH-CSE",
        importance: "FOUNDATIONAL",
        roleInPathway: "Server hardware lifecycle, storage virtualization, data center topologies, and SLA metrics."
      },
      {
        code: "BCS-403",
        name: "Operating Systems",
        semesterNumber: 4,
        programmeCode: "BTECH-CSE",
        importance: "FOUNDATIONAL",
        roleInPathway: "Linux cgroups, namespaces, file system inodes, threads, and container runtime mechanics."
      },
      {
        code: "BCS-601",
        name: "Computer Networks",
        semesterNumber: 6,
        programmeCode: "BTECH-CSE",
        importance: "CORE",
        roleInPathway: "VPC networking, subnetting, NAT gateways, BGP routing, and TLS termination."
      },
      {
        code: "BCS-065",
        name: "Linux Administration",
        semesterNumber: 6,
        programmeCode: "BTECH-CSE",
        importance: "CORE",
        roleInPathway: "Package managers, SELinux, system metrics (top, htop, iostat), and shell scripting."
      },
      {
        code: "BCS-089",
        name: "Distributed System",
        semesterNumber: 8,
        programmeCode: "BTECH-CSE",
        importance: "SPECIALIZED",
        roleInPathway: "Consensus algorithms (Raft/Paxos), distributed clocks, leader election, and split-brain recovery."
      }
    ],
    technicalSkills: {
      languages: ["Bash/Shell", "Python", "Go", "YAML", "HCL (Terraform)"],
      frameworksAndTools: ["Docker", "Kubernetes (K8s)", "Terraform", "GitHub Actions", "Prometheus & Grafana", "Ansible", "AWS / Azure"],
      concepts: ["Infrastructure as Code (IaC)", "GitOps Workflows", "Zero-Downtime Deployments", "Observability (Metrics, Logs, Traces)", "Chaos Engineering", "SLIs/SLOs/SLAs"]
    },
    certifications: [
      {
        name: "Certified Kubernetes Administrator (CKA)",
        issuer: "Cloud Native Computing Foundation (CNCF) / Linux Foundation",
        level: "PROFESSIONAL",
        description: "Hands-on exam proving ability to install, configure, manage, and troubleshoot production Kubernetes clusters."
      },
      {
        name: "HashiCorp Certified: Terraform Associate",
        issuer: "HashiCorp",
        code: "003",
        level: "ASSOCIATE",
        description: "Validates core infrastructure as code concepts, state management, and multi-cloud provisioning."
      },
      {
        name: "AWS Certified DevOps Engineer - Professional",
        issuer: "Amazon Web Services",
        code: "DOP-C02",
        level: "PROFESSIONAL",
        description: "Demonstrates advanced technical expertise in provisioning, operating, and managing distributed application environments on AWS."
      }
    ],
    careerRoles: [
      { title: "DevOps Engineer", typicalLevel: "Graduate / SDE-I", marketDemand: "VERY_HIGH", salaryBandIndia: "₹8 - ₹17 LPA" },
      { title: "Site Reliability Engineer (SRE)", typicalLevel: "Mid / Senior", marketDemand: "VERY_HIGH", salaryBandIndia: "₹10 - ₹22 LPA" },
      { title: "Cloud Infrastructure Architect", typicalLevel: "Specialist", marketDemand: "HIGH", salaryBandIndia: "₹14 - ₹28 LPA" }
    ],
    semesterMilestones: [
      { year: "Year 1", semester: "Sem 1 - 2", focus: "Basic terminal operations, Linux dual-boot setup, Git branches and pull requests", deliverable: "Configured multi-branch Git workflow with automated README generation." },
      { year: "Year 2", semester: "Sem 3 - 4", focus: "IT Infrastructure, OS process control, Docker containerization of web servers", deliverable: "Containerized multi-service web app (frontend + backend + db) with Docker Compose." },
      { year: "Year 3", semester: "Sem 5 - 6", focus: "Linux administration, CI/CD with GitHub Actions, Cloud VM provisioning (AWS EC2)", deliverable: "Automated CI/CD pipeline building, testing, and pushing images to container registry." },
      { year: "Year 4", semester: "Sem 7 - 8", focus: "Kubernetes orchestration, Terraform IaC, Prometheus/Grafana monitoring, Distributed Systems", deliverable: "Production Kubernetes cluster deployment with automated auto-scaling and alert manager." }
    ]
  },
  {
    id: "embedded-iot-systems-engineer",
    slug: "embedded-iot-systems",
    title: "Embedded Systems & Internet of Things (IoT) Engineer",
    shortTitle: "Embedded & IoT",
    tagline: "Interface microcontrollers, real-time operating systems (RTOS), and industrial wireless telemetry.",
    overview: "Connecting hardware architecture (Digital Electronics, Microprocessors) with low-level software (C, Assembly, Real-Time Operating Systems) and IoT telemetry protocols (MQTT, CoAP, BLE).",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    themeGradient: "from-amber-600 to-orange-800",
    mappedSubjectCodes: [
      "BEE101", "BEC101", "BCS201", "BCS-303", "BCS-401", "BCS-403", "IIOT1",
      "IIOT2", "BCS-070", "BCS-071", "BCS-074", "BCS-753"
    ],
    courses: [
      {
        code: "BCS201",
        name: "Programming in C",
        semesterNumber: 2,
        programmeCode: "BTECH-CSE",
        importance: "FOUNDATIONAL",
        roleInPathway: "Direct hardware register manipulation, bitwise operations, volatile keywords, and embedded C."
      },
      {
        code: "BCS-303",
        name: "Digital Electronics",
        semesterNumber: 3,
        programmeCode: "BTECH-CSE",
        importance: "FOUNDATIONAL",
        roleInPathway: "Logic gates, flip-flops, multiplexers, state machines, ADC/DAC conversion."
      },
      {
        code: "IIOT1",
        name: "Fundamentals of IoT Development",
        semesterNumber: 1,
        programmeCode: "BTECH-CSE",
        importance: "CORE",
        roleInPathway: "Microcontroller architectures (ESP32, Arduino, ARM Cortex), GPIO sensors, and actuators."
      },
      {
        code: "IIOT2",
        name: "Industrial Communication Protocols & Connectivity",
        semesterNumber: 2,
        programmeCode: "BTECH-CSE",
        importance: "CORE",
        roleInPathway: "I2C, SPI, UART, Modbus, CAN Bus, and industrial telemetry transmission."
      },
      {
        code: "BCS-070",
        name: "Introduction to IoT",
        semesterNumber: 6,
        programmeCode: "BTECH-CSE",
        importance: "CORE",
        roleInPathway: "Cloud IoT gateways, MQTT brokers, sensor data serialization, and edge analytics."
      },
      {
        code: "BCS-071",
        name: "Embedded and Real Time Systems",
        semesterNumber: 7,
        programmeCode: "BTECH-CSE",
        importance: "SPECIALIZED",
        roleInPathway: "FreeRTOS task scheduling, deterministic response, semaphores, priority inversion, and watchdogs."
      }
    ],
    technicalSkills: {
      languages: ["Embedded C", "C++", "Python", "Assembly", "Rust"],
      frameworksAndTools: ["FreeRTOS", "ESP-IDF", "Arduino / PlatformIO", "Wireshark (MQTT/CoAP)", "KiCAD (PCB Design)", "Oscilloscopes & Logic Analyzers"],
      concepts: ["Interrupt Service Routines (ISRs)", "Memory-Mapped I/O", "Power Optimization & Sleep Modes", "Edge Computing", "Hardware Security Modules (HSMs)"]
    },
    certifications: [
      {
        name: "ARM Accredited Engineer (AAE)",
        issuer: "ARM Holdings",
        level: "ASSOCIATE",
        description: "Validates deep foundational knowledge of ARM Cortex processor architectures and assembly programming."
      },
      {
        name: "AWS Certified IoT - Specialty",
        issuer: "Amazon Web Services",
        level: "SPECIALTY",
        description: "Focuses on device shadow management, secure device onboarding, and edge telemetry with AWS IoT Core."
      }
    ],
    careerRoles: [
      { title: "Embedded Firmware Engineer", typicalLevel: "Graduate / Engineer", marketDemand: "HIGH", salaryBandIndia: "₹6 - ₹15 LPA" },
      { title: "IoT Solutions Architect", typicalLevel: "Associate / Senior", marketDemand: "HIGH", salaryBandIndia: "₹9 - ₹19 LPA" },
      { title: "Robotics & Telemetry Engineer", typicalLevel: "Specialist", marketDemand: "HIGH", salaryBandIndia: "₹8 - ₹18 LPA" }
    ],
    semesterMilestones: [
      { year: "Year 1", semester: "Sem 1 - 2", focus: "Circuit fundamentals, Embedded C syntax, Microcontroller GPIO control", deliverable: "Sensor telemetry node streaming temperature & humidity to local serial port." },
      { year: "Year 2", semester: "Sem 3 - 4", focus: "Digital logic, Microprocessor architecture, Serial communication protocols (SPI/I2C)", deliverable: "Multi-sensor hardware board communicating with display over I2C." },
      { year: "Year 3", semester: "Sem 5 - 6", focus: "IoT telemetry (MQTT), Wireless networking (BLE/Wi-Fi), Cloud IoT gateways", deliverable: "Cloud-connected smart telemetry device with real-time web dashboard." },
      { year: "Year 4", semester: "Sem 7 - 8", focus: "Real-Time Operating Systems (FreeRTOS), Edge ML inference, Capstone IoT prototype", deliverable: "Complete industrial IoT monitoring prototype with edge anomaly detection." }
    ]
  },
  {
    id: "assistant-professor-academic-research",
    slug: "academic-research-professor",
    title: "Assistant Professor & Academic Research (After M.Tech)",
    shortTitle: "Academic & Faculty Career",
    tagline: "Transition from M.Tech to higher education teaching, peer-reviewed research, Ph.D. pathways, and AICTE/UGC academic recruitment.",
    overview: "A comprehensive academic career track engineered for M.Tech graduates aspiring to enter university teaching and research institutions. In technical education across India, faculty appointment standards are governed by the AICTE Gazette Regulations (B.E./B.Tech and M.E./M.Tech in relevant branch with First Class in either degree), while university departments and science disciplines adhere to UGC Regulations. This pathway covers pedagogical preparation, demo lecture mastery, research methodology, publishing in Scopus/SCI/UGC-CARE journals, UGC-NET preparation where applicable, Ph.D. admissions (GATE/NET-JRF/PMRF), and academic Career Advancement Scheme (CAS) promotional ladders.",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    themeGradient: "from-indigo-700 to-slate-900",
    mappedSubjectCodes: [
      "MCS-101", "MCS-102", "MCS-103", "MCS-104", "MCS-105", "MCS-151",
      "MCS-201", "MCS-211", "MCS-214", "MCS-251", "MCS-322", "MCS-323",
      "MCS351", "MCS393", "MCS-394"
    ],
    courses: [
      {
        code: "MCS-102",
        name: "Foundation of Computer Science",
        semesterNumber: 1,
        programmeCode: "MTECH-CSE",
        importance: "FOUNDATIONAL",
        roleInPathway: "Theoretical CS foundations essential for teaching Discrete Mathematics, Theory of Computation, and Formal Languages."
      },
      {
        code: "MCS-151",
        name: "Colloquium & Research Review Paper-I",
        semesterNumber: 1,
        programmeCode: "MTECH-CSE",
        importance: "CORE",
        roleInPathway: "Systematic literature survey methodology, citation tracking, and oral academic presentation skills."
      },
      {
        code: "MCS-214",
        name: "Machine Learning",
        semesterNumber: 2,
        programmeCode: "MTECH-CSE",
        importance: "SPECIALIZED",
        roleInPathway: "Advanced elective domain expertise for modern undergraduate course instruction and research grant proposals."
      },
      {
        code: "MCS-251",
        name: "Colloquium & Research Review Paper-II",
        semesterNumber: 2,
        programmeCode: "MTECH-CSE",
        importance: "CORE",
        roleInPathway: "Critical analysis of SCI/Scopus journal manuscripts, LaTeX document preparation, and peer-review simulation."
      },
      {
        code: "MCS-322",
        name: "Design and Analysis of Algorithms",
        semesterNumber: 3,
        programmeCode: "MTECH-CSE",
        importance: "FOUNDATIONAL",
        roleInPathway: "Core benchmark course for college classroom teaching demonstrations, written faculty tests, and interview viva."
      },
      {
        code: "MCS-323",
        name: "Intellectual Property Rights",
        semesterNumber: 3,
        programmeCode: "MTECH-CSE",
        importance: "CORE",
        roleInPathway: "Academic copyright, patent law, research ethics, and compliance with anti-plagiarism regulations."
      },
      {
        code: "MCS-394",
        name: "Thesis / Dissertation",
        semesterNumber: 4,
        programmeCode: "MTECH-CSE",
        importance: "CAPSTONE",
        roleInPathway: "Master's research capstone demonstrating independent scientific inquiry, experimental validation, and publishable findings."
      }
    ],
    technicalSkills: {
      languages: ["Python", "C / C++", "LaTeX", "R", "Java", "SQL"],
      frameworksAndTools: [
        "Overleaf / LaTeX",
        "Zotero / Mendeley",
        "Google Scholar & ORCID",
        "MATLAB / GNU Octave",
        "Jupyter Lab",
        "Turnitin / Urkund (Plagiarism Checks)",
        "Moodle & Google Classroom LMS",
        "OBS Studio & Digital Pen Tablets"
      ],
      concepts: [
        "Outcome-Based Education (OBE) & CO-PO Mapping",
        "Bloom's Revised Taxonomy in Exam Paper Setting",
        "Demonstration Lecture (Chalk-and-Talk + Digital)",
        "Research Methodology & Statistical Significance",
        "Peer-Review Publishing (SCI / Scopus / UGC-CARE)",
        "Academic Ethics & UGC Plagiarism Regulations 2018",
        "Career Advancement Scheme (CAS & API Scoring)",
        "Sponsored Project Proposal Formulation (DST/SERB/AICTE)"
      ]
    },
    certifications: [
      {
        name: "NPTEL / SWAYAM Faculty Development Programme (FDP)",
        issuer: "Ministry of Education / IITs & AICTE",
        code: "AICTE-FDP",
        level: "PROFESSIONAL",
        description: "Official 4-week, 8-week, or 12-week national teaching and advanced domain FDPs approved by AICTE for CAS promotional credits."
      },
      {
        name: "UGC-NET / JRF in Computer Science & Applications (Where Applicable)",
        issuer: "National Testing Agency (NTA) on behalf of UGC",
        code: "Subject Code 87",
        level: "SPECIALTY",
        description: "National Eligibility Test certificate required for University Departments and general colleges (non-mandatory for AICTE engineering colleges, but strengthens academic profiles)."
      },
      {
        name: "AICTE ATAL Academy Faculty Training Certification",
        issuer: "AICTE Training and Learning (ATAL) Academy",
        code: "ATAL-FDP",
        level: "PROFESSIONAL",
        description: "Specialized government-certified pedagogy and research training in emerging technologies for technical education faculty."
      },
      {
        name: "Researcher Academy Scientific Publishing Certification",
        issuer: "Elsevier / Springer Nature Researcher Academy",
        level: "ASSOCIATE",
        description: "Certified coursework in manuscript preparation, academic peer review, ethical scientific reporting, and citation metrics."
      }
    ],
    careerRoles: [
      {
        title: "Assistant Professor (Engineering & Tech)",
        typicalLevel: "Academic Level 10 (Entry)",
        marketDemand: "VERY_HIGH",
        salaryBandIndia: "₹6.5 - ₹12 LPA (7th CPC / State University Scale)"
      },
      {
        title: "Ad-hoc / Guest Faculty (Engineering)",
        typicalLevel: "Contractual / Hourly",
        marketDemand: "HIGH",
        salaryBandIndia: "₹35,000 - ₹60,000 / month (Per-Lecture / Consolidated)"
      },
      {
        title: "Junior Research Fellow (JRF / SRF)",
        typicalLevel: "Funded Research (DST/SERB/CSIR)",
        marketDemand: "HIGH",
        salaryBandIndia: "₹37,000 - ₹42,000 / month + HRA"
      },
      {
        title: "Doctoral Research Scholar (Ph.D.)",
        typicalLevel: "Institute / PMRF Fellow",
        marketDemand: "HIGH",
        salaryBandIndia: "₹37,000 - ₹80,000 / month (PMRF Fellowship)"
      },
      {
        title: "Higher Education Curriculum Specialist",
        typicalLevel: "Academic Staff / EdTech",
        marketDemand: "STEADY",
        salaryBandIndia: "₹7 - ₹15 LPA"
      }
    ],
    semesterMilestones: [
      {
        id: "academic-mtech-sem-1",
        year: "M.Tech Year 1",
        semester: "Semester 1",
        focus: "Advanced core CS mastery, foundational research methodology, and topic exploration.",
        deliverable: "Comprehensive literature survey with bibliography of 30+ peer-reviewed papers using Mendeley/Zotero."
      },
      {
        id: "academic-mtech-sem-2",
        year: "M.Tech Year 1",
        semester: "Semester 2",
        focus: "Experimental framework design, benchmark dataset curation, and conference manuscript drafting.",
        deliverable: "Submission of peer-reviewed paper to an IEEE/ACM or Scopus-indexed conference + seminar presentation."
      },
      {
        id: "academic-mtech-sem-3",
        year: "M.Tech Year 2",
        semester: "Semester 3",
        focus: "Thesis preliminary validation, pedagogical lesson planning, and undergraduate mock lecture preparation.",
        deliverable: "Complete 15-minute mock demo lecture plan (chalk-and-talk + slides) for Data Structures/Algorithms + preliminary thesis."
      },
      {
        id: "academic-mtech-sem-4",
        year: "M.Tech Year 2",
        semester: "Semester 4",
        focus: "Dissertation defense, journal publication under review, Academic CV dossier, and faculty applications.",
        deliverable: "Defended M.Tech thesis + manuscript under review in UGC-CARE / Scopus journal + curated Academic CV dossier."
      }
    ]
  }
];

/**
 * Returns all career pathways where the given subject code is either
 * foundational, core, or specialized.
 */
export function getPathwaysForSubject(subjectCode: string): {
  pathway: CareerPathway;
  courseMapping: PathwayCourse;
}[] {
  const normalized = subjectCode.trim().toUpperCase();
  const results: { pathway: CareerPathway; courseMapping: PathwayCourse }[] = [];

  for (const pathway of CAREER_PATHWAYS) {
    const course = pathway.courses.find(
      (c) => c.code.toUpperCase() === normalized
    );

    if (course) {
      results.push({ pathway, courseMapping: course });
    } else if (pathway.mappedSubjectCodes.includes(normalized)) {
      // Find or infer mapping
      results.push({
        pathway,
        courseMapping: {
          code: subjectCode,
          name: pathway.title,
          semesterNumber: 0,
          programmeCode: "BTECH-CSE",
          importance: "SPECIALIZED",
          roleInPathway: `Supports domain competency in ${pathway.shortTitle}.`
        }
      });
    }
  }

  return results;
}

