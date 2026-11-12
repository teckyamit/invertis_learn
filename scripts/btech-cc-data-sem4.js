// Semester 4 subjects for B.Tech CSE (Cloud Computing)

const SEMESTER_4_SUBJECTS = [
  {
    code: "BCSI401",
    name: "Design and Analysis of Algorithms",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To teach algorithmic problem-solving paradigms (Divide-and-Conquer, Greedy, Dynamic Programming, Backtracking, Branch-and-Bound) and computational complexity theory."
      ],
      outcomes: [
        "Formulate recurrence relations and solve them using Master Theorem and substitution.",
        "Apply greedy algorithms and dynamic programming to solve optimization problems.",
        "Differentiate between P, NP, NP-Complete, and NP-Hard complexity classes."
      ],
      modules: [
        {
          title: "UNIT -I: Introduction & Growth of Functions",
          topics: "Notion of an Algorithm; Fundamentals of algorithmic problem solving; Asymptotic notations (O, Ω, Θ, o, ω); Standard complexity classes; Recurrence relations: Substitution method, Recursion tree method, Master's theorem and master theorem master cases; Analysis of non-recursive and recursive algorithms."
        },
        {
          title: "UNIT -II: Divide and Conquer",
          topics: "Divide and conquer design paradigm; Binary Search; Merge Sort; Quick Sort and randomized quick sort analysis; Strassen's matrix multiplication; Finding maximum and minimum elements; Convex hull problem."
        },
        {
          title: "UNIT -III: Greedy Method",
          topics: "Greedy choice property and optimal substructure; Fractional Knapsack problem; Minimum cost spanning trees (Prim's and Kruskal's algorithms); Single-source shortest paths (Dijkstra's algorithm); Huffman coding and data compression; Job sequencing with deadlines."
        },
        {
          title: "UNIT -IV: Dynamic Programming",
          topics: "Principle of optimality; Memoization vs. Tabulation; 0/1 Knapsack problem; Matrix Chain Multiplication; Longest Common Subsequence (LCS); All-Pairs Shortest Paths (Floyd-Warshall algorithm); Bellman-Ford shortest paths algorithm; Travelling Salesperson Problem (TSP)."
        },
        {
          title: "UNIT -V: Backtracking, Branch & Bound, and NP-Completeness",
          topics: "State space trees; Backtracking: N-Queens problem, Subset sum problem, Graph coloring, Hamiltonian cycle; Branch and Bound: Assignment problem, 0/1 Knapsack, TSP; Computational Complexity: Deterministic vs. Non-deterministic algorithms, Classes P, NP, NP-Complete, and NP-Hard; Cook's theorem; Reducibility and standard NP-Complete problems (3-SAT, Clique, Vertex Cover)."
        }
      ],
      textBooks: [
        "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest & Clifford Stein, 'Introduction to Algorithms', 4th Edition, MIT Press / PHI.",
        "Ellis Horowitz, Sartaj Sahni & Sanguthevar Rajasekaran, 'Fundamentals of Computer Algorithms', Universities Press."
      ],
      referenceBooks: [
        "Jon Kleinberg & Éva Tardos, 'Algorithm Design', Pearson.",
        "Alfred V. Aho, John E. Hopcroft & Jeffrey D. Ullman, 'The Design and Analysis of Computer Algorithms', Pearson."
      ]
    }
  },
  {
    code: "BCSI402",
    name: "Operating Systems",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To introduce operating system structures, process scheduling, synchronization, deadlocks, memory management, and file storage systems."
      ],
      outcomes: [
        "Analyze CPU scheduling algorithms (FCFS, SJF, Priority, Round Robin).",
        "Solve race conditions and synchronization problems using semaphores and mutexes.",
        "Evaluate paging, segmentation, and virtual memory page replacement algorithms."
      ],
      modules: [
        {
          title: "UNIT -I: Operating System Overview & System Calls",
          topics: "Role and functions of operating system; Operating system operations (dual-mode operation, privileged instructions); Computing environments; OS structures: Monolithic, layered, microkernel, modular architectures; System calls: Types and mechanisms; System boot process."
        },
        {
          title: "UNIT -II: Process Management & CPU Scheduling",
          topics: "Process concept, PCB (Process Control Block); Process states and state transitions; Process scheduling: Queues, schedulers (long-term, short-term, medium-term), context switching; Inter-Process Communication (IPC): Shared memory and message passing; Threads: User-level and kernel-level threads, multithreading models; CPU scheduling algorithms: FCFS, SJF, SRTF, Priority, Round Robin, Multilevel Queue, Multilevel Feedback Queue."
        },
        {
          title: "UNIT -III: Process Synchronization & Deadlocks",
          topics: "Critical Section problem; Peterson's solution; Hardware support for synchronization (TestAndSet, Swap); Semaphores (counting and binary); Classical IPC problems: Producer-Consumer, Dining Philosophers, Readers-Writers; Monitors; Deadlocks: System model, deadlock characterization (necessary conditions), Resource Allocation Graph (RAG); Deadlock handling: Prevention, Avoidance (Banker's algorithm), Detection and Recovery."
        },
        {
          title: "UNIT -IV: Memory Management",
          topics: "Logical vs. Physical address space; Swapping; Contiguous memory allocation: Fixed and dynamic partitioning, placement strategies (First-fit, Best-fit, Worst-fit), fragmentation (internal and external); Paging: Hardware implementation, TLB (Translation Lookaside Buffer), page table structures (hierarchical, hashed, inverted); Segmentation; Virtual Memory: Demand paging, page fault handling, page replacement algorithms (FIFO, Optimal, LRU, LFU), Thrashing and working-set model."
        },
        {
          title: "UNIT -V: Storage Management & File Systems",
          topics: "File concept: Attributes, operations, types, access methods (sequential, direct); Directory structures: Single-level, two-level, tree-structured; File system mounting and sharing; Protection and access control lists; File system implementation: Directory allocation, allocation methods (contiguous, linked, indexed), free space management (bit vector, linked list); Disk scheduling: FCFS, SSTF, SCAN, C-SCAN, LOOK; Disk formatting, boot block, bad blocks."
        }
      ],
      textBooks: [
        "Abraham Silberschatz, Peter Baer Galvin & Greg Gagne, 'Operating System Concepts', 10th Edition, Wiley.",
        "William Stallings, 'Operating Systems: Internals and Design Principles', 9th Edition, Pearson."
      ],
      referenceBooks: [
        "Andrew S. Tanenbaum & Herbert Bos, 'Modern Operating Systems', 4th Edition, Pearson."
      ]
    }
  },
  {
    code: "BCSI403",
    name: "Computer Organization and Architecture",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To impart fundamental concepts of CPU design, register transfer language, arithmetic circuits, pipelining, and memory hierarchies."
      ],
      outcomes: [
        "Understand register transfer logic, common bus architectures, and micro-operations.",
        "Design hardwired and microprogrammed control units and understand pipeline hazards.",
        "Analyze cache memory mapping techniques and I/O organization with DMA."
      ],
      modules: [
        {
          title: "UNIT -I: Register Transfer & Basic Computer Organization",
          topics: "Register Transfer Language; Bus and Memory transfers: Three-state bus buffers; Arithmetic, logic, and shift micro-operations; Computer registers, computer instructions, instruction cycle (fetch, decode, execute); Register-reference, memory-reference, and input-output instructions; Design of basic computer."
        },
        {
          title: "UNIT -II: Central Processing Unit & Control Unit Design",
          topics: "General register organization, stack organization, instruction formats (three-address, two-address, one-address, zero-address); Addressing modes: Immediate, direct, indirect, register, register indirect, displacement; Data transfer and manipulation instructions; Program control; Control memory, address sequencing; Microprogram sequencer; Hardwired vs. Microprogrammed control."
        },
        {
          title: "UNIT -III: Computer Arithmetic",
          topics: "Addition and subtraction of signed magnitude numbers and 2's complement; Multiplication algorithms: Hardware implementation, Booth's multiplication algorithm; Division algorithms: Restoring and non-restoring division; Floating-point arithmetic operations (IEEE 754 standard: single and double precision formats)."
        },
        {
          title: "UNIT -IV: Pipelining & Vector Processing",
          topics: "Parallel processing, Flynn's classification; Pipelining: Linear pipeline processor, arithmetic pipeline, instruction pipeline; Pipeline hazards: Structural, data (RAW, WAR, WAW), and branch hazards; Hazard mitigation (forwarding, branch prediction, delayed branch); RISC vs. CISC architectures; Introduction to vector processing and array processors."
        },
        {
          title: "UNIT -V: Memory Organization & Input-Output Organization",
          topics: "Memory hierarchy; Main memory (RAM and ROM chips), memory address map; Auxiliary memory; Associative memory; Cache memory: Locality of reference, mapping functions (direct, associative, set-associative), cache write policies (write-through, write-back), cache replacement algorithms; Virtual memory; I/O interface, asynchronous data transfer (strobe, handshaking); Modes of transfer: Programmed I/O, Interrupt-driven I/O, Direct Memory Access (DMA); Priority interrupt (daisy chaining)."
        }
      ],
      textBooks: [
        "M. Morris Mano, 'Computer System Architecture', 3rd Edition, Pearson.",
        "William Stallings, 'Computer Organization and Architecture', 10th Edition, Pearson."
      ],
      referenceBooks: [
        "David A. Patterson & John L. Hennessy, 'Computer Organization and Design: The Hardware/Software Interface', Morgan Kaufmann."
      ]
    }
  },
  {
    code: "BCSI404",
    name: "Computer Networks",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To introduce layered network architectures (OSI and TCP/IP), physical transmission, data link protocols, IP routing, transport protocols, and application layer protocols."
      ],
      outcomes: [
        "Compare OSI and TCP/IP protocol stacks and analyze packet encapsulation.",
        "Implement error detection (CRC) and flow control (Sliding Window) protocols.",
        "Calculate IPv4/IPv6 subnetting and analyze routing algorithms (OSPF, BGP, RIP)."
      ],
      modules: [
        {
          title: "UNIT -I: Introduction & Physical Layer",
          topics: "Data communication components, networks, topologies (mesh, star, bus, ring); Network categories (LAN, MAN, WAN); Protocol suites: OSI 7-layer model vs. TCP/IP model; Physical layer: Transmission media (guided: twisted pair, coaxial, optical fiber; unguided: radio, microwave, infrared); Data encoding and modulation; Switching techniques: Circuit switching, message switching, packet switching (datagram vs. virtual circuit)."
        },
        {
          title: "UNIT -II: Data Link Layer & Medium Access Control",
          topics: "Data link layer design issues: Framing, error control, flow control; Error detection and correction: Parity, Checksum, Cyclic Redundancy Check (CRC), Hamming codes; Elementary flow control protocols: Stop-and-Wait; Sliding window protocols: Go-Back-N, Selective Repeat; Medium Access Control (MAC): Random access (ALOHA, Slotted ALOHA, CSMA, CSMA/CD, CSMA/CA); Controlled access; IEEE 802.3 Ethernet, IEEE 802.11 Wireless LAN; MAC addressing and switches."
        },
        {
          title: "UNIT -III: Network Layer",
          topics: "Network layer functions; Logical addressing: IPv4 addressing (classful, classless CIDR, subnetting, supernetting), IPv6 addressing and migration; Address resolution: ARP, RARP; Internet Control protocols: ICMP, IGMP; Routing algorithms: Optimality principle, Distance Vector routing (RIP) and count-to-infinity problem, Link State routing (OSPF), Path Vector routing (BGP); Routers and NAT (Network Address Translation)."
        },
        {
          title: "UNIT -IV: Transport Layer",
          topics: "Transport layer services and multiplexing/demultiplexing; Port numbers; User Datagram Protocol (UDP): Segment structure, checksum; Transmission Control Protocol (TCP): Segment header, connection management (3-way handshake, teardown); TCP Reliable data transfer; Flow control (sliding window buffer management); Congestion control: AIMD, slow start, congestion avoidance, fast retransmit, fast recovery."
        },
        {
          title: "UNIT -V: Application Layer & Network Security Basics",
          topics: "Domain Name System (DNS): Hierarchical namespace, resource records, name servers; World Wide Web and HTTP/HTTPS: Persistent and non-persistent connections, cookies, web caching; Electronic Mail: SMTP, POP3, IMAP; File transfer: FTP; Dynamic Host Configuration Protocol (DHCP); Network management: SNMP; Introduction to network security: Cryptographic tools, SSL/TLS, firewalls, and VPNs."
        }
      ],
      textBooks: [
        "Andrew S. Tanenbaum & David J. Wetherall, 'Computer Networks', 5th Edition, Pearson.",
        "James F. Kurose & Keith W. Ross, 'Computer Networking: A Top-Down Approach', 7th Edition, Pearson."
      ],
      referenceBooks: [
        "Behrouz A. Forouzan, 'Data Communications and Networking', 5th Edition, McGraw Hill."
      ]
    }
  },
  {
    code: "BCSICT401",
    name: "Information Security",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To help students understand foundational concepts of information security.",
        "To make it possible for students to appreciate the need for securing information from threats and risks.",
        "To facilitate students to gain knowledge on how network infrastructure and connectivity can be secured."
      ],
      outcomes: [
        "Explain basic concepts and importance of information security.",
        "Identify threats to information security, analyse their impact and propose suitable countermeasures.",
        "Describe various aspects of securing network infrastructure and importance of classifying information."
      ],
      modules: [
        {
          title: "UNIT- I: Introduction to Information Security",
          topics: "Overview of Information security, Threats, Type of Vulnerabilities and Risk, Business Requirements, Information Security Definitions – Security Policies – Tier 1 (origination Level), Tier 2 (Functional Level), Tier 3 (Application or Device Level), Procedures, Standards, Guidance. Role of Governance in Information Security, Develop a Risk Management Program, Risk Management Process, Best Practices for IT Governance, Case study."
        },
        {
          title: "UNIT- II: Information Asset Classification",
          topics: "Classification of Information, Information Assets – Owner, Custodian, User, Information Classification in terms of Secret, Confidential, Private and Public, Declassification. Retention and Disposal of Information Assets. Provide Authorization for Access – Owner, Custodian and User, Case study."
        },
        {
          title: "UNIT- III: Access Control",
          topics: "User Identity and Access Management- Account Authorization, Access and Privilege Management, System and Network Access Control. Operating Systems Access Controls, Monitoring Systems Access Controls, Intrusion Detection System, Event logging, Cryptography. Physical Security: Identify Assets to be Protected, Perimeter Security, Firewalls, Prevention and Detection Systems, Safe Disposal of Physical Assets. Email Security: PGP, MIME, IP Security: IP security overview, Case study."
        },
        {
          title: "UNIT- IV: Introduction to Cryptography",
          topics: "Introduction to Advanced Cryptography and Cryptanalysis, Classical Encryption Techniques – Substitution Techniques, Transposition Techniques, Permutation Method. Advanced Encryption Techniques and Security Issues – RC4, One-time Pad, RSA, DES, Triple DES, AES and Diffie Hellman, Case study."
        },
        {
          title: "UNIT- V: Conventional Encryption",
          topics: "Confidentiality using conventional encryption – Placement of Encryption, Traffic Confidentiality, Key Distribution and Random Number Generation. Key management – Generating Keys, Nonlinear Keyspaces, Transferring Keys, Verifying Keys, Using Keys, Updating Keys, Storing keys, Backup keys, Compromised Keys, Lifetime of Keys, Destroying Keys and Public-Key Management, Case study."
        }
      ],
      textBooks: [
        "Mark Stamp's Information Security: Principles and Practice (WIND), Deven N. Shah, Wiley (2009).",
        "Cryptography and Information Security by V. K. Pachghare, Prentice-Hall of India, 2nd Revised edition (2015).",
        "Cryptography and Network Security Principles and Practices, by William Stallings, Pearson Education; 7th edition (2017)."
      ],
      referenceBooks: [
        "Applied Cryptanalysis – Breaking Ciphers in the Real World, Stamp, Richard M.Low.",
        "Serious Cryptography: A Practical Introduction to Modern Encryption by Jean-Philippe Aumasson."
      ]
    }
  },
  {
    code: "BCSICT402",
    name: "Storage and Datacenter",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To impart the basic concepts of Storage systems and Datacenter environment.",
        "To understand concepts about RAID techniques.",
        "To understand basic concepts about NAS and SAN.",
        "To understand about taking backup and restoring data with Business Continuity and Disaster Recovery concepts and tools.",
        "To understand about Data Center Consolidation and Clustering."
      ],
      outcomes: [
        "Describe storage architectures, direct attached storage, and RAID performance impacts.",
        "Configure and contrast Network Attached Storage (NAS), Fibre Channel SAN, and IP-SAN/iSCSI.",
        "Plan business continuity, backup deduplication, data center consolidation phases, and high-availability server clusters."
      ],
      modules: [
        {
          title: "UNIT- I: Introduction to Storage System",
          topics: "Introduction to Information Storage: Information Storage, Evolution of Storage Architecture, Data Center Infrastructure, Virtualization and Cloud Computing. Data Center Environment: Application, Database Management System (DBMS), Host (Compute), Connectivity, Storage, Host Access to Data, Direct-Attached Storage, Storage Design Based on Application. Data Protection (RAID): RAID Implementation Methods, RAID Array Components, RAID Techniques, RAID Levels (RAID 0, 1, 3, 5, 6, 10), RAID Impact on Disk Performance, RAID Comparison."
        },
        {
          title: "UNIT- II: Storage Networking Technologies",
          topics: "Network-Attached Storage: General-Purpose Servers versus NAS Devices, Benefits of NAS, File Systems and Network File Sharing, Components of NAS, NAS I/O Operation, NAS Implementations, NAS File-Sharing Protocols (NFS, CIFS), Factors Affecting NAS Performance, File-Level Virtualization. Fibre Channel Storage Area Networks: Fibre Channel Overview, The SAN and Its Evolution, Components of FC SAN, FC Connectivity, Switched Fabric Ports, Fibre Channel Architecture, Fabric Services, Switched Fabric Login Types, Zoning, FC SAN Topologies, Virtualization in SAN. IP SAN and FCoE: iSCSI, FCIP, FCoE."
        },
        {
          title: "UNIT- III: Backup and Disaster Recovery",
          topics: "Introduction to Business Continuity: Information Availability, BC Terminology, BC Planning Life Cycle, Failure Analysis, Business Impact Analysis, BC Technology Solutions. Backup and Archive: Backup Purpose, Backup Considerations, Backup Granularity, Recovery Considerations, Backup Methods, Backup Architecture, Backup and Restore Operations, Backup Topologies, Backup in NAS Environments, Backup Targets, Data Deduplication for Backup, Backup in Virtualized Environments, Data Archive, Archiving Solution Architecture."
        },
        {
          title: "UNIT- IV: Data Center Consolidation",
          topics: "Reasons for Data Center Consolidation: Consolidation Opportunities. Data Center Consolidation Phases: Phase 1: Study and Document the Current Environment, Phase 2: Architect the Target Consolidated Environment, Phase 3: Implement the New Architecture, Phase 4: Control and Administer the Consolidated. Best Practices in IT: Defining Best Practices, Deploying Best Practices, Benefits of Best Practices, Systems Management Best Practices, Server Cluster Best Practices, Data Storage Best Practices, Network Management Best Practices, Documentation Best Practices, Network Diagram Documentation, Documentation Formats."
        },
        {
          title: "UNIT- V: Data Center Clusters",
          topics: "Cluster Architecture: Asymmetric Two-Node Clusters, Symmetric Two-Node Clusters, Complex Cluster Configurations, Failover Policies, Best Practices. Cluster Requirements: Required Hardware Cluster Components, Cluster Software Requirements, What Happens During Service Failover, Cluster Installation Checklist. Designing Cluster-Friendly Applications: Automating Operations, Controlling Application Failover Time, Reducing Data Loss during Failover, Minimizing Application Failures, Designing Node-Independent Applications, Minimizing Planned Downtime, Restoring Client Connections."
        }
      ],
      textBooks: [
        "Information Storage and Management: Storing, Managing, and Protecting Digital Information in Classic, Virtualized, and Cloud Environments, 2nd Edition by Somasundaram Gnanasundaram & Alok Shrivastava, EMC Education Services / Wiley.",
        "Administering Data Centers: Servers, Storage, and Voice over IP by Kailash Jayaswal, Wiley."
      ],
      referenceBooks: [
        "Storage Networks Explained: Basics and Application of Fibre Channel SAN, NAS, iSCSI, InfiniBand and FCoE by Ulf Troppens et al., Wiley.",
        "Storage Management in Data Centers by Volker Herminghaus & Albrecht Scriba, Springer."
      ]
    }
  },
  {
    code: "IIOT4",
    name: "Machine Learning",
    subjectType: "THEORY",
    credits: 4.0,
    lectureHours: 4,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 30, EE: 70, Total: 100",
    syllabusDetails: {
      objectives: [
        "To introduce supervised, unsupervised, and reinforcement machine learning algorithms, regularizations, ensemble models, and model evaluation techniques."
      ],
      outcomes: [
        "Build predictive classification and regression models using scikit-learn.",
        "Implement Decision Trees, Random Forests, Support Vector Machines, and Gradient Boosting.",
        "Evaluate model performance, prevent overfitting, and perform hyperparameter tuning."
      ],
      modules: [
        {
          title: "Unit 1: Foundations of Machine Learning",
          topics: "Overview of Machine Learning; Supervised, Unsupervised, Semi-supervised, and Reinforcement Learning; Machine learning pipeline: Data ingestion, feature engineering, train-test split, validation; Overfitting, underfitting, bias-variance tradeoff; Cross-validation techniques (K-Fold, Stratified K-Fold)."
        },
        {
          title: "Unit 2: Linear & Logistic Models",
          topics: "Linear regression: Cost function, Ordinary Least Squares (OLS), Gradient Descent (batch, stochastic, mini-batch); Ridge (L2) and Lasso (L1) regularization; Logistic regression for binary and multi-class classification (One-vs-Rest, Softmax); Maximum likelihood estimation."
        },
        {
          title: "Unit 3: Tree Models & Ensemble Learning",
          topics: "Decision Trees: Information Gain, Entropy, Gini Impurity, CART algorithm; Pruning techniques; Ensemble methods: Bagging and Random Forest; Boosting: AdaBoost, Gradient Boosting Machine (GBM), XGBoost fundamentals; Voting classifiers and Stacking."
        },
        {
          title: "Unit 4: Kernel Methods & Distance-Based Classifiers",
          topics: "K-Nearest Neighbors (KNN): Distance metrics (Euclidean, Manhattan, Minkowski); Support Vector Machines (SVM): Hyperplane, margin, hard vs. soft margin, kernel trick (linear, polynomial, RBF, sigmoid); Naive Bayes classifier: Bayes theorem, Gaussian and Multinomial Naive Bayes."
        },
        {
          title: "Unit 5: Unsupervised Learning & Dimensionality Reduction",
          topics: "Clustering: K-Means algorithm, Elbow method, Silhouette score, Hierarchical clustering (dendrograms), DBSCAN density-based clustering; Dimensionality Reduction: Principal Component Analysis (PCA), eigenvalues, eigenvectors, explained variance ratio; t-SNE basics."
        }
      ],
      textBooks: [
        "Aurélien Géron, 'Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow', 3rd Edition, O'Reilly Media.",
        "Tom M. Mitchell, 'Machine Learning', McGraw Hill."
      ],
      referenceBooks: [
        "Christopher M. Bishop, 'Pattern Recognition and Machine Learning', Springer."
      ]
    }
  },
  {
    code: "BCSI405",
    name: "Design and Analysis of Algorithms Lab",
    subjectType: "PRACTICAL",
    credits: 1.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    evaluationMarks: "CA: 10, EE: 15, Total: 25",
    syllabusDetails: {
      objectives: ["To implement algorithmic design paradigms (Divide & Conquer, Greedy, Dynamic Programming, Backtracking) in C/C++."],
      outcomes: ["Implement and benchmark algorithmic runtime efficiency across varying dataset sizes."],
      labExperiments: [
        "Implementation and comparative empirical analysis of Merge Sort and Quick Sort.",
        "Implementation of Strassen's Matrix Multiplication using Divide and Conquer.",
        "Implementation of Fractional Knapsack problem using Greedy method.",
        "Implementation of Minimum Cost Spanning Tree using Prim's algorithm and Kruskal's algorithm.",
        "Implementation of Dijkstra's Single Source Shortest Path algorithm.",
        "Implementation of 0/1 Knapsack problem using Dynamic Programming.",
        "Implementation of Longest Common Subsequence (LCS) using Dynamic Programming.",
        "Implementation of All-Pairs Shortest Path using Floyd-Warshall algorithm.",
        "Implementation of N-Queens problem using Backtracking."
      ]
    }
  },
  {
    code: "BCSI406",
    name: "Employability Skills",
    subjectType: "PRACTICAL",
    credits: 1.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    evaluationMarks: "CA: 10, EE: 15, Total: 25",
    syllabusDetails: {
      objectives: ["To hone quantitative aptitude, logical reasoning, verbal ability, and corporate placement readiness."],
      outcomes: ["Solve recruitment aptitude evaluations and demonstrate professional group discussion capability."],
      labExperiments: [
        "Quantitative Aptitude: Numbers, percentages, profit and loss, ratio and proportions, time and work, time-speed-distance.",
        "Logical Reasoning: Blood relations, seating arrangement, syllogisms, coding-decoding, series completion.",
        "Verbal Ability: Reading comprehension, sentence correction, para-jumbles, critical reasoning.",
        "Aptitude Mock Tests: Timed computerized test simulations covering industry recruitment patterns.",
        "Technical Group Discussion and HR Interview simulation."
      ]
    }
  },
  {
    code: "BCSI407",
    name: "Computer Networks Lab",
    subjectType: "PRACTICAL",
    credits: 1.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    evaluationMarks: "CA: 10, EE: 15, Total: 25",
    syllabusDetails: {
      objectives: ["To configure networking equipment, simulate protocols in Cisco Packet Tracer, and analyze traffic with Wireshark."],
      outcomes: ["Configure subnets, switches, and routers, and dissect protocol packets using packet analyzers."],
      labExperiments: [
        "Study of Network Hardware: UTP cable crimping (Straight-through and Crossover standards RJ-45).",
        "Network Configuration: Setting static IP addresses, subnets, default gateways, and checking via ping/traceroute.",
        "Packet Analysis with Wireshark: Capturing and inspecting Ethernet frames, ARP requests, IP headers, and TCP 3-way handshakes.",
        "Implementation of Error Detection: Writing C programs for CRC (Cyclic Redundancy Check) calculation.",
        "Cisco Packet Tracer: Designing a LAN topology with switches and end devices.",
        "Configuring Inter-VLAN routing on Cisco Layer-2 and Layer-3 switches.",
        "Configuring Static and Dynamic Routing (RIP and OSPF) on Cisco Routers.",
        "Socket Programming: Implementing Client-Server TCP socket communication in C/Python."
      ]
    }
  },
  {
    code: "BCSI408",
    name: "Operating System Lab",
    subjectType: "PRACTICAL",
    credits: 1.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    evaluationMarks: "CA: 10, EE: 15, Total: 25",
    syllabusDetails: {
      objectives: ["To practice Linux shell scripting, system calls, process scheduling, and page replacement simulation."],
      outcomes: ["Write bash scripts, utilize fork/exec system calls, and simulate OS memory/CPU scheduling algorithms."],
      labExperiments: [
        "Linux Shell Programming: Writing scripts with conditionals, loops, functions, and pattern matching (grep, sed, awk).",
        "Process Creation: Writing C programs utilizing fork(), exec(), wait(), and exit() system calls.",
        "Simulation of CPU Scheduling Algorithms: FCFS, SJF, Priority, and Round Robin.",
        "Implementation of Inter-Process Communication (IPC) using Pipes and Shared Memory in C.",
        "Simulating Process Synchronization: Producer-Consumer problem using Semaphores and Pthreads.",
        "Implementation of Banker's Algorithm for Deadlock Avoidance.",
        "Simulation of Page Replacement Algorithms: FIFO, LRU, and Optimal."
      ]
    }
  },
  {
    code: "BCSICT403",
    name: "Storage and Datacenter Lab",
    subjectType: "PRACTICAL",
    credits: 1.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    evaluationMarks: "CA: 10, EE: 15, Total: 25",
    syllabusDetails: {
      objectives: [
        "To provide hands-on experience in storage allocation, RAID arrays, NAS/SAN configuration, and Windows/Linux server clustering."
      ],
      outcomes: [
        "Configure direct attached storage, RAID 0, 1, 5, iSCSI targets, NFS shares, and Hyper-V snapshots.",
        "Set up Network Load Balancing (NLB) and Failover Clustering in Windows Server 2012 R2."
      ],
      labExperiments: [
        "Configuring Directly Attached Disks for Basic and Dynamic Disks in Windows/Linux.",
        "Creating and configuring disk partitions and volumes (Simple, Spanned, Striped, Mirrored) for disks.",
        "Creating and configuring RAID 0, RAID 1, and RAID 5 arrays in Windows Server 2012 R2.",
        "Configuring Network Shares and Access Control in Windows Server 2012 R2.",
        "Configuring the File Server role and quota management in Windows Server 2012 R2.",
        "Configuring Network File System (NFS) share in Linux Server.",
        "Configuring iSCSI Target and Initiator in Windows Server 2012 R2.",
        "Configuring Fibre Channel over Ethernet (FCoE) concepts and emulation in storage lab.",
        "Creating a System Backup and Restoring in Windows Server and Linux systems.",
        "Creating and Restoring Snapshots for Virtual Machines in Hyper-V / VirtualBox.",
        "Installing and configuring Network Load Balancing (NLB) in Windows Server 2012 R2.",
        "Installing and configuring Failover Clustering in Windows Server 2012 R2."
      ]
    }
  }
];

module.exports = { SEMESTER_4_SUBJECTS };

