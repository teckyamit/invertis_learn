const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function escapePdfText(str) {
  return str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function createAcademicNotesPDF({
  universityName = "INVERTIS UNIVERSITY, BAREILLY",
  faculty = "FACULTY OF ENGINEERING & TECHNOLOGY",
  subjectCode,
  subjectName,
  programme,
  resourceTitle,
  resourceType,
  unitLabel,
  author,
  contentSections
}) {
  const lines = [
    { text: universityName, size: 16, bold: true, align: 'center', y: 795 },
    { text: faculty, size: 11, bold: true, align: 'center', y: 775 },
    { text: "OFFICIAL ACADEMIC LEARNING RESOURCE • DEPARTMENT OF CSE", size: 10, bold: false, align: 'center', y: 760 },
    { text: "-------------------------------------------------------------------------------------------------------------------", size: 9, bold: false, align: 'center', y: 745 },
    { text: `Course: [${subjectCode}] ${subjectName}`, size: 11, bold: true, x: 50, y: 730 },
    { text: `Programme: ${programme}`, size: 10, bold: false, x: 50, y: 714 },
    { text: `Resource Type: ${resourceType.replace(/_/g, ' ')}`, size: 10, bold: true, x: 380, y: 714 },
    { text: `Module / Unit: ${unitLabel || 'Comprehensive Course Coverage'}`, size: 10, bold: false, x: 50, y: 698 },
    { text: `Faculty Author: ${author}`, size: 10, bold: true, x: 380, y: 698 },
    { text: "-------------------------------------------------------------------------------------------------------------------", size: 9, bold: false, align: 'center', y: 686 },
    { text: resourceTitle, size: 13, bold: true, align: 'center', y: 668 },
    { text: "==================================================================================================", size: 8, bold: false, align: 'center', y: 654 }
  ];

  let currentY = 636;

  contentSections.forEach((section) => {
    if (currentY < 120) return; // avoid overflow
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
    text: "INVERTIS LEARN ACADEMIC REPOSITORY • FACULTY-VERIFIED STUDY RESOURCE",
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

const NOTES_DATA = [
  // 1. BCS-301 Data Structures - Unit 1
  {
    subjectCode: 'BCS-301',
    fileName: 'BCS301_Unit1_Arrays_Stacks_Queues_Notes.pdf',
    title: 'Unit 1 Lecture Notes: Arrays, Stacks, Queues & Recursion',
    author: 'Dr. R. K. Sharma (Associate Prof., Dept. of CSE)',
    unitNumber: 1,
    resourceType: 'LECTURE_NOTES',
    contentSections: [
      {
        heading: "1. Abstract Data Types & Asymptotic Complexity Analysis",
        points: [
          "- Definition of ADT: Mathematical model for data types with user-defined operations.",
          "- Asymptotic Notations: Big-O (upper bound), Omega (lower bound), Theta (tight bound).",
          "- Space-Time Tradeoff: Balancing memory overhead vs cpu cycles in linear data structures."
        ]
      },
      {
        heading: "2. Stacks: Implementation, Applications & State Diagrams",
        points: [
          "- LIFO Discipline: Push, Pop, Peek, IsEmpty operations with O(1) time complexity.",
          "- Infix to Postfix Conversion: Operator precedence parsing and Shunting-Yard algorithm.",
          "- Function Call Stack: Activation records, local variable frames, recursion mechanics."
        ]
      },
      {
        heading: "3. Linear & Circular Queues, Deques & Priority Queues",
        points: [
          "- Circular Queue: Overcoming false overflow via modulo arithmetic ((rear + 1) % MAX).",
          "- Double-Ended Queues (Deque): Input-restricted and output-restricted configurations.",
          "- Priority Queue Foundations: Heap order property preview and array-based indexing."
        ]
      }
    ]
  },

  // 2. BCS-301 Data Structures - Unit 2
  {
    subjectCode: 'BCS-301',
    fileName: 'BCS301_Unit2_Trees_BST_AVL_Notes.pdf',
    title: 'Unit 2 Lecture Notes: Linked Lists, Binary Trees & Balanced Trees',
    author: 'Dr. R. K. Sharma (Associate Prof., Dept. of CSE)',
    unitNumber: 2,
    resourceType: 'LECTURE_NOTES',
    contentSections: [
      {
        heading: "1. Singly, Doubly, and Circular Linked Lists",
        points: [
          "- Dynamic Memory Allocation: Pointer linking, node structure, head and tail pointers.",
          "- Operations: Insertion and deletion at beginning, intermediate, and end positions.",
          "- Advantages over arrays: Dynamic size flexibility and constant-time node insertion."
        ]
      },
      {
        heading: "2. Binary Trees and Binary Search Trees (BST)",
        points: [
          "- Tree Terminology: Root, leaf, internal nodes, depth, height, level order.",
          "- Tree Traversals: In-order (Left-Root-Right), Pre-order (Root-Left-Right), Post-order.",
          "- BST Invariant: Left subtree keys < root key < right subtree keys. Search complexity O(h)."
        ]
      },
      {
        heading: "3. Self-Balancing Trees: AVL Trees & Rotations",
        points: [
          "- Balance Factor: BF = Height(Left) - Height(Right), constrained to {-1, 0, +1}.",
          "- Tree Rotations: Single Rotations (LL, RR) and Double Rotations (LR, RL) to restore balance.",
          "- Worst-case Search Guarantee: O(log n) guaranteed search, insert, and delete operations."
        ]
      }
    ]
  },

  // 3. BCS-301 Data Structures - Unit 3 Revision Summary
  {
    subjectCode: 'BCS-301',
    fileName: 'BCS301_Unit3_Sorting_Searching_Complexity.pdf',
    title: 'Unit 3 Quick Summary: Searching, Sorting & Asymptotic Complexities',
    author: 'Prof. S. Verma (Assistant Prof., Dept. of CSE)',
    unitNumber: 3,
    resourceType: 'UNIT_SUMMARY',
    contentSections: [
      {
        heading: "1. Searching Algorithms Comparison Summary",
        points: [
          "- Linear Search: O(n) worst-case time complexity, operates on unsorted arrays.",
          "- Binary Search: O(log n) time complexity, strictly requires sorted random-access arrays.",
          "- Hashing: Direct address tables, hash functions, collision resolution by chaining & probing."
        ]
      },
      {
        heading: "2. Sorting Algorithms Master Complexity Table",
        points: [
          "- Bubble Sort / Insertion Sort / Selection Sort: Best O(n), Average O(n^2), Worst O(n^2).",
          "- Quick Sort: Best O(n log n), Average O(n log n), Worst O(n^2) with poor pivot choice.",
          "- Merge Sort: Guaranteed O(n log n) all cases; requires O(n) auxiliary memory space."
        ]
      },
      {
        heading: "3. Graph Representation & Elementary Algorithms",
        points: [
          "- Representations: Adjacency Matrix (O(V^2) space) vs Adjacency List (O(V+E) space).",
          "- Breadth-First Search (BFS): Queue-based level-order traversal, shortest paths in unweighted graphs.",
          "- Depth-First Search (DFS): Stack/recursion-based traversal, topological sorting, cycle detection."
        ]
      }
    ]
  },

  // 4. BCS-301 Data Structures - Comprehensive Course Deck (PPT Slides)
  {
    subjectCode: 'BCS-301',
    fileName: 'BCS301_Comprehensive_Course_Deck.pdf',
    title: 'Complete Course Presentation Deck: Data Structures & Algorithms',
    author: 'Department of Computer Science & Engineering',
    unitNumber: null,
    resourceType: 'PPT_SLIDES',
    contentSections: [
      {
        heading: "Slide Module 1: Foundational Paradigms & Linear Collections",
        points: [
          "- Memory management in C: stack vs heap, pointer arithmetic, contiguous allocation.",
          "- Abstract data type specification and interface design in engineering applications.",
          "- Array based representations of vectors, sparse matrices, and dynamic buffers."
        ]
      },
      {
        heading: "Slide Module 2: Non-Linear Hierarchies & Trees",
        points: [
          "- Recursive tree traversal algorithms and structural proofs via mathematical induction.",
          "- Huffman coding trees for lossless data compression and prefix codes.",
          "- Multiway search trees: 2-3 trees, B-Trees, and database disk-block indexing."
        ]
      },
      {
        heading: "Slide Module 3: Advanced Graphs, Greedy & Dynamic Methods",
        points: [
          "- Minimum Spanning Trees: Kruskal's algorithm (Disjoint Set Union) and Prim's algorithm.",
          "- Single Source Shortest Path: Dijkstra's algorithm using Fibonacci / Binary Heaps.",
          "- Summary: Real-world case studies in networking routing and compilation parse trees."
        ]
      }
    ]
  },

  // 5. BCS-302 IT Infrastructure Management - Unit 1
  {
    subjectCode: 'BCS-302',
    fileName: 'BCS302_Unit1_DataCenter_Architecture_Notes.pdf',
    title: 'Unit 1 Lecture Notes: Modern Data Center Infrastructure & Virtualization',
    author: 'Prof. Amit Saxena (Dept. of CSE)',
    unitNumber: 1,
    resourceType: 'LECTURE_NOTES',
    contentSections: [
      {
        heading: "1. Enterprise IT Infrastructure Architecture",
        points: [
          "- Tiered Data Center Classification (Tier I to IV uptime and redundancy benchmarks).",
          "- Server Hardware Architecture: Rack, blade, and hyper-converged compute nodes.",
          "- Storage Topologies: DAS (Direct Attached), NAS (Network Attached), SAN (Storage Area Network)."
        ]
      },
      {
        heading: "2. Server Virtualization & Cloud Foundations",
        points: [
          "- Hypervisor Typologies: Type-1 (Bare Metal / ESXi, KVM) vs Type-2 (Hosted / VirtualBox).",
          "- Resource Pooling: vCPU scheduling, NUMA node topology, memory overcommit techniques.",
          "- High Availability (HA) & Disaster Recovery (DR): RTO and RPO metrics."
        ]
      }
    ]
  },

  // 6. BCS-303 Digital Electronics - Unit 1
  {
    subjectCode: 'BCS-303',
    fileName: 'BCS303_Unit1_Boolean_Logic_Simplification_Notes.pdf',
    title: 'Unit 1 Lecture Notes: Number Systems, Boolean Logic & K-Maps',
    author: 'Prof. R. K. Patel (Dept. of CSE)',
    unitNumber: 1,
    resourceType: 'LECTURE_NOTES',
    contentSections: [
      {
        heading: "1. Radix Conversions & Signed Arithmetic",
        points: [
          "- Base Conversions: Binary, Octal, Hexadecimal radix mathematical representations.",
          "- Signed Binary Formats: Sign-magnitude, 1's complement, and 2's complement arithmetic.",
          "- Binary Codes: BCD (8421), Excess-3, Gray Code (unit distance code), ASCII encoding."
        ]
      },
      {
        heading: "2. Boolean Algebra Axioms & Logic Minimization",
        points: [
          "- Postulates: Commutative, Associative, Distributive, Identity, and De Morgan's Laws.",
          "- Canonical Forms: Sum of Products (SOP / minterms) and Product of Sums (POS / maxterms).",
          "- Karnaugh Maps (K-Maps): 2, 3, and 4-variable grouping, prime implicants, and don't care conditions."
        ]
      }
    ]
  },

  // 7. BCS201 Programming in C - Unit 1 & 2
  {
    subjectCode: 'BCS201',
    fileName: 'BCS201_Unit1_C_Language_Syntax_Notes.pdf',
    title: 'Unit 1 & 2 Comprehensive Notes: C Syntax, Control Structures & Loops',
    author: 'Prof. Neha Gupta (Assistant Prof., Dept. of CSE)',
    unitNumber: 1,
    resourceType: 'LECTURE_NOTES',
    contentSections: [
      {
        heading: "1. C Language Fundamentals & Translation Pipeline",
        points: [
          "- Compilation Phases: Preprocessing (#include, #define), Compilation, Assembly, Linking.",
          "- Primitive Data Types: int, char, float, double with size ranges and signedness modifiers.",
          "- Storage Classes: auto, register, static, extern with scope, lifetime, and default linkage."
        ]
      },
      {
        heading: "2. Control Flow, Branching & Loop Optimization",
        points: [
          "- Conditional Branching: if-else ladders, nested decisions, switch-case fallthrough rules.",
          "- Iterative Structures: entry-controlled (for, while) vs exit-controlled (do-while) loops.",
          "- Flow Control: break, continue, return, and disciplined avoidance of unconditional goto."
        ]
      }
    ]
  },

  // 8. BCS201 Programming in C - Cheatsheet
  {
    subjectCode: 'BCS201',
    fileName: 'BCS201_C_Standard_Library_Cheatsheet.pdf',
    title: 'C Language Quick Syntax & Standard Library Cheatsheet',
    author: 'Department of Computer Science & Engineering',
    unitNumber: null,
    resourceType: 'FORMULA_SHEET',
    contentSections: [
      {
        heading: "1. Pointers & Memory Management Cheatsheet",
        points: [
          "- Pointer Operators: & (address-of), * (dereference / value-at-address).",
          "- Dynamic Allocation: malloc(size), calloc(n, size), realloc(ptr, size), free(ptr).",
          "- Function Pointers: Syntax, callbacks, and dispatch tables."
        ]
      },
      {
        heading: "2. Standard I/O and String Functions",
        points: [
          "- String Operations: strlen(), strcpy(), strncpy(), strcat(), strcmp(), strstr().",
          "- File Streams: fopen(\"mode\"), fclose(fp), fprintf(), fscanf(), fgets(), fputs(), fread(), fwrite().",
          "- File Position: fseek(), ftell(), rewind() with SEEK_SET, SEEK_CUR, SEEK_END."
        ]
      }
    ]
  },

  // 9. BAS102 Engineering Mathematics - I - Formula Sheet
  {
    subjectCode: 'BAS102',
    fileName: 'BAS102_Matrices_Calculus_Formula_Sheet.pdf',
    title: 'Comprehensive Formula Sheet: Matrices, Differential & Vector Calculus',
    author: 'Dr. P. K. Mishra (Professor, Dept. of Applied Mathematics)',
    unitNumber: 1,
    resourceType: 'UNIT_SUMMARY',
    contentSections: [
      {
        heading: "1. Matrices & Linear Algebra Formulas",
        points: [
          "- Matrix Rank: Determinantal rank and Echelon row reduction criteria.",
          "- Cayley-Hamilton Theorem: Every square matrix satisfies its own characteristic equation |A - lambda I| = 0.",
          "- Eigenvalues & Eigenvectors: Diagonalization condition (A = P D P^-1)."
        ]
      },
      {
        heading: "2. Differential & Vector Calculus Master Formulas",
        points: [
          "- Leibnitz Theorem for nth derivative of products of two functions u and v.",
          "- Euler's Theorem for Homogeneous Functions: x (dz/dx) + y (dz/dy) = n * z.",
          "- Vector Differential Operators: Gradient (grad f), Divergence (div V), Curl (curl V)."
        ]
      }
    ]
  },

  // 10. MCS-101 Advanced Computer Architecture - Presentation Deck
  {
    subjectCode: 'MCS-101',
    fileName: 'MCS101_ILP_Multicore_Lecture_Slides.pdf',
    title: 'Lecture Slides: Instruction-Level Parallelism, Speculation & Cache Coherence',
    author: 'Dr. A. K. Ganguly (Head of Department, Dept. of CSE)',
    unitNumber: 1,
    resourceType: 'PPT_SLIDES',
    contentSections: [
      {
        heading: "Slide 1: Pipeline Hazards & Dynamic Scheduling",
        points: [
          "- Hazards: Structural, Data (RAW, WAR, WAW), and Control branching hazards.",
          "- Scoreboarding vs Tomasulo's Algorithm: Register renaming and reservation stations.",
          "- Reorder Buffer (ROB): In-order commit with out-of-order execution pipeline."
        ]
      },
      {
        heading: "Slide 2: Multiprocessor Memory Architectures & Coherence",
        points: [
          "- Memory Consistency Models: Sequential consistency, relaxed consistency, release consistency.",
          "- Cache Coherence Protocols: Snooping (MSI, MESI, MOESI) vs Directory-based protocols.",
          "- Interconnection Networks: Crossbar switches, 2D mesh, torus, and hypercube topologies."
        ]
      }
    ]
  }
];

async function seedPhase3Notes() {
  console.log("==================================================================");
  console.log("INVERTIS LEARN - PHASE 3 (FACULTY NOTES & LEARNING RESOURCES SEED)");
  console.log("==================================================================");

  const targetDir = path.join(process.cwd(), 'public/uploads/notes');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    console.log(`Created notes storage directory: ${targetDir}`);
  }

  // 1. Ensure NOTES category exists
  let notesCategory = await prisma.resourceCategory.findUnique({
    where: { code: 'NOTES' }
  });

  if (!notesCategory) {
    notesCategory = await prisma.resourceCategory.create({
      data: {
        code: 'NOTES',
        name: 'Faculty Lecture Notes & Learning Materials',
        description: 'Faculty approved lecture notes, unit summaries, lecture presentations (PPTs), and revision sheets'
      }
    });
    console.log("Created ResourceCategory: NOTES");
  } else {
    console.log("Found existing ResourceCategory: NOTES");
  }

  let seededCount = 0;

  for (const item of NOTES_DATA) {
    // Find subject
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
    const relStoragePath = `uploads/notes/${item.fileName}`;

    // 2. Generate PDF document
    const pdfBuffer = createAcademicNotesPDF({
      subjectCode: subject.code,
      subjectName: subject.name,
      programme: progName,
      resourceTitle: item.title,
      resourceType: item.resourceType,
      unitLabel: item.unitNumber ? `Unit ${item.unitNumber}` : 'Full Syllabus',
      author: item.author,
      contentSections: item.contentSections
    });

    fs.writeFileSync(filePath, pdfBuffer);
    console.log(`  Generated PDF: ${item.fileName} (${pdfBuffer.length} bytes)`);

    // 3. Upsert AcademicResource record in database
    const resourceId = `notes_${subject.code}_${item.fileName.replace('.pdf', '')}`;
    await prisma.academicResource.upsert({
      where: { id: resourceId },
      update: {
        title: item.title,
        originalFileName: item.fileName,
        storedFileName: item.fileName,
        storagePath: relStoragePath,
        fileSizeBytes: pdfBuffer.length,
        authorName: item.author,
        unitNumber: item.unitNumber,
        resourceType: item.resourceType,
        isPublished: true
      },
      create: {
        id: resourceId,
        subjectId: subject.id,
        categoryId: notesCategory.id,
        title: item.title,
        originalFileName: item.fileName,
        storedFileName: item.fileName,
        storagePath: relStoragePath,
        fileSizeBytes: pdfBuffer.length,
        authorName: item.author,
        unitNumber: item.unitNumber,
        resourceType: item.resourceType,
        isPublished: true
      }
    });

    seededCount++;
  }

  console.log(`\nSuccessfully generated and seeded ${seededCount} Faculty Learning Resources!`);
}

seedPhase3Notes()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
