// Semester 7 subjects for B.Tech CSE (Cloud Computing)

const SEMESTER_7_SUBJECTS = [
  {
    code: "BCSICT701",
    name: "Cyber Forensics",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To introduce digital evidence handling, file system forensics (FAT, NTFS, ext, APFS), forensic imaging, and anti-forensics countermeasures."
      ],
      outcomes: [
        "Understand electronic crime types and legal chain-of-custody protocols.",
        "Perform forensic disk imaging and recover deleted files from slack space.",
        "Utilize digital forensic toolkits (Autopsy, FTK Imager, EnCase) for evidence analysis."
      ],
      modules: [
        {
          title: "Module-I: Introduction to Digital Forensics & Cybercrime",
          topics: "Definition and types of cybercrimes; Electronic evidence and handling; Electronic media collection, searching, and seizure of digital storage devices; Introduction to internet crimes, hacking, cracking, financial and ATM frauds; Cryptography in forensics; Emerging digital crimes and investigative challenges."
        },
        {
          title: "Module-II: File Systems & Operating System Artifacts",
          topics: "Definition and cardinal rules of digital forensics; Data acquisition and authentication process (MD5, SHA-256 hashes); Windows file systems: FAT12, FAT16, FAT32, NTFS (MFT, attributes); UNIX and Linux file systems (ext3/ext4, inodes); Mac file systems (HFS+, APFS); Computer artifacts, browser history, registry hives, Prefetch, LNK files; Forensic applications of OS artifacts."
        },
        {
          title: "Module-III: Forensic Tools, Data Recovery & Anti-Forensics",
          topics: "Introduction to forensic tools; Understanding and extracting data from slack space; Tools for disk imaging (dd, FTK Imager); Data carving and file header analysis; Vulnerability assessment tools; EnCase and FTK suites; Anti-forensics techniques (data wiping, encryption, steganography) and countermeasures; Retrieving deleted data from desktops, laptops, and mobile devices; Damaged SIM card data recovery; Processing multimedia evidence."
        }
      ],
      textBooks: [
        "Cory Altheide & Harlan Carvey, 'Digital Forensics with Open Source Tools', Syngress / Elsevier.",
        "Bill Nelson, Amelia Phillips & Christopher Steuart, 'Guide to Computer Forensics and Investigations', Cengage Learning."
      ],
      referenceBooks: [
        "Eoghan Casey, 'Digital Evidence and Computer Crime: Forensic Science, Computers and the Internet', Academic Press."
      ]
    }
  },
  {
    code: "BCSICT702",
    name: "Web Security and SDLC",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To teach web security vulnerabilities, OWASP Top 10, cross-origin security, browser exploitation, and Secure Software Development Life Cycle (S-SDLC)."
      ],
      outcomes: [
        "Analyze web application vulnerabilities including XSS, SQLi, and parameter pollution.",
        "Integrate threat modeling and security checkpoints across Waterfall, Agile, and DevOps SDLC models."
      ],
      modules: [
        {
          title: "MODULE I: Web Fundamentals & Vulnerabilities",
          topics: "Introduction to web security and threat landscapes; Web basics: HTML, CSS, HTTP/HTTPS request-response cycles, Cookies, Sessions; Web application vulnerabilities and classification; Building secure web architectures; Detecting and defending against third-party tracking on the web."
        },
        {
          title: "MODULE II: Web Network Attacks & Injection Flaws",
          topics: "Network attacks and HTTPS mechanisms; Cross-Domain communication (CORS, JSONP); Limitations of HTTPS; Cross-Site Scripting (XSS: Stored, Reflected, DOM-based); SQL Injection (in-band, blind, error-based); OS Command Injection; HTTP Header Injection; Automated discovery of parameter pollution vulnerabilities in web applications."
        },
        {
          title: "MODULE III: Request Authorization & Secure SDLC Models",
          topics: "Request authorization flaws; Insecure web logic, business logic flaws; HTTP Parameter Tampering; Cookie flaws, Session Fixation, and server misconfiguration; Attacks on user interfaces (Clickjacking); Browser and device fingerprinting; User tracking flaws; Browser caching vulnerabilities; Software Development Life Cycle (SDLC) models: Waterfall, Prototyping, Spiral, Evolutionary development, and Secure SDLC (DevSecOps) integration."
        }
      ],
      textBooks: [
        "Dafydd Stuttard & Marcus Pinto, 'The Web Application Hacker's Handbook: Finding and Exploiting Security Flaws', 2nd Edition, Wiley.",
        "Gary McGraw, 'Software Security: Building Security In', Addison-Wesley."
      ],
      referenceBooks: [
        "OWASP Top 10 Web Application Security Risks Documentation."
      ]
    }
  },
  {
    code: "BCSICT703",
    name: "Cloud Security",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To explore core cloud security concepts, multi-tenancy isolation, virtualization-specific attacks, hyperjacking, and cloud compliance regulations."
      ],
      outcomes: [
        "Explain defense-in-depth, least privilege, and cryptographic mechanisms across IaaS, PaaS, and SaaS.",
        "Analyze virtualization threats including guest-hopping, hypervisor escape, and hyperjacking.",
        "Assess legal compliance frameworks including PCI-DSS, HIPAA, GDPR, and CSA Security Guidance."
      ],
      modules: [
        {
          title: "MODULE I: Cloud Security Concepts & Cryptography",
          topics: "Security Concepts: Confidentiality, privacy, integrity, authentication, non-repudiation, availability, access control, defense-in-depth, least privilege; Application of concepts in PaaS, IaaS, and SaaS; User authentication in cloud; Cryptographic systems: Symmetric cryptography, stream/block ciphers, modes of operation, public-key crypto, hashing, digital signatures, PKI, key management, X.509 certificates, OpenSSL."
        },
        {
          title: "MODULE II: Multi-Tenancy & Virtualization Vulnerabilities",
          topics: "Multi-tenancy issues: Isolation of users/VMs from each other; Cloud provider responsibilities; Virtualization system security: ESX and ESXi security, ESX file system security, storage considerations, backup and recovery; Virtualization vulnerabilities: Management console, management server, administrative VM, guest VM, hypervisor vulnerabilities, hypervisor escape, configuration errors, botnets in clouds."
        },
        {
          title: "MODULE III: Virtualization Attacks, Defense & Compliance",
          topics: "Virtualization System-Specific Attacks: Guest hopping, attacks on the VM (deletion, control hijacking, code/file injection into virtualized file structure), VM migration attack, hyperjacking; Technologies for Virtualization-Based Security: Virtual server protection, virtualization-based sandboxing, storage security (HIDPS, log management, Data Loss Prevention - DLP); Legal and Compliance Issues: Data ownership, right to penetration test, jurisdictional data residency laws, examination of modern standards (PCI-DSS, ISO 27017, SOC 2), Cloud Security Alliance (CSA) guidance."
        }
      ],
      textBooks: [
        "Tim Mather, Subra Kumaraswamy & Shahed Latif, 'Cloud Security and Privacy: An Enterprise Perspective on Risks and Compliance', O'Reilly Media.",
        "Ronald L. Krutz & Russell Dean Vines, 'Cloud Security: A Comprehensive Guide to Secure Cloud Computing', Wiley."
      ],
      referenceBooks: [
        "Cloud Security Alliance (CSA), 'Security Guidance for Critical Areas of Focus in Cloud Computing'."
      ]
    }
  },
  {
    code: "BCSICT704",
    name: "Hybrid Cloud Computing",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To introduce hybrid cloud integration, private-public cloud federation, hybrid networking (VPN/Direct Connect), and enterprise workload migration."
      ],
      outcomes: [
        "Design hybrid cloud architectures connecting on-premises data centers to AWS/Azure.",
        "Implement hybrid data synchronization, storage tiering, and cloud bursting strategies."
      ],
      modules: [
        {
          title: "Module I: Hybrid Cloud Architecture & Drivers",
          topics: "Definition and business drivers for hybrid cloud; Comparison of public, private, and hybrid cloud models; NIST definition and deployment scenarios; Workload placement strategies; Latency, data sovereignty, and regulatory compliance considerations."
        },
        {
          title: "Module II: Hybrid Networking & Connectivity",
          topics: "Connecting on-premises environments to cloud; Site-to-Site IPSec VPN tunnels; Dedicated private connections (AWS Direct Connect, Azure ExpressRoute); Hybrid DNS resolution; BGP routing and redundant failover paths."
        },
        {
          title: "Module III: Hybrid Storage & Data Integration",
          topics: "Hybrid storage architectures; Cloud storage gateways (file, volume, tape gateways); Data replication and synchronization; Automated storage tiering (hot, cool, archive tiers); Disaster recovery to the cloud."
        },
        {
          title: "Module IV: Hybrid Management & Workload Migration",
          topics: "Unified hybrid cloud management (AWS Outposts, Azure Stack, Google Anthos); Workload migration tools (AWS Application Migration Service, Azure Migrate); Cloud bursting architectures; Monitoring and cost management in hybrid environments."
        }
      ],
      textBooks: [
        "Rajkumar Buyya, Christian Vecchiola & S. Thamarai Selvi, 'Mastering Cloud Computing', McGraw Hill.",
        "Michael J. Kavis, 'Architecting the Cloud', Wiley."
      ],
      referenceBooks: [
        "Thomas Erl et al., 'Cloud Computing: Concepts, Technology & Architecture', Prentice Hall."
      ]
    }
  },
  {
    code: "BCSICT705",
    name: "Cloud Web Services",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To teach RESTful web services, SOAP, XML/JSON parsing, API management, and cloud web service development with AWS and Azure."
      ],
      outcomes: [
        "Design and document enterprise REST APIs using OpenAPI/Swagger specifications.",
        "Deploy scalable web services with API gateways, caching, and rate limiting."
      ],
      modules: [
        {
          title: "Module I: Web Services Foundations",
          topics: "Evolution of distributed computing; Service Oriented Architecture (SOA) principles; Web services architecture; XML, XSD, SOAP protocol; WSDL (Web Services Description Language); REST architectural style vs. SOAP."
        },
        {
          title: "Module II: RESTful Web Services & API Design",
          topics: "REST design constraints: Statelessness, client-server, cacheability, uniform interface; HTTP verbs (GET, POST, PUT, DELETE, PATCH) and status codes; Resource URI naming conventions; JSON data interchange; Designing REST APIs with Swagger / OpenAPI specifications."
        },
        {
          title: "Module III: Cloud API Gateways & Security",
          topics: "Role of API Gateways in microservices; Request routing, authentication, authorization (JWT, OAuth2); Rate limiting, throttling, and traffic shaping; API caching with Amazon CloudFront and ElastiCache; Securing API endpoints with AWS WAF."
        },
        {
          title: "Module IV: Serverless Web Services & Microservices",
          topics: "Building serverless web services using AWS API Gateway and AWS Lambda; Connecting serverless backends to Amazon DynamoDB and Aurora Serverless; Async event-driven communication using AWS SNS and SQS; Monitoring API metrics with AWS CloudWatch."
        }
      ],
      textBooks: [
        "Leonard Richardson & Sam Ruby, 'RESTful Web Services', O'Reilly Media.",
        "Thomas Erl, 'Service-Oriented Architecture: Concepts, Technology, and Design', Prentice Hall."
      ],
      referenceBooks: [
        "Mark Masse, 'REST API Design Rulebook', O'Reilly Media."
      ]
    }
  },
  {
    code: "BCSICT706",
    name: "Cloud Computing Solutions",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To analyze enterprise cloud solution design, well-architected frameworks, high availability, fault tolerance, and cost optimization."
      ],
      outcomes: [
        "Architect resilient enterprise cloud solutions meeting the 5 pillars of the Well-Architected Framework.",
        "Formulate disaster recovery, auto-scaling, and multi-region deployment topologies."
      ],
      modules: [
        {
          title: "Module I: Cloud Architecture Fundamentals",
          topics: "Cloud solution architecture principles; Understanding customer requirements; AWS Well-Architected Framework pillars: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability."
        },
        {
          title: "Module II: Designing Resilient & High-Availability Topologies",
          topics: "Multi-AZ and Multi-Region architectures; Global traffic management with Route 53 (latency, failover, geolocation routing); Auto-scaling groups and Elastic Load Balancers (ALB, NLB); Decoupling architectures with message queues."
        },
        {
          title: "Module III: Cloud Data & Storage Solutions",
          topics: "Choosing appropriate database solutions (RDS, Aurora, DynamoDB, Redshift); Data lake architectures on Amazon S3; Big data processing pipelines with AWS EMR and Athena; Backup and archival retention strategies with S3 Glacier."
        },
        {
          title: "Module IV: Cloud Migration & Cost Governance",
          topics: "The 6 Rs of cloud migration (Rehost, Replatform, Repurchase, Refactor, Retire, Retain); Cloud financial management (FinOps): Cost allocation tags, AWS Cost Explorer, Reserved Instances, Savings Plans; Enterprise security governance."
        }
      ],
      textBooks: [
        "Joe Baron et al., 'AWS Certified Solutions Architect Official Study Guide', Sybex / Wiley.",
        "Michael J. Kavis, 'Architecting the Cloud', Wiley."
      ],
      referenceBooks: [
        "AWS Well-Architected Framework Whitepapers."
      ]
    }
  },
  {
    code: "BCSICT707",
    name: "Cloud Architectural Patterns",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To introduce distributed cloud design patterns: Circuit Breaker, CQRS, Event Sourcing, Strangler Fig, and Ambassador patterns."
      ],
      outcomes: [
        "Apply cloud design patterns to overcome distributed computing challenges.",
        "Design scalable, loosely-coupled microservice architectures using event-driven patterns."
      ],
      modules: [
        {
          title: "Module I: Scalability Primer & Compute Patterns",
          topics: "Scalability primer: Horizontal vs. vertical scaling; Horizontally scaling compute patterns; Stateless vs. stateful services; Auto-scaling patterns; Load balancing algorithms; Health checking and self-healing patterns."
        },
        {
          title: "Module II: Resiliency & Reliability Patterns",
          topics: "Circuit Breaker pattern; Retry pattern with exponential backoff; Bulkhead pattern for failure isolation; Compensating Transaction pattern; Health Endpoint Monitoring pattern."
        },
        {
          title: "Module III: Data Management Patterns",
          topics: "Command Query Responsibility Segregation (CQRS) pattern; Event Sourcing pattern; Saga pattern for distributed transactions (orchestration vs. choreography); Materialized View pattern; Sharding pattern."
        },
        {
          title: "Module IV: Modernization & Gateway Patterns",
          topics: "Strangler Fig pattern for legacy application migration; Ambassador pattern; Sidecar pattern; Backends for Frontends (BFF) pattern; Gateway Aggregation and Offloading patterns."
        }
      ],
      textBooks: [
        "Bill Wilder, 'Cloud Architecture Patterns: Using Microsoft Azure', O'Reilly Media.",
        "Chris Richardson, 'Microservices Patterns: With Examples in Java', Manning Publications."
      ],
      referenceBooks: [
        "Microsoft Azure Architecture Center: 'Cloud Design Patterns'."
      ]
    }
  },
  {
    code: "BCSICT708",
    name: "Automation and Configuration Management",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To teach Infrastructure as Code (IaC), Ansible, Terraform, AWS Systems Manager, and continuous configuration compliance."
      ],
      outcomes: [
        "Write Ansible playbooks to automate server provisioning and application deployments.",
        "Deploy cloud infrastructure using Terraform declarative configurations.",
        "Manage enterprise server fleets with AWS Systems Manager."
      ],
      modules: [
        {
          title: "Module I: AWS Systems Manager & Fleet Management",
          topics: "Introduction to AWS Systems Manager (SSM); Using SSM Run Command; State Manager; Inventory management; Patch Manager for automated OS updates; Parameter Store for centralized configuration."
        },
        {
          title: "Module II: Configuration Management with Ansible",
          topics: "Ansible architecture: Agentless communication via SSH; Ansible inventory; Modules and ad-hoc commands; Writing Ansible Playbooks (YAML syntax); Tasks, handlers, variables, templates (Jinja2); Ansible Roles and Ansible Galaxy."
        },
        {
          title: "Module III: Infrastructure as Code with Terraform",
          topics: "Terraform core concepts: Providers, resources, variables, outputs; HCL (HashiCorp Configuration Language); Terraform state management (remote state, locking with DynamoDB); Terraform modules; Planning, applying, and destroying cloud infrastructure."
        },
        {
          title: "Module IV: Continuous Compliance & Policy as Code",
          topics: "Policy as Code concepts; AWS Config rules for compliance auditing; Automated remediation with Lambda; GitOps workflows; Infrastructure testing and security scanning."
        }
      ],
      textBooks: [
        "Lorin Hochstein & René Moser, 'Ansible: Up and Running', O'Reilly Media.",
        "Yevgeniy Brikman, 'Terraform: Up & Running: Writing Infrastructure as Code', O'Reilly Media."
      ],
      referenceBooks: [
        "Michael Wittig & Andreas Wittig, 'Amazon Web Services in Action', Manning Publications."
      ]
    }
  },
  {
    code: "BCSICT709",
    name: "Infrastructure Containers",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To teach Linux container internals (namespaces, cgroups), Docker containerization, Kubernetes cluster orchestration, and container networking."
      ],
      outcomes: [
        "Build, optimize, and secure Docker container images using multi-stage Dockerfiles.",
        "Deploy and orchestrate microservices on Kubernetes using Pods, Deployments, and Services."
      ],
      modules: [
        {
          title: "Module I: Container Foundations & Docker",
          topics: "Evolution from VMs to Containers; Linux kernel fundamentals: cgroups, namespaces, union file systems; Installing and configuring Docker; Docker architecture: Docker Daemon, Client, Registry; Docker images and Dockerfiles (multi-stage builds); Managing container lifecycles."
        },
        {
          title: "Module II: Docker Storage & Networking",
          topics: "Docker storage drivers; Volumes, bind mounts, and tmpfs mounts; Docker networking: Bridge, host, overlay, and macvlan networks; Multi-container orchestration using Docker Compose; Docker Swarm basics."
        },
        {
          title: "Module III: Kubernetes Architecture & Workloads",
          topics: "Kubernetes architecture: Master nodes (API Server, etcd, Scheduler, Controller Manager) and Worker nodes (Kubelet, Kube-Proxy, Container Runtime); Core objects: Pods, ReplicaSets, Deployments; Rolling updates, rollbacks; ConfigMaps and Secrets."
        },
        {
          title: "Module IV: Kubernetes Networking, Storage & Cloud Services",
          topics: "Kubernetes Service types: ClusterIP, NodePort, LoadBalancer; Ingress controllers; Persistent Volumes (PV), Persistent Volume Claims (PVC), StorageClasses; Managed Kubernetes services: Amazon EKS, Azure AKS, Google GKE."
        }
      ],
      textBooks: [
        "Nigel Poulton, 'The Kubernetes Book', Nigel Poulton.",
        "Karl Matthias & Sean P. Kane, 'Docker: Up & Running', O'Reilly Media."
      ],
      referenceBooks: [
        "Brendan Burns, Joe Beda & Kelsey Hightower, 'Kubernetes: Up and Running', O'Reilly Media."
      ]
    }
  },
  {
    code: "BCSICT710",
    name: "Artificial Intelligence (Open Elective-II)",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To provide multidisciplinary engineering students with foundational knowledge of AI concepts, search strategies, knowledge graphs, and neural systems."
      ],
      outcomes: [
        "Understand foundational AI principles, problem formulating agents, and state-space search.",
        "Apply knowledge engineering and modern intelligent decision frameworks to diverse engineering domains."
      ],
      modules: [
        {
          title: "Unit I: Introduction & Intelligent Agents",
          topics: "Introduction to Artificial Intelligence; History and milestones; Turing test; Intelligent agents: Structure, environments, agent types; Applications in robotics, healthcare, autonomous vehicles."
        },
        {
          title: "Unit II: Problem Solving & Search Methods",
          topics: "Formulating problems as state-space search; Uninformed search (BFS, DFS, Uniform cost); Heuristic search (A* search, Greedy search); Adversarial search and game trees."
        },
        {
          title: "Unit III: Knowledge Representation",
          topics: "Logic fundamentals; Propositional and predicate calculus; Ontologies and semantic networks; Rule-based expert systems; Handling uncertainty with fuzzy logic and Bayesian reasoning."
        },
        {
          title: "Unit IV: Learning & Neural Networks",
          topics: "Machine learning paradigms; Perceptron model, multilayer feedforward neural networks; Backpropagation basics; Overview of Computer Vision and Natural Language Processing applications."
        }
      ],
      textBooks: [
        "Stuart Russell & Peter Norvig, 'Artificial Intelligence: A Modern Approach', Pearson.",
        "Elaine Rich & Kevin Knight, 'Artificial Intelligence', McGraw Hill."
      ],
      referenceBooks: [
        "Dan W. Patterson, 'Introduction to Artificial Intelligence and Expert Systems', PHI."
      ]
    }
  },
  {
    code: "BCSICT711",
    name: "Big Data Analytics (Open Elective-II)",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To teach big data characteristics (5 Vs), Hadoop ecosystem, HDFS, MapReduce, Apache Spark, and big data analytical pipelines."
      ],
      outcomes: [
        "Explain Big Data architectures and storage mechanisms across HDFS and NoSQL stores.",
        "Write MapReduce and Spark jobs for distributed big data processing and streaming analytics."
      ],
      modules: [
        {
          title: "UNIT I: Introduction to Big Data and Hadoop",
          topics: "Types of Digital Data: Structured, Semi-structured, Unstructured; Characteristics of Big Data (Volume, Velocity, Variety, Veracity, Value); Distributed computing challenges; Hadoop architecture: HDFS (NameNode, DataNode, secondary NameNode), HDFS blocks and replication; Hadoop MapReduce execution model."
        },
        {
          title: "UNIT II: Hadoop Ecosystem Components",
          topics: "Hadoop YARN architecture (ResourceManager, NodeManager); Apache Pig: Pig Latin, data types, execution modes; Apache Hive: Hive QL, tables, partitions, buckets; Data ingestion tools: Apache Sqoop (RDBMS to HDFS), Apache Flume (log streaming)."
        },
        {
          title: "UNIT III: Distributed Processing with Apache Spark",
          topics: "Limitations of MapReduce; Introduction to Apache Spark; Resilient Distributed Datasets (RDDs): Transformations and Actions; Spark SQL: DataFrames and Datasets; Spark Streaming basics."
        },
        {
          title: "UNIT IV: NoSQL Databases & Analytics",
          topics: "NoSQL data models: Key-Value (Redis), Document (MongoDB), Column-Family (HBase, Cassandra), Graph (Neo4j); CAP Theorem and BASE properties; Big Data machine learning with Spark MLlib."
        }
      ],
      textBooks: [
        "Seema Acharya & Subhashini Chellappan, 'Big Data and Analytics', Wiley India.",
        "Tom White, 'Hadoop: The Definitive Guide', 4th Edition, O'Reilly Media."
      ],
      referenceBooks: [
        "Bill Chambers & Matei Zaharia, 'Spark: The Definitive Guide', O'Reilly Media."
      ]
    }
  },
  {
    code: "BCSICT712",
    name: "Data Science (Open Elective-II)",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To introduce data science lifecycles, statistical exploration, machine learning model building, and data communication."
      ],
      outcomes: [
        "Apply statistical data wrangling and visualization routines to derive business insights.",
        "Build, tune, and evaluate machine learning predictive models."
      ],
      modules: [
        {
          title: "Unit I: Introduction to Data Science",
          topics: "Evolution of data science; Data science lifecycle; The role of a data scientist; Types of data; Data collection and ethics; Exploratory data analysis in Python."
        },
        {
          title: "Unit II: Statistical Inference & Modeling",
          topics: "Probability distributions; Sampling and Central Limit Theorem; Hypothesis testing; Linear regression; Logistic regression; Measuring performance (Precision, Recall, ROC curves)."
        },
        {
          title: "Unit III: Machine Learning Algorithms",
          topics: "Supervised learning: Decision Trees, Random Forests, Support Vector Machines; Unsupervised learning: K-Means clustering, Principal Component Analysis (PCA)."
        },
        {
          title: "Unit IV: Data Visualization & Communication",
          topics: "Principles of effective data storytelling; Visualizing with Matplotlib, Seaborn, and interactive dashboards; Communicating model results to non-technical stakeholders."
        }
      ],
      textBooks: [
        "Jake VanderPlas, 'Python Data Science Handbook', O'Reilly Media.",
        "Joel Grus, 'Data Science from Scratch: First Principles with Python', O'Reilly Media."
      ],
      referenceBooks: [
        "Foster Provost & Tom Fawcett, 'Data Science for Business', O'Reilly Media."
      ]
    }
  },
  {
    code: "HAS701",
    name: "Economics for Engineers",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To provide engineering undergraduates with principles of economic decision making, engineering cost estimation, cash flow analysis, depreciation, and financial statements."
      ],
      outcomes: [
        "Evaluate engineering projects using Present Worth, Annual Cash Flow, and Rate of Return methods.",
        "Calculate asset depreciation (Straight-Line, Declining Balance) and perform replacement analysis.",
        "Interpret corporate balance sheets, profit-loss statements, and inflation cost indexes."
      ],
      modules: [
        {
          title: "MODULE -I: Economic Decisions, Costs & Cash Flows",
          topics: "Economic Decisions Making: Overview, Problems, Role, Decision making process; Engineering Costs & Estimation: Fixed, Variable, Marginal & Average Costs, Sunk Costs, Opportunity Costs, Recurring and Non-recurring Costs, Incremental Costs, Cash Costs vs. Book Costs, Life-Cycle Costs; Estimating models (Per-unit, Segmenting, Power-sizing, Learning curve); Cash Flow Diagrams: Time value of money, Nominal & Effective interest; Present Worth Analysis: End-of-year convention, effect of inflation/deflation, taxes, multiple alternatives."
        },
        {
          title: "MODULE-II: Rate of Return & Uncertainty Analysis",
          topics: "Cash Flow & Rate of Return Analysis: Treatment of salvage value, Annual cash flow analysis; Internal Rate of Return (IRR), Incremental analysis, Benefit-Cost Ratio analysis; Sensitivity and Break-even analysis; Public sector economic analysis; Uncertainty in Future Events: Estimates range, Probability, Expected value, Economic decision trees, Simulation, Real options."
        },
        {
          title: "MODULE-III: Depreciation, Replacement & Accounting",
          topics: "Depreciation: Deterioration & obsolescence, Straight-line depreciation, Declining balance depreciation, Tax regulations and capital allowances; Replacement Analysis: Minimum cost life of a new asset, Marginal cost; Inflation and Price Change: Composite vs. commodity indexes, Cash flows inflating at different rates; Financial Accounting: Balance sheet, Income statement, Financial ratios, Cost accounting, Direct and indirect costs allocation."
        }
      ],
      textBooks: [
        "James L. Riggs, David D. Bedworth & Sabah U. Randhawa, 'Economics for Engineers', 4th Edition, Tata McGraw-Hill.",
        "Donald G. Newnan, Ted G. Eschenbach & Jerome P. Lavelle, 'Engineering Economic Analysis', Oxford University Press."
      ],
      referenceBooks: [
        "Sullivan, Wicks & Koelling, 'Engineering Economy', Pearson.",
        "R. Paneerselvam, 'Engineering Economics', PHI."
      ]
    }
  },
  {
    code: "BCSICT713",
    name: "Cyber Forensics Lab",
    subjectType: "PRACTICAL",
    credits: 1.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    evaluationMarks: "CA: 10, EE: 15, Total: 25",
    syllabusDetails: {
      objectives: [
        "To practice physical evidence handling, disk imaging, forensic data carving, slack space recovery, and digital investigation workflows."
      ],
      outcomes: [
        "Create bit-stream disk images and verify cryptographic hashes using FTK Imager and dd.",
        "Extract deleted files, browser history, and USB registry artifacts using Autopsy."
      ],
      labExperiments: [
        "Physical collection of electronic evidence and documenting chain of custody.",
        "Creating forensic bit-stream disk image of a flash drive using FTK Imager and verifying MD5/SHA-256 hashes.",
        "Data carving and recovering deleted images and documents using Autopsy and Foremost.",
        "Analyzing slack space and unallocated clusters for hidden data fragments.",
        "Windows Registry Forensics: Examining USBSTOR keys, UserAssist, and recently opened documents.",
        "Web Browser Forensics: Extracting browsing history, cache, cookies, and download records.",
        "Email Forensics: Analyzing raw RFC 822 email headers, routing IP hops, and identifying spoofed emails.",
        "Network Forensics: Reconstructing transmitted files and HTTP sessions from Wireshark PCAP captures."
      ]
    }
  },
  {
    code: "BCSICT714",
    name: "Web Security and SDLC Lab",
    subjectType: "PRACTICAL",
    credits: 1.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    evaluationMarks: "CA: 10, EE: 15, Total: 25",
    syllabusDetails: {
      objectives: [
        "To apply Secure SDLC documentation, threat modeling, security test cases, cryptographic implementation, and intrusion detection."
      ],
      outcomes: [
        "Produce Software Requirement Specification, threat models, and security test plans.",
        "Implement classical/modern encryption algorithms and demonstrate IDS alerting using Snort."
      ],
      labExperiments: [
        "Preparation of problem statement, Software Requirement Specification (SRS) with security requirements for a target project.",
        "Preparation of Software Configuration Management (SCM) and Risk Management security documentation.",
        "Threat Modeling: Performing application threat modeling using Microsoft Threat Modeling Tool (STRIDE methodology).",
        "Design Phase Architecture Review using CASE tools.",
        "Developing unit test cases and integration security test cases for authentication and authorization.",
        "Performing White-box static analysis (SAST) and Black-box dynamic testing (DAST) on web application code.",
        "Implementing Caesar Cipher and Rail Fence Row/Column Transposition Ciphers.",
        "Implementing Diffie-Hellman Key Exchange mechanism using HTML and JavaScript.",
        "Demonstrating Intrusion Detection System (IDS) alerts using Snort on test network traffic."
      ]
    }
  },
  {
    code: "BCSICT715",
    name: "Cloud Security Lab",
    subjectType: "PRACTICAL",
    credits: 1.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    evaluationMarks: "CA: 10, EE: 15, Total: 25",
    syllabusDetails: {
      objectives: [
        "To analyze cloud service architectures, comparative vendor security features, cloud migration risks, and cost governance."
      ],
      outcomes: [
        "Evaluate security controls across AWS, Azure, and Google Cloud platforms.",
        "Formulate cloud migration roadmaps and implement cost governance policies."
      ],
      labExperiments: [
        "Study of basic cloud architecture models and representing them through enterprise case studies.",
        "Comparative security research on SaaS, PaaS, and IaaS service providers.",
        "Research and presentation on cloud vulnerabilities and obstacles at a generic enterprise level.",
        "Analyzing security and identity services in Amazon Web Services (AWS IAM, Security Groups, KMS).",
        "Analyzing security and identity services in Microsoft Azure (Entra ID, Azure Key Vault).",
        "Analyzing security and identity services in Google Cloud Platform (Cloud IAM, Cloud KMS).",
        "Cloud Cost Management: Configuring budgets, alerts, and cost allocation tags.",
        "Legal and compliance case study on data sovereignty and cross-border cloud storage.",
        "Designing an end-to-end cloud migration plan for an on-premises enterprise application.",
        "Configuring AWS CloudTrail and CloudWatch alerts for unauthorized IAM policy alterations."
      ]
    }
  },
  {
    code: "BCSICT702P",
    name: "Project-II",
    subjectType: "PROJECT",
    credits: 5.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 10,
    evaluationMarks: "CA: 25, EE: 100, Total: 125",
    syllabusDetails: {
      objectives: [
        "To complete the core engineering implementation, deployment, testing, and performance validation of the capstone project initiated in Semester 6."
      ],
      outcomes: [
        "Implement production-grade cloud computing / security architectures.",
        "Execute comprehensive testing (functional, load, security) and deploy on cloud infrastructure.",
        "Author formal project thesis and defend project results before university evaluation board."
      ],
      labExperiments: [
        "Implementation of core project architecture, backend services, and cloud database storage.",
        "Deployment on cloud infrastructure (AWS / Azure / GCP / Docker / Kubernetes).",
        "Implementation of automated test suites (unit testing, integration testing, API testing).",
        "Performance optimization, load testing, and latency benchmarking.",
        "Implementation of cloud security hardening, encryption, and authentication controls.",
        "Authoring formal capstone project thesis following academic formatting standards.",
        "Project defense presentation and live demonstration before External and Internal Examiners."
      ]
    }
  },
  {
    code: "BCSICT703S",
    name: "Summer Project Seminar-III",
    subjectType: "SEMINAR",
    credits: 1.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    evaluationMarks: "CA: 10, EE: 15, Total: 25",
    syllabusDetails: {
      objectives: ["To evaluate senior summer training / pre-placement internship completed between Year III and Year IV."],
      outcomes: ["Present technical advancements, corporate workflows, and project outcomes from senior industrial training."],
      labExperiments: [
        "Submission of senior industrial internship certificate and technical documentation.",
        "Slide deck presentation illustrating industrial tools, cloud technologies, and corporate engineering practices.",
        "Live demonstration of contributions made to live corporate projects.",
        "Oral viva-voce assessing professional engineering readiness and technical problem-solving."
      ]
    }
  }
];

module.exports = { SEMESTER_7_SUBJECTS };

