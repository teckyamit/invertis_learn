// Semester 2 subjects for B.Tech CSE (Cloud Computing)

const SEMESTER_2_SUBJECTS = [
  {
    code: "ENG106",
    name: "Professional English",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 2,
    tutorialHours: 1,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To develop advanced corporate communication, technical reporting, and cross-cultural workplace skills."
      ],
      outcomes: [
        "Compose professional business proposals, technical reports, and meeting minutes.",
        "Demonstrate persuasive presentation abilities and debate skills."
      ],
      modules: [
        {
          title: "Unit 1: Fundamentals of Professional Communication",
          topics: "Process of communication; Upward, downward, horizontal, and diagonal channels; Grapevine communication; Communication barriers: Physical, semantic, psychological, and organizational."
        },
        {
          title: "Unit 2: Business Correspondence",
          topics: "Business letters: Inquiry, quotation, order, complaint, and adjustment; Memorandum, circulars, office orders, notices, agenda, and minutes of meeting."
        },
        {
          title: "Unit 3: Technical Report Writing",
          topics: "Characteristics of technical reports; Structure and elements of a formal report: Title page, abstract, table of contents, introduction, methodology, findings, conclusion, recommendations, bibliography, appendices; Progress reports and feasibility studies."
        },
        {
          title: "Unit 4: Proposal Writing & Technical Articles",
          topics: "Research and project proposals: Problem statement, scope, timeline, budget estimation, deliverables; Writing white papers and executive summaries."
        },
        {
          title: "Unit 5: Corporate Communication & Etiquette",
          topics: "Cross-cultural communication; Telephone and video conferencing etiquette; Professional ethics; Negotiation strategies and handling conflicts."
        }
      ],
      textBooks: [
        "Meenakshi Raman & Sangeeta Sharma, 'Technical Communication: Principles and Practice', Oxford University Press.",
        "Herta A. Murphy et al., 'Effective Business Communication', Tata McGraw Hill."
      ],
      referenceBooks: [
        "Raymond V. Lesikar, 'Business Communication: Connecting in a Digital World', McGraw Hill."
      ]
    }
  },
  {
    code: "MAT103",
    name: "Engineering Mathematics-II",
    subjectType: "THEORY",
    credits: 4.0,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 0,
    evaluationMarks: "CA: 30, EE: 70, Total: 100",
    syllabusDetails: {
      objectives: [
        "To provide rigorous mathematical foundations in linear algebra, Laplace transforms, Fourier series, and complex analysis."
      ],
      outcomes: [
        "Apply Laplace transforms to solve ordinary differential equations and initial value problems.",
        "Evaluate Fourier series expansions for periodic waveforms.",
        "Use analytic functions, Cauchy-Riemann equations, and contour integration in complex plane."
      ],
      modules: [
        {
          title: "Unit 1: Laplace Transforms",
          topics: "Definition, existence theorem; Transforms of elementary functions; Shifting theorems; Transforms of derivatives and integrals; Periodic functions; Unit step and Dirac delta functions; Inverse Laplace transforms; Convolution theorem; Applications to solving linear ODEs."
        },
        {
          title: "Unit 2: Fourier Series",
          topics: "Periodic functions; Dirichlet conditions; Euler formulas; Fourier series for functions of arbitrary period; Even and odd functions; Half-range Fourier sine and cosine series; Parseval identity; Harmonic analysis."
        },
        {
          title: "Unit 3: Complex Variables - Analytic Functions",
          topics: "Complex numbers and functions; Limit, continuity, and differentiability; Cauchy-Riemann equations in Cartesian and polar forms; Harmonic functions and conjugate harmonics; Conformal mapping and bilinear transformations."
        },
        {
          title: "Unit 4: Complex Integration",
          topics: "Line integral in complex plane; Cauchy integral theorem; Cauchy integral formula for derivatives; Taylor and Laurent series expansions; Singularities, poles, and essential singularities; Residue theorem and real definite integrals evaluation."
        },
        {
          title: "Unit 5: Partial Differential Equations Applications",
          topics: "Method of separation of variables; Solution of 1D wave equation; Solution of 1D heat conduction equation; 2D Laplace equation in Cartesian coordinates."
        }
      ],
      textBooks: [
        "Erwin Kreyszig, 'Advanced Engineering Mathematics', 9th Edition, Wiley.",
        "B.V. Ramana, 'Higher Engineering Mathematics', Tata McGraw Hill."
      ],
      referenceBooks: [
        "B.S. Grewal, 'Higher Engineering Mathematics', Khanna Publishers.",
        "R.K. Jain & S.R.K. Iyengar, 'Advanced Engineering Mathematics', Narosa."
      ]
    }
  },
  {
    code: "PHY107",
    name: "Physics for Engineers-II",
    subjectType: "THEORY",
    credits: 4.0,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 0,
    evaluationMarks: "CA: 30, EE: 70, Total: 100",
    syllabusDetails: {
      objectives: [
        "To explore solid-state physics, semiconductor device physics, dielectric and magnetic materials, and nanotechnology fundamentals."
      ],
      outcomes: [
        "Describe crystal structures, Miller indices, and X-ray diffraction in solids.",
        "Analyze intrinsic and extrinsic semiconductor band theory and carrier transport.",
        "Classify magnetic and dielectric materials and explain nanostructure properties."
      ],
      modules: [
        {
          title: "Unit 1: Crystal Structure & X-ray Diffraction",
          topics: "Space lattice, basis, unit cell; Bravais lattices; Miller indices; Interplanar spacing; Coordination number and packing fraction (SC, BCC, FCC, HCP); Bragg's law; Powder method of X-ray diffraction; Point defects and dislocations."
        },
        {
          title: "Unit 2: Band Theory of Solids",
          topics: "Free electron theory (Drude-Lorentz, Sommerfeld); Fermi-Dirac distribution; Density of states; Kronig-Penney model and origin of energy bands; Effective mass; Distinction between metals, semiconductors, and insulators based on band gap."
        },
        {
          title: "Unit 3: Semiconductor Physics",
          topics: "Intrinsic and extrinsic semiconductors; Carrier concentration; Law of mass action; Fermi level position; Drift and diffusion currents; Hall effect and its applications; P-N junction under forward and reverse bias; Solar cell and photodetector principles."
        },
        {
          title: "Unit 4: Magnetic & Dielectric Materials",
          topics: "Dia, para, ferro, antiferro, and ferrimagnetism; Domain theory of ferromagnetism; Hysteresis loop; Soft and hard magnetic materials; Dielectric polarization mechanisms (electronic, ionic, orientational); Clausius-Mossotti equation; Piezoelectricity, pyroelectricity, and ferroelectricity."
        },
        {
          title: "Unit 5: Nanomaterials & Characterization",
          topics: "Introduction to nanoscience; Quantum confinement, quantum wells, wires, and dots; Carbon nanotubes (CNTs) and graphene; Synthesis: Top-down and bottom-up approaches (sol-gel, CVD); Characterization techniques: SEM, TEM, and AFM basics; Engineering applications of nanomaterials."
        }
      ],
      textBooks: [
        "Charles Kittel, 'Introduction to Solid State Physics', 8th Edition, Wiley.",
        "S.O. Pillai, 'Solid State Physics', New Age International."
      ],
      referenceBooks: [
        "Wahab M.A., 'Solid State Physics: Structure and Properties of Materials', Narosa.",
        "H.K. Malik & A.K. Singh, 'Engineering Physics', McGraw Hill."
      ]
    }
  },
  {
    code: "CHY103",
    name: "Environmental Science",
    subjectType: "THEORY",
    credits: 2.0,
    lectureHours: 2,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 15, EE: 35, Total: 50",
    syllabusDetails: {
      objectives: [
        "To create environmental awareness, ecosystem understanding, pollution control methodologies, and sustainable green engineering practices."
      ],
      outcomes: [
        "Assess environmental impacts of human activities and industrial engineering.",
        "Propose pollution mitigation, solid waste management, and renewable energy solutions."
      ],
      modules: [
        {
          title: "Unit 1: Environment & Natural Resources",
          topics: "Multidisciplinary nature of environmental studies; Renewable and non-renewable resources; Forest, water, mineral, food, and energy resources; Dams and environmental implications; Sustainable lifestyles."
        },
        {
          title: "Unit 2: Ecosystems & Biodiversity",
          topics: "Concept of ecosystem: Structure and function; Producers, consumers, and decomposers; Energy flow and food chains/webs; Biodiversity: Genetic, species, and ecosystem diversity; Hotspots of biodiversity; Threats and conservation (In-situ & Ex-situ)."
        },
        {
          title: "Unit 3: Environmental Pollution",
          topics: "Air pollution: Sources, greenhouse effect, ozone layer depletion, acid rain; Water pollution: Sources, eutrophication, BOD/COD; Soil pollution; Noise pollution; Marine and thermal pollution; Solid waste management: Municipal and electronic waste (e-waste) handling."
        },
        {
          title: "Unit 4: Social Issues & the Environment",
          topics: "Sustainable development; Urban problems related to energy; Water harvesting and watershed management; Environmental ethics; Climate change and global warming; Carbon footprint and credits."
        },
        {
          title: "Unit 5: Environmental Regulations & Field Work",
          topics: "Environment Protection Act; Air (Prevention & Control of Pollution) Act; Water Act; Wildlife Protection Act; Forest Conservation Act; Environmental Impact Assessment (EIA); Field study of local polluted sites or ecosystems."
        }
      ],
      textBooks: [
        "Erach Bharucha, 'Textbook of Environmental Studies for Undergraduate Courses', Universities Press.",
        "Anubha Kaushik & C.P. Kaushik, 'Perspectives in Environmental Studies', New Age International."
      ],
      referenceBooks: [
        "R. Rajagopalan, 'Environmental Studies: From Crisis to Cure', Oxford University Press."
      ]
    }
  },
  {
    code: "BCSI201",
    name: "Design Thinking",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To foster creative problem-solving, empathy-driven product discovery, rapid prototyping, and user-centric software design."
      ],
      outcomes: [
        "Apply the 5 stages of Design Thinking: Empathize, Define, Ideate, Prototype, and Test.",
        "Create customer journey maps, empathy maps, and problem point definitions for software products."
      ],
      modules: [
        {
          title: "Unit 1: Introduction to Design Thinking",
          topics: "Design Thinking mindset; Differences between analytical thinking and design thinking; History and evolution (Stanford d.school, IDEO); Human-centered design principles; The Double Diamond design model."
        },
        {
          title: "Unit 2: Empathize Phase",
          topics: "User observation techniques; Conducting qualitative user interviews; Field research and immersive observation; Building personas; Creating Empathy Maps; Uncovering explicit vs. latent user needs."
        },
        {
          title: "Unit 3: Define Phase",
          topics: "Synthesizing empathy data; Identifying user pain points; Point of View (POV) problem statements; 'How Might We' (HMW) questioning framework; Framing actionable design briefs."
        },
        {
          title: "Unit 4: Ideate Phase",
          topics: "Divergent and convergent thinking; Brainstorming rules and methods; Mind mapping, SCAMPER technique, Worst Possible Idea method; Idea clustering and dot voting prioritization."
        },
        {
          title: "Unit 5: Prototype & Test Phase",
          topics: "Fidelity in prototyping: Low-fidelity paper sketches, wireframes, storyboards, role-playing, and high-fidelity interactive mockups; Usability testing protocols; Feedback capture grids; Iterative refinement."
        }
      ],
      textBooks: [
        "Tim Brown, 'Change by Design: How Design Thinking Transforms Organizations and Inspires Innovation', Harper Business.",
        "Idris Mootee, 'Design Thinking for Strategic Innovation', Wiley."
      ],
      referenceBooks: [
        "Tom Kelley & David Kelley, 'Creative Confidence: Unleashing the Creative Potential Within Us All', Crown Business."
      ]
    }
  },
  {
    code: "BCSI202",
    name: "Web Designing",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To teach modern responsive front-end web development including HTML5, CSS3, Flexbox/Grid, and modern JavaScript."
      ],
      outcomes: [
        "Develop semantic, accessible HTML5 web pages with CSS3 modern styling.",
        "Implement responsive web layouts using Flexbox, CSS Grid, and media queries.",
        "Program dynamic client-side interactions and DOM manipulation using JavaScript."
      ],
      modules: [
        {
          title: "Unit 1: Introduction to Web & HTML5",
          topics: "Internet and WWW architecture; Client-server model, HTTP/HTTPS, DNS; Semantic HTML5 elements (header, nav, main, article, section, aside, footer); Form controls, validation attributes; Audio and video embedding; SVG and Canvas basics."
        },
        {
          title: "Unit 2: CSS3 Fundamentals & Styling",
          topics: "CSS syntax, selectors, specificity, inheritance, and the Cascade; Box model (margin, border, padding, content); Colors, gradients, typography, web fonts (@font-face); Positioning (static, relative, absolute, fixed, sticky); Float and clear."
        },
        {
          title: "Unit 3: Responsive Design with Flexbox & Grid",
          topics: "Mobile-first design philosophy; Viewport meta tag; Media queries; Flexbox: Container properties (flex-direction, justify-content, align-items, flex-wrap) and item properties (flex-grow, flex-shrink, flex-basis); CSS Grid layout: grid-template-columns, grid-template-rows, grid-gap, auto-fit/fill; Responsive UI frameworks overview."
        },
        {
          title: "Unit 4: JavaScript Fundamentals",
          topics: "JavaScript syntax, variables (var, let, const), primitives and objects; Operators and control flow; Functions (declarations, expressions, arrow functions); Arrays and array methods (map, filter, reduce); JSON parsing and serialization; Scope and closures."
        },
        {
          title: "Unit 5: DOM Manipulation & Web APIs",
          topics: "Document Object Model (DOM) tree; Selecting and modifying elements; Event listeners and event propagation (bubbling/capturing); Form validation via JS; Fetch API and AJAX requests; Browser storage: localStorage and sessionStorage."
        }
      ],
      textBooks: [
        "Jon Duckett, 'HTML and CSS: Design and Build Websites', Wiley.",
        "David Flanagan, 'JavaScript: The Definitive Guide', O'Reilly Media."
      ],
      referenceBooks: [
        "Marijn Haverbeke, 'Eloquent JavaScript', No Starch Press."
      ]
    }
  },
  {
    code: "IIOT2",
    name: "Industrial Communication Protocols & Connectivity",
    subjectType: "THEORY",
    credits: 4.0,
    lectureHours: 4,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 30, EE: 70, Total: 100",
    syllabusDetails: {
      objectives: [
        "To understand industrial automation fieldbuses, telemetry protocols, SCADA, and secure industrial cloud connectivity."
      ],
      outcomes: [
        "Analyze industrial serial, fieldbus, and Ethernet networking protocols.",
        "Configure Modbus, Profibus, CAN, and OPC-UA communication in automation stacks.",
        "Design cloud telemetry pipelines for IIoT manufacturing workflows."
      ],
      modules: [
        {
          title: "Unit 1: Industrial Automation & Network Hierarchy",
          topics: "Industrial automation pyramid (field, control, supervisory, enterprise levels); Requirements for industrial networks: Determinism, latency, reliability, noise immunity; Serial communication standards (RS-232, RS-422, RS-485)."
        },
        {
          title: "Unit 2: Fieldbus Protocols",
          topics: "Modbus RTU and Modbus TCP: Message frame formats, function codes, master-slave communication; Profibus DP and PA; Foundation Fieldbus; Controller Area Network (CAN) bus: Arbitration, error handling, CANopen."
        },
        {
          title: "Unit 3: Industrial Ethernet & Real-Time Networks",
          topics: "Industrial Ethernet standards; EtherNet/IP, Profinet, EtherCAT; Deterministic real-time Ethernet; TSN (Time-Sensitive Networking) standards; Wireless industrial protocols: WirelessHART, ISA100.11a."
        },
        {
          title: "Unit 4: SCADA & OPC Unified Architecture (OPC-UA)",
          topics: "SCADA architecture and telemetry; RTUs and PLCs; OPC classic vs. OPC Unified Architecture (OPC-UA): Information model, security architecture, pub/sub model; Edge gateways for legacy protocol translation."
        },
        {
          title: "Unit 5: Industrial Cloud Connectivity & Cyber Security",
          topics: "Connecting OT networks to IT cloud infrastructures; Industrial MQTT brokers; Securing industrial control systems (IEC 62443 standard); Network segmentation and demilitarized zones (DMZ); Remote monitoring dashboards."
        }
      ],
      textBooks: [
        "Bogdan M. Wilamowski & J. David Irwin, 'Industrial Communication Systems', CRC Press.",
        "Richard Zurawski, 'The Industrial Information Technology Handbook', CRC Press."
      ],
      referenceBooks: [
        "Giacomo Veneri & Antonio Capasso, 'Hands-On Industrial Internet of Things', Packt Publishing."
      ]
    }
  },
  {
    code: "ENG107",
    name: "Communication Techniques Lab",
    subjectType: "PRACTICAL",
    credits: 1.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    evaluationMarks: "CA: 10, EE: 15, Total: 25",
    syllabusDetails: {
      objectives: ["To train students in phonetics, accent neutralization, group discussions, and mock interviews in digital language lab."],
      outcomes: ["Deliver confident presentations and participate effectively in corporate group discussions."],
      labExperiments: [
        "Phonetic Symbols and Transcriptions: International Phonetic Alphabet (IPA), vowels, diphthongs, consonants.",
        "Word Stress, Intonation, and Rhythm in Spoken English.",
        "Extempore Speaking and Just-A-Minute (JAM) sessions.",
        "Group Discussion Practice: Initiating, summarizing, arguing constructively, and leadership roles.",
        "Mock Personal Interview Preparation and Executive Presence.",
        "Digital Presentation Skills: Slide deck formatting, vocal modulation, and audience engagement."
      ]
    }
  },
  {
    code: "PHY108",
    name: "Physics for Engineers Lab-II",
    subjectType: "PRACTICAL",
    credits: 1.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    evaluationMarks: "CA: 10, EE: 15, Total: 25",
    syllabusDetails: {
      objectives: ["To verify semiconductor properties, magnetic hysteresis, and dielectric parameters experimentally."],
      outcomes: ["Characterize solar cells, magnetic materials, and Hall voltage in semiconductors."],
      labExperiments: [
        "To study the charging and discharging of a capacitor and determine the time constant (RC).",
        "To determine the Hall coefficient and carrier concentration of a semiconductor crystal.",
        "To study the V-I and P-V characteristics of a Photovoltaic Solar Cell.",
        "To trace the B-H hysteresis curve for a ferromagnetic material and calculate magnetic energy loss.",
        "To determine the dielectric constant of a dielectric material by bridge method.",
        "To determine the energy band gap of a semiconductor by four-probe method.",
        "To determine the resistivity of a semiconductor material using two-probe method."
      ]
    }
  },
  {
    code: "BCSI203",
    name: "Web Designing Lab",
    subjectType: "PRACTICAL",
    credits: 1.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    evaluationMarks: "CA: 10, EE: 15, Total: 25",
    syllabusDetails: {
      objectives: ["To provide hands-on experience in building responsive multi-page web applications using HTML5, CSS3, and JavaScript."],
      outcomes: ["Construct responsive websites with modern layout, dynamic DOM events, and client storage."],
      labExperiments: [
        "Design a multi-page website with semantic HTML5 tags (header, nav, section, article, footer).",
        "Create an online registration form with HTML5 inputs and client-side validation rules.",
        "Style web pages using CSS3 selectors, box model, shadows, gradients, and custom web fonts.",
        "Build a responsive navigation bar with drop-down menus and mobile hamburger toggle.",
        "Construct a product showcase grid using CSS Flexbox and CSS Grid layout with media queries.",
        "Develop an interactive To-Do List application using vanilla JavaScript DOM manipulation.",
        "Implement a dynamic image slider / carousel with auto-advance and manual controls using JS.",
        "Create a weather dashboard consuming external REST APIs via fetch and displaying JSON data."
      ]
    }
  },
  {
    code: "BCSI204",
    name: "Computer Aided Graphics",
    subjectType: "PRACTICAL",
    credits: 1.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    evaluationMarks: "CA: 10, EE: 15, Total: 25",
    syllabusDetails: {
      objectives: ["To introduce engineering drafting standards and 2D/3D modeling using CAD software tools."],
      outcomes: ["Create orthographic, isometric, and solid CAD models following drafting standards."],
      labExperiments: [
        "CAD Workspace Setup: Coordinate systems, grid, snap, units, drawing limits, and layer management.",
        "Basic 2D Drawing Commands: Line, circle, arc, polyline, rectangle, polygon, ellipse.",
        "Modifying Commands: Trim, extend, offset, array, mirror, fillet, chamfer, rotate, scale.",
        "Orthographic Projections: Front, top, and side views of simple geometric solids.",
        "Isometric Projections: Drawing isometric views from orthographic projections.",
        "Sectional Views and Dimensioning: Applying standard dimensioning, tolerancing, and hatching.",
        "Introduction to 3D Solid Modeling: Extrude, revolve, sweep, and boolean operations."
      ]
    }
  },
  {
    code: "ENG114",
    name: "Soft Skills and Communication",
    subjectType: "PRACTICAL",
    credits: 1.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    evaluationMarks: "CA: 10, EE: 15, Total: 25",
    syllabusDetails: {
      objectives: ["To enhance workplace negotiation, cross-cultural collaboration, and professional storytelling skills."],
      outcomes: ["Communicate persuasively and navigate collaborative corporate team environments."],
      labExperiments: [
        "Communication for Impact: Crafting elevator pitches and persuasive storytelling.",
        "Negotiation and Conflict Resolution: Role plays on workplace disputes and win-win solutions.",
        "Email Etiquette and Corporate Messaging: Drafting subject lines, formal responses, and follow-ups.",
        "Cross-Cultural Sensitization: Understanding multicultural work environments and communication nuances.",
        "Meeting Facilitation: Drafting agenda, moderating team discussions, recording minutes."
      ]
    }
  },
  {
    code: "SEP200",
    name: "Extra-curricular Activity (NSS/NCC/Scouting/Club)",
    subjectType: "PRACTICAL",
    credits: 1.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    evaluationMarks: "CA: 10, EE: 15, Total: 25",
    syllabusDetails: {
      objectives: ["To encourage community participation, social service, discipline, and campus leadership through club activities."],
      outcomes: ["Demonstrate leadership, civic responsibility, and active teamwork through university initiatives."],
      labExperiments: [
        "NSS Community Outreach: Cleanliness drives, environmental awareness, and digital literacy camps.",
        "NCC Drill & Discipline: Physical fitness, parade training, national integration campaigns.",
        "Scouting & Guiding: Outdoor survival skills, camp craft, first aid and disaster management.",
        "Technical & Cultural Club Activities: Organizing hackathons, robotics workshops, debate and literary fests."
      ]
    }
  }
];

module.exports = { SEMESTER_2_SUBJECTS };

