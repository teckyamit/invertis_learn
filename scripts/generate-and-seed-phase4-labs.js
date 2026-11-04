const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function escapePdfText(str) {
  return str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function createAcademicLabPDF({
  universityName = "INVERTIS UNIVERSITY, BAREILLY",
  faculty = "FACULTY OF ENGINEERING & TECHNOLOGY",
  subjectCode,
  subjectName,
  programme,
  resourceTitle,
  resourceType,
  author,
  contentSections
}) {
  const lines = [
    { text: universityName, size: 16, bold: true, align: 'center', y: 795 },
    { text: faculty, size: 11, bold: true, align: 'center', y: 775 },
    { text: "OFFICIAL PRACTICAL & LABORATORY MANUAL • DEPARTMENT OF CSE", size: 10, bold: false, align: 'center', y: 760 },
    { text: "-------------------------------------------------------------------------------------------------------------------", size: 9, bold: false, align: 'center', y: 745 },
    { text: `Laboratory Course: [${subjectCode}] ${subjectName}`, size: 11, bold: true, x: 50, y: 730 },
    { text: `Programme: ${programme}`, size: 10, bold: false, x: 50, y: 714 },
    { text: `Manual Type: ${resourceType.replace(/_/g, ' ')}`, size: 10, bold: true, x: 380, y: 714 },
    { text: "Prescribed w.e.f Academic Session 2023-2024", size: 10, bold: false, x: 50, y: 698 },
    { text: `Lab Coordinator: ${author}`, size: 10, bold: true, x: 380, y: 698 },
    { text: "-------------------------------------------------------------------------------------------------------------------", size: 9, bold: false, align: 'center', y: 686 },
    { text: resourceTitle, size: 13, bold: true, align: 'center', y: 668 },
    { text: "==================================================================================================", size: 8, bold: false, align: 'center', y: 654 }
  ];

  let currentY = 636;

  contentSections.forEach((section) => {
    if (currentY < 120) return;
    lines.push({ text: section.heading, size: 11, bold: true, x: 50, y: currentY });
    currentY -= 17;

    section.points.forEach((pt) => {
      if (currentY < 90) return;
      if (pt.length > 88) {
        const splitIdx = pt.lastIndexOf(' ', 88);
        lines.push({ text: pt.substring(0, splitIdx), size: 9.5, bold: false, x: 55, y: currentY });
        currentY -= 14;
        lines.push({ text: "  " + pt.substring(splitIdx + 1), size: 9.5, bold: false, x: 55, y: currentY });
        currentY -= 16;
      } else {
        lines.push({ text: pt, size: 9.5, bold: false, x: 55, y: currentY });
        currentY -= 16;
      }
    });

    currentY -= 8;
  });

  lines.push({
    text: "INVERTIS LEARN LABORATORY REPOSITORY • OFFICIAL PRACTICAL CURRICULUM",
    size: 8,
    bold: true,
    align: 'center',
    y: Math.max(currentY, 45)
  });

  let streamContent = "";
  lines.forEach((l) => {
    const escaped = escapePdfText(l.text);
    const fontName = l.bold ? "/F2" : "/F1";
    let xPos = l.x || 50;
    if (l.align === 'center') {
      const approxWidth = l.text.length * (l.size * 0.52);
      xPos = Math.max(30, (595 - approxWidth) / 2);
    }
    streamContent += `BT ${fontName} ${l.size} Tf ${xPos.toFixed(1)} ${l.y.toFixed(1)} Td (${escaped}) Tj ET\n`;
  });

  const streamLength = Buffer.byteLength(streamContent, 'utf-8');

  const pdfChunks = [];
  pdfChunks.push("%PDF-1.4\n");
  const offsets = [];

  function addObj(content) {
    offsets.push(pdfChunks.reduce((acc, c) => acc + Buffer.byteLength(c, 'utf-8'), 0));
    pdfChunks.push(content);
  }

  addObj("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");
  addObj("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n");
  addObj("3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj\n");
  addObj("4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n");
  addObj("5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n");
  addObj(`6 0 obj\n<< /Length ${streamLength} >>\nstream\n${streamContent}endstream\nendobj\n`);

  const xrefOffset = pdfChunks.reduce((acc, c) => acc + Buffer.byteLength(c, 'utf-8'), 0);
  let xref = `xref\n0 ${offsets.length + 1}\n0000000000 65535 f \n`;
  for (let i = 0; i < offsets.length; i++) {
    xref += String(offsets[i]).padStart(10, '0') + " 00000 n \n";
  }

  const trailer = `trailer\n<< /Size ${offsets.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  pdfChunks.push(xref);
  pdfChunks.push(trailer);

  return Buffer.from(pdfChunks.join(''), 'utf-8');
}

// Structured experiments to enrich Subject.syllabusDetails for practical courses
const PRACTICAL_EXPERIMENTS_MAP = {
  'BCS-352': [
    "1. History, architecture and enterprise applications of the Linux Operating System.",
    "2. Comparative evaluation of Linux distributions (Ubuntu, Fedora, Kali, Linux Mint).",
    "3. User login management on server machine and remote authentication via client (SSH).",
    "4. Hypervisor setup and virtual machine provisioning using VMware Workstation / KVM.",
    "5. Installation and configuration of headless operating systems on virtual machines.",
    "6. Basic and administrative Linux shell commands (ls, pwd, chmod, chown, grep, find).",
    "7. File stream manipulation and concatenation using the 'cat' command and pipeline redirections.",
    "8. Vi / Vim editor configuration, buffer modes, substitution commands and syntax highlights.",
    "9. Student record management in text database format line-by-line with awk and sed.",
    "10. File difference detection using 'diff' command and automated patch generation.",
    "11. Linux user groups, sudoers privileges, password aging policies and account locking.",
    "12. Web and Database Server setup: Apache HTTP server and MySQL daemon configuration."
  ],
  'BCS-353': [
    "1. Study and truth table verification of basic TTL logic gates (AND, OR, NOT, NAND, NOR, XOR, XNOR).",
    "2. Boolean logic function simplification using Karnaugh Maps (K-Maps) and circuit implementation.",
    "3. Verification and operation of 4-to-1 Multiplexer and 1-to-4 Demultiplexer circuits.",
    "4. Design and verification of 2-bit and 4-bit Magnitude Comparator circuits.",
    "5. Truth table and characteristic equation verification of S-R, J-K, D, and T Flip-Flops.",
    "6. Verification and timing analysis of 4-bit Universal Bi-directional Shift Register.",
    "7. Design and experimental verification of 3-bit Synchronous Binary Up/Down Counter.",
    "8. Design and realization of Decade Counter using J-K flip-flops with Seven-Segment display driver.",
    "9. Design and experimental verification of Asynchronous (Ripple) Decade Counter."
  ],
  'BCS-354': [
    "1. Python numerical datatypes: int, float, complex, and arithmetic/bitwise operators.",
    "2. Interactive arithmetic calculator with operator precedence and input validation.",
    "3. List operations: append(), insert(), remove(), pop(), index(), sort(), reverse(), and list comprehension.",
    "4. Dictionary methods: keys(), values(), items(), get(), update(), and nested dictionary traversal.",
    "5. Tuple immutability and Set operations (union, intersection, difference, symmetric difference).",
    "6. Conditional execution: finding the maximum of three numbers and leap year check using if-elif-else.",
    "7. Modular programming: creating reusable functions with default, variable-length, and keyword arguments.",
    "8. String manipulation: palindrome verification, anagram testing, and character frequency count.",
    "9. File handling: reading text corpus, calculating word/line counts, and writing filtered tokens.",
    "10. Robust exception handling using try, except, else, and finally blocks for defensive I/O.",
    "11. Object-Oriented Programming: classes, constructors (__init__), inheritance, and method overriding.",
    "12. Scientific computing: multi-dimensional array operations, slicing, and matrix algebra with NumPy."
  ],
  'BCS-251': [
    "1. Environment configuration: GNU C Compiler (gcc) usage, compilation stages, and execution flags.",
    "2. Basic arithmetic: evaluation of algebraic formulas, compound interest, and temperature conversion.",
    "3. Conditional branching: roots of quadratic equation using discriminant and grading classification.",
    "4. Loops and iteration: prime number testing, Fibonacci sequence generation, and Pascal's triangle.",
    "5. 1D Array algorithms: linear search, binary search on sorted input, and bubble sort algorithm.",
    "6. 2D Array algorithms: matrix addition, matrix subtraction, and matrix multiplication with dimension checks.",
    "7. Functions: Call-by-value vs Call-by-reference using pointers; recursive computation of Factorial and GCD.",
    "8. String algorithms: custom implementation of strlen(), strcpy(), strcat(), and strcmp() without string.h.",
    "9. Structures: student database management with roll number, marks, and rank sorting.",
    "10. Dynamic memory allocation: malloc(), calloc(), realloc(), free() for variable-length records.",
    "11. File I/O operations: reading and writing structured student records to disk using fopen, fread, fwrite."
  ],
  'MCS-151': [
    "1. Architectural simulation using Gem5 / SimpleScalar: pipeline stage profiling and IPC measurement.",
    "2. Instruction-Level Parallelism analysis: branch predictor benchmarks (2-bit saturating counter vs Gshare).",
    "3. Cache performance analysis: miss penalty, associativity benchmarks (direct-mapped vs 4-way set associative).",
    "4. Multi-core memory hierarchy: shared L2/L3 cache coherence simulation under MSI and MESI protocols.",
    "5. Matrix multiplication optimization: memory access locality, cache blocking, and SIMD vectorization."
  ]
};

const LAB_RESOURCES_DATA = [
  // 1. BCS-351 Data Structures Lab
  {
    subjectCode: 'BCS-351',
    fileName: 'BCS351_Data_Structures_Lab_Manual.pdf',
    title: 'Official Laboratory Manual: Data Structures Lab',
    author: 'Department of Computer Science & Engineering',
    resourceType: 'LAB_MANUAL',
    contentSections: [
      {
        heading: "1. Laboratory Objectives & Evaluation Structure",
        points: [
          "- Course Goal: Practical mastery of linear and non-linear data structures in ANSI C/C++.",
          "- Evaluation Breakdown: Continuous Assessment (20 Marks) + End-Semester Lab Exam (30 Marks).",
          "- Rubrics: Algorithm design (20%), clean implementation (40%), viva voce (20%), lab record (20%)."
        ]
      },
      {
        heading: "2. Core Prescribed Experiments Schedule",
        points: [
          "- Week 1-3: Array insertion/deletion, Stack push/pop, Infix to Postfix expression conversion.",
          "- Week 4-6: Linear Queue, Circular Queue using modulo arithmetic, and Priority Queue.",
          "- Week 7-9: Singly Linked List, Doubly Linked List, and Polynomial Addition using Linked Lists.",
          "- Week 10-12: Binary Search Tree (BST) insertion, search, and traversals (In-order, Pre-order, Post-order).",
          "- Week 13-14: Sorting algorithms (Quick Sort, Merge Sort, Heap Sort) and Search comparisons."
        ]
      }
    ]
  },
  {
    subjectCode: 'BCS-351',
    fileName: 'BCS351_Data_Structures_Viva_Voce_QA.pdf',
    title: 'Viva Voce Top 50 Questions & Model Answers: Data Structures Lab',
    author: 'Dr. R. K. Sharma (Associate Prof., Dept. of CSE)',
    resourceType: 'VIVA_QUESTIONS',
    contentSections: [
      {
        heading: "1. Stacks, Queues & Recursion Viva Questions",
        points: [
          "- Q1: What is the main disadvantage of a linear queue implemented via an array?",
          "  A: False overflow condition occurs when elements are dequeued from front, leaving unused space.",
          "- Q2: How does a circular queue overcome false overflow?",
          "  A: By wrapping rear and front pointers using modulo arithmetic: rear = (rear + 1) % MAX.",
          "- Q3: How does the system call stack facilitate recursion?",
          "  A: Each recursive invocation allocates an activation record containing local variables and return address."
        ]
      },
      {
        heading: "2. Trees, Graphs & Complexity Viva Questions",
        points: [
          "- Q4: What is the worst-case search complexity in an unbalanced BST vs an AVL tree?",
          "  A: Unbalanced BST is O(n) (skewed tree); AVL tree maintains balance factor {-1,0,1} guaranteeing O(log n).",
          "- Q5: Why is Quick Sort preferred over Merge Sort for arrays, and vice-versa for linked lists?",
          "  A: Quick Sort has superior cache locality and in-place partitioning; Merge Sort does not require random access."
        ]
      }
    ]
  },
  {
    subjectCode: 'BCS-351',
    fileName: 'BCS351_Data_Structures_Code_Templates.pdf',
    title: 'Starter Code Templates & Clean C Implementation Patterns',
    author: 'Department of Computer Science & Engineering',
    resourceType: 'CODE_TEMPLATE',
    contentSections: [
      {
        heading: "1. Circular Queue Template Pattern (C Language)",
        points: [
          "- Structure: struct CircularQueue { int items[SIZE]; int front; int rear; };",
          "- Enqueue logic: if ((rear + 1) % SIZE == front) -> OVERFLOW; else rear = (rear + 1) % SIZE;",
          "- Dequeue logic: if (front == -1) -> UNDERFLOW; element = items[front]; if (front == rear) reset;"
        ]
      },
      {
        heading: "2. Binary Search Tree (BST) Node Template",
        points: [
          "- Node declaration: struct Node { int data; struct Node *left, *right; };",
          "- Memory allocation: struct Node *newNode = (struct Node*)malloc(sizeof(struct Node));",
          "- Recursive traversal: void inorder(struct Node* root) { if(root) { inorder(root->left); printf(\"%d \", root->data); inorder(root->right); } }"
        ]
      }
    ]
  },

  // 2. BCS-352 IT Infrastructure Management Lab
  {
    subjectCode: 'BCS-352',
    fileName: 'BCS352_IT_Infrastructure_Lab_Manual.pdf',
    title: 'Official Laboratory Manual: Linux System Administration & Virtualization',
    author: 'Prof. Amit Saxena (Dept. of CSE)',
    resourceType: 'LAB_MANUAL',
    contentSections: [
      {
        heading: "1. Course Overview & Laboratory Objectives",
        points: [
          "- Focus: Hands-on Linux systems administration, VM configuration, and service deployment.",
          "- Environment: Ubuntu Server / CentOS virtualized on Type-1 and Type-2 hypervisors.",
          "- Competencies: Shell scripting, user permissions, networking setup, and web server configuration."
        ]
      },
      {
        heading: "2. Key Prescribed Practical Exercises",
        points: [
          "- Lab 1-4: Linux terminal mastery, user permissions (chmod 755/644), chown, and sudoers configuration.",
          "- Lab 5-7: Hypervisor setup: creating and configuring VM snapshots and NAT/Bridged virtual networks.",
          "- Lab 8-10: Text stream processing with vi editor, grep, awk, sed, and diff patch generation.",
          "- Lab 11-12: Enterprise service deployment: Apache web server, SSH key pairs, and firewall (ufw)."
        ]
      }
    ]
  },
  {
    subjectCode: 'BCS-352',
    fileName: 'BCS352_Linux_SysAdmin_Viva_Questions.pdf',
    title: 'Linux Systems Administration & Virtualization Viva Voce Guide',
    author: 'Prof. Amit Saxena (Dept. of CSE)',
    resourceType: 'VIVA_QUESTIONS',
    contentSections: [
      {
        heading: "1. Core Linux Kernel & Commands Viva",
        points: [
          "- Q1: What is the difference between a Hard Link and a Soft (Symbolic) Link in Linux?",
          "  A: Hard links share the same inode number; soft links are pointer files referencing the file path.",
          "- Q2: Explain the significance of file permissions 754 in octal notation.",
          "  A: Owner has rwx (7), Group has r-x (5), Others have r-- (4)."
        ]
      },
      {
        heading: "2. Virtualization & Networking Viva",
        points: [
          "- Q3: What is the difference between Bridged and NAT virtual networking in VMware?",
          "  A: Bridged assigns VM its own IP on physical LAN; NAT shares host IP through internal routing.",
          "- Q4: How does the 'diff' and 'patch' workflow work in system administration?",
          "  A: diff generates difference delta; patch applies the delta cleanly to production configurations."
        ]
      }
    ]
  },

  // 3. BCS-353 Digital Electronics Lab
  {
    subjectCode: 'BCS-353',
    fileName: 'BCS353_Digital_Electronics_Lab_Manual.pdf',
    title: 'Official Laboratory Manual: Digital Logic, Gates & Counter Design',
    author: 'Prof. R. K. Patel (Dept. of CSE)',
    resourceType: 'LAB_MANUAL',
    contentSections: [
      {
        heading: "1. Laboratory Objectives & IC Pinout Verification",
        points: [
          "- Equipment: Digital IC Trainer Kit, Dual trace oscilloscope, TTL ICs (7400, 7402, 7404, 7408, 7432, 7486).",
          "- Objectives: Practical design of combinational and sequential digital logic circuits.",
          "- Rules: Verify VCC (+5V) and GND connections before powering trainer kit."
        ]
      },
      {
        heading: "2. Prescribed Experiment Modules",
        points: [
          "- Experiment 1-3: Truth tables of universal gates, De Morgan's laws verification, and K-Map logic minimization.",
          "- Experiment 4-6: Multiplexer (74151) and Demultiplexer (74138) operational verification.",
          "- Experiment 7-9: Flip-Flop conversion (SR to JK), Shift Registers, and Decade Synchronous Counter."
        ]
      }
    ]
  },

  // 4. BCS-354 Python Lab
  {
    subjectCode: 'BCS-354',
    fileName: 'BCS354_Python_Programming_Lab_Manual.pdf',
    title: 'Official Laboratory Manual: Python Programming, OOP & Data Analysis',
    author: 'Prof. Neha Gupta (Assistant Prof., Dept. of CSE)',
    resourceType: 'LAB_MANUAL',
    contentSections: [
      {
        heading: "1. Python Laboratory Objectives",
        points: [
          "- Learning Objective: Fluency in Python 3 syntax, functional paradigms, OOP, and data packages.",
          "- IDE / Environment: Python 3.10+, VS Code / PyCharm / Jupyter Notebook.",
          "- Assessment: Program correctness, coding standards (PEP 8), exception handling, and lab viva."
        ]
      },
      {
        heading: "2. Prescribed Laboratory Exercises",
        points: [
          "- Exercises 1-4: Datatypes, operator precedence, list manipulation methods, dictionary methods.",
          "- Exercises 5-8: Tuples and sets, control structures, custom functions with keyword parameters.",
          "- Exercises 9-12: String algorithms, text file word counting, OOP inheritance, and NumPy matrix multiplication."
        ]
      }
    ]
  },

  // 5. BCS-251 Programming for Problem Solving Lab (C Lab)
  {
    subjectCode: 'BCS-251',
    fileName: 'BCS251_Programming_in_C_Lab_Manual.pdf',
    title: 'Official Laboratory Manual: C Programming & Problem Solving',
    author: 'Department of Computer Science & Engineering',
    resourceType: 'LAB_MANUAL',
    contentSections: [
      {
        heading: "1. Course Objectives & Lab Evaluation",
        points: [
          "- Target: Foundational algorithmic problem-solving using C programming language.",
          "- Assessment: Continuous lab assessment (20 Marks) + External Practical Examination (30 Marks).",
          "- Compiler: GCC on Linux / Dev-C++ / CodeBlocks."
        ]
      },
      {
        heading: "2. Prescribed Experiment Schedule",
        points: [
          "- Week 1-4: GCC setup, data types, arithmetic expressions, if-else branching, loops.",
          "- Week 5-8: 1D arrays (searching & sorting), 2D matrix multiplication, custom functions.",
          "- Week 9-12: Pointers, call-by-reference, string manipulation without string.h, structures.",
          "- Week 13-14: Dynamic memory allocation (malloc/free) and persistent file input/output."
        ]
      }
    ]
  },
  {
    subjectCode: 'BCS-251',
    fileName: 'BCS251_C_Programming_Viva_Voce_QA.pdf',
    title: 'C Programming Top 40 Viva Voce Questions & Answers',
    author: 'Prof. Neha Gupta (Assistant Prof., Dept. of CSE)',
    resourceType: 'VIVA_QUESTIONS',
    contentSections: [
      {
        heading: "1. Memory, Pointers & Array Viva Questions",
        points: [
          "- Q1: What is the difference between malloc() and calloc()?",
          "  A: malloc() allocates uninitialized memory; calloc() allocates contiguous memory and zeroes all bits.",
          "- Q2: Explain the difference between array name 'a' and '&a' in C.",
          "  A: 'a' decays to a pointer to first element (int*); '&a' is a pointer to the entire array (int(*)[N])."
        ]
      },
      {
        heading: "2. Functions & Structures Viva Questions",
        points: [
          "- Q3: What is the difference between Structure and Union in C?",
          "  A: Structure allocates memory equal to sum of all members; Union shares memory equal to largest member.",
          "- Q4: What is a Dangling Pointer and how can it be prevented?",
          "  A: A pointer pointing to deallocated memory; prevent by assigning ptr = NULL immediately after free(ptr)."
        ]
      }
    ]
  },

  // 6. BAS151 Physics Lab
  {
    subjectCode: 'BAS151',
    fileName: 'BAS151_Engineering_Physics_Lab_Manual.pdf',
    title: 'Official Laboratory Manual: Engineering Physics & Optics',
    author: 'Department of Applied Sciences & Physics',
    resourceType: 'LAB_MANUAL',
    contentSections: [
      {
        heading: "1. Laboratory Guidelines & Safety Protocol",
        points: [
          "- Safety: Never look directly into laser beams; discharge high voltage capacitors carefully.",
          "- Apparatus: Spectrometer, Sodium vapour lamp, He-Ne Laser, Polarimeter, Hall effect setup.",
          "- Evaluation: Observation table accuracy (30%), least count measurement (20%), viva (20%), calculations (30%)."
        ]
      },
      {
        heading: "2. Prescribed Experiments",
        points: [
          "- Exp 1-4: Newton's ring wavelength determination, Fresnel's biprism, nodal slide, cane sugar polarimeter.",
          "- Exp 5-7: Transmission grating spectral lines, laser diffraction wavelength measurement.",
          "- Exp 8-12: Carey Foster's bridge specific resistance, Stefan's law, Hall coefficient and carrier density."
        ]
      }
    ]
  },

  // 7. MCS-151 Advanced Computer Architecture Lab
  {
    subjectCode: 'MCS-151',
    fileName: 'MCS151_Adv_Architecture_Lab_Manual.pdf',
    title: 'Official Laboratory Manual: Architecture Simulation & Cache Profiling',
    author: 'Dr. A. K. Ganguly (Head of Dept., Dept. of CSE)',
    resourceType: 'LAB_MANUAL',
    contentSections: [
      {
        heading: "1. Advanced Architecture Simulation Goals",
        points: [
          "- Platform: Gem5 cycle-accurate simulator / SimpleScalar toolkit on Linux.",
          "- Objective: Empirical evaluation of speculative branch prediction, cache miss rates, and multi-core IPC.",
          "- Grading: Simulation trace analysis, IPC metrics graphs, and research lab report."
        ]
      },
      {
        heading: "2. Experimental Assignments",
        points: [
          "- Experiment 1-2: Gem5 configuration for Out-of-Order (O3) CPU model and IPC benchmark comparisons.",
          "- Experiment 3-4: L1/L2 cache associativity variation and miss rate characterization.",
          "- Experiment 5: Shared memory multi-core coherence trace under MESI protocol."
        ]
      }
    ]
  }
];

async function seedPhase4Labs() {
  console.log("==================================================================");
  console.log("INVERTIS LEARN - PHASE 4 (PRACTICAL & LAB MANUALS SEED)");
  console.log("==================================================================");

  const targetDir = path.join(process.cwd(), 'public/uploads/lab_manuals');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    console.log(`Created lab manuals storage directory: ${targetDir}`);
  }

  // 1. Ensure LAB_MANUAL category exists
  let labCategory = await prisma.resourceCategory.findUnique({
    where: { code: 'LAB_MANUAL' }
  });

  if (!labCategory) {
    labCategory = await prisma.resourceCategory.create({
      data: {
        code: 'LAB_MANUAL',
        name: 'Laboratory Manual',
        description: 'Practical experiment manuals, instructions and viva material'
      }
    });
    console.log("Created ResourceCategory: LAB_MANUAL");
  } else {
    console.log("Found existing ResourceCategory: LAB_MANUAL");
  }

  // 2. Enrich Subject.syllabusDetails with authentic lab experiments
  console.log("\nEnriching Subject.syllabusDetails with authentic lab experiments...");
  for (const [subCode, expList] of Object.entries(PRACTICAL_EXPERIMENTS_MAP)) {
    const subjects = await prisma.subject.findMany({
      where: { code: subCode }
    });

    for (const sub of subjects) {
      let existingDetails = {};
      if (sub.syllabusDetails) {
        try {
          existingDetails = JSON.parse(sub.syllabusDetails);
        } catch (e) {}
      }

      existingDetails.labExperiments = expList;

      await prisma.subject.update({
        where: { id: sub.id },
        data: {
          syllabusDetails: JSON.stringify(existingDetails)
        }
      });
      console.log(`  Updated [${sub.code}] ${sub.name} with ${expList.length} lab experiments.`);
    }
  }

  // 3. Generate physical lab manual PDFs and seed AcademicResource
  console.log("\nGenerating Lab Manual PDFs and seeding AcademicResource records...");
  let seededCount = 0;

  for (const item of LAB_RESOURCES_DATA) {
    const subject = await prisma.subject.findFirst({
      where: { code: item.subjectCode },
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

    if (!subject) {
      console.warn(`Warning: Subject ${item.subjectCode} not found in database. Skipping.`);
      continue;
    }

    const progName = subject.semester.curriculumVersion.programme.name;
    const filePath = path.join(targetDir, item.fileName);
    const relStoragePath = `uploads/lab_manuals/${item.fileName}`;

    // Generate PDF document
    const pdfBuffer = createAcademicLabPDF({
      subjectCode: subject.code,
      subjectName: subject.name,
      programme: progName,
      resourceTitle: item.title,
      resourceType: item.resourceType,
      author: item.author,
      contentSections: item.contentSections
    });

    fs.writeFileSync(filePath, pdfBuffer);
    console.log(`  Generated Lab PDF: ${item.fileName} (${pdfBuffer.length} bytes)`);

    // Upsert AcademicResource record in database
    const resourceId = `lab_${subject.code}_${item.fileName.replace('.pdf', '')}`;
    await prisma.academicResource.upsert({
      where: { id: resourceId },
      update: {
        title: item.title,
        originalFileName: item.fileName,
        storedFileName: item.fileName,
        storagePath: relStoragePath,
        fileSizeBytes: pdfBuffer.length,
        authorName: item.author,
        resourceType: item.resourceType,
        isPublished: true
      },
      create: {
        id: resourceId,
        subjectId: subject.id,
        categoryId: labCategory.id,
        title: item.title,
        originalFileName: item.fileName,
        storedFileName: item.fileName,
        storagePath: relStoragePath,
        fileSizeBytes: pdfBuffer.length,
        authorName: item.author,
        resourceType: item.resourceType,
        isPublished: true
      }
    });

    seededCount++;
  }

  console.log(`\nSuccessfully generated and seeded ${seededCount} Laboratory Manuals & Resources!`);
}

seedPhase4Labs()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

