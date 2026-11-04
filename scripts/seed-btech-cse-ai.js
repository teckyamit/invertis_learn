const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

const subjectsData = [
  // ========================== SEMESTER 1 ==========================
  {
    semesterNumber: 1,
    code: 'ENG 105',
    storageCode: 'ENG105',
    name: 'English Communication',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 2,
    tutorialHours: 1,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Prose & Poetry', topics: ['A Cup of Tea by Katherine Mansfield', 'The Piece of String by Guy De Maupassant', 'Text of Steve Jobs Commencement address - 2005', 'Ode to the skylark by P B Shelley', 'Where the Mind Is Without Fear by Rabindranath Tagore', 'The Road Not Taken by Robert Frost'] },
      { unitNumber: 2, title: 'Grammar & Vocabulary', topics: ['Tenses and the concept of time', 'Verb Types', 'Active and Passive Voice', 'Narration', 'Prepositions', 'Conditionals', 'Modal Auxiliaries', 'Conjunctions', 'One-word substitutions', 'Synonyms and Antonyms'] },
      { unitNumber: 3, title: 'Writing Skills', topics: ['Writing Paragraph', 'Essay Writing', 'Writing Articles for Newspapers & Magazines', 'Writing Applications', 'Resume Writing'] },
      { unitNumber: 4, title: 'Reading Skills', topics: ['Reading Comprehension', 'Summarizing and Note making'] },
      { unitNumber: 5, title: 'Speaking Skills', topics: ['Conversations - Introduction, Purpose, Features', 'Delivering Speeches - Welcome, Introductory, Vote of Thanks, Farewell Speech', 'Indianism'] }
    ],
    textbooks: [
      'Communication Skills, Pushp Lata & Sanjay Kumar, Oxford Higher Education/Oxford University Press.',
      'Technical Communication; Principles and Practice, Meenakshi Raman & Sangita Sharma, Oxford University Press.',
      'Effective Technical Communication, M Ashraf Rizvi, Tata McGraw Hill.'
    ]
  },
  {
    semesterNumber: 1,
    code: 'BCSAI 101',
    storageCode: 'BCSAI101',
    name: 'Engineering Mathematics',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Differential Equations', topics: ['Differential equations of first order and first degree', 'Linear differential equations', 'Reducible to linear form', 'Exact Form', 'Reducible to Exact Form', 'Second order ordinary differential equations with variable coefficients', 'Homogeneous form', 'Exact form', 'Series Solutions with Variable Coefficients', 'Partial Differential Equations of First Order: Lagrange Form, Standard Forms'] },
      { unitNumber: 2, title: 'Differential Calculus', topics: ['Partial Differentiation', 'Eulers Theorem on Homogeneous Functions', 'Approximate Calculations', 'Maxima and Minima of two and more independent variables', 'Lagranges Method of Multipliers', 'Asymptotes', 'Curve Tracing (Cartesian and Standard Polar Curves)'] },
      { unitNumber: 3, title: 'Integral Calculus', topics: ['Area of Curves', 'Rectification', 'Surface and Volume of Solids of Revolution', 'Double and Triple Integrals', 'Double Integral by changing into polar form', 'Area and Volume by Double Integration', 'Change of Order of Integration', 'Beta Function and Gamma Function'] },
      { unitNumber: 4, title: 'Matrices', topics: ['Rank of a matrix by reducing to normal forms', 'Consistency and redundancy of systems of simultaneous linear equations and its solution', 'Eigen values and Eigen vectors', 'Cayley-Hamilton theorem (without proof)', 'Diagonalization of matrix'] },
      { unitNumber: 5, title: 'Vector Calculus', topics: ['Scalar and vector fields', 'Differentiation and Integration of vector functions', 'Directional derivatives', 'Gradient, Divergence and Curl', 'Line, Surface and Volume Integrals', 'Greens theorem in a plane', 'Gausss and Stokes theorem and their applications'] }
    ],
    textbooks: [
      'Higher Engineering Mathematics, B.V. Ramana, Tata McGraw Hill.',
      'Advanced Engineering Mathematics, Erwin Kreyszig, Wiley 9th Edition.',
      'Calculus and Analytical Geometry, Thomas and Finney, Narosa Publishing House.'
    ]
  },
  {
    semesterNumber: 1,
    code: 'BCSAI 102',
    storageCode: 'BCSAI102',
    name: 'Elements of Computing System',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Register Transfer and Micro-operation', topics: ['Register Transfer Language', 'Register Transfer', 'Bus and Memory Transfer: Three state bus buffers', 'Arithmetic Micro-operations: Binary Adder, Subtractor, Incrementor, Logic Micro-operations'] },
      { unitNumber: 2, title: 'Basic Computer Organization and Control Unit', topics: ['Instruction Codes, Computer Registers, Common bus system', 'Computer Instructions, Instruction Cycle: Fetch and Decode', 'Control Memory, Address Sequencing, Design of Control Unit', 'Central Processing Unit: Register Organization, Stack Organization, Instruction Formats, Addressing Modes'] },
      { unitNumber: 3, title: 'Computer Arithmetic', topics: ['Addition and Subtraction', 'Multiplication Algorithms (Booth algorithm)', 'Division Algorithms', 'Input - Output Organization: Peripheral devices, Input - Output interface', 'Multiprocessors: Characteristics of multi-processors'] },
      { unitNumber: 4, title: 'Modes of Data Transfer and Memory Organization', topics: ['Priority Interrupt, Direct Memory Access', 'Memory Hierarchy, Main Memory, Auxiliary Memory, Associative Memory, Cache Memory, Virtual Memory'] },
      { unitNumber: 5, title: 'Information Storage & Data Protection (RAID)', topics: ['Data Center Environment: Application, Host (Computer), Connectivity, Storage, Direct-Attached Storage', 'Data Protection (RAID): RAID Implementation Methods, RAID Array Components, RAID Levels (RAID 0, 1, 5), RAID Impact on Disk Performance'] }
    ],
    textbooks: [
      'Computer System Architecture by Morris Mano, PHI.',
      'Computer Organization and Architecture by William Stallings, PHI.',
      'Information Storage and Management by Somasundaram Gnanasundaram, Alok Shrivastava.'
    ]
  },
  {
    semesterNumber: 1,
    code: 'BEE 101',
    storageCode: 'BEE101',
    name: 'Introduction to Electrical and Electronics Engineering',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Basic Electrical Quantities & DC Networks', topics: ['Charge, current, voltage, resistance, power, energy', 'Difference between AC and DC', 'Ohms law, Kirchhoffs laws, Node Voltage and Mesh Current Analysis', 'Star-delta transformation'] },
      { unitNumber: 2, title: 'Network Theorems & Transformers', topics: ['Thevenin Theorem, Norton Theorem, Superposition Theorem', 'Faradays Law of Electromagnetic Induction', 'Single-Phase Transformer Construction, EMF Equation, Transformation Ratio'] },
      { unitNumber: 3, title: 'AC Fundamentals', topics: ['Alternating sinusoidal quantities, RMS and Average values, Form factor', 'RL, RC & RLC Series-Parallel Circuits', 'Impedance, Reactance, Power and Power Factor'] },
      { unitNumber: 4, title: 'Review of Semiconductors & Physics', topics: ['Semiconductors, intrinsic and extrinsic semiconductors', 'Fermi-level, carrier concentration, drift, diffusion, Hall effect'] },
      { unitNumber: 5, title: 'Junction Diodes & Bipolar Transistors', topics: ['Forward and reverse biasing, V-I characteristics, Half wave rectifier, Full wave rectifier, Zener diode', 'BJT structure, CB and CE configurations, Biasing techniques'] }
    ],
    textbooks: [
      'Integrated Electronics Analog and Digital Circuits & Systems, J. Millman & C.C. Halkias, McGraw Hill.',
      'Electronic Devices and Integrated Circuits, B. P. Singh & Rekha Singh, Pearson.',
      'Basic Electrical Engineering, V.N. Mittal & A. Mittal, TMH.'
    ]
  },
  {
    semesterNumber: 1,
    code: 'BCSAI 103',
    storageCode: 'BCSAI103',
    name: 'Programming in C',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Introduction to C Programming', topics: ['Steps in Programming, Procedural vs Modular Programming', 'Alphabets, Keywords, Data Types, Constants, Variables, Comments'] },
      { unitNumber: 2, title: 'Instructions and Control Flow', topics: ['Arithmetic, Relational, Logical operators', 'Decision Control: if, if-else, nested if-else, switch', 'Loops: for, while, do-while'] },
      { unitNumber: 3, title: 'Functions & Arrays', topics: ['Function declaration, definition, parameter passing', 'Call by value, Call by reference, Recursion', '1D and 2D Arrays, Passing arrays to functions'] },
      { unitNumber: 4, title: 'Pointers & Strings', topics: ['Pointer variables, pointer arithmetic, pointers and arrays', 'Strings, String I/O, String manipulation functions'] },
      { unitNumber: 5, title: 'Structures, Unions & File I/O', topics: ['Declaring structures, unions, storage classes', 'File handling: fopen, fclose, fscanf, fprintf, command line arguments'] }
    ],
    textbooks: [
      'The C Programming Language, Brian W. Kernighan, Dennis M. Ritchie, Prentice-Hall.',
      'C Programming: A Modern Approach, K. N. King, Prentice-Hall.',
      'Let Us C, Yashwant Kanetkar, BPB Publications.'
    ]
  },
  {
    semesterNumber: 1,
    code: 'IIOT1',
    storageCode: 'IIOT1',
    name: 'Introduction to IOT Foundation',
    subjectType: 'THEORY',
    credits: 4.0,
    lectureHours: 4,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 30,
    eeMarks: 70,
    totalMarks: 100,
    units: [
      { unitNumber: 1, title: 'IoT Architecture & Basics', topics: ['Evolution of IoT, Basic Components, Architecture, Sensors and Actuators, Communication Protocols'] },
      { unitNumber: 2, title: 'Microcontrollers & Hardware', topics: ['Arduino, Raspberry Pi, ESP8266/ESP32, GPIO programming, Analog vs Digital Sensors'] },
      { unitNumber: 3, title: 'Connectivity & Cloud', topics: ['Wi-Fi, Bluetooth, Zigbee, MQTT, HTTP REST, Cloud data ingestion'] }
    ],
    textbooks: ['Internet of Things: A Hands-On Approach, Arshdeep Bahga & Vijay Madisetti.']
  },
  {
    semesterNumber: 1,
    code: 'BCSAI 104',
    storageCode: 'BCSAI104',
    name: 'Computing System Lab',
    subjectType: 'PRACTICAL',
    credits: 2.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    caMarks: 15,
    eeMarks: 35,
    totalMarks: 50,
    experiments: [
      { expNumber: 1, title: 'Given a PC, name its various components and list their functions' },
      { expNumber: 2, title: 'Identification of various parts of a computer and peripherals' },
      { expNumber: 3, title: 'DOS Basic Commands' },
      { expNumber: 4, title: 'Exercises on entering text and data (Typing Practice)' },
      { expNumber: 5, title: 'Installation of Windows Operating System using pen-drive, CD & Virtual Machine' },
      { expNumber: 6, title: 'Configuring Directly Attached Disks for Basic and Dynamic Disks' },
      { expNumber: 7, title: 'Creating and configuring disk partitions and volumes in Windows/Linux System' },
      { expNumber: 8, title: 'Creating and Configuring RAID 0, 1 and RAID5 in Windows Server 2012 R2' },
      { expNumber: 9, title: 'Configuring Network Share using Windows Server 2012 R2' },
      { expNumber: 10, title: 'Configuring File Server in Windows Server 2012 R2' },
      { expNumber: 11, title: 'Configuring NFS in Linux Server' },
      { expNumber: 12, title: 'Configuring iSCSI in Windows Server 2012 R2' },
      { expNumber: 13, title: 'Configuring FCOE in Windows Server 2012 R2' },
      { expNumber: 14, title: 'Creating System Backup and Restoring in Windows Server and Linux System' },
      { expNumber: 15, title: 'Creating and Restoring Snapshot for Virtual Machines in Hyper-V' }
    ]
  },
  {
    semesterNumber: 1,
    code: 'BEE 102',
    storageCode: 'BEE102',
    name: 'Basic Electrical and Electronics Engineering Lab',
    subjectType: 'PRACTICAL',
    credits: 2.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    caMarks: 15,
    eeMarks: 35,
    totalMarks: 50,
    experiments: [
      { expNumber: 1, title: 'To verify Ohms Law' },
      { expNumber: 2, title: 'Verification of Kirchhoffs Law applied to DC circuits (Parallel and Series combination)' },
      { expNumber: 3, title: 'Construct RLC series circuit and measure impedance, XL, XC, and phase angle' },
      { expNumber: 4, title: 'House wiring including earthing for 1-phase energy meter, MCB, fan, tube light, socket' },
      { expNumber: 5, title: 'Study construction and basic working of ceiling fan with auto-transformer speed control' },
      { expNumber: 6, title: 'Study single-phase transformer construction, measure turns ratio' },
      { expNumber: 7, title: 'Study circuits and working of Fluorescent, Sodium Vapour, Mercury vapour, and Halogen lamps' },
      { expNumber: 8, title: 'Study analog multimeters, CRO, function generator, DC power supplies' },
      { expNumber: 9, title: 'Testing and identification of Resistors, Inductors, Capacitors, PN-diode, BJT, Zener Diode' },
      { expNumber: 10, title: 'Plot V-I characteristics of PN junction diode and Zener diode, calculate cut-in voltage' },
      { expNumber: 11, title: 'Plot input/output characteristics of BJT in CE configuration, find h-parameters' },
      { expNumber: 12, title: 'Study half wave and bridge rectifier with filter, calculate ripple factor' }
    ]
  },
  {
    semesterNumber: 1,
    code: 'BCSAI 105',
    storageCode: 'BCSAI105',
    name: 'Programming in C Language Lab',
    subjectType: 'PRACTICAL',
    credits: 2.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    caMarks: 15,
    eeMarks: 35,
    totalMarks: 50,
    experiments: [
      { expNumber: 1, title: 'Display name, address, and city in different lines' },
      { expNumber: 2, title: 'Perform arithmetic operations and simple/compound interest calculations' },
      { expNumber: 3, title: 'Convert Fahrenheit into Centigrade: C = (F - 32) / 1.8' },
      { expNumber: 4, title: 'Find roots of quadratic equation' },
      { expNumber: 5, title: 'Determine triangle type (equilateral, isosceles, scalene) based on sides' },
      { expNumber: 6, title: 'Arithmetic calculator using switch statement' },
      { expNumber: 7, title: 'Calculate employee gross salary with DA, HRA, and PF conditions' },
      { expNumber: 8, title: 'Student marks grade calculation using if-else ladder and switch statement' },
      { expNumber: 9, title: 'Display first N prime numbers' },
      { expNumber: 10, title: 'Check palindrome number and Armstrong number' },
      { expNumber: 11, title: 'Find next nearest prime number of a given integer using do-while' }
    ]
  },
  {
    semesterNumber: 1,
    code: 'ENG 113',
    storageCode: 'ENG113',
    name: 'Communications-I Lab',
    subjectType: 'PRACTICAL',
    credits: 2.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    caMarks: 15,
    eeMarks: 35,
    totalMarks: 50,
    experiments: [
      { expNumber: 1, title: 'Self-Awareness and SWOT Analysis on self' },
      { expNumber: 2, title: 'Confidence Building and 6-steps guide on self-confidence' },
      { expNumber: 3, title: 'Goal Setting - SMART Goals, Performance Goals and Result Goals' },
      { expNumber: 4, title: 'Professional Grooming, Classroom Etiquette, and Presentation Skills' }
    ]
  },

  // ========================== SEMESTER 2 ==========================
  {
    semesterNumber: 2,
    code: 'BCSAI 201',
    storageCode: 'BCSAI201',
    name: 'Discrete Mathematics',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Formal Logic', topics: ['Statement, Symbolic Representation and Tautologies, Quantifiers, Predicator and validity, Normal form, Propositional Logic, Predicate Logic, Proof of correctness'] },
      { unitNumber: 2, title: 'Proof Techniques & Recurrence Relations', topics: ['Direct Proof, Proof by Contraposition, Proof by contradiction, Mathematical induction, Linear first-order recurrence relations with constant coefficients'] },
      { unitNumber: 3, title: 'Graph Theory', topics: ['Directed and Undirected graphs, Eulerian chains and cycles, Hamiltonian chains, Trees, Chromatic number, Planar graphs, Polyas Theory of enumeration'] },
      { unitNumber: 4, title: 'Sets and Functions', topics: ['Sets, relations, partial order relations, partitions, Discrete Fourier and Inverse Fourier Transforms, Discrete Cosine Transform'] },
      { unitNumber: 5, title: 'Monoids and Groups', topics: ['Semigroups, Monoids, Subgroups and cosets, Congruence relations, Morphism, Cyclic groups, Permutation groups, Applications in coding theory'] }
    ],
    textbooks: [
      'Elements of Discrete Mathematics, C.L. Liu, Tata McGraw Hill.',
      'Discrete Mathematics, Richard Johnsonbaugh, Pearson.',
      'Discrete Mathematics and Applications, Kenneth H. Rosen, Tata McGraw Hill.'
    ]
  },
  {
    semesterNumber: 2,
    code: 'BCSAI 202',
    storageCode: 'BCSAI202',
    name: 'Statistical Learning',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Introduction to Statistics', topics: ['History and evolution, contingency tables, frequency polygon, Random variables, expectation, moment generating function, limit theorems'] },
      { unitNumber: 2, title: 'Measures of Central Tendency and Dispersion', topics: ['Arithmetic, Geometric, Harmonic means, Median, Mode, Standard deviation, Variance, Covariance, Quartiles, Coefficient of variation'] },
      { unitNumber: 3, title: 'Testing of Hypothesis', topics: ['Statistical assumptions, Level of significance, Type I and Type II errors, t-test, F-test, Z-test in data science industry'] },
      { unitNumber: 4, title: 'Analysis of Variance (ANOVA)', topics: ['One-way and two-way ANOVA, Multiple comparison of sample means, Fishers LSD test, Tukeys test, Dunnet test'] },
      { unitNumber: 5, title: 'Regression and Correlation', topics: ['OLS estimation, multiple linear regression, multicollinearity, heteroscedasticity, correlation coefficient, partial correlation'] }
    ],
    textbooks: [
      'Fundamentals of Mathematical Statistics, S.C. Gupta & V.K. Kapoor, Sultan Chand & Sons.',
      'Introduction to Probability and Statistics for Engineers and Scientists, Sheldon M. Ross, Academic Press.'
    ]
  },
  {
    semesterNumber: 2,
    code: 'CHY 103',
    storageCode: 'CHY103',
    name: 'Environmental Studies',
    subjectType: 'THEORY',
    credits: 2.0,
    lectureHours: 2,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 15,
    eeMarks: 35,
    totalMarks: 50,
    units: [
      { unitNumber: 1, title: 'Natural Resources', topics: ['Renewable and non-renewable resources, forest, water, mineral, food, energy, conservation'] },
      { unitNumber: 2, title: 'Ecosystems', topics: ['Ecosystem structure and functioning, food chains, webs, ecological pyramids'] },
      { unitNumber: 3, title: 'Biodiversity and Conservation', topics: ['Genetic, species and ecosystem diversity, India as mega-diversity nation, endangered species'] },
      { unitNumber: 4, title: 'Environmental Pollution & Fireworks Safety', topics: ['Air, water, soil, marine, noise pollution, fireworks pollution and heavy metal toxicity, disaster management'] },
      { unitNumber: 5, title: 'Social Issues, Ethics & Environment', topics: ['Urban energy/water conservation, wildlife protection act, ethics and human values, Swami Vivekananda ethos'] }
    ],
    textbooks: ['Fundamentals of Environmental Biology, K. C. Agrawal.', 'Fundamentals of Ecology, E.P. Odum.']
  },
  {
    semesterNumber: 2,
    code: 'BCSAI 203',
    storageCode: 'BCSAI203',
    name: 'Design Thinking',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Foundations of Human-Centered Design', topics: ['Human-centered design principles, barriers to innovation, learning by doing, understanding needs in context'] },
      { unitNumber: 2, title: 'Design Needs and Interventions', topics: ['Ethics of design interventions, design needs in education, engineering, healthcare'] },
      { unitNumber: 3, title: 'Empathy in Design', topics: ['Qualitative research, watching and listening, point of view, problem reframing, grounded theory'] },
      { unitNumber: 4, title: 'Ideation, Experimentation and Evolution', topics: ['Idea generation, creativity, prototyping, express-test-cycle'] },
      { unitNumber: 5, title: 'Design Documentation & Innovation', topics: ['Representing design knowledge, diffusion of innovation, design as research'] }
    ],
    textbooks: ['Design Thinking: Integrating Innovation, Customer Experience, Thomas Lockwood.', '101 Design Methods, Vijay Kumar.']
  },
  {
    semesterNumber: 2,
    code: 'BCSAI 204',
    storageCode: 'BCSAI204',
    name: 'Operating System-Building Blocks',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Introduction to Operating Systems', topics: ['Objectives, Functions, OS Structures, Components, System calls, Virtual Machines'] },
      { unitNumber: 2, title: 'Process Management & Synchronization', topics: ['Process concept, scheduling, threads, CPU scheduling algorithms, mutual exclusion, semaphores, deadlocks'] },
      { unitNumber: 3, title: 'Storage Management', topics: ['Logical and physical address space, paging, segmentation, demand paging, page replacement algorithms'] },
      { unitNumber: 4, title: 'File System Implementation', topics: ['Directory implementation, allocation methods, free space management, disk scheduling algorithms'] },
      { unitNumber: 5, title: 'Protection & Security', topics: ['Access matrix, user authentication, program threats, cryptography, OS security classifications'] }
    ],
    textbooks: ['Operating System Concepts, Silberschatz, Galvin, Gagne, Wiley.', 'Operating Systems, William Stallings, Pearson.']
  },
  {
    semesterNumber: 2,
    code: 'BCSAI 205',
    storageCode: 'BCSAI205',
    name: 'Digital Electronics',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Number Systems and Codes', topics: ['Binary, octal, hex, 1s and 2s complement arithmetic, Boolean algebra laws and theorems'] },
      { unitNumber: 2, title: 'Logic Gates', topics: ['Basic and derived logic gates, truth tables, universal logic gates (NAND, NOR)'] },
      { unitNumber: 3, title: 'Simplification of Boolean Functions', topics: ['K-map representation, Quine-McCluskey method, Adders, Subtractors, Multiplexers, Decoders'] },
      { unitNumber: 4, title: 'Sequential Circuits', topics: ['Latches, Flip-flops (SR, JK, D, T, Master-Slave), shift registers, synchronous/asynchronous counters'] },
      { unitNumber: 5, title: 'Logic Families & PLDs', topics: ['TTL, ECL, CMOS characteristics, PLA and PAL architecture'] }
    ],
    textbooks: ['Digital Design, Morris Mano, Pearson.', 'Modern Digital Electronics, R.P. Jain, Tata McGraw-Hill.']
  },
  {
    semesterNumber: 2,
    code: 'IIOT2',
    storageCode: 'IIOT2',
    name: 'Communication and Standard Interfaces',
    subjectType: 'THEORY',
    credits: 4.0,
    lectureHours: 4,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 30,
    eeMarks: 70,
    totalMarks: 100,
    units: [
      { unitNumber: 1, title: 'Industrial Interfaces & Protocols', topics: ['UART, SPI, I2C, CAN Bus, RS-485, Modbus, Industrial Ethernet'] },
      { unitNumber: 2, title: 'Wireless Networking for IIoT', topics: ['Zigbee, LoRaWAN, Cellular NB-IoT, 5G Industrial standards'] }
    ],
    textbooks: ['Designing the Internet of Things, Adrian McEwen.']
  },
  {
    semesterNumber: 2,
    code: 'BCSAI 206',
    storageCode: 'BCSAI206',
    name: 'Digital Electronics Lab',
    subjectType: 'PRACTICAL',
    credits: 2.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    caMarks: 15,
    eeMarks: 35,
    totalMarks: 50,
    experiments: [
      { expNumber: 1, title: 'Operation of digital multiplexer and demultiplexer' },
      { expNumber: 2, title: 'Binary to decimal encoder and CMOS integrated circuits characteristics' },
      { expNumber: 3, title: 'Compound logic functions and combinational circuits based on NAND/NOR gates' },
      { expNumber: 4, title: 'Digital to analog and analog to digital converters' },
      { expNumber: 5, title: 'Design and verification of counters and shift registers' },
      { expNumber: 6, title: 'Interfacing of CMOS to TTL and TTL to CMOS ICs' },
      { expNumber: 7, title: 'BCD to binary conversion on digital IC trainer' },
      { expNumber: 8, title: 'Astable, Monostable and Bistable Multivibrators frequency variation' },
      { expNumber: 9, title: 'Voltage comparator circuit using IC-710 and Schmitt trigger circuit' },
      { expNumber: 10, title: 'Design 2-bit binary up/down binary counter on breadboard' }
    ]
  },
  {
    semesterNumber: 2,
    code: 'BCSAI 207',
    storageCode: 'BCSAI207',
    name: 'Computer Aided Graphics & Drafting (Lab)',
    subjectType: 'PRACTICAL',
    credits: 2.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    caMarks: 15,
    eeMarks: 35,
    totalMarks: 50,
    experiments: [
      { expNumber: 1, title: 'AutoCAD software introduction, basic drawing, and modify commands' },
      { expNumber: 2, title: 'Isometric projection of planes and solids in AutoCAD and Sketchbook' },
      { expNumber: 3, title: 'Orthographic projection: first angle and third angle projection' },
      { expNumber: 4, title: 'Section of solids: right solids cut by normal and inclined planes' },
      { expNumber: 5, title: 'Conventional representation of materials: springs, gears, shafts, pipe' },
      { expNumber: 6, title: 'Machine assembly drawing: welded joints, riveted joints, bearings, and pulleys' }
    ]
  },
  {
    semesterNumber: 2,
    code: 'ENG 114',
    storageCode: 'ENG114',
    name: 'Business & Technical Communication (Lab)',
    subjectType: 'PRACTICAL',
    credits: 2.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    caMarks: 15,
    eeMarks: 35,
    totalMarks: 50,
    experiments: [
      { expNumber: 1, title: 'Phonetic Symbols and Transcriptions' },
      { expNumber: 2, title: 'Methods of Word Formation' },
      { expNumber: 3, title: 'Reading, Listening and Speaking Skills' },
      { expNumber: 4, title: 'Seminar Presentation' },
      { expNumber: 5, title: 'Group Discussion techniques' },
      { expNumber: 6, title: 'Mock Job Interview preparation' }
    ]
  },

  // ========================== SEMESTER 3 ==========================
  {
    semesterNumber: 3,
    code: 'BCSAI 301',
    storageCode: 'BCSAI301',
    name: 'Computer Networks',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Networking Fundamentals', topics: ['Network Topologies, Transmission media, OSI 7-layer model vs TCP/IP model'] },
      { unitNumber: 2, title: 'Basics of Network Devices', topics: ['NIC, Hub, Switch, Bridge, Router, Gateways, CSU/DSU, Ethernet standards, Wireless LAN security'] },
      { unitNumber: 3, title: 'Network, Transport and Application Layers', topics: ['IPv4/IPv6 datagram, Subnetting, CIDR, VLSM, ICMP, TCP, UDP, Ports & Sockets'] },
      { unitNumber: 4, title: 'WAN Technology', topics: ['WAN switching, satellite services, cellular, VPN tunnelling, encryption protocols'] },
      { unitNumber: 5, title: 'Troubleshooting Networks', topics: ['CLI tools: ping, traceroute, ipconfig, arp, nslookup, netstat, system monitoring tools'] }
    ],
    textbooks: ['Data Communication and Networking, Forouzan, TMH.', 'Computer Networks, Tanenbaum, Pearson.']
  },
  {
    semesterNumber: 3,
    code: 'BCSAI 302',
    storageCode: 'BCSAI302',
    name: 'Probability and Random Variables',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Probability And Random Variables', topics: ['Conditional probability, Bayes theorem, Discrete/Continuous distributions: Binomial, Poisson, Normal, Exponential'] },
      { unitNumber: 2, title: 'Two-Dimensional Random Variables', topics: ['Joint distributions, covariance, correlation, linear regression, Central Limit Theorem'] },
      { unitNumber: 3, title: 'Random Processes', topics: ['Stationary process, Markov process, Markov chain, Poisson process'] },
      { unitNumber: 4, title: 'Correlation And Spectral Densities', topics: ['Auto/cross-correlation functions, Power spectral density'] },
      { unitNumber: 5, title: 'Linear Systems With Random Inputs', topics: ['System transfer function, linear systems with random inputs'] }
    ],
    textbooks: ['Fundamentals of Applied Probability and Random Processes, O.C. Ibe.', 'Probability, Random Variables and Random Signal Principles, Peebles.']
  },
  {
    semesterNumber: 3,
    code: 'BCSAI 303',
    storageCode: 'BCSAI303',
    name: 'Data Structures & Algorithms',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Introduction to Data Structures', topics: ['Time/space complexity, dynamic memory allocation (malloc, calloc, free), recursion (Fibonacci, GCD, Towers of Hanoi)'] },
      { unitNumber: 2, title: 'Searching and Sorting', topics: ['Linear search, Binary search, Bubble sort, Selection sort, Insertion sort, Merge sort, Quick sort'] },
      { unitNumber: 3, title: 'Stack and Queue', topics: ['Infix to postfix conversion, Circular queue, Deque, Priority queue'] },
      { unitNumber: 4, title: 'Linked Lists', topics: ['Singly, Doubly, and Circular linked lists operations'] },
      { unitNumber: 5, title: 'Trees, Graphs and Applications', topics: ['Binary Search Trees, Traversal (Pre, In, Postorder), Graph BFS, DFS'] }
    ],
    textbooks: ['Data Structures and Algorithm Analysis in C, Mark Allen Weiss.', 'Data Structures, Schaum Series, Lipschutz.']
  },
  {
    semesterNumber: 3,
    code: 'BCSAI 304',
    storageCode: 'BCSAI304',
    name: 'Object Oriented Programming with Java',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Introduction to Java', topics: ['JDK, JRE, JVM bytecode, Data types, operators, control structures, arrays'] },
      { unitNumber: 2, title: 'Classes, Inheritance & Lambda Expressions', topics: ['Method overloading, overriding, packages, interfaces, abstract classes, functional interfaces, lambda expressions'] },
      { unitNumber: 3, title: 'Thread Programming, Exceptions & I/O', topics: ['Multithreading lifecycle, synchronization, deadlock, try-catch-finally, file streams, serialization'] },
      { unitNumber: 4, title: 'Networking and JDBC', topics: ['Socket programming, client-server architecture, JDBC API, SQL connectivity, ResultSets'] },
      { unitNumber: 5, title: 'GUI Programming with AWT and JavaFX', topics: ['AWT components, event handling, listeners, JavaFX scene graph, layouts, controls'] }
    ],
    textbooks: ['Java: The Complete Reference, Herbert Schildt, Tata McGraw Hill.', 'Introduction to Java Programming, Y. Daniel Liang.']
  },
  {
    semesterNumber: 3,
    code: 'BCSAI 305',
    storageCode: 'BCSAI305',
    name: 'Cloud Computing',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Understanding Cloud Computing', topics: ['Cloud service models (IaaS, PaaS, SaaS), deployment models (Public, Private, Hybrid, Community)'] },
      { unitNumber: 2, title: 'Cloud Architecture & Requirements', topics: ['Cloud storage, Service-Oriented Architecture, Three-layered architectural requirements, QoS, interoperability'] },
      { unitNumber: 3, title: 'Fault Tolerance & Scalability', topics: ['Virtualization management, load balancing, comparative enterprise deployment'] },
      { unitNumber: 4, title: 'Security Management in Cloud', topics: ['Access control, vulnerability patching, privacy in cloud, encryption standards'] },
      { unitNumber: 5, title: 'Virtualization Technologies', topics: ['Data storage virtualization, server virtualization, capacity and performance optimization'] }
    ],
    textbooks: ['Cloud Computing: A Practical Approach, Anthony T. Velte.', 'Cloud Computing and SOA Convergence, David S. Linthicum.']
  },
  {
    semesterNumber: 3,
    code: 'BCSAI 306',
    storageCode: 'BCSAI306',
    name: 'Computational Systems Biology',
    subjectType: 'THEORY',
    credits: 2.0,
    lectureHours: 2,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 15,
    eeMarks: 35,
    totalMarks: 50,
    units: [
      { unitNumber: 1, title: 'Mathematical Modelling', topics: ['Data tabulation, histograms, ogives, mean, median, standard deviation'] },
      { unitNumber: 2, title: 'Static Networks & Graph Theory', topics: ['Cyclic/acyclic graphs, sparse matrices, basic network parameters'] },
      { unitNumber: 3, title: 'Network Biology & Applications', topics: ['Biological problems mapped to graph problems, clustering coefficient, motifs'] },
      { unitNumber: 4, title: 'Reconstruction of Biological Networks', topics: ['Random networks, small-world networks, scale-free networks, protein interaction networks'] },
      { unitNumber: 5, title: 'Dynamic Modelling of Biological Systems', topics: ['Michaelis-Menten kinetics, biochemical network models, dynamic simulations'] }
    ],
    textbooks: ['A First Course in Systems Biology, E. Voit.', 'Systems Biology: A Textbook, E. Klipp.']
  },
  {
    semesterNumber: 3,
    code: 'IIOT3',
    storageCode: 'IIOT3',
    name: 'Smart Industry Connectivity',
    subjectType: 'THEORY',
    credits: 4.0,
    lectureHours: 4,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 30,
    eeMarks: 70,
    totalMarks: 100,
    units: [
      { unitNumber: 1, title: 'Smart Factory & Industrial Connectivity', topics: ['SCADA, OPC-UA, Edge Gateways, Time Sensitive Networking (TSN)'] }
    ],
    textbooks: ['Industry 4.0: The Industrial Internet of Things, Alasdair Gilchrist.']
  },
  {
    semesterNumber: 3,
    code: 'BCSAI 307',
    storageCode: 'BCSAI307',
    name: 'Computer Networks Lab',
    subjectType: 'PRACTICAL',
    credits: 2.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    caMarks: 15,
    eeMarks: 35,
    totalMarks: 50,
    experiments: [
      { expNumber: 1, title: 'Switch Configuration - Basic Commands and Switch Port Security' },
      { expNumber: 2, title: 'Router Configuration and Setting up of Passwords' },
      { expNumber: 3, title: 'PPP Encapsulation, PPP PAP Authentication, PPP CHAP Authentication' },
      { expNumber: 4, title: 'Configuration of Default, Static and Dynamic Routing' },
      { expNumber: 5, title: 'VLAN Configuration and Inter-VLAN Routing' },
      { expNumber: 6, title: 'Standard and Extended Access Control Lists (ACLs)' },
      { expNumber: 7, title: 'DHCP, DHCP Relay and DHCP Exclusions' },
      { expNumber: 8, title: 'Configuring Logging to a Remote Syslog Server' },
      { expNumber: 9, title: 'Packet Tracer broadcast and collision domain analysis with router, switch, and hub' },
      { expNumber: 10, title: 'Configure wireless network for ad-hoc and infrastructure modes' },
      { expNumber: 11, title: 'Configure point-to-site and site-to-site VPN tunnels' },
      { expNumber: 12, title: 'Network troubleshooting utilities: ping, traceroute, arp, netstat, nslookup' }
    ]
  },
  {
    semesterNumber: 3,
    code: 'BCSAI 308',
    storageCode: 'BCSAI308',
    name: 'Data Structures & Algorithms Lab',
    subjectType: 'PRACTICAL',
    credits: 2.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    caMarks: 15,
    eeMarks: 35,
    totalMarks: 50,
    experiments: [
      { expNumber: 1, title: 'Recursive GCD computation and Fibonacci series generation' },
      { expNumber: 2, title: 'Pointer string length, concatenation, and substring extraction' },
      { expNumber: 3, title: 'Towers of Hanoi recursion with three discs' },
      { expNumber: 4, title: 'Array element insertion and deletion at specified indices' },
      { expNumber: 5, title: 'Create singly linked list and perform traversal' },
      { expNumber: 6, title: 'Sorting N numbers using Insertion Sort, Selection Sort, and Merge Sort' },
      { expNumber: 7, title: 'Pointer implementation of Stack and Queue data structures' },
      { expNumber: 8, title: 'Binary Search Tree creation and Inorder, Preorder, Postorder traversals' }
    ]
  },
  {
    semesterNumber: 3,
    code: 'BCSAI 309',
    storageCode: 'BCSAI309',
    name: 'Object Oriented Programming with Java Lab',
    subjectType: 'PRACTICAL',
    credits: 2.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    caMarks: 15,
    eeMarks: 35,
    totalMarks: 50,
    experiments: [
      { expNumber: 1, title: 'String equality, string reversal, and sum of digits computation' },
      { expNumber: 2, title: 'Prime numbers generation between 1 and 1000' },
      { expNumber: 3, title: 'Array sorting and element insertion in Java' },
      { expNumber: 4, title: 'TreeSet, Stack and Math class object operations' },
      { expNumber: 5, title: 'Runtime Process execution and JVM memory monitoring (gc, freeMemory)' },
      { expNumber: 6, title: 'File copy utility with overwrite confirmation using I/O streams' },
      { expNumber: 7, title: 'Count lines and words in a file at runtime' },
      { expNumber: 8, title: 'Directory pattern file listing and GUI numeric text-field validation' }
    ]
  },

  // ========================== SEMESTER 4 ==========================
  {
    semesterNumber: 4,
    code: 'BCSAI 401',
    storageCode: 'BCSAI401',
    name: 'Design and Analysis of Algorithms',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Algorithm Analysis & Recurrences', topics: ['Asymptotic notations, Master Theorem, Substitution and Recursion tree methods'] },
      { unitNumber: 2, title: 'Algorithmic Strategies', topics: ['Divide and Conquer, Greedy algorithms, Dynamic Programming, Backtracking, Branch & Bound, Knapsack, TSP'] },
      { unitNumber: 3, title: 'Graph and Tree Algorithms', topics: ['DFS, BFS, Dijkstra, Bellman-Ford, Minimum Spanning Trees (Kruskal, Prim), Network Flow'] },
      { unitNumber: 4, title: 'Tractable and Intractable Problems', topics: ['P, NP, NP-Complete, NP-Hard classes, Cooks Theorem, Standard reductions'] },
      { unitNumber: 5, title: 'Advanced Topics', topics: ['Approximation algorithms, Randomized algorithms, PSPACE-complete problems'] }
    ],
    textbooks: ['Introduction to Algorithms, Cormen, Leiserson, Rivest, Stein (CLRS).', 'Fundamentals of Computer Algorithms, Horowitz, Sahni.']
  },
  {
    semesterNumber: 4,
    code: 'BCSAI 402',
    storageCode: 'BCSAI402',
    name: 'Robotic Operating Systems & Robot Simulation',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Introduction to ROS', topics: ['ROS environment setup, ROS filesystem, packages creation and building with Catkin'] },
      { unitNumber: 2, title: 'ROS Design', topics: ['Graph concepts, Nodes, Topics, Messages, roscore, rosnode, rostopic, rqt_plot'] },
      { unitNumber: 3, title: 'ROS Services & Launch Files', topics: ['Services, connections, parameters, system dependencies, roslaunch, debugging'] },
      { unitNumber: 4, title: 'ROS Standards', topics: ['Coding conventions, package layout, naming conventions, common procedures'] },
      { unitNumber: 5, title: 'Coordinate Frames and Transforms (TF)', topics: ['Transforms, message ontology, client libraries, actionlib'] }
    ],
    textbooks: ['Programming Robots with ROS, Morgan Quigley, Brian Gerkey, William D. Smart.', 'Industrial Robotics, Low K.H.']
  },
  {
    semesterNumber: 4,
    code: 'BCSAI 403',
    storageCode: 'BCSAI403',
    name: 'Database Management System',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Introduction & ER Modelling', topics: ['Purpose of DBMS, Data Models, Database Languages, 3-tier architecture, ER Diagrams'] },
      { unitNumber: 2, title: 'Relational Model & SQL', topics: ['Relational algebra, calculus, SQL DDL, DML, constraints, integrity rules'] },
      { unitNumber: 3, title: 'Advanced SQL & Views', topics: ['Joins, subqueries, views, indexes, triggers, embedded SQL, dynamic SQL'] },
      { unitNumber: 4, title: 'Database Design & Normalization', topics: ['Functional dependencies, 1NF, 2NF, 3NF, BCNF, 4NF, 5NF'] },
      { unitNumber: 5, title: 'Transactions & Concurrency Control', topics: ['ACID properties, Serializability, Two-phase locking, Deadlock detection, Recovery systems'] }
    ],
    textbooks: ['Database System Concepts, Silberschatz, Korth, Sudarshan.', 'Fundamentals of Database Systems, Elmasri, Navathe.']
  },
  {
    semesterNumber: 4,
    code: 'BCSAI 404',
    storageCode: 'BCSAI404',
    name: 'Software Engineering',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Introduction to Software Engineering', topics: ['Software development life cycle, Waterfall, Prototyping, Spiral, Agile models'] },
      { unitNumber: 2, title: 'Software Requirement Specification (SRS)', topics: ['Requirements elicitation, analysis, modeling, SRS documentation standards'] },
      { unitNumber: 3, title: 'System Design', topics: ['Coupling and Cohesion, Data Flow Diagrams (DFD), Structure Charts, Object-oriented design'] },
      { unitNumber: 4, title: 'Software Testing', topics: ['Unit testing, integration testing, Alpha/Beta testing, black-box vs white-box testing'] },
      { unitNumber: 5, title: 'Project Management & Quality Assurance', topics: ['COCOMO estimation, risk management, ISO 9000, CMMI maturity levels'] }
    ],
    textbooks: ['Software Engineering: A Practitioners Approach, Roger S. Pressman.', 'An Integrated Approach to Software Engineering, Pankaj Jalote.']
  },
  {
    semesterNumber: 4,
    code: 'BCSAI 405',
    storageCode: 'BCSAI405',
    name: 'AI and Intelligent Agents',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Introduction to AI', topics: ['Foundations of AI, Intelligent Agents, State space search, Problem formulation'] },
      { unitNumber: 2, title: 'Informed Search Strategies', topics: ['A* search, Best-First Search, Iterative Deepening A*, Minimax algorithm, Alpha-Beta pruning'] },
      { unitNumber: 3, title: 'Uncertainty & Decision Making', topics: ['Bayesian belief networks, Default reasoning, Fuzzy logic, Utility theory'] },
      { unitNumber: 4, title: 'Learning & Inductive Inference', topics: ['Decision Trees, Naive Bayes models, EM algorithm, Hidden Markov Models, Instance-based learning'] },
      { unitNumber: 5, title: 'Intelligent Systems & Swarm Intelligence', topics: ['Expert systems architecture, Evolutionary programming, Genetic algorithms, Swarm intelligence'] }
    ],
    textbooks: ['Artificial Intelligence: A Modern Approach, Stuart Russell & Peter Norvig.', 'Artificial Intelligence, Kevin Knight, Elaine Rich.']
  },
  {
    semesterNumber: 4,
    code: 'IIOT4',
    storageCode: 'IIOT4',
    name: 'Data Analytics for IIOT',
    subjectType: 'THEORY',
    credits: 4.0,
    lectureHours: 4,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 30,
    eeMarks: 70,
    totalMarks: 100,
    units: [
      { unitNumber: 1, title: 'Streaming Data & Sensor Analytics', topics: ['Time series analysis, Kafka streaming pipelines, Predictive maintenance models'] }
    ],
    textbooks: ['Data Analytics for IoT, Andrew Minteer.']
  },
  {
    semesterNumber: 4,
    code: 'BCSAI 406',
    storageCode: 'BCSAI406',
    name: 'Database Management System with SQL Lab',
    subjectType: 'PRACTICAL',
    credits: 2.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    caMarks: 15,
    eeMarks: 35,
    totalMarks: 50,
    experiments: [
      { expNumber: 1, title: 'Create new user and assign database privileges' },
      { expNumber: 2, title: 'Create Department, Employee, Product, and Sales tables with constraints' },
      { expNumber: 3, title: 'Add Primary Key and Foreign Key constraints using ALTER TABLE' },
      { expNumber: 4, title: 'Complex SELECT queries with range searching, pattern matching, aggregate functions' },
      { expNumber: 5, title: 'Create views (EmpDeptView) and perform multi-table equi-joins and self-joins' },
      { expNumber: 6, title: 'Subqueries with UNION, INTERSECT, and MINUS clauses' },
      { expNumber: 7, title: 'PL/SQL Procedure to compute prime numbers and employee salary aggregations' },
      { expNumber: 8, title: 'PL/SQL Triggers to prevent invalid salary updates and audit deleted records' },
      { expNumber: 9, title: 'PL/SQL Package with procedures and functions for sales reporting' }
    ]
  },
  {
    semesterNumber: 4,
    code: 'BCSAI 407',
    storageCode: 'BCSAI407',
    name: 'Robotic Operating Systems & Robot Simulation (Lab)',
    subjectType: 'PRACTICAL',
    credits: 2.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    caMarks: 15,
    eeMarks: 35,
    totalMarks: 50,
    experiments: [
      { expNumber: 1, title: 'Basic system requirements check and ROS environment installation' },
      { expNumber: 2, title: 'ROS system and utility configuration with workspace setup' },
      { expNumber: 3, title: 'Command-line tools testing: roscore, rosnode, rosrun, rostopic, rqt_plot' },
      { expNumber: 4, title: 'ROS interfaces and custom message definitions' },
      { expNumber: 5, title: 'Robot model simulation in Gazebo and RViz visualization' }
    ]
  },
  {
    semesterNumber: 4,
    code: 'BCSAI 408',
    storageCode: 'BCSAI408',
    name: 'Online Social Network Analysis Lab',
    subjectType: 'PRACTICAL',
    credits: 2.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    caMarks: 15,
    eeMarks: 35,
    totalMarks: 50,
    experiments: [
      { expNumber: 1, title: 'Social media network data acquisition and parsing' },
      { expNumber: 2, title: 'Network graphs construction using NetworkX' },
      { expNumber: 3, title: 'Degree centrality, closeness, betweenness, and eigenvector centrality' },
      { expNumber: 4, title: 'Community detection in social graphs' },
      { expNumber: 5, title: 'Tree structures and information cascade propagation simulation' }
    ]
  },
  {
    semesterNumber: 4,
    code: 'BCSAI 409',
    storageCode: 'BCSAI409',
    name: 'Shell Scripting Lab',
    subjectType: 'PRACTICAL',
    credits: 2.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    caMarks: 15,
    eeMarks: 35,
    totalMarks: 50,
    experiments: [
      { expNumber: 1, title: 'Kali Linux virtual machine setup in VMware/VirtualBox' },
      { expNumber: 2, title: 'Linux shell navigation and file permissions manipulation' },
      { expNumber: 3, title: 'Information gathering and port scanning scripts with Nmap' },
      { expNumber: 4, title: 'Automated vulnerability analysis and service enumeration scripts' },
      { expNumber: 5, title: 'Packet sniffing and spoofing demonstration with Wireshark' },
      { expNumber: 6, title: 'Automated shell backup and system health reporting script' }
    ]
  },

  // ========================== SEMESTER 5 ==========================
  {
    semesterNumber: 5,
    code: 'BCSAI 501',
    storageCode: 'BCSAI501',
    name: 'Ethics in Computer Science',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Overview of Ethics', topics: ['Ethics in business, IT professional malpractices, ethical codes of conduct'] },
      { unitNumber: 2, title: 'Computer and Internet Crime', topics: ['Security incidents, commercial vulnerabilities, risk assessment, security policies'] },
      { unitNumber: 3, title: 'Privacy and Surveillance', topics: ['Electronic surveillance, identity theft, data encryption, freedom of expression'] },
      { unitNumber: 4, title: 'Intellectual Property', topics: ['Copyrights, patents, trade secrets, software piracy, open source licensing, reverse engineering'] },
      { unitNumber: 5, title: 'Ethics of IT Organizations', topics: ['Contingent workers, H-1B visas, whistle-blowing protections and reporting policies'] }
    ],
    textbooks: ['Computer Ethics, Deborah G. Johnson, Pearson.', 'A Gift of Fire: Social, Legal and Ethical Issues, Sara Baase.']
  },
  {
    semesterNumber: 5,
    code: 'BCSAI 502',
    storageCode: 'BCSAI502',
    name: 'Prolog Programming',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Overview of Prolog', topics: ['Components of Prolog, syntax, facts, rules, queries, unification'] },
      { unitNumber: 2, title: 'Lists, Numbers & Operators', topics: ['Head and Tail, list predicates, arithmetic evaluation, operator precedence'] },
      { unitNumber: 3, title: 'Backtracking, Cuts & Negation', topics: ['Cut operator, green vs red cuts, negation as failure, closed world assumption'] },
      { unitNumber: 4, title: 'Logic Foundations', topics: ['Horn clauses, first-order resolution refutation'] },
      { unitNumber: 5, title: 'Recursive Programming', topics: ['Induction, accumulator technique, debugging recursive predicates'] }
    ],
    textbooks: ['Prolog Programming for Artificial Intelligence, Ivan Bratko, Addison-Wesley.']
  },
  {
    semesterNumber: 5,
    code: 'BCSAI 503',
    storageCode: 'BCSAI503',
    name: 'Signal & Image Processing',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Digital Image Fundamentals', topics: ['Sampling, quantization, pixel relationships, color models (RGB, HSI)'] },
      { unitNumber: 2, title: 'Image Transforms & Enhancement', topics: ['2D DFT, DCT, Hadamard transform, histogram equalization, spatial filtering'] },
      { unitNumber: 3, title: 'Image Restoration', topics: ['Noise models, Wiener filtering, inverse filtering'] },
      { unitNumber: 4, title: 'Image Compression', topics: ['Huffman coding, run-length coding, transform coding, JPEG standards'] },
      { unitNumber: 5, title: 'Image Segmentation', topics: ['Edge detection (Sobel, Canny), thresholding, region-based segmentation'] }
    ],
    textbooks: ['Digital Image Processing, Gonzalez & Woods, Pearson.']
  },
  {
    semesterNumber: 5,
    code: 'BCSAI 504',
    storageCode: 'BCSAI504',
    name: 'Data Mining & ML',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Introduction to Data Mining & ML', topics: ['KDD process, supervised vs unsupervised learning, data preprocessing'] },
      { unitNumber: 2, title: 'Statistical Concepts & Regression', topics: ['Hypothesis testing, linear regression, multiple regression, model evaluation metrics'] },
      { unitNumber: 3, title: 'Logistic Regression & Decision Trees', topics: ['Logit function, ROC curve, ID3, C4.5, CART, Random Forests, XGBoost'] },
      { unitNumber: 4, title: 'Classifiers & Association Mining', topics: ['k-NN, Naive Bayes, Apriori algorithm, FP-Growth, k-Means clustering'] },
      { unitNumber: 5, title: 'Dimensionality Reduction & SVM', topics: ['PCA, SVD, Support Vector Machines, kernel trick, text mining'] }
    ],
    textbooks: ['Data Mining: Concepts and Techniques, Jiawei Han & Micheline Kamber.', 'Machine Learning, Tom Mitchell.']
  },
  {
    semesterNumber: 5,
    code: 'BCSAI 505',
    storageCode: 'BCSAI505',
    name: 'Formal Language & Automata',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Finite Automata', topics: ['DFA, NFA, equivalence, epsilon-NFA, regular expressions, Mealy and Moore machines'] },
      { unitNumber: 2, title: 'Regular Sets & Grammars', topics: ['Pumping Lemma for regular sets, Myhill-Nerode theorem, closure properties'] },
      { unitNumber: 3, title: 'Context-Free Languages & Pushdown Automata', topics: ['CFG, derivation trees, Chomsky Normal Form (CNF), Greibach Normal Form (GNF), PDA'] },
      { unitNumber: 4, title: 'Turing Machines & Undecidability', topics: ['Turing machine model, computable languages, halting problem, Rices theorem'] },
      { unitNumber: 5, title: 'Chomsky Hierarchy', topics: ['Type 0, Type 1 (Context-Sensitive), Type 2 (CFL), Type 3 (Regular) grammars, LBA'] }
    ],
    textbooks: ['Introduction to Automata Theory, Languages and Computation, Hopcroft, Motwani, Ullman.']
  },
  {
    semesterNumber: 5,
    code: 'BCSAI 506',
    storageCode: 'BCSAI506',
    name: 'Information Security',
    subjectType: 'ELECTIVE',
    credits: 2.0,
    lectureHours: 2,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 15,
    eeMarks: 35,
    totalMarks: 50,
    units: [
      { unitNumber: 1, title: 'Information Security Concepts', topics: ['Threats, vulnerabilities, CIA triad, security policies, governance'] },
      { unitNumber: 2, title: 'Asset Classification & Access Control', topics: ['Data classification, role-based access control, monitoring, perimeter security'] },
      { unitNumber: 3, title: 'Cryptography Fundamentals', topics: ['Classical ciphers, DES, AES, RSA, Diffie-Hellman, digital signatures'] }
    ],
    textbooks: ['Cryptography and Network Security, William Stallings.']
  },
  {
    semesterNumber: 5,
    code: 'BCSAI 507',
    storageCode: 'BCSAI507',
    name: 'Database Security',
    subjectType: 'ELECTIVE',
    credits: 2.0,
    lectureHours: 2,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 15,
    eeMarks: 35,
    totalMarks: 50,
    units: [
      { unitNumber: 1, title: 'Security Architecture', topics: ['DBMS security environment, authentication methods, user administration'] },
      { unitNumber: 2, title: 'Virtual Private Databases & Auditing', topics: ['Oracle VPD, row/column security, database auditing triggers, privacy preserving data mining'] }
    ],
    textbooks: ['Database Security and Auditing, Hassan A. Afyouni.']
  },
  {
    semesterNumber: 5,
    code: 'BCSAI 508',
    storageCode: 'BCSAI508',
    name: 'Business Intelligence',
    subjectType: 'ELECTIVE',
    credits: 2.0,
    lectureHours: 2,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 15,
    eeMarks: 35,
    totalMarks: 50,
    units: [
      { unitNumber: 1, title: 'BI Framework & Data Warehousing', topics: ['OLTP vs OLAP, ETL processes, multi-dimensional modeling, star and snowflake schemas, KPI dashboards'] }
    ],
    textbooks: ['Fundamentals of Business Analytics, R.N. Prasad & Seema Acharya.']
  },
  {
    semesterNumber: 5,
    code: 'IIOT5',
    storageCode: 'IIOT5',
    name: 'Machine Learning for IIOT',
    subjectType: 'THEORY',
    credits: 4.0,
    lectureHours: 4,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 30,
    eeMarks: 70,
    totalMarks: 100,
    units: [
      { unitNumber: 1, title: 'Applied ML in Industrial Automation', topics: ['Anomaly detection in sensor streams, predictive maintenance, edge ML deployment'] }
    ],
    textbooks: ['Machine Learning for the Internet of Things, Wiley.']
  },
  {
    semesterNumber: 5,
    code: 'BCSAI 509',
    storageCode: 'BCSAI509',
    name: 'Data Mining & ML using Python Lab',
    subjectType: 'PRACTICAL',
    credits: 2.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    caMarks: 15,
    eeMarks: 35,
    totalMarks: 50,
    experiments: [
      { expNumber: 1, title: 'Data preprocessing and association rule mining on market basket data' },
      { expNumber: 2, title: 'Supervised classification and clustering demonstration in Python' },
      { expNumber: 3, title: 'Linear and logistic regression model evaluation' },
      { expNumber: 4, title: 'Naive Bayesian classifier implementation from scratch' },
      { expNumber: 5, title: 'k-Nearest Neighbor classification on Iris dataset with confusion matrix' },
      { expNumber: 6, title: 'k-Means clustering implementation on CSV dataset' }
    ]
  },
  {
    semesterNumber: 5,
    code: 'BCSAI 510',
    storageCode: 'BCSAI510',
    name: 'Signal & Image Processing Lab',
    subjectType: 'PRACTICAL',
    credits: 2.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    caMarks: 15,
    eeMarks: 35,
    totalMarks: 50,
    experiments: [
      { expNumber: 1, title: 'Histogram equalization and contrast adjustment' },
      { expNumber: 2, title: 'Spatial averaging and Gaussian smoothing filter implementation' },
      { expNumber: 3, title: 'Morphological operations: erosion, dilation, opening, closing' },
      { expNumber: 4, title: 'Edge detection using Sobel and Canny operators' },
      { expNumber: 5, title: 'Discrete Cosine Transform (DCT) and IDCT computation for compression' }
    ]
  },
  {
    semesterNumber: 5,
    code: 'BCSAI 511',
    storageCode: 'BCSAI511',
    name: 'Prolog Programming Lab',
    subjectType: 'PRACTICAL',
    credits: 2.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    caMarks: 15,
    eeMarks: 35,
    totalMarks: 50,
    experiments: [
      { expNumber: 1, title: 'Arithmetic operations, sum, and maximum of two numbers in Prolog' },
      { expNumber: 2, title: 'Factorial and Fibonacci number computation' },
      { expNumber: 3, title: 'List predicates: insert_nth, remove_nth, append, palindrome check' },
      { expNumber: 4, title: 'Find maximum and sum of numbers in a list using cut predicate' },
      { expNumber: 5, title: 'List reversal and even/odd length check' }
    ]
  },
  {
    semesterNumber: 5,
    code: 'BCSAI 512',
    storageCode: 'BCSAI512',
    name: 'Anandam-I (Happiness Curriculum)',
    subjectType: 'PRACTICAL',
    credits: 1.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 1,
    caMarks: 10,
    eeMarks: 15,
    totalMarks: 25,
    experiments: [
      { expNumber: 1, title: 'Strategies for Happiness: Self-motivation, self-worth, and self-purpose' },
      { expNumber: 2, title: 'Appreciate your life practices' },
      { expNumber: 3, title: 'Finding your passion: Vision Board and inspirational toolkit' },
      { expNumber: 4, title: 'Creativity exercises' }
    ]
  },

  // ========================== SEMESTER 6 ==========================
  {
    semesterNumber: 6,
    code: 'BCSAI 601',
    storageCode: 'BCSAI601',
    name: 'Big Data Analytics',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Introduction to Big Data', topics: ['Characteristics of Big Data, 5 Vs, Big Data technologies, data analytics lifecycle'] },
      { unitNumber: 2, title: 'Analytical Theory and Methods', topics: ['Clustering, Association Rules, Apriori algorithm, linear/logistic regression'] },
      { unitNumber: 3, title: 'Hadoop & Ecosystem Tools', topics: ['MapReduce, Apache Hadoop, Pig, Hive, HBase, NoSQL databases'] },
      { unitNumber: 4, title: 'HDFS Architecture', topics: ['NameNode, DataNode, Secondary NameNode, HDFS replication, data flow'] },
      { unitNumber: 5, title: 'Processing Data with MapReduce', topics: ['MapReduce execution pipeline, task management, WordCount implementation'] }
    ],
    textbooks: ['Data Warehousing in the Age of Big Data, Krish Krishnan.', 'Big Data Analytics with R and Hadoop, Vignesh Prajapati.']
  },
  {
    semesterNumber: 6,
    code: 'BCSAI 602',
    storageCode: 'BCSAI602',
    name: 'Compiler Design',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Overview of Compilation & Lexical Analysis', topics: ['Phases of compiler, Lexical Analyzer, tokens, regular expressions, LEX tool'] },
      { unitNumber: 2, title: 'Syntax Analysis & Parsing', topics: ['Context-free grammars, LL(1) parsing, LR parsing (SLR, CLR, LALR), YACC'] },
      { unitNumber: 3, title: 'Semantic Analysis', topics: ['Syntax-directed translation (SDT), synthesized and inherited attributes, symbol tables'] },
      { unitNumber: 4, title: 'Intermediate Code Generation', topics: ['Three-address code, quadruples, triples, syntax trees, backpatching'] },
      { unitNumber: 5, title: 'Code Optimization & Generation', topics: ['Basic blocks, flow graphs, loop optimization, register allocation'] }
    ],
    textbooks: ['Compilers: Principles, Techniques, and Tools, Aho, Lam, Sethi, Ullman (Dragon Book).']
  },
  {
    semesterNumber: 6,
    code: 'BCSAI 603',
    storageCode: 'BCSAI603',
    name: 'Advanced Machine Learning',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Bayesian Machine Learning', topics: ['Discriminative vs Generative paradigms, Bayesian modeling assumptions'] },
      { unitNumber: 2, title: 'Probabilistic Programming', topics: ['Graphical models, dependency structures, probabilistic inference'] },
      { unitNumber: 3, title: 'Bayesian Inference & Sampling', topics: ['Monte Carlo sampling, Markov Chain Monte Carlo (MCMC), variational inference'] },
      { unitNumber: 4, title: 'NLP & Deep Embeddings', topics: ['Word embeddings (Word2Vec, GloVe), neural language models'] },
      { unitNumber: 5, title: 'Deep Learning Architectures', topics: ['Stochastic gradient descent, backpropagation, CNN, RNN, Adam optimizer'] }
    ],
    textbooks: ['Deep Learning and Neural Networks, Jeff Heaton.', 'Introduction to Machine Learning, Ethem Alpaydin.']
  },
  {
    semesterNumber: 6,
    code: 'BCSAI 604',
    storageCode: 'BCSAI604',
    name: 'Natural Language Processing',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Overview & Morphology', topics: ['Regular expressions, finite state automata morphology, Porter stemmer'] },
      { unitNumber: 2, title: 'Word Level & Syntactic Analysis', topics: ['N-gram language models, Part-of-Speech (POS) tagging, Hidden Markov Models'] },
      { unitNumber: 3, title: 'Context-Free Grammars for Natural Language', topics: ['Parsing techniques, CYK algorithm, probabilistic CFGs'] },
      { unitNumber: 4, title: 'Semantic Analysis', topics: ['First-order predicate calculus, word sense disambiguation, lexical semantics'] },
      { unitNumber: 5, title: 'Discourse & Dialog Systems', topics: ['Coreference resolution, conversational agents, machine translation'] }
    ],
    textbooks: ['Speech and Language Processing, Daniel Jurafsky & James H. Martin.']
  },
  {
    semesterNumber: 6,
    code: 'BCSAI 605',
    storageCode: 'BCSAI605',
    name: 'Graphical Model',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Fundamentals of Graphical Models', topics: ['Conditional independence, d-separation, exponential family distributions'] },
      { unitNumber: 2, title: 'Directed & Undirected Models', topics: ['Bayesian networks, Markov Random Fields, factor graphs, Hammersley-Clifford theorem'] },
      { unitNumber: 3, title: 'Inference Algorithms', topics: ['Variable elimination, sum-product belief propagation, junction tree algorithm'] },
      { unitNumber: 4, title: 'MAP Inference & Sampling', topics: ['Max-product, graph cuts, Gibbs sampling, particle filtering'] },
      { unitNumber: 5, title: 'Learning in Graphical Models', topics: ['Expectation Maximization (EM), structure learning, maximum entropy'] }
    ],
    textbooks: ['Probabilistic Graphical Models: Principles and Techniques, Daphne Koller & Nir Friedman.']
  },
  {
    semesterNumber: 6,
    code: 'BCSAI 606',
    storageCode: 'BCSAI606',
    name: 'Blockchain',
    subjectType: 'ELECTIVE',
    credits: 2.0,
    lectureHours: 2,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 15,
    eeMarks: 35,
    totalMarks: 50,
    units: [
      { unitNumber: 1, title: 'Cryptography in Blockchain', topics: ['Hash functions, public key cryptography, digital signatures, Merkle trees'] },
      { unitNumber: 2, title: 'Consensus & Crypto-Economics', topics: ['Proof of Work (PoW), Proof of Stake (PoS), Bitcoin network, Ethereum virtual machine (EVM), smart contracts'] }
    ],
    textbooks: ['Mastering Blockchain, Imran Bashir.']
  },
  {
    semesterNumber: 6,
    code: 'BCSAI 607',
    storageCode: 'BCSAI607',
    name: 'Internet of Things',
    subjectType: 'ELECTIVE',
    credits: 2.0,
    lectureHours: 2,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 15,
    eeMarks: 35,
    totalMarks: 50,
    units: [
      { unitNumber: 1, title: 'IoT Architecture & Protocols', topics: ['IoT devices, communication models, MQTT, CoAP, WSN networks, home automation'] }
    ],
    textbooks: ['Internet of Things: A Hands-On Approach, Bahga & Madisetti.']
  },
  {
    semesterNumber: 6,
    code: 'BCSAI 608',
    storageCode: 'BCSAI608',
    name: 'Management Information System',
    subjectType: 'ELECTIVE',
    credits: 2.0,
    lectureHours: 2,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 15,
    eeMarks: 35,
    totalMarks: 50,
    units: [
      { unitNumber: 1, title: 'MIS Concepts & Enterprise Systems', topics: ['Decision Support Systems, SCM, CRM, Enterprise Resource Planning (ERP)'] }
    ],
    textbooks: ['Management Information Systems, Jawadekar, Tata McGraw Hill.']
  },
  {
    semesterNumber: 6,
    code: 'IIOT6',
    storageCode: 'IIOT6',
    name: 'Artificial Intelligence for IIOT',
    subjectType: 'THEORY',
    credits: 4.0,
    lectureHours: 4,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 30,
    eeMarks: 70,
    totalMarks: 100,
    units: [
      { unitNumber: 1, title: 'AI in Smart Factories', topics: ['Autonomous robotics in IIoT, computer vision for defect inspection, digital twins'] }
    ],
    textbooks: ['Artificial Intelligence in Industrial IoT, Springer.']
  },
  {
    semesterNumber: 6,
    code: 'BCSAI 609',
    storageCode: 'BCSAI609',
    name: 'Big Data Analytics Lab',
    subjectType: 'PRACTICAL',
    credits: 2.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    caMarks: 15,
    eeMarks: 35,
    totalMarks: 50,
    experiments: [
      { expNumber: 1, title: 'Hadoop ecosystem setup and WordCount MapReduce job execution' },
      { expNumber: 2, title: 'HDFS file management commands (add, retrieve, delete files)' },
      { expNumber: 3, title: 'NoSQL database queries using MongoDB' },
      { expNumber: 4, title: 'R programming for linear and logistic regression modeling' },
      { expNumber: 5, title: 'Hive table creation, data loading, and query execution' }
    ]
  },
  {
    semesterNumber: 6,
    code: 'BCSAI 610',
    storageCode: 'BCSAI610',
    name: 'Advanced Machine Learning Lab',
    subjectType: 'PRACTICAL',
    credits: 2.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    caMarks: 15,
    eeMarks: 35,
    totalMarks: 50,
    experiments: [
      { expNumber: 1, title: 'FIND-S algorithm implementation for finding most specific hypothesis' },
      { expNumber: 2, title: 'Candidate-Elimination algorithm on CSV training data' },
      { expNumber: 3, title: 'ID3 decision tree algorithm implementation' },
      { expNumber: 4, title: 'Artificial Neural Network with Backpropagation algorithm' },
      { expNumber: 5, title: 'Bayesian Network on medical heart disease dataset' },
      { expNumber: 6, title: 'Expectation Maximization (EM) clustering vs k-Means comparison' }
    ]
  },
  {
    semesterNumber: 6,
    code: 'BCSAI 611',
    storageCode: 'BCSAI611',
    name: 'Natural Language Processing Lab',
    subjectType: 'PRACTICAL',
    credits: 2.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    caMarks: 15,
    eeMarks: 35,
    totalMarks: 50,
    experiments: [
      { expNumber: 1, title: 'NLTK toolkit installation and word frequency distribution' },
      { expNumber: 2, title: 'Stop words removal and Porter stemming' },
      { expNumber: 3, title: 'Tokenization, POS tagging, and Named Entity Recognition (NER)' },
      { expNumber: 4, title: 'Synonym processing using WordNet lexical database' }
    ]
  },
  {
    semesterNumber: 6,
    code: 'BCSAI 612',
    storageCode: 'BCSAI612',
    name: 'Anandam-II (Happiness Curriculum)',
    subjectType: 'PRACTICAL',
    credits: 1.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 1,
    caMarks: 10,
    eeMarks: 15,
    totalMarks: 25,
    experiments: [
      { expNumber: 1, title: 'Healthy Lifestyle habits formation' },
      { expNumber: 2, title: 'The Power of Resilience exercises' },
      { expNumber: 3, title: 'Getting out of your comfort zone activities' },
      { expNumber: 4, title: 'Time and capacity management to increase productivity' }
    ]
  },

  // ========================== SEMESTER 7 ==========================
  {
    semesterNumber: 7,
    code: 'BCSAI 701',
    storageCode: 'BCSAI701',
    name: 'Fuzzy Logic & Application',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Introduction to Fuzzy Sets', topics: ['Classical set theory vs Fuzzy set theory, membership functions, predicate logic'] },
      { unitNumber: 2, title: 'Approximate Reasoning', topics: ['Syllogistic reasoning, rule base, linguistic variables, fuzzy quantifiers'] },
      { unitNumber: 3, title: 'Fuzzy Inference Systems', topics: ['Mamdani FIS, Sugeno FIS, fuzzification, defuzzification methods'] },
      { unitNumber: 4, title: 'Quantification & Decision Making', topics: ['Fuzzy decision making: multi-person, multi-objective, multi-criteria'] },
      { unitNumber: 5, title: 'Fuzzy Control Systems', topics: ['Adaptive controller, neuro-fuzzy systems (ANFIS), operational applications'] }
    ],
    textbooks: ['Fuzzy Logic with Engineering Applications, Timothy J. Ross.', 'Fuzzy Sets and Fuzzy Logic, George J. Klir & Bo Yuan.']
  },
  {
    semesterNumber: 7,
    code: 'BCSAI 702',
    storageCode: 'BCSAI702',
    name: 'Supervised & Unsupervised Learning',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Overview of Learning Paradigms', topics: ['Classification, clustering, constraints, online one-pass learning'] },
      { unitNumber: 2, title: 'Supervised Learning', topics: ['Perceptrons, Multilayer Neural Networks, Gaussian processes, Support Vector Machines'] },
      { unitNumber: 3, title: 'Unsupervised Learning', topics: ['Dimensionality reduction, spectral clustering, cognitive techniques'] },
      { unitNumber: 4, title: 'Reinforcement Learning', topics: ['Markov Decision Processes (MDP), state abstractions, Q-learning, policy gradients'] },
      { unitNumber: 5, title: 'Deep Reinforcement Learning', topics: ['Monte Carlo Tree Search (MCTS), actor-critic methods, Deep Q-Networks (DQN)'] }
    ],
    textbooks: ['The Elements of Statistical Learning, Hastie, Tibshirani, Friedman.', 'Machine Learning Algorithms for Supervised and Unsupervised Learning, William Sullivan.']
  },
  {
    semesterNumber: 7,
    code: 'BCSAI 703',
    storageCode: 'BCSAI703',
    name: 'Online Machine Learning',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Introduction to Multi-Armed Bandits', topics: ['Bandit algorithms, batch to online setting, regret lower bounds, Halving algorithm'] },
      { unitNumber: 2, title: 'Stochastic Bandit Setting', topics: ['Martingales, Upper Confidence Bound (UCB), KL-UCB'] },
      { unitNumber: 3, title: 'Contextual Bandits', topics: ['Stochastic linear bandits, Kiefer-Wolfowitz theorem, method of mixtures'] },
      { unitNumber: 4, title: 'Pure Exploration', topics: ['Best arm identification, Bayesian bandits, Thompson sampling, Gittins index'] },
      { unitNumber: 5, title: 'Exploration Algorithms', topics: ['LUCB, lil UCB, partial monitoring, optimal policy proof'] }
    ],
    textbooks: ['Bandit Algorithms, Tor Lattimore & Csaba Szepesvari.', 'Bandit Algorithms for Website Optimization, John Myles White.']
  },
  {
    semesterNumber: 7,
    code: 'BCSAI 704',
    storageCode: 'BCSAI704',
    name: 'R Programming Language',
    subjectType: 'THEORY',
    credits: 3.0,
    lectureHours: 2,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Introduction to R Environment', topics: ['R Studio setup, data types, vectors, matrices, arrays, workspace management'] },
      { unitNumber: 2, title: 'Data Structures, Loops & Branching', topics: ['Data frames, lists, lapply, sapply, control flow, vector based programming'] },
      { unitNumber: 3, title: 'Object-Oriented Programming in R', topics: ['S3 and S4 classes, generic functions, method dispatch'] },
      { unitNumber: 4, title: 'R for Statistics', topics: ['Descriptive statistics, hypothesis testing (t-test, ANOVA, chi-square), correlation, regression'] },
      { unitNumber: 5, title: 'Integration with C/C++ and Python', topics: ['Rcpp, calling C++ from R, reticulate package, RPy interface'] }
    ],
    textbooks: ['The Art of R Programming, Norman Matloff.', 'R in Action, Robert I. Kabacoff.']
  },
  {
    semesterNumber: 7,
    code: 'MGT 103',
    storageCode: 'MGT103',
    name: 'Project Formulation and Appraisal',
    subjectType: 'PROJECT',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Project Management & Planning', topics: ['Project life cycle, Gantt charts, CPM, PERT, resource allocation, PEST analysis'] },
      { unitNumber: 2, title: 'Appraisal Methods', topics: ['Technical, financial, economic, and environmental appraisal'] },
      { unitNumber: 3, title: 'Total Quality Management', topics: ['Quality control tools, Six Sigma concepts'] },
      { unitNumber: 4, title: 'Financial Appraisal', topics: ['NPV, IRR, Payback period, cost of capital, capital budgeting'] },
      { unitNumber: 5, title: 'Risk Analysis Models', topics: ['Sensitivity analysis, break-even analysis, decision tree models'] }
    ],
    textbooks: ['Project Management and Appraisal, Sitangshu Khatua, Oxford University Press.']
  },
  {
    semesterNumber: 7,
    code: 'MGT 201',
    storageCode: 'MGT201',
    name: 'Orientation Program in Entrepreneurship',
    subjectType: 'ELECTIVE',
    credits: 2.0,
    lectureHours: 2,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 15,
    eeMarks: 35,
    totalMarks: 50,
    units: [
      { unitNumber: 1, title: 'Entrepreneurship Concepts', topics: ['Traits of an entrepreneur, opportunity identification, business models'] }
    ],
    textbooks: ['Dynamics of Entrepreneurial Development, Vasant Desai.']
  },
  {
    semesterNumber: 7,
    code: 'MBA 204',
    storageCode: 'MBA204',
    name: 'Research Methodology',
    subjectType: 'ELECTIVE',
    credits: 2.0,
    lectureHours: 2,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 15,
    eeMarks: 35,
    totalMarks: 50,
    units: [
      { unitNumber: 1, title: 'Research Design & Methods', topics: ['Sampling design, data collection, hypothesis testing, SPSS, research reporting'] }
    ],
    textbooks: ['Research Methodology, C.R. Kothari.']
  },
  {
    semesterNumber: 7,
    code: 'BCSAI 705',
    storageCode: 'BCSAI705',
    name: 'Fuzzy Logic & Application Lab',
    subjectType: 'PRACTICAL',
    credits: 2.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    caMarks: 15,
    eeMarks: 35,
    totalMarks: 50,
    experiments: [
      { expNumber: 1, title: 'Fuzzy set operations (union, intersection, complement)' },
      { expNumber: 2, title: 'Implementation of membership functions (triangular, trapezoidal, Gaussian)' },
      { expNumber: 3, title: 'Design and simulation of Fuzzy Rule Base' },
      { expNumber: 4, title: 'Building Mamdani Fuzzy Inference System' },
      { expNumber: 5, title: 'Fuzzy logic control system design (tipping model / inverted pendulum)' }
    ]
  },
  {
    semesterNumber: 7,
    code: 'BCSAI 706',
    storageCode: 'BCSAI706',
    name: 'Mini Project',
    subjectType: 'PROJECT',
    credits: 2.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    caMarks: 15,
    eeMarks: 35,
    totalMarks: 50,
    experiments: [
      { expNumber: 1, title: 'Problem definition, literature review, and project synopsis submission' },
      { expNumber: 2, title: 'System design, architecture diagram, and methodology formulation' },
      { expNumber: 3, title: 'Prototype implementation and experimental validation' },
      { expNumber: 4, title: 'Final oral seminar presentation and technical report submission' }
    ]
  },
  {
    semesterNumber: 7,
    code: 'BCSAI 707',
    storageCode: 'BCSAI707',
    name: 'Campus Recruitment Training',
    subjectType: 'PRACTICAL',
    credits: 2.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    caMarks: 15,
    eeMarks: 35,
    totalMarks: 50,
    experiments: [
      { expNumber: 1, title: 'Quantitative Aptitude problem solving (Time & Work, Speed, P&L, Permutations)' },
      { expNumber: 2, title: 'Verbal Ability, Reading Comprehension, Synonyms & Antonyms' },
      { expNumber: 3, title: 'Data Interpretation: Tables, Graphs, Pie charts, Data Sufficiency' },
      { expNumber: 4, title: 'Logical Reasoning: Puzzles, Coding-Decoding, Blood Relations, Syllogisms' }
    ]
  },
  {
    semesterNumber: 7,
    code: 'BCSAI 708',
    storageCode: 'BCSAI708',
    name: 'Anandam-III (Happiness Curriculum)',
    subjectType: 'PRACTICAL',
    credits: 1.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 1,
    caMarks: 10,
    eeMarks: 15,
    totalMarks: 25,
    experiments: [
      { expNumber: 1, title: 'Practicing gratitude and celebrating achievements' },
      { expNumber: 2, title: 'Building human connections and supportive networks' },
      { expNumber: 3, title: 'Art of influence, persuasion, and negotiation' },
      { expNumber: 4, title: 'Stress and anxiety reduction strategies' }
    ]
  },

  // ========================== SEMESTER 8 ==========================
  {
    semesterNumber: 8,
    code: 'BCSAI 801',
    storageCode: 'BCSAI801',
    name: 'Industrial Training / Internship',
    subjectType: 'PRACTICAL',
    credits: 6.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 12,
    caMarks: 50,
    eeMarks: 100,
    totalMarks: 150,
    experiments: [
      { expNumber: 1, title: 'One semester full-time industrial training / internship in IT or AI industry' },
      { expNumber: 2, title: 'Industry work practice, real-life problem solving, and mentor evaluation' },
      { expNumber: 3, title: 'Comprehensive industrial training report and department viva-voce' }
    ]
  },
  {
    semesterNumber: 8,
    code: 'BCSAI 802',
    storageCode: 'BCSAI802',
    name: 'Project',
    subjectType: 'PROJECT',
    credits: 6.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 12,
    caMarks: 50,
    eeMarks: 100,
    totalMarks: 150,
    experiments: [
      { expNumber: 1, title: 'Capstone final-year engineering project implementation' },
      { expNumber: 2, title: 'Department committee evaluation, thesis documentation, and project defense' }
    ]
  },
  {
    semesterNumber: 8,
    code: 'BCSAI 803',
    storageCode: 'BCSAI803',
    name: 'Agile Technology',
    subjectType: 'ELECTIVE',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Agile Methodologies', topics: ['Scrum framework, Sprint planning, Kanban boards, User stories, Continuous Integration'] }
    ],
    textbooks: ['Agile Software Development, Robert C. Martin.']
  },
  {
    semesterNumber: 8,
    code: 'BCSAI 804',
    storageCode: 'BCSAI804',
    name: 'Metaverse',
    subjectType: 'ELECTIVE',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Virtual Worlds & Metaverse Architecture', topics: ['VR/AR hardware, spatial computing, avatar identity, Web3 integration'] }
    ],
    textbooks: ['The Metaverse: And How It Will Revolutionize Everything, Matthew Ball.']
  },
  {
    semesterNumber: 8,
    code: 'BCSAI 805',
    storageCode: 'BCSAI805',
    name: 'Blockchain Technology',
    subjectType: 'ELECTIVE',
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    caMarks: 25,
    eeMarks: 50,
    totalMarks: 75,
    units: [
      { unitNumber: 1, title: 'Enterprise Blockchain Applications', topics: ['Decentralized finance (DeFi), Hyperledger Fabric, smart contracts security'] }
    ],
    textbooks: ['Mastering Blockchain, Imran Bashir.']
  }
];

