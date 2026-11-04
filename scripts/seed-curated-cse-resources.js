const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const curatedResourcesData = [
  // -------------------------------------------------------------------------
  // BCS201: Programming in C (Programming for Problem Solving)
  // -------------------------------------------------------------------------
  {
    targetCodes: ['BCS201', 'BCSAI 103'],
    resources: [
      {
        title: "Problem Solving through Programming in C (NPTEL)",
        platform: "NPTEL / IIT Kharagpur",
        url: "https://nptel.ac.in/courses/106105171",
        description: "Official 12-week national course by Prof. Anupam Basu covering algorithmic thinking, C syntax, pointers, recursion, and file handling.",
        category: "Free Online Courses",
        unitNumber: 1,
        topic: "Algorithms & C Fundamentals",
        pricingType: "FREE",
        resourceType: "COURSE"
      },
      {
        title: "C Programming Language Complete Guide (GeeksforGeeks)",
        platform: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/c-programming-language/",
        description: "Structured chapter-wise tutorials, interactive code execution, syntax diagrams, and practice problems covering all syllabus units.",
        category: "Online Tutorials",
        unitNumber: 1,
        topic: "C Syntax, Data Types & Control Statements",
        pricingType: "FREE",
        resourceType: "TUTORIAL"
      },
      {
        title: "GNU C Reference Manual & ISO C Standard",
        platform: "GNU / Free Software Foundation",
        url: "https://www.gnu.org/software/gnu-c-manual/gnu-c-manual.html",
        description: "Authoritative reference manual for lexical elements, expressions, pointers, storage classes, and standard library headers.",
        category: "Official Documentation",
        unitNumber: 2,
        topic: "Storage Classes & Preprocessor",
        pricingType: "FREE",
        resourceType: "DOCUMENTATION"
      },
      {
        title: "Harvard CS50: Introduction to Computer Science & C",
        platform: "Harvard University / edX",
        url: "https://cs50.harvard.edu/x/",
        description: "Foundational computer science curriculum by Prof. David J. Malan emphasizing algorithmic problem solving, memory management, and pointers.",
        category: "Free Online Courses",
        unitNumber: 2,
        topic: "Pointers & Dynamic Memory Allocation",
        pricingType: "FREE",
        resourceType: "COURSE"
      },
      {
        title: "Compiler Explorer (Godbolt) for C",
        platform: "Compiler Explorer",
        url: "https://godbolt.org/",
        description: "Interactive browser tool to inspect C compiler outputs, assembly generation, and optimize loop instructions.",
        category: "Useful Tools and Simulators",
        unitNumber: 3,
        topic: "Compilation & Machine Architecture",
        pricingType: "FREE",
        resourceType: "SIMULATOR"
      },
      {
        title: "HackerRank C Language Preparation Track",
        platform: "HackerRank",
        url: "https://www.hackerrank.com/domains/c",
        description: "Hands-on coding challenges ranging from conditional branching to multidimensional arrays and pointer arithmetic.",
        category: "Programming Practice",
        unitNumber: 3,
        topic: "Arrays, Strings & Pointers Practice",
        pricingType: "FREE",
        resourceType: "PRACTICE"
      }
    ],
    videos: [
      {
        title: "NPTEL: Problem Solving through Programming in C",
        youtubeUrl: "https://www.youtube.com/playlist?list=PLJ5C_6qdAvBFzL9su5J-FX8x80BMhkPy1",
        youtubeId: "PLJ5C_6qdAvBFzL9su5J-FX8x80BMhkPy1",
        videoType: "PLAYLIST",
        channelName: "NPTEL-NOC IITM",
        unitNumber: 1,
        topic: "Complete Syllabus Course Series",
        description: "Official lecture series from IIT Kharagpur covering algorithmic problem solving, procedural abstractions, arrays, and pointer manipulation.",
        pricingType: "FREE"
      },
      {
        title: "C Programming Tutorial for Beginners - Full Course",
        youtubeUrl: "https://www.youtube.com/watch?v=KJgsSFOSQv0",
        youtubeId: "KJgsSFOSQv0",
        videoType: "INDIVIDUAL_VIDEO",
        channelName: "freeCodeCamp.org",
        unitNumber: 2,
        topic: "Core Programming & Pointers",
        description: "Comprehensive 4-hour walkthrough on core syntax, variables, memory addresses, pointers, and file manipulation.",
        pricingType: "FREE"
      },
      {
        title: "CS50 2023 - Lecture 1 - C",
        youtubeUrl: "https://www.youtube.com/watch?v=4XpnKVfyG_U",
        youtubeId: "4XpnKVfyG_U",
        videoType: "INDIVIDUAL_VIDEO",
        channelName: "CS50",
        unitNumber: 1,
        topic: "Introduction to C Syntax & Conditionals",
        description: "Harvard University's flagship lecture introducing syntax, compilation, variables, conditions, and debugging techniques.",
        pricingType: "FREE"
      }
    ]
  },

  // -------------------------------------------------------------------------
  // BCS-301 / BCSAI 303: Data Structures & Algorithms
  // -------------------------------------------------------------------------
  {
    targetCodes: ['BCS-301', 'BCSAI 303'],
    resources: [
      {
        title: "VisuAlgo: Visualising Data Structures and Algorithms",
        platform: "National University of Singapore",
        url: "https://visualgo.net/en",
        description: "Interactive visual animations of Linked Lists, Binary Search Trees, AVL Trees, Heaps, and Graph Traversals.",
        category: "Useful Tools and Simulators",
        unitNumber: 1,
        topic: "Interactive Visualizations",
        pricingType: "FREE",
        resourceType: "SIMULATOR"
      },
      {
        title: "MIT OpenCourseWare 6.006: Introduction to Algorithms",
        platform: "MIT OpenCourseWare",
        url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/",
        description: "Complete course notes, problem sets, and exams covering asymptotic complexity, hashing, binary search trees, and dynamic programming.",
        category: "Lecture Notes",
        unitNumber: 2,
        topic: "Asymptotic Analysis & Trees",
        pricingType: "FREE",
        resourceType: "NOTES"
      },
      {
        title: "GeeksforGeeks: Data Structures Comprehensive Portal",
        platform: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/data-structures/",
        description: "Unit-aligned articles on Stack ADT, Queue implementations, circular queues, infix to postfix conversions, and balanced BSTs.",
        category: "Online Tutorials",
        unitNumber: 1,
        topic: "Linear and Non-Linear Data Structures",
        pricingType: "FREE",
        resourceType: "TUTORIAL"
      },
      {
        title: "LeetCode: Top Interview Data Structures Track",
        platform: "LeetCode",
        url: "https://leetcode.com/explore/featured/card/the-leetcode-beginners-guide/",
        description: "Curated coding problems with automatic test benchmarks for arrays, linked lists, binary trees, and sorting.",
        category: "Programming Practice",
        unitNumber: 3,
        topic: "Coding Practice & Complexity",
        pricingType: "FREE",
        resourceType: "PRACTICE"
      }
    ],
    videos: [
      {
        title: "Data Structures and Algorithms by Abdul Bari",
        youtubeUrl: "https://www.youtube.com/playlist?list=PLDN4rrl48X7Z7nr_O3Pkyz9tkg0gN1N7E",
        youtubeId: "PLDN4rrl48X7Z7nr_O3Pkyz9tkg0gN1N7E",
        videoType: "PLAYLIST",
        channelName: "Abdul Bari",
        unitNumber: 1,
        topic: "Stacks, Queues, Trees & Graphs",
        description: "Acclaimed lecture playlist breaking down data structures step-by-step with clear whiteboard tracing and complexity analysis.",
        pricingType: "FREE"
      },
      {
        title: "Data Structures Easy to Advanced Course - Full Tutorial",
        youtubeUrl: "https://www.youtube.com/watch?v=RBSGKlAvoiM",
        youtubeId: "RBSGKlAvoiM",
        videoType: "INDIVIDUAL_VIDEO",
        channelName: "freeCodeCamp.org",
        unitNumber: 2,
        topic: "Full Data Structures Overview",
        description: "8-hour comprehensive curriculum on dynamic arrays, linked lists, priority queues, and union-find algorithms.",
        pricingType: "FREE"
      }
    ]
  },

  // -------------------------------------------------------------------------
  // BCS-402 / BCSAI 401 / MCS-322: Design and Analysis of Algorithms
  // -------------------------------------------------------------------------
  {
    targetCodes: ['BCS-402', 'BCSAI 401', 'MCS-322'],
    resources: [
      {
        title: "Design and Analysis of Algorithms (NPTEL)",
        platform: "NPTEL / IIT Madras",
        url: "https://nptel.ac.in/courses/106106131",
        description: "Official course by Prof. Madhavan Mukund detailing Divide & Conquer, Dynamic Programming, Greedy choice, and NP-completeness.",
        category: "Free Online Courses",
        unitNumber: 1,
        topic: "Algorithm Paradigms & Recurrences",
        pricingType: "FREE",
        resourceType: "COURSE"
      },
      {
        title: "Stanford Online: Algorithms Specialization Notes",
        platform: "Stanford Online",
        url: "https://online.stanford.edu/courses/soe-ycsalgorithms1-algorithms-design-and-analysis-part-1",
        description: "Rigorous algorithmic foundations covering master theorem, quicksort, randomized selection, and minimum spanning trees.",
        category: "Lecture Notes",
        unitNumber: 2,
        topic: "Divide-and-Conquer & Greedy Heuristics",
        pricingType: "FREE",
        resourceType: "NOTES"
      },
      {
        title: "GeeksforGeeks: Algorithms Analysis Portal",
        platform: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/fundamentals-of-algorithms/",
        description: "Comprehensive tutorials and visual examples on dynamic programming, knapsack problems, Floyd-Warshall, and backtracking.",
        category: "Online Tutorials",
        unitNumber: 2,
        topic: "Dynamic Programming & Graph Algorithms",
        pricingType: "FREE",
        resourceType: "TUTORIAL"
      }
    ],
    videos: [
      {
        title: "Algorithms Lecture Series by Abdul Bari",
        youtubeUrl: "https://www.youtube.com/playlist?list=PLDN4rrl48X7Z7nr_O3Pkyz9tkg0gN1N7E",
        youtubeId: "PLDN4rrl48X7Z7nr_O3Pkyz9tkg0gN1N7E",
        videoType: "PLAYLIST",
        channelName: "Abdul Bari",
        unitNumber: 1,
        topic: "Master Method, Greedy, DP & Backtracking",
        description: "Complete visual breakdowns of algorithm design paradigms, recurrence relations, Strassen's algorithm, and Bellman-Ford.",
        pricingType: "FREE"
      },
      {
        title: "MIT 6.006: Introduction to Algorithms (Spring 2020)",
        youtubeUrl: "https://www.youtube.com/watch?v=ZA-tUyM_y7s",
        youtubeId: "ZA-tUyM_y7s",
        videoType: "INDIVIDUAL_VIDEO",
        channelName: "MIT OpenCourseWare",
        unitNumber: 1,
        topic: "Introduction & Peak Finding",
        description: "Lecture 1 of MIT 6.006 covering algorithmic thinking, peak finding, and asymptotic complexity analysis.",
        pricingType: "FREE"
      }
    ]
  },

  // -------------------------------------------------------------------------
  // BCS-403: Operating Systems
  // -------------------------------------------------------------------------
  {
    targetCodes: ['BCS-403', 'BCSAI 204'],
    resources: [
      {
        title: "Operating Systems: Three Easy Pieces (OSTEP)",
        platform: "University of Wisconsin-Madison",
        url: "https://pages.cs.wisc.edu/~remzi/OSTEP/",
        description: "Acclaimed open university textbook by Prof. Remzi Arpaci-Dusseau covering Virtualization, Concurrency, and Persistence.",
        category: "Reference Materials",
        unitNumber: 1,
        topic: "Processes, Memory Virtualization & File Systems",
        pricingType: "FREE",
        resourceType: "NOTES"
      },
      {
        title: "NPTEL: Operating Systems Fundamentals",
        platform: "NPTEL / IIT Kharagpur",
        url: "https://nptel.ac.in/courses/106105214",
        description: "Comprehensive university lectures on process scheduling, semaphores, deadlock avoidance (Banker's algorithm), and page replacement.",
        category: "Free Online Courses",
        unitNumber: 2,
        topic: "Deadlocks & Memory Management",
        pricingType: "FREE",
        resourceType: "COURSE"
      },
      {
        title: "GeeksforGeeks: Operating Systems Tutorial",
        platform: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/operating-systems/",
        description: "Concise unit-wise notes covering CPU scheduling metrics, paging vs segmentation, virtual memory, and disk scheduling algorithms.",
        category: "Online Tutorials",
        unitNumber: 1,
        topic: "System Architecture & Scheduling",
        pricingType: "FREE",
        resourceType: "TUTORIAL"
      }
    ],
    videos: [
      {
        title: "NPTEL: Operating System Lecture Series",
        youtubeUrl: "https://www.youtube.com/playlist?list=PLbRMhDVUMngf4R66sE5aWnN9k0eLgB6L4",
        youtubeId: "PLbRMhDVUMngf4R66sE5aWnN9k0eLgB6L4",
        videoType: "PLAYLIST",
        channelName: "NPTEL-NOC IITM",
        unitNumber: 1,
        topic: "Operating System Architecture & Multithreading",
        description: "Rigorous university curriculum from IIT Kharagpur on process control blocks, synchronization primitives, and virtual memory.",
        pricingType: "FREE"
      }
    ]
  },

  // -------------------------------------------------------------------------
  // BCS-502 / BCSAI 403 / MCS-201: Database Management Systems
  // -------------------------------------------------------------------------
  {
    targetCodes: ['BCS-502', 'BCSAI 403', 'MCS-201'],
    resources: [
      {
        title: "PostgreSQL Official Documentation & SQL Tutorial",
        platform: "PostgreSQL Global Development Group",
        url: "https://www.postgresql.org/docs/current/tutorial.html",
        description: "Official documentation covering relational concepts, schema design, DDL/DML syntax, indexing, and transaction isolation levels.",
        category: "Official Documentation",
        unitNumber: 2,
        topic: "SQL Syntax, Transactions & Indexing",
        pricingType: "FREE",
        resourceType: "DOCUMENTATION"
      },
      {
        title: "W3Schools: Interactive SQL Reference",
        platform: "W3Schools",
        url: "https://www.w3schools.com/sql/",
        description: "Interactive browser editor to practice SELECT queries, JOIN operations, GROUP BY aggregations, and subqueries.",
        category: "Programming Practice",
        unitNumber: 2,
        topic: "Interactive SQL Practice",
        pricingType: "FREE",
        resourceType: "PRACTICE"
      },
      {
        title: "Stanford Online: Databases and Relational Query Languages",
        platform: "Stanford Online",
        url: "https://online.stanford.edu/courses/soe-ydatabases-databases-relational-databases-and-sql",
        description: "Course materials by Prof. Jennifer Widom covering Relational Algebra, Normalization (1NF, 2NF, 3NF, BCNF), and ACID properties.",
        category: "Free Online Courses",
        unitNumber: 1,
        topic: "Relational Algebra & Normalization",
        pricingType: "FREE",
        resourceType: "COURSE"
      }
    ],
    videos: [
      {
        title: "Database Design and Management Course - Full Tutorial",
        youtubeUrl: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
        youtubeId: "HXV3zeQKqGY",
        videoType: "INDIVIDUAL_VIDEO",
        channelName: "freeCodeCamp.org",
        unitNumber: 1,
        topic: "Relational Modeling & Normalization",
        description: "Comprehensive 8-hour guide covering Entity-Relationship diagrams, relational schemas, normal forms, and transaction processing.",
        pricingType: "FREE"
      }
    ]
  },

  // -------------------------------------------------------------------------
  // BCS-304: Python Programming
  // -------------------------------------------------------------------------
  {
    targetCodes: ['BCS-304'],
    resources: [
      {
        title: "Python 3 Official Documentation & Tutorial",
        platform: "Python Software Foundation",
        url: "https://docs.python.org/3/tutorial/",
        description: "Official guide to Python syntax, control structures, data structures (lists, tuples, dicts, sets), modules, and exceptions.",
        category: "Official Documentation",
        unitNumber: 1,
        topic: "Language Syntax & Built-in Types",
        pricingType: "FREE",
        resourceType: "DOCUMENTATION"
      },
      {
        title: "Real Python: Python Basics & Deep Dives",
        platform: "Real Python",
        url: "https://realpython.com/",
        description: "High-quality developer tutorials explaining object-oriented programming, iterators, generators, and file I/O in Python.",
        category: "Online Tutorials",
        unitNumber: 2,
        topic: "OOP, Generators & Modules",
        pricingType: "FREE",
        resourceType: "TUTORIAL"
      }
    ],
    videos: [
      {
        title: "Python for Beginners - Full Course",
        youtubeUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw",
        youtubeId: "rfscVS0vtbw",
        videoType: "INDIVIDUAL_VIDEO",
        channelName: "freeCodeCamp.org",
        unitNumber: 1,
        topic: "Python Fundamentals & OOP",
        description: "Comprehensive beginner to intermediate tutorial covering Python core concepts, data structures, and object orientation.",
        pricingType: "FREE"
      }
    ]
  },

  // -------------------------------------------------------------------------
  // BCSAI 301 / MCS-103: Computer Networks
  // -------------------------------------------------------------------------
  {
    targetCodes: ['BCSAI 301', 'MCS-103'],
    resources: [
      {
        title: "Stanford CS144: Introduction to Computer Networking",
        platform: "Stanford University",
        url: "https://cs144.github.io/",
        description: "Comprehensive university materials covering TCP/IP protocol stack, congestion control, packet switching, and IP routing.",
        category: "Lecture Notes",
        unitNumber: 1,
        topic: "TCP/IP Protocol Architecture",
        pricingType: "FREE",
        resourceType: "NOTES"
      },
      {
        title: "Computer Networks & Internet Protocol (NPTEL)",
        platform: "NPTEL / IIT Kharagpur",
        url: "https://nptel.ac.in/courses/106105081",
        description: "Course by Prof. Soumya Kanti Ghosh on transmission media, data link layer framing, error correction, and routing algorithms.",
        category: "Free Online Courses",
        unitNumber: 2,
        topic: "Data Link & Network Layers",
        pricingType: "FREE",
        resourceType: "COURSE"
      },
      {
        title: "Wireshark Packet Analysis Tool",
        platform: "Wireshark Foundation",
        url: "https://www.wireshark.org/",
        description: "Network protocol analyzer to inspect live packet transmissions, TCP handshakes, DNS queries, and HTTP headers.",
        category: "Useful Tools and Simulators",
        unitNumber: 3,
        topic: "Packet Capture & Analysis",
        pricingType: "FREE",
        resourceType: "SIMULATOR"
      }
    ],
    videos: [
      {
        title: "NPTEL: Computer Networks Lecture Series",
        youtubeUrl: "https://www.youtube.com/playlist?list=PLbRMhDVUMngf-pdMfiAiNn9nk5930hpeA",
        youtubeId: "PLbRMhDVUMngf-pdMfiAiNn9nk5930hpeA",
        videoType: "PLAYLIST",
        channelName: "NPTEL-NOC IITM",
        unitNumber: 1,
        topic: "OSI & TCP/IP Reference Models",
        description: "Official lecture series from IIT Kharagpur exploring physical transmission, MAC protocols, routing, and transport services.",
        pricingType: "FREE"
      }
    ]
  },

  // -------------------------------------------------------------------------
  // BCSAI 405: AI and Intelligent Agents
  // -------------------------------------------------------------------------
  {
    targetCodes: ['BCSAI 405'],
    resources: [
      {
        title: "UC Berkeley CS188: Introduction to Artificial Intelligence",
        platform: "UC Berkeley",
        url: "https://inst.eecs.berkeley.edu/~cs188/",
        description: "Flagship course covering state-space search (DFS, BFS, A*), adversarial search (Minimax, Alpha-Beta pruning), MDPs, and Reinforcement Learning.",
        category: "Lecture Notes",
        unitNumber: 1,
        topic: "Informed Search & Game Trees",
        pricingType: "FREE",
        resourceType: "NOTES"
      },
      {
        title: "MIT OpenCourseWare 6.034: Artificial Intelligence",
        platform: "MIT OpenCourseWare",
        url: "https://ocw.mit.edu/courses/6-034-artificial-intelligence-fall-2010/",
        description: "Legendary lecture series by Prof. Patrick Winston on reasoning, constraint satisfaction, neural networks, and semantic nets.",
        category: "Free Online Courses",
        unitNumber: 2,
        topic: "Knowledge Representation & Reasoning",
        pricingType: "FREE",
        resourceType: "COURSE"
      }
    ],
    videos: [
      {
        title: "MIT 6.034: Artificial Intelligence - Patrick Winston",
        youtubeUrl: "https://www.youtube.com/playlist?list=PLUl4u3cNGP63gFHB6xb-kVBiQHYe_4hSi",
        youtubeId: "PLUl4u3cNGP63gFHB6xb-kVBiQHYe_4hSi",
        videoType: "PLAYLIST",
        channelName: "MIT OpenCourseWare",
        unitNumber: 1,
        topic: "Search, Heuristics & Knowledge",
        description: "Complete MIT OCW lecture series on intelligent agents, heuristic search methods, constraint propagation, and machine learning.",
        pricingType: "FREE"
      }
    ]
  },

  // -------------------------------------------------------------------------
  // BCSAI 504 / MCS-214: Data Mining & Machine Learning
  // -------------------------------------------------------------------------
  {
    targetCodes: ['BCSAI 504', 'MCS-214'],
    resources: [
      {
        title: "Scikit-Learn Machine Learning Documentation & Guide",
        platform: "Scikit-Learn Developers",
        url: "https://scikit-learn.org/stable/user_guide.html",
        description: "Comprehensive technical guide on regression, classification, clustering, dimensionality reduction, and model evaluation.",
        category: "Official Documentation",
        unitNumber: 1,
        topic: "Supervised & Unsupervised Algorithms",
        pricingType: "FREE",
        resourceType: "DOCUMENTATION"
      },
      {
        title: "Stanford CS229: Machine Learning Course Materials",
        platform: "Stanford University",
        url: "https://cs229.stanford.edu/",
        description: "Rigorous theoretical course notes on linear regression, support vector machines, decision trees, and kernel methods.",
        category: "Lecture Notes",
        unitNumber: 2,
        topic: "Statistical Learning Theory",
        pricingType: "FREE",
        resourceType: "NOTES"
      }
    ],
    videos: [
      {
        title: "Stanford CS229: Machine Learning by Andrew Ng",
        youtubeUrl: "https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU",
        youtubeId: "PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU",
        videoType: "PLAYLIST",
        channelName: "Stanford Online",
        unitNumber: 1,
        topic: "Supervised Learning, Loss Functions & SVMs",
        description: "Stanford's definitive machine learning lecture series taught by Prof. Andrew Ng covering gradient descent, logistic regression, and clustering.",
        pricingType: "FREE"
      }
    ]
  },

  // -------------------------------------------------------------------------
  // MCS-101 / BCS-401: Computer Organization & Advanced Architecture
  // -------------------------------------------------------------------------
  {
    targetCodes: ['MCS-101', 'BCS-401'],
    resources: [
      {
        title: "Carnegie Mellon 18-447: Computer Architecture Lecture Notes",
        platform: "Carnegie Mellon University (CMU)",
        url: "https://safari.ethz.ch/architecture/",
        description: "In-depth course by Prof. Onur Mutlu detailing SIMD/MIMD architectures, superscalar execution, branch prediction, and memory hierarchy.",
        category: "Lecture Notes",
        unitNumber: 1,
        topic: "Pipelining, Vector & Parallel Processors",
        pricingType: "FREE",
        resourceType: "NOTES"
      },
      {
        title: "NPTEL: Advanced Computer Architecture",
        platform: "NPTEL / IIT Guwahati",
        url: "https://nptel.ac.in/courses/106103068",
        description: "Official national curriculum covering instruction-level parallelism, cache coherence, interconnection networks, and multiprocessors.",
        category: "Free Online Courses",
        unitNumber: 2,
        topic: "Multiprocessors & Memory Consistency",
        pricingType: "FREE",
        resourceType: "COURSE"
      }
    ],
    videos: [
      {
        title: "Computer Architecture by Prof. Onur Mutlu (CMU / ETH Zurich)",
        youtubeUrl: "https://www.youtube.com/playlist?list=PL5Q2soXY2Zi8J7U_N5y_9iE_oI4qR4XfE",
        youtubeId: "PL5Q2soXY2Zi8J7U_N5y_9iE_oI4qR4XfE",
        videoType: "PLAYLIST",
        channelName: "Onur Mutlu Lectures",
        unitNumber: 1,
        topic: "Advanced Processor Architecture & Parallelism",
        description: "World-class lecture series covering microarchitecture, pipelined execution, branch predictors, cache hierarchies, and memory systems.",
        pricingType: "FREE"
      }
    ]
  }
];

