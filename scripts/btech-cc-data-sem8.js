// Semester 8 subjects for B.Tech CSE (Cloud Computing)

const SEMESTER_8_SUBJECTS = [
  {
    code: "BCSAI801",
    name: "Industrial Training / Internship",
    subjectType: "PRACTICAL",
    credits: 6.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 12,
    evaluationMarks: "CA: 50, EE: 100, Total: 150",
    syllabusDetails: {
      objectives: [
        "To provide students with intensive full-semester industrial immersion, live industry project exposure, and corporate software engineering practices."
      ],
      outcomes: [
        "Work effectively within multidisciplinary professional engineering teams in industry.",
        "Apply cloud engineering, software development, and quality assurance principles to production systems.",
        "Author comprehensive industrial internship project reports and defend professional achievements."
      ],
      labExperiments: [
        "Full-semester corporate onboarding and assignment to live engineering development team.",
        "Participation in daily Agile stand-ups, sprint planning, and code review processes.",
        "Contributing to production codebase: feature development, bug fixes, automated testing, and CI/CD deployment.",
        "Bi-weekly progress monitoring and submission of mentor evaluation reports.",
        "Authoring formal Industrial Training Dissertation detailing technical contributions.",
        "Final industrial project defense and viva-voce before university evaluation committee."
      ]
    }
  },
  {
    code: "BCSAI802",
    name: "Project",
    subjectType: "PROJECT",
    credits: 6.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 12,
    evaluationMarks: "CA: 50, EE: 100, Total: 150",
    syllabusDetails: {
      objectives: [
        "To design and deliver a comprehensive final-year capstone project or advanced research contribution in Cloud Computing / Intelligent Systems."
      ],
      outcomes: [
        "Synthesize four years of computer science and cloud computing knowledge into an impactful software or research system.",
        "Conduct thorough benchmarking, security validation, and deployment on production cloud infrastructure.",
        "Defend final thesis and publish research outcomes or open-source software artifacts."
      ],
      labExperiments: [
        "Advanced architecture realization and full-stack cloud implementation.",
        "Automated deployment using Kubernetes or cloud serverless container architectures.",
        "Comprehensive performance stress testing, security auditing, and penetration validation.",
        "Preparation of final university thesis document compliant with academic publication standards.",
        "Demonstration of working production solution, oral defense, and comprehensive viva-voce."
      ]
    }
  },
  {
    code: "BCSAI803",
    name: "Agile Technology",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To introduce Agile software development philosophies, Scrum framework, Extreme Programming (XP), Kanban, and DevOps continuous delivery."
      ],
      outcomes: [
        "Contrast traditional Waterfall with Agile methodologies and apply Agile Manifesto principles.",
        "Facilitate Scrum ceremonies: Sprint Planning, Daily Scrum, Sprint Review, and Retrospective.",
        "Utilize user stories, story pointing, velocity metrics, and burndown charts in Jira."
      ],
      modules: [
        {
          title: "Unit 1: Fundamentals of Agile Methodology",
          topics: "Shortcomings of traditional Waterfall models; Agile Manifesto: 4 core values and 12 principles; Agile vs. Traditional; Iterative and incremental development; Agile project management lifecycle; Overview of Agile frameworks (Scrum, Kanban, XP, Lean)."
        },
        {
          title: "Unit 2: Scrum Framework",
          topics: "Scrum roles: Product Owner, Scrum Master, Development Team; Scrum artifacts: Product Backlog, Sprint Backlog, Increment; Scrum ceremonies: Sprint Planning, Daily Standup, Sprint Review, Sprint Retrospective; Definition of Ready (DoR) and Definition of Done (DoD)."
        },
        {
          title: "Unit 3: Agile Requirements & Estimation",
          topics: "Writing effective User Stories; INVEST criteria for user stories; Epics, Features, and Themes; Acceptance criteria; Agile estimation techniques: Planning Poker, T-shirt sizing, Bucket system; Story points vs. hours; Velocity and Burn-down / Burn-up charts."
        },
        {
          title: "Unit 4: Extreme Programming & Engineering Practices",
          topics: "Core values of XP; Test-Driven Development (TDD): Red-Green-Refactor cycle; Pair Programming; Continuous Integration (CI); Refactoring techniques and code smells; Collective code ownership; Simple design."
        },
        {
          title: "Unit 5: Kanban & Scaling Agile",
          topics: "Kanban principles: Visualizing workflow, Limiting Work in Progress (WIP), Managing flow, Making policies explicit; Cumulative Flow Diagrams (CFD); Scaling Agile for enterprises: Introduction to SAFe (Scaled Agile Framework) and Spotify engineering culture model."
        }
      ],
      textBooks: [
        "Ken Schawber & Mike Beedle, 'Agile Software Development with Scrum', Pearson.",
        "Mike Cohn, 'User Stories Applied: For Agile Software Development', Addison-Wesley."
      ],
      referenceBooks: [
        "Kent Beck, 'Extreme Programming Explained: Embrace Change', Addison-Wesley."
      ]
    }
  },
  {
    code: "BCSAI804",
    name: "Metaverse",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To explore virtual worlds, spatial computing, augmented reality (AR), virtual reality (VR), digital avatars, and blockchain economies in the Metaverse."
      ],
      outcomes: [
        "Understand the technological building blocks and 7 layers of the Metaverse value chain.",
        "Analyze spatial audio, 3D graphics rendering engines (Unity/Unreal), and HMD hardware.",
        "Assess decentralized identity, digital asset ownership, and spatial computing ethics."
      ],
      modules: [
        {
          title: "Unit 1: Introduction to Metaverse & Spatial Computing",
          topics: "Evolution of cyberspace; Defining Metaverse: Characteristics, interoperability, persistence, and synchronicity; Jon Radoff's 7 Layers of Metaverse; Extended Reality (XR) continuum: Augmented Reality (AR), Virtual Reality (VR), Mixed Reality (MR)."
        },
        {
          title: "Unit 2: XR Hardware & 3D Interactive Engines",
          topics: "Head-Mounted Displays (HMD): Optics, refresh rate, field of view (FOV), tracking (3 DoF vs. 6 DoF, inside-out tracking); Spatial audio and haptics; 3D Game Engines: Overview of Unity 3D and Unreal Engine 5; Scene graphs, lighting, shaders, and physics simulation."
        },
        {
          title: "Unit 3: Digital Avatars & Virtual Presence",
          topics: "Avatar creation and customization; Rigging and motion capture; Facial tracking and eye tracking; Social VR platforms (VRChat, Horizon Worlds, Decentraland); Telepresence and collaborative virtual workspaces."
        },
        {
          title: "Unit 4: Metaverse Economy & Decentralized Technologies",
          topics: "Virtual goods economy; Role of Blockchain in Metaverse; Non-Fungible Tokens (NFTs) for digital asset ownership and land parcels; Smart contracts for virtual commerce; Decentralized Autonomous Organizations (DAOs) in virtual governance."
        },
        {
          title: "Unit 5: Challenges & Future of Metaverse",
          topics: "Technical challenges: Network bandwidth, 5G/6G, low latency edge rendering; Interoperability standards (OpenXR, glTF, USD); Privacy, cybersecurity, and identity theft in virtual spaces; Ethics, digital addiction, and regulatory considerations."
        }
      ],
      textBooks: [
        "Matthew Ball, 'The Metaverse: And How It Will Revolutionize Everything', Liveright Publishing.",
        "Tony Parisi, 'Learning Virtual Reality', O'Reilly Media."
      ],
      referenceBooks: [
        "Paul Mealy, 'Virtual & Augmented Reality For Dummies', John Wiley & Sons."
      ]
    }
  },
  {
    code: "BCSAI805",
    name: "Blockchain Technology",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To teach cryptographic foundations, distributed ledgers, consensus algorithms (PoW, PoS), Ethereum smart contracts, and decentralized applications (DApps)."
      ],
      outcomes: [
        "Explain hashing, digital signatures, and Merkle tree structures in blockchain ledgers.",
        "Contrast consensus mechanisms: Proof of Work (PoW), Proof of Stake (PoS), and PBFT.",
        "Author and deploy Solidity smart contracts on Ethereum test networks."
      ],
      modules: [
        {
          title: "Unit 1: Cryptographic Foundations & Distributed Systems",
          topics: "Evolution of centralized vs. decentralized systems; Distributed Ledger Technology (DLT); Cryptographic primitives: Hash functions (SHA-256), cryptographic properties; Digital Signatures (ECDSA); Public/Private key pairs; Merkle Trees and Merkle Roots."
        },
        {
          title: "Unit 2: Blockchain Architecture & Bitcoin",
          topics: "Block anatomy: Block header, previous hash, timestamp, nonce, difficulty target, transaction list; Blockchain lifecycle; Peer-to-peer network topology; Bitcoin: UTXO model, script language, transaction validation, mining process, difficulty retargeting, 51% attacks, hard and soft forks."
        },
        {
          title: "Unit 3: Consensus Mechanisms",
          topics: "Byzantine Generals Problem; Crash fault tolerance vs. Byzantine fault tolerance; Proof of Work (PoW); Proof of Stake (PoS); Delegated Proof of Stake (DPoS); Proof of Authority (PoA); Practical Byzantine Fault Tolerance (PBFT); Environmental and energy considerations."
        },
        {
          title: "Unit 4: Ethereum & Smart Contracts",
          topics: "Ethereum Virtual Machine (EVM); Gas mechanism, gas price, gas limit; Accounts: Externally Owned Accounts (EOA) vs. Contract Accounts; Solidity programming language: Data types, variables, functions, modifiers, events, inheritance; Writing and compiling smart contracts with Remix IDE."
        },
        {
          title: "Unit 5: DApps & Enterprise Blockchains",
          topics: "Decentralized Applications (DApps) architecture: Web3.js, Ethers.js, MetaMask; ERC standards: ERC-20 (fungible tokens), ERC-721 (NFTs); Enterprise blockchains: Hyperledger Fabric architecture, channels, chaincode, membership services; Real-world blockchain applications in supply chain, finance, and healthcare."
        }
      ],
      textBooks: [
        "Arvind Narayanan et al., 'Bitcoin and Cryptocurrency Technologies: A Comprehensive Introduction', Princeton University Press.",
        "Andreas M. Antonopoulos & Gavin Wood, 'Mastering Ethereum: Building Smart Contracts and DApps', O'Reilly Media."
      ],
      referenceBooks: [
        "Imran Bashir, 'Mastering Blockchain', 3rd Edition, Packt Publishing."
      ]
    }
  }
];

module.exports = { SEMESTER_8_SUBJECTS };

