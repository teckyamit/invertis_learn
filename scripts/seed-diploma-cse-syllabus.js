const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const DIPLOMA_CURRICULUM = {
  versionYear: "2017-2018",
  regulationName: "Session 2014-15 / 2017-18 Academic Regulations",
  description: "Official 3-Year Diploma in Computer Science & Engineering (Semesters I to VI) curriculum and syllabus structure, with Lateral Entry pathway directly into 2nd Year (Semester III).",
  semesters: [
    {
      semesterNumber: 1,
      title: "Semester I",
      subjects: [
        {
          code: "DAS101",
          name: "Mathematics-I",
          lectureHours: 4,
          tutorialHours: 0,
          practicalHours: 0,
          credits: 4.0,
          subjectType: "THEORY",
          evaluationMarks: "Sessional: 40 (CT: 20, TA: 10, AT: 10), End-Sem: 60, Total: 100",
          syllabusDetails: {
            objectives: "To provide foundational knowledge of series, determinants, vectors, trigonometry, and single-variable differential calculus required for polytechnic engineering disciplines.",
            outcomes: "Students will be able to solve arithmetic/geometric progressions, calculate determinants using Cramer's rule, apply vector algebra, manipulate complex numbers, and compute derivatives of standard algebraic, trigonometric, and exponential functions.",
            modules: [
              {
                title: "Unit I (Series & Progressions)",
                topics: "Arithmetic Progression (A.P.) and Geometric Progression (G.P.): nth term, sum to n terms, Arithmetic Mean and Geometric Mean. Binomial theorem for positive, negative and fractional index (without proof). Practical applications of Binomial theorem."
              },
              {
                title: "Unit II (Determinants & Vector Algebra)",
                topics: "Determinants: Elementary properties of determinants of order 2 and 3, multiplication system of algebraic equations, consistency of linear equations, Cramer's rule.\nVector Algebra: Dot and cross product of two vectors, scalar and vector triple products, work done and moment of a force."
              },
              {
                title: "Unit III (Trigonometry & Complex Numbers)",
                topics: "De Moivre's theorem and its applications, roots of complex numbers, Euler's formula, expansion of sin(nθ) and cos(nθ), circular and hyperbolic functions, inverse hyperbolic functions."
              },
              {
                title: "Unit IV (Differential Calculus - I)",
                topics: "Concept of function, domain and range, limits, standard limits, continuity of a function, differentiability, derivative of simple algebraic, trigonometric, exponential, logarithmic, and inverse functions. Successive differentiation, Leibnitz's theorem."
              }
            ],
            textBooks: [
              "H.K. Dass, \"Applied Mathematics for Polytechnics\", S. Chand & Company Ltd.",
              "B.S. Grewal, \"Higher Engineering Mathematics\", Khanna Publishers."
            ],
            referenceBooks: [
              "Erwin Kreyszig, \"Advanced Engineering Mathematics\", John Wiley & Sons.",
              "R.S. Aggarwal, \"Senior Secondary School Mathematics\", Bharati Bhavan."
            ]
          }
        },
        {
          code: "DAS102",
          name: "Applied Physics",
          lectureHours: 4,
          tutorialHours: 0,
          practicalHours: 0,
          credits: 4.0,
          subjectType: "THEORY",
          evaluationMarks: "Sessional: 40 (CT: 20, TA: 10, AT: 10), End-Sem: 60, Total: 100",
          syllabusDetails: {
            objectives: "To establish fundamental physical concepts in mechanics, properties of matter, heat, electrostatics, and modern optics essential for engineering students.",
            outcomes: "Scholars will understand vector resolution, laws of motion, friction, elasticity, fluid dynamics, thermodynamic principles, electric fields, and basic laser applications.",
            modules: [
              {
                title: "Unit I (Vector & Motion)",
                topics: "Scalar and vector quantities, Cartesian components, scalar and vector products. Parabolic motion, projectiles thrown horizontally and at an angle, time of flight, horizontal range, maximum height. Circular motion, angular velocity, angular acceleration, centripetal and centrifugal forces."
              },
              {
                title: "Unit II (Work, Power, Energy & Friction)",
                topics: "Work done by constant and variable forces, potential and kinetic energy, conservation of mechanical energy. Friction: Static and dynamic friction, laws of friction, angle of friction, angle of repose, rolling friction, lubrication."
              },
              {
                title: "Unit III (Properties of Matter & Fluid Statics)",
                topics: "Elasticity, Hooke's law, Young's, bulk and rigidity modulus. Surface tension, surface energy, capillary action. Viscosity, streamline and turbulent flow, Stokes' law, terminal velocity, Poiseuille's formula, Bernoulli's theorem and applications."
              },
              {
                title: "Unit IV (Heat & Thermodynamics)",
                topics: "Modes of heat transfer: Conduction, convection, radiation. Thermal conductivity, Fourier's law. Laws of thermodynamics: Zeroth, First, and Second laws, isothermal and adiabatic processes, specific heat of gases."
              },
              {
                title: "Unit V (Electrostatics & Modern Physics)",
                topics: "Coulomb's law, electric field, electric potential, Gauss's law and applications. Capacitors, capacitance in series and parallel combinations. Photoelectric effect, Einstein's photoelectric equation. Lasers: Spontaneous and stimulated emission, population inversion, optical fibers."
              }
            ],
            textBooks: [
              "Arthur Beiser, \"Applied Physics\", McGraw-Hill.",
              "R.K. Gaur & S.L. Gupta, \"Engineering Physics\", Dhanpat Rai Publications."
            ],
            referenceBooks: [
              "Resnick, Halliday & Walker, \"Fundamentals of Physics\", Wiley.",
              "Pradeep's Fundamental Physics, Pradeep Publications."
            ]
          }
        },
        {
          code: "DEE101",
          name: "Fundamentals of Electrical & Electronics Engineering",
          lectureHours: 4,
          tutorialHours: 0,
          practicalHours: 0,
          credits: 4.0,
          subjectType: "THEORY",
          evaluationMarks: "Sessional: 40 (CT: 20, TA: 10, AT: 10), End-Sem: 60, Total: 100",
          syllabusDetails: {
            objectives: "To provide foundational concepts of DC circuits, AC circuits, magnetic systems, electrical machines, and basic semiconductor devices.",
            outcomes: "Students will analyze DC circuits using Ohm's and Kirchhoff's laws, compute AC quantities, understand transformer principles, and comprehend diode and transistor operations.",
            modules: [
              {
                title: "Unit 1 (Basic Electrical Terminology & DC Circuits)",
                topics: "Current, EMF, potential difference, resistance, resistivity, conductors and insulators, insulation resistance of cables. Temperature coefficient of resistance. Electrical power, energy and SI units, heating effect of electric current. Ohm's law, Kirchhoff's laws (KCL, KVL) and simple circuit problems."
              },
              {
                title: "Unit 2 (Network Theorems)",
                topics: "Star-delta and delta-star conversions. Superposition theorem, Thevenin's theorem, Norton's theorem, Maximum power transfer theorem applied to direct current networks."
              },
              {
                title: "Unit 3 (AC Fundamentals)",
                topics: "Generation of alternating voltage and current, sinusoidal waveforms, cycle, frequency, time period, amplitude, instantaneous value, average and RMS values, form factor, peak factor. Phasor representation. Behavior of pure R, L, C, series R-L, R-C, and R-L-C circuits, power factor and resonance."
              },
              {
                title: "Unit 4 (Magnetic Circuits & Transformers)",
                topics: "Magnetic field, flux, flux density, magnetic field strength, reluctance, permeability, comparison of electric and magnetic circuits. Faraday's laws of electromagnetic induction, Lenz's law. Single-phase transformer: Principle, construction, EMF equation, turn ratio, losses and efficiency."
              },
              {
                title: "Unit 5 (Semiconductor Devices)",
                topics: "Conductors, insulators, and semiconductors. Intrinsic and extrinsic semiconductors, P-type and N-type. P-N junction diode: Forward and reverse biasing, V-I characteristics. Half-wave and full-wave rectifiers, Zener diode. Bipolar Junction Transistor (BJT): NPN, PNP, CE, CB, CC configurations."
              }
            ],
            textBooks: [
              "V.N. Mittle & Arvind Mittal, \"Basic Electrical Engineering\", McGraw-Hill.",
              "Albert Malvino & David Bates, \"Electronic Principles\", McGraw-Hill."
            ],
            referenceBooks: [
              "B.L. Theraja & A.K. Theraja, \"A Textbook of Electrical Technology\", S. Chand.",
              "Boylestad & Nashelsky, \"Electronic Devices and Circuit Theory\", Pearson."
            ]
          }
        },
        {
          code: "DCS101",
          name: "Fundamentals of Computer",
          lectureHours: 4,
          tutorialHours: 0,
          practicalHours: 0,
          credits: 4.0,
          subjectType: "THEORY",
          evaluationMarks: "Sessional: 40 (CT: 20, TA: 10, AT: 10), End-Sem: 60, Total: 100",
          syllabusDetails: {
            objectives: "To introduce computer architecture, operating system interfaces, binary data representation, office productivity applications, and internet networking basics.",
            outcomes: "Students will identify hardware components, navigate desktop operating systems, convert number systems, produce documents/worksheets, and utilize internet tools securely.",
            modules: [
              {
                title: "Unit-I (Introduction to Computer)",
                topics: "Characteristics of computers, what computers can do and cannot do, classification of digital computer systems, anatomy of digital computer. Usage of computer systems in office, publication, reservation, banking. Components of PC: Mouse, keyboard, CPU, monitor, printers, scanners, modem, memory, sound cards, USB pen drives."
              },
              {
                title: "Unit-II (Operating System Concepts - Windows)",
                topics: "Working with Windows desktop, icons, taskbar, start menu, My Documents, My Computer, Control Panel, Recycle bin. Concepts of drives, folders, files. Windows accessories: Notepad, WordPad, Paint, clock, calendar, calculator."
              },
              {
                title: "Unit-III (Data Representation & Multimedia)",
                topics: "Data representation, ASCII code, EBCDIC code, decimal, binary, octal, hexadecimal number systems and interconversions. Multimedia basics: Digital images, analog to digital conversion, digital audio and digital video."
              },
              {
                title: "Unit-IV (GUI-Based Software - MS Office)",
                topics: "MS-Word: Menus, toolbars, creating, formatting, tables, clipboard. MS-Excel: Working with workbooks, rows, columns, formulas, functions, charts and types. MS-PowerPoint: Slides, presentations, layout, graphs, animation effects, slide sorter, reading view."
              },
              {
                title: "Unit-V (Internet & Algorithms)",
                topics: "History of Internet, equipment required for Internet connection, browsers (Internet Explorer, Mozilla Firefox, Google Chrome). Search engines, emails. Algorithms: Introduction, basic operations, pseudocode and flowcharts. VDU and printers, raster scanning, display terminals."
              }
            ],
            textBooks: [
              "P.K. Sinha & Priti Sinha, \"Computer Fundamentals\", BPB Publications.",
              "V. Rajaraman, \"Fundamentals of Computers\", Prentice Hall of India."
            ],
            referenceBooks: [
              "Peter Norton, \"Introduction to Computers\", McGraw-Hill.",
              "ITL Education Solutions, \"Introduction to Information Technology\", Pearson."
            ]
          }
        },
        {
          code: "DAS152",
          name: "Applied Physics Lab",
          lectureHours: 0,
          tutorialHours: 0,
          practicalHours: 3,
          credits: 2.0,
          subjectType: "PRACTICAL",
          evaluationMarks: "Sessional: 50, End-Sem: 50, Total: 100",
          syllabusDetails: {
            objectives: "To verify physical laws and measurement principles through laboratory experiments.",
            outcomes: "Students gain practical mastery of precision measuring instruments, mechanics apparatus, and optics experiments.",
            labExperiments: [
              "Measurement of dimensions of a cylinder and sphere using Vernier Calipers.",
              "Measurement of wire diameter and thickness of metal sheets using Screw Gauge.",
              "Determination of radius of curvature of a spherical surface using a Spherometer.",
              "Determination of acceleration due to gravity (g) using a Simple Pendulum.",
              "Verification of Parallelogram Law of Forces.",
              "Determination of coefficient of viscosity of a liquid using Stokes' Method.",
              "Determination of focal length of a convex lens using u-v method.",
              "Measurement of surface tension of water using capillary rise method.",
              "Determination of refractive index of glass prism using spectrometer."
            ]
          }
        },
        {
          code: "DEE151",
          name: "Electrical & Electronics Lab",
          lectureHours: 0,
          tutorialHours: 0,
          practicalHours: 2,
          credits: 2.0,
          subjectType: "PRACTICAL",
          evaluationMarks: "Sessional: 50, End-Sem: 50, Total: 100",
          syllabusDetails: {
            objectives: "To provide hands-on experience in circuit assembly, measuring electrical quantities, and characterizing semiconductor diodes.",
            outcomes: "Students will be able to construct basic circuits, use multimeters and oscilloscopes, verify circuit laws, and measure rectifier performance.",
            labExperiments: [
              "Verification of Ohm's Law and calculation of resistance.",
              "Verification of Kirchhoff's Current Law (KCL) and Kirchhoff's Voltage Law (KVL).",
              "Measurement of voltage, current, and power in DC series and parallel circuits.",
              "Calibration of ammeter and voltmeter using standard meters.",
              "Plotting V-I characteristics of a P-N junction diode under forward and reverse bias.",
              "Measurement of ripple factor and efficiency of Half-Wave and Full-Wave Rectifiers.",
              "Testing and study of Zener diode voltage regulation characteristics."
            ]
          }
        },
        {
          code: "DCS151",
          name: "Computer Concept Lab",
          lectureHours: 0,
          tutorialHours: 0,
          practicalHours: 2,
          credits: 2.0,
          subjectType: "PRACTICAL",
          evaluationMarks: "Sessional: 50, End-Sem: 50, Total: 100",
          syllabusDetails: {
            objectives: "To provide practical fluency in PC hardware identification, operating system navigation, document creation, data analysis, and presentations.",
            outcomes: "Students will configure PC systems, format documents, write Excel formulas, build presentation slide decks, and execute internet operations.",
            labExperiments: [
              "Demonstration and identification of internal PC hardware components (CPU, RAM, HDD/SSD, SMPS, motherboard expansion slots).",
              "Operating System navigation: File management, folder structures, file attributes, Control Panel settings, and accessories.",
              "MS-Word: Creation of professional resume and technical report with headers, footers, tables, and borders.",
              "MS-Excel: Creating student marksheets, calculating total, percentage, grade using IF conditions and SUM/AVERAGE functions.",
              "MS-Excel: Data visualization using bar charts, pie charts, line graphs, and conditional formatting.",
              "MS-PowerPoint: Developing a 10-slide technical presentation incorporating slide transitions, animations, and graphics.",
              "Internet utilities: Web search techniques, email account configuration, attachments, and cloud storage backup."
            ]
          }
        },
        {
          code: "DCE151",
          name: "Engineering Drawing - I",
          lectureHours: 0,
          tutorialHours: 0,
          practicalHours: 2,
          credits: 2.0,
          subjectType: "PRACTICAL",
          evaluationMarks: "Sessional: 50, End-Sem: 50, Total: 100",
          syllabusDetails: {
            objectives: "To develop spatial visualization skills and introduce standards of engineering graphics, projection techniques, and dimensioning.",
            outcomes: "Students will produce technical drawings adhering to Indian Standard (IS) conventions, construct scales, and project orthographic views.",
            labExperiments: [
              "Drawing instruments, sheet layout, borders, title block, and IS code conventions.",
              "Lettering techniques: Vertical and inclined single-stroke letters and numerals (Sheet 1).",
              "Dimensioning rules and practice of aligned and unidirectional dimensioning systems (Sheet 2).",
              "Construction of Plain Scales and Diagonal Scales (Sheet 3).",
              "Orthographic projections of points situated in all four quadrants (Sheet 4).",
              "Orthographic projections of straight lines parallel, inclined to one or both reference planes (Sheet 5).",
              "Projections of simple regular planes (triangle, square, hexagon, circle) (Sheet 6)."
            ]
          }
        },
        {
          code: "GP101",
          name: "General Proficiency",
          lectureHours: 0,
          tutorialHours: 0,
          practicalHours: 0,
          credits: 1.0,
          subjectType: "PRACTICAL",
          evaluationMarks: "Sessional: 50, Total: 50",
          syllabusDetails: {
            objectives: "To assess and develop student conduct, discipline, punctuality, institutional engagement, and extracurricular participation.",
            outcomes: "Demonstrated professional etiquette, active team collaboration, disciplined academic presence, and co-curricular contribution."
          }
        }
      ]
    },
    {
      semesterNumber: 2,
      title: "Semester II",
      subjects: [
        {
          code: "DAS201",
          name: "Mathematics-II",
          lectureHours: 4,
          tutorialHours: 0,
          practicalHours: 0,
          credits: 4.0,
          subjectType: "THEORY",
          evaluationMarks: "Sessional: 40 (CT: 20, TA: 10, AT: 10), End-Sem: 60, Total: 100",
          syllabusDetails: {
            objectives: "To provide advanced mathematical tools in set theory, differential calculus, integral calculus, and first-order ordinary differential equations.",
            outcomes: "Students will apply set relations and mappings, evaluate higher-order derivatives, compute definite and indefinite integrals, calculate areas and volumes, and solve first-order differential equations.",
            modules: [
              {
                title: "Unit I (Set Theory & Relations)",
                topics: "Set theory: Sets, subsets, relations, equivalence relations, equivalence classes. Functions and mappings: Injective, surjective, bijective mappings, composition of functions, inverse mapping."
              },
              {
                title: "Unit II (Differential Calculus - II)",
                topics: "Higher order derivatives, Taylor's and Maclaurin's series for single variable functions. Partial differentiation, Euler's theorem for homogeneous functions. Tangents and normals, maxima and minima of single variable functions."
              },
              {
                title: "Unit III (Integral Calculus)",
                topics: "Integration: Concept of integration as anti-derivatives. Integration of elementary functions, integration by substitution, integration by parts, integration by partial fractions. Definite integrals: Definition, properties, evaluation of simple definite integrals."
              },
              {
                title: "Unit IV (Applications of Integration)",
                topics: "Applications of definite integrals: Finding areas bounded by plane curves, length of plane curves. Volumes and surface areas of solids of revolution. Numerical integration: Trapezoidal rule and Simpson's 1/3rd rule."
              },
              {
                title: "Unit V (Differential Equations)",
                topics: "Differential equations: Definition, order and degree of a differential equation. Formation of differential equations. Solution of first order and first degree differential equations: Separation of variables, homogeneous equations, linear differential equations, Bernoulli's equation."
              }
            ],
            textBooks: [
              "H.K. Dass, \"Applied Mathematics-II for Polytechnics\", S. Chand & Company Ltd.",
              "B.S. Grewal, \"Higher Engineering Mathematics\", Khanna Publishers."
            ],
            referenceBooks: [
              "Erwin Kreyszig, \"Advanced Engineering Mathematics\", John Wiley & Sons.",
              "N.P. Bali & Manish Goyal, \"A Textbook of Engineering Mathematics\", Laxmi Publications."
            ]
          }
        },
        {
          code: "DAS203",
          name: "Applied Chemistry",
          lectureHours: 4,
          tutorialHours: 0,
          practicalHours: 0,
          credits: 4.0,
          subjectType: "THEORY",
          evaluationMarks: "Sessional: 40 (CT: 20, TA: 10, AT: 10), End-Sem: 60, Total: 100",
          syllabusDetails: {
            objectives: "To impart essential chemical concepts covering atomic structure, water treatment, fuels, corrosion, and modern polymers relevant to engineering applications.",
            outcomes: "Students will understand atomic orbital principles, analyze water hardness and softening techniques, evaluate fuels, understand corrosion mechanisms, and identify engineering polymers.",
            modules: [
              {
                title: "Unit I (Atomic Structure & Chemical Bonding)",
                topics: "Basic concept of atomic structure, de-Broglie wave equation, quantum numbers, Heisenberg's uncertainty principle, shapes of s, p, and d orbitals. Chemical bonding: Ionic, covalent, coordinate bonds. Molecular Orbital Theory (MOT) applied to homonuclear and heteronuclear diatomic molecules, hydrogen bonding."
              },
              {
                title: "Unit II (Water Technology)",
                topics: "Hardness of water: Types of hardness (temporary and permanent), units of hardness. Estimation of hardness by EDTA method. Boiler troubles: Scale and sludge formation, priming and foaming, caustic embrittlement. Water softening methods: Lime-soda process, Zeolite process, Ion-exchange demineralization."
              },
              {
                title: "Unit III (Fuels & Combustion)",
                topics: "Classification of fuels, calorific value, gross and net calorific value (GCV and NCV), determination of calorific value by Bomb Calorimeter. Solid fuels: Proximate and ultimate analysis of coal. Liquid fuels: Petroleum refining, knocking, octane number, cetane number."
              },
              {
                title: "Unit IV (Corrosion & Lubrication)",
                topics: "Corrosion: Definition, dry and wet (electrochemical) corrosion, galvanic series, factors affecting corrosion rate, prevention methods (cathodic protection, sacrificial anode, metallic coatings). Lubricants: Functions, mechanism of lubrication, properties (viscosity, flash and fire point, cloud and pour point)."
              },
              {
                title: "Unit V (Polymers & Engineering Materials)",
                topics: "Polymers: Classification, addition and condensation polymerization. Preparation, properties, and applications of polyethylene, PVC, Teflon, Bakelite, and Nylon-6,6. Brief introduction to composites, refractory materials, and Portland cement."
              }
            ],
            textBooks: [
              "P.C. Jain & Monika Jain, \"Engineering Chemistry\", Dhanpat Rai Publishing Company.",
              "S.S. Dara, \"A Textbook of Engineering Chemistry\", S. Chand & Company."
            ],
            referenceBooks: [
              "Shashi Chawla, \"A Textbook of Engineering Chemistry\", Dhanpat Rai Publications.",
              "Gopi K. Nayak, \"Applied Chemistry for Polytechnics\", Foundation Books."
            ]
          }
        },
        {
          code: "DMC201",
          name: "Fundamentals of Mechanical & Civil Engineering",
          lectureHours: 4,
          tutorialHours: 0,
          practicalHours: 0,
          credits: 4.0,
          subjectType: "THEORY",
          evaluationMarks: "Sessional: 40 (CT: 20, TA: 10, AT: 10), End-Sem: 60, Total: 100",
          syllabusDetails: {
            objectives: "To provide an integrated understanding of thermal/fluid systems, prime movers, building materials, construction practices, and land surveying.",
            outcomes: "Students will describe energy sources and boilers, explain IC engine mechanisms, identify construction materials, and understand surveying principles.",
            modules: [
              {
                title: "Part A - Unit 1 (Sources of Energy & Fuels)",
                topics: "Sources of energy: Conventional and non-conventional forms - thermal, hydel, tidal, wind, solar, biomass, nuclear energy. Common fuels: Solid, liquid, gaseous fuels, higher and lower calorific values, combustion equations."
              },
              {
                title: "Part A - Unit 2 (Steam Generators & Prime Movers)",
                topics: "Steam generators: Classification of boilers, Cochran boiler, Babcock and Wilcox boiler, boiler mountings (safety valve, water level indicator, pressure gauge) and accessories (economizer, superheater, air preheater). Internal Combustion (IC) engines: 2-stroke and 4-stroke petrol and diesel engines, working cycles."
              },
              {
                title: "Part A - Unit 3 (Power Transmission)",
                topics: "Elements of power transmission: Belt drives, rope drives, chain drives, gear drives. Comparison of belt, chain, and gear drives, velocity ratio, slip, creep, and types of gears."
              },
              {
                title: "Part B - Unit 4 (Civil Engineering Building Materials)",
                topics: "Building materials: Bricks (characteristics of good brick, classification), stones (quarrying, dressing), cement (types and setting properties), sand, aggregate, mortar, plain and reinforced cement concrete (PCC and RCC), timber (types, seasoning)."
              },
              {
                title: "Part B - Unit 5 (Building Construction & Surveying)",
                topics: "Foundations: Types of shallow and deep foundations. Masonry construction: Brick masonry bonds (English and Flemish bonds). Surveying: Chain surveying, instruments, chaining, ranging, prismatic compass surveying, concept of leveling, bench marks, and reduced levels."
              }
            ],
            textBooks: [
              "Pravin Kumar, \"Basic Mechanical Engineering\", Pearson Education.",
              "B.C. Punmia, \"Basic Civil Engineering\", Laxmi Publications."
            ],
            referenceBooks: [
              "R.K. Rajput, \"Basic Mechanical Engineering\", Laxmi Publications.",
              "S. Ramamrutham, \"Basic Civil Engineering\", Dhanpat Rai Publications."
            ]
          }
        },
        {
          code: "DME201",
          name: "Fundamentals of Mechanics",
          lectureHours: 4,
          tutorialHours: 0,
          practicalHours: 0,
          credits: 4.0,
          subjectType: "THEORY",
          evaluationMarks: "Sessional: 40 (CT: 20, TA: 10, AT: 10), End-Sem: 60, Total: 100",
          syllabusDetails: {
            objectives: "To develop problem-solving capability in static equilibrium, coplanar force systems, centroids, friction, and mechanics of materials.",
            outcomes: "Students will calculate force resultants, solve equilibrium problems using Lami's theorem, locate centroids, determine mechanical advantage, and calculate stress-strain relationships.",
            modules: [
              {
                title: "Unit 1 (Introduction & Force Systems)",
                topics: "Mechanics and its utility. Concept of scalar and vector quantities, effect of a force, tension and compression, rigid body. Principle of physical independence of forces, principle of transmissibility of forces. Coplanar and non-coplanar forces, concurrent, parallel, and non-concurrent force systems."
              },
              {
                title: "Unit 2 (Equilibrium & Moments)",
                topics: "Resultant of forces: Parallelogram law of forces, triangle law of forces, polygon law of forces. Resolution and composition of forces. Moments and couples: Varignon's theorem, conditions of equilibrium for concurrent and coplanar forces, Lami's theorem."
              },
              {
                title: "Unit 3 (Center of Gravity & Centroid)",
                topics: "Concept of center of gravity and centroid. Centroids of plane figures: Rectangle, triangle, circle, semi-circle. Centroids of composite sections: T-section, I-section, L-section, channel section."
              },
              {
                title: "Unit 4 (Friction & Simple Machines)",
                topics: "Friction: Types of friction, laws of static friction, limiting friction, coefficient of friction, angle of friction, angle of repose. Simple machines: Mechanical advantage (MA), velocity ratio (VR), efficiency, law of machine, reversible and self-locking machines, simple screw jack, wheel and axle."
              },
              {
                title: "Unit 5 (Stresses, Strains & Thin Shells)",
                topics: "Concept of stress and strain, tensile, compressive, and shear stress, Hooke's law, modulus of elasticity, Poisson's ratio, stress-strain curve for mild steel. Introduction to thin cylindrical and spherical shells subjected to internal pressure, longitudinal and circumferential stresses."
              }
            ],
            textBooks: [
              "R.K. Bansal, \"A Textbook of Engineering Mechanics\", Laxmi Publications.",
              "R.S. Khurmi, \"Applied Mechanics\", S. Chand & Company."
            ],
            referenceBooks: [
              "D.S. Kumar, \"Engineering Mechanics\", S.K. Kataria & Sons.",
              "S.S. Bhavikatti, \"Engineering Mechanics\", New Age International."
            ]
          }
        },
        {
          code: "DAS253",
          name: "Applied Chemistry Lab",
          lectureHours: 0,
          tutorialHours: 0,
          practicalHours: 3,
          credits: 2.0,
          subjectType: "PRACTICAL",
          evaluationMarks: "Sessional: 50, End-Sem: 50, Total: 100",
          syllabusDetails: {
            objectives: "To perform quantitative chemical analysis including water quality testing, fuel proximate analysis, and lubricant characterization.",
            outcomes: "Students will determine water hardness, measure pH, quantify moisture and ash in coal, and measure oil flash point and viscosity.",
            labExperiments: [
              "Determination of temporary and permanent hardness of water sample using standard EDTA solution.",
              "Determination of total alkalinity of water sample using phenolphthalein and methyl orange indicators.",
              "Measurement of pH of various chemical solutions using digital pH meter and pH paper.",
              "Determination of moisture, volatile matter, and ash content in a coal sample (Proximate Analysis).",
              "Determination of Flash Point and Fire Point of lubricating oils using Pensky-Martens apparatus.",
              "Measurement of kinematic viscosity of lubricating oils using Redwood Viscometer.",
              "Preparation of a urea-formaldehyde / phenol-formaldehyde resin in the laboratory."
            ]
          }
        },
        {
          code: "DMC251",
          name: "Civil & Mechanical Lab",
          lectureHours: 0,
          tutorialHours: 0,
          practicalHours: 2,
          credits: 2.0,
          subjectType: "PRACTICAL",
          evaluationMarks: "Sessional: 50, End-Sem: 50, Total: 100",
          syllabusDetails: {
            objectives: "To conduct experimental testing on construction materials, mechanical engines, and basic land survey operations.",
            outcomes: "Students will determine compressive strength of bricks, test steel tensile limits on UTM, inspect engine components, and execute chain and compass survey.",
            labExperiments: [
              "Determination of compressive strength of common building bricks using Compression Testing Machine.",
              "Tensile testing of mild steel specimen on Universal Testing Machine (UTM) and plotting stress-strain graph.",
              "Study and performance demonstration of two-stroke and four-stroke petrol engine cut models.",
              "Study and performance demonstration of two-stroke and four-stroke diesel engine cut models.",
              "Study of high-pressure and low-pressure boiler models (Babcock & Wilcox and Lancashire Boilers).",
              "Chain surveying: Measuring distance between stations, chaining, ranging, and setting perpendicular offsets.",
              "Prismatic compass surveying: Measurement of fore and back bearings of a closed traverse."
            ]
          }
        },
        {
          code: "DME251",
          name: "Workshop Practice",
          lectureHours: 0,
          tutorialHours: 0,
          practicalHours: 2,
          credits: 2.0,
          subjectType: "PRACTICAL",
          evaluationMarks: "Sessional: 50, End-Sem: 50, Total: 100",
          syllabusDetails: {
            objectives: "To impart fundamental manufacturing skills across carpentry, fitting, welding, sheet metal, and plumbing shops.",
            outcomes: "Students will produce timber joints, perform manual metal filing, execute electric arc welding, fabricate sheet metal utensils, and thread plumbing pipes.",
            labExperiments: [
              "Carpentry Shop: Identification of carpentry tools; preparation of Half-Lap Joint and Mortise & Tenon Joint.",
              "Fitting Shop: Filing, sawing, marking, drilling, and preparation of a square or V-groove fitting job from mild steel plate.",
              "Welding Shop: Demonstration of Arc and Gas welding equipment; preparation of Lap Joint and Butt Joint using manual metal arc welding.",
              "Sheet Metal Shop: Development of patterns and fabrication of a rectangular sheet metal tray with wired edges.",
              "Plumbing Shop: Cutting, threading, and assembling G.I. pipes with elbows, tees, unions, and gate valves."
            ]
          }
        },
        {
          code: "DCE251",
          name: "Engineering Drawing - II",
          lectureHours: 0,
          tutorialHours: 0,
          practicalHours: 2,
          credits: 2.0,
          subjectType: "PRACTICAL",
          evaluationMarks: "Sessional: 50, End-Sem: 50, Total: 100",
          syllabusDetails: {
            objectives: "To advance technical drawing skills into isometric projections, sections of solids, surface developments, and fasteners.",
            outcomes: "Students will construct isometric views, draw section planes through solids, develop lateral surfaces, and render mechanical fasteners.",
            labExperiments: [
              "Projections of regular solids: Prisms, pyramids, cylinders, and cones inclined to reference planes (Sheet 1).",
              "Sections of solids: Section plane parallel and inclined to reference planes, true shape of sections (Sheet 2).",
              "Development of lateral surfaces of right prisms, cylinders, pyramids, and truncated cones (Sheet 3).",
              "Isometric projections of plane figures, prisms, cylinders, and composite solids (Sheet 4).",
              "Thread profiles: Metric, Whitworth, square, acme, and knuckle threads (Sheet 5).",
              "Drawings of hexagonal and square head bolts, nuts, washers, studs, and foundation bolts (Sheet 6)."
            ]
          }
        },
        {
          code: "GP201",
          name: "General Proficiency",
          lectureHours: 0,
          tutorialHours: 0,
          practicalHours: 0,
          credits: 1.0,
          subjectType: "PRACTICAL",
          evaluationMarks: "Sessional: 50, Total: 50",
          syllabusDetails: {
            objectives: "To evaluate discipline, professional growth, institutional activities, and semester conduct.",
            outcomes: "Demonstrated adherence to code of conduct, teamwork, attendance compliance, and active participation in engineering exhibitions."
          }
        }
      ]
    },
    {
      semesterNumber: 3,
      title: "Semester III",
      subjects: [
        {
          code: "DCS301",
          name: "Digital Electronics",
          lectureHours: 3,
          tutorialHours: 1,
          practicalHours: 0,
          credits: 4.0,
          subjectType: "THEORY",
          evaluationMarks: "Sessional: 40 (CT: 20, TA: 10, AT: 10), End-Sem: 60, Total: 100",
          syllabusDetails: {
            objectives: "To understand number systems, Boolean logic simplification, combinational circuit design, flip-flops, and sequential circuit architectures.",
            outcomes: "Students will be able to minimize Boolean functions, design adders, decoders, multiplexers, build synchronous/asynchronous counters, and analyze shift registers.",
            modules: [
              {
                title: "Unit 1 (Number Systems & Codes)",
                topics: "Review of number systems: Binary, octal, decimal, hexadecimal. Inter-conversions. Complements: 1's and 2's complements, binary subtraction. Binary codes: BCD, Excess-3, Gray code, parity bits, Hamming code for error detection and correction."
              },
              {
                title: "Unit 2 (Boolean Algebra & Logic Gates)",
                topics: "Logic gates: AND, OR, NOT, NAND, NOR, XOR, XNOR. Universal logic gates. Boolean algebra laws, De Morgan's theorems. Standard representation of logic functions: SOP and POS forms. Karnaugh Maps (K-Map) up to 4 variables, don't care conditions. Quine-McCluskey tabular minimization."
              },
              {
                title: "Unit 3 (Combinational Logic Circuits)",
                topics: "Arithmetic circuits: Half adder, full adder, half subtractor, full subtractor, 4-bit parallel binary adder/subtractor, look-ahead carry adder. Data processing circuits: Multiplexers (2:1, 4:1, 8:1, 16:1), Demultiplexers/Decoders (1:4, 1:8, 3:8 decoder), Encoders, Priority encoders, BCD to 7-segment decoders/drivers, Magnitude comparators."
              },
              {
                title: "Unit 4 (Sequential Logic Circuits)",
                topics: "Flip-Flops: Comparison of combinational and sequential circuits, latches vs flip-flops. RS latch, clocked RS flip-flop, D flip-flop, JK flip-flop, Master-Slave JK flip-flop, T flip-flop. Triggering of flip-flops (edge and level). Excitation tables, flip-flop conversions."
              },
              {
                title: "Unit 5 (Registers & Counters)",
                topics: "Registers: Shift registers, modes of operation - SISO, SIPO, PISO, PIPO, universal shift register, bidirectional shift registers. Counters: Asynchronous (ripple) counters, mod-N ripple counters, synchronous counters, up/down counters, Ring counter, Johnson counter. Semiconductor memories: ROM, PROM, EPROM, EEPROM, RAM."
              }
            ],
            textBooks: [
              "R.P. Jain, \"Modern Digital Electronics\", Tata McGraw-Hill.",
              "M. Morris Mano, \"Digital Logic and Computer Design\", Prentice Hall of India."
            ],
            referenceBooks: [
              "I.J. Nagrath, \"Electronics Analog and Digital\", Prentice Hall of India Ltd.",
              "Malvino & Leach, \"Digital Principles and Applications\", McGraw-Hill."
            ]
          }
        },
        {
          code: "DCS302",
          name: "Operating Systems",
          lectureHours: 3,
          tutorialHours: 1,
          practicalHours: 0,
          credits: 4.0,
          subjectType: "THEORY",
          evaluationMarks: "Sessional: 40 (CT: 20, TA: 10, AT: 10), End-Sem: 60, Total: 100",
          syllabusDetails: {
            objectives: "To provide an understanding of OS design principles, process management, scheduling algorithms, memory virtualization, deadlocks, and storage systems.",
            outcomes: "Students will analyze operating system structures, evaluate CPU scheduling algorithms, solve concurrency problems using semaphores, manage deadlocks, and analyze virtual memory paging.",
            modules: [
              {
                title: "Unit 1 (Operating System Overview)",
                topics: "Introduction to operating systems, evolution of OS: Batch processing, multiprogramming, multitasking, time-sharing, real-time operating systems, distributed systems. Operating system services, system calls, system programs, operating system structure: Monolithic, layered, microkernel, and modular architectures."
              },
              {
                title: "Unit 2 (Process Management & CPU Scheduling)",
                topics: "Process concept, process states, Process Control Block (PCB), process scheduling queues, context switching, inter-process communication (IPC). Threads: User-level and kernel-level threads. CPU scheduling: Scheduling criteria, algorithms - First-Come First-Served (FCFS), Shortest Job First (SJF), Priority scheduling, Round Robin (RR), Multilevel Queue scheduling."
              },
              {
                title: "Unit 3 (Process Synchronization & Deadlocks)",
                topics: "Inter-process synchronization: Critical section problem, Peterson's solution, hardware synchronization, semaphores, classic synchronization problems (Producer-Consumer, Dining Philosophers, Readers-Writers). Deadlocks: Characterization, resource allocation graphs, deadlock prevention, deadlock avoidance (Banker's algorithm), deadlock detection and recovery."
              },
              {
                title: "Unit 4 (Memory Management)",
                topics: "Logical vs physical address space, swapping, contiguous memory allocation (First-fit, Best-fit, Worst-fit), fragmentation (internal and external), paging, page table structure, segmentation. Virtual memory: Demand paging, page fault handling, page replacement algorithms (FIFO, Optimal, LRU), thrashing."
              },
              {
                title: "Unit 5 (File Systems & Secondary Storage)",
                topics: "File concept, file access methods (sequential, direct), directory structures (single-level, two-level, tree-structured), file allocation methods (contiguous, linked, indexed), free-space management. Secondary storage: Disk structure, disk scheduling algorithms (FCFS, SSTF, SCAN, C-SCAN, LOOK), RAID levels."
              }
            ],
            textBooks: [
              "Abraham Silberschatz, Peter B. Galvin & Greg Gagne, \"Operating System Concepts\", John Wiley & Sons.",
              "William Stallings, \"Operating Systems: Internals and Design Principles\", Pearson."
            ],
            referenceBooks: [
              "Harvey M. Deitel, \"An Introduction to Operating Systems\", Addison Wesley.",
              "Milan Milenkovic, \"Operating Systems: Concepts and Design\", McGraw-Hill."
            ]
          }
        },
        {
          code: "DCS303",
          name: "Programming in 'C'",
          lectureHours: 3,
          tutorialHours: 1,
          practicalHours: 0,
          credits: 4.0,
          subjectType: "THEORY",
          evaluationMarks: "Sessional: 40 (CT: 20, TA: 10, AT: 10), End-Sem: 60, Total: 100",
          syllabusDetails: {
            objectives: "To develop procedural programming competence, structured algorithm design, pointer arithmetic, memory management, and file handling in C.",
            outcomes: "Students will write robust C programs utilizing arrays, user-defined functions, recursion, dynamic memory allocation, complex structures, and persistent file input/output.",
            modules: [
              {
                title: "Unit 1 (Introduction to C Programming)",
                topics: "History and features of C, structure of a C program, compilation and execution. Character set, tokens, identifiers, keywords, data types, qualifiers, variables, constants. Operators: Arithmetic, relational, logical, assignment, increment/decrement, conditional, bitwise, sizeof. Operator precedence and associativity, type conversion and casting."
              },
              {
                title: "Unit 2 (Control Flow & Loops)",
                topics: "Decision making: if statement, if-else statement, nested if-else, else-if ladder, switch-case statement. Iterative statements: while loop, do-while loop, for loop, nested loops. Jump statements: break, continue, goto, exit."
              },
              {
                title: "Unit 3 (Arrays, Strings & Functions)",
                topics: "Arrays: Declaration, initialization, 1D and 2D arrays, matrix operations (addition, multiplication, transpose). Strings: Character arrays, string literals, string input/output (gets, puts, scanf, printf), string manipulation functions (strlen, strcpy, strcat, strcmp, strrev). Functions: Prototyping, definition, function calls, pass by value, pass by reference, recursion."
              },
              {
                title: "Unit 4 (Pointers & Dynamic Memory Allocation)",
                topics: "Pointers: Concept, pointer variables, address-of (&) and dereferencing (*) operators, pointer arithmetic, pointer to pointer, pointers and arrays, array of pointers, pointers as function arguments, returning pointers. Dynamic memory allocation: malloc, calloc, realloc, free, memory leak handling."
              },
              {
                title: "Unit 5 (Structures, Unions & File Handling)",
                topics: "Structures: Declaration, initialization, accessing structure members, array of structures, nested structures, structures and functions, structure pointers. Unions: Definition and comparison with structures, bit fields, typedef. File management: File streams, file opening modes (r, w, a, r+, w+, a+), file I/O functions (fgetc, fputc, fgets, fputs, fscanf, fprintf, fread, fwrite), file position pointers (fseek, ftell, rewind)."
              }
            ],
            textBooks: [
              "E. Balagurusamy, \"Programming in ANSI C\", Tata McGraw-Hill.",
              "Yashavant Kanetkar, \"Let Us C\", BPB Publications."
            ],
            referenceBooks: [
              "Brian W. Kernighan & Dennis M. Ritchie, \"The C Programming Language\", Prentice Hall.",
              "Byron Gottfried, \"Programming with C\", Schaum's Outlines, McGraw-Hill."
            ]
          }
        },
        {
          code: "DCS304",
          name: "Discrete Structures",
          lectureHours: 3,
          tutorialHours: 1,
          practicalHours: 0,
          credits: 4.0,
          subjectType: "THEORY",
          evaluationMarks: "Sessional: 40 (CT: 20, TA: 10, AT: 10), End-Sem: 60, Total: 100",
          syllabusDetails: {
            objectives: "To introduce mathematical foundations of computer science including set theory, logic, algebraic structures, combinatorics, and graph algorithms.",
            outcomes: "Students will construct formal mathematical proofs, manipulate propositional statements, analyze partially ordered sets, solve recurrence relations, and apply graph theory models.",
            modules: [
              {
                title: "Unit 1 (Sets, Relations & Functions)",
                topics: "Sets and operations: Union, intersection, complement, Cartesian product, power sets. Relations: Reflexive, symmetric, transitive, anti-symmetric relations, equivalence relations, equivalence classes. Partial order relations, Posets, Hasse diagrams, maximal, minimal, greatest and least elements, Lattices. Functions: Injective, surjective, bijective, composition, inverse functions."
              },
              {
                title: "Unit 2 (Propositional & Predicate Logic)",
                topics: "Propositions, logical connectives (negation, conjunction, disjunction, implication, biconditional), truth tables, tautologies, contradictions, logical equivalences. Rules of inference, valid arguments. Predicate logic: Predicates, quantifiers (universal and existential), negation of quantified statements, methods of proof: Direct proof, indirect proof, proof by contradiction, mathematical induction."
              },
              {
                title: "Unit 3 (Algebraic Structures)",
                topics: "Binary operations and their properties. Algebraic systems: Semigroups, monoids, groups, abelian groups, subgroups, cyclic groups, cosets, Lagrange's theorem, homomorphism and isomorphism of groups. Introduction to rings, integral domains, and fields."
              },
              {
                title: "Unit 4 (Combinatorics & Recurrence Relations)",
                topics: "Counting techniques: Fundamental principles of counting, permutations and combinations, Pigeonhole principle, Inclusion-Exclusion principle. Recurrence relations: Formulating recurrence relations, solving linear recurrence relations with constant coefficients (homogeneous and non-homogeneous), generating functions."
              },
              {
                title: "Unit 5 (Graph Theory & Trees)",
                topics: "Graphs: Basic definitions, vertices, edges, degree of a vertex, handshaking theorem, simple graphs, multigraphs, directed and undirected graphs. Graph representations: Adjacency matrix, incidence matrix. Paths, cycles, Eulerian and Hamiltonian paths and circuits, planar graphs, Kuratowski's theorem, graph coloring, chromatic number. Trees: Definition, properties, binary trees, spanning trees, minimum spanning tree (Prim's and Kruskal's algorithms)."
              }
            ],
            textBooks: [
              "Kenneth H. Rosen, \"Discrete Mathematics and Its Applications\", Tata McGraw-Hill.",
              "B. Kolman, R.C. Busby & S.C. Ross, \"Discrete Mathematical Structures\", Pearson."
            ],
            referenceBooks: [
              "C.L. Liu, \"Elements of Discrete Mathematics\", Tata McGraw-Hill.",
              "J.P. Tremblay & R. Manohar, \"Discrete Mathematical Structures with Applications to Computer Science\", McGraw-Hill."
            ]
          }
        },
        {
          code: "DCS305",
          name: "IT Infrastructure",
          lectureHours: 3,
          tutorialHours: 1,
          practicalHours: 0,
          credits: 4.0,
          subjectType: "THEORY",
          evaluationMarks: "Sessional: 40 (CT: 20, TA: 10, AT: 10), End-Sem: 60, Total: 100",
          syllabusDetails: {
            objectives: "To provide knowledge of enterprise IT infrastructure components, data center architecture, enterprise storage solutions, virtualization, and network security policies.",
            outcomes: "Students will be able to describe IT infrastructure layers, configure enterprise storage (DAS, NAS, SAN, RAID), evaluate hypervisors, and formulate security incident response plans.",
            modules: [
              {
                title: "Unit 1 (Introduction to IT Infrastructure)",
                topics: "Definitions, components of IT infrastructure, evolution from mainframe to cloud, client-server computing. Data center architecture: Tiers, power, cooling, cabling, rack management, server types (rack, tower, blade servers). ITIL framework overview and service lifecycle."
              },
              {
                title: "Unit 2 (Storage Management Technologies)",
                topics: "Storage architectures: Direct-Attached Storage (DAS), Network-Attached Storage (NAS), Storage Area Network (SAN). Fiber Channel and iSCSI protocols. RAID levels (RAID 0, 1, 5, 6, 10). Backup and recovery strategies, snapshot management, disaster recovery planning and Business Continuity (BCP)."
              },
              {
                title: "Unit 3 (Networking & Server Administration)",
                topics: "Network infrastructure: Managed switches, routers, firewalls, VLANs, structured cabling, patch panels. Server roles: Domain Controller, Active Directory, DNS, DHCP, print and file servers. Operating system deployment and configuration management."
              },
              {
                title: "Unit 4 (Virtualization Technologies)",
                topics: "Virtualization concepts: Hypervisors (Type-1 bare metal, Type-2 hosted). VMware ESXi, Microsoft Hyper-V, KVM, VirtualBox. Server consolidation, virtual networking, virtual storage, live migration, high availability clusters. Containerization basics: Docker vs virtual machines."
              },
              {
                title: "Unit 5 (Information Security & Cyber Ethics)",
                topics: "Information security principles: CIA triad (Confidentiality, Integrity, Availability). Cyber threats, malware, ransomware, social engineering, denial of service (DoS/DDoS). Security measures: Antivirus, intrusion detection and prevention systems (IDS/IPS), patch management, access control lists, cyber ethics and IT compliance."
              }
            ],
            textBooks: [
              "Sjaak Laan, \"IT Infrastructure Architecture: Infrastructure Building Blocks and Concepts\", Lulu.com.",
              "Manoj Kumar Chouhan, \"IT Infrastructure and Its Management\", Dreamtech Press."
            ],
            referenceBooks: [
              "Kathy Schwalbe, \"Information Technology Project Management\", Cengage Learning.",
              "Mark Burgess, \"Principles of Network and System Administration\", John Wiley & Sons."
            ]
          }
        },
        {
          code: "DEC351",
          name: "Digital Electronics Lab",
          lectureHours: 0,
          tutorialHours: 0,
          practicalHours: 4,
          credits: 2.0,
          subjectType: "PRACTICAL",
          evaluationMarks: "Sessional: 50, End-Sem: 50, Total: 100",
          syllabusDetails: {
            objectives: "To construct, verify, and debug digital logic circuits on breadboards and digital trainers.",
            outcomes: "Students will build truth tables for logic gates, verify universal gate implementations, assemble combinational circuits, and test flip-flops and counters.",
            labExperiments: [
              "Verification of truth tables of basic logic gates (AND, OR, NOT, NAND, NOR, XOR, XNOR) using TTL ICs.",
              "Implementation of basic logic gates using universal gates (NAND and NOR gates).",
              "Breadboard design and verification of Half Adder and Full Adder circuits using basic gates.",
              "Design and verification of Half Subtractor and Full Subtractor circuits.",
              "Implementation of 4-bit parallel binary adder and subtractor using IC 7483.",
              "Study and verification of Multiplexer (IC 74151) and Demultiplexer/Decoder (IC 74138).",
              "Breadboard implementation and verification of RS, D, JK, and T Flip-Flops.",
              "Design and verification of 4-bit Asynchronous (Ripple) Counter and Synchronous Counter using JK Flip-Flops."
            ]
          }
        },
        {
          code: "DCS352",
          name: "Operating Systems Lab (UNIX/LINUX)",
          lectureHours: 0,
          tutorialHours: 0,
          practicalHours: 4,
          credits: 2.0,
          subjectType: "PRACTICAL",
          evaluationMarks: "Sessional: 50, End-Sem: 50, Total: 100",
          syllabusDetails: {
            objectives: "To develop command-line proficiency in UNIX/Linux environments, write shell scripts, and implement OS scheduling algorithms.",
            outcomes: "Students will execute file/process management commands, write shell programs with conditional and loop constructs, and simulate CPU scheduling algorithms.",
            labExperiments: [
              "Familiarization with Linux command line interface: Directory operations (pwd, cd, mkdir, rmdir, ls -la).",
              "File handling commands: cat, cp, mv, rm, touch, head, tail, grep, find, wc, chmod, chown.",
              "Process monitoring and management commands: ps, top, kill, nice, pstree, background (&), foreground (fg).",
              "Shell programming - Part I: Variables, arithmetic operators, user input, conditional execution (if-else, case).",
              "Shell programming - Part II: Loops (for, while, until), string comparisons, writing administrative backup scripts.",
              "Implementation of CPU Scheduling algorithm in C: First-Come First-Served (FCFS).",
              "Implementation of CPU Scheduling algorithm in C: Shortest Job First (SJF) and Round Robin (RR).",
              "Implementation of Page Replacement algorithms in C: First-In First-Out (FIFO) and Least Recently Used (LRU)."
            ]
          }
        },
        {
          code: "DCS353",
          name: "Programming in 'C' Lab",
          lectureHours: 0,
          tutorialHours: 0,
          practicalHours: 4,
          credits: 2.0,
          subjectType: "PRACTICAL",
          evaluationMarks: "Sessional: 50, End-Sem: 50, Total: 100",
          syllabusDetails: {
            objectives: "To implement structured C programs solving numerical, mathematical, and real-world computational problems.",
            outcomes: "Students will write, compile, test, and debug programs incorporating multidimensional arrays, string libraries, pointers, recursion, and file manipulation.",
            labExperiments: [
              "Programs on decision making and branching: Quadratic equation roots, leap year verification, grade calculation.",
              "Programs on loops: Prime number generation, Fibonacci series, Armstrong numbers, Pascal's triangle.",
              "Programs on 1D arrays: Linear search, binary search, finding minimum/maximum elements, bubble sort.",
              "Programs on 2D arrays: Matrix addition, matrix subtraction, matrix multiplication, and transpose calculation.",
              "Programs on strings: String length, copy, concatenate, reverse, and palindrome check without using string library functions.",
              "Programs on functions and recursion: Factorial, GCD using Euclidean algorithm, Tower of Hanoi problem.",
              "Programs on pointers: Swapping two numbers using pointers, array element traversal using pointer arithmetic.",
              "Programs on structures and files: Student record management system storing and reading data from text files."
            ]
          }
        },
        {
          code: "DCS355",
          name: "IT Infrastructure Lab",
          lectureHours: 0,
          tutorialHours: 0,
          practicalHours: 4,
          credits: 2.0,
          subjectType: "PRACTICAL",
          evaluationMarks: "Sessional: 50, End-Sem: 50, Total: 100",
          syllabusDetails: {
            objectives: "To acquire hands-on mastery of computer hardware maintenance, local area network cabling, operating system installation, and hypervisor management.",
            outcomes: "Students will assemble PC systems, crimp Ethernet cables, configure TCP/IP networks, set up virtual machines, and administer backup operations.",
            labExperiments: [
              "Disassembly and re-assembly of desktop computer system, identifying processor socket, RAM slots, chipsets, and peripheral interfaces.",
              "BIOS/UEFI setup: Boot sequence configuration, system time, CPU overclocking settings, and security passwords.",
              "Operating System installation: Partitioning hard drives, clean installation of Windows and Ubuntu Linux.",
              "Network cabling: Preparing straight-through and crossover UTP cables using RJ-45 connectors, crimping tool, and cable tester.",
              "Local Area Network (LAN) setup: IP address allocation (static vs dynamic), subnet masking, ping test, and file/printer sharing.",
              "Hypervisor installation and virtual machine deployment using VMware Workstation / VirtualBox.",
              "Data backup and restoration: Creating system restore points, disk cloning using cloning software, and scheduled automated backups."
            ]
          }
        },
        {
          code: "GP301",
          name: "Discipline & General Proficiency",
          lectureHours: 0,
          tutorialHours: 0,
          practicalHours: 0,
          credits: 1.0,
          subjectType: "PRACTICAL",
          evaluationMarks: "Sessional: 100, Total: 100",
          syllabusDetails: {
            objectives: "To foster professional discipline, teamwork, communication skills, technical society involvement, and institutional ethics.",
            outcomes: "Demonstrated professional conduct, punctual academic performance, team engagement, and participation in co-curricular workshops."
          }
        }
      ]
    },
    {
      semesterNumber: 4,
      title: "Semester IV",
      subjects: [
        {
          code: "DCS401",
          name: "Data Structures with 'C'",
          lectureHours: 3,
          tutorialHours: 1,
          practicalHours: 0,
          credits: 4.0,
          subjectType: "THEORY",
          evaluationMarks: "Sessional: 40 (CT: 20, TA: 10, AT: 10), End-Sem: 60, Total: 100",
          syllabusDetails: {
            objectives: "To understand abstract data types (ADTs), algorithm complexity, linear data structures (arrays, stacks, queues, linked lists), and non-linear data structures (trees, graphs).",
            outcomes: "Students will analyze time/space complexity, implement stack and queue applications, manipulate linked lists, execute tree traversals, and apply sorting/searching algorithms.",
            modules: [
              {
                title: "Unit 1 (Introduction & Arrays)",
                topics: "Concept of data structures, classification: Primitive and non-primitive, linear and non-linear data structures. Abstract Data Types (ADT). Algorithm analysis: Time complexity, space complexity, Big-O, Omega, Theta notations. Arrays: Single and multidimensional arrays, address calculation in row-major and column-major order, sparse matrices."
              },
              {
                title: "Unit 2 (Stacks & Queues)",
                topics: "Stacks: Definition, array implementation of stack, operations (push, pop, peek), overflow and underflow conditions. Applications of stack: Infix to postfix conversion, evaluation of postfix expressions, recursion simulation. Queues: Definition, array implementation, operations (enqueue, dequeue), circular queue, priority queue, double-ended queue (deque)."
              },
              {
                title: "Unit 3 (Linked Lists)",
                topics: "Linked lists: Dynamic memory vs static allocation, Singly linked list: Traversal, searching, insertion (at beginning, at end, after given node), deletion (from beginning, from end, specific node). Circular linked list, Doubly linked list. Linked implementation of stacks and queues. Polynomial representation and addition using linked lists."
              },
              {
                title: "Unit 4 (Trees & Graphs)",
                topics: "Trees: Basic terminology (root, leaf, height, depth, degree), binary trees, complete binary tree, strictly binary tree. Tree traversals: Pre-order, in-order, post-order (recursive and non-recursive). Binary Search Tree (BST): Searching, insertion, deletion. Introduction to AVL trees and B-Trees. Graphs: Terminology, adjacency matrix and adjacency list representations, graph traversals - Breadth-First Search (BFS) and Depth-First Search (DFS)."
              },
              {
                title: "Unit 5 (Searching & Sorting Algorithms)",
                topics: "Searching algorithms: Linear search, binary search (iterative and recursive), complexity analysis. Sorting algorithms: Bubble sort, selection sort, insertion sort, quick sort (divide and conquer), merge sort, heap sort. Comparison of sorting algorithms in best, average, and worst-case performance."
              }
            ],
            textBooks: [
              "Ellis Horowitz, Sartaj Sahni & Susan Anderson-Freed, \"Fundamentals of Data Structures in C\", Silicon Press / Universities Press.",
              "Aaron M. Tenenbaum, Yedidyah Langsam & Moshe J. Augenstein, \"Data Structures Using C and C++\", Prentice Hall of India."
            ],
            referenceBooks: [
              "Robert L. Kruse, Bruce P. Leung & Clovis L. Tondo, \"Data Structures and Program Design in C\", Pearson.",
              "Seymour Lipschutz, \"Data Structures with C\", Schaum's Outline Series, McGraw-Hill."
            ]
          }
        },
        {
          code: "DCS402",
          name: "OOP's with C++",
          lectureHours: 3,
          tutorialHours: 1,
          practicalHours: 0,
          credits: 4.0,
          subjectType: "THEORY",
          evaluationMarks: "Sessional: 40 (CT: 20, TA: 10, AT: 10), End-Sem: 60, Total: 100",
          syllabusDetails: {
            objectives: "To learn object-oriented programming paradigms, class architecture, encapsulation, inheritance, operator overloading, polymorphism, templates, and exception handling in C++.",
            outcomes: "Students will build object-oriented software utilizing classes, manage object lifecycle with constructors, implement inheritance hierarchies, resolve dynamic binding, and write template code.",
            modules: [
              {
                title: "Unit 1 (Introduction to Object-Oriented Programming & C++)",
                topics: "Comparison of procedural programming and object-oriented programming (OOP). Key concepts: Objects, classes, data abstraction, encapsulation, inheritance, polymorphism, dynamic binding, message passing. C++ tokens, variables, constants, reference variables, scope resolution operator (::), cin, cout, inline functions, default arguments, function overloading."
              },
              {
                title: "Unit 2 (Classes & Objects)",
                topics: "Class declaration, defining member functions inside and outside the class, private, public, protected access specifiers. Memory allocation for objects, array of objects, arrays as class member data, static data members and static member functions. Friend functions and friend classes, returning objects."
              },
              {
                title: "Unit 3 (Constructors, Destructors & Operator Overloading)",
                topics: "Constructors: Purpose, default constructor, parameterized constructor, copy constructor, dynamic constructor, constructor overloading. Destructors. Operator overloading: Overloading unary operators, overloading binary operators (using member function and friend function), overloading << and >> stream operators, data type conversions (basic to class, class to basic, class to class)."
              },
              {
                title: "Unit 4 (Inheritance, Pointers & Polymorphism)",
                topics: "Inheritance: Base and derived classes, visibility modes (public, private, protected), types of inheritance: Single, multilevel, multiple, hierarchical, hybrid inheritance. Ambiguity resolution, virtual base classes, constructors in derived classes. Pointers to objects, this pointer, pointers to derived classes, virtual functions, pure virtual functions, abstract classes."
              },
              {
                title: "Unit 5 (File Streams, Templates & Exception Handling)",
                topics: "C++ I/O streams, stream classes hierarchy, unformatted and formatted I/O, file stream classes (ifstream, ofstream, fstream), opening and closing files, reading and writing objects. Templates: Function templates, class templates, templates with multiple arguments. Exception handling: try, catch, throw blocks, rethrowing exceptions."
              }
            ],
            textBooks: [
              "E. Balagurusamy, \"Object Oriented Programming with C++\", Tata McGraw-Hill.",
              "Robert Lafore, \"Object-Oriented Programming in C++\", Pearson."
            ],
            referenceBooks: [
              "Bjarne Stroustrup, \"The C++ Programming Language\", Addison-Wesley.",
              "Herbert Schildt, \"C++: The Complete Reference\", McGraw-Hill."
            ]
          }
        },
        {
          code: "DCS403",
          name: "Computer Organization",
          lectureHours: 3,
          tutorialHours: 1,
          practicalHours: 0,
          credits: 4.0,
          subjectType: "THEORY",
          evaluationMarks: "Sessional: 40 (CT: 20, TA: 10, AT: 10), End-Sem: 60, Total: 100",
          syllabusDetails: {
            objectives: "To understand register transfer logic, basic computer instruction cycles, CPU microarchitecture, arithmetic algorithms, memory hierarchies, and I/O bus systems.",
            outcomes: "Students will analyze computer micro-operations, design control units, explain RISC/CISC paradigms, execute Booth's multiplication, analyze cache mapping, and evaluate DMA transfers.",
            modules: [
              {
                title: "Unit 1 (Register Transfer & Micro-operations)",
                topics: "Register transfer language (RTL), bus and memory transfers, three-state bus buffers. Arithmetic micro-operations: Binary adder, binary adder-subtractor, arithmetic circuit. Logic micro-operations, shift micro-operations (logical, circular, arithmetic shifts). Arithmetic Logic Shift Unit (ALSU)."
              },
              {
                title: "Unit 2 (Basic Computer Organization & Instruction Cycle)",
                topics: "Instruction codes, computer registers (AR, PC, DR, AC, IR, TR, INPR, OUTR), common bus system. Computer instructions: Memory-reference, register-reference, and input-output instructions. Timing and control signals, instruction cycle: Fetch, decode, execute, memory-reference execution, interrupt cycle."
              },
              {
                title: "Unit 3 (Central Processing Unit (CPU))",
                topics: "General register organization, stack organization (register stack, memory stack), reverse Polish notation. Instruction formats: Three-address, two-address, one-address, zero-address instructions. Addressing modes: Direct, indirect, register, register indirect, immediate, displacement, relative, indexed addressing. RISC vs CISC architecture characteristics."
              },
              {
                title: "Unit 4 (Computer Arithmetic)",
                topics: "Addition and subtraction with signed-magnitude data, 2's complement representation. Multiplication algorithms: Hardware multiplier, Booth's multiplication algorithm for signed 2's complement integers. Division algorithms: Restoring and non-restoring division algorithms. Floating-point arithmetic operations."
              },
              {
                title: "Unit 5 (Memory Hierarchy & Input-Output Organization)",
                topics: "Memory hierarchy, main memory (RAM, ROM chips, memory address map), auxiliary memory (magnetic disks, SSDs), associative memory. Cache memory: Cache hit/miss, mapping functions (direct, associative, set-associative mapping), cache write policies. Virtual memory: Address translation, paging. Input-Output interface, asynchronous data transfer (strobe, handshaking), programmed I/O, interrupt-driven I/O, Direct Memory Access (DMA)."
              }
            ],
            textBooks: [
              "M. Morris Mano, \"Computer System Architecture\", Prentice Hall of India.",
              "Carl Hamacher, Zvonko Vranesic & Safwat Zaky, \"Computer Organization\", McGraw-Hill."
            ],
            referenceBooks: [
              "William Stallings, \"Computer Organization and Architecture\", Pearson.",
              "John P. Hayes, \"Computer Architecture and Organization\", McGraw-Hill."
            ]
          }
        },
        {
          code: "DCS404",
          name: "E-Commerce",
          lectureHours: 3,
          tutorialHours: 1,
          practicalHours: 0,
          credits: 4.0,
          subjectType: "THEORY",
          evaluationMarks: "Sessional: 40 (CT: 20, TA: 10, AT: 10), End-Sem: 60, Total: 100",
          syllabusDetails: {
            objectives: "To study electronic commerce models, web technologies, digital payment infrastructures, cyber security threats, encryption, and legal frameworks.",
            outcomes: "Students will differentiate e-business models, describe online payment mechanisms, analyze security vulnerabilities, explain digital signatures, and navigate the IT Act 2000.",
            modules: [
              {
                title: "Unit 1 (Introduction to E-Commerce & Business Models)",
                topics: "Definition, origin, and development of E-Commerce. Comparison of traditional commerce and electronic commerce, advantages and disadvantages of E-Commerce. Business models: Business-to-Consumer (B2C), Business-to-Business (B2B), Consumer-to-Consumer (C2C), Consumer-to-Business (C2B), Government-to-Citizen (G2C). Electronic Data Interchange (EDI) and supply chain integration."
              },
              {
                title: "Unit 2 (E-Commerce Infrastructure & Technologies)",
                topics: "Internet, Intranet, and Extranet. World Wide Web (WWW) architecture, domain name system (DNS), web servers, application servers, database servers. Mobile Commerce (M-Commerce): Features, mobile payment applications, wireless technologies (4G/5G, Wi-Fi)."
              },
              {
                title: "Unit 3 (Electronic Payment Systems)",
                topics: "Overview of electronic payment systems, electronic cash, credit cards, debit cards, smart cards, electronic wallets (e-wallets), net banking, Unified Payments Interface (UPI). Electronic Fund Transfer (EFT), Automated Clearing House (ACH). Payment gateways, risks involved in online payments, fraud detection."
              },
              {
                title: "Unit 4 (Security in E-Commerce)",
                topics: "Security threats in e-commerce: Malicious code, phishing, credit card fraud, sniffing, spoofing, denial of service attacks. Security tools: Encryption (symmetric and asymmetric cryptography, DES, RSA), Public Key Infrastructure (PKI), digital signatures, digital certificates, Secure Socket Layer (SSL/TLS), firewalls."
              },
              {
                title: "Unit 5 (Online Marketing & Legal Environment)",
                topics: "Internet marketing concepts: Search Engine Optimization (SEO), Search Engine Marketing (SEM), email marketing, social media marketing, affiliate marketing. Legal and regulatory issues: Information Technology Act 2000 (IT Act), cyber crimes, intellectual property rights (patents, copyrights, trademarks), privacy issues and consumer protection."
              }
            ],
            textBooks: [
              "Kenneth C. Laudon & Carol Guercio Traver, \"E-Commerce: Business, Technology, Society\", Pearson Education.",
              "Gary P. Schneider, \"Electronic Commerce\", Cengage Learning."
            ],
            referenceBooks: [
              "K.K. Bajaj & Debjani Nag, \"E-Commerce: The Cutting Edge of Business\", Tata McGraw-Hill.",
              "P.T. Joseph, \"E-Commerce: An Indian Perspective\", Prentice Hall of India."
            ]
          }
        },
        {
          code: "DAS405",
          name: "Industrial Management",
          lectureHours: 3,
          tutorialHours: 1,
          practicalHours: 0,
          credits: 4.0,
          subjectType: "THEORY",
          evaluationMarks: "Sessional: 40 (CT: 20, TA: 10, AT: 10), End-Sem: 60, Total: 100",
          syllabusDetails: {
            objectives: "To teach management principles, organizational behavior, industrial relations, operations management, quality assurance, and factory regulations.",
            outcomes: "Students will apply management functions, evaluate organizational structures, analyze production scheduling, calculate Economic Order Quantity, and understand workplace safety laws.",
            modules: [
              {
                title: "Unit 1 (Principles of Management)",
                topics: "Definition, nature, scope, and significance of management. Evolution of management thought: Taylor's Scientific Management, Fayol's 14 Principles of Administrative Management, Hawthorne studies. Functions of management: Planning, organizing, staffing, directing, controlling. Decision making process."
              },
              {
                title: "Unit 2 (Forms of Business Organization & Structures)",
                topics: "Ownership forms: Sole proprietorship, partnership, joint-stock company (private and public limited), cooperative societies, public sector enterprises. Organizational structure: Line organization, functional organization, line and staff organization, matrix organization. Authority, responsibility, delegation, and decentralization."
              },
              {
                title: "Unit 3 (Human Resource Management & Industrial Relations)",
                topics: "Recruitment, selection process, induction, training and development methods. Performance appraisal, job evaluation, merit rating. Wage and incentive schemes: Time rate, piece rate, Taylor's differential piece rate, Halsey and Rowan incentive plans. Industrial relations: Causes of industrial disputes, trade unions, collective bargaining, settlement mechanisms."
              },
              {
                title: "Unit 4 (Production Planning & Inventory Control)",
                topics: "Plant location factors, plant layout types (product, process, fixed position layout). Production planning and control (PPC): Routing, scheduling, dispatching, expediting. Inventory management: Purpose of inventory, ABC analysis, Economic Order Quantity (EOQ) formula, safety stock, lead time."
              },
              {
                title: "Unit 5 (Quality Management & Industrial Legislation)",
                topics: "Total Quality Management (TQM), Quality Circles, ISO 9000 quality standards, statistical quality control (control charts for variables and attributes). Industrial safety: Causes of industrial accidents, safety precautions, Factories Act 1948 provisions regarding health, safety, and welfare of workers, Workmen's Compensation Act."
              }
            ],
            textBooks: [
              "L.M. Prasad, \"Principles and Practice of Management\", Sultan Chand & Sons.",
              "O.P. Khanna, \"Industrial Engineering and Management\", Dhanpat Rai Publications."
            ],
            referenceBooks: [
              "T.N. Chhabra, \"Principles and Practice of Management\", Dhanpat Rai & Sons.",
              "Harold Koontz & Heinz Weihrich, \"Essentials of Management\", Tata McGraw-Hill."
            ]
          }
        },
        {
          code: "DCS451",
          name: "Data Structures Lab",
          lectureHours: 0,
          tutorialHours: 0,
          practicalHours: 4,
          credits: 2.0,
          subjectType: "PRACTICAL",
          evaluationMarks: "Sessional: 50, End-Sem: 50, Total: 100",
          syllabusDetails: {
            objectives: "To develop practical algorithmic programs implementing core data structures and sorting algorithms in C.",
            outcomes: "Students will program array algorithms, stacks, queues, linked lists, trees, and benchmark various sorting techniques.",
            labExperiments: [
              "Array implementation of Stack ADT: Push, Pop, Peek, and display operations.",
              "Application of Stack: Conversion of Infix arithmetic expression to Postfix expression.",
              "Application of Stack: Evaluation of Postfix expression using stack.",
              "Array implementation of Linear Queue ADT: Enqueue, Dequeue, and display operations.",
              "Implementation of Circular Queue with proper overflow and underflow condition checks.",
              "Implementation of Singly Linked List: Insertion and deletion at beginning, middle, and end.",
              "Implementation of Doubly Linked List with bidirectional traversal.",
              "Implementation of Binary Search Tree (BST): Insertion, node deletion, and in-order traversal.",
              "Implementation and comparison of Quick Sort and Merge Sort algorithms."
            ]
          }
        },
        {
          code: "DCS452",
          name: "OOPs Lab",
          lectureHours: 0,
          tutorialHours: 0,
          practicalHours: 4,
          credits: 2.0,
          subjectType: "PRACTICAL",
          evaluationMarks: "Sessional: 50, End-Sem: 50, Total: 100",
          syllabusDetails: {
            objectives: "To implement object-oriented systems in C++ showcasing classes, constructors, operator overloading, and inheritance.",
            outcomes: "Students will write C++ programs verifying encapsulation, operator overloading, multiple inheritance, runtime polymorphism, and file stream I/O.",
            labExperiments: [
              "Programs demonstrating classes, object instantiation, public/private access, and member functions.",
              "Programs on Constructor overloading: Default, parameterized, and copy constructors.",
              "Programs using friend functions and static member variables across multiple classes.",
              "Operator overloading: Overloading binary '+' operator to add two Complex number objects.",
              "Operator overloading: Overloading unary '++' and '--' operators for Counter class.",
              "Implementation of Single and Multilevel Inheritance models with base constructor invocation.",
              "Implementation of Multiple Inheritance demonstrating virtual base classes to prevent diamond problem.",
              "Runtime polymorphism demonstration using base class pointers and Virtual Functions.",
              "File handling program writing and reading student class objects to binary files."
            ]
          }
        },
        {
          code: "DCS453",
          name: "Computer Organization Lab",
          lectureHours: 0,
          tutorialHours: 0,
          practicalHours: 4,
          credits: 2.0,
          subjectType: "PRACTICAL",
          evaluationMarks: "Sessional: 50, End-Sem: 50, Total: 100",
          syllabusDetails: {
            objectives: "To verify computer architecture concepts through microprocessor assembly programming and hardware logic simulation.",
            outcomes: "Students will write assembly code for arithmetic/logical manipulation, test memory block transfers, and simulate ALU operations.",
            labExperiments: [
              "Introduction to 8085/8086 microprocessor architecture and instruction set simulator.",
              "Assembly program to perform 8-bit and 16-bit binary addition and subtraction.",
              "Assembly program to perform multiplication of two 8-bit unsigned integers.",
              "Assembly program to find the largest and smallest number in an array of N bytes.",
              "Assembly program to sort an array of numbers in ascending and descending order.",
              "Assembly program to perform block data transfer from source memory to destination memory.",
              "Assembly program to convert BCD numbers to Binary and vice-versa.",
              "Simulation of Booth's Multiplication Algorithm using high-level language program."
            ]
          }
        },
        {
          code: "DCS454",
          name: "E-Commerce Lab",
          lectureHours: 0,
          tutorialHours: 0,
          practicalHours: 4,
          credits: 2.0,
          subjectType: "PRACTICAL",
          evaluationMarks: "Sessional: 50, End-Sem: 50, Total: 100",
          syllabusDetails: {
            objectives: "To design responsive e-commerce web interfaces, shopping cart workflows, and analyze digital payment security.",
            outcomes: "Students will build online catalog web pages, validate customer checkout forms with JavaScript, and analyze secure payment flowcharts.",
            labExperiments: [
              "Designing an online store product catalog with responsive image galleries, pricing, and buy buttons.",
              "Designing customer registration and login interfaces with client-side JavaScript validation.",
              "Implementation of an interactive shopping cart table calculating subtotal, tax, discounts, and grand total.",
              "Developing checkout order summary forms with shipping address input and credit card input masking.",
              "Simulation and sequence analysis of Secure Electronic Transaction (SET) and SSL handshake flow.",
              "Case study presentation analyzing security and architecture of major Indian e-commerce portals."
            ]
          }
        },
        {
          code: "GP401",
          name: "Discipline & General Proficiency",
          lectureHours: 0,
          tutorialHours: 0,
          practicalHours: 0,
          credits: 1.0,
          subjectType: "PRACTICAL",
          evaluationMarks: "Sessional: 100, Total: 100",
          syllabusDetails: {
            objectives: "To evaluate student professional conduct, punctuality, teamwork, industrial visit attendance, and extracurricular involvement.",
            outcomes: "Demonstrated professional demeanor, group discussion capability, institutional ethics, and semester-long discipline."
          }
        }
      ]
    },
    {
      semesterNumber: 5,
      title: "Semester V",
      subjects: [
        {
          code: "DCS501",
          name: "DBMS (Database Management Systems)",
          lectureHours: 3,
          tutorialHours: 1,
          practicalHours: 0,
          credits: 4.0,
          subjectType: "THEORY",
          evaluationMarks: "Sessional: 40 (CT: 20, TA: 10, AT: 10), End-Sem: 60, Total: 100",
          syllabusDetails: {
            objectives: "To provide a solid understanding of database management concepts, entity-relationship modeling, relational algebra, SQL, normalization, and transaction processing.",
            outcomes: "Students will be able to design relational schemas, write complex SQL queries, normalize databases up to BCNF, and manage transaction ACID properties.",
            modules: [
              {
                title: "Unit 1 (Basic Concepts of DBMS & Architecture)",
                topics: "Introduction to Database Management System (DBMS). Database approach vs traditional file-oriented approach, advantages of DBMS. DBMS architecture: 3-tier ANSI/SPARC schema architecture, physical, conceptual, and external levels. Data independence (logical and physical). Database users and administrators (DBA roles)."
              },
              {
                title: "Unit 2 (Data Models & Entity-Relationship (ER) Modeling)",
                topics: "Data models: Hierarchical, network, relational, object-oriented models. Entity-Relationship model: Entities, entity sets, attributes (simple, composite, multivalued, derived), relationship types and sets. Structural constraints: Cardinality ratios, participation constraints. Keys: Super key, candidate key, primary key, foreign key, unique key. E-R diagrams and mapping ER models to relational schemas."
              },
              {
                title: "Unit 3 (Relational Model & Structured Query Language (SQL))",
                topics: "Relational model concepts: Domains, tuples, relations, relational integrity constraints (entity integrity, referential integrity). Relational algebra operations: Select, project, union, set difference, Cartesian product, rename, joins (natural join, inner join, outer joins). SQL: Data Definition Language (DDL - CREATE, ALTER, DROP), Data Manipulation Language (DML - INSERT, UPDATE, DELETE, SELECT), Data Control Language (DCL - GRANT, REVOKE). Aggregate functions, group by, having, nested subqueries, views."
              },
              {
                title: "Unit 4 (Relational Database Design & Normalization)",
                topics: "Pitfalls in relational database design (redundancy, update anomalies, insertion and deletion anomalies). Functional dependencies: Definition, Armstrong's axioms, closure of functional dependencies, closure of attribute sets, canonical cover. Normalization: First Normal Form (1NF), Second Normal Form (2NF), Third Normal Form (3NF), Boyce-Codd Normal Form (BCNF). Lossless-join decomposition and dependency preservation."
              },
              {
                title: "Unit 5 (Transaction Processing & Concurrency Control)",
                topics: "Transaction concepts: Transaction states, ACID properties (Atomicity, Consistency, Isolation, Durability). Concurrent executions, serializability (conflict and view serializability). Concurrency control techniques: Lock-based protocols (shared and exclusive locks), Two-Phase Locking (2PL), deadlock prevention and detection. Database recovery concepts: Log-based recovery, checkpoints."
              }
            ],
            textBooks: [
              "Abraham Silberschatz, Henry F. Korth & S. Sudarshan, \"Database System Concepts\", McGraw-Hill.",
              "Ramez Elmasri & Shamkant B. Navathe, \"Fundamentals of Database Systems\", Pearson Education."
            ],
            referenceBooks: [
              "Raghu Ramakrishnan & Johannes Gehrke, \"Database Management Systems\", McGraw-Hill.",
              "C.J. Date, \"An Introduction to Database Systems\", Addison-Wesley."
            ]
          }
        },
        {
          code: "DCS502",
          name: "JAVA",
          lectureHours: 3,
          tutorialHours: 1,
          practicalHours: 0,
          credits: 4.0,
          subjectType: "THEORY",
          evaluationMarks: "Sessional: 40 (CT: 20, TA: 10, AT: 10), End-Sem: 60, Total: 100",
          syllabusDetails: {
            objectives: "To master Java core syntax, OOP implementations, interface architectures, multithreaded programming, exception propagation, and graphical user interfaces.",
            outcomes: "Students will build robust Java applications utilizing class hierarchies, packages, multithreaded concurrency, exception handling, and AWT/Swing graphical components.",
            modules: [
              {
                title: "Unit 1 (Java Evolution & Language Fundamentals)",
                topics: "Genesis of Java, Java characteristics: Platform independent, object-oriented, robust, secure, multithreaded. Java Virtual Machine (JVM), Java Development Kit (JDK), Java Runtime Environment (JRE), bytecode. Data types, variables, type conversion, casting, operators, control flow statements (branching, looping, switch)."
              },
              {
                title: "Unit 2 (Classes, Objects & Methods)",
                topics: "Class fundamentals: Declaring classes, creating objects, assigning object reference variables. Methods, constructors, this keyword, garbage collection, finalize() method. Method overloading, constructor overloading, objects as parameters, returning objects. Static members and static blocks, nested and inner classes."
              },
              {
                title: "Unit 3 (Inheritance, Packages & Interfaces)",
                topics: "Inheritance basics: Member access, super keyword, creating multilevel hierarchy, method overriding, dynamic method dispatch, abstract classes, using final with variables, methods, and classes. Packages: Defining packages, CLASSPATH, access protection, importing packages. Interfaces: Defining, implementing, nested interfaces, variables in interfaces."
              },
              {
                title: "Unit 4 (Exception Handling & Multithreaded Programming)",
                topics: "Exception handling fundamentals: Types of exceptions (checked and unchecked), try, catch, throw, throws, finally blocks, multiple catch clauses, nested try statements, creating custom exception subclasses. Multithreading: Java thread model, thread priorities, creating threads by extending Thread class and implementing Runnable interface, thread lifecycle, synchronization (synchronized methods and blocks), inter-thread communication (wait, notify, notifyAll)."
              },
              {
                title: "Unit 5 (Java I/O & GUI Programming (AWT))",
                topics: "I/O basics: Byte streams (FileInputStream, FileOutputStream) and character streams (FileReader, FileWriter), standard input/output with BufferedReader and Scanner. Abstract Window Toolkit (AWT): AWT hierarchy, Frame, Button, Label, TextField, Checkbox, Choice, List, layout managers (FlowLayout, BorderLayout, GridLayout). Event handling: Delegation event model, event classes, listener interfaces."
              }
            ],
            textBooks: [
              "Herbert Schildt, \"Java: The Complete Reference\", McGraw-Hill Education.",
              "E. Balagurusamy, \"Programming with Java: A Primer\", Tata McGraw-Hill."
            ],
            referenceBooks: [
              "Cay S. Horstmann & Gary Cornell, \"Core Java Volume I - Fundamentals\", Prentice Hall.",
              "Kathy Sierra & Bert Bates, \"Head First Java\", O'Reilly Media."
            ]
          }
        },
        {
          code: "DCS503",
          name: "Management Information System",
          lectureHours: 3,
          tutorialHours: 1,
          practicalHours: 0,
          credits: 4.0,
          subjectType: "THEORY",
          evaluationMarks: "Sessional: 40 (CT: 20, TA: 10, AT: 10), End-Sem: 60, Total: 100",
          syllabusDetails: {
            objectives: "To understand the strategic role of information systems, enterprise resource planning, decision support models, and cybersecurity governance in organizations.",
            outcomes: "Students will analyze enterprise business workflows, evaluate ERP/CRM/SCM systems, understand Decision Support architectures, and implement information security controls.",
            modules: [
              {
                title: "Unit 1 (Introduction to Management Information Systems)",
                topics: "Meaning and role of MIS, definition, system approach, concepts of data and information, characteristics of quality information. Information needs of different management levels (strategic, tactical, operational). Subsystems of MIS, organizational structure and information systems."
              },
              {
                title: "Unit 2 (System Development & Business Applications)",
                topics: "Systems Development Life Cycle (SDLC) for MIS: Requirements analysis, system design, implementation, testing, and maintenance. Structured methodologies, data flow diagrams (DFD). Business applications of IT: Financial information systems, marketing information systems, manufacturing information systems, human resource information systems."
              },
              {
                title: "Unit 3 (Enterprise Systems & E-Business Applications)",
                topics: "Enterprise Resource Planning (ERP): Meaning, benefits, modules, ERP implementation challenges. Supply Chain Management (SCM) systems: Objectives and components. Customer Relationship Management (CRM) systems: Features and business value. Knowledge Management Systems (KMS)."
              },
              {
                title: "Unit 4 (Decision Support Systems & Business Intelligence)",
                topics: "Decision making concepts: Herbert Simon's decision-making model (Intelligence, Design, Choice, Implementation). Decision Support Systems (DSS): Characteristics, components, comparison of MIS and DSS. Executive Support Systems (ESS/EIS), Group Decision Support Systems (GDSS). Data warehousing and data mining overview in business intelligence."
              },
              {
                title: "Unit 5 (Information Security & Ethical Dimensions)",
                topics: "Security threats to information systems: Unauthorized access, malware, denial of service, insider threats. Security management: Access control, authentication, firewalls, intrusion detection, auditing, disaster recovery planning. Ethical and social issues: Privacy, intellectual property, software copyright, accountability."
              }
            ],
            textBooks: [
              "Kenneth C. Laudon & Jane P. Laudon, \"Management Information Systems: Managing the Digital Firm\", Pearson.",
              "James A. O'Brien & George M. Marakas, \"Management Information Systems\", Tata McGraw-Hill."
            ],
            referenceBooks: [
              "Waman S. Jawadekar, \"Management Information Systems: Text and Cases\", Tata McGraw-Hill.",
              "Gordon B. Davis & Margrethe H. Olson, \"Management Information Systems\", McGraw-Hill."
            ]
          }
        },
        {
          code: "DCS504",
          name: "Computer Hardware and Maintenance",
          lectureHours: 3,
          tutorialHours: 1,
          practicalHours: 0,
          credits: 4.0,
          subjectType: "THEORY",
          evaluationMarks: "Sessional: 40 (CT: 20, TA: 10, AT: 10), End-Sem: 60, Total: 100",
          syllabusDetails: {
            objectives: "To examine PC internal hardware architectures, motherboards, chipsets, power distribution, storage devices, peripheral interfacing, and diagnostic troubleshooting.",
            outcomes: "Students will troubleshoot motherboard and component failures, diagnose power delivery problems, replace memory/storage subsystems, and resolve operating system boot errors.",
            modules: [
              {
                title: "Unit 1 (Motherboard Architecture & Processors)",
                topics: "Motherboard form factors: AT, ATX, microATX, ITX. Motherboard components: Processor sockets, chipset architecture (Northbridge and Southbridge / PCH), expansion slots (PCI, PCIe x1, x4, x16), memory slots. Microprocessors: Evolution from 8086 to modern multi-core CPUs, hyperthreading, clock speed, cache hierarchy (L1, L2, L3)."
              },
              {
                title: "Unit 2 (Memory Systems & BIOS/UEFI)",
                topics: "Primary memory: RAM technologies (SRAM, DRAM, SDRAM, DDR, DDR2, DDR3, DDR4), dual-channel memory architecture, ROM types (PROM, EPROM, Flash ROM). BIOS/UEFI firmware: Functions, Power-On Self-Test (POST), beep codes, CMOS setup utility, configuring boot priority, flashing and updating BIOS."
              },
              {
                title: "Unit 3 (Power Supply & Cooling Solutions)",
                topics: "Switched-Mode Power Supply (SMPS): Function, working principle, voltage rails (+3.3V, +5V, +12V, -12V), power connectors (24-pin ATX, 4/8-pin CPU, SATA, PCIe). Power calculation, power surge protection, UPS types. Cooling systems: Heatsinks, CPU fans, thermal paste, chassis ventilation, liquid cooling basics."
              },
              {
                title: "Unit 4 (Storage Subsystems & Peripherals)",
                topics: "Magnetic Hard Disk Drives (HDD): Construction, platters, read/write heads, spindle motor, tracks, sectors, cylinders, SATA interfaces. Solid-State Drives (SSD): NAND flash memory, SATA SSD vs NVMe M.2 SSD. Optical storage: CD/DVD/Blu-ray. Input/Output devices: Keyboards, optical mice, touchscreens, monitor technologies (LCD, LED, OLED), display ports (VGA, DVI, HDMI, DisplayPort)."
              },
              {
                title: "Unit 5 (Installation, Maintenance & Troubleshooting)",
                topics: "Preventive maintenance: Cleaning procedures, environmental factors (dust, temperature, humidity). System assembly and disassembly sequence. OS installation: BIOS setup, disk partitioning (MBR vs GPT), installing device drivers. Troubleshooting common hardware faults: Display failures, memory errors, blue screen of death (BSOD), hard drive failure symptoms, power issues."
              }
            ],
            textBooks: [
              "Scott Mueller, \"Upgrading and Repairing PCs\", Que Publishing / Pearson.",
              "Ron Gilster, \"PC Hardware: A Beginner's Guide\", McGraw-Hill Osborne Media."
            ],
            referenceBooks: [
              "Craig Zacker & John Rourke, \"PC Hardware: The Complete Reference\", McGraw-Hill.",
              "Govindarajalu, \"IBM PC and Clones: Hardware, Troubleshooting and Maintenance\", Tata McGraw-Hill."
            ]
          }
        },
        {
          code: "DCS505",
          name: "Computer Graphics",
          lectureHours: 3,
          tutorialHours: 1,
          practicalHours: 0,
          credits: 4.0,
          subjectType: "THEORY",
          evaluationMarks: "Sessional: 40 (CT: 20, TA: 10, AT: 10), End-Sem: 60, Total: 100",
          syllabusDetails: {
            objectives: "To study display hardware, scan-conversion algorithms, 2D/3D geometric transformations, viewing and clipping pipelines, and curve generation.",
            outcomes: "Students will implement line/circle drawing algorithms, apply 2D/3D affine matrix transformations, execute line and polygon clipping, and understand spline representations.",
            modules: [
              {
                title: "Unit 1 (Introduction & Graphics Hardware)",
                topics: "Overview of computer graphics and applications. Interactive vs non-interactive graphics. Video display devices: Cathode Ray Tube (CRT), raster scan displays, random scan (vector) displays, color CRT monitors (shadow mask, beam penetration), flat panel displays (LCD, LED). Video controller, frame buffer."
              },
              {
                title: "Unit 2 (Scan Conversion Algorithms)",
                topics: "Scan conversion of primitive entities: Points and lines. Line drawing algorithms: Digital Differential Analyzer (DDA) algorithm, Bresenham's line algorithm. Circle generation algorithms: Midpoint circle algorithm, Bresenham's circle algorithm. Polygon filling algorithms: Scanline polygon fill, boundary fill, and flood fill algorithms."
              },
              {
                title: "Unit 3 (2D Geometric Transformations)",
                topics: "Basic 2D transformations: Translation, rotation, scaling. Matrix representations and homogeneous coordinates. Composite transformations: General pivot-point rotation, fixed-point scaling, concatenated transformation matrices. Other transformations: Reflection (about x-axis, y-axis, origin, and line y=mx+c), shear (x-shear and y-shear)."
              },
              {
                title: "Unit 4 (2D Viewing & Clipping)",
                topics: "Viewing pipeline, viewing coordinate reference frame, window-to-viewport coordinate transformation. Clipping operations: Point clipping. Line clipping algorithms: Cohen-Sutherland line clipping algorithm, Liang-Barsky line clipping algorithm. Polygon clipping: Sutherland-Hodgman polygon clipping algorithm. Text clipping."
              },
              {
                title: "Unit 5 (3D Graphics & Curves)",
                topics: "3D display methods, 3D geometric transformations: Translation, rotation, scaling in 3D, composite 3D transformations. Projections: Parallel projections (orthographic, oblique) and Perspective projections. Visible surface detection: Back-face detection, Depth-Buffer (Z-buffer) algorithm. Introduction to curves: Spline representation, Bezier curves and B-spline curves."
              }
            ],
            textBooks: [
              "Donald Hearn & M. Pauline Baker, \"Computer Graphics C Version\", Pearson Education.",
              "Amarendra N. Sinha & Arun D. Udai, \"Computer Graphics\", Tata McGraw-Hill."
            ],
            referenceBooks: [
              "James D. Foley, Andries van Dam, Steven K. Feiner & John F. Hughes, \"Computer Graphics: Principles and Practice\", Addison-Wesley.",
              "Zhigang Xiang & Roy Plastock, \"Computer Graphics\", Schaum's Outline Series, McGraw-Hill."
            ]
          }
        },
        {
          code: "DCS551",
          name: "DBMS Lab",
          lectureHours: 0,
          tutorialHours: 0,
          practicalHours: 4,
          credits: 2.0,
          subjectType: "PRACTICAL",
          evaluationMarks: "Sessional: 50, End-Sem: 50, Total: 100",
          syllabusDetails: {
            objectives: "To provide hands-on mastery of relational database design, schema definition, SQL queries, relational operations, and PL/SQL programming.",
            outcomes: "Students will construct database tables with constraints, execute multi-table joins and subqueries, write PL/SQL triggers, and maintain database integrity.",
            labExperiments: [
              "Database schema definition using DDL commands (CREATE, ALTER, DROP, TRUNCATE) with column integrity constraints (PRIMARY KEY, FOREIGN KEY, NOT NULL, UNIQUE, CHECK).",
              "Data manipulation using DML commands (INSERT, UPDATE, DELETE) and transaction verification with COMMIT and ROLLBACK.",
              "Data retrieval using SELECT statements with WHERE, ORDER BY, DISTINCT, and pattern matching operators (LIKE, BETWEEN, IN).",
              "Aggregate functions (SUM, AVG, MIN, MAX, COUNT) and grouping with GROUP BY and HAVING clauses.",
              "Multi-table querying using JOIN operations (Natural Join, Inner Join, Left/Right/Full Outer Joins).",
              "Writing nested queries, correlated subqueries, and set operations (UNION, INTERSECT, MINUS).",
              "Creation and management of database Views, Sequences, and Indexes.",
              "PL/SQL block programming: Control structures, Cursors (implicit and explicit), Stored Procedures, Functions, and Triggers."
            ]
          }
        },
        {
          code: "DCS552",
          name: "JAVA Lab",
          lectureHours: 0,
          tutorialHours: 0,
          practicalHours: 4,
          credits: 2.0,
          subjectType: "PRACTICAL",
          evaluationMarks: "Sessional: 50, End-Sem: 50, Total: 100",
          syllabusDetails: {
            objectives: "To build Java applications demonstrating object-oriented classes, inheritance, packages, multithreaded concurrency, and GUI interfaces.",
            outcomes: "Students will program Java classes, handle exceptions, implement multithreading, and design event-driven AWT user interfaces.",
            labExperiments: [
              "Java programs illustrating classes, objects, method overloading, and constructor overloading.",
              "Implementation of Single, Multilevel, and Hierarchical Inheritance with 'super' keyword and method overriding.",
              "Creating and implementing Interfaces and organizing classes into custom user-defined Packages.",
              "Exception handling implementation using try, catch, finally blocks, and writing custom user-defined Exception classes.",
              "Multithreaded programming: Creating threads using Thread class and Runnable interface with thread sleep and priorities.",
              "Thread synchronization: Demonstrating synchronized methods to resolve race conditions.",
              "Java I/O streams: Reading and writing text and binary files using FileInputStream/FileOutputStream and BufferedReader.",
              "AWT GUI application: Creating a scientific calculator with Buttons, TextField, GridBagLayout, and ActionListener event handling."
            ]
          }
        },
        {
          code: "DCS554",
          name: "Repaired and Maintenance Lab",
          lectureHours: 0,
          tutorialHours: 0,
          practicalHours: 4,
          credits: 2.0,
          subjectType: "PRACTICAL",
          evaluationMarks: "Sessional: 50, End-Sem: 50, Total: 100",
          syllabusDetails: {
            objectives: "To diagnose, repair, and maintain desktop PC hardware components, power supplies, memory modules, and operating systems.",
            outcomes: "Students will measure SMPS voltages, troubleshoot POST error codes, partition storage drives, and perform diagnostic hardware testing.",
            labExperiments: [
              "Testing computer power supply (SMPS) output voltages on various color-coded rail wires using digital multimeter.",
              "Motherboard inspection: Identifying capacitor leakage, testing front panel power/reset switches, and replacing CMOS battery.",
              "Memory troubleshooting: Testing RAM modules using memory diagnostic tools and resolving memory beep error codes.",
              "Storage maintenance: Partitioning hard drives using diskpart/GParted, sector surface scanning, and resolving bad sector warnings.",
              "Troubleshooting common video and display adapter faults, configuring multi-monitor setups, and adjusting display resolutions.",
              "Diagnostic software tools: Running CPU-Z, HWMonitor, and benchmarking software to monitor system temperature, voltages, and performance.",
              "Operating System recovery: Repairing Windows Master Boot Record (MBR), creating bootable rescue media, and removing rootkit viruses."
            ]
          }
        },
        {
          code: "DCS555",
          name: "Computer Graphics Lab",
          lectureHours: 0,
          tutorialHours: 0,
          practicalHours: 4,
          credits: 2.0,
          subjectType: "PRACTICAL",
          evaluationMarks: "Sessional: 50, End-Sem: 50, Total: 100",
          syllabusDetails: {
            objectives: "To implement fundamental computer graphics algorithms in C/C++ graphics environment.",
            outcomes: "Students will program scan conversion for lines/circles, execute 2D transformations, and code line clipping routines.",
            labExperiments: [
              "Initialization of graphics mode in C/C++ using initgraph() and basic drawing functions (line, circle, rectangle).",
              "Implementation of Digital Differential Analyzer (DDA) Line Drawing Algorithm.",
              "Implementation of Bresenham's Line Drawing Algorithm for various slopes.",
              "Implementation of Midpoint Circle Generation Algorithm.",
              "Implementation of Boundary Fill and Flood Fill algorithms for polygon filling.",
              "Implementation of 2D Geometric Transformations: Translation, Scaling, and Rotation about origin.",
              "Implementation of 2D Rotation of a triangle about an arbitrary pivot point.",
              "Implementation of Cohen-Sutherland Line Clipping Algorithm against a rectangular clipping window."
            ]
          }
        },
        {
          code: "GP501",
          name: "Discipline & General Proficiency",
          lectureHours: 0,
          tutorialHours: 0,
          practicalHours: 0,
          credits: 1.0,
          subjectType: "PRACTICAL",
          evaluationMarks: "Sessional: 100, Total: 100",
          syllabusDetails: {
            objectives: "To assess professional ethics, student leadership, technical seminar participation, attendance regularity, and campus discipline.",
            outcomes: "Demonstrated professional communication, leadership in departmental initiatives, and disciplined academic participation."
          }
        }
      ]
    },
    {
      semesterNumber: 6,
      title: "Semester VI",
      subjects: [
        {
          code: "DCS601",
          name: "Web Technology",
          lectureHours: 3,
          tutorialHours: 1,
          practicalHours: 0,
          credits: 4.0,
          subjectType: "THEORY",
          evaluationMarks: "Sessional: 40 (CT: 20, TA: 10, AT: 10), End-Sem: 60, Total: 100",
          syllabusDetails: {
            objectives: "To learn modern web standards, HTML5 markup, CSS3 styling, responsive layouts, client-side JavaScript, server scripting, and web security.",
            outcomes: "Students will develop responsive websites, validate client input, parse XML data structures, integrate server-side scripts, and apply web protection techniques.",
            modules: [
              {
                title: "Unit 1 (Web Fundamentals & HTML5)",
                topics: "Internet and web overview, client-server architecture, HTTP protocol, URLs, web browsers, web servers. HTML5: Document structure, doctype, text formatting, hyperlinks, lists, tables, images, audio, video elements. HTML5 forms: Form elements, input types (text, password, email, date, number), form validation attributes."
              },
              {
                title: "Unit 2 (Cascading Style Sheets - CSS3)",
                topics: "CSS fundamentals: Inline, internal, and external style sheets. CSS selectors: Element, class, ID, attribute, pseudo-classes, pseudo-elements. CSS Box Model: Margin, border, padding, content. Positioning: Static, relative, absolute, fixed, sticky. CSS3 styling: Colors, backgrounds, fonts, text effects, shadows, transitions, animations. Responsive design: Viewport meta tag, media queries, CSS Flexbox and Grid fundamentals."
              },
              {
                title: "Unit 3 (Client-Side Scripting - JavaScript)",
                topics: "JavaScript introduction: Placing JavaScript in HTML, variables, data types, operators, control structures (conditional and looping). Functions: Declaration, parameters, return values, arrow functions. Document Object Model (DOM): Window and document objects, DOM element selection, modifying HTML content, styles, and attributes. Event handling: Event listeners, mouse events, keyboard events, form validation using JavaScript."
              },
              {
                title: "Unit 4 (XML & Server-Side Concepts)",
                topics: "XML: Introduction, features, XML syntax, well-formed vs valid XML documents. Document Type Definition (DTD): Elements, attributes, internal and external DTD. XML Schema (XSD). Introduction to server-side scripting: Client-side vs server-side execution, overview of PHP/Node.js, handling GET and POST requests, session and cookie management, connecting to MySQL database."
              },
              {
                title: "Unit 5 (Web Security & Cyber Laws)",
                topics: "Web security principles: Common threats (SQL injection, Cross-Site Scripting - XSS, Cross-Site Request Forgery - CSRF), SSL/TLS certificates, HTTPS, secure password hashing. Website deployment: Domain registration, DNS records, web hosting services, FTP upload. Cyber laws: Overview of IT Act 2000, intellectual property rights on web, digital signatures."
              }
            ],
            textBooks: [
              "Achyut Godbole & Atul Kahate, \"Web Technologies: TCP/IP, Web/Java Programming, and Cloud Computing\", Tata McGraw-Hill.",
              "Jon Duckett, \"HTML and CSS: Design and Build Websites\", John Wiley & Sons."
            ],
            referenceBooks: [
              "Jon Duckett, \"JavaScript and JQuery: Interactive Front-End Web Development\", Wiley.",
              "Uttam K. Roy, \"Web Technologies\", Oxford University Press."
            ]
          }
        },
        {
          code: "DCS602",
          name: "Software Engineering",
          lectureHours: 3,
          tutorialHours: 1,
          practicalHours: 0,
          credits: 4.0,
          subjectType: "THEORY",
          evaluationMarks: "Sessional: 40 (CT: 20, TA: 10, AT: 10), End-Sem: 60, Total: 100",
          syllabusDetails: {
            objectives: "To study software lifecycle models, requirements engineering, system design architectures, testing methodologies, project estimation, and quality assurance.",
            outcomes: "Students will produce Software Requirement Specifications (SRS), construct UML architectural diagrams, design black/white box test cases, estimate project efforts, and apply SQA standards.",
            modules: [
              {
                title: "Unit 1 (Introduction & Software Process Models)",
                topics: "Software engineering definition, software characteristics, software crisis, software engineering principles. Software Development Life Cycle (SDLC) models: Classical Waterfall model, Iterative Waterfall model, Prototyping model, Evolutionary model, Spiral model, Agile methodology principles and Scrum framework."
              },
              {
                title: "Unit 2 (Software Requirements Engineering)",
                topics: "Requirement gathering and analysis, types of requirements (functional and non-functional). Feasibility study (technical, economic, operational). Software Requirement Specification (SRS) document: Need, characteristics of quality SRS, IEEE 830 standard format for SRS. Structured analysis: Data Flow Diagrams (DFD - Level 0, 1, 2), Data Dictionary, Decision Trees and Tables."
              },
              {
                title: "Unit 3 (Software Design & Modeling)",
                topics: "Design concepts: Abstraction, refinement, modularity, software architecture. Cohesion (types of cohesion) and Coupling (types of coupling). Object-Oriented software design: UML modeling, Use Case diagrams, Class diagrams, Sequence diagrams, State chart diagrams. User Interface (UI) design principles."
              },
              {
                title: "Unit 4 (Software Coding & Testing Methodologies)",
                topics: "Coding standards and guidelines, code review, code walkthrough, code inspection. Software testing fundamentals: Verification vs Validation, error, fault, failure. Testing strategies: Unit testing, integration testing (top-down, bottom-up), system testing, acceptance testing, regression testing. Test case design techniques: White-box testing (basis path testing, cyclomatic complexity, control flow graphs), Black-box testing (Equivalence Class Partitioning, Boundary Value Analysis)."
              },
              {
                title: "Unit 5 (Software Maintenance, Estimation & Quality Assurance)",
                topics: "Software maintenance: Types of maintenance (corrective, adaptive, perfective, preventive), maintenance cost factors, software reverse engineering. Software project estimation: Empirical estimation models, COCOMO model (Basic and Intermediate). Software Quality Assurance (SQA): Software quality metrics, ISO 9000 quality standards, SEI Capability Maturity Model (CMM levels)."
              }
            ],
            textBooks: [
              "Roger S. Pressman & Bruce R. Maxim, \"Software Engineering: A Practitioner's Approach\", McGraw-Hill.",
              "Rajib Mall, \"Fundamentals of Software Engineering\", Prentice Hall of India."
            ],
            referenceBooks: [
              "Ian Sommerville, \"Software Engineering\", Pearson Education.",
              "Pankaj Jalote, \"An Integrated Approach to Software Engineering\", Springer."
            ]
          }
        },
        {
          code: "DCS603",
          name: "Computer Networks",
          lectureHours: 3,
          tutorialHours: 1,
          practicalHours: 0,
          credits: 4.0,
          subjectType: "THEORY",
          evaluationMarks: "Sessional: 40 (CT: 20, TA: 10, AT: 10), End-Sem: 60, Total: 100",
          syllabusDetails: {
            objectives: "To examine network topologies, OSI and TCP/IP layered architectures, data link protocols, routing algorithms, transport mechanisms, and network security protocols.",
            outcomes: "Students will analyze network layer architectures, calculate subnet masks, evaluate distance vector and link state routing, contrast TCP/UDP operations, and explain cryptography standards.",
            modules: [
              {
                title: "Unit 1 (Introduction & Reference Models)",
                topics: "Network definition, goals, and applications. Network classifications: LAN, MAN, WAN, PAN, wireless networks. Network topologies: Bus, star, ring, mesh, tree, hybrid topologies. Reference models: OSI 7-layer reference model (functions of each layer), TCP/IP reference model, comparison between OSI and TCP/IP models."
              },
              {
                title: "Unit 2 (Physical & Data Link Layers)",
                topics: "Transmission media: Guided media (twisted pair cable, coaxial cable, optical fiber cable) and unguided media (radio waves, microwaves, infrared). Switching techniques: Circuit switching, packet switching (datagram and virtual circuit), message switching. Data Link layer functions: Framing, error detection and correction (parity check, checksum, Cyclic Redundancy Check - CRC, Hamming code). Flow control protocols: Stop-and-Wait, Sliding Window (Go-Back-N, Selective Repeat). MAC sublayer: ALOHA, CSMA, CSMA/CD, IEEE 802.3 Ethernet."
              },
              {
                title: "Unit 3 (Network Layer & Routing)",
                topics: "Network layer functions, connection-oriented vs connectionless services. IP Addressing: IPv4 addressing, address classes (Class A, B, C, D, E), subnetting, subnet mask, Classless Inter-Domain Routing (CIDR), introduction to IPv6. Routing algorithms: Shortest path routing (Dijkstra's algorithm), Distance Vector Routing (Bellman-Ford), Link State Routing. Internetworking protocols: ARP, RARP, ICMP."
              },
              {
                title: "Unit 4 (Transport Layer)",
                topics: "Transport layer duties: Port numbers, sockets, multiplexing and demultiplexing. User Datagram Protocol (UDP): Segment structure, connectionless characteristics, applications. Transmission Control Protocol (TCP): Segment header, connection management (3-way handshake, termination), flow control using sliding window, TCP congestion control (slow start, congestion avoidance)."
              },
              {
                title: "Unit 5 (Application Layer & Network Security)",
                topics: "Application layer protocols: Domain Name System (DNS), Dynamic Host Configuration Protocol (DHCP), Hypertext Transfer Protocol (HTTP/HTTPS), File Transfer Protocol (FTP), Simple Mail Transfer Protocol (SMTP), Post Office Protocol (POP3/IMAP). Network security: Security goals (CIA), cryptography basics (symmetric and asymmetric encryption, DES, RSA), digital signatures, firewalls (packet filtering, proxy firewalls)."
              }
            ],
            textBooks: [
              "Andrew S. Tanenbaum & David J. Wetherall, \"Computer Networks\", Pearson Education.",
              "Behrouz A. Forouzan, \"Data Communications and Networking\", McGraw-Hill Education."
            ],
            referenceBooks: [
              "William Stallings, \"Data and Computer Communications\", Pearson.",
              "James F. Kurose & Keith W. Ross, \"Computer Networking: A Top-Down Approach\", Pearson."
            ]
          }
        },
        {
          code: "DAS604",
          name: "Environment and Ecology",
          lectureHours: 2,
          tutorialHours: 0,
          practicalHours: 0,
          credits: 2.0,
          subjectType: "THEORY",
          evaluationMarks: "Sessional: 20 (CT: 10, TA: 5, AT: 5), End-Sem: 30, Total: 50",
          syllabusDetails: {
            objectives: "To create awareness regarding ecological balance, environmental pollution, resource conservation, global climatic challenges, and environmental legislation.",
            outcomes: "Students will explain ecosystem dynamics, analyze sources and controls of pollution, describe solid waste disposal, and understand Environmental Protection regulations.",
            modules: [
              {
                title: "Unit 1 (Ecosystems & Natural Resources)",
                topics: "Concept of ecology and ecosystem: Structure and function, producers, consumers, decomposers, food chain, food web, ecological pyramids. Natural resources: Forest resources, water resources, mineral resources, energy resources (renewable and non-renewable - solar, wind, biomass, nuclear). Conservation of natural resources."
              },
              {
                title: "Unit 2 (Environmental Pollution & Solid Waste Management)",
                topics: "Environmental pollution: Causes, effects, and control measures of Air pollution, Water pollution, Soil pollution, and Noise pollution. Air pollutants (SOx, NOx, particulate matter, carbon monoxide). Water quality standards (BOD, COD). Solid waste management: Causes, effects, and disposal methods of urban and industrial wastes, e-waste hazards and recycling."
              },
              {
                title: "Unit 3 (Social Issues & Environmental Legislation)",
                topics: "Sustainable development, water conservation, rainwater harvesting. Global environmental issues: Global warming and greenhouse effect, acid rain, ozone layer depletion. Environmental protection laws in India: Environmental Protection Act 1986, Air (Prevention and Control of Pollution) Act 1981, Water (Prevention and Control of Pollution) Act 1974. Role of information technology in environment and human health."
              }
            ],
            textBooks: [
              "Benny Joseph, \"Environmental Studies\", Tata McGraw-Hill.",
              "Anubha Kaushik & C.P. Kaushik, \"Perspectives in Environmental Studies\", New Age International Publishers."
            ],
            referenceBooks: [
              "Erach Bharucha, \"Textbook of Environmental Studies for Undergraduate Courses\", Universities Press.",
              "R. Rajagopalan, \"Environmental Studies: From Crisis to Cure\", Oxford University Press."
            ]
          }
        },
        {
          code: "DCS604",
          name: "Introduction to Cloud Computing",
          lectureHours: 3,
          tutorialHours: 1,
          practicalHours: 0,
          credits: 4.0,
          subjectType: "THEORY",
          evaluationMarks: "Sessional: 40 (CT: 20, TA: 10, AT: 10), End-Sem: 60, Total: 100",
          syllabusDetails: {
            objectives: "To examine cloud architecture principles, deployment/service delivery models, virtualization mechanisms, cloud security controls, and enterprise migration strategies.",
            outcomes: "Students will evaluate IaaS/PaaS/SaaS offerings, describe hypervisor virtualization, understand elasticity and multi-tenancy, and analyze cloud deployment risks.",
            modules: [
              {
                title: "Unit 1 (Fundamentals & Evolution of Cloud Computing)",
                topics: "Definition, origins, and historical evolution of cloud computing. Essential characteristics of cloud computing (On-demand self-service, broad network access, resource pooling, rapid elasticity, measured service). Advantages, business drivers, and limitations of cloud computing. NIST cloud reference architecture."
              },
              {
                title: "Unit 2 (Cloud Service Models)",
                topics: "Infrastructure as a Service (IaaS): Capabilities, virtual machines, storage, networking, providers (Amazon EC2, Google Compute Engine). Platform as a Service (PaaS): Capabilities, development environments, database services (Google App Engine, AWS Elastic Beanstalk). Software as a Service (SaaS): Capabilities, web-based applications (Google Workspace, Microsoft 365, Salesforce). Comparison of IaaS, PaaS, and SaaS."
              },
              {
                title: "Unit 3 (Cloud Deployment Models)",
                topics: "Public Cloud: Architecture, features, benefits, multi-tenancy, limitations. Private Cloud: On-premises vs hosted private cloud, security advantages. Hybrid Cloud: Integration of public and private cloud, cloud bursting. Community Cloud. Criteria for choosing cloud deployment models."
              },
              {
                title: "Unit 4 (Virtualization Technologies in Cloud)",
                topics: "Virtualization role in cloud computing. Hardware virtualization, server virtualization, storage virtualization, network virtualization. Hypervisors: Type-1 (bare-metal) and Type-2 (hosted). Virtual machine management, live migration, resource scheduling, high availability. Containerization technologies: Docker containers, comparison of containers and virtual machines."
              },
              {
                title: "Unit 5 (Cloud Security & Provider Ecosystem)",
                topics: "Security challenges in cloud: Data privacy, data loss, shared technology vulnerabilities, identity and access management (IAM). Cloud security controls, encryption, backup, Disaster Recovery as a Service (DRaaS). Overview of major public cloud providers: Amazon Web Services (AWS), Microsoft Azure, Google Cloud Platform (GCP). Case study of enterprise cloud migration."
              }
            ],
            textBooks: [
              "Rajkumar Buyya, Christian Vecchiola & S. Thamarai Selvi, \"Mastering Cloud Computing\", McGraw-Hill Education.",
              "Thomas Erl, Zaigham Mahmood & Ricardo Puttini, \"Cloud Computing: Concepts, Technology & Architecture\", Prentice Hall / Pearson."
            ],
            referenceBooks: [
              "Barrie Sosinsky, \"Cloud Computing Bible\", Wiley India.",
              "Anthony T. Velte, Toby J. Velte & Robert Elsenpeter, \"Cloud Computing: A Practical Approach\", Tata McGraw-Hill."
            ]
          }
        },
        {
          code: "DCS651",
          name: "Web Technology Lab",
          lectureHours: 0,
          tutorialHours: 0,
          practicalHours: 4,
          credits: 2.0,
          subjectType: "PRACTICAL",
          evaluationMarks: "Sessional: 50, End-Sem: 50, Total: 100",
          syllabusDetails: {
            objectives: "To develop full-stack responsive web applications utilizing HTML5, CSS3, JavaScript, XML, and server-side script integrations.",
            outcomes: "Students will build responsive websites, validate complex user input, style with CSS3 Flexbox/Grid, and create data-driven web pages.",
            labExperiments: [
              "Creating a semantic HTML5 web page structure incorporating header, nav, section, article, aside, and footer tags.",
              "Designing responsive multi-column layouts using CSS3 Flexbox and CSS Grid with media queries.",
              "Form validation using JavaScript: Validating username, email, phone number, password strength, and postal codes.",
              "Interactive UI features: Image sliders, modal popups, accordion panels, and dropdown navigation menus using JavaScript DOM.",
              "Creating well-formed XML documents, defining internal/external DTDs, and validating with XML Schema (XSD).",
              "Server-side scripting with PHP/Node.js: Handling form submissions (GET and POST methods) and saving records to MySQL.",
              "User authentication system: Building user registration, login, session tracking, and logout with MySQL database.",
              "Capstone Mini-Project: Developing and deploying an interactive dynamic web application with responsive styling."
            ]
          }
        },
        {
          code: "DCS652",
          name: "Project Lab",
          lectureHours: 0,
          tutorialHours: 0,
          practicalHours: 6,
          credits: 6.0,
          subjectType: "PROJECT",
          evaluationMarks: "Sessional: 100, End-Sem: 150, Total: 250",
          syllabusDetails: {
            objectives: "To synthesize theoretical computer engineering knowledge into designing, engineering, testing, and presenting a major functional capstone project.",
            outcomes: "Students will formulate engineering project specifications, design database/software architecture, implement functional code, perform systematic testing, compile professional documentation, and deliver technical presentations."
          }
        },
        {
          code: "DCS653",
          name: "Industrial Training and Seminar",
          lectureHours: 0,
          tutorialHours: 0,
          practicalHours: 2,
          credits: 2.0,
          subjectType: "SEMINAR",
          evaluationMarks: "Sessional: 100, Total: 100",
          syllabusDetails: {
            objectives: "To expose students to industrial workflows, professional engineering practices, software development lifecycles, and technical seminar presentation.",
            outcomes: "Students will present industry internship technical experience, document organizational practices, and deliver oral seminar presentations before a faculty evaluation panel."
          }
        },
        {
          code: "GP601",
          name: "Discipline & General Proficiency",
          lectureHours: 0,
          tutorialHours: 0,
          practicalHours: 0,
          credits: 1.0,
          subjectType: "PRACTICAL",
          evaluationMarks: "Sessional: 100, Total: 100",
          syllabusDetails: {
            objectives: "To assess culminating polytechnic discipline, professional ethics, placement preparation, and institutional citizenship.",
            outcomes: "Demonstrated professional readiness, ethical engineering practice, teamwork, and overall institutional proficiency."
          }
        }
      ]
    }
  ]
};