async function seedCuratedCseResources() {
  console.log('==================================================================');
  console.log('  SEEDING CURATED CSE EXTERNAL RESOURCES & VIDEO LECTURES');
  console.log('==================================================================\n');

  let totalResourcesInserted = 0;
  let totalVideosInserted = 0;

  for (const group of curatedResourcesData) {
    for (const code of group.targetCodes) {
      // Find matching subject across active engineering programmes
      const subjects = await prisma.subject.findMany({
        where: {
          code: code,
          semester: {
            curriculumVersion: {
              isCurrent: true,
              programme: {
                department: { code: 'ENG' }
              }
            }
          }
        },
        include: {
          semester: {
            include: {
              curriculumVersion: {
                include: { programme: true }
              }
            }
          }
        }
      });

      for (const sub of subjects) {
        const prog = sub.semester.curriculumVersion.programme;
        console.log(`Processing [${sub.code}] ${sub.name} in ${prog.code} (${sub.semester.title})...`);

        // Clean existing external resources and video lectures for idempotency
        await prisma.externalResource.deleteMany({
          where: { subjectId: sub.id }
        });
        await prisma.videoLecture.deleteMany({
          where: { subjectId: sub.id }
        });

        // Insert curated external resources
        for (const r of group.resources) {
          await prisma.externalResource.create({
            data: {
              subjectId: sub.id,
              title: r.title,
              platform: r.platform,
              url: r.url,
              description: r.description,
              category: r.category,
              unitNumber: r.unitNumber,
              topic: r.topic,
              pricingType: r.pricingType,
              resourceType: r.resourceType,
              isVerified: true
            }
          });
          totalResourcesInserted++;
        }

        // Insert curated video lectures
        for (const v of group.videos) {
          await prisma.videoLecture.create({
            data: {
              subjectId: sub.id,
              title: v.title,
              youtubeUrl: v.youtubeUrl,
              youtubeId: v.youtubeId,
              videoType: v.videoType,
              channelName: v.channelName,
              unitNumber: v.unitNumber,
              topic: v.topic,
              description: v.description,
              pricingType: v.pricingType,
              isVerified: true
            }
          });
          totalVideosInserted++;
        }

        console.log(`  -> Attached ${group.resources.length} External Resources & ${group.videos.length} Video Lectures.`);
      }
    }
  }

  console.log('\n==================================================================');
  console.log(`TOTAL EXTERNAL RESOURCES INSERTED: ${totalResourcesInserted}`);
  console.log(`TOTAL VIDEO LECTURES INSERTED: ${totalVideosInserted}`);
  console.log('==================================================================\n');

  await prisma.$disconnect();
}

seedCuratedCseResources().catch(console.error);
