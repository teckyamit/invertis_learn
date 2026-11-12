// Semester 5 subjects for B.Tech CSE (Cloud Computing)

const SEMESTER_5_SUBJECTS = [
  {
    code: "BCSI501",
    name: "Theory of Computation",
    subjectType: "THEORY",
    credits: 4.0,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 0,
    evaluationMarks: "CA: 30, EE: 70, Total: 100",
    syllabusDetails: {
      objectives: [
        "To introduce formal languages, automata theory, computability, Turing machines, and undecidability."
      ],
      outcomes: [
        "Construct DFA, NFA, and regular expressions for formal regular languages.",
        "Design Context-Free Grammars and Pushdown Automata (PDA).",
        "Design Turing Machines and analyze undecidable problems using halting problem and Rice's theorem."
      ],
      modules: [
        {
          title: "MODULE -I: Regular Languages & Finite Automata",
          topics: "Alphabets, Strings and Languages; Deterministic finite Automata (DFA), State transition graph, Transition table, Language of DFA; Nondeterministic finite Automata (NFA), NFA with epsilon transition, Equivalence of NFA and DFA; Minimization of Finite Automata; Regular expressions (RE): Definition, Operators and precedence, Algebraic laws; Kleene's Theorem; RE to FA and DFA to RE (Arden's Theorem); Non-Regular Languages, Pumping Lemma for regular Languages and applications; Closure and Decision properties of Regular Languages; Moore and Mealy machines, Equivalence of Moore and Mealy machines."
        },
        {
          title: "MODULE- II: Context Free Grammars & Pushdown Automata",
          topics: "Context Free Grammar (CFG) and Context Free Languages (CFL): Derivations, Derivation trees, Ambiguity in Grammar, Simplification of CFGs, Normal forms (Chomsky Normal Form - CNF, Greibach Normal Form - GNF); Closure properties and Decision Properties of CFLs; Pumping lemma for CFLs; Pushdown Automata (PDA): Formal definition, Instantaneous Description, Acceptance by final state and empty stack, Deterministic PDA, Equivalence of PDA and CFG, Two-stack PDA."
        },
        {
          title: "MODULE -III: Turing Machines & Undecidability",
          topics: "Turing Machine (TM): Basic model, definition and representation, Instantaneous Description, Language acceptance; Variants of Turing Machine, TM as computer of integer functions; Universal Turing Machine; Church-Turing Thesis; Recursive and recursively enumerable languages; Halting problem; Introduction to Undecidability, Rice's theorem, Post Correspondence Problem (PCP), Modified PCP; Introduction to recursive function theory."
        }
      ],
      textBooks: [
        "K.L.P. Mishra and N. Chandrasekaran, 'Theory of Computer Science: Automata, Languages and Computation', PHI.",
        "John E. Hopcroft, Rajeev Motwani & Jeffrey D. Ullman, 'Introduction to Automata Theory, Languages and Computation', Pearson.",
        "Peter Linz, 'An Introduction to Formal Languages and Automata', Narosa."
      ],
      referenceBooks: [
        "C. Papadimitriou & C.L. Lewis, 'Elements of the Theory of Computation', PHI.",
        "Michael Sipser, 'Introduction to the Theory of Computation', Cengage Learning."
      ]
    }
  },
  {
    code: "BCSICT501",
    name: "Cloud Computing",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To introduce cloud computing evolution, service models, virtualization foundations, storage-as-a-service, and major cloud vendor architectures."
      ],
      outcomes: [
        "Explain NIST cloud reference architecture, IaaS, PaaS, SaaS, and public/private/hybrid deployments.",
        "Evaluate hypervisors, CPU/memory/storage virtualization mechanisms, and disaster recovery.",
        "Analyze security standards (OCC, DMTF) and major cloud service providers (AWS, Azure, GCP)."
      ],
      modules: [
        {
          title: "MODULE-I: Cloud Fundamentals & Virtualization Basics",
          topics: "Definition of Cloud, Evolution of Cloud computing; Underlying Principles of Parallel and Distributed Computing; Cloud Characteristics, Elasticity in Cloud, On-demand Provisioning; Service Oriented Architecture (SOA), REST and Systems of Systems; Web Services, Publish-Subscribe Model; Basics of Virtualization, Types of Virtualization, Implementation Levels of Virtualization, Virtualization Structures, Tools and Mechanisms; Virtualization of CPU, Memory, I/O Devices; Virtualization Support and Disaster Recovery."
        },
        {
          title: "MODULE-II: Layered Architecture & Cloud Storage",
          topics: "Layered Cloud Architecture Design; NIST Cloud Computing Reference Architecture; Public, Private and Hybrid Clouds; IaaS, PaaS, SaaS; Architectural Design Challenges; Cloud Storage: Storage-as-a-Service, Advantages of Cloud Storage, Cloud Storage Providers (AWS S3); Need for Virtualization: Pros and cons of Virtualization, Types of Virtualization (System VM, Process VM, Virtual Machine monitor, interpretation and binary translation, HLL VM); Hypervisors: Xen, KVM, VMware, VirtualBox, Hyper-V; Major Players in Cloud Computing; Cloud Management Platforms: Eucalyptus, Nimbus, OpenNebula, CloudSim."
        },
        {
          title: "MODULE-III: Security Standards & Service Providers",
          topics: "Security, Standards and Applications: Security in Clouds, Cloud security challenges, Software as a Service Security; Common Standards: The Open Cloud Consortium (OCC), The Distributed Management Task Force (DMTF), Standards for application Developers, Standards for Messaging, Standards for Security; End-user access to cloud computing, Mobile Internet devices and the cloud; Service providers: Google Cloud, Amazon Web Services (AWS), Microsoft Azure, IBM Cloud, Salesforce."
        }
      ],
      textBooks: [
        "Kai Hwang, Geoffrey C. Fox & Jack G. Dongarra, 'Distributed and Cloud Computing: From Parallel Processing to the Internet of Things', Morgan Kaufmann / Elsevier.",
        "Rajkumar Buyya, Christian Vecchiola & S. Thamarai Selvi, 'Mastering Cloud Computing', McGraw Hill."
      ],
      referenceBooks: [
        "Barrie Sosinsky, 'Cloud Computing Bible', Wiley.",
        "Anthony T. Velte, Toby J. Velte & Robert Elsenpeter, 'Cloud Computing: A Practical Approach', McGraw Hill."
      ]
    }
  },
  {
    code: "BCSICT502",
    name: "Network Security",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To introduce computer network security policies, mutual authentication protocols, IPsec, SSL/TLS, web application threats, and intrusion detection systems."
      ],
      outcomes: [
        "Identify security handshake pitfalls, reflection attacks, and authentication mechanisms.",
        "Configure IPsec, SSL/TLS, SSH, and defense mechanisms against web exploits (XSS, CSRF).",
        "Explain public-key distribution, packet filtering firewalls, and DNS/routing vulnerabilities."
      ],
      modules: [
        {
          title: "MODULE-I: Network Security Foundations & Authentication",
          topics: "Introduction to Computer Network Security; Sample Attacks on Computer Networks; The marketplace for vulnerabilities; Security Policies and Security Handshake Pitfalls; High and low level security policy, Protocol problems, Shared secret protocols, Public key protocols, Mutual authentication, Reflection attacks, Timestamps, Nonce and sequence numbers, Session Keys; One-and two-way public key based authentication; Authentication of People: Verification techniques, Passwords, Smart cards, Biometrics."
        },
        {
          title: "MODULE-II: IP Security, Transport-Level Security & Malware",
          topics: "IP Security: IPsec Overview, IPsec Policy, Encapsulating Security Payload (ESP), Combining Security Associations (SA), Internet Key Exchange (IKE); Transport-Level Security: Web Security Considerations, Secure Sockets Layer (SSL), Transport Layer Security (TLS), HTTPS standard, Secure Shell (SSH) application; Malicious Software: Viruses, Worms, System Corruption, Attack Agents, Keyloggers, Phishing, Spyware, Backdoors, Rootkits, Distributed Denial of Service (DDoS) Attacks; Major web server threats: Cross-Site Request Forgery (CSRF), Cross-Site Scripting (XSS), Defenses and protections, Secure development."
        },
        {
          title: "MODULE-III: Applied Cryptography, Protocols & Firewalls",
          topics: "Basic cryptography: Public key cryptography, RSA crypto, Digital signatures, Hash functions, Public key distribution; Real-world protocols, Email security certificates (S/MIME, PGP); Transport Layer Security (TLS); DNS security; Basic security problems: Routing security, Weaknesses of Internet security; Link layer and TCP/IP connectivity vulnerabilities; Packet filtering firewalls; Intrusion Detection Systems (IDS)."
        }
      ],
      textBooks: [
        "William Stallings, 'Network Security Essentials: Applications and Standards', 4th Edition, Prentice Hall.",
        "Michael T. Goodrich & Roberto Tamassia, 'Introduction to Computer Security', Addison Wesley."
      ],
      referenceBooks: [
        "Alfred J. Menezes, Paul C. van Oorschot & Scott A. Vanstone, 'Handbook of Applied Cryptography', CRC Press."
      ]
    }
  },
  {
    code: "BCSICT503",
    name: "Principles of Virtualization",
    subjectType: "THEORY",
    credits: 1.0,
    lectureHours: 1,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 10, EE: 15, Total: 25",
    syllabusDetails: {
      objectives: [
        "To provide insights into cloud virtualization architectures, hypervisors, enterprise data center optimization, and cloud migration frameworks."
      ],
      outcomes: [
        "Differentiate full virtualization, para-virtualization, and desktop/storage/network virtualization.",
        "Understand hypervisor technologies and Microsoft/VMware enterprise virtualization solutions.",
        "Apply the 7-step model of migration to transition enterprise workloads into cloud platforms."
      ],
      modules: [
        {
          title: "MODULE-I: Introduction to Virtualization",
          topics: "Virtualization and cloud computing; Need for virtualization: Cost, administration, rapid deployment, reduced infrastructure overhead, limitations; Types of hardware virtualization: Full virtualization, Partial virtualization, Para-virtualization; Desktop virtualization, Software virtualization, Memory virtualization, Storage virtualization, Data virtualization, Network virtualization."
        },
        {
          title: "MODULE-II: Hypervisors & Virtualization Solutions",
          topics: "Server Virtualization: Types of server virtualization, Virtual machine basics, Types of virtual machines, Hypervisor concepts (Type-1 bare-metal, Type-2 hosted); Virtualization Solutions: Microsoft Virtualization solutions, Microsoft Infrastructure Optimization Model, Datacenter virtualization benefits, Client virtualization, Cloud virtualization integration."
        },
        {
          title: "MODULE-III: Migrating into the Cloud",
          topics: "Challenges while migrating to Cloud; Broad approaches to cloud migration; Deciding on cloud migration; The Seven-Step Model of Migration into a Cloud; Migration risks and mitigation strategies; Enterprise cloud computing paradigm; Deployment models for enterprise cloud computing; Adoption and consumption strategies."
        }
      ],
      textBooks: [
        "David Marshall & Wade A. Reynolds, 'Advanced Server Virtualization: VMware and Microsoft Platform in the Virtual Data Center', Auerbach Publications.",
        "Rajkumar Buyya, James Broberg & Andrzej Goscinski, 'Cloud Computing: Principles and Paradigms', John Wiley & Sons."
      ],
      referenceBooks: [
        "Anthony T. Velte, Toby J. Velte & Robert Elsenpeter, 'Cloud Computing: A Practical Approach', Tata McGraw Hill."
      ]
    }
  },
  {
    code: "BCSICT504",
    name: "Humanities II / Managerial Economics",
    subjectType: "THEORY",
    credits: 4.0,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 0,
    evaluationMarks: "CA: 30, EE: 70, Total: 100",
    syllabusDetails: {
      objectives: [
        "To impart economic decision-making principles, demand forecasting, production theory, cost analysis, and macroeconomic market dynamics."
      ],
      outcomes: [
        "Apply price, income, and cross elasticity of demand in managerial decision making.",
        "Analyze production functions, short-run and long-run cost curves, and returns to scale.",
        "Differentiate market structures and assess national income, inflation, and business cycles."
      ],
      modules: [
        {
          title: "MODULE-I: Introduction to Managerial Economics",
          topics: "Meaning, Nature and Scope of Economics; Meaning of Science, Engineering and Technology; Managerial Economics and its scope in engineering perspective; Role of managerial economist in industrial organizations."
        },
        {
          title: "MODULE-II: Demand Analysis & Elasticity",
          topics: "Demand Analysis: Law of Demand, Determinants of Demand; Elasticity of Demand: Price elasticity, Income elasticity, Cross elasticity; Measurement of elasticity; Uses of elasticity concepts in managerial pricing decisions."
        },
        {
          title: "MODULE-III: Demand Forecasting, Production & Cost Analysis",
          topics: "Demand Forecasting: Meaning, significance, qualitative and quantitative methods; Production function: Law of Diminishing Returns, Laws of Returns to Scale; Overview of Short-run and Long-run cost curves: Fixed cost, variable cost, average cost, marginal cost, opportunity cost; Break-Even Analysis."
        },
        {
          title: "MODULE-IV: Market Structures",
          topics: "Perfect Competition: Features, price and output determination; Imperfect Competition: Monopolistic competition, Oligopoly (kinked demand curve), Duopoly, Monopoly; Pricing strategies under varied market conditions."
        },
        {
          title: "MODULE-V: Macroeconomics & Business Cycles",
          topics: "National Income: Concepts (GDP, GNP, NNP, Per Capita Income) and measurement methods; Inflation: Meaning, types (demand-pull, cost-push), causes, effects, and anti-inflationary measures; Phases of business cycle (Prosperity, Recession, Depression, Recovery)."
        }
      ],
      textBooks: [
        "D.N. Dwivedi, 'Managerial Economics', 8th Edition, Vikas Publishing House.",
        "Prof. D.N. Kakkar, 'Managerial Economics for Engineering'."
      ],
      referenceBooks: [
        "A. Koutsoyiannis, 'Modern Microeconomics', Macmillan / ELBS.",
        "Maheshwari, 'Managerial Economics', Sultan Chand & Sons."
      ]
    }
  },
  {
    code: "BCSICT505",
    name: "Security Architecture",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To teach cloud security architectures, risk governance, cloud data protection, private cloud criteria, and operational defense-in-depth."
      ],
      outcomes: [
        "Design cloud reference architectures incorporating defense-in-depth security controls.",
        "Formulate encryption and data classification strategies for multitenant cloud environments.",
        "Evaluate CSP compliance, security audit checklists, and incident response operations."
      ],
      modules: [
        {
          title: "MODULE-I: Cloud Security Foundations & Architecture",
          topics: "Understanding Cloud Computing: The IT Foundation for Cloud, Overview of Security Architecture; Cloud Reference Architecture: Control over Security in Cloud Models (IaaS, PaaS, SaaS); Cloud Deployment Models; Key real-world enterprise examples."
        },
        {
          title: "MODULE-II: Risk Concerns & Architectural Elements",
          topics: "Cloud Computing Security Concerns: Risk tolerance, Legal and regulatory issues; Security Requirements for Cloud Architecture: Security patterns, Architectural building blocks, Cloud security architecture design, Key strategies for secure operation."
        },
        {
          title: "MODULE-III: Data Security in Cloud Computing",
          topics: "Common risks with cloud data security; Data Encryption: Applications, limitations, and key management; Sensitive data categorization; Cloud Data Storage: The 'Roach Motel' syndrome; Effectively managing cloud risk; Overview of security controls and their operational boundaries; Security monitoring best practices."
        },
        {
          title: "MODULE-IV: Private Clouds & Cloud Service Provider Selection",
          topics: "Private Clouds: Motivation and overview, Security implications of shared vs. dedicated resources; Security criteria for private clouds: Network considerations, Data center considerations, Operational security, Regulatory compliance; Selecting a Cloud Service Provider (CSP): Assurance, risk evaluation, defense-in-depth criteria."
        },
        {
          title: "MODULE-V: Cloud Security Evaluation & Operations",
          topics: "Checklists for Evaluating Cloud Security: Foundational security, Business considerations, Operational defense; Bootstrapping secure operations: Business continuity, backup and recovery, Change management in operational environments, Vulnerability and penetration testing, Real-time security response."
        }
      ],
      textBooks: [
        "Vic (J.R.) Winkler, 'Securing the Cloud: Cloud Computer Security Techniques and Tactics', Syngress / Elsevier (2011)."
      ],
      referenceBooks: [
        "Sushil Jajodia & Krishna Kant, 'Secure Cloud Computing', Springer / Elsevier (2014).",
        "Curtis Franklin Jr. & Brian J.S. Chee, 'Securing the Cloud: Security Strategies for the Ubiquitous Data Center', CRC Press (2019)."
      ]
    }
  },
  {
    code: "BCSICT506",
    name: "Database Security",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To introduce database access control models, statistical database inference, secure DBMS design, and multi-level secure database systems."
      ],
      outcomes: [
        "Evaluate Access Matrix, Bell-LaPadula, Biba, and Sea View database security models.",
        "Implement user authentication, inference controls, and database intrusion detection systems.",
        "Design multi-level security policies for object-oriented and frame-based database architectures."
      ],
      modules: [
        {
          title: "MODULE-I: Database Security Problems & Models",
          topics: "Security problems in databases; Security controls overview; Access Matrix Model, Take-Grant Model, Acten Model, PN Model; Hartson and Hsiao's Model; Fernandez's Model; Bussolati and Martella's Model for distributed databases."
        },
        {
          title: "MODULE-II: Mandatory Access Control Models & Security Mechanisms",
          topics: "Security Models: Bell and LaPadula's Model, Biba's Integrity Model, Dion's Model, Sea View Model, Jajodia and Sandhu's Model, Lattice Model for flow control; Security Mechanisms: User identification/authentication, Memory protection, Resource protection, Control flow mechanisms, Operating system isolation, TCSEC evaluation."
        },
        {
          title: "MODULE-III: Secure Database Design & Intrusion Detection",
          topics: "Methodological approach to security software design; Secure OS and Secure DBMS design; Statistical Database Protection: Statistical attacks, Inference controls, Comparison criteria; Database Intrusion Detection Systems: IDES system, RETISS system, ASES system, Discovery."
        },
        {
          title: "MODULE-IV: Private Cloud Database Considerations",
          topics: "Security implications of shared vs. dedicated database servers in private clouds; Network and storage segregation for private cloud databases; Regulatory compliance (HIPAA, PCI-DSS) in cloud database storage; Risk assurance."
        },
        {
          title: "MODULE-V: Protection of Advanced Database Systems",
          topics: "Models for the protection of next-generation database systems: Protection of Frame-Based Systems; Protection of Object-Oriented Database Systems; SORION model for Object-Oriented databases."
        }
      ],
      textBooks: [
        "Hassan A. Afyouni, 'Database Security and Auditing', Cengage Learning (2009).",
        "Silvana Castano et al., 'Database Security', Pearson Education."
      ],
      referenceBooks: [
        "Alfred Basta & Melissa Zgola, 'Database Security', Cengage Learning."
      ]
    }
  },
  {
    code: "IIOT5",
    name: "Deep Learning",
    subjectType: "THEORY",
    credits: 4.0,
    lectureHours: 4,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 30, EE: 70, Total: 100",
    syllabusDetails: {
      objectives: [
        "To teach neural network foundations, backpropagation, deep learning architectures (CNN, RNN, LSTM), and deployment with TensorFlow/PyTorch."
      ],
      outcomes: [
        "Design and train Multilayer Perceptrons (MLP) with activation functions and optimizers.",
        "Build Convolutional Neural Networks (CNN) for computer vision tasks.",
        "Implement Recurrent Neural Networks (RNN) and LSTMs for sequential data and natural language."
      ],
      modules: [
        {
          title: "Unit 1: Neural Networks Foundations",
          topics: "Biological neuron vs. Artificial neuron (Perceptron); Activation functions: Sigmoid, Tanh, ReLU, Leaky ReLU, Softmax; Feedforward neural networks; Loss functions: MSE, Binary Cross-Entropy, Categorical Cross-Entropy; Backpropagation algorithm and gradient computation; Optimization algorithms: SGD, Momentum, RMSprop, Adam."
        },
        {
          title: "Unit 2: Training Deep Networks & Regularization",
          topics: "Vanishing and exploding gradient problems; Weight initialization (Xavier, He initialization); Regularization techniques: L1/L2 regularization, Dropout, Batch Normalization, Early Stopping; Hyperparameter tuning (learning rate scheduling, batch size)."
        },
        {
          title: "Unit 3: Convolutional Neural Networks (CNN)",
          topics: "Convolution operation, filters/kernels, stride, padding (valid, same); Pooling layers: Max pooling, Average pooling; CNN architectures: LeNet-5, AlexNet, VGGNet, ResNet (residual connections); Transfer learning and fine-tuning pre-trained models for image classification."
        },
        {
          title: "Unit 4: Recurrent Neural Networks (RNN) & Sequence Models",
          topics: "Sequential data modeling; Vanilla RNN and unrolling through time; Backpropagation Through Time (BPTT); Exploding/vanishing gradients in RNN; Long Short-Term Memory (LSTM) networks: Forget, Input, Output gates; Gated Recurrent Units (GRU); Bidirectional RNNs."
        },
        {
          title: "Unit 5: Modern Deep Architectures & Generative Models",
          topics: "Introduction to Attention Mechanism and Transformer concept; Autoencoders: Architecture, latent representations, denoising autoencoders; Generative Adversarial Networks (GANs): Generator and Discriminator game; Practical deployment using PyTorch and TensorFlow."
        }
      ],
      textBooks: [
        "Ian Goodfellow, Yoshua Bengio & Aaron Courville, 'Deep Learning', MIT Press.",
        "François Chollet, 'Deep Learning with Python', 2nd Edition, Manning Publications."
      ],
      referenceBooks: [
        "Aurélien Géron, 'Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow', O'Reilly."
      ]
    }
  },
  {
    code: "BCSICT508",
    name: "Network Security Lab",
    subjectType: "PRACTICAL",
    credits: 1.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    evaluationMarks: "CA: 10, EE: 15, Total: 25",
    syllabusDetails: {
      objectives: [
        "To practice practical network security defenses, VPNs, VLAN isolation, firewall rules, and virtualization sandboxing."
      ],
      outcomes: [
        "Configure Type-2 virtualization, ESXi bare-metal hypervisors, VLANs, and encrypted VPN tunnels.",
        "Implement secure file sharing and remote desktop virtualization protocols."
      ],
      labExperiments: [
        "Create Type-2 virtualization in VMware / VirtualBox: Allocate CPU, memory, and storage, and install Guest OS.",
        "Adding and configuring dynamic virtual disks, managing virtual disk expansion and shrinkage.",
        "Creating, managing, configuring, and scheduling VM snapshots.",
        "Creating Spanned, Mirrored, and Striped volumes across virtual disks.",
        "Configuring secure data transfer and folder sharing between isolated virtual machines.",
        "Desktop Virtualization using VNC and Chrome Remote Desktop.",
        "Configuring VMware ESXi 6.5 server on bare metal / hypervisor.",
        "Accessing ESXi server from remote vSphere client and provisioning virtual machines.",
        "Configuring VLANs in Cisco Packet Tracer to enforce network segmentation.",
        "Installing and configuring KVM (Kernel-based Virtual Machine) in Linux.",
        "Setting up an encrypted VPN tunnel between two virtual machines for secure transmission.",
        "Creating Nested Virtual Machines (VM running inside another VM)."
      ]
    }
  },
  {
    code: "BCSICT509",
    name: "Principle of Virtualization Lab",
    subjectType: "PRACTICAL",
    credits: 2.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    evaluationMarks: "CA: 20, EE: 30, Total: 50",
    syllabusDetails: {
      objectives: [
        "To master hypervisor installation, virtual network configuration, live VM migration, and resource optimization."
      ],
      outcomes: [
        "Deploy bare-metal hypervisors, configure vSwitches, and execute live virtual machine migration."
      ],
      labExperiments: [
        "Installation and configuration of Type-1 Hypervisor (VMware ESXi / Proxmox VE).",
        "Configuring virtual switches (vSwitch), port groups, and VLAN tagging in hypervisor environment.",
        "Configuring shared storage (NFS / iSCSI) for virtualization cluster.",
        "Performing Live Migration (vMotion) of virtual machines with zero downtime.",
        "Configuring High Availability (HA) and Distributed Resource Scheduler (DRS) on hypervisor cluster.",
        "Automating VM provisioning using command-line tools (virsh, Vagrant).",
        "Benchmarking virtualized CPU, memory, and I/O performance against physical host."
      ]
    }
  },
  {
    code: "BCSI502",
    name: "Summer Project Seminar-II",
    subjectType: "SEMINAR",
    credits: 2.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    evaluationMarks: "CA: 20, EE: 30, Total: 50",
    syllabusDetails: {
      objectives: ["To evaluate intermediate industrial training / summer project internship undertaken at the end of Year II."],
      outcomes: ["Defend technical architecture, project implementation, and software engineering deliverables before faculty committee."],
      labExperiments: [
        "Submission of comprehensive industrial internship project report and completion certificate.",
        "Oral presentation of system architecture, technology stack, and implementation methodology.",
        "Live software demonstration of modules and test cases developed during industrial training.",
        "Comprehensive viva-voce examination assessing industry engineering competence."
      ]
    }
  }
];

module.exports = { SEMESTER_5_SUBJECTS };