async function main() {
  console.log('==========================================================');
  console.log('--- Ingesting Official All-Year Diploma in CSE Syllabus ---');
  console.log('==========================================================');

  // 1. Locate Programme DIP-CSE
  let prog = await prisma.programme.findUnique({
    where: { code: 'DIP-CSE' }
  });

  if (!prog) {
    throw new Error('Programme DIP-CSE not found in database!');
  }

  console.log(`Found Programme: ${prog.name} (${prog.code}), ID: ${prog.id}`);

  // 2. Update Programme metadata
  await prisma.programme.update({
    where: { id: prog.id },
    data: {
      hasOfficialSyllabus: true,
      officialSourceUrl: 'https://www.invertisuniversity.ac.in/diploma-programmes/diploma-in-computer-science-engineering',
      degreeLevel: 'DIPLOMA',
      category: 'DIPLOMA',
      durationYears: 3,
      isActive: true,
      description: 'Foundational 3-year polytechnic engineering diploma imparting hands-on technical computing, programming, and hardware maintenance, featuring direct 2nd-year Lateral Entry pathways.'
    }
  });
  console.log('Updated Programme metadata: hasOfficialSyllabus = true');

  // 3. Upsert CurriculumVersion
  let cv = await prisma.curriculumVersion.findFirst({
    where: {
      programmeId: prog.id,
      versionYear: DIPLOMA_CURRICULUM.versionYear
    }
  });

  if (!cv) {
    cv = await prisma.curriculumVersion.create({
      data: {
        programmeId: prog.id,
        versionYear: DIPLOMA_CURRICULUM.versionYear,
        regulationName: DIPLOMA_CURRICULUM.regulationName,
        isCurrent: true,
        description: DIPLOMA_CURRICULUM.description
      }
    });
    console.log(`Created CurriculumVersion ID: ${cv.id}`);
  } else {
    cv = await prisma.curriculumVersion.update({
      where: { id: cv.id },
      data: {
        regulationName: DIPLOMA_CURRICULUM.regulationName,
        isCurrent: true,
        description: DIPLOMA_CURRICULUM.description
      }
    });
    console.log(`Updated CurriculumVersion ID: ${cv.id}`);
  }

  // 4. Ingest Semesters and Subjects
  let totalSubjects = 0;
  for (const semData of DIPLOMA_CURRICULUM.semesters) {
    let sem = await prisma.semester.findFirst({
      where: {
        curriculumVersionId: cv.id,
        semesterNumber: semData.semesterNumber
      }
    });

    if (!sem) {
      sem = await prisma.semester.create({
        data: {
          curriculumVersionId: cv.id,
          semesterNumber: semData.semesterNumber,
          title: semData.title
        }
      });
      console.log(`Created ${semData.title} (ID: ${sem.id})`);
    } else {
      sem = await prisma.semester.update({
        where: { id: sem.id },
        data: { title: semData.title }
      });
      console.log(`Using existing ${semData.title} (ID: ${sem.id})`);
    }

    for (const sub of semData.subjects) {
      const syllabusJson = JSON.stringify(sub.syllabusDetails);
      const existingSub = await prisma.subject.findFirst({
        where: {
          semesterId: sem.id,
          code: sub.code
        }
      });

      if (existingSub) {
        await prisma.subject.update({
          where: { id: existingSub.id },
          data: {
            name: sub.name,
            lectureHours: sub.lectureHours,
            tutorialHours: sub.tutorialHours,
            practicalHours: sub.practicalHours,
            credits: sub.credits,
            subjectType: sub.subjectType,
            evaluationMarks: sub.evaluationMarks,
            syllabusDetails: syllabusJson,
            isActive: true
          }
        });
        console.log(`  Updated subject: [${sub.code}] ${sub.name} (${sub.credits} Cr)`);
      } else {
        await prisma.subject.create({
          data: {
            semesterId: sem.id,
            code: sub.code,
            name: sub.name,
            lectureHours: sub.lectureHours,
            tutorialHours: sub.tutorialHours,
            practicalHours: sub.practicalHours,
            credits: sub.credits,
            subjectType: sub.subjectType,
            evaluationMarks: sub.evaluationMarks,
            syllabusDetails: syllabusJson,
            isActive: true
          }
        });
        console.log(`  Created subject: [${sub.code}] ${sub.name} (${sub.credits} Cr)`);
      }
      totalSubjects++;
    }
  }

  console.log('==========================================================');
  console.log(`Successfully ingested ${totalSubjects} subjects across 6 semesters for DIP-CSE!`);
  console.log('==========================================================');
}

main()
  .catch((e) => {
    console.error('Ingestion failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

