// Complete B.Tech CSE (Cloud Computing) Curriculum Data (Session 2023-2024)
// Sourced directly from official Invertis University syllabus documents

const SEMESTER_1_SUBJECTS = [
  {
    code: "ENG105",
    name: "English",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 2,
    tutorialHours: 1,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To develop comprehensive communication skills in English for engineering undergraduates.",
        "To enhance vocabulary, grammatical competence, and professional writing skills.",
        "To foster critical reading and analysis of literary and technical prose."
      ],
      outcomes: [
        "Demonstrate proficiency in core grammar, tense consistency, and vocabulary usage.",
        "Draft structured professional emails, formal letters, resumes, and technical reports.",
        "Communicate effectively in group discussions, presentations, and interviews."
      ],
      modules: [
        {
          title: "Unit 1: Prose & Poetry",
          topics: "A Cup of Tea by Katherine Mansfield; The Piece of String by Guy De Maupassant; Steve Jobs Commencement Address (2005); Ode to the Skylark by P.B. Shelley; Where the Mind Is Without Fear by Rabindranath Tagore; The Road Not Taken by Robert Frost."
        },
        {
          title: "Unit 2: Grammar & Vocabulary",
          topics: "Tenses and concept of time; Verb types; Active and Passive Voice; Direct and Indirect Speech; Prepositions and Conditionals; Modal Auxiliaries; Conjunctions; Synonyms, Antonyms, and One-word substitutions."
        },
        {
          title: "Unit 3: Writing Skills",
          topics: "Paragraph writing; Essay writing; Formal letters and applications; Technical articles for publications; Resume writing and cover letters."
        },
        {
          title: "Unit 4: Reading Skills",
          topics: "Reading comprehension techniques; Skimming and scanning; Summarizing and note-making; Critical interpretation of technical texts."
        },
        {
          title: "Unit 5: Speaking Skills",
          topics: "Basics of spoken communication; Public speaking and presentation delivery; Welcome and introductory speeches; Vote of thanks; Avoiding Indianisms in professional discourse."
        }
      ],
      textBooks: [
        "Pushp Lata & Sanjay Kumar, 'Communication Skills', Oxford University Press.",
        "Meenakshi Raman & Sangeeta Sharma, 'Technical Communication: Principles and Practice', Oxford University Press."
      ],
      referenceBooks: [
        "M. Ashraf Rizvi, 'Effective Technical Communication', McGraw Hill Education.",
        "Wren & Martin, 'High School English Grammar and Composition', S. Chand & Co."
      ]
    }
  },
  {
    code: "MAT102",
    name: "Engineering Mathematics-I",
    subjectType: "THEORY",
    credits: 4.0,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 0,
    evaluationMarks: "CA: 30, EE: 70, Total: 100",
    syllabusDetails: {
      objectives: [
        "To provide thorough analytical training in differential equations, partial differentiation, and multivariable calculus.",
        "To introduce integral calculus applications including multiple integrals and vector calculus for engineers."
      ],
      outcomes: [
        "Solve first-order and higher-order ordinary and partial differential equations.",
        "Calculate maxima, minima, asymptotes, and curve tracing for functions of several variables.",
        "Compute double and triple integrals and evaluate line, surface, and volume integrals using Gauss and Stokes theorems."
      ],
      modules: [
        {
          title: "Unit 1: Differential Equations",
          topics: "First-order first-degree differential equations; Linear and reducible to linear equations; Exact and integrating factors; Second-order ODE with variable coefficients; Homogeneous equations; Series solutions; First-order PDE (Lagrange form)."
        },
        {
          title: "Unit 2: Differential Calculus",
          topics: "Partial differentiation; Euler's theorem on homogeneous functions; Approximation of errors; Maxima and minima of multivariable functions; Lagrange's multiplier method; Asymptotes and Cartesian/Polar curve tracing."
        },
        {
          title: "Unit 3: Integral Calculus",
          topics: "Area of curves, rectification, surface areas, and volumes of revolution; Double and triple integrals; Change of order of integration; Transformation to polar coordinates; Beta and Gamma functions."
        },
        {
          title: "Unit 4: Matrices",
          topics: "Rank of a matrix; Reduction to normal and echelon forms; Consistency of linear system equations; Eigenvalues and eigenvectors; Cayley-Hamilton theorem; Matrix diagonalization."
        },
        {
          title: "Unit 5: Vector Calculus",
          topics: "Scalar and vector fields; Directional derivatives; Gradient, Divergence, and Curl; Line, surface, and volume integrals; Green's theorem, Gauss Divergence theorem, and Stokes' theorem with engineering applications."
        }
      ],
      textBooks: [
        "B.V. Ramana, 'Higher Engineering Mathematics', Tata McGraw Hill.",
        "Erwin Kreyszig, 'Advanced Engineering Mathematics', 9th Edition, Wiley."
      ],
      referenceBooks: [
        "B.S. Grewal, 'Higher Engineering Mathematics', Khanna Publishers.",
        "Thomas & Finney, 'Calculus and Analytic Geometry', Narosa Publishing House."
      ]
    }
  },
  {
    code: "PHY105",
    name: "Physics for Engineers-I",
    subjectType: "THEORY",
    credits: 4.0,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 0,
    evaluationMarks: "CA: 30, EE: 70, Total: 100",
    syllabusDetails: {
      objectives: [
        "To introduce fundamental wave optics, relativistic mechanics, quantum physics, and laser fundamentals essential for engineering systems."
      ],
      outcomes: [
        "Analyze interference, diffraction, and polarization phenomena in optical devices.",
        "Apply special relativity concepts including length contraction, time dilation, and mass-energy equivalence.",
        "Understand laser physics, semiconductor laser operation, and fiber optic communication principles."
      ],
      modules: [
        {
          title: "Unit 1: Optics & Wave Motion",
          topics: "Interference by division of wave-front and amplitude; Newton's rings; Diffraction: Fresnel and Fraunhofer diffraction; Single slit, double slit, and N-slit diffraction grating; Resolving power; Polarization by reflection and double refraction; Brewster's law; Nicol prism."
        },
        {
          title: "Unit 2: Special Theory of Relativity",
          topics: "Inertial frames; Michelson-Morley experiment; Postulates of special relativity; Lorentz transformations; Length contraction; Time dilation; Addition of velocities; Relativistic mass and mass-energy relation."
        },
        {
          title: "Unit 3: Quantum Mechanics",
          topics: "De Broglie hypothesis; Wave-particle duality; Davisson-Germer experiment; Heisenberg uncertainty principle; Wave function and Born interpretation; Time-dependent and time-independent Schrodinger wave equations; Particle in a 1D box."
        },
        {
          title: "Unit 4: Lasers & Fiber Optics",
          topics: "Spontaneous and stimulated emission; Einstein's coefficients; Population inversion; Ruby laser and He-Ne laser; Semiconductor lasers; Optical fibers: Numerical aperture, acceptance angle, V-number, single-mode and multi-mode fibers, attenuation in fibers."
        },
        {
          title: "Unit 5: Electromagnetism & Modern Physics",
          topics: "Continuity equation; Maxwell's equations in vacuum and dielectric media; Electromagnetic waves; Poynting vector; Superconductivity: Meissner effect, Type-I and Type-II superconductors, BCS theory basics."
        }
      ],
      textBooks: [
        "H.K. Malik & A.K. Singh, 'Engineering Physics', Tata McGraw Hill.",
        "Arthur Beiser, 'Concepts of Modern Physics', McGraw Hill."
      ],
      referenceBooks: [
        "David J. Griffiths, 'Introduction to Electrodynamics', Prentice Hall.",
        "Ghatak & Thyagarajan, 'Optics', Tata McGraw Hill."
      ]
    }
  },
  {
    code: "BEE101",
    name: "Basic Electrical and Electronics",
    subjectType: "THEORY",
    credits: 4.0,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 0,
    evaluationMarks: "CA: 30, EE: 70, Total: 100",
    syllabusDetails: {
      objectives: [
        "To impart fundamental concepts of DC and AC circuit analysis, electrical machines, semiconductor devices, and digital logic gates."
      ],
      outcomes: [
        "Solve complex electrical networks using Kirchhoff's laws and network theorems.",
        "Analyze single-phase and three-phase AC circuits and transformers.",
        "Understand diode characteristics, transistor operation, and basic analog/digital circuits."
      ],
      modules: [
        {
          title: "Unit 1: DC Circuit Analysis",
          topics: "Circuit elements; Kirchhoff's laws (KCL, KVL); Mesh and Nodal analysis; Superposition theorem; Thevenin's theorem; Norton's theorem; Maximum power transfer theorem; Star-Delta transformations."
        },
        {
          title: "Unit 2: AC Circuits",
          topics: "Sinusoidal AC quantities, peak, average, and RMS values; Form factor and peak factor; Phasor representation; Single-phase R-L, R-C, R-L-C series and parallel circuits; Resonance in electrical circuits; Three-phase balanced star and delta connections."
        },
        {
          title: "Unit 3: Transformers & Electrical Machines",
          topics: "Single-phase transformer: Construction, principle of operation, EMF equation, equivalent circuit, losses and efficiency; Introduction to DC motors and 3-phase induction motors: Working principles and characteristics."
        },
        {
          title: "Unit 4: Semiconductor Devices",
          topics: "P-N junction diode: VI characteristics, half-wave, full-wave and bridge rectifiers; Zener diode as voltage regulator; Bipolar Junction Transistor (BJT): CB, CE, CC configurations and DC load line; Field Effect Transistor (FET) basics."
        },
        {
          title: "Unit 5: Digital Electronics Basics",
          topics: "Number systems (Binary, Octal, Hexadecimal); Boolean algebra and De Morgan's theorems; Logic gates (AND, OR, NOT, NAND, NOR, XOR, XNOR); Half-adder and Full-adder circuits; Introduction to Operational Amplifiers (Op-Amp)."
        }
      ],
      textBooks: [
        "D.P. Kothari & I.J. Nagrath, 'Basic Electrical and Electronics Engineering', McGraw Hill.",
        "V.K. Mehta & Rohit Mehta, 'Principles of Electrical Engineering & Electronics', S. Chand."
      ],
      referenceBooks: [
        "Vincent Del Toro, 'Electrical Engineering Fundamentals', Prentice Hall.",
        "Robert Boylestad & Louis Nashelsky, 'Electronic Devices and Circuit Theory', Pearson."
      ]
    }
  },
  {
    code: "BCSI101",
    name: "Problem Solving and Programming in C",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To introduce algorithmic problem solving, procedural programming, and ANSI C language concepts."
      ],
      outcomes: [
        "Design flowcharts and pseudo-code to formulate algorithmic solutions.",
        "Write, compile, and debug structured C programs utilizing arrays, strings, functions, pointers, and structures.",
        "Perform dynamic memory allocation and file handling in C."
      ],
      modules: [
        {
          title: "Unit 1: Introduction to Programming & C Basics",
          topics: "Algorithms, flowcharts, pseudocode; Compilation and execution phases; Structure of a C program; Identifiers, keywords, data types, constants, variables; Operators: Arithmetic, relational, logical, bitwise, assignment, ternary; Operator precedence and type conversion."
        },
        {
          title: "Unit 2: Control Structures",
          topics: "Decision making statements: if, if-else, nested if-else, switch-case; Iteration statements: while, do-while, for loops; Break, continue, goto statements; Loop design patterns and nested loops."
        },
        {
          title: "Unit 3: Arrays & Strings",
          topics: "1D and 2D arrays: Declaration, initialization, memory layout, array traversal; Matrix operations (addition, multiplication, transpose); String handling: String input/output, null terminator, string manipulation library functions (strlen, strcpy, strcat, strcmp), custom string implementations."
        },
        {
          title: "Unit 4: Functions & Pointers",
          topics: "User-defined functions, function prototypes, parameters, call by value vs. call by reference; Recursion and call stack; Pointers: Declaration, dereferencing, pointer arithmetic; Pointers with arrays and strings; Function pointers; Dynamic memory management: malloc, calloc, realloc, free."
        },
        {
          title: "Unit 5: Structures, Unions & File Handling",
          topics: "User-defined types: struct, union, enum, typedef; Nested structures and arrays of structures; Self-referential structures; File operations: File pointers, modes (r, w, a), formatted file I/O (fprintf, fscanf), character/string I/O (fgetc, fputc, fgets, fputs), binary I/O (fread, fwrite)."
        }
      ],
      textBooks: [
        "E. Balagurusamy, 'Programming in ANSI C', 8th Edition, McGraw Hill.",
        "Reema Thareja, 'Programming in C', Oxford University Press."
      ],
      referenceBooks: [
        "Brian W. Kernighan & Dennis M. Ritchie, 'The C Programming Language', Prentice Hall.",
        "Yashavant Kanetkar, 'Let Us C', BPB Publications."
      ]
    }
  },
  {
    code: "IIOT1",
    name: "Fundamentals of IOT Development",
    subjectType: "THEORY",
    credits: 4.0,
    lectureHours: 4,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 30, EE: 70, Total: 100",
    syllabusDetails: {
      objectives: [
        "To introduce IoT architecture, embedded microcontrollers, sensors, actuators, and cloud-connected IoT devices."
      ],
      outcomes: [
        "Explain end-to-end Internet of Things architecture and reference models.",
        "Interface sensors and actuators with Arduino and Raspberry Pi hardware boards.",
        "Implement basic IoT telemetry, data acquisition, and cloud dashboards."
      ],
      modules: [
        {
          title: "Unit 1: Introduction to Internet of Things",
          topics: "Definition, characteristics, physical and logical design of IoT; IoT enabling technologies; IoT levels and deployment templates; Domain-specific IoT applications (Smart Cities, Healthcare, Agriculture, Industrial IoT)."
        },
        {
          title: "Unit 2: IoT Sensors & Actuators",
          topics: "Sensor classification: Temperature, humidity, ultrasonic, PIR, gas, accelerometer; Analog vs. digital sensors; Actuators: Relays, DC motors, servo motors, stepper motors; Signal conditioning and ADC conversion."
        },
        {
          title: "Unit 3: Embedded Prototyping Platforms",
          topics: "Microcontroller architectures; Arduino Uno/Nano: Pinout, IDE, programming in Embedded C; Raspberry Pi: Hardware, OS installation, Python scripting for GPIO interfacing; ESP8266 and ESP32 Wi-Fi microcontrollers."
        },
        {
          title: "Unit 4: IoT Communication Protocols",
          topics: "Network layers in IoT; WPAN protocols: Bluetooth, BLE, ZigBee, 6LoWPAN; Application layer protocols: MQTT, CoAP, HTTP, WebSockets; Gateway architecture and edge compute fundamentals."
        },
        {
          title: "Unit 5: Cloud Integration & IoT Security",
          topics: "Connecting edge devices to IoT Cloud platforms (ThingsSpeak, Blynk, AWS IoT Core); Real-time telemetry visualization; Basic security concerns, device authentication, and encryption in IoT deployments."
        }
      ],
      textBooks: [
        "Arshdeep Bahga & Vijay Madisetti, 'Internet of Things: A Hands-On Approach', Universities Press.",
        "Raj Kamal, 'Internet of Things: Architecture and Design Principles', McGraw Hill."
      ],
      referenceBooks: [
        "David Hanes et al., 'IoT Fundamentals: Networking Technologies, Protocols, and Use Cases for the Internet of Things', Cisco Press."
      ]
    }
  },
  {
    code: "PHY106",
    name: "Physics for Engineers Lab-I",
    subjectType: "PRACTICAL",
    credits: 1.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    evaluationMarks: "CA: 10, EE: 15, Total: 25",
    syllabusDetails: {
      objectives: ["To verify optical and modern physical principles experimentally."],
      outcomes: ["Measure optical parameters using interferometers, spectrometers, and lasers."],
      labExperiments: [
        "To determine the wavelength of sodium light by Newton's Ring experiment.",
        "To determine the wavelength of spectral lines using a diffraction grating.",
        "To determine the specific rotation of cane sugar solution using a polarimeter.",
        "To determine the focal length of a combination of lenses using nodal slide assembly.",
        "To determine the bandgap of a semiconductor using a reverse-biased P-N junction diode.",
        "To determine the wavelength of He-Ne laser beam using diffraction grating.",
        "To determine the numerical aperture and acceptance angle of an optical fiber."
      ]
    }
  },
  {
    code: "BEE102",
    name: "Basic Electrical and Electronics Lab",
    subjectType: "PRACTICAL",
    credits: 1.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    evaluationMarks: "CA: 10, EE: 15, Total: 25",
    syllabusDetails: {
      objectives: ["To verify fundamental electrical network laws and characterize electronic components."],
      outcomes: ["Construct DC circuits, evaluate network theorems, and measure AC parameters."],
      labExperiments: [
        "Verification of Kirchhoff's Current Law (KCL) and Kirchhoff's Voltage Law (KVL).",
        "Verification of Superposition Theorem in DC resistive circuits.",
        "Verification of Thevenin's and Norton's Theorems.",
        "Verification of Maximum Power Transfer Theorem.",
        "Measurement of power and power factor in single-phase R-L-C series circuit.",
        "Open-circuit and short-circuit tests on a single-phase transformer.",
        "V-I characteristics of P-N junction diode and Zener diode.",
        "Input and output characteristics of Bipolar Junction Transistor (BJT) in CE configuration.",
        "Half-wave and full-wave rectifier circuit analysis using oscilloscope."
      ]
    }
  },
  {
    code: "BCSI102",
    name: "Problem Solving and Programming in C Lab",
    subjectType: "PRACTICAL",
    credits: 1.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    evaluationMarks: "CA: 10, EE: 15, Total: 25",
    syllabusDetails: {
      objectives: ["To implement C programs covering procedural problem solving, data structures, and algorithms."],
      outcomes: ["Write, compile, test, and debug C programs for diverse algorithmic tasks."],
      labExperiments: [
        "Write a C program to compute simple/compound interest and temperature conversions.",
        "Write a C program to find the largest of three numbers using nested if-else.",
        "Write a C program to print Fibonacci series, check prime numbers, and compute factorial.",
        "Write a C program to perform matrix addition, multiplication, and transpose.",
        "Write a C program to check palindrome string and count vowels, consonants, and digits.",
        "Write a C program to implement functions with call-by-value and call-by-reference.",
        "Write a C program to implement recursive functions for GCD and Tower of Hanoi.",
        "Write a C program using dynamic memory allocation (malloc, calloc, free) for array processing.",
        "Write a C program to maintain student records using structures and file handling."
      ]
    }
  },
  {
    code: "BME101",
    name: "Workshop Practice",
    subjectType: "PRACTICAL",
    credits: 1.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    evaluationMarks: "CA: 10, EE: 15, Total: 25",
    syllabusDetails: {
      objectives: ["To impart hands-on training in basic mechanical fabrication, carpentry, fitting, and sheet metal works."],
      outcomes: ["Operate workshop tools safely and fabricate joints and sheet metal models."],
      labExperiments: [
        "Carpentry Shop: T-Lap joint and Cross-Lap joint fabrication.",
        "Fitting Shop: Square fitting, V-fitting, filing, and hacksawing.",
        "Sheet Metal Shop: Development and fabrication of rectangular tray and funnel.",
        "Welding Shop: Preparation of Lap and Butt joints using Shielded Metal Arc Welding (SMAW).",
        "Foundry Shop: Preparation of sand mould using single-piece pattern."
      ]
    }
  },
  {
    code: "BCSI103",
    name: "IT Workshop",
    subjectType: "PRACTICAL",
    credits: 1.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    evaluationMarks: "CA: 10, EE: 15, Total: 25",
    syllabusDetails: {
      objectives: ["To train students in PC assembly, OS installation, shell commands, and productive office tools."],
      outcomes: ["Assemble computer hardware, troubleshoot OS, and automate documents and spreadsheets."],
      labExperiments: [
        "Hardware Identification: PC assembly, disassembly, motherboard components, RAM, CPU, GPU, storage.",
        "Operating System Installation: Dual-boot setup with Windows and Linux (Ubuntu).",
        "BIOS/UEFI Configuration: Boot order, virtualization enabling (VT-x/AMD-V), secure boot.",
        "Linux CLI Essentials: Navigation, permissions (chmod/chown), process management, shell scripting.",
        "Productivity Suite: Advanced LaTeX document authoring, formatting formulas, bibliography.",
        "Spreadsheet Automation: Formulas, pivot tables, charting, and statistical functions in MS Excel / Calc.",
        "Network Setup: Configuring LAN, IPv4 addresses, subnets, testing connectivity via ping and traceroute."
      ]
    }
  },
  {
    code: "ENG113",
    name: "Soft Skills and Self Awareness",
    subjectType: "PRACTICAL",
    credits: 1.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    evaluationMarks: "CA: 10, EE: 15, Total: 25",
    syllabusDetails: {
      objectives: ["To cultivate emotional intelligence, interpersonal skills, personal ethics, and self-awareness."],
      outcomes: ["Demonstrate self-confidence, active listening, time management, and ethical decision-making."],
      labExperiments: [
        "Self-Discovery: Johari Window exercise, personal SWOT analysis.",
        "Goal Setting: SMART goals formulation and action planning.",
        "Active Listening & Empathy Exercises: Group dynamics and emotional intelligence role plays.",
        "Time Management Techniques: Pomodoro technique, Eisenhower matrix prioritization.",
        "Stress Management and Mindfulness: Breathing exercises and cognitive reframing.",
        "Personal Grooming & Body Language: Non-verbal communication, posture, handshake, professional etiquette."
      ]
    }
  }
];

module.exports = { SEMESTER_1_SUBJECTS };

