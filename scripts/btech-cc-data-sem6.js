// Semester 6 subjects for B.Tech CSE (Cloud Computing)

const SEMESTER_6_SUBJECTS = [
  {
    code: "BCSI601",
    name: "Artificial Intelligence",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To introduce intelligent agents, informed and uninformed search strategies, knowledge representation, probabilistic reasoning, and pattern recognition."
      ],
      outcomes: [
        "Formulate problem solving through state-space search (BFS, DFS, A*, Minimax, Alpha-Beta).",
        "Represent domain knowledge using First-Order Logic and inference mechanisms.",
        "Apply Bayesian reasoning, Markov models, and machine learning classifiers to intelligent systems."
      ],
      modules: [
        {
          title: "MODULE-I: Introduction to Artificial Intelligence",
          topics: "Foundations and history of AI; Applications of AI; Intelligent Agents: Agents and environments, Rationality, Nature of environments, Structure of intelligent agents; Introduction to Computer Vision and Natural Language Processing."
        },
        {
          title: "MODULE-II: Search Strategies",
          topics: "Searching for solutions; Uninformed search: Breadth-First Search, Depth-First Search, Uniform-Cost Search, Iterative Deepening; Informed (Heuristic) search: Greedy best-first search, A* search, Heuristic admissibility; Local search: Hill-climbing, Simulated Annealing, Genetic Algorithms; Adversarial search: Games, Minimax algorithm, Alpha-Beta pruning."
        },
        {
          title: "MODULE-III: Knowledge Representation & Reasoning",
          topics: "Knowledge-based agents; Propositional logic; First-Order Logic (FOL): Syntax and semantics, Extensions and uniqueness; Inference in FOL: Forward chaining, Backward chaining, Resolution refutation; Probabilistic reasoning: Acting under uncertainty, Axioms of probability, Bayes' Rule, Bayesian Networks, Hidden Markov Models (HMM)."
        },
        {
          title: "MODULE-IV: Machine Learning in AI",
          topics: "Supervised and unsupervised learning concepts; Decision tree learning; Statistical learning models; Learning with complete data: Naive Bayes; Learning with hidden variables: Expectation-Maximization (EM) algorithm; Reinforcement Learning: Passive and active RL, Q-Learning."
        },
        {
          title: "MODULE-V: Pattern Recognition",
          topics: "Design principles of pattern recognition systems; Statistical pattern recognition; Parameter estimation: Principal Component Analysis (PCA), Linear Discriminant Analysis (LDA); Classification techniques: Nearest Neighbor (NN) rule, Bayes classifier, Support Vector Machines (SVM), K-Means clustering."
        }
      ],
      textBooks: [
        "Stuart Russell & Peter Norvig, 'Artificial Intelligence: A Modern Approach', 4th Edition, Pearson.",
        "Elaine Rich, Kevin Knight & Shivashankar B. Nair, 'Artificial Intelligence', 3rd Edition, McGraw Hill."
      ],
      referenceBooks: [
        "Dan W. Patterson, 'Introduction to Artificial Intelligence and Expert Systems', PHI."
      ]
    }
  },
  {
    code: "BCSICT601",
    name: "Linux Administration",
    subjectType: "THEORY",
    credits: 1.0,
    lectureHours: 1,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 10, EE: 15, Total: 25",
    syllabusDetails: {
      objectives: [
        "To teach Linux system architecture, command-line operations, package management, disk/storage configuration, and secure user administration."
      ],
      outcomes: [
        "Execute advanced bash shell commands, pipes, redirections, and vi editor operations.",
        "Manage software repositories, mount filesystems, and configure Logical Volume Management (LVM).",
        "Enforce user security permissions, Access Control Lists (ACLs), and disk quotas."
      ],
      modules: [
        {
          title: "MODULE-I: Linux Command Line & File System",
          topics: "Linux filesystem hierarchy; The Shell, Linux utilities, Command line navigation; Root user vs. standard user; Managing Bash with key sequences; File system tasks: Working with directories, viewing text files, finding files (find, locate), piping and redirection; Vi/Vim editor modes, commands, editing; Getting help: man pages and info."
        },
        {
          title: "MODULE-II: System & Software Administration",
          topics: "Software repositories and package databases; Package management: using apt, dpkg, rpm, yum; Installing software from source tarballs; System services and systemd; Backup creation: File backups with tar, device backups using dd; Logging configuration with rsyslog and journald."
        },
        {
          title: "MODULE-III: Storage & File System Management",
          topics: "Mounting and unmounting disks; Automating mounts with /etc/fstab; Checking file system integrity (fsck); Symbolic links vs. Hard links; Comparing filesystems (ext4, XFS, Btrfs); Logical Volume Manager (LVM): Physical Volumes, Volume Groups, Logical Volumes, resizing volumes."
        },
        {
          title: "MODULE-IV: User & Security Configuration",
          topics: "Setting up user accounts; Commands for user and group management (useradd, usermod, groupadd); Password policies and /etc/shadow; Managing user environment; Standard Linux permissions (Read, Write, Execute, Octal notation); Concept of file ownership (chown, chgrp, chmod); SUID, SGID, and Sticky bit."
        },
        {
          title: "MODULE-V: Advanced Permissions & Administration",
          topics: "Default permissions and umask; Posix Access Control Lists (ACLs): getfacl, setfacl; File attributes (chattr, lsattr); Disk quotas: Initializing quota, setting user/group limits (edquota, repquota); Scheduling tasks with cron and at."
        }
      ],
      textBooks: [
        "William E. Shotts Jr., 'The Linux Command Line: A Complete Introduction', No Starch Press.",
        "Jason Cannon, 'Linux for Beginners', CreateSpace."
      ],
      referenceBooks: [
        "Christopher Negus, 'Linux Bible', 10th Edition, Wiley.",
        "Brian Ward, 'How Linux Works: What Every Superuser Should Know', No Starch Press."
      ]
    }
  },
  {
    code: "BCSICT602",
    name: "Ethical Hacking",
    subjectType: "THEORY",
    credits: 4.0,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 0,
    evaluationMarks: "CA: 30, EE: 70, Total: 100",
    syllabusDetails: {
      objectives: [
        "To introduce ethical penetration testing methodologies, footprinting, network scanning, system exploitation, web application attacks, and wireless hacking."
      ],
      outcomes: [
        "Understand penetration testing phases: Reconnaissance, Scanning, Gaining Access, Maintaining Access, Covering Tracks.",
        "Perform vulnerability scanning, OS fingerprinting, and exploitation using Kali Linux tools.",
        "Identify and mitigate web application vulnerabilities (SQL Injection, XSS, CSRF) and wireless threats."
      ],
      modules: [
        {
          title: "MODULE-I: Cyber Ethical Hacking Foundations",
          topics: "Introduction to Cyber Ethical Hacking; What is a Cyber Attack; Types of cyber attacks; Phases of hacking; Information gathering and OSINT; Google Hacking Database (GHDB); Viruses, worms, trojans, backdoors, sniffers, keyloggers; Social engineering tactics; Email, DNS, and IP spoofing; System hacking basics; Honeypots."
        },
        {
          title: "MODULE-II: Reconnaissance, Scanning & System Exploitation",
          topics: "Footprinting and Reconnaissance: Whois, DNS enumeration, ping sweeps; Scanning Networks: Nmap scanning techniques, port scanning, OS fingerprinting; Enumeration: NetBIOS, SNMP, LDAP, SMTP enumeration; System Hacking: Password cracking methods (dictionary, brute-force, rainbow tables), privilege escalation, spyware, rootkits; Sniffing and Wireshark; Denial of Service (DoS/DDoS); Session Hijacking; Web server and web app attacks: SQL Injection, XSS, Command Injection; Wireless network security: WEP, WPA/WPA2 cracking; Evading IDS, firewalls, and honeypots."
        },
        {
          title: "MODULE-III: Advanced Exploitation & Emerging Paradigms",
          topics: "Ethical Hacking in Cloud Computing: Shared responsibility pitfalls, cloud credential theft, metadata service exploitation; Cryptographic vulnerabilities; Mobile platform hacking (Android/iOS); IoT and OT hacking methodologies; Penetration testing reporting and ethical vulnerability disclosure standards."
        }
      ],
      textBooks: [
        "Patrick Engebretson, 'The Basics of Hacking and Penetration Testing', Syngress / Elsevier.",
        "Michael T. Simpson, Kent Backman & James E. Corley, 'Hands-On Ethical Hacking and Network Defense', Cengage Learning."
      ],
      referenceBooks: [
        "Jon Erickson, 'Hacking: The Art of Exploitation', 2nd Edition, No Starch Press.",
        "Dafydd Stuttard & Marcus Pinto, 'The Web Application Hacker's Handbook', Wiley."
      ]
    }
  },
  {
    code: "BCSICT605",
    name: "Cloud Scripting using PaaS",
    subjectType: "THEORY",
    credits: 4.0,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 0,
    evaluationMarks: "CA: 30, EE: 70, Total: 100",
    syllabusDetails: {
      objectives: [
        "To provide hands-on study of Platform-as-a-Service (PaaS), Cloud APIs, serverless computing, infrastructure-as-code, and cloud SDK scripting."
      ],
      outcomes: [
        "Build, deploy, and scale web applications on PaaS platforms (AWS Elastic Beanstalk, Heroku, Google App Engine).",
        "Script cloud resource automation using Python boto3 and cloud CLI tools.",
        "Design serverless architectures with AWS Lambda, API Gateway, and managed databases."
      ],
      modules: [
        {
          title: "MODULE-I: Cloud Service Models & PaaS Evolution",
          topics: "Comprehensive review of cloud service models (IaaS, PaaS, SaaS, BPaaS); Evolution of infrastructure migration from VMware/Xen/KVM to adaptive virtualization; PaaS concepts and advantages; Cloud vendor platforms: Google App Engine, Microsoft Azure App Services, AWS Elastic Beanstalk, OpenStack; Cloud storage services (S3, DynamoDB, Google Cloud Storage)."
        },
        {
          title: "MODULE-II: PaaS Application Development & Deployment",
          topics: "Architecture of PaaS platforms; Building scalable web applications for PaaS runtimes (Node.js, Python, Java); Application containerization; Environment variables, configuration management, and secrets in PaaS; Automated CI/CD integration with PaaS providers; Health monitoring, logging, and auto-scaling triggers."
        },
        {
          title: "MODULE-III: Cloud Scripting with Python & Cloud SDKs",
          topics: "Cloud automation scripting using Python; AWS SDK for Python (boto3); Managing S3 buckets, EC2 instances, and security groups programmatically; Scripting resource life-cycles, backup snapshots, and cost optimization routines; Working with Azure SDK and Google Cloud Client Libraries."
        },
        {
          title: "MODULE-IV: Serverless Computing & Microservices",
          topics: "Serverless execution model; Function-as-a-Service (FaaS): AWS Lambda, Azure Functions, Google Cloud Functions; Event triggers: HTTP events, S3 bucket upload events, DynamoDB streams; Building RESTful serverless microservices with AWS API Gateway and Lambda; Serverless Framework."
        },
        {
          title: "MODULE-V: Infrastructure as Code & Cloud Governance",
          topics: "Concept of Infrastructure as Code (IaC); Declarative configuration with AWS CloudFormation and HashiCorp Terraform basics; Defining PaaS stacks as code; Resource tagging, monitoring, and compliance automation."
        }
      ],
      textBooks: [
        "Cloud Computing Architecture (IBM ICE).",
        "Michael J. Kavis, 'Architecting the Cloud: Design Decisions for Cloud Computing Service Models (SaaS, PaaS, and IaaS)', Wiley."
      ],
      referenceBooks: [
        "Sam Newman, 'Building Microservices: Designing Fine-Grained Systems', O'Reilly Media."
      ]
    }
  },
  {
    code: "BCSICT608",
    name: "Incident Response Management",
    subjectType: "THEORY",
    credits: 2.0,
    lectureHours: 2,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 15, EE: 35, Total: 50",
    syllabusDetails: {
      objectives: [
        "To teach Computer Security Incident Response Management (CSIRM), incident lifecycles, triage, containment, eradication, and forensic readiness."
      ],
      outcomes: [
        "Differentiate between events, incidents, and crises in enterprise computing environments.",
        "Implement the NIST Computer Security Incident Handling Guide lifecycle phases.",
        "Formulate incident containment, eradication, evidence preservation, and post-incident review policies."
      ],
      modules: [
        {
          title: "MODULE-I: Incident Response Foundations & CSIRM",
          topics: "Need for Computer Security Incident Response Management (CSIRM); Differences between an event, incident, and disaster; CSIRT organizational structures and charter; Incident response policies, plans, and team roles (triage, handling, escalation, forensics); Legal and regulatory reporting obligations."
        },
        {
          title: "MODULE-II: Incident Handling Lifecycle",
          topics: "NIST SP 800-61 incident response lifecycle: Preparation, Detection & Analysis, Containment, Eradication & Recovery, Post-Incident Activity; Detection sources: SIEM alerts, IDS/IPS, anti-malware, user reports; Incident prioritization and severity scoring."
        },
        {
          title: "MODULE-III: Containment, Eradication & Digital Forensics",
          topics: "Containment strategies: Short-term vs. long-term containment; Isolating compromised network segments; Preserving digital evidence and volatile memory; Eradication of malicious artifacts and backdoors; Secure system recovery and validation; Chain of custody."
        },
        {
          title: "MODULE-IV: Post-Incident Lessons Learned & Continuous Improvement",
          topics: "Post-incident reviews (Lessons Learned meetings); Drafting incident closure reports; Updating defensive postures and security controls; Developing cyber incident tabletop exercises and disaster recovery drills."
        }
      ],
      textBooks: [
        "Michael E. Whitman & Herbert J. Mattord, 'Principles of Incident Response and Disaster Recovery', Cengage Learning.",
        "Crafting the InfoSec Playbook: Security Monitoring and Incident Response, O'Reilly Media."
      ],
      referenceBooks: [
        "NIST Special Publication 800-61 Revision 2: 'Computer Security Incident Handling Guide'."
      ]
    }
  },
  {
    code: "BCSICT609",
    name: "UI/UX Fundamentals",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To teach user interface and user experience design principles, information architecture, wireframing, usability heuristics, and user research."
      ],
      outcomes: [
        "Apply user-centered design methodologies and Jakob Nielsen's usability heuristics.",
        "Construct user journey flows, wireframes, and interactive prototypes using Figma/Adobe XD.",
        "Conduct usability testing and interpret user behavioral metrics."
      ],
      modules: [
        {
          title: "MODULE-I: Introduction to UX & Human-Centered Design",
          topics: "What is User Experience (UX) vs. User Interface (UI); The Jesse James Garrett 5 planes of UX (Strategy, Scope, Structure, Skeleton, Surface); Human-computer interaction principles; Psychology of design (mental models, affordances, signifiers, feedback)."
        },
        {
          title: "MODULE-II: User Research & Information Architecture",
          topics: "User research methods: Qualitative vs. quantitative; User personas, empathy maps, scenario creation; User journey mapping; Information Architecture (IA): Card sorting, site maps, taxonomic structures, navigation design."
        },
        {
          title: "MODULE-III: Wireframing & Prototyping",
          topics: "Low-fidelity sketching and paper wireframes; Mid-fidelity digital wireframes; High-fidelity prototyping in Figma; Design systems: Component libraries, design tokens, typography scales, color accessibility (WCAG standards)."
        },
        {
          title: "MODULE-IV: Interaction Design & Micro-interactions",
          topics: "Visual hierarchy, grid layouts, whitespace, typography; Laws of UX (Fitts's Law, Hick's Law, Miller's Law, Jakob's Law); Micro-interactions and transition animations; Responsive and mobile-first touch interfaces."
        },
        {
          title: "MODULE-V: Usability Evaluation & Testing",
          topics: "Jakob Nielsen's 10 Usability Heuristics; Heuristic evaluation methodology; Conducting moderated and unmoderated usability tests; A/B testing; Analytics metrics: Task completion rate, time-on-task, Net Promoter Score (NPS), System Usability Scale (SUS)."
        }
      ],
      textBooks: [
        "Don Norman, 'The Design of Everyday Things', Basic Books.",
        "Steve Krug, 'Don't Make Me Think, Revisited: A Common Sense Approach to Web Usability', New Riders."
      ],
      referenceBooks: [
        "Jesse James Garrett, 'The Elements of User Experience', New Riders."
      ]
    }
  },
  {
    code: "BCSICT610",
    name: "Mobile Application Development",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To teach native Android development, activity lifecycles, UI layouts, intent resolution, SQLite databases, and RESTful web service consumption."
      ],
      outcomes: [
        "Develop native Android applications using Android SDK and modern UI widgets.",
        "Manage application state, background services, intents, and permissions.",
        "Store persistent data via SQLite/Room and integrate REST APIs."
      ],
      modules: [
        {
          title: "MODULE-I: Android Platform & Architecture",
          topics: "The Android Platform, Android SDK, Android Studio installation, Android Virtual Device (AVD); Anatomy of an Android application: Project structure, Gradle build system, AndroidManifest.xml, Activity lifecycle."
        },
        {
          title: "MODULE-II: Application Design Essentials",
          topics: "Android terminologies: Application Context, Activities, Services, Broadcast Receivers, Content Providers; Intents: Explicit and Implicit intents, Intent filters, Passing data between activities; Android runtime permissions model."
        },
        {
          title: "MODULE-III: UI Design Essentials",
          topics: "UI screen elements: Views and ViewGroups; Layouts: LinearLayout, RelativeLayout, ConstraintLayout; UI Controls: Buttons, EditText, TextView, Checkboxes, Spinners; Lists and Grids: RecyclerView and Custom Adapters; Fragments and bottom navigation."
        },
        {
          title: "MODULE-IV: Data Persistence & Common APIs",
          topics: "SharedPreferences; SQLite Database: Creating tables, CRUD operations, SQLiteOpenHelper; Room Persistence Library overview; Content Providers for sharing data; Background processing: AsyncTask, WorkManager, Coroutines."
        },
        {
          title: "MODULE-V: Networking, Publishing & Location APIs",
          topics: "Connecting to Internet; Consuming REST APIs using Retrofit / Volley; JSON parsing with Gson; Location-based services: Google Maps API, GPS coordinates; Testing, debugging, building release APK, and Google Play Store publishing guidelines."
        }
      ],
      textBooks: [
        "Lauren Darcey & Shane Conder, 'Android Wireless Application Development', 2nd Edition, Pearson Education.",
        "Bill Phillips & Chris Stewart, 'Android Programming: The Big Nerd Ranch Guide', Big Nerd Ranch."
      ],
      referenceBooks: [
        "Reto Meier, 'Professional Android Application Development', Wiley India."
      ]
    }
  },
  {
    code: "BCSICT611",
    name: "Business Intelligence",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To introduce business intelligence concepts, data warehousing, OLAP cubes, executive dashboards, and cloud analytics platforms."
      ],
      outcomes: [
        "Design star and snowflake schemas for enterprise data warehouses.",
        "Execute OLAP operations (slice, dice, roll-up, drill-down).",
        "Create predictive business dashboards using modern BI tools."
      ],
      modules: [
        {
          title: "MODULE-I: Business Intelligence & Data Warehousing",
          topics: "Definition, evolution, and architecture of Business Intelligence; Operational data vs. Analytical data; Data Warehouse architecture: ETL (Extract, Transform, Load) pipelines; Data Marts; Metadata management."
        },
        {
          title: "MODULE-II: Dimensional Modeling & OLAP",
          topics: "Dimensional modeling concepts: Fact tables, Dimension tables; Star schema, Snowflake schema, Fact constellation schema; OLAP (Online Analytical Processing) architectures: ROLAP, MOLAP, HOLAP; OLAP operations: Roll-up, Drill-down, Slice, Dice, Pivot."
        },
        {
          title: "MODULE-III: Cloud BI & Wave Analytics",
          topics: "Cloud Business Intelligence; Setup and exploration of Wave Analytics / Salesforce Analytics; Creating analytics apps; Desktop and mobile exploration: Data Explorer, Compare Tables; Building Wave datasets."
        },
        {
          title: "MODULE-IV: Dashboard Design & KPI Visualization",
          topics: "Designing executive dashboards; Key Performance Indicators (KPIs); Visualization best practices; Sales Wave and Service Wave applications; Managing service load and predicting future trends from business data."
        }
      ],
      textBooks: [
        "Efraim Turban, Ramesh Sharda & Dursun Delen, 'Business Intelligence: A Managerial Approach', Pearson.",
        "Steve Wasula, 'Introduction to Salesforce Analytics - Building Reports and Dashboards'."
      ],
      referenceBooks: [
        "Ralph Kimball & Margy Ross, 'The Data Warehouse Toolkit: The Definitive Guide to Dimensional Modeling', Wiley."
      ]
    }
  },
  {
    code: "IIOT6",
    name: "Advanced Artificial Intelligence",
    subjectType: "THEORY",
    credits: 4.0,
    lectureHours: 4,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 30, EE: 70, Total: 100",
    syllabusDetails: {
      objectives: [
        "To explore advanced AI paradigms including Natural Language Processing, Transformer architectures, Generative AI, computer vision, and autonomous agent frameworks."
      ],
      outcomes: [
        "Understand attention mechanisms, self-attention, and large language model architectures.",
        "Implement modern Computer Vision pipelines (YOLO, object detection, segmentation).",
        "Design autonomous agent workflows and understand AI ethics and alignment."
      ],
      modules: [
        {
          title: "Unit 1: Natural Language Processing & Word Embeddings",
          topics: "Text preprocessing, tokenization, stemming, lemmatization; N-gram language models; Vector space representations: Bag-of-Words, TF-IDF; Word embeddings: Word2Vec (Skip-gram, CBOW), GloVe, FastText; Subword tokenization (BPE)."
        },
        {
          title: "Unit 2: Transformer Architectures & Attention",
          topics: "Limitations of RNNs/LSTMs; Transformer architecture: Scaled dot-product attention, Multi-head attention, Positional encoding, Feed-forward networks; Encoder-only (BERT), Decoder-only (GPT), and Encoder-Decoder (T5) models; Transfer learning in NLP."
        },
        {
          title: "Unit 3: Large Language Models & Generative AI",
          topics: "Pre-training and fine-tuning paradigms; Instruction tuning and RLHF (Reinforcement Learning from Human Feedback); Prompt engineering, zero-shot and few-shot prompting; Retrieval-Augmented Generation (RAG); Parameter-Efficient Fine-Tuning (PEFT, LoRA)."
        },
        {
          title: "Unit 4: Advanced Computer Vision",
          topics: "Object detection: Two-stage (R-CNN, Fast R-CNN, Faster R-CNN) vs. Single-stage (YOLO, SSD) detectors; Image segmentation: Semantic (U-Net) and Instance (Mask R-CNN) segmentation; Vision Transformers (ViT) overview."
        },
        {
          title: "Unit 5: Autonomous Agents & AI Ethics",
          topics: "ReAct prompting and autonomous agent frameworks (LangChain, AutoGen); Tool-using agents and API calling; Ethical AI: Fairness, bias mitigation, transparency, copyright, safety, and responsible AI alignment guidelines."
        }
      ],
      textBooks: [
        "Dan Jurafsky & James H. Martin, 'Speech and Language Processing', 3rd Edition draft.",
        "Aurélien Géron, 'Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow', O'Reilly."
      ],
      referenceBooks: [
        "Stuart Russell, 'Human Compatible: Artificial Intelligence and the Problem of Control', Viking."
      ]
    }
  },
  {
    code: "BCSICT612",
    name: "Exploring Software as a Service (SaaS) Lab",
    subjectType: "PRACTICAL",
    credits: 2.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    evaluationMarks: "CA: 20, EE: 30, Total: 50",
    syllabusDetails: {
      objectives: [
        "To explore SaaS architectures, multitenancy design patterns, SaaS billing integration, OAuth2 identity, and SaaS web application deployment."
      ],
      outcomes: [
        "Deploy and configure multitenant SaaS applications with customer tenant isolation.",
        "Integrate OAuth2 / SAML single-sign-on (SSO) and RESTful API webhooks."
      ],
      labExperiments: [
        "Study of multitenancy database design patterns (Shared Database / Shared Schema vs. Isolated Database per Tenant).",
        "Deploying a sample multitenant SaaS application on cloud hosting.",
        "Implementing sub-domain based tenant resolution (tenant.app.com) and data isolation.",
        "Configuring OAuth2 / OpenID Connect authentication with Google and GitHub identity providers.",
        "Integrating a subscription billing webhook gateway (Stripe / Razorpay API sandbox).",
        "Configuring Role-Based Access Control (RBAC) with granular tenant admin and member roles.",
        "Monitoring SaaS API usage, rate-limiting with Redis, and tenant analytics dashboards."
      ]
    }
  },
  {
    code: "BCSICT615",
    name: "Linux Administration Lab",
    subjectType: "PRACTICAL",
    credits: 2.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    evaluationMarks: "CA: 20, EE: 30, Total: 50",
    syllabusDetails: {
      objectives: [
        "To configure enterprise Linux servers, manage partitions, bootloaders, network services, Apache, NFS, and Samba."
      ],
      outcomes: [
        "Install and manage Red Hat / Ubuntu enterprise server distributions.",
        "Configure DNS, DHCP, NFS, Samba, FTP, and Apache HTTP servers on Linux."
      ],
      labExperiments: [
        "Installation of Red Hat / Enterprise Linux OS: Partitioning drives, configuring GRUB boot loader, setting time zones and network.",
        "Package selection, installation, and repository management using dnf/apt.",
        "Modifying GRUB configuration: Changing timeout, default kernel, and boot parameters.",
        "Setting up and configuring Samba Server for seamless Linux-Windows cross-platform file sharing.",
        "Configuring DHCP server and client on Linux subnet.",
        "Configuring BIND DNS Server with forward and reverse lookup zones for a chosen domain.",
        "Configuring NFS (Network File System) Server and mounting on remote client machines.",
        "Setting up Linux as a proxy server with Squid.",
        "Configuring Postfix/Dovecot Mail Server on Linux.",
        "Configuring VSFTPD FTP Server and verifying secure file transfers.",
        "Using GCC and G++ compilers for compilation and debugging in Linux.",
        "Configuring and hardening Apache HTTP Web Server (virtual hosts, SSL certificates).",
        "Linux System Administration: sudoers configuration, changing user identities, using administrative monitoring commands (top, htop, vmstat, iostat)."
      ]
    }
  },
  {
    code: "BCSICT616",
    name: "Ethical Hacking Lab",
    subjectType: "PRACTICAL",
    credits: 1.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    evaluationMarks: "CA: 10, EE: 15, Total: 25",
    syllabusDetails: {
      objectives: [
        "To practice ethical penetration testing, vulnerability scanning, network reconnaissance, and exploit simulations in an isolated lab environment."
      ],
      outcomes: [
        "Execute penetration testing steps using Kali Linux tools (Nmap, Metasploit, Wireshark, Burp Suite).",
        "Demonstrate vulnerability assessment, web exploitation, and system hardening."
      ],
      labExperiments: [
        "Google Hacking & OSINT: Utilizing Google Dorks, Shodan, and Maltego for reconnaissance.",
        "Network Scanning with Nmap: Identifying open ports, service versions, and OS fingerprinting.",
        "Network Mapping and vulnerability assessment using Nessus / OpenVAS.",
        "Gaining and Maintaining Access using Metasploit framework in vulnerable sandbox VM.",
        "Password Hacking & Cracking: Performing dictionary and brute-force attacks using John the Ripper and Hashcat.",
        "Man-in-the-Middle (MitM) simulation using ARP spoofing and packet sniffing.",
        "Web Application Security Testing: Intercepting HTTP traffic, testing for SQL Injection and XSS using Burp Suite.",
        "Denial of Service (DoS) attack simulation and analyzing traffic spike patterns.",
        "Covering Tracks & Log Analysis: Examining authentication logs and discussing anti-forensics counters.",
        "Configuring Intrusion Detection and Prevention Systems (Snort / Suricata) with custom alert rules."
      ]
    }
  },
  {
    code: "BCSICT617",
    name: "Project-I",
    subjectType: "PROJECT",
    credits: 4.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    evaluationMarks: "CA: 20, EE: 30, Total: 50",
    syllabusDetails: {
      objectives: [
        "To initiate the capstone project lifecycle: problem definition, literature review, software requirements specification (SRS), system design, and preliminary prototyping."
      ],
      outcomes: [
        "Formulate an engineering problem in cloud computing or cyber security.",
        "Produce an IEEE standard Software Requirements Specification (SRS) and architecture design document.",
        "Present prototype proof-of-concept and defend milestone deliverables before project review panel."
      ],
      labExperiments: [
        "Identification of real-world problem domain in Cloud Computing, Cloud Security, or IoT.",
        "Literature review of research publications and existing commercial solutions.",
        "Preparation of IEEE-compliant Software Requirements Specification (SRS) document.",
        "System Architecture Design: High-level design (HLD), Low-level design (LLD), ER diagrams, UML class and sequence diagrams.",
        "Cloud Infrastructure Planning: Selection of cloud providers, service tiers, database architectures, and tech stack.",
        "Preliminary Proof of Concept (PoC) prototype implementation.",
        "Project-I Progress Presentation and Viva-Voce examination."
      ]
    }
  }
];

module.exports = { SEMESTER_6_SUBJECTS };

