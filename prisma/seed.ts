import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Invertis Learn database with comprehensive authentic syllabus details...");

  // 1. Department
  const cseDept = await prisma.department.upsert({
    where: { code: "CSE" },
    update: {},
    create: {
      code: "CSE",
      name: "Department of Computer Science & Engineering",
      isActive: true,
    },
  });

  // 2. Default Administrator
  await prisma.user.upsert({
    where: { email: "admin@invertis.org" },
    update: {},
    create: {
      email: "admin@invertis.org",
      passwordHash: "$2a$12$7kP2yL.yQkFfV9v6N.XvEOfy1l5vN9n6r9C9h3r7V4V7d3v2X8g.W",
      fullName: "Academic Dean / Super Administrator",
      role: "SUPER_ADMIN",
      departmentId: cseDept.id,
    },
  });

  // 3. Resource Categories
  const syllabusCategory = await prisma.resourceCategory.upsert({
    where: { code: "SYLLABUS" },
    update: {},
    create: {
      code: "SYLLABUS",
      name: "Official Syllabus",
      description: "University approved course curriculum and syllabus document",
    },
  });

  await prisma.resourceCategory.upsert({
    where: { code: "PYQ" },
    update: {},
    create: {
      code: "PYQ",
      name: "Previous Year Question Paper",
      description: "End-semester examination papers from past sessions",
    },
  });

  await prisma.resourceCategory.upsert({
    where: { code: "NOTES" },
    update: {},
    create: {
      code: "NOTES",
      name: "Faculty Lecture Notes",
      description: "Faculty approved lecture notes, presentations and study material",
    },
  });

  await prisma.resourceCategory.upsert({
    where: { code: "LAB_MANUAL" },
    update: {},
    create: {
      code: "LAB_MANUAL",
      name: "Laboratory Manual",
      description: "Practical experiment manuals, instructions and viva material",
    },
  });

  // 4. Programmes
  const btech = await prisma.programme.upsert({
    where: { code: "BTECH-CSE" },
    update: {},
    create: {
      departmentId: cseDept.id,
      code: "BTECH-CSE",
      name: "Bachelor of Technology in Computer Science & Engineering",
      degreeLevel: "UNDERGRADUATE",
      durationYears: 4,
    },
  });

  const mtech = await prisma.programme.upsert({
    where: { code: "MTECH-CSE" },
    update: {},
    create: {
      departmentId: cseDept.id,
      code: "MTECH-CSE",
      name: "Master of Technology in Computer Science & Engineering",
      degreeLevel: "POSTGRADUATE",
      durationYears: 2,
    },
  });

  // 5. Curriculum Versions (w.e.f. Session 2023-2024)
  const btechCurriculum = await prisma.curriculumVersion.upsert({
    where: {
      programmeId_versionYear: {
        programmeId: btech.id,
        versionYear: "2023-2024",
      },
    },
    update: {},
    create: {
      programmeId: btech.id,
      versionYear: "2023-2024",
      regulationName: "Session 2023-24 Regulation",
      isCurrent: true,
      description: "Official Scheme of Instruction & Syllabi with effect from academic session 2023-24",
    },
  });

  const mtechCurriculum = await prisma.curriculumVersion.upsert({
    where: {
      programmeId_versionYear: {
        programmeId: mtech.id,
        versionYear: "2023-2024",
      },
    },
    update: {},
    create: {
      programmeId: mtech.id,
      versionYear: "2023-2024",
      regulationName: "Session 2023-24 Regulation",
      isCurrent: true,
      description: "Official Scheme of Instruction & Syllabi with effect from academic session 2023-24",
    },
  });

  // 6. Semesters
  const semesterNames = [
    "Semester I", "Semester II", "Semester III", "Semester IV",
    "Semester V", "Semester VI", "Semester VII", "Semester VIII"
  ];

  const btechSemesters: Record<number, any> = {};
  for (let i = 1; i <= 8; i++) {
    btechSemesters[i] = await prisma.semester.upsert({
      where: {
        curriculumVersionId_semesterNumber: {
          curriculumVersionId: btechCurriculum.id,
          semesterNumber: i,
        },
      },
      update: {},
      create: {
        curriculumVersionId: btechCurriculum.id,
        semesterNumber: i,
        title: semesterNames[i - 1],
      },
    });
  }

  const mtechSemesters: Record<number, any> = {};
  for (let i = 1; i <= 4; i++) {
    mtechSemesters[i] = await prisma.semester.upsert({
      where: {
        curriculumVersionId_semesterNumber: {
          curriculumVersionId: mtechCurriculum.id,
          semesterNumber: i,
        },
      },
      update: {},
      create: {
        curriculumVersionId: mtechCurriculum.id,
        semesterNumber: i,
        title: semesterNames[i - 1],
      },
    });
  }

  // 7. Rich Authentic Subject Definitions with Full Modules, COs, and Textbooks
  const btechSubjectsData = [
    // --- SEMESTER 1 ---
    {
      sem: 1,
      code: "BAS101",
      name: "Physics",
      l: 3, t: 1, p: 0, c: 4,
      type: "THEORY",
      group: null,
      evalMarks: "CA: 30, EE: 70, Total: 100",
      details: JSON.stringify({
        modules: [
          {
            title: "MODULE - I: Relativistic Mechanics & Interference",
            topics: "Frame of reference, Galilean transformation, Inertial and Non-inertial frames, Postulates of special theory of relativity, Michelson-Morley experiment, Lorentz transformation of space and time, Length contraction, Time dilation, Addition of velocities, Variation of mass with velocity, Equivalence of mass and energy. Theory of interference of light, Conditions for sustained interference, Fresnel's Biprism experiment, Interference in thin films."
          },
          {
            title: "MODULE - II: Diffraction & Polarization",
            topics: "Single, Double & N-slit Diffraction, Diffraction grating, Grating spectra, Rayleigh's criterion and resolving power of grating. Phenomena of double refraction, Doubly refracting crystals, Quarter wave plate & Half wave plate, Nicol prism, Specific rotation and Polarimeters."
          },
          {
            title: "MODULE - III: Laser, Holography & Fiber Optics",
            topics: "Spontaneous and stimulated emission, Einstein's coefficients, Ruby and He-Ne lasers. Basic Principle of Holography. Types of optical fibers, Acceptance angle and cone, Numerical aperture, Attenuation and Signal loss."
          }
        ],
        textBooks: [
          "Aurthur Beiser, 'Concepts of Modern Physics' - McGrawHill",
          "Robert Resnick, 'Introduction to Special Theory of Relativity' - Wiley",
          "Ajoy Ghatak, 'Optics' - TMH"
        ]
      })
    },
    {
      sem: 1,
      code: "BCS101",
      name: "Introduction to Computers",
      l: 3, t: 0, p: 0, c: 3,
      type: "THEORY",
      group: null,
      evalMarks: "CA: 25, EE: 50, Total: 75",
      details: JSON.stringify({
        modules: [
          {
            title: "Module 1: Computer Fundamentals & Organization",
            topics: "Data, Information, Computer Definition, Features, Applications and Generations. Basic Computer Organization: I/O units, Storage Units. Hardware & Software classification."
          },
          {
            title: "Module 2: Number Systems & Operating Systems",
            topics: "Number Systems: Positional & Non-positional, Conversions. Computer Codes: BCD, EBCDIC, ASCII. Operating System: Definition, Logical Architecture, Multiprogramming, Multitasking, Multithreading."
          },
          {
            title: "Module 3: Algorithms, Internet & Productivity Tools",
            topics: "Algorithms: Criteria & Notation. Internet: WWW, Browsers. MS-Office Components: Word, Excel, PowerPoint, Access. Translators: Compilers, Interpreters, Assemblers."
          }
        ],
        textBooks: ["Rajaraman V. - Fundamentals of Computers, PHI"]
      })
    },
    {
      sem: 1,
      code: "BAS102",
      name: "Mathematics-I",
      l: 3, t: 1, p: 0, c: 4,
      type: "THEORY",
      group: null,
      evalMarks: "CA: 30, EE: 70, Total: 100",
      details: JSON.stringify({
        modules: [
          {
            title: "MODULE - I: Matrices",
            topics: "Elementary row and column transformations, Rank of matrix, Linear dependence, Consistency of linear system of equations, Characteristic equation, Cayley-Hamilton theorem, Eigen values and eigen vectors, Diagonalisation, Complex and unitary matrices."
          },
          {
            title: "MODULE - II: Differential Calculus",
            topics: "Leibnitz theorem, Partial differentiation, Euler's theorem, Curve tracing, Change of variables, Expansion of functions. Jacobians, Approximation of errors, Extrema of functions of several variables, Lagrange method of multipliers."
          },
          {
            title: "MODULE - III: Fourier Series & Vector Calculus",
            topics: "Periodic functions, Trigonometric series, Fourier series of period 2pi, Even and odd functions, Half range series. Vector differentiation, Gradient, Divergence and Curl."
          }
        ],
        textBooks: ["H.K. Dass, Higher Engineering Mathematics, S. Chand", "B.S. Grewal, Engineering Mathematics, Khanna Publishers"]
      })
    },
    {
      sem: 1,
      code: "BEE101",
      name: "Basic Electrical Engineering",
      l: 3, t: 0, p: 0, c: 3,
      type: "THEORY",
      group: null,
      evalMarks: "CA: 25, EE: 50, Total: 75"
    },
    {
      sem: 1,
      code: "BEC101",
      name: "Emerging Domain in Electronics Engineering",
      l: 3, t: 0, p: 0, c: 3,
      type: "THEORY",
      group: null,
      evalMarks: "CA: 25, EE: 50, Total: 75"
    },
    {
      sem: 1,
      code: "BCE101",
      name: "Engineering Graphics and Design",
      l: 1, t: 0, p: 0, c: 1,
      type: "THEORY",
      group: null,
      evalMarks: "CA: 10, EE: 15, Total: 25"
    },
    {
      sem: 1,
      code: "IIOT1",
      name: "Fundamentals of IoT Development",
      l: 4, t: 0, p: 0, c: 4,
      type: "THEORY",
      group: null,
      evalMarks: "CA: 30, EE: 70, Total: 100"
    },
    {
      sem: 1,
      code: "BAS151",
      name: "Physics Lab",
      l: 0, t: 0, p: 2, c: 1,
      type: "PRACTICAL",
      group: null,
      evalMarks: "CA: 10, EE: 15, Total: 25"
    },
    {
      sem: 1,
      code: "BEE151",
      name: "Basic Electrical Engineering Lab",
      l: 0, t: 0, p: 4, c: 2,
      type: "PRACTICAL",
      group: null,
      evalMarks: "CA: 20, EE: 30, Total: 50"
    },
    {
      sem: 1,
      code: "BCE151",
      name: "Engineering Graphics and Design Lab",
      l: 0, t: 0, p: 4, c: 2,
      type: "PRACTICAL",
      group: null,
      evalMarks: "CA: 20, EE: 30, Total: 50"
    },
    {
      sem: 1,
      code: "BCS151",
      name: "Introduction to Computers Lab",
      l: 0, t: 0, p: 4, c: 2,
      type: "PRACTICAL",
      group: null,
      evalMarks: "CA: 20, EE: 30, Total: 50"
    },

    // --- SEMESTER 2 ---
    {
      sem: 2,
      code: "BCS201",
      name: "Programming For Problem Solving",
      l: 3, t: 0, p: 0, c: 3,
      type: "THEORY",
      group: null,
      evalMarks: "CA: 25, EE: 50, Total: 75",
      details: JSON.stringify({
        modules: [
          {
            title: "MODULE-1: C Language Overview & Data Types",
            topics: "Programming language and environment, Compiling and linking, Format of C program. Data types, Storage classes, Operators and Expressions, Precedence and Associativity."
          },
          {
            title: "MODULE-2: Decision Making, Loops & Modular Programming",
            topics: "Branching: if, switch, ternary operator. Loops: while, do-while, for. Modular programming: Functions, Scope rules, Separate compilation, Call by value vs Call by reference."
          },
          {
            title: "MODULE-3: Arrays, Structures & Pointers",
            topics: "Arrays and Strings, Multidimensional arrays. Structures and Unions. Pointers: Void and Null pointers, Pointer arithmetic, Pointers to structures, Dynamic memory allocation, File handling."
          }
        ],
        textBooks: [
          "Byron Gottfried, Schaum's Outline of Programming with C, McGraw-Hill",
          "E. Balaguruswamy, Programming in ANSI C, Tata McGraw-Hill"
        ]
      })
    },
    {
      sem: 2,
      code: "BAS201",
      name: "Chemistry",
      l: 3, t: 1, p: 0, c: 4,
      type: "THEORY",
      group: null,
      evalMarks: "CA: 30, EE: 70, Total: 100"
    },
    {
      sem: 2,
      code: "BAS202",
      name: "Mathematics-II",
      l: 3, t: 1, p: 0, c: 4,
      type: "THEORY",
      group: null,
      evalMarks: "CA: 30, EE: 70, Total: 100"
    },
    {
      sem: 2,
      code: "HAS201",
      name: "English",
      l: 2, t: 0, p: 0, c: 2,
      type: "THEORY",
      group: null,
      evalMarks: "CA: 15, EE: 35, Total: 50"
    },
    {
      sem: 2,
      code: "BME202",
      name: "Basic Civil & Mechanical Engineering",
      l: 3, t: 0, p: 0, c: 3,
      type: "THEORY",
      group: null,
      evalMarks: "CA: 25, EE: 50, Total: 75"
    },
    {
      sem: 2,
      code: "IIOT2",
      name: "Industrial Communication Protocols & Connectivity",
      l: 4, t: 0, p: 0, c: 4,
      type: "THEORY",
      group: null,
      evalMarks: "CA: 30, EE: 70, Total: 100"
    },
    {
      sem: 2,
      code: "BCS-251",
      name: "Programming for Problem Solving Lab",
      l: 0, t: 0, p: 4, c: 2,
      type: "PRACTICAL",
      group: null,
      evalMarks: "CA: 20, EE: 30, Total: 50"
    },
    {
      sem: 2,
      code: "BME251",
      name: "Workshop/Manufacturing Practice Lab",
      l: 0, t: 0, p: 4, c: 2,
      type: "PRACTICAL",
      group: null,
      evalMarks: "CA: 20, EE: 30, Total: 50"
    },
    {
      sem: 2,
      code: "HAS-251",
      name: "English Lab",
      l: 0, t: 0, p: 2, c: 1,
      type: "PRACTICAL",
      group: null,
      evalMarks: "CA: 10, EE: 15, Total: 25"
    },
    {
      sem: 2,
      code: "BAS-251",
      name: "Chemistry Lab",
      l: 0, t: 0, p: 2, c: 1,
      type: "PRACTICAL",
      group: null,
      evalMarks: "CA: 10, EE: 15, Total: 25"
    },

    // --- SEMESTER 3 (Core Verification Semester) ---
    {
      sem: 3,
      code: "BCS-301",
      name: "Data Structures",
      l: 2, t: 1, p: 0, c: 3,
      type: "THEORY",
      group: null,
      evalMarks: "CA: 25, EE: 50, Total: 75",
      details: JSON.stringify({
        objectives: [
          "CO1: Introduce the concept of data structures through ADT including List, Stack, Queues",
          "CO2: To understand concepts about searching and sorting techniques.",
          "CO3: To understand basic concepts about stacks, queues, lists, trees and graphs.",
          "CO4: Able to analyze algorithms and determine their time complexity.",
          "CO5: To enable students to write algorithms for solving problems with the help of fundamental data structures."
        ],
        outcomes: [
          "CO1: For a given algorithm, student will be able to analyze algorithms to determine time and computation complexity and justify correctness.",
          "CO2: For a given Search problem (Linear Search and Binary Search), student will be able to implement it.",
          "CO3: For a given problem of Stacks, Queues and linked list, student will be able to implement it and analyze complexity.",
          "CO4: Able to analyze algorithms and determine their time complexity.",
          "CO5: Student will be able to implement Graph search and traversal algorithms and determine time and computation complexity."
        ],
        modules: [
          {
            title: "MODULE-I: Introduction, Arrays, Searching & Linked Lists",
            topics: "Basic Terminology, Elementary Data Organization, Algorithm, Time and space complexity of algorithms. Asymptotic notations, Abstract data types. Arrays: Representation of arrays, insertion and deletion operations, Single and Multidimensional Arrays, Sparse Matrices and their representations. Searching: Sequential search, Binary Search, Comparison and Analysis. Linked List: Singly linked lists: Representation in memory, Algorithms of several operations: Traversing, Searching, Insertion into, Deletion from linked list; Linked representation of Stack and Queue, Header nodes, Doubly linked list: operations on it and algorithmic analysis; Circular Linked Lists: all operations their algorithms and the complexity analysis. Garbage collection and memory compaction."
          },
          {
            title: "MODULE-II: Stacks, Queues & Graphs",
            topics: "Stacks: Primitive Stack operations: Push & Pop, Array and Linked Implementation of Stack. Application of stack: Prefix and Postfix Expressions conversion, Evaluation of postfix expression, Iteration and Recursion: Principles of recursion, Problem solving using recursion with examples such as binary search, Fibonacci numbers, and towers of Hanoi. Queues: Operations on Queue: Create, Add, Delete, Full and Empty, Circular queues, Array and linked implementation of queues, Dequeue and Priority Queue. Graphs: Terminology used with Graph, Data Structure for Graph Representations: Adjacency Matrices, Adjacency List. Graph Traversal: Depth First Search and Breadth First Search, Connected Component, Spanning Trees, Minimum Cost Spanning Trees: Prims and Kruskal algorithm."
          },
          {
            title: "MODULE-III: Trees, Sorting & Hashing",
            topics: "Trees: Basic terminology used with Binary Trees, Binary Tree Representation, Extended Binary Trees, Tree Traversal algorithms: Inorder, Preorder and Postorder, Constructing Binary Tree from given Tree Traversal, Binary Search Tree: Operation of Insertion, Deletion, Searching in Binary Search tree. Threaded Binary trees, Traversing Threaded Binary trees. Concept & Basic Operations of AVL Tree. B Tree: definitions, algorithms and analysis. Sorting: Bubble sort, Insertion Sort, Selection Sort, Quick Sort, Two Way Merge Sort, Heap Sort. Performance and Comparison among all the methods. Hashing: Hash Function, Collision Resolution Strategies."
          }
        ],
        textBooks: [
          "Aaron M. Tenenbaum, Y. Langsam, M. J. Augenstein, 'Data Structures Using C and C++', PHI",
          "Horowitz and Sahani, 'Fundamentals of Data Structures', Galgotia Publication",
          "Jean Paul Tremblay and Paul G. Sorenson, 'An Introduction to Data Structures with applications', McGraw Hill",
          "R. Kruse et al., 'Data Structures and Program Design in C', Pearson Education"
        ],
        referenceBooks: [
          "Lipschutz, 'Data Structures', Schaum's Outline Series, TMH",
          "G A V Pai, 'Data Structures and Algorithms', TMH"
        ]
      })
    },
    {
      sem: 3,
      code: "BCS-302",
      name: "IT Infrastructure Management",
      l: 2, t: 1, p: 0, c: 3,
      type: "THEORY",
      group: null,
      evalMarks: "CA: 25, EE: 50, Total: 75",
      details: JSON.stringify({
        objectives: [
          "CO1: To understand underlying principles of IT infrastructure and management services.",
          "CO2: To understand IT systems, service delivery and service support process for providing quality service.",
          "CO3: To understand the basics of storage management.",
          "CO4: To study policies for security management and mitigate security related risks in the Organization.",
          "CO5: To understand IT and cyber ethics and study cyber forensics law and cyber crimes."
        ],
        outcomes: [
          "CO1: Describe basic IT infrastructure, storage management, security measures, cyber ethics, computer forensics, cyber laws and electronic commerce.",
          "CO2: Summarize the design requirements for IT systems, service delivery and service support process.",
          "CO3: Relate various service delivery and service support processes for development of a quality product.",
          "CO4: Focus on various storage and security schemes to provide availability and safety of IT systems.",
          "CO5: Test data collected at any cyber crime scene using computer forensic schemes."
        ],
        modules: [
          {
            title: "MODULE-I: Introduction, IT Infrastructure & Service Delivery Process",
            topics: "Information Technology, Computer Hardware, Software, Network and Internet, Computing Resources, Network topologies. IT Infrastructure: Design Issues, Requirements, IT System Management Process, ITIL. Service Delivery Process: Service Level Management, Financial Management, Capacity Management, Availability Management."
          },
          {
            title: "MODULE-II: Service Support Process & Storage Management",
            topics: "Service Support Process: Configuration Management, Incident Management, Problem Management, Change Management, Release Management. Storage Management: Backup & Storage, Archive & Retrieve, Disaster Recovery, Space Management, Bare Machine Recovery, Data Retention."
          },
          {
            title: "MODULE-III: Security Management, IT Ethics & Emerging Trends",
            topics: "Security Management: Physical Security, Identity Management, Access Management, Intrusion Detection. IT Ethics: Cyber Ethics, Intellectual Property, Privacy and Law, Computer Forensics, Cyber Crimes. Emerging Trends in IT: E-Commerce, EDI, Bluetooth, Infrared."
          }
        ],
        textBooks: ["Phalguni Gupta, Surya Prakash, Umarani Jayaraman, 'IT Infrastructure and its Management', TMH"]
      })
    },
    {
      sem: 3,
      code: "BCS-303",
      name: "Digital Electronics",
      l: 2, t: 1, p: 0, c: 3,
      type: "THEORY",
      group: null,
      evalMarks: "CA: 25, EE: 50, Total: 75",
      details: JSON.stringify({
        objectives: [
          "CO1: Understand the concepts of various components.",
          "CO2: Understand concepts that underpin the disciplines of analog and digital electronic logic circuits.",
          "CO3: Understand various Number systems and Boolean algebra, and design using logic gates.",
          "CO4: Understand Design and implementation of combinational circuits.",
          "CO5: Understand Design and develop sequential circuits."
        ],
        outcomes: [
          "CO1: Understand concepts of components to design stable analog circuits.",
          "CO2: Represent numbers and perform arithmetic operations.",
          "CO3: Minimize Boolean expressions using Boolean algebra and design using logic gates.",
          "CO4: Analyze and design combinational circuits.",
          "CO5: Design and develop sequential circuits."
        ],
        modules: [
          {
            title: "MODULE-I: Digital Systems & Gate-Level Minimization",
            topics: "Signed binary numbers, binary codes, cyclic codes, error detecting and correcting codes, Hamming codes. Floating point representation. Gate-level minimization: K-Map up to 5 variables, don't care conditions, POS simplification, NAND and NOR implementation, Quine-McCluskey method."
          },
          {
            title: "MODULE-II: Combinational & Synchronous Sequential Logic",
            topics: "Combinational circuits: Adders, Subtractors, Multipliers, Magnitude Comparators, Decoders, Encoders, Multiplexers. Synchronous Sequential logic: Latches, Flip-Flops (SR, JK, T, D), clocked sequential circuit analysis, State reduction, Shift registers, Ripple and Synchronous counters."
          },
          {
            title: "MODULE-III: Memory, Programmable Logic & RTL Design",
            topics: "Memory and programmable logic: RAM, ROM, PLA, PAL. Design at the Register Transfer Level: ASMs, Design with multiplexers. Asynchronous sequential logic: Analysis procedure, Circuits with latches, Hazards."
          }
        ],
        textBooks: ["M. Morris Mano and M. D. Ciletti, 'Digital Design', 4th Edition, Pearson Education"],
        referenceBooks: ["JP Hayes, 'Introduction to Digital Logic Design', PHI", "Franklin P. Prosser, 'The Art of Digital Design', PHI"]
      })
    },
    {
      sem: 3,
      code: "BCS-304",
      name: "Python",
      l: 1, t: 0, p: 0, c: 1,
      type: "THEORY",
      group: null,
      evalMarks: "CA: 10, EE: 15, Total: 25",
      details: JSON.stringify({
        objectives: [
          "CO1: Describe core syntax and semantics of Python language.",
          "CO2: Discover the need for working with strings and functions.",
          "CO3: Illustrate structuring data using lists, dictionaries, tuples and sets.",
          "CO4: Infer Object-oriented Programming concepts in Python.",
          "CO5: Discuss concept of functions."
        ],
        modules: [
          {
            title: "MODULE-I: Python Syntax, Variables & Control Flow",
            topics: "Identifiers, Keywords, Statements, Expressions, Data Types, Indentation, Dynamic Typing. Control Flow: if-elif-else, while and for loops, break, continue, exception handling with try-except, *args and **kwargs."
          },
          {
            title: "MODULE-II: Functions, Strings & Modules",
            topics: "Built-In Functions, Commonly Used Modules, Function Definition, Return Statements, Scope of Variables. Strings: Indexing, Slicing, Methods, Formatting."
          },
          {
            title: "MODULE-III: Data Structures & OOP in Python",
            topics: "Lists, Dictionaries, Tuples, Sets, List Comprehensions. Object-Oriented Programming: Classes and Objects, Constructor Method (__init__), Class Attributes, Encapsulation, Inheritance, Polymorphism."
          }
        ],
        textBooks: ["Gowrishankar S, Veena A, 'Introduction to Python Programming', CRC Press, 2018"]
      })
    },
    {
      sem: 3,
      code: "HAS-303",
      name: "Industrial Psychology",
      l: 2, t: 0, p: 0, c: 2,
      type: "THEORY",
      group: null,
      evalMarks: "CA: 15, EE: 35, Total: 50"
    },
    {
      sem: 3,
      code: "BAS-301",
      name: "Mathematics-III",
      l: 3, t: 1, p: 0, c: 4,
      type: "THEORY",
      group: null,
      evalMarks: "CA: 30, EE: 70, Total: 100"
    },
    {
      sem: 3,
      code: "IIOT3",
      name: "Introduction to Data Analytics",
      l: 4, t: 0, p: 0, c: 4,
      type: "THEORY",
      group: null,
      evalMarks: "CA: 30, EE: 70, Total: 100"
    },
    {
      sem: 3,
      code: "BCS-351",
      name: "Data Structures Lab",
      l: 0, t: 0, p: 4, c: 2,
      type: "PRACTICAL",
      group: null,
      evalMarks: "CA: 20, EE: 30, Total: 50",
      details: JSON.stringify({
        labExperiments: [
          "1. Implementation of Linear Search",
          "2. Implementation of Binary Search",
          "3. Implementation of Largest and second largest in array",
          "4. Implementation of Bubble Sort",
          "5. Implementation of Selection Sort",
          "6. Implementation of Insertion Sort",
          "7. Implementation of transpose of sparse matrix",
          "8. Implementation of Single Linked List",
          "9. Implementation of Double Linked List",
          "10. Implementation of Circular Linked List",
          "11. Implementation of Stack Using Single Linked List",
          "12. Implementation of Stack Using Array",
          "13. Implementation of Circular Queue Using Array",
          "14. Implementation of Queue Using Linked List",
          "15. Implementation of Tower of Hanoi",
          "16. Implementation of Recursive Binary search",
          "17. Implementation of Merge sort",
          "18. Implementation of Quick Sort",
          "19. Implementation of Heap sort",
          "20. Implementation of Conversion of Infix Expression to Postfix Expression",
          "21. Implementation of Postfix Expression Evaluation"
        ]
      })
    },
    {
      sem: 3,
      code: "BCS-352",
      name: "IT Infrastructure Management Lab",
      l: 0, t: 0, p: 4, c: 2,
      type: "PRACTICAL",
      group: null,
      evalMarks: "CA: 20, EE: 30, Total: 50",
      details: JSON.stringify({
        labExperiments: [
          "1. History and applications of Linux",
          "2. Study the various variants of Linux (Linux Mint, Kali, Ubuntu, Fedora, etc.)",
          "3. Creation of Login on server machine and steps to logon through client Machine",
          "4. Installation of virtual machine on system (VMware)",
          "5. Installing various operating systems on virtual machine",
          "6. Basic commands of Linux",
          "7. Creation of files and merging of files using cat command",
          "8. Vi Editor basics",
          "9. Create a text file containing records of students in text form line wise, save this file and edit its copy",
          "10. Understanding the 'diff' command",
          "11. Use 'diff' command to generate a patch for the original file",
          "12. Use the 'patch' command to patch the original file to make it similar to the edited copy"
        ]
      })
    },
    {
      sem: 3,
      code: "BCS-353",
      name: "Digital Electronics Lab",
      l: 0, t: 0, p: 4, c: 2,
      type: "PRACTICAL",
      group: null,
      evalMarks: "CA: 20, EE: 30, Total: 50"
    },
    {
      sem: 3,
      code: "BCS-354",
      name: "Python Lab",
      l: 0, t: 0, p: 4, c: 2,
      type: "PRACTICAL",
      group: null,
      evalMarks: "CA: 20, EE: 30, Total: 50"
    },

    // --- SEMESTER 4 ---
    { sem: 4, code: "HAS-402", name: "Industrial Sociology", l: 2, t: 0, p: 0, c: 2, type: "THEORY", group: null, evalMarks: "CA: 15, EE: 35, Total: 50" },
    { sem: 4, code: "BCS-401", name: "Computer Organization & Architecture", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: null, evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 4, code: "BMC-001", name: "Environmental Science", l: 0, t: 0, p: 0, c: 0, type: "MANDATORY", group: null, evalMarks: "Non-credit Mandatory" },
    { sem: 4, code: "BCS-402", name: "Design and Analysis of Algorithms", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: null, evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 4, code: "BCS-403", name: "Operating Systems", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: null, evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 4, code: "BCS-404", name: "Software Engineering", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: null, evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 4, code: "IIOT4", name: "Machine Learning", l: 4, t: 0, p: 0, c: 4, type: "THEORY", group: null, evalMarks: "CA: 30, EE: 70, Total: 100" },
    { sem: 4, code: "BCS-451", name: "Computer Organization & Architecture Lab", l: 0, t: 0, p: 4, c: 2, type: "PRACTICAL", group: null, evalMarks: "CA: 20, EE: 30, Total: 50" },
    { sem: 4, code: "BCS-452", name: "Design and Analysis of Algorithms Lab", l: 0, t: 0, p: 4, c: 2, type: "PRACTICAL", group: null, evalMarks: "CA: 20, EE: 30, Total: 50" },
    { sem: 4, code: "BCS-453", name: "Operating System Lab", l: 0, t: 0, p: 4, c: 2, type: "PRACTICAL", group: null, evalMarks: "CA: 20, EE: 30, Total: 50" },

    // --- SEMESTER 5 ---
    { sem: 5, code: "BCS-501", name: "Formal Language and Automata Theory", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: null, evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 5, code: "BCS-502", name: "Data Base Management System", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: null, evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 5, code: "BCS-503", name: "Java Programming", l: 2, t: 0, p: 0, c: 2, type: "THEORY", group: null, evalMarks: "CA: 15, EE: 35, Total: 50" },
    { sem: 5, code: "HAS-501", name: "Professional Law and Ethics", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: null, evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 5, code: "IIOT5", name: "Deep Learning", l: 4, t: 0, p: 0, c: 4, type: "THEORY", group: null, evalMarks: "CA: 30, EE: 70, Total: 100" },
    { sem: 5, code: "BCS-051", name: "Principles of Programming Language", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-I", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 5, code: "BCS-052", name: "Fuzzy Logic", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-I", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 5, code: "BCS-053", name: "Multimedia Systems", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-I", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 5, code: "BCS-054", name: "Soft Computing", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-I", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 5, code: "BCS-055", name: "Discrete Structures", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-I", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 5, code: "BMC-003", name: "Constitution of India", l: 0, t: 0, p: 0, c: 0, type: "MANDATORY", group: null, evalMarks: "Non-credit" },
    { sem: 5, code: "BCS-552", name: "DBMS Lab", l: 0, t: 0, p: 4, c: 2, type: "PRACTICAL", group: null, evalMarks: "CA: 15, EE: 35, Total: 50" },
    { sem: 5, code: "BCS-553", name: "Java Programming Lab", l: 0, t: 0, p: 4, c: 2, type: "PRACTICAL", group: null, evalMarks: "CA: 15, EE: 35, Total: 50" },

    // --- SEMESTER 6 ---
    { sem: 6, code: "BCS-601", name: "Computer Networks", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: null, evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 6, code: "BCS-602", name: "Compiler Design", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: null, evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 6, code: "IIOT6", name: "Advanced Artificial Intelligence", l: 4, t: 0, p: 0, c: 4, type: "THEORY", group: null, evalMarks: "CA: 30, EE: 70, Total: 100" },
    { sem: 6, code: "BCS-061", name: "Software Testing", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-II", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 6, code: "BCS-062", name: "Graph Theory", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-II", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 6, code: "BCS-063", name: "System Programming", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-II", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 6, code: "BCS-064", name: "PHP", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-II", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 6, code: "BCS-065", name: "Linux Administration", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-II", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 6, code: "BCS-066", name: "Software Project Management", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-III", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 6, code: "BCS-067", name: "Pattern Recognition", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-III", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 6, code: "BCS-068", name: "Parallel Algorithms", l: 3, t: 1, p: 0, c: 4, type: "THEORY", group: "Elective-III", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 6, code: "BCS-069", name: "Internet Technology", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-III", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 6, code: "BCS-070", name: "Introduction to IoT", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-III", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 6, code: "BOE-601", name: "Total Quality Management", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Open Elective-I", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 6, code: "BOE-602", name: "Human Computer Interaction", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Open Elective-I", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 6, code: "BOE-603", name: "Entrepreneurship Development", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Open Elective-I", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 6, code: "BOE-604", name: "Non-Conventional Energy Resources", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Open Elective-I", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 6, code: "BOE-605", name: "Operational Research", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Open Elective-I", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 6, code: "BCS-651", name: "Computer Networks Lab", l: 0, t: 0, p: 4, c: 2, type: "PRACTICAL", group: null, evalMarks: "CA: 15, EE: 35, Total: 50" },
    { sem: 6, code: "BCS-652", name: "Compiler Lab", l: 0, t: 0, p: 4, c: 2, type: "PRACTICAL", group: null, evalMarks: "CA: 15, EE: 35, Total: 50" },
    { sem: 6, code: "BCS-655", name: "Project-I", l: 0, t: 0, p: 6, c: 3, type: "PROJECT", group: null, evalMarks: "CA: 25, EE: 50, Total: 75" },

    // --- SEMESTER 7 ---
    { sem: 7, code: "BCS-071", name: "Embedded and Real Time Systems", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-IV", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 7, code: "BCS-072", name: "Data Compression", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-IV", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 7, code: "BCS-073", name: "Neural Networks", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-IV", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 7, code: "BCS-074", name: "Android Operating System", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-IV", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 7, code: "BCS-075", name: "Client Server Computing", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-IV", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 7, code: "BCS-076", name: "Distributed Database", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-V", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 7, code: "BCS-077", name: "Software Quality Management", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-V", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 7, code: "BCS-078", name: "Simulation and Modeling", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-V", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 7, code: "BCS-079", name: "Unix and Shell Programming", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-V", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 7, code: "BCS-080", name: "Digital Image Processing", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-V", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 7, code: "BOE-701", name: "Soft Skills and Interpersonal Communication", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Open Elective-II", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 7, code: "BOE-702", name: "Cyber Law and Ethics", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Open Elective-II", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 7, code: "BOE-703", name: "Human Resource Development and Organizational Behavior", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Open Elective-II", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 7, code: "BOE-704", name: "Product Development", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Open Elective-II", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 7, code: "BOE-705", name: "Queuing Theory and Modelling", l: 2, t: 1, p: 0, c: 3, type: "THEORY", group: "Open Elective-II", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 7, code: "BCS-753", name: "Project-II", l: 0, t: 0, p: 12, c: 6, type: "PROJECT", group: null, evalMarks: "CA: 50, EE: 100, Total: 150" },
    { sem: 7, code: "BCS-754", name: "Industrial Training Viva", l: 0, t: 0, p: 2, c: 1, type: "SEMINAR", group: null, evalMarks: "CA: 25, EE: 0, Total: 25" },

    // --- SEMESTER 8 ---
    { sem: 8, code: "BCS-081", name: "Computational Geometry", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-VI", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 8, code: "BCS-082", name: "Computational Complexity", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-VI", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 8, code: "BCS-083", name: "IT in Forensics Science", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-VI", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 8, code: "BCS-084", name: "Advanced Computer Network", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-VI", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 8, code: "BCS-085", name: "Big Data Analysis", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-VI", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 8, code: "BCS-086", name: "Advanced Computer Architecture", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-VII", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 8, code: "BCS-087", name: "Artificial Intelligence and Expert System", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-VII", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 8, code: "BCS-088", name: "Data Warehouse and Mining", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-VII", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 8, code: "BCS-089", name: "Distributed System", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-VII", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 8, code: "BCS-090", name: "IT Workshop (Sci Lab/ MATLAB)", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-VII", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 8, code: "BCS-091", name: "Cryptography and Network Security", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-VIII", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 8, code: "BCS-092", name: ".NET Framework", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-VIII", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 8, code: "BCS-093", name: "Mobile Computing", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-VIII", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 8, code: "BCS-094", name: "Machine Learning", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-VIII", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 8, code: "BCS-095", name: "Speech and Natural Language Processing", l: 3, t: 0, p: 0, c: 3, type: "THEORY", group: "Elective-VIII", evalMarks: "CA: 25, EE: 50, Total: 75" },
    { sem: 8, code: "BCS-854", name: "Project-III", l: 0, t: 0, p: 12, c: 6, type: "PROJECT", group: null, evalMarks: "CA: 50, EE: 100, Total: 150" },
  ];

  const btechPdfMap: Record<number, { file: string; size: number; title: string }> = {
    1: { file: "BTech_Year1_Common_Syllabus_2023-24.pdf", size: 907970, title: "Official B.Tech 1st Year Syllabus (2023-24)" },
    2: { file: "BTech_Year1_Common_Syllabus_2023-24.pdf", size: 907970, title: "Official B.Tech 1st Year Syllabus (2023-24)" },
    3: { file: "BTech_CSE_Year2_Syllabus_2023-24.pdf", size: 824078, title: "Official B.Tech CSE 2nd Year Syllabus (2023-24)" },
    4: { file: "BTech_CSE_Year2_Syllabus_2023-24.pdf", size: 824078, title: "Official B.Tech CSE 2nd Year Syllabus (2023-24)" },
    5: { file: "BTech_CSE_Year3_Syllabus_2023-24.pdf", size: 1258281, title: "Official B.Tech CSE 3rd Year Syllabus (2023-24)" },
    6: { file: "BTech_CSE_Year3_Syllabus_2023-24.pdf", size: 1258281, title: "Official B.Tech CSE 3rd Year Syllabus (2023-24)" },
    7: { file: "BTech_CSE_Year4_Syllabus_2023-24.pdf", size: 1040566, title: "Official B.Tech CSE 4th Year Syllabus (2023-24)" },
    8: { file: "BTech_CSE_Year4_Syllabus_2023-24.pdf", size: 1040566, title: "Official B.Tech CSE 4th Year Syllabus (2023-24)" },
  };

  for (const s of btechSubjectsData) {
    const semester = btechSemesters[s.sem];
    const subjectRecord = await prisma.subject.upsert({
      where: {
        semesterId_code: {
          semesterId: semester.id,
          code: s.code,
        },
      },
      update: {
        name: s.name,
        lectureHours: s.l,
        tutorialHours: s.t,
        practicalHours: s.p,
        credits: s.c,
        subjectType: s.type,
        electiveGroup: s.group,
        evaluationMarks: s.evalMarks || null,
        syllabusDetails: s.details || null,
      },
      create: {
        semesterId: semester.id,
        code: s.code,
        name: s.name,
        lectureHours: s.l,
        tutorialHours: s.t,
        practicalHours: s.p,
        credits: s.c,
        subjectType: s.type,
        electiveGroup: s.group,
        evaluationMarks: s.evalMarks || null,
        syllabusDetails: s.details || null,
      },
    });

    const pdfInfo = btechPdfMap[s.sem];
    if (pdfInfo) {
      await prisma.academicResource.upsert({
        where: {
          subjectId_categoryId: {
            subjectId: subjectRecord.id,
            categoryId: syllabusCategory.id,
          },
        },
        update: {
          title: `${pdfInfo.title} - ${s.code}`,
          originalFileName: pdfInfo.file,
          storedFileName: pdfInfo.file,
          storagePath: `uploads/syllabus/${pdfInfo.file}`,
          fileSizeBytes: pdfInfo.size,
          isPublished: true,
        },
        create: {
          subjectId: subjectRecord.id,
          categoryId: syllabusCategory.id,
          title: `${pdfInfo.title} - ${s.code}`,
          originalFileName: pdfInfo.file,
          storedFileName: pdfInfo.file,
          storagePath: `uploads/syllabus/${pdfInfo.file}`,
          fileSizeBytes: pdfInfo.size,
          isPublished: true,
        },
      });
    }
  }

  // 8. M.Tech Subjects
  const mtechSubjectsData = [
    // Sem 1
    { sem: 1, code: "MCS-101", name: "Advanced Computer Architecture", l: 3, t: 1, p: 0, c: 4, type: "THEORY", group: null, evalMarks: "Sessional: 30, E-Sem: 70, Total: 100" },
    { sem: 1, code: "MCS-102", name: "Foundation of Computer Science", l: 3, t: 1, p: 0, c: 4, type: "THEORY", group: null, evalMarks: "Sessional: 30, E-Sem: 70, Total: 100" },
    { sem: 1, code: "MCS-103", name: "Advanced Computer Networks", l: 3, t: 1, p: 0, c: 4, type: "THEORY", group: null, evalMarks: "Sessional: 30, E-Sem: 70, Total: 100" },
    { sem: 1, code: "MCS-104", name: "Distributed Systems", l: 3, t: 1, p: 0, c: 4, type: "THEORY", group: null, evalMarks: "Sessional: 30, E-Sem: 70, Total: 100" },
    { sem: 1, code: "MCS-105", name: "Cloud Computing", l: 3, t: 1, p: 0, c: 4, type: "THEORY", group: null, evalMarks: "Sessional: 30, E-Sem: 70, Total: 100" },
    { sem: 1, code: "MCS-151", name: "Colloquium & Research Review Paper-I", l: 0, t: 2, p: 0, c: 2, type: "SEMINAR", group: null, evalMarks: "Sessional: 50, Total: 50" },

    // Sem 2
    { sem: 2, code: "MCS-201", name: "Advanced Database Systems", l: 3, t: 1, p: 0, c: 4, type: "THEORY", group: null, evalMarks: "Sessional: 30, E-Sem: 70, Total: 100" },
    { sem: 2, code: "MCS-202", name: "Parallel Computing", l: 3, t: 1, p: 0, c: 4, type: "THEORY", group: null, evalMarks: "Sessional: 30, E-Sem: 70, Total: 100" },
    { sem: 2, code: "MCS-203", name: "Mobile Computing", l: 3, t: 1, p: 0, c: 4, type: "THEORY", group: null, evalMarks: "Sessional: 30, E-Sem: 70, Total: 100" },
    { sem: 2, code: "MCS-204", name: "Object Oriented Modeling", l: 3, t: 1, p: 0, c: 4, type: "THEORY", group: null, evalMarks: "Sessional: 30, E-Sem: 70, Total: 100" },
    { sem: 2, code: "MCS-211", name: "Advanced Software Engineering", l: 3, t: 1, p: 0, c: 4, type: "THEORY", group: "Elective-I", evalMarks: "Sessional: 30, E-Sem: 70, Total: 100" },
    { sem: 2, code: "MCS-212", name: "Wireless Sensor Networks", l: 3, t: 1, p: 0, c: 4, type: "THEORY", group: "Elective-I", evalMarks: "Sessional: 30, E-Sem: 70, Total: 100" },
    { sem: 2, code: "MCS-213", name: "Network Security & Cryptography", l: 3, t: 1, p: 0, c: 4, type: "THEORY", group: "Elective-I", evalMarks: "Sessional: 30, E-Sem: 70, Total: 100" },
    { sem: 2, code: "MCS-214", name: "Machine Learning", l: 3, t: 1, p: 0, c: 4, type: "THEORY", group: "Elective-I", evalMarks: "Sessional: 30, E-Sem: 70, Total: 100" },
    { sem: 2, code: "MCS-215", name: "Multimedia Systems", l: 3, t: 1, p: 0, c: 4, type: "THEORY", group: "Elective-I", evalMarks: "Sessional: 30, E-Sem: 70, Total: 100" },
    { sem: 2, code: "MCS-251", name: "Colloquium & Research Review Paper-II", l: 0, t: 2, p: 0, c: 2, type: "SEMINAR", group: null, evalMarks: "Sessional: 50, Total: 50" },

    // Sem 3
    { sem: 3, code: "MCS-321", name: "Software Project Management", l: 3, t: 1, p: 0, c: 4, type: "THEORY", group: "Elective-II", evalMarks: "Sessional: 30, E-Sem: 70, Total: 100" },
    { sem: 3, code: "MCS-322", name: "Design and Analysis of Algorithms", l: 3, t: 1, p: 0, c: 4, type: "THEORY", group: "Elective-II", evalMarks: "Sessional: 30, E-Sem: 70, Total: 100" },
    { sem: 3, code: "MCS-323", name: "Intellectual Property Rights", l: 3, t: 1, p: 0, c: 4, type: "THEORY", group: "Elective-II", evalMarks: "Sessional: 30, E-Sem: 70, Total: 100" },
    { sem: 3, code: "MCS-324", name: "Unix Network Programming", l: 3, t: 1, p: 0, c: 4, type: "THEORY", group: "Elective-II", evalMarks: "Sessional: 30, E-Sem: 70, Total: 100" },
    { sem: 3, code: "MCS-325", name: "Compiler Techniques", l: 3, t: 1, p: 0, c: 4, type: "THEORY", group: "Elective-II", evalMarks: "Sessional: 30, E-Sem: 70, Total: 100" },
    { sem: 3, code: "MCS-331", name: "Real Time Systems", l: 3, t: 1, p: 0, c: 4, type: "THEORY", group: "Elective-III", evalMarks: "Sessional: 30, E-Sem: 70, Total: 100" },
    { sem: 3, code: "MCS-332", name: "Networking Protocols", l: 3, t: 1, p: 0, c: 4, type: "THEORY", group: "Elective-III", evalMarks: "Sessional: 30, E-Sem: 70, Total: 100" },
    { sem: 3, code: "MCS-333", name: "Emerging Database Technologies", l: 3, t: 1, p: 0, c: 4, type: "THEORY", group: "Elective-III", evalMarks: "Sessional: 30, E-Sem: 70, Total: 100" },
    { sem: 3, code: "MCS-334", name: "Data Warehousing & Mining", l: 3, t: 1, p: 0, c: 4, type: "THEORY", group: "Elective-III", evalMarks: "Sessional: 30, E-Sem: 70, Total: 100" },
    { sem: 3, code: "MCS351", name: "Colloquium & Research Review Paper-III", l: 0, t: 2, p: 0, c: 2, type: "SEMINAR", group: null, evalMarks: "Sessional: 50, Total: 50" },
    { sem: 3, code: "MCS393", name: "Preliminary Thesis", l: 0, t: 8, p: 0, c: 8, type: "PROJECT", group: null, evalMarks: "Sessional: 200, Total: 200" },

    // Sem 4
    { sem: 4, code: "MCS-394", name: "Thesis", l: 0, t: 16, p: 0, c: 16, type: "PROJECT", group: null, evalMarks: "Sessional: 100, E-Sem: 300, Total: 400" },
  ];

  const mtechPdfInfo = {
    file: "MTech_CSE_All_Years_Syllabus_2023-24.pdf",
    size: 1281797,
    title: "Official M.Tech CSE Syllabus (2023-24)",
  };

  for (const s of mtechSubjectsData) {
    const semester = mtechSemesters[s.sem];
    const subjectRecord = await prisma.subject.upsert({
      where: {
        semesterId_code: {
          semesterId: semester.id,
          code: s.code,
        },
      },
      update: {
        name: s.name,
        lectureHours: s.l,
        tutorialHours: s.t,
        practicalHours: s.p,
        credits: s.c,
        subjectType: s.type,
        electiveGroup: s.group,
        evaluationMarks: s.evalMarks || null,
      },
      create: {
        semesterId: semester.id,
        code: s.code,
        name: s.name,
        lectureHours: s.l,
        tutorialHours: s.t,
        practicalHours: s.p,
        credits: s.c,
        subjectType: s.type,
        electiveGroup: s.group,
        evaluationMarks: s.evalMarks || null,
      },
    });

    await prisma.academicResource.upsert({
      where: {
        subjectId_categoryId: {
          subjectId: subjectRecord.id,
          categoryId: syllabusCategory.id,
        },
      },
      update: {
        title: `${mtechPdfInfo.title} - ${s.code}`,
        originalFileName: mtechPdfInfo.file,
        storedFileName: mtechPdfInfo.file,
        storagePath: `uploads/syllabus/${mtechPdfInfo.file}`,
        fileSizeBytes: mtechPdfInfo.size,
        isPublished: true,
      },
      create: {
        subjectId: subjectRecord.id,
        categoryId: syllabusCategory.id,
        title: `${mtechPdfInfo.title} - ${s.code}`,
        originalFileName: mtechPdfInfo.file,
        storedFileName: mtechPdfInfo.file,
        storagePath: `uploads/syllabus/${mtechPdfInfo.file}`,
        fileSizeBytes: mtechPdfInfo.size,
        isPublished: true,
      },
    });
  }

  console.log("Database update complete with detailed course curriculum!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
