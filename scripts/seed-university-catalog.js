const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const DEPARTMENTS = [
  {
    code: 'ENG',
    name: 'Faculty of Engineering & Technology',
    facultyDean: 'Prof. (Dr.) R. K. Shukla, Dean Engineering',
    description: 'Premier faculty offering AICTE-approved engineering degrees, polytechnic diplomas, and cutting-edge tech specializations in Artificial Intelligence, Cloud Computing, IoT, Mechanical, Civil, and Electrical engineering.'
  },
  {
    code: 'CA',
    name: 'Faculty of Computer Applications',
    facultyDean: 'Dean, Computer Applications',
    description: 'Specialized department providing industry-focused BCA, MCA, and doctoral research in software architecture, cloud platforms, and enterprise computing.'
  },
  {
    code: 'MGMT',
    name: 'Faculty of Management & Commerce',
    facultyDean: 'Dean, Management Studies',
    description: 'Accredited business school delivering BBA, MBA, B.Com, and research programmes with modern tracks in FinTech, AI in Banking, and Business Analytics.'
  },
  {
    code: 'PHARM',
    name: 'Faculty of Pharmaceutical Sciences',
    facultyDean: 'Dean, Pharmaceutical Sciences',
    description: 'PCI-approved pharmacy institute offering D.Pharm, B.Pharm, M.Pharm, and Ph.D. in Pharmaceutics, Pharmacology, and clinical research.'
  },
  {
    code: 'LAW',
    name: 'Faculty of Legal Studies',
    facultyDean: 'Dean, Legal Studies',
    description: 'BCI-approved law faculty offering 5-year integrated BA LLB, BBA LLB, B.Com LLB, 3-year LLB, LLM, and doctoral jurisprudence studies.'
  },
  {
    code: 'SCI',
    name: 'Faculty of Applied Sciences & Humanities',
    facultyDean: 'Dean, Sciences',
    description: 'Advanced research and undergraduate/postgraduate degrees in Physics, Chemistry, Mathematics, Forensic Science, Biotechnology, and Microbiology.'
  },
  {
    code: 'AGRI',
    name: 'Faculty of Agriculture',
    facultyDean: 'Dean, Agriculture',
    description: 'ICAR-aligned 4-year B.Sc. (Hons) Agriculture, M.Sc. Agronomy, and agricultural research laboratories.'
  },
  {
    code: 'EDU',
    name: 'Faculty of Education',
    facultyDean: 'Dean, Education',
    description: 'NCTE-recognized teacher education programmes including 4-year B.Sc. B.Ed., B.El.Ed., B.Ed., and Ph.D. in Education.'
  },
  {
    code: 'JMC',
    name: 'Faculty of Journalism & Mass Communication',
    facultyDean: 'Dean, Media & Communication',
    description: 'State-of-the-art media studio, television production lab, and print journalism curriculum for BAJMC, MAJMC, and media research.'
  }
];

