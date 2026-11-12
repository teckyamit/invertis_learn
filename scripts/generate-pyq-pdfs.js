const fs = require('fs');
const path = require('path');

function createSimplePDF({ universityName, examTitle, session, subjectCode, subjectName, programme, semester, maxMarks, time, sections }) {
  // Build PDF text lines
  const lines = [
    { text: universityName, size: 16, bold: true, align: 'center', y: 790 },
    { text: "FACULTY OF ENGINEERING & TECHNOLOGY", size: 12, bold: true, align: 'center', y: 770 },
    { text: examTitle, size: 13, bold: true, align: 'center', y: 750 },
    { text: `Academic Session: ${session}`, size: 11, bold: false, align: 'center', y: 732 },
    { text: "-------------------------------------------------------------------------------------------------------------------", size: 9, bold: false, align: 'center', y: 718 },
    { text: `Programme: ${programme}`, size: 10, bold: true, x: 50, y: 702 },
    { text: `Semester: ${semester}`, size: 10, bold: true, x: 380, y: 702 },
    { text: `Course Code: ${subjectCode}`, size: 10, bold: true, x: 50, y: 686 },
    { text: `Course Title: ${subjectName}`, size: 10, bold: true, x: 380, y: 686 },
    { text: `Time Allowed: ${time}`, size: 10, bold: false, x: 50, y: 670 },
    { text: `Maximum Marks: ${maxMarks}`, size: 10, bold: false, x: 380, y: 670 },
    { text: "-------------------------------------------------------------------------------------------------------------------", size: 9, bold: false, align: 'center', y: 658 },
    { text: "Note: Attempt all sections as per instructions. Assume missing data suitably, if any.", size: 9, italic: true, x: 50, y: 644 },
  ];

  let currentY = 620;

  sections.forEach((sec) => {
    lines.push({ text: sec.heading, size: 11, bold: true, x: 50, y: currentY });
    currentY -= 18;

    sec.questions.forEach((q) => {
      // If question is long, wrap it
      if (q.length > 85) {
        const splitIdx = q.lastIndexOf(' ', 85);
        lines.push({ text: q.substring(0, splitIdx), size: 10, bold: false, x: 50, y: currentY });
        currentY -= 15;
        lines.push({ text: "   " + q.substring(splitIdx + 1), size: 10, bold: false, x: 50, y: currentY });
        currentY -= 18;
      } else {
        lines.push({ text: q, size: 10, bold: false, x: 50, y: currentY });
        currentY -= 18;
      }
    });

    currentY -= 10;
  });

  lines.push({ text: "===================== END OF QUESTION PAPER =====================", size: 9, bold: true, align: 'center', y: Math.max(currentY, 60) });

  // Escape special chars for PDF literal string: ( ) \
  const escapePdfText = (str) => {
    return str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
  };

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

  // Obj 1: Catalog
  addObj("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");

  // Obj 2: Pages
  addObj("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n");

  // Obj 3: Page
  addObj("3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj\n");

  // Obj 4: Regular Font
  addObj("4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n");

  // Obj 5: Bold Font
  addObj("5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n");

  // Obj 6: Stream
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

// Generate past papers for subjects
const outDir = require("./lib/storage-path.cjs").resourcePath('pyq');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. BCS-301 Data Structures End Sem 2022-23
const bcs301_2022 = createSimplePDF({
  universityName: "INVERTIS UNIVERSITY, BAREILLY",
  examTitle: "END-SEMESTER EXAMINATION 2022-23",
  session: "2022-2023",
  subjectCode: "BCS-301",
  subjectName: "Data Structures",
  programme: "B.Tech. (Computer Science & Engineering)",
  semester: "Semester III",
  time: "3 Hours",
  maxMarks: "50",
  sections: [
    {
      heading: "SECTION A (Short Answer Questions - 2 Marks each)",
      questions: [
        "Q1(a). Define Abstract Data Type (ADT) with an appropriate example.",
        "Q1(b). Differentiate between Linear Search and Binary Search time complexity.",
        "Q1(c). Explain the condition for Stack Overflow and Stack Underflow.",
        "Q1(d). What is a Circular Queue? How does it overcome linear queue limitation?",
        "Q1(e). Define Depth First Search (DFS) and Breadth First Search (BFS)."
      ]
    },
    {
      heading: "SECTION B (Analytical Questions - 5 Marks each)",
      questions: [
        "Q2. Write an algorithm to insert and delete a node from a Doubly Linked List.",
        "Q3. Convert the infix expression ((A + B) * C - (D - E)) ^ (F + G) into postfix form.",
        "Q4. Construct an AVL Tree by inserting keys: 21, 26, 30, 9, 4, 14, 28, 18, 15, 10."
      ]
    },
    {
      heading: "SECTION C (Descriptive Questions - 10 Marks each, Attempt Any Two)",
      questions: [
        "Q5. Explain Quick Sort algorithm with partition logic. Analyze its Best, Average, and Worst case time complexity.",
        "Q6. Define Minimum Cost Spanning Tree. Describe Prim's and Kruskal's algorithm with a graph example.",
        "Q7. Write short notes on: (a) Collision resolution in Hashing, (b) Threaded Binary Tree."
      ]
    }
  ]
});
fs.writeFileSync(path.join(outDir, "BCS301_EndSem_2022_23.pdf"), bcs301_2022);
console.log("Created: BCS301_EndSem_2022_23.pdf");

// 2. BCS-301 Data Structures End Sem 2021-22
const bcs301_2021 = createSimplePDF({
  universityName: "INVERTIS UNIVERSITY, BAREILLY",
  examTitle: "END-SEMESTER EXAMINATION 2021-22",
  session: "2021-2022",
  subjectCode: "BCS-301",
  subjectName: "Data Structures",
  programme: "B.Tech. (Computer Science & Engineering)",
  semester: "Semester III",
  time: "3 Hours",
  maxMarks: "50",
  sections: [
    {
      heading: "SECTION A (Attempt All Questions - 2 Marks each)",
      questions: [
        "Q1(a). Explain Asymptotic notations: Big-Oh (O), Omega, and Theta.",
        "Q1(b). What is a sparse matrix? How is it efficiently represented in memory?",
        "Q1(c). Write recursive relation for Towers of Hanoi problem.",
        "Q1(d). Define Complete Binary Tree vs Strictly Binary Tree.",
        "Q1(e). What is the difference between Array and Linked List memory allocation?"
      ]
    },
    {
      heading: "SECTION B (Attempt Any Three - 5 Marks each)",
      questions: [
        "Q2. Explain Heap Sort algorithm and illustrate with array: [45, 12, 85, 32, 89, 39, 69, 44].",
        "Q3. Describe Dequeue and Priority Queue with standard operations and applications.",
        "Q4. Explain Binary Search Tree insertion and deletion algorithms."
      ]
    },
    {
      heading: "SECTION C (Attempt Any Two - 10 Marks each)",
      questions: [
        "Q5. Write complete C functions to implement circular singly linked list traversal and deletion.",
        "Q6. Discuss Dijkstra's algorithm for finding Single Source Shortest Path with an example.",
        "Q7. Describe B-Tree of order m. Explain insertion and node-splitting mechanism."
      ]
    }
  ]
});
fs.writeFileSync(path.join(outDir, "BCS301_EndSem_2021_22.pdf"), bcs301_2021);
console.log("Created: BCS301_EndSem_2021_22.pdf");

// 3. BCS-301 Data Structures Mid-Semester 2023-24
const bcs301_mid2023 = createSimplePDF({
  universityName: "INVERTIS UNIVERSITY, BAREILLY",
  examTitle: "MID-SEMESTER EXAMINATION 2023-24",
  session: "2023-2024",
  subjectCode: "BCS-301",
  subjectName: "Data Structures",
  programme: "B.Tech. (Computer Science & Engineering)",
  semester: "Semester III",
  time: "1.5 Hours",
  maxMarks: "25",
  sections: [
    {
      heading: "SECTION A (Short Questions - 2 Marks each)",
      questions: [
        "Q1(a). Calculate address of element A[3][4] in row-major order with base address 1000.",
        "Q1(b). Write the prefix form of the infix expression: (A + B) * (C / D) - E.",
        "Q1(c). State two applications of Queue in operating systems."
      ]
    },
    {
      heading: "SECTION B (Detailed Questions - 5 Marks each)",
      questions: [
        "Q2. Write an algorithm to reverse a singly linked list without using auxiliary storage.",
        "Q3. Implement two stacks using a single one-dimensional array without overflow."
      ]
    },
    {
      heading: "SECTION C (Comprehensive - 9 Marks)",
      questions: [
        "Q4. Explain Circular Queue implementation using arrays. Write functions for Enqueue and Dequeue."
      ]
    }
  ]
});
fs.writeFileSync(path.join(outDir, "BCS301_MidSem_2023_24.pdf"), bcs301_mid2023);
console.log("Created: BCS301_MidSem_2023_24.pdf");

// 4. BCS-302 IT Infrastructure Management End Sem 2022-23
const bcs302_2022 = createSimplePDF({
  universityName: "INVERTIS UNIVERSITY, BAREILLY",
  examTitle: "END-SEMESTER EXAMINATION 2022-23",
  session: "2022-2023",
  subjectCode: "BCS-302",
  subjectName: "IT Infrastructure Management",
  programme: "B.Tech. (Computer Science & Engineering)",
  semester: "Semester III",
  time: "3 Hours",
  maxMarks: "50",
  sections: [
    {
      heading: "SECTION A (Short Answer - 2 Marks each)",
      questions: [
        "Q1(a). Define IT Infrastructure and list its core components.",
        "Q1(b). What is ITIL? Mention its core lifecycle stages.",
        "Q1(c). Differentiate between Incident Management and Problem Management.",
        "Q1(d). Define Service Level Agreement (SLA) and its significance.",
        "Q1(e). What is Bare Machine Recovery (BMR) in storage management?"
      ]
    },
    {
      heading: "SECTION B (Analytical - 5 Marks each)",
      questions: [
        "Q2. Explain Capacity Management and Availability Management processes in ITIL.",
        "Q3. Discuss backup strategies: Full, Differential, and Incremental backups.",
        "Q4. What is Disaster Recovery (DR)? Explain Recovery Time Objective (RTO) and RPO."
      ]
    },
    {
      heading: "SECTION C (Descriptive - 10 Marks each)",
      questions: [
        "Q5. Explain Computer Forensics process: Identification, Preservation, Analysis, and Presentation.",
        "Q6. Discuss Cyber Crimes and Indian Information Technology (IT) Act 2000 provisions."
      ]
    }
  ]
});
fs.writeFileSync(path.join(outDir, "BCS302_EndSem_2022_23.pdf"), bcs302_2022);
console.log("Created: BCS302_EndSem_2022_23.pdf");

// 5. BCS-303 Digital Electronics End Sem 2022-23
const bcs303_2022 = createSimplePDF({
  universityName: "INVERTIS UNIVERSITY, BAREILLY",
  examTitle: "END-SEMESTER EXAMINATION 2022-23",
  session: "2022-2023",
  subjectCode: "BCS-303",
  subjectName: "Digital Electronics",
  programme: "B.Tech. (Computer Science & Engineering)",
  semester: "Semester III",
  time: "3 Hours",
  maxMarks: "50",
  sections: [
    {
      heading: "SECTION A (Short Questions - 2 Marks each)",
      questions: [
        "Q1(a). State De Morgan's Theorems with Boolean algebraic proofs.",
        "Q1(b). Convert hexadecimal (2F9A)16 into octal and binary equivalents.",
        "Q1(c). Define race-around condition in JK Flip-Flop and how to avoid it.",
        "Q1(d). Distinguish between Combinational and Sequential circuits.",
        "Q1(e). What is a Multiplexer (MUX)? Give its application."
      ]
    },
    {
      heading: "SECTION B (5 Marks each)",
      questions: [
        "Q2. Minimize the Boolean function using K-Map: F(A,B,C,D) = Sum m(0,1,2,5,7,8,9,10,13,15).",
        "Q3. Design a 4-bit synchronous binary up/down counter using T flip-flops.",
        "Q4. Implement a Full Adder using two 4:1 Multiplexers."
      ]
    },
    {
      heading: "SECTION C (10 Marks each)",
      questions: [
        "Q5. Differentiate between RAM, ROM, PLA, and PAL with block diagrams and programming tables.",
        "Q6. Explain Master-Slave JK Flip Flop with circuit diagram, truth table, and timing waveforms."
      ]
    }
  ]
});
fs.writeFileSync(path.join(outDir, "BCS303_EndSem_2022_23.pdf"), bcs303_2022);
console.log("Created: BCS303_EndSem_2022_23.pdf");

// 6. MCS-101 Advanced Computer Architecture End Sem 2022-23 (M.Tech)
const mcs101_2022 = createSimplePDF({
  universityName: "INVERTIS UNIVERSITY, BAREILLY",
  examTitle: "END-SEMESTER EXAMINATION 2022-23",
  session: "2022-2023",
  subjectCode: "MCS-101",
  subjectName: "Advanced Computer Architecture",
  programme: "M.Tech. (Computer Science & Engineering)",
  semester: "Semester I",
  time: "3 Hours",
  maxMarks: "70",
  sections: [
    {
      heading: "SECTION A (Short Answers - 3.5 Marks each)",
      questions: [
        "Q1(a). State Amdahl's Law and calculate speedup with 80% parallelized code on 8 processors.",
        "Q1(b). Explain Flynn's taxonomy classification of computer architectures.",
        "Q1(c). Differentiate between static and dynamic pipeline processors.",
        "Q1(d). Explain the cache coherence problem in multiprocessor systems."
      ]
    },
    {
      heading: "SECTION B (7 Marks each)",
      questions: [
        "Q2. Describe Tomasulo's algorithm for dynamic instruction scheduling with reservation stations.",
        "Q3. Explain branch prediction strategies: 1-bit, 2-bit saturating counters, and correlating branch predictors."
      ]
    },
    {
      heading: "SECTION C (14 Marks each)",
      questions: [
        "Q4. Discuss snooping vs directory-based cache coherence protocols (MESI / MOESI) in detail.",
        "Q5. Explain Vector Processing and SIMD architecture with Matrix Multiplication application."
      ]
    }
  ]
});
fs.writeFileSync(path.join(outDir, "MCS101_EndSem_2022_23.pdf"), mcs101_2022);
console.log("Created: MCS101_EndSem_2022_23.pdf");

console.log("All generated practice examination paper PDFs generated successfully!");