async function seed() {
  console.log('=== Invertis Learn: Seeding B.Tech CSE (AI) Full Curriculum ===\n');

  // 1. Fetch BTECH-CSE-AI programme
  const programme = await prisma.programme.findUnique({
    where: { code: 'BTECH-CSE-AI' },
    include: { department: true }
  });

  if (!programme) {
    throw new Error('Programme BTECH-CSE-AI not found in database!');
  }
  console.log(`Found Programme: ${programme.name} (${programme.code}) [ID: ${programme.id}]`);

  // 2. Create or update CurriculumVersion
  let cv = await prisma.curriculumVersion.findFirst({
    where: { programmeId: programme.id, versionYear: '2023-2024' }
  });

  if (!cv) {
    cv = await prisma.curriculumVersion.create({
      data: {
        programmeId: programme.id,
        versionYear: '2023-2024',
        regulationName: 'Regulation 2023-24',
        isCurrent: true,
        description: 'Official 4-Year B.Tech CSE with specialization in Artificial Intelligence Curriculum Scheme'
      }
    });
    console.log(`Created CurriculumVersion: ${cv.versionYear} (ID: ${cv.id})`);
  } else {
    cv = await prisma.curriculumVersion.update({
      where: { id: cv.id },
      data: { isCurrent: true }
    });
    console.log(`Updated CurriculumVersion: ${cv.versionYear} (ID: ${cv.id})`);
  }

  // 3. Create or find Semesters 1 to 8
  const roman = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
  const semesterMap = {};
  for (let s = 1; s <= 8; s++) {
    let sem = await prisma.semester.findFirst({
      where: { curriculumVersionId: cv.id, semesterNumber: s }
    });
    if (!sem) {
      sem = await prisma.semester.create({
        data: {
          curriculumVersionId: cv.id,
          semesterNumber: s,
          title: `Semester ${roman[s]}`
        }
      });
      console.log(`Created Semester ${s} (${sem.title}) [ID: ${sem.id}]`);
    }
    semesterMap[s] = sem;
  }

  // 4. Fetch SYLLABUS ResourceCategory
  const syllabusCategory = await prisma.resourceCategory.findUnique({
    where: { code: 'SYLLABUS' }
  });
  if (!syllabusCategory) throw new Error("ResourceCategory 'SYLLABUS' not found!");

  // 5. Seed all subjects
  console.log(`\n--- Seeding ${subjectsData.length} Subjects ---`);
  let subjectCount = 0;
  let resourceCount = 0;

  for (const s of subjectsData) {
    const sem = semesterMap[s.semesterNumber];
    const details = {
      courseCode: s.code,
      courseTitle: s.name,
      credits: s.credits,
      hoursPerWeek: {
        lecture: s.lectureHours,
        tutorial: s.tutorialHours,
        practical: s.practicalHours
      },
      evaluationScheme: {
        continuousAssessment: s.caMarks,
        endSemesterExam: s.eeMarks,
        totalMarks: s.totalMarks
      },
      modules: s.units ? s.units.map(u => ({
        moduleNumber: `Unit ${u.unitNumber}`,
        title: u.title,
        topics: u.topics
      })) : undefined,
      experiments: s.experiments ? s.experiments.map(e => ({
        experimentNumber: e.expNumber,
        title: e.title
      })) : undefined,
      recommendedBooks: s.textbooks || []
    };

    const evalMarksString = `CA: ${s.caMarks}, EE: ${s.eeMarks}, Total: ${s.totalMarks}`;

    // Find or create subject
    let subject = await prisma.subject.findFirst({
      where: { semesterId: sem.id, code: s.code }
    });

    if (!subject) {
      subject = await prisma.subject.create({
        data: {
          semesterId: sem.id,
          code: s.code,
          name: s.name,
          subjectType: s.subjectType,
          credits: s.credits,
          lectureHours: s.lectureHours,
          tutorialHours: s.tutorialHours,
          practicalHours: s.practicalHours,
          evaluationMarks: evalMarksString,
          syllabusDetails: JSON.stringify(details)
        }
      });
      subjectCount++;
    } else {
      subject = await prisma.subject.update({
        where: { id: subject.id },
        data: {
          name: s.name,
          subjectType: s.subjectType,
          credits: s.credits,
          lectureHours: s.lectureHours,
          tutorialHours: s.tutorialHours,
          practicalHours: s.practicalHours,
          evaluationMarks: evalMarksString,
          syllabusDetails: JSON.stringify(details)
        }
      });
    }

    // Link isolated syllabus PDF resource
    const pdfFileName = `${s.storageCode}_Syllabus.pdf`;
    const relativeStoragePath = `uploads/syllabus/subjects/${pdfFileName}`;
    const fullPdfPath = path.join(process.cwd(), 'public', relativeStoragePath);
    let fileSize = 0;
    if (fs.existsSync(fullPdfPath)) {
      fileSize = fs.statSync(fullPdfPath).size;
    }

    let resource = await prisma.academicResource.findFirst({
      where: {
        subjectId: subject.id,
        categoryId: syllabusCategory.id
      }
    });

    if (!resource) {
      await prisma.academicResource.create({
        data: {
          subjectId: subject.id,
          categoryId: syllabusCategory.id,
          title: `${s.name} (${s.code}) Official Syllabus`,
          originalFileName: pdfFileName,
          storedFileName: pdfFileName,
          storagePath: relativeStoragePath,
          mimeType: 'application/pdf',
          fileSizeBytes: fileSize,
          academicYear: '2023-2024',
          isPublished: true
        }
      });
      resourceCount++;
    } else {
      await prisma.academicResource.update({
        where: { id: resource.id },
        data: {
          title: `${s.name} (${s.code}) Official Syllabus`,
          originalFileName: pdfFileName,
          storedFileName: pdfFileName,
          storagePath: relativeStoragePath,
          fileSizeBytes: fileSize,
          isPublished: true
        }
      });
    }
  }

  // 6. Mark programme as having official syllabus
  await prisma.programme.update({
    where: { id: programme.id },
    data: { hasOfficialSyllabus: true }
  });

  console.log(`\nSuccessfully seeded ${subjectsData.length} subjects for BTECH-CSE-AI!`);
  console.log(`Updated Programme 'BTECH-CSE-AI' hasOfficialSyllabus = true`);
}

seed()
  .catch(err => {
    console.error('Seeding error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