const PROGRAMMES = [
  // --- FACULTY OF ENGINEERING & TECHNOLOGY (24 Offerings) ---
  {
    code: 'BTECH-CSE',
    name: 'Bachelor of Technology in Computer Science & Engineering',
    deptCode: 'ENG',
    degreeLevel: 'UNDERGRADUATE',
    category: 'UNDERGRADUATE',
    durationYears: 4,
    eligibility: '10+2 with Physics & Mathematics as compulsory subjects, plus Chemistry/CS (Minimum 50% aggregate marks, 45% for SC/ST); JEE Main / CUET / IUCET.',
    specializations: JSON.stringify(['Core Computer Science', 'Software Engineering', 'Algorithms & Systems', 'Database Engineering']),
    description: 'Comprehensive 4-year undergraduate programme combining fundamental computer science foundations, algorithm design, operating systems, and full-stack software development.',
    careerProspects: 'Software Development Engineer (SDE), Full-Stack Developer, Systems Architect, Data Engineer, Cloud Engineer.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/ug-programmes',
    hasOfficialSyllabus: true,
    isLateralEntry: false
  },
  {
    code: 'BTECH-CSE-AI',
    name: 'B.Tech CSE (Artificial Intelligence & Machine Learning)',
    deptCode: 'ENG',
    degreeLevel: 'UNDERGRADUATE',
    category: 'UNDERGRADUATE',
    durationYears: 4,
    eligibility: '10+2 with Physics and Mathematics (Minimum 60% aggregate); JEE Main / CUET / IUCET.',
    specializations: JSON.stringify(['Deep Learning', 'Neural Networks', 'Natural Language Processing', 'Computer Vision']),
    description: 'Cutting-edge engineering specialization focused on intelligent systems, cognitive algorithms, automated reasoning, and scalable AI infrastructure.',
    careerProspects: 'AI Engineer, Machine Learning Specialist, Computer Vision Engineer, Data Scientist, NLP Researcher.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/ug-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'BTECH-CSE-CC',
    name: 'B.Tech CSE (Cloud Computing & Cyber Security)',
    deptCode: 'ENG',
    degreeLevel: 'UNDERGRADUATE',
    category: 'UNDERGRADUATE',
    durationYears: 4,
    eligibility: '10+2 with Physics and Mathematics (Minimum 60% aggregate); JEE Main / CUET / IUCET.',
    specializations: JSON.stringify(['Cloud Architecture', 'Network Security', 'Cryptography', 'Virtualization & DevOps']),
    description: 'Industry-aligned degree track emphasizing enterprise cloud computing (AWS/Azure/GCP), containerization, penetration testing, and digital forensics.',
    careerProspects: 'Cloud Solutions Architect, Cyber Security Analyst, DevOps Engineer, Information Security Manager.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/ug-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'BTECH-CSE-IOT',
    name: 'B.Tech CSE (Internet of Things - IoT)',
    deptCode: 'ENG',
    degreeLevel: 'UNDERGRADUATE',
    category: 'UNDERGRADUATE',
    durationYears: 4,
    eligibility: '10+2 with Physics and Mathematics (Minimum 55% aggregate); JEE Main / CUET / IUCET.',
    specializations: JSON.stringify(['Embedded Systems', 'Sensor Networks', 'Edge Computing', 'Microcontrollers & Smart Devices']),
    description: 'Specialized programme connecting hardware microcontrollers, sensor nodes, wireless communication protocols, and cloud computing for smart ecosystems.',
    careerProspects: 'IoT Solutions Architect, Embedded Systems Engineer, Firmware Developer, Smart Systems Specialist.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/ug-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'BTECH-ME',
    name: 'Bachelor of Technology in Mechanical Engineering',
    deptCode: 'ENG',
    degreeLevel: 'UNDERGRADUATE',
    category: 'UNDERGRADUATE',
    durationYears: 4,
    eligibility: '10+2 with Physics and Mathematics (Minimum 50% aggregate); JEE Main / CUET / IUCET.',
    specializations: JSON.stringify(['Thermal Engineering', 'CAD/CAM/CAE', 'Automobile Engineering', 'Robotics & Automation']),
    description: 'Core engineering discipline focusing on mechanics, thermodynamics, fluid dynamics, manufacturing systems, and computer-aided design.',
    careerProspects: 'Mechanical Design Engineer, Production Manager, Thermal Power Specialist, Automotive Engineer.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/ug-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'BTECH-CE',
    name: 'Bachelor of Technology in Civil Engineering',
    deptCode: 'ENG',
    degreeLevel: 'UNDERGRADUATE',
    category: 'UNDERGRADUATE',
    durationYears: 4,
    eligibility: '10+2 with Physics and Mathematics (Minimum 50% aggregate); JEE Main / CUET / IUCET.',
    specializations: JSON.stringify(['Structural Analysis', 'Geotechnical Engineering', 'Transportation Systems', 'Environmental Engineering']),
    description: 'Focuses on the planning, design, and construction of modern civil infrastructure including bridges, highways, sustainable buildings, and water resources.',
    careerProspects: 'Structural Engineer, Site Engineer, Project Manager, Urban Planner, Geotechnical Consultant.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/ug-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'BTECH-EE',
    name: 'Bachelor of Technology in Electrical Engineering',
    deptCode: 'ENG',
    degreeLevel: 'UNDERGRADUATE',
    category: 'UNDERGRADUATE',
    durationYears: 4,
    eligibility: '10+2 with Physics and Mathematics (Minimum 50% aggregate); JEE Main / CUET / IUCET.',
    specializations: JSON.stringify(['Power Systems', 'Control Systems', 'Smart Grid Technologies', 'Power Electronics']),
    description: 'Comprehensive study of electrical power generation, transmission, industrial automation, control systems, and renewable energy grids.',
    careerProspects: 'Electrical Engineer, Power Grid Specialist, Control Systems Engineer, Automation Consultant.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/ug-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'BTECH-BT',
    name: 'Bachelor of Technology in Biotechnology Engineering',
    deptCode: 'ENG',
    degreeLevel: 'UNDERGRADUATE',
    category: 'UNDERGRADUATE',
    durationYears: 4,
    eligibility: '10+2 with Physics, Chemistry and Biology/Math (Minimum 50% aggregate); JEE Main / CUET / IUCET.',
    specializations: JSON.stringify(['Bioprocess Engineering', 'Genetic Engineering', 'Bioinformatics', 'Pharmaceutical Biotech']),
    description: 'Interdisciplinary engineering degree applying biological systems and molecular biology to industrial bioprocesses and therapeutic discovery.',
    careerProspects: 'Bioprocess Engineer, Biomedical Analyst, Quality Control Officer, Clinical Research Associate.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/ug-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'BTECH-CSE-LAT',
    name: 'B.Tech CSE (Lateral Entry - 2nd Year Direct)',
    deptCode: 'ENG',
    degreeLevel: 'UNDERGRADUATE',
    category: 'UNDERGRADUATE',
    durationYears: 3,
    eligibility: '3-Year Engineering Diploma in CSE/IT from an AICTE-approved polytechnic, or B.Sc. with Mathematics (Minimum 60% aggregate).',
    specializations: JSON.stringify(['Direct 3rd Semester Entry', 'Core Computer Science', 'Software Development']),
    description: 'Lateral entry scheme allowing qualified polytechnic diploma holders to enter directly into the 2nd year (Semester III) of B.Tech CSE.',
    careerProspects: 'Software Engineer, Systems Developer, Technical Lead.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/ug-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: true
  },
  {
    code: 'BTECH-CE-LAT',
    name: 'B.Tech Civil Engineering (Lateral Entry)',
    deptCode: 'ENG',
    degreeLevel: 'UNDERGRADUATE',
    category: 'UNDERGRADUATE',
    durationYears: 3,
    eligibility: '3-Year Polytechnic Diploma in Civil Engineering (Minimum 60% aggregate).',
    specializations: JSON.stringify(['Direct 3rd Semester Entry', 'Structural Engineering', 'Construction Management']),
    description: 'Direct 2nd-year entry into B.Tech Civil Engineering for civil polytechnic diploma graduates.',
    careerProspects: 'Civil Site Engineer, Project Supervisor, Structural Consultant.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/ug-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: true
  },
  {
    code: 'BTECH-EE-LAT',
    name: 'B.Tech Electrical Engineering (Lateral Entry)',
    deptCode: 'ENG',
    degreeLevel: 'UNDERGRADUATE',
    category: 'UNDERGRADUATE',
    durationYears: 3,
    eligibility: '3-Year Polytechnic Diploma in Electrical/Electronics Engineering (Minimum 60% aggregate).',
    specializations: JSON.stringify(['Direct 3rd Semester Entry', 'Power Systems', 'Industrial Drives']),
    description: 'Direct 2nd-year entry into B.Tech Electrical Engineering for electrical diploma holders.',
    careerProspects: 'Electrical Design Engineer, Grid Specialist, Plant Electrical Engineer.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/ug-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: true
  },
  {
    code: 'BTECH-ME-LAT',
    name: 'B.Tech Mechanical Engineering (Lateral Entry)',
    deptCode: 'ENG',
    degreeLevel: 'UNDERGRADUATE',
    category: 'UNDERGRADUATE',
    durationYears: 3,
    eligibility: '3-Year Polytechnic Diploma in Mechanical/Production/Automobile (Minimum 60% aggregate).',
    specializations: JSON.stringify(['Direct 3rd Semester Entry', 'Production & Manufacturing', 'CAD/CAM']),
    description: 'Direct 2nd-year entry into B.Tech Mechanical Engineering for mechanical diploma graduates.',
    careerProspects: 'Manufacturing Engineer, Quality Assurance Specialist, Production Engineer.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/ug-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: true
  },
  {
    code: 'DIP-CSE',
    name: 'Diploma in Computer Science & Engineering',
    deptCode: 'ENG',
    degreeLevel: 'DIPLOMA',
    category: 'DIPLOMA',
    durationYears: 3,
    eligibility: '10th standard pass (Matriculation) with Mathematics & Science (Minimum 50% aggregate); JEECUP / IUCET.',
    specializations: JSON.stringify(['Computer Hardware & Networking', 'Programming Fundamentals', 'Web Development']),
    description: 'Foundational 3-year polytechnic engineering diploma imparting hands-on technical computing, programming, and hardware maintenance.',
    careerProspects: 'Junior Software Developer, Network Technician, IT Support Specialist, Hardware Associate.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/diploma-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'DIP-CE',
    name: 'Diploma in Civil Engineering',
    deptCode: 'ENG',
    degreeLevel: 'DIPLOMA',
    category: 'DIPLOMA',
    durationYears: 3,
    eligibility: '10th standard pass with Science and Mathematics (Minimum 50% aggregate); JEECUP / IUCET.',
    specializations: JSON.stringify(['Surveying', 'Building Construction', 'Concrete Technology', 'CAD in Civil']),
    description: '3-year polytechnic course focused on hands-on construction materials, field surveying, structural drawings, and site supervisory skills.',
    careerProspects: 'Junior Civil Engineer, Site Supervisor, Surveyor, CAD Draftsman.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/diploma-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'DIP-EE',
    name: 'Diploma in Electrical Engineering',
    deptCode: 'ENG',
    degreeLevel: 'DIPLOMA',
    category: 'DIPLOMA',
    durationYears: 3,
    eligibility: '10th standard pass with Science and Mathematics (Minimum 50% aggregate); JEECUP / IUCET.',
    specializations: JSON.stringify(['Electrical Machines', 'Wiring & Estimation', 'Switchgear & Protection']),
    description: 'Hands-on polytechnic training in AC/DC machinery, transformer testing, industrial wiring, and microcontrollers.',
    careerProspects: 'Junior Electrical Engineer, Substation Operator, Electrical Maintenance Technician.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/diploma-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'DIP-ME-PROD',
    name: 'Diploma in Mechanical Engineering (Production)',
    deptCode: 'ENG',
    degreeLevel: 'DIPLOMA',
    category: 'DIPLOMA',
    durationYears: 3,
    eligibility: '10th standard pass with Science and Mathematics (Minimum 50% aggregate); JEECUP / IUCET.',
    specializations: JSON.stringify(['Workshop Technology', 'CNC Machining', 'Foundry & Welding', 'Metrology']),
    description: 'Polytechnic curriculum dedicated to production technologies, machine tool operations, industrial tooling, and manufacturing processes.',
    careerProspects: 'Production Supervisor, Machine Shop In-Charge, Quality Control Technician.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/diploma-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'DIP-ME-AUTO',
    name: 'Diploma in Mechanical Engineering (Automobile)',
    deptCode: 'ENG',
    degreeLevel: 'DIPLOMA',
    category: 'DIPLOMA',
    durationYears: 3,
    eligibility: '10th standard pass with Science and Mathematics (Minimum 50% aggregate); JEECUP / IUCET.',
    specializations: JSON.stringify(['IC Engines', 'Automotive Electricals', 'Chassis & Suspension', 'Vehicle Diagnostics']),
    description: 'Polytechnic diploma focused on automobile maintenance, engine performance, transmission systems, and automotive workshop management.',
    careerProspects: 'Automotive Technician, Service Supervisor, Vehicle Inspector.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/diploma-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'DIP-ENG-LAT',
    name: 'Polytechnic Diploma in Engineering (Lateral Entry)',
    deptCode: 'ENG',
    degreeLevel: 'DIPLOMA',
    category: 'DIPLOMA',
    durationYears: 2,
    eligibility: '10+2 with Vocational/Technical stream or 2-year ITI Certificate in a relevant technical trade.',
    specializations: JSON.stringify(['Direct 2nd Year Entry', 'CSE', 'Civil', 'Electrical', 'Mechanical']),
    description: 'Allows ITI certificate holders and 10+2 technical vocational students direct entry into the 2nd year (3rd semester) of polytechnic diploma.',
    careerProspects: 'Senior Technician, Junior Engineer, Technical Supervisor.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/diploma-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: true
  },
  {
    code: 'MTECH-CSE',
    name: 'Master of Technology in Computer Science & Engineering',
    deptCode: 'ENG',
    degreeLevel: 'POSTGRADUATE',
    category: 'POSTGRADUATE',
    durationYears: 2,
    eligibility: 'B.Tech/B.E. in CSE/IT or MCA or M.Sc. in CS/IT (Minimum 55% aggregate marks, 50% for SC/ST); GATE / IUCET.',
    specializations: JSON.stringify(['Advanced Algorithms', 'Distributed Systems', 'Cloud & High Performance Computing', 'Data Analytics']),
    description: 'Advanced postgraduate engineering curriculum focused on research methodology, distributed system design, parallel computing, and dissertation thesis.',
    careerProspects: 'Senior Systems Engineer, Principal Architect, Research Scientist, Assistant Professor, Technical Consultant.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/pg-programmes',
    hasOfficialSyllabus: true,
    isLateralEntry: false
  },
  {
    code: 'MTECH-ME',
    name: 'Master of Technology in Mechanical Engineering',
    deptCode: 'ENG',
    degreeLevel: 'POSTGRADUATE',
    category: 'POSTGRADUATE',
    durationYears: 2,
    eligibility: 'B.Tech/B.E. in Mechanical/Production/Automobile Engineering (Minimum 55% aggregate); GATE / IUCET.',
    specializations: JSON.stringify(['Thermal Systems Design', 'Advanced CAD/CAM/CAE', 'Computational Fluid Dynamics']),
    description: 'Postgraduate research and engineering degree exploring numerical thermal analysis, advanced finite element modeling, and optimized manufacturing.',
    careerProspects: 'R&D Mechanical Engineer, CFD Specialist, Simulation Analyst, Academician.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/pg-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'MTECH-CE',
    name: 'Master of Technology in Civil Engineering',
    deptCode: 'ENG',
    degreeLevel: 'POSTGRADUATE',
    category: 'POSTGRADUATE',
    durationYears: 2,
    eligibility: 'B.Tech/B.E. in Civil Engineering (Minimum 55% aggregate); GATE / IUCET.',
    specializations: JSON.stringify(['Structural Dynamics', 'Earthquake Engineering', 'Advanced Highway & Bridge Design']),
    description: 'Specialized master’s degree in high-rise structural stability, seismic design codes, and advanced composite civil materials.',
    careerProspects: 'Senior Structural Engineer, Bridge Design Specialist, Infrastructure Project Manager.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/pg-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'PHD-009',
    name: 'Ph.D. in Computer Science & Engineering',
    deptCode: 'ENG',
    degreeLevel: 'DOCTORAL',
    category: 'DOCTORAL',
    durationYears: 3,
    eligibility: 'Master’s degree in Engineering/Technology (M.Tech/M.E.) in CSE/IT (Minimum 55% aggregate, 50% for SC/ST); UGC-NET (JRF) / GATE / IUCET.',
    specializations: JSON.stringify(['Artificial Intelligence', 'Cybersecurity', 'Cloud Infrastructure', 'Big Data Engineering']),
    description: 'Highest academic research degree requiring coursework, doctoral proposal defense, peer-reviewed international publications, and doctoral thesis.',
    careerProspects: 'University Professor, Chief Scientist, Industrial Research Director, Senior R&D Fellow.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/doctoral-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'PHD-010',
    name: 'Ph.D. in Mechanical Engineering',
    deptCode: 'ENG',
    degreeLevel: 'DOCTORAL',
    category: 'DOCTORAL',
    durationYears: 3,
    eligibility: 'Master’s degree (M.Tech/M.E.) in Mechanical Engineering or related discipline (Minimum 55% aggregate); GATE / UGC-NET / IUCET.',
    specializations: JSON.stringify(['Renewable Energy Systems', 'Nanomaterials & Tribology', 'Thermal Energy Storage']),
    description: 'Doctoral research covering cutting-edge energy conversion, additive manufacturing, smart materials, and high-performance mechanics.',
    careerProspects: 'Research Scientist, University Professor, Lead Simulation Engineer.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/doctoral-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'PHD-011',
    name: 'Ph.D. in Electrical Engineering',
    deptCode: 'ENG',
    degreeLevel: 'DOCTORAL',
    category: 'DOCTORAL',
    durationYears: 3,
    eligibility: 'Master’s degree (M.Tech/M.E.) in Electrical/Electronics Engineering (Minimum 55% aggregate); GATE / UGC-NET / IUCET.',
    specializations: JSON.stringify(['Smart Grids', 'Microgrid Automation', 'High Voltage Engineering', 'Power Quality']),
    description: 'Doctoral research program focused on renewable energy integration, next-generation smart distribution grids, and energy storage systems.',
    careerProspects: 'Power Systems Researcher, Lead Grid Consultant, Academic Professor.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/doctoral-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },

  // --- FACULTY OF COMPUTER APPLICATIONS (4 Offerings) ---
  {
    code: 'BCA',
    name: 'Bachelor of Computer Applications (BCA)',
    deptCode: 'CA',
    degreeLevel: 'UNDERGRADUATE',
    category: 'UNDERGRADUATE',
    durationYears: 3,
    eligibility: '10+2 in any stream with Mathematics or Computer Science at 10+2 or 10th level (Minimum 50% aggregate).',
    specializations: JSON.stringify(['Full-Stack Web Development', 'Mobile Application Development', 'Database Management']),
    description: 'Popular 3-year undergraduate course covering software development, database administration, web programming, and cloud essentials.',
    careerProspects: 'Software Developer, Web Developer, Database Administrator, App Developer, QA Engineer.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/ug-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'BSC-CS',
    name: 'B.Sc. (Honours) Computer Science',
    deptCode: 'CA',
    degreeLevel: 'UNDERGRADUATE',
    category: 'UNDERGRADUATE',
    durationYears: 3,
    eligibility: '10+2 with Mathematics (Minimum 50% aggregate).',
    specializations: JSON.stringify(['Computational Mathematics', 'Programming Systems', 'Data Structures & Algorithms']),
    description: 'Scientific and theoretical study of computing systems, computational complexity, algorithms, and applied mathematics.',
    careerProspects: 'Systems Analyst, Junior Programmer, Data Analyst, Academic Researcher.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/ug-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'MCA',
    name: 'Master of Computer Applications (MCA)',
    deptCode: 'CA',
    degreeLevel: 'POSTGRADUATE',
    category: 'POSTGRADUATE',
    durationYears: 2,
    eligibility: 'BCA / B.Sc. (CS/IT) / B.Tech or Graduation with Mathematics at 10+2 or Graduation level (Minimum 50% aggregate).',
    specializations: JSON.stringify(['Enterprise Architecture', 'Cloud Services', 'Cyber Security', 'Full-Stack Engineering']),
    description: '2-year professional postgraduate degree in advanced enterprise software development, distributed architectures, and agile engineering practices.',
    careerProspects: 'Senior Software Engineer, Technical Architect, DevOps Engineer, IT Project Manager.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/pg-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'PHD-014',
    name: 'Ph.D. in Computer Applications',
    deptCode: 'CA',
    degreeLevel: 'DOCTORAL',
    category: 'DOCTORAL',
    durationYears: 3,
    eligibility: 'MCA or M.Sc. (CS/IT) with minimum 55% marks (50% for SC/ST); UGC-NET / IUCET.',
    specializations: JSON.stringify(['Soft Computing', 'Data Mining & Big Data', 'Applied Machine Learning']),
    description: 'Doctoral research focusing on applied computational techniques, intelligent algorithms, and enterprise information systems.',
    careerProspects: 'Professor, Chief Information Architect, R&D Consultant.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/doctoral-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },

  // --- FACULTY OF MANAGEMENT & COMMERCE (9 Offerings) ---
  {
    code: 'BBA',
    name: 'Bachelor of Business Administration (BBA)',
    deptCode: 'MGMT',
    degreeLevel: 'UNDERGRADUATE',
    category: 'UNDERGRADUATE',
    durationYears: 3,
    eligibility: '10+2 in any stream (Minimum 50% aggregate, 45% for SC/ST).',
    specializations: JSON.stringify(['Marketing Management', 'Financial Management', 'Human Resource Management']),
    description: 'Foundational business administration degree covering business economics, corporate accounting, organizational behavior, and marketing strategy.',
    careerProspects: 'Business Development Executive, Marketing Associate, HR Generalist, Financial Analyst.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/ug-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'BBA-FINTECH',
    name: 'BBA in FinTech with Artificial Intelligence',
    deptCode: 'MGMT',
    degreeLevel: 'UNDERGRADUATE',
    category: 'UNDERGRADUATE',
    durationYears: 3,
    eligibility: '10+2 with Mathematics/Economics/Commerce (Minimum 55% aggregate).',
    specializations: JSON.stringify(['Digital Banking', 'Algorithmic Finance', 'Blockchain & Cryptocurrencies', 'AI in Wealth Management']),
    description: 'Next-generation management degree merging corporate finance, quantitative methods, algorithmic trading, and AI-driven banking models.',
    careerProspects: 'FinTech Analyst, Digital Banking Associate, Investment Specialist, Risk Modeling Associate.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/ug-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'BCOM',
    name: 'Bachelor of Commerce (B.Com)',
    deptCode: 'MGMT',
    degreeLevel: 'UNDERGRADUATE',
    category: 'UNDERGRADUATE',
    durationYears: 3,
    eligibility: '10+2 with Commerce or Mathematics/Economics (Minimum 50% aggregate).',
    specializations: JSON.stringify(['Financial Accounting', 'Corporate Taxation', 'Banking & Insurance']),
    description: 'Undergraduate commercial degree covering business accounting, GST, direct & indirect taxation, corporate law, and auditing.',
    careerProspects: 'Accountant, Tax Consultant, Audit Assistant, Banking Officer.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/ug-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'BCOM-HONS',
    name: 'Bachelor of Commerce (Honours)',
    deptCode: 'MGMT',
    degreeLevel: 'UNDERGRADUATE',
    category: 'UNDERGRADUATE',
    durationYears: 3,
    eligibility: '10+2 in Commerce/Science with Mathematics (Minimum 55% aggregate).',
    specializations: JSON.stringify(['Advanced Cost Accounting', 'Corporate Governance', 'Financial Markets & Securities']),
    description: 'Rigorous commerce curriculum designed for students aiming for CA, CS, CMA, and investment banking careers.',
    careerProspects: 'Financial Analyst, Corporate Auditor, Investment Advisor, Tax Specialist.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/ug-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'MBA',
    name: 'Master of Business Administration (MBA Dual Specialization)',
    deptCode: 'MGMT',
    degreeLevel: 'POSTGRADUATE',
    category: 'POSTGRADUATE',
    durationYears: 2,
    eligibility: 'Graduation in any discipline from a recognized university (Minimum 50% aggregate, 45% for SC/ST); CAT / MAT / XAT / IUCET.',
    specializations: JSON.stringify(['Marketing', 'Finance', 'Human Resource', 'International Business', 'Information Technology']),
    description: 'Flagship 2-year postgraduate management programme with dual-specialization options, case studies, corporate internships, and leadership training.',
    careerProspects: 'Brand Manager, Investment Banker, HR Business Partner, Management Consultant, Operations Head.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/pg-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'MBA-FINTECH',
    name: 'MBA in FinTech with AI',
    deptCode: 'MGMT',
    degreeLevel: 'POSTGRADUATE',
    category: 'POSTGRADUATE',
    durationYears: 2,
    eligibility: 'Graduation with quantitative or business background (Minimum 50% aggregate); CAT / MAT / IUCET.',
    specializations: JSON.stringify(['Robo-Advisory', 'Predictive Risk Analytics', 'Decentralized Finance (DeFi)', 'RegTech']),
    description: 'Advanced postgraduate track at the confluence of financial technology, machine learning algorithms, quantitative asset management, and payment gateways.',
    careerProspects: 'FinTech Product Manager, Quantitative Risk Lead, Digital Transformation Director.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/pg-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'MBA-BA',
    name: 'MBA in Business Analytics',
    deptCode: 'MGMT',
    degreeLevel: 'POSTGRADUATE',
    category: 'POSTGRADUATE',
    durationYears: 2,
    eligibility: 'Graduation in any discipline with Mathematics or Statistics (Minimum 50% aggregate).',
    specializations: JSON.stringify(['Predictive Modeling', 'Tableau & PowerBI', 'Big Data Strategy', 'Customer Analytics']),
    description: 'Trains business leaders to translate corporate datasets into strategic decisions using statistics, data mining, and visual storytelling.',
    careerProspects: 'Business Analytics Consultant, Strategy Lead, Data Storyteller, Growth Analyst.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/pg-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'MCOM',
    name: 'Master of Commerce (M.Com)',
    deptCode: 'MGMT',
    degreeLevel: 'POSTGRADUATE',
    category: 'POSTGRADUATE',
    durationYears: 2,
    eligibility: 'B.Com or BBA with minimum 50% aggregate marks.',
    specializations: JSON.stringify(['Advanced Financial Analysis', 'International Trade', 'Strategic Cost Management']),
    description: 'Postgraduate degree providing mastery over financial modeling, international corporate taxation, and regulatory reporting.',
    careerProspects: 'Senior Accountant, Treasury Analyst, Financial Controller, College Lecturer.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/pg-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'PHD-002',
    name: 'Ph.D. in Management',
    deptCode: 'MGMT',
    degreeLevel: 'DOCTORAL',
    category: 'DOCTORAL',
    durationYears: 3,
    eligibility: 'MBA or Master’s in allied management discipline with minimum 55% marks; UGC-NET (JRF) / IUCET.',
    specializations: JSON.stringify(['Strategic Management', 'Consumer Behavior', 'Financial Econometrics', 'HR Analytics']),
    description: 'Doctoral research program focused on contemporary organizational dynamics, consumer choices, and economic market modeling.',
    careerProspects: 'Management Professor, Corporate Researcher, Economic Policy Advisor.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/doctoral-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },

  // --- FACULTY OF PHARMACEUTICAL SCIENCES (6 Offerings) ---
  {
    code: 'DPHARM',
    name: 'Diploma in Pharmacy (D.Pharm)',
    deptCode: 'PHARM',
    degreeLevel: 'DIPLOMA',
    category: 'DIPLOMA',
    durationYears: 2,
    eligibility: '10+2 with Physics, Chemistry and Biology/Mathematics (Minimum 50% aggregate); PCI Approved.',
    specializations: JSON.stringify(['Pharmaceutics', 'Pharmacognosy', 'Hospital & Clinical Pharmacy']),
    description: 'PCI-approved 2-year diploma qualifying students to become licensed registered pharmacists for hospital, retail, and community dispensing.',
    careerProspects: 'Registered Pharmacist, Hospital Dispensary Chemist, Medical Sales Representative.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/diploma-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'BPHARM',
    name: 'Bachelor of Pharmacy (B.Pharm)',
    deptCode: 'PHARM',
    degreeLevel: 'UNDERGRADUATE',
    category: 'UNDERGRADUATE',
    durationYears: 4,
    eligibility: '10+2 with Physics, Chemistry and Biology/Mathematics (Minimum 50% aggregate); CUET / IUCET / PCI Approved.',
    specializations: JSON.stringify(['Medicinal Chemistry', 'Pharmaceutics', 'Pharmacology', 'Pharmaceutical Analysis']),
    description: 'Comprehensive 4-year PCI-approved bachelor’s degree in pharmaceutical chemistry, drug delivery formulations, therapeutics, and drug discovery.',
    careerProspects: 'Pharmaceutical Formulator, Quality Assurance Chemist, Clinical Trials Associate, Drug Inspector.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/ug-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'BPHARM-LAT',
    name: 'B.Pharm (Lateral Entry - 2nd Year Direct)',
    deptCode: 'PHARM',
    degreeLevel: 'UNDERGRADUATE',
    category: 'UNDERGRADUATE',
    durationYears: 3,
    eligibility: 'D.Pharm from a PCI-approved institution with minimum 55% aggregate marks.',
    specializations: JSON.stringify(['Direct 3rd Semester Entry', 'Advanced Pharmaceutical Sciences']),
    description: 'Direct entry into 2nd year (Semester III) of B.Pharm for licensed D.Pharm holders.',
    careerProspects: 'Production Chemist, Drug Analyst, Regulatory Affairs Executive.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/ug-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: true
  },
  {
    code: 'MPHARM-CEUTICS',
    name: 'M.Pharm (Pharmaceutics)',
    deptCode: 'PHARM',
    degreeLevel: 'POSTGRADUATE',
    category: 'POSTGRADUATE',
    durationYears: 2,
    eligibility: 'B.Pharm with minimum 55% aggregate marks; GPAT / IUCET.',
    specializations: JSON.stringify(['Novel Drug Delivery Systems (NDDS)', 'Biopharmaceutics', 'Nanomedicine']),
    description: 'Postgraduate research in microencapsulation, controlled release kinetics, ocular/transdermal drug delivery, and regulatory filings.',
    careerProspects: 'Formulation Scientist, R&D Manager, Analytical Chemist, Academician.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/pg-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'MPHARM-COL',
    name: 'M.Pharm (Pharmacology)',
    deptCode: 'PHARM',
    degreeLevel: 'POSTGRADUATE',
    category: 'POSTGRADUATE',
    durationYears: 2,
    eligibility: 'B.Pharm with minimum 55% aggregate marks; GPAT / IUCET.',
    specializations: JSON.stringify(['Preclinical Screening', 'Clinical Pharmacology', 'Toxicology & Safety']),
    description: 'Postgraduate research studying drug mechanisms, receptor kinetics, animal disease models, and toxicity evaluations.',
    careerProspects: 'Preclinical Pharmacologist, Clinical Research Manager, Pharmacovigilance Associate.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/pg-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'PHA-007',
    name: 'Ph.D. in Pharmacy',
    deptCode: 'PHARM',
    degreeLevel: 'DOCTORAL',
    category: 'DOCTORAL',
    durationYears: 3,
    eligibility: 'M.Pharm in relevant specialization with minimum 55% marks (50% for SC/ST); GPAT / IUCET.',
    specializations: JSON.stringify(['Targeted Drug Delivery', 'Neuropharmacology', 'Phytopharmaceuticals']),
    description: 'Doctoral research program advancing novel pharmaceutical formulations, therapeutic molecular targets, and preclinical pharmacology.',
    careerProspects: 'Director of Pharmaceutical R&D, Principal Investigator, University Professor.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/doctoral-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },

  // --- FACULTY OF LEGAL STUDIES (6 Offerings) ---
  {
    code: 'BALLB-INT',
    name: 'B.A. LL.B. (Integrated 5 Years)',
    deptCode: 'LAW',
    degreeLevel: 'UNDERGRADUATE',
    category: 'UNDERGRADUATE',
    durationYears: 5,
    eligibility: '10+2 in any stream (Minimum 45% aggregate for General, 40% for SC/ST); CLAT / LSAT / IUCET; BCI Approved.',
    specializations: JSON.stringify(['Constitutional Law', 'Criminal Jurisprudence', 'Human Rights', 'Cyber Law']),
    description: 'BCI-approved integrated 5-year double degree combining humanities (Political Science, Sociology, History) with full-spectrum legal jurisprudence and moot court competitions.',
    careerProspects: 'Advocate, Judicial Magistrate, Corporate Legal Advisor, Public Prosecutor.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/ug-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'BBALLB-INT',
    name: 'B.B.A. LL.B. (Integrated 5 Years)',
    deptCode: 'LAW',
    degreeLevel: 'UNDERGRADUATE',
    category: 'UNDERGRADUATE',
    durationYears: 5,
    eligibility: '10+2 in any stream (Minimum 45% aggregate for General, 40% for SC/ST); CLAT / LSAT / IUCET; BCI Approved.',
    specializations: JSON.stringify(['Corporate Law', 'Mergers & Acquisitions', 'Intellectual Property Rights', 'Banking Regulations']),
    description: 'Designed for corporate litigators and counsel, blending strategic business administration, accounting, and commercial corporate laws.',
    careerProspects: 'Corporate Counsel, In-House Legal Advisor, M&A Specialist, Commercial Arbitrator.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/ug-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'BCOMLLB-INT',
    name: 'B.Com. LL.B. (Integrated 5 Years)',
    deptCode: 'LAW',
    degreeLevel: 'UNDERGRADUATE',
    category: 'UNDERGRADUATE',
    durationYears: 5,
    eligibility: '10+2 with Commerce/Science (Minimum 45% aggregate); CLAT / IUCET; BCI Approved.',
    specializations: JSON.stringify(['Taxation Laws', 'Securities & Insolvency Law', 'Company Secretarial Law']),
    description: 'Dual degree uniting financial auditing, taxation, corporate finance, and commercial law frameworks.',
    careerProspects: 'Tax Advocate, Insolvency Specialist, Compliance Officer, Corporate Lawyer.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/ug-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'LLB',
    name: 'Bachelor of Laws (LL.B. 3 Years)',
    deptCode: 'LAW',
    degreeLevel: 'UNDERGRADUATE',
    category: 'UNDERGRADUATE',
    durationYears: 3,
    eligibility: 'Graduation in any discipline from a recognized university (Minimum 45% for General, 40% for SC/ST); BCI Approved.',
    specializations: JSON.stringify(['Civil Litigation', 'Criminal Defense', 'Family Law', 'Constitutional Law']),
    description: '3-year professional law degree for graduates pursuing an advocate license, judicial services, or legal consulting.',
    careerProspects: 'Practicing Advocate, Legal Counsel, Civil Judge, Legal Consultant.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/ug-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'LLM',
    name: 'Master of Laws (LL.M.)',
    deptCode: 'LAW',
    degreeLevel: 'POSTGRADUATE',
    category: 'POSTGRADUATE',
    durationYears: 2,
    eligibility: 'LL.B. (3 or 5 Years) from a recognized university with minimum 50% aggregate marks.',
    specializations: JSON.stringify(['Corporate & Commercial Law', 'Criminal Law & Forensic Jurisprudence', 'Constitutional Law']),
    description: 'Advanced postgraduate master’s in legal research, legislative drafting, comparative constitutionalism, and international trade law.',
    careerProspects: 'Legal Scholar, Judicial Officer, Senior Legal Advisor, Law Professor.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/pg-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'PHD-001',
    name: 'Ph.D. in Law',
    deptCode: 'LAW',
    degreeLevel: 'DOCTORAL',
    category: 'DOCTORAL',
    durationYears: 3,
    eligibility: 'LL.M. degree with minimum 55% marks (50% for SC/ST); UGC-NET (JRF) / IUCET.',
    specializations: JSON.stringify(['Constitutional Governance', 'Intellectual Property Jurisprudence', 'Cyber Laws & AI']),
    description: 'Highest academic degree in legal theory, socio-legal research methodologies, and statutory constitutional evolution.',
    careerProspects: 'Dean of Law, Senior Legal Researcher, Judicial Academy Instructor.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/doctoral-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },

  // --- FACULTY OF APPLIED SCIENCES & HUMANITIES (5 Offerings) ---
  {
    code: 'BSC-HONS-PCM',
    name: 'B.Sc. (Honours) Physics / Chemistry / Mathematics',
    deptCode: 'SCI',
    degreeLevel: 'UNDERGRADUATE',
    category: 'UNDERGRADUATE',
    durationYears: 3,
    eligibility: '10+2 with Physics, Chemistry, and Mathematics (Minimum 50% aggregate).',
    specializations: JSON.stringify(['Physics Hons', 'Chemistry Hons', 'Mathematics Hons']),
    description: 'Rigorous 3-year pure science degree developing analytical, quantitative, experimental, and theoretical foundation in fundamental sciences.',
    careerProspects: 'Scientific Assistant, Laboratory Analyst, Data Modeler, Postgraduate Scholar.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/ug-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'BSC-FORENSIC',
    name: 'B.Sc. (Honours) Forensic Science',
    deptCode: 'SCI',
    degreeLevel: 'UNDERGRADUATE',
    category: 'UNDERGRADUATE',
    durationYears: 3,
    eligibility: '10+2 with Science stream (PCM/PCB) (Minimum 50% aggregate).',
    specializations: JSON.stringify(['Forensic Toxicology', 'Fingerprint & Ballistics', 'Digital Forensics', 'DNA Profiling']),
    description: 'Interdisciplinary science combining criminology, molecular biology, instrumental chemistry, and crime scene investigation protocols.',
    careerProspects: 'Forensic Investigator, Crime Scene Officer, Laboratory Analyst, Cyber Crime Associate.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/ug-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'MSC-CHEM',
    name: 'M.Sc. Chemistry (Organic / Analytical)',
    deptCode: 'SCI',
    degreeLevel: 'POSTGRADUATE',
    category: 'POSTGRADUATE',
    durationYears: 2,
    eligibility: 'B.Sc. with Chemistry as a compulsory major subject (Minimum 50% aggregate).',
    specializations: JSON.stringify(['Synthetic Organic Chemistry', 'Spectroscopy & Instrumental Analysis', 'Green Chemistry']),
    description: 'Postgraduate exploration of reaction mechanisms, retrosynthetic analysis, NMR/Mass spectrometry, and chemical manufacturing.',
    careerProspects: 'Analytical Chemist, R&D Synthesis Chemist, Quality Assurance Lead, Academician.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/pg-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'MSC-BIOTECH',
    name: 'M.Sc. Biotechnology & Microbiology',
    deptCode: 'SCI',
    degreeLevel: 'POSTGRADUATE',
    category: 'POSTGRADUATE',
    durationYears: 2,
    eligibility: 'B.Sc. in Biotechnology, Microbiology, or Life Sciences (Minimum 50% aggregate).',
    specializations: JSON.stringify(['Recombinant DNA Technology', 'Immunology & Virology', 'Industrial Fermentation']),
    description: 'Postgraduate degree training students in molecular cloning, immunological assays, bioprocess optimization, and bioinformatics tools.',
    careerProspects: 'Biotech Research Scientist, Microbiologist, Clinical Lab Specialist, Quality Manager.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/pg-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'PHD-004',
    name: 'Ph.D. in Chemistry / Applied Sciences',
    deptCode: 'SCI',
    degreeLevel: 'DOCTORAL',
    category: 'DOCTORAL',
    durationYears: 3,
    eligibility: 'Master’s degree in relevant Science discipline (Minimum 55% marks); CSIR-NET / GATE / IUCET.',
    specializations: JSON.stringify(['Material Chemistry', 'Catalysis', 'Environmental Remediation']),
    description: 'Doctoral research covering synthetic reagents, functional materials, sustainable polymers, and environmental sensor development.',
    careerProspects: 'Senior Scientist, University Professor, Industrial Lab Director.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/doctoral-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },

  // --- FACULTY OF AGRICULTURE (2 Offerings) ---
  {
    code: 'BSC-AGRI',
    name: 'B.Sc. (Honours) Agriculture (4 Years)',
    deptCode: 'AGRI',
    degreeLevel: 'UNDERGRADUATE',
    category: 'UNDERGRADUATE',
    durationYears: 4,
    eligibility: '10+2 with Agriculture or Science stream (PCB/PCM) (Minimum 50% aggregate); ICAR recognized.',
    specializations: JSON.stringify(['Agronomy & Crop Production', 'Soil Science & Agricultural Chemistry', 'Plant Pathology & Entomology', 'Horticulture']),
    description: 'Comprehensive 4-year degree adhering to ICAR 5th Dean Committee guidelines, with practical field attachments (RAWE) and agro-industrial modules.',
    careerProspects: 'Agricultural Field Officer (AFO), Plantation Manager, Seed Technologist, Soil Testing Analyst.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/ug-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'PHD-018',
    name: 'Ph.D. in Agronomy / Agriculture',
    deptCode: 'AGRI',
    degreeLevel: 'DOCTORAL',
    category: 'DOCTORAL',
    durationYears: 3,
    eligibility: 'M.Sc. in Agriculture/Agronomy with minimum 55% aggregate marks; ICAR-NET / IUCET.',
    specializations: JSON.stringify(['Sustainable Agriculture', 'Precision Farming', 'Nutrient Management']),
    description: 'Doctoral research dedicated to crop yield optimization, drought-tolerant varieties, sustainable water management, and organic farming.',
    careerProspects: 'Principal Agricultural Scientist, Agronomist, Agricultural University Faculty.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/doctoral-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },

  // --- FACULTY OF EDUCATION (2 Offerings) ---
  {
    code: 'BSC-BED-INT',
    name: 'B.Sc. B.Ed. (Integrated 4 Years)',
    deptCode: 'EDU',
    degreeLevel: 'UNDERGRADUATE',
    category: 'UNDERGRADUATE',
    durationYears: 4,
    eligibility: '10+2 with Science stream (PCM/PCB) (Minimum 50% aggregate); NCTE Approved.',
    specializations: JSON.stringify(['Secondary Science Teaching', 'Pedagogical Psychology', 'Educational Technology']),
    description: 'NCTE-approved 4-year integrated dual degree qualifying graduates to teach secondary school sciences and mathematics immediately after graduation.',
    careerProspects: 'Secondary School Science Teacher, Educational Content Developer, Curriculum Designer.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/ug-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'BED',
    name: 'Bachelor of Education (B.Ed. 2 Years)',
    deptCode: 'EDU',
    degreeLevel: 'UNDERGRADUATE',
    category: 'UNDERGRADUATE',
    durationYears: 2,
    eligibility: 'Bachelor’s or Master’s degree in Sciences, Social Sciences, or Humanities with minimum 50% aggregate marks; NCTE Approved.',
    specializations: JSON.stringify(['Pedagogy of Mathematics & Sciences', 'Pedagogy of Languages & Social Sciences']),
    description: 'Professional teacher preparation programme focusing on classroom management, curriculum construction, educational evaluation, and teaching internship.',
    careerProspects: 'Trained Graduate Teacher (TGT), Post Graduate Teacher (PGT), Educational Administrator.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/ug-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },

  // --- FACULTY OF JOURNALISM & MASS COMMUNICATION (2 Offerings) ---
  {
    code: 'BAJMC',
    name: 'Bachelor of Arts in Journalism & Mass Communication (BAJMC)',
    deptCode: 'JMC',
    degreeLevel: 'UNDERGRADUATE',
    category: 'UNDERGRADUATE',
    durationYears: 3,
    eligibility: '10+2 in any stream from a recognized board (Minimum 50% aggregate).',
    specializations: JSON.stringify(['Broadcast Television & Radio', 'Digital Journalism & Social Media', 'Advertising & Public Relations']),
    description: 'Hands-on media education covering camera production, live anchoring, news writing, digital editing, and public relations campaigns.',
    careerProspects: 'News Anchor, Digital Content Creator, Investigative Journalist, PR Officer, Video Editor.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/ug-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  },
  {
    code: 'PHD-013',
    name: 'Ph.D. in Journalism & Mass Communication',
    deptCode: 'JMC',
    degreeLevel: 'DOCTORAL',
    category: 'DOCTORAL',
    durationYears: 3,
    eligibility: 'Master’s degree in Journalism/Mass Communication with minimum 55% marks (50% for SC/ST); UGC-NET / IUCET.',
    specializations: JSON.stringify(['Digital Media Ecosystems', 'Political Communication', 'Media Ethics & Disinformation']),
    description: 'Advanced research exploring social media dynamics, computational journalism, public sphere communication, and broadcast regulations.',
    careerProspects: 'Media Professor, Senior Communication Consultant, Media Research Director.',
    officialSourceUrl: 'https://www.invertisuniversity.ac.in/doctoral-programmes',
    hasOfficialSyllabus: false,
    isLateralEntry: false
  }
];

async function seedCatalog() {
  console.log('--- Starting University-Wide Course Discovery & Catalog Seeding ---');

  // Step 1: Upsert Departments
  const deptMap = {};

  // Check if legacy 'CSE' department exists
  const existingCseDept = await prisma.department.findUnique({ where: { code: 'CSE' } });
  if (existingCseDept) {
    console.log('Migrating existing CSE department to ENG (Faculty of Engineering & Technology)...');
    const updatedEng = await prisma.department.update({
      where: { code: 'CSE' },
      data: {
        code: 'ENG',
        name: 'Faculty of Engineering & Technology',
        facultyDean: 'Prof. (Dr.) R. K. Shukla, Dean Engineering',
        description: 'Premier faculty offering AICTE-approved engineering degrees, polytechnic diplomas, and cutting-edge tech specializations in Artificial Intelligence, Cloud Computing, IoT, Mechanical, Civil, and Electrical engineering.'
      }
    });
    deptMap['ENG'] = updatedEng.id;
  }

  for (const deptData of DEPARTMENTS) {
    if (deptData.code === 'ENG' && deptMap['ENG']) {
      continue; // already migrated
    }
    const dept = await prisma.department.upsert({
      where: { code: deptData.code },
      update: {
        name: deptData.name,
        facultyDean: deptData.facultyDean,
        description: deptData.description
      },
      create: {
        code: deptData.code,
        name: deptData.name,
        facultyDean: deptData.facultyDean,
        description: deptData.description
      }
    });
    deptMap[deptData.code] = dept.id;
    console.log(`Department synced: [${dept.code}] ${dept.name}`);
  }

  // Step 2: Upsert Discovered Programmes
  console.log('\nUpserting Academic Programmes...');
  let createdCount = 0;
  let updatedCount = 0;

  for (const prog of PROGRAMMES) {
    const deptId = deptMap[prog.deptCode];
    if (!deptId) {
      console.error(`Error: Department not found for code ${prog.deptCode}`);
      continue;
    }

    const existing = await prisma.programme.findUnique({
      where: { code: prog.code }
    });

    if (existing) {
      await prisma.programme.update({
        where: { code: prog.code },
        data: {
          departmentId: deptId,
          name: prog.name,
          degreeLevel: prog.degreeLevel,
          category: prog.category,
          durationYears: prog.durationYears,
          eligibility: prog.eligibility,
          specializations: prog.specializations,
          description: prog.description,
          careerProspects: prog.careerProspects,
          officialSourceUrl: prog.officialSourceUrl,
          hasOfficialSyllabus: prog.hasOfficialSyllabus,
          isLateralEntry: prog.isLateralEntry
        }
      });
      updatedCount++;
    } else {
      await prisma.programme.create({
        data: {
          code: prog.code,
          name: prog.name,
          departmentId: deptId,
          degreeLevel: prog.degreeLevel,
          category: prog.category,
          durationYears: prog.durationYears,
          eligibility: prog.eligibility,
          specializations: prog.specializations,
          description: prog.description,
          careerProspects: prog.careerProspects,
          officialSourceUrl: prog.officialSourceUrl,
          hasOfficialSyllabus: prog.hasOfficialSyllabus,
          isLateralEntry: prog.isLateralEntry
        }
      });
      createdCount++;
    }
  }

  console.log(`\nSuccessfully processed programmes: ${createdCount} created, ${updatedCount} updated.`);

  // Step 3: Verification
  const totalDepts = await prisma.department.count();
  const totalProgs = await prisma.programme.count();
  const totalSubjects = await prisma.subject.count();
  const totalResources = await prisma.academicResource.count();

  console.log('\n--- Seeding Verification Summary ---');
  console.log(`Total Departments: ${totalDepts}`);
  console.log(`Total Programmes: ${totalProgs}`);
  console.log(`Total Subjects (Integrity check): ${totalSubjects} (Must be 137)`);
  console.log(`Total Resources (Integrity check): ${totalResources} (Must be 143)`);

  if (totalSubjects === 137 && totalResources === 143) {
    console.log('VERIFICATION SUCCESSFUL: Zero loss of existing syllabus data or resources.');
  } else {
    console.warn('WARNING: Data count deviation detected!');
  }
}

seedCatalog()
  .catch((e) => {
    console.error('Fatal error seeding catalog:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
