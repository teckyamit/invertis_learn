const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function populateDetails() {
  console.log("=== PARSING AND POPULATING SUBJECT-WISE SYLLABUS DETAILS ===");

  const subjectsDir = path.join(process.cwd(), 'public/uploads/syllabus/subjects');
  
  // Specific detailed syllabi for Semester 1 & 2 core subjects
  const authenticDetails = {
    'BAS101': {
      modules: [
        {
          title: "MODULE - I: Relativistic Mechanics & Interference",
          topics: "Frame of reference, Galilean transformation, Inertial and Non-inertial frames, Postulates of special theory of relativity, Michelson-Morley experiment, Lorentz transformation of space and time, Length contraction, Time dilation, Addition of velocities, Variation of mass with velocity, Equivalence of mass and energy, Momentum-energy transformation equations.\nInterference: Theory of interference of light, Conditions for sustained interference, Classification of interference, Fresnel's Biprism experiment, displacement of fringes, Interference in thin films- wedge shaped film and Newton's rings."
        },
        {
          title: "MODULE - II: Diffraction & Polarization",
          topics: "Diffraction: Single, Double & N-slit Diffraction, Diffraction grating, Grating spectra, Rayleigh's criterion and resolving power of grating.\nPolarization: Phenomena of double refraction, Doubly refracting crystals, Quarter wave plate & Half wave plate, Nicol prism, Production and analysis of plane, circular and elliptical polarized light, Optically active substance, Fresnel's theory of optical activity, Specific rotation and Polarimeters."
        },
        {
          title: "MODULE - III: Laser, Holography & Fiber Optics",
          topics: "Laser and Holography: Spontaneous and stimulated emission of radiation, Einstein's coefficients, construction and working of Ruby, He-Ne lasers and laser applications. Basic Principle of Holography, Construction and reconstruction of Image on hologram and applications of holography.\nFiber Optics: Fundamental ideas about optical fiber, Types of fibers, Acceptance angle and cone, Numerical aperture, Propagation mechanism and communication in optical fiber, Attenuation, Signal loss in optical fiber and dispersion."
        }
      ],
      referenceBooks: [
        "Aurthur Beiser, 'Concepts of Modern Physics' - (Mc-GrawHill)",
        "Robert Resnick - 'Introduction to Special theory of Relativity' - Wiley",
        "Ajoy Ghatak, 'Optics' - (TMH) Brijlal & Subramanian (S. Chand)",
        "Anuradha De., 'Optical Fibre & Laser' - (New Age)"
      ]
    },
    'BEE101': {
      objectives: [
        "To understand and analyze basic Electric and Magnetic circuits.",
        "To study the working principles of Electrical Machines and Power Converters.",
        "To introduce components of Low Voltage Electrical Installations."
      ],
      modules: [
        {
          title: "MODULE - I: D.C. & A.C. Circuits",
          topics: "D.C. Circuits: Electrical circuit elements (R, L and C), voltage and current sources, Kirchhoff current and voltage laws, analysis of simple circuits with dc excitation. Superposition, Thevenin, Maximum Power Transfer and Norton Theorems. Time-domain analysis of first-order RL and RC circuits.\nA.C. Circuits: Representation of sinusoidal waveforms, peak and rms values, phasor representation, real power, reactive power, apparent power, power factor, Analysis of single-phase ac circuits consisting of R, L, C, RL, RC, RLC combinations (series and parallel), resonance. Three-phase balanced circuits, voltage and current relations in star and delta connections."
        },
        {
          title: "MODULE - II: Transformers & Electrical Machines",
          topics: "Transformers: Magnetic materials, BH characteristics, ideal and practical transformer, equivalent circuit, losses in transformers, regulation and efficiency. Auto-transformer and three-phase transformer connections.\nElectrical Machines: Generation of rotating magnetic fields, Construction and working of a three-phase induction motor, Significance of torque-slip characteristic. Loss components and efficiency, starting and speed control of induction motor. Single-phase induction motor. Construction, working, torque-speed characteristic and speed control of separately excited dc motor. Construction and working of synchronous generators."
        },
        {
          title: "MODULE - III: Power Converters & Electrical Installations",
          topics: "Power Converters: DC-DC bucks and boosts converters, duty ratio control. Single-phase and three-phase voltage source inverters; sinusoidal modulation.\nElectrical Installations: Components of LT Switchgear: Switch Fuse Unit (SFU), MCB, ELCB, MCCB, Types of Wires and Cables, Earthing. Types of Batteries, Important Characteristics for Batteries. Elementary calculations for energy consumption, power factor improvement and battery backup."
        }
      ],
      textBooks: [
        "Basic Electrical Engineering - D.P. Kothari and I.J. Nagrath, 3rd edition 2010, Tata McGraw Hill.",
        "Basic Electrical Engineering - D.C. Kulshreshtha, 2009, Tata McGraw Hill."
      ],
      referenceBooks: [
        "S.N. Singh, 'Basic Electrical Engineering' Prentice Hall International",
        "I.J. Nagarath, 'Basic Electrical Engineering' Tata McGraw Hill",
        "Edward Hughes, 'Electrical Technology' Longman",
        "T.K. Nagsarkar & M.S. Sukhija, 'Basic Electrical Engineering' Oxford University Press",
        "H. Cotton, 'Advanced Electrical Technology' Wheeler Publishing",
        "W.H. Hayt & J.E. Kennely, 'Engineering Circuit Analysis' Mc Graw Hill."
      ]
    },
    'BEC101': {
      outcomes: [
        "Understand the concept of PN Junction and devices.",
        "Understand the concept of BJT, FET and MOSFET.",
        "Understand the concept of Operational amplifier.",
        "Understand the concept of measurement instrument.",
        "Understand the working principle of different type of sensor and their uses.",
        "Understand the concept of IoT system & understand the component of IoT system."
      ],
      modules: [
        {
          title: "Unit I: Semiconductor Diodes & Applications",
          topics: "Introduction: Semiconductors, Extrinsic & Intrinsic type, doping, p-n junction diode.\nSemiconductor Diode: Depletion layer, V-I characteristics, ideal and practical Diodes, Diode Equivalent Circuits, Zener Diodes breakdown mechanism (Zener and avalanche).\nDiode Application: Diode Configuration, Half and Full Wave rectification, Clippers, Clampers, Zener diode as shunt regulator, Voltage-Multiplier Circuits."
        },
        {
          title: "Unit II: Bipolar Junction Transistor & Field Effect Transistors",
          topics: "Bipolar Junction Transistor: Transistor Construction, Operation, Amplification action. Common Base, Common Emitter, Common Collector Configuration.\nField Effect Transistor: Construction and Characteristic of JFETs. Transfer Characteristic. MOSFET (MOS) (Depletion and Enhancement) Type, Transfer Characteristic."
        },
        {
          title: "Unit III: Operational Amplifiers",
          topics: "Introduction, Op-Amp Basic, Practical Op-Amp Circuits (Inverting Amplifier, Non-inverting Amplifier, Unit Follower, Summing Amplifier, Integrator, Differentiator). Differential and Common-Mode Operation, Comparators."
        },
        {
          title: "Unit IV: Digital Electronics & Number Systems",
          topics: "Number system & representation. Introduction of Basic and Universal Gates, using Boolean algebra simplification of Boolean function. K Map."
        },
        {
          title: "Unit V: CRO, Sensors & IoT Overview",
          topics: "CRO as Measurement Instrument: CRO (its working with block diagram), measurement of voltage, current, and frequency using CRO.\nIntroduction of IoT System: Components of IoT system, Basic Introduction to Sensors."
        }
      ],
      textBooks: [
        "Robert L. Boylestand / Louis Nashelsky, 'Electronic Devices and Circuit Theory', Pearson Education.",
        "H S Kalsi, 'Electronic Instrumentation', McGraw Publication",
        "George Kennedy, 'Electronic Communication Systems', McGraw Publication",
        "David A. Bell, 'Electronic Devices and Circuits', Oxford University Press.",
        "Jacob Millman, C.C. Halkias, Staya brataJit, 'Electronic Devices and Circuits', McGraw Hill"
      ]
    },
    'BCE101': {
      modules: [
        {
          title: "MODULE - I: Traditional & Computer Graphics",
          topics: "Traditional Engineering Graphics: Principles of Engineering Graphics; Orthographic Projection; Descriptive Geometry; Drawing Principles; Isometric Projection; Surface Development; Perspective; Reading a Drawing; Sectional Views; Dimensioning & Tolerances; True Length, Angle; intersection, Shortest Distance.\nComputer Graphics: Engineering Graphics Software; Spatial Transformations; Orthographic Projections; Model Viewing; Co-ordinate Systems; Multi-view Projection; Exploded Assembly; Model Viewing; Animation; Spatial Manipulation; Surface Modelling; Solid Modelling; Introduction to Building Information Modelling (BIM)."
        }
      ],
      textBooks: [
        "Bhatt N.D., Panchal V.M. & Ingle P.R., (2014), Engineering Drawing, Charotar Publishing House",
        "Shah, M.B. & Rana B.C. (2008), Engineering Drawing and Computer Graphics, Pearson Education",
        "A Primer on Computer Aided Engineering Drawing-2006, Published by VTU, Belgaum."
      ],
      referenceBooks: [
        "Agrawal B. & Agrawal C. M. (2012), Engineering Graphics, TMH Publication",
        "Narayana, K.L. & P Kannaiah (2008), Text book on Engineering Drawing, Scitech Publishers",
        "K.R. Gopalakrishna, 'Engineering Graphics', 32nd edition, 2005 - Subash Publishers Bangalore."
      ]
    },
    'BAS102': {
      modules: [
        {
          title: "MODULE - I: Matrices",
          topics: "Elementary row and column transformation, Rank of matrix, Linear dependence, Consistency of linear system of equations and their solution, Characteristic equation, Caley-Hamilton theorem, Eigen values and eigen vectors, Diagonalisation, Complex and unitary matrices, Application of matrices to engineering problems."
        },
        {
          title: "MODULE - II: Differential Calculus",
          topics: "Differential Calculus-I: Leibnitz theorem, Partial differentiation, Eulers theorem, Curve tracing, Change of variables, Expansion of function of several variables.\nDifferential Calculus-II: Jacobian, approximation of errors, Extrema of functions of several variables, Lagranges method of multipliers (Simple applications)."
        },
        {
          title: "MODULE - III: Fourier Series & Vector Calculus",
          topics: "Fourier Series: Periodic functions, Trigonometric series, Fourier series of period 2 pi, Eulers formulae, Functions having arbitrary period, Change of interval, Even and odd functions, Half range sine and cosine series.\nVector Calculus: Vector differentiation. Velocity, Acceleration of a particle moving on a space curve. Point function, Gradient, divergence and curl of a vector and their physical interpretations."
        }
      ],
      textBooks: [
        "H.K. Dass, Higher Engineering Mathematics, S. Chand Publications.",
        "B.S. Grewal, Engineering Mathematics, Khanna Publishers, 2004."
      ],
      referenceBooks: [
        "R.K. Jain & S.R.K. Iyenger, Advance Engineering Mathematics, Narosa Publishing House, 2002.",
        "B.S. Grewal, Higher Engineering Mathematics, Khanna Publishers, 2005.",
        "E. Kreyszig, Advanced Engineering Mathematics, John Wiley & Sons, 2005.",
        "C. Ray Wylie & Louis C. Barrett, Advanced Engineering Mathematics, Tata Mc Graw-Hill Publishing Company Ltd. 2003",
        "Peter V. O'Neil, Advanced Engineering Mathematics, Thomson (Cengage) Learning, 2007."
      ]
    },
    'BCS101': {
      modules: [
        {
          title: "Module 1: Computer Fundamentals & Organization",
          topics: "Introduction to computers: Data, Information, Computer Definition, Features and Applications, Generations and Features of each Generation.\nBasic Computer Organization: Basic Operations, Anatomy of Computers, I/O units and their functions, Storage Units their functions and types.\nHardware & Software: Definitions and their types, Relationship between hardware and software.\nClassification of Computers: Types of Computers based on mode of use and their features."
        },
        {
          title: "Module 2: Number System & Operating Systems",
          topics: "Number System: Introduction, Positional and Non-Positional types, Types of Positional Number System and Conversions.\nComputer Codes: Introduction, BCD (Binary Coded Decimal), EBCDIC (Extended Binary Coded Decimal Interchange Code), ASCII (American Standard Code for Information Interchange).\nOperating System: Definition and need for OS, Logical Architecture, Basic Functions, Multiprogramming, Multitasking, Multithreading."
        },
        {
          title: "Module 3: Algorithms, Productivity & Languages",
          topics: "Algorithms: Introduction and Definition, Criteria & Notation, Types.\nInternet: Introduction, Evolution and Basic Services, WWW (World Wide Web), Browsers and Uses of the Internet.\nMS-Office: Design Goals of MS-OFFICE, Components of MS-OFFICE: MS-Word, MS-Power Point, MS-Excel, and MS-Access.\nComputer Languages: Introduction, Classification, Advantages & Limitations, Translators."
        }
      ],
      textBooks: [
        "Rajaraman V. - Fundamentals of Computers – PHI"
      ],
      referenceBooks: [
        "Mrs. Chetna Shah & Mr. Kalpesh Patel - Open Office"
      ]
    },
    'BAS151': {
      labExperiments: [
        "Group A: 1. To determine the wavelength of monochromatic light by Newton's ring.",
        "Group A: 2. To determine the wavelength of monochromatic light with the help of Fresnel's biprism.",
        "Group A: 3. To determine the focal length of two lenses by nodal slide and locate the position of cardinal points.",
        "Group A: 4. To determine the specific rotation of cane sugar solution using polarimeter.",
        "Group A: 5. To determine the wavelength of spectral lines using plane transmission grating.",
        "Group A: 6. To study the polarization of light by simple reflection using laser.",
        "Group A: 7. Measurement of Wavelength of a laser (He-Ne) light using single slit diffraction.",
        "Group B: 8. To determine the specific resistance of a given wire using Carey Foster's bridge.",
        "Group B: 9. To study the variation of magnetic field along the axis of current carrying Circular coil and then to estimate the radius of the coil.",
        "Group B: 10. To verify Stefan's Law by electrical method.",
        "Group B: 11. To calibrate the given ammeter and voltmeter by potentiometer.",
        "Group B: 12. To study the Hall effect and determine Hall coefficient, carrier density and mobility of a given semiconductor using Hall effect setup.",
        "Group B: 13. To determine the energy band gap of a given semiconductor material.",
        "Group B: 14. To determine E.C.E. of copper using Tangent or Helmholtz galvanometer.",
        "Group B: 15. To draw hysteresis curve of a given sample of ferromagnetic material and from this to determine magnetic susceptibility and permeability of the given specimen.",
        "Group B: 16. To determine the ballistic constant of a ballistic galvanometer.",
        "Group B: 17. To determine the coefficient of viscosity of a liquid.",
        "Group B: 18. Measurement of fiber attenuation and aperture of fiber.",
        "Group B: 19. High resistance by leakage method.",
        "Group B: 20. Magnetic Susceptibility of paramagnetic solution."
      ]
    },
    'BCS201': {
      outcomes: [
        "To formulate simple algorithms for arithmetic and logical problems.",
        "To translate the algorithms to programs (in C language).",
        "To test and execute the programs and correct syntax and logical errors.",
        "To implement conditional branching, iteration and recursion.",
        "To decompose a problem into functions and synthesize a complete program using divide and conquer approach.",
        "To use arrays, pointers and structures to formulate algorithms and programs.",
        "To apply programming to solve matrix addition and multiplication problems and searching and sorting problems."
      ],
      modules: [
        {
          title: "MODULE-1: Programming in C & Data Types",
          topics: "Programming language and environment: Introduction, Types of Languages and their Advantages and Disadvantages, Comparison, language translators. Programming Environment, Format of C program, Compiling and linking, executing a C Program, Write and execute the first program.\nOverview of 'C': Introduction and history, characteristics, Application, Program development life cycle.\nData Types and Storage Classes: Introduction, Types of data type, Data type modifier, Size and ranges of data types, Tokens, Variables. Storage classes- introduction, types and features."
        },
        {
          title: "MODULE-2: Operators, Control Structures & Functions",
          topics: "Operators and Expressions: Introduction, Types based on operands used, Precedence and Associativity, Arithmetic Expression, Evaluation of Expression, Type Conversions in Expressions, Mathematical Functions.\nDecision Making and Branching: Introduction, Statement and Blocks, Conditional Statements (if statement, Switch statement, Ternary operator, goto statement), The break and continue statement.\nProgram Loops and Iteration: Introduction, Types, Uses of while, do and for loops, multiple loop variables, assignment operators.\nModular Programming: Introduction, advantages, Functions and their types, Declaration and Definition of a function, Scope rules and global variables, separate compilation, and linkage, building your own modules, Call by value and Call by reference."
        },
        {
          title: "MODULE-3: Arrays, Strings, Pointers & File Handling",
          topics: "Arrays and Strings: Introduction, Array notation and representation, Declaring and initializing arrays, Manipulating array elements, using multidimensional arrays, String handling functions.\nStructures: Purpose and usage of structures, declaring and defining structure, Assigning Values to variable, Initializing Structures, Arrays of Structures, Structures and Functions.\nPointers to Objects: Introduction, Void and Null Pointers, Pointer and address arithmetic, pointer operations and declarations, using pointers as function arguments, Pointer and Structure.\nBasic Concepts of Dynamic Memory Allocation, Searching and Sorting, C Preprocessor directives and their types.\nFile Handling: Introduction, Types of Files, Defining, Opening and Closing a File, Input/output Operations on Files, Some Basic Functions."
        }
      ],
      textBooks: [
        "Byron Gottfried, Schaum's Outline of Programming with C, McGraw-Hill",
        "E. Balaguruswamy, Programming in ANSI C, Tata McGraw-Hill"
      ],
      referenceBooks: [
        "Brian W. Kernighan and Dennis M. Ritchie, The C Programming Language, Prentice Hall of India",
        "Jeri R. Hanly, Elliot B. Koffman, 'Problem Solving and Program Design in C', Pearson Addison-Wesley, 2006.",
        "Behrouz A. Forouzan, Richard F. Gilberg, 'Computer Science - A Structured Programming Approach Using C', Thomson, Third Edition, 2007.",
        "Yashwant Kanetker, 'Let us C', BPB Publication, 2008."
      ]
    },
    'BAS201': {
      modules: [
        {
          title: "MODULE-I: Chemical Bonding & Physical States",
          topics: "Chemical bonding: Molecular Orbital Theory and its applications to Homo and Hetero diatomic molecules, Hydrogen bonding and its consequences, Band theory of metals and its applications.\nLiquid crystalline state: Classification and its application. Solid state: Limiting radius ratio (cubic), Bragg's equation. Distinctive allotropes of carbon such as graphite and fullerenes; properties and applications.\nGaseous state: Gas laws, kinetic theory of gases. Reaction kinetics: integrated rate equation for zero, first and second order. Phase rule: water system. Electrochemistry: cell potential, corrosion."
        },
        {
          title: "MODULE-II: Organic Concepts, Mechanisms & Polymers",
          topics: "Concepts of organics: Electronic displacement, stability of carbocation, carbonation, free radical. E-Z nomenclature, R-S configuration, Conformation of n-butane, Nucleophilic substitution.\nReaction mechanisms: Aldol Condensation, Cannizzaro Reaction, Hoffmann Rearrangement, Beckmann rearrangement, Diels Alder reaction.\nPolymers: Addition, condensation, co-ordination polymerization. Elastomers, plastomers, polyamides, polyesters, Conducting Polymers."
        },
        {
          title: "MODULE-III: Spectroscopy, Water & Fuels",
          topics: "Spectroscopy: Elementary idea and simple application of UV, IR and NMR spectral techniques.\nWater: Water processing: boiler feed water (Calgon process), process water (Zeolite process), potable water (ion exchange method).\nFuel: Analysis of coal (proximate and Ultimate) and their implications, calorific value determination (Bomb Calorimeter). Titrimetric analysis: Acid-Base, Redox, Complexometric titrations."
        }
      ],
      textBooks: [
        "Cotton F.A., Wilkinson G., Murillo C.A., 'Advanced Inorganic Chemistry', Wiley, 1992",
        "Smith Michael B. / March Jerry, 'March's Advanced Organic Chemistry', Wiley, 2007",
        "Glaston Samuel B., 'Elements of Physical Chemistry', ELBS, 2005"
      ],
      referenceBooks: [
        "F.W. Billmeyer, 'Text Book of Polymer Science', John Wiley & Sons",
        "M.G. Fontana, 'Corrosion Engineering', McGraw Hill Publications"
      ]
    },
    'BAS202': {
      modules: [
        {
          title: "MODULE-I: Numerical Techniques",
          topics: "Numerical Techniques - I: Zeroes of transcendental and polynomial equation using Bisection method, Regula-falsi method and Newton-Raphson method, Rate of convergence. Interpolation: Finite differences, difference tables, Newton's forward and backward interpolation, Lagrange's and Newton's divided difference formula.\nNumerical Techniques - II: Solution of system of linear equations, Gauss-Seidel method, Crout method. Numerical differentiation, Numerical integration, Trapezoidal, Simpson's 1/3 and 3/8 rules, Runge-Kutta fourth order methods."
        },
        {
          title: "MODULE-II: Statistical Techniques",
          topics: "Statistical Techniques - I: Moments, Moment generating functions, Skewness, Kurtosis, Curve fitting, Method of least squares, Fitting of straight lines, Polynomials, Exponential curves, Correlation, Linear and non-linear regression analysis, Probability theory.\nStatistical Techniques - II: Binomial, Poisson and Normal distributions, Sampling theory (small and large), Tests of significance, Chi-square test, t-test."
        },
        {
          title: "MODULE-III: Multiple Integrals & Vector Calculus",
          topics: "Multiple Integrals: Double and triple integral, Change of order, Change of variables, Beta and Gamma functions, Application to area and volume, Dirichlet integral.\nVector Calculus: Line, surface and volume integrals, Statement and problems of Green's, Stoke's and Gauss divergence theorems."
        }
      ],
      textBooks: [
        "H.K. Dass, Higher Engineering Mathematics, S. Chand Publications.",
        "B.S. Grewal, Engineering Mathematics, Khanna Publishers, 2004."
      ],
      referenceBooks: [
        "R.K. Jain & S.R.K. Iyenger, Advance Engineering Mathematics, Narosa Publishing House, 2002.",
        "E. Kreyszig, Advanced Engineering Mathematics, John Wiley & Sons, 2005.",
        "Peter V. O'Neil, Advanced Engineering Mathematics, Thomson Learning, 2007."
      ]
    },
    'HAS201': {
      outcomes: [
        "The student will acquire basic proficiency in English including reading and listening comprehension, writing and speaking skills."
      ],
      modules: [
        {
          title: "Unit 1: Vocabulary Building & Word Formation",
          topics: "The concept of Word Formation. Root words from foreign languages and their use in English. Acquaintance with prefixes and suffixes. Synonyms, antonyms, and standard abbreviations."
        },
        {
          title: "Unit 2: Basic Writing Skills",
          topics: "Sentence Structures. Use of phrases and clauses in sentences. Importance of proper punctuation. Creating coherence. Organizing principles of paragraphs in documents. Techniques for writing precisely."
        },
        {
          title: "Unit 3: Identifying Common Errors in Writing",
          topics: "Subject-verb agreement. Noun-pronoun agreement. Misplaced modifiers. Articles. Prepositions. Redundancies. Cliches."
        },
        {
          title: "Unit 4: Nature and Style of Sensible Writing",
          topics: "Describing, Defining, Classifying, Providing examples or evidence, Writing introduction and conclusion."
        },
        {
          title: "Unit 5: Writing Practices & Oral Communication",
          topics: "Comprehension, Precis Writing, Essay Writing.\nOral Communication: Listening Comprehension, Pronunciation, Intonation, Stress and Rhythm, Everyday Situations: Conversations and Dialogues at Workplace, Interviews, Formal Presentations."
        }
      ],
      referenceBooks: [
        "Michael Swan, 'Practical English Usage', OUP, 1995.",
        "F.T. Wood, 'Remedial English Grammar', Macmillan, 2007.",
        "Sanjay Kumar and Pushp Lata, 'Communication Skills', Oxford University Press, 2011.",
        "Exercises in Spoken English, Parts I-III, CIEFL, Hyderabad, Oxford University Press."
      ]
    },
    'BME202': {
      objectives: [
        "An introductory treatment of Basic Mechanical Engineering to all students of engineering.",
        "A working knowledge of statics with emphasis on force equilibrium.",
        "Understanding kinds of stress and deformation in practical structural problems.",
        "Understanding IC Engines, refrigerators, air conditioners.",
        "Basic manufacturing processes."
      ],
      outcomes: [
        "CO1: To define force, stress-strain, factor of safety, beams and various laws of thermodynamics.",
        "CO2: Understand basic laws of thermodynamics and their applications.",
        "CO3: Apply laws of thermodynamics on different SFEE devices and compute reactions on beams.",
        "CO4: Differentiate various beams and thermodynamic systems.",
        "CO5: Judge feasibility of a thermodynamic process and Carnot cycle.",
        "CO6: Develop basic knowledge and awareness of various manufacturing processes."
      ],
      modules: [
        {
          title: "MODULE - 1: Introduction to Mechanics of Solids",
          topics: "Normal and shear Stress, strain, Hooke's law, Poisson's ratio, elastic constants and their relationship, stress-strain diagram for ductile and brittle materials, factor of safety. Basic Numerical problems.\nForce, force system, conditions of equilibrium, calculations of reactions, moment, Types of beams under various loads, Statically Determinate Beams, Shear force and bending moment in beams, Shear force and bending moment diagrams."
        },
        {
          title: "MODULE - 2: Introduction to Thermal Engineering",
          topics: "Thermodynamics: Thermodynamic systems, State & properties, Thermodynamic equilibrium & processes, Heat & work, Zeroth law, First law of thermodynamics, Steady flow energy equation, Carnot cycle, Second law of thermodynamics and statements, Concept of entropy.\nIC Engine: Basic Components, Construction and Working of Two stroke and four stroke SI & CI engine, merits and demerits, scavenging process; Introduction to hybrid vehicles.\nRefrigeration and Air-Conditioning: Meaning, working of a simple refrigerator, humidity, dry bulb, wet bulb, and dew point temperatures, window air conditioner."
        },
        {
          title: "MODULE - 3: Introduction to Manufacturing Processes",
          topics: "Engineering Materials and their properties: Metal, non-metal, ferrous, non-ferrous materials, strength, ductility, malleability etc.\nManufacturing Processes: Positive, negative and zero process, casting, joining processes, machining, forming."
        }
      ],
      textBooks: [
        "Engineering Mechanics: Ramamrutham S., 17th edition, Dhanpat Rai Publications, 2002",
        "Engineering Mechanics: S. S. Bhavikatti & Rajshekhrappa, 2nd edition: New Age International Publishers, 2012",
        "Engineering Thermodynamics: P. K. Nag, TMH Publication.",
        "Basic Mechanical Engineering: Dr. D. S. Kumar, S K Kataria & Sons-New Delhi."
      ]
    }
  };

  // Update subjects in database
  for (const [code, details] of Object.entries(authenticDetails)) {
    const sub = await prisma.subject.findFirst({
      where: {
        code: code,
        semester: {
          curriculumVersion: {
            programme: { code: 'BTECH-CSE' }
          }
        }
      }
    });

    if (sub) {
      await prisma.subject.update({
        where: { id: sub.id },
        data: {
          syllabusDetails: JSON.stringify(details)
        }
      });
      console.log(`Updated authentic syllabus details for [${code}] ${sub.name}`);
    }
  }

  console.log("=== ALL SYLLABUS DETAILS POPULATED SUCCESSFULLY ===");
}

populateDetails().catch(console.error).finally(() => prisma.$disconnect());

