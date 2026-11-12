const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- Ingesting Official Ph.D. CSE Syllabus ---');

  const programme = await prisma.programme.findUnique({
    where: { code: 'PHD-009' }
  });

  if (!programme) {
    throw new Error('Programme PHD-009 not found in database.');
  }

  // Update programme status
  await prisma.programme.update({
    where: { code: 'PHD-009' },
    data: {
      hasOfficialSyllabus: true,
      officialSourceUrl: 'https://www.invertisuniversity.ac.in/doctoral-programmes/phd-cse'
    }
  });

  // Ensure CurriculumVersion exists
  let cv = await prisma.curriculumVersion.findFirst({
    where: { programmeId: programme.id, versionYear: '2024-2025' }
  });

  if (!cv) {
    cv = await prisma.curriculumVersion.create({
      data: {
        programmeId: programme.id,
        versionYear: '2024-2025',
        regulationName: 'Doctoral Coursework Regulations 2024-25',
        isCurrent: true,
        description: 'Official Ph.D. in Computer Science & Engineering curriculum structure and syllabi.'
      }
    });
    console.log('Created CurriculumVersion:', cv.id);
  } else {
    await prisma.curriculumVersion.update({
      where: { id: cv.id },
      data: { isCurrent: true }
    });
    console.log('Using existing CurriculumVersion:', cv.id);
  }

  // Ensure Semester 1 exists
  let sem1 = await prisma.semester.findFirst({
    where: { curriculumVersionId: cv.id, semesterNumber: 1 }
  });

  if (!sem1) {
    sem1 = await prisma.semester.create({
      data: {
        curriculumVersionId: cv.id,
        semesterNumber: 1,
        title: 'Pre-Ph.D. Coursework'
      }
    });
    console.log('Created Semester 1:', sem1.id);
  } else {
    console.log('Using existing Semester 1:', sem1.id);
  }

  // Define the official subjects from the Invertis syllabus document
  const subjectsData = [
    {
      code: 'PhD-032',
      name: 'Advance Research Studies in Computer Engineering',
      credits: 4.0,
      subjectType: 'THEORY',
      electiveGroup: null,
      lectureHours: 4,
      tutorialHours: 0,
      practicalHours: 0,
      evaluationMarks: 'Continuous Assessment: 30, Final Examination: 70, Total: 100',
      syllabusDetails: JSON.stringify({
        objectives: 'To provide advanced theoretical and practical foundation in data warehousing, data mining algorithms, high-speed computer networks, ad-hoc routing, and simulation environments.',
        outcomes: 'Scholars will be able to design data warehouse architectures, implement data mining algorithms, analyze high-speed protocols, and simulate network models using MatLab and NS-2.',
        modules: [
          {
            title: 'Module-I (Data Warehouse and Mining)',
            topics: 'Introduction to Data Warehousing. Client/Server Computing mode, Parallel processors & Cluster Systems. Data Warehousing Components, Building a Data Warehouse, Mapping the Data Warehousing to a Multiprocessor Architecture, DBMS Schemas for Decision Support.\nIntroduction to Data Mining. Decision Trees, Neural Networks, Nearest Neighbor & Clustering, Genetic Algorithms, Rule Induction, Selecting & Using the Right Technique.'
          },
          {
            title: 'Module-II (Advance Computer Network and Ad-hoc Networks)',
            topics: 'Next Generation IP protocol, TCP extensions for high speed network, Introduction to SCTP. P2P file sharing and structure overlay network. Introduction to wireless and ad-hoc networks, Mobility in networks, Mobile IP, Mobile TCP, advantages and limitations of ad-hoc networks, Routing in MANETs.'
          },
          {
            title: 'Module-III (Simulation & Computing Tools)',
            topics: 'Introduction to MatLab and NS-2.'
          }
        ],
        textBooks: [
          'Jiawei Han, Micheline Kamber, "Data Mining: Concepts and Techniques", Morgan Kaufmann Publishers',
          'William Stallings, "High-Speed Networks and Internets: Performance and Quality of Service", Pearson Education'
        ],
        referenceBooks: [
          'Andrew S. Tanenbaum, "Computer Networks", Prentice Hall India',
          'Teerawat Issariyakul, Ekram Hossain, "Introduction to Network Simulator NS2", Springer'
        ]
      })
    },
    {
      code: 'PhDCS 103',
      name: 'Software Project Management',
      credits: 4.0,
      subjectType: 'THEORY',
      electiveGroup: 'Departmental Elective',
      lectureHours: 4,
      tutorialHours: 0,
      practicalHours: 0,
      evaluationMarks: 'Continuous Assessment: 30, Final Examination: 70, Total: 100',
      syllabusDetails: JSON.stringify({
        objectives: 'To impart rigorous project governance concepts, PMI processes, development lifecycles, risk management, test engineering, and MS-Project tool applications.',
        outcomes: 'Scholars will be equipped to manage large-scale software engineering projects, budget resources, evaluate earned value metrics, and manage software quality testing.',
        modules: [
          {
            title: 'MODULE I: Project Overview, Planning Phase & Estimation',
            topics: 'Overview of Project Management, PMI Processes, Software project phases, Organizational structures, Project charter, Statement of Work (SOW) Planning Phase, Development lifecycle models, Matching lifecycles to projects, Project plans, Work Breakdown Structures (WBS) Estimation and Budgeting, Estimation, Budgeting, Project, selection, NPV, ROI, Payback models'
          },
          {
            title: 'MODULE II: Scheduling, Risk & Development Management',
            topics: 'Scheduling, Project network diagram fundamentals, PERT techniques, Gantt charts, Critical chain scheduling Risk and Change Management, Mid-term review , Risk management, Change control, More MS-Project.\nDevelopment Management, Team models, Requirements process, Configuration, management, Software metrics, Programming languages & tools, Managing conflict and motivating, MS-Project: Assigning Resources.'
          },
          {
            title: 'MODULE III: Project Control, System Test Process & Final Phases',
            topics: 'Project Control, Status reporting, Project metrics, Earned value analysis, Communications Techniques, Process Improvement, MS Project: (a) Resource leveling (b) Other views\nSystem Test Process, Test specifications, Black box and white box testing, Test scripts, Unit and integration testing, Acceptance test specifications, Test tools, MS Project:(a) Reporting.\nFinal Phases & Other Issues, Project Recovery, Documentation, Cutover/Migration Post Project Reviews, Closing, MS Project: (a) Advanced features.'
          }
        ],
        textBooks: [
          'S. McConnell, "Software Project Survival Guide" (1997)',
          'W. Royce, "Software Project Management: A Unified Framework", (1998)'
        ],
        referenceBooks: [
          'S. McConnell, "Software Project Survival Guide" (1997)',
          'S. Berkun, "The Art of Project Management", (2005)',
          'C. Larman, "Agile and Iterative Development: A Manager\'s Guide", (2003)',
          'W. Royce, "Software Project Management: A Unified Framework", (1998)',
          'J. Highsmith, "Agile Project Management: Creating Innovative Products", (2004)',
          'T. DeMarco, "The Deadline: A Novel About Project Management", (1997)',
          'T. DeMarco, "Peopleware: Productive Projects and Teams", (1999)',
          'E. Bennatan, "On Time Within Budget: Software Project Management Practices and Techniques", (2000)'
        ]
      })
    },
    {
      code: 'PhDCS 104',
      name: 'Networking Protocols',
      credits: 4.0,
      subjectType: 'THEORY',
      electiveGroup: 'Departmental Elective',
      lectureHours: 4,
      tutorialHours: 0,
      practicalHours: 0,
      evaluationMarks: 'Continuous Assessment: 30, Final Examination: 70, Total: 100',
      syllabusDetails: JSON.stringify({
        objectives: 'To study network design principles, OSI and TCP/IP protocol suites, ATM cell transport, client-server socket programming, and next-generation IPv6 routing architectures.',
        outcomes: 'Scholars will master protocol implementations, socket-level network engineering, multicast routing, and internet security.',
        modules: [
          {
            title: 'MODULE I: Networks & Services, OSI Reference Model & IP Routing',
            topics: 'Networks and Services, Approaches to Network Design, The OSI Reference Model; Overview of TCP/IP Architecture, Application Protocols and TCP/IP Utilities, Internet Architecture Interconnection through IP Routers, Internet Protocol (IP), User datagram protocol (UDP).'
          },
          {
            title: 'MODULE II: Routing Cores, Multicast, ATM Networks & Internet Services',
            topics: 'Routing Cores - peers Algorithms Autonomous Systems Exterior Gateway Protocol Multicast Address. Internet Group Management Protocol (IGMP) and Implementation. TCP/IP over ATM networks: ATM cell Transport, Adaptation Layer, IP Address Building in an ATM network Logical IP subnet Concept ATMARP packet format. Domain name system, Remote Login (Telnet, Rlogin) File Transfer and Access (FTP, TFTP, NFS), Electronic mail (SMTP, MIME) Internet Management (SNMP, SNMPV2) Internet Security and Firewall Design Post Office Protocol (POP) Network News Transfer Protocol (NNTP).'
          },
          {
            title: 'MODULE III: TCP/IP Transport Layer, Socket API & Client-Server Systems',
            topics: 'TCP/IP over view- The Transport Layer: TCP and UDP. Elementary TCP Sockets. TCP Client-Server Example. I/O Multiplexing: The select and poll Functions. Socket Options. Elementary UDP Sockets. Elementary Name and Address Conversions. The Client Server Model and Software Design, Concurrent Processing in Client-Server Software, Iterative, Connectionless Servers (UDP), Iterative, Connection-Oriented Servers (TCP), Concurrent, Connection-Oriented Servers (TCP). Single-Process, Concurrent Servers (TCP). Multiprotocol Servers (TCP, UDP), Multiservice Servers (TCP, UDP). Uniform, Efficient Management of server. Concurrency in clients. TCP/IP Architecture, The Internet Protocol, Limitations of IPv4 and Introduction to IPv6, User Datagram Protocol, Transmission Control Protocol, DHCP, Introduction to Internet Routing Protocols'
          }
        ],
        textBooks: [
          'A. Leon-Garcia, Indra Widjaja, "Communication Networks", Tata McGraw Hill, 2000',
          'William Stallings, "Data and Computer Communications", Pearson Education, 7th Edition.'
        ],
        referenceBooks: [
          'A. Leon-Garcia, Indra Widjaja, "Communication Networks", Tata McGraw Hill, 2000',
          'William Stallings, "Data and Computer Communications", Pearson Education, 7th Edition.',
          'Andrew S. Tanenbaum, "Computer Networks", Prentice Hall India, 4th Edition, 2003',
          'W.Richard Stevens: TCP/IP Illustrated vol 1: The Protocols, Pearson Edun. Asia, 2000.',
          'Douglas Comer: Internetworking with TCP/IP vol.1: Principles, Protocols and Architecture, Prentice Hall, 4th edition, 2000'
        ]
      })
    },
    {
      code: 'PhDCS 105',
      name: 'Real Time Systems',
      credits: 4.0,
      subjectType: 'THEORY',
      electiveGroup: 'Departmental Elective',
      lectureHours: 4,
      tutorialHours: 0,
      practicalHours: 0,
      evaluationMarks: 'Continuous Assessment: 30, Final Examination: 70, Total: 100',
      syllabusDetails: JSON.stringify({
        objectives: 'To analyze real-time computing constraints, task models, periodic and aperiodic scheduling algorithms, resource contention control, and multi-processor validation.',
        outcomes: 'Scholars will be able to design predictable real-time embedded systems, verify schedulability bounds, and implement priority ceiling protocols.',
        modules: [
          {
            title: 'MODULE I: Issues in Real Time Computing, Task Models & Scheduling',
            topics: 'Time System, Issues in real time computing, Performance measures of Real Time System, Issues in Real Time Computing, Performance measures of Real time Systems, Real Time Application.Task Assignment and Scheduling: Different task model, Scheduling hierarchy, offline vs Online Scheduling, Clock Drives. Model of Real Time System: Processor, resources, temporal parameter, Periodic Task Model, Sporadic Task Model, Precedence Constraints and Data Dependencies, Scheduling hierarchy Scheduling of Periodic Task: Assumptions, fixed versus dynamic priority algorithms, schedulability test for fixed priority task with arbitrary deadlines.'
          },
          {
            title: 'MODULE II: Scheduling of Aperiodic & Sporadic Tasks',
            topics: 'Scheduling of Aperiodic and Sporadic Tasks: Assumptions and approaches, deferrable, sporadic servers, slack stealing in deadline driven and fixed priority systems. Two level scheme for integrated scheduling, Scheduling for applications having flexible constrains.'
          },
          {
            title: 'MODULE III: Resources Access Control & Real Time Protocols',
            topics: 'Resources and Resource Access Control: Assumptions on resources and their usage, resource contention, resource access control(Priority Ceiling Protocol, Priority Inheritance protocol, Slack Based Priority Ceiling Protocol, Peremption Ceiling Protocol). Multi Processor Scheduling: Model of multi processor and distributed systems, Scheduling algorithms for end to end periodic tasks in homogeneous/heterogeneous systems, Predictability and validation of dynamic multiprocessor system. Real time Communication: Model of real time Communication, Priority base service For switched network, Weighted Round Robin Service, Medium access Control Protocol, Real Time Protocol.'
          }
        ],
        textBooks: [
          'Jane .W. S. Liu Real Time Systems Pearson Education.',
          'Krishna .C.M Real Time Systems Mc-Graw Hill Publication'
        ],
        referenceBooks: [
          'Jane .W. S. Liu Real Time Systems Pearson Education.',
          'Krishna .C.M Real Time Systems Mc-Graw Hill Publication'
        ]
      })
    },
    {
      code: 'PhDRM 101',
      name: 'Research Methodology',
      credits: 4.0,
      subjectType: 'THEORY',
      electiveGroup: null,
      lectureHours: 4,
      tutorialHours: 0,
      practicalHours: 0,
      evaluationMarks: 'Continuous Assessment: 30, Final Examination: 70, Total: 100',
      syllabusDetails: JSON.stringify({
        objectives: 'Foundational compulsory doctoral paper covering systematic research design, scientific investigation, statistical analysis, hypothesis testing, literature synthesis, and scholarly writing.',
        outcomes: 'Scholars will formulate research hypotheses, execute statistical tests, conduct systematic literature reviews, and author peer-reviewed manuscripts.',
        modules: [
          {
            title: 'Unit I: Foundations & Objectives of Research',
            topics: 'Meaning, objectives, and motivation of scientific and engineering research. Types of research: Descriptive vs. Analytical, Applied vs. Fundamental, Quantitative vs. Qualitative, Conceptual vs. Empirical. Criteria of good scientific research and ethical imperatives.'
          },
          {
            title: 'Unit II: Research Problem Formulation & Literature Survey',
            topics: 'Identifying, delineating, and formulating engineering research problems. Systematic literature review methodologies (PRISMA framework and synthesis matrices). Formulation of null and alternate hypotheses (H0 vs. H1). Sampling methods and measurement errors.'
          },
          {
            title: 'Unit III: Data Analysis, Statistical Inference & Software Tools',
            topics: 'Quantitative data processing: descriptive statistics, dispersion, and central tendencies. Inferential statistics: parametric vs. non-parametric hypothesis tests (t-test, z-test, ANOVA, Mann-Whitney U, Kruskal-Wallis, Chi-square). Regression analysis and statistical computing environments (R and Python).'
          },
          {
            title: 'Unit IV: Scholarly Dissemination, Technical Writing & Reference Management',
            topics: 'Structure of an academic engineering paper (IMRaD framework). Reference management tools: Zotero, Mendeley, and BibTeX. Overleaf and LaTeX typesetting for conference and journal manuscripts.'
          },
          {
            title: 'Unit V: Intellectual Property Rights & Academic Integrity',
            topics: 'Intellectual Property Rights: Patents, Copyrights, Trademarks, and Trade Secrets. Patent filing procedure in India and internationally (PCT). Plagiarism metrics, Turnitin/Urkund verification.'
          }
        ],
        textBooks: [
          'C. R. Kothari, "Research Methodology: Methods and Techniques", New Age International',
          'Wayne Goddard, Stuart Melville, "Research Methodology: An Introduction", Juta & Co'
        ],
        referenceBooks: [
          'Donald H. McBurney, "Research Methods", Thomson Learning'
        ]
      })
    },
    {
      code: 'RPE 101',
      name: 'Research and Publication Ethics',
      credits: 2.0,
      subjectType: 'THEORY',
      electiveGroup: null,
      lectureHours: 2,
      tutorialHours: 0,
      practicalHours: 0,
      evaluationMarks: 'Continuous Assessment: 20, Final Examination: 30, Total: 50',
      syllabusDetails: JSON.stringify({
        objectives: 'UGC-mandated course covering moral philosophy, scientific misconduct, publication ethics, predatory publishing awareness, and database metrics.',
        outcomes: 'Scholars will identify predatory publishers, avoid publication misconduct, and adhere to COPE ethics guidelines.',
        modules: [
          {
            title: 'Module 1: Philosophy, Ethics & Scientific Misconduct',
            topics: 'Moral philosophy, nature of moral judgments and reactions, professional ethics. Scientific misconduct: Fabrication, Falsification, and Plagiarism (FFP). Redundant and duplicate publications, salami slicing.'
          },
          {
            title: 'Module 2: Publication Ethics, Predatory Publishing & Metrics',
            topics: 'Committee on Publication Ethics (COPE) guidelines. Predatory journals and publishers: Identifying fake metrics, deceptive conferences (Think-Check-Submit). Indexing and citation databases: Web of Science (SCIE), Scopus, PubMed. Research metrics: Impact Factor, CiteScore, h-index, g-index.'
          }
        ],
        textBooks: [
          'P. Chaddah, "Ethics in Competitive Research: Do not get scooped; do not get plagiarized", ISBN: 978-9387480865',
          'National Academy of Sciences, "On Being a Scientist: A Guide to Responsible Conduct in Research", The National Academies Press'
        ],
        referenceBooks: [
          'COPE guidelines: https://publicationethics.org'
        ]
      })
    },
    {
      code: 'PhD-SEM',
      name: 'Doctoral Seminar & Research Literature Survey',
      credits: 2.0,
      subjectType: 'SEMINAR',
      electiveGroup: null,
      lectureHours: 0,
      tutorialHours: 0,
      practicalHours: 4,
      evaluationMarks: 'RAC Presentation & Defense: 100',
      syllabusDetails: JSON.stringify({
        objectives: 'Critical literature survey paper presented before the Departmental Research Committee (DRC) focusing on candidate\'s chosen research domain, identifying key gaps, and formulating the initial research proposal.',
        outcomes: 'Scholars will produce a publishable state-of-the-art survey and defend their doctoral research direction.',
        modules: [
          {
            title: 'Literature Survey & Seminar Defense',
            topics: 'Comprehensive review of minimum 30–50 high-impact peer-reviewed papers in the domain. Preparation of a state-of-the-art survey document with comparative taxonomy. Oral defense and presentation before the Research Advisory Committee (RAC).'
          }
        ],
        textBooks: [],
        referenceBooks: []
      })
    }
  ];

  for (const s of subjectsData) {
    const existing = await prisma.subject.findFirst({
      where: {
        semesterId: sem1.id,
        code: s.code
      }
    });

    if (existing) {
      await prisma.subject.update({
        where: { id: existing.id },
        data: s
      });
      console.log(`Updated subject: [${s.code}] ${s.name}`);
    } else {
      await prisma.subject.create({
        data: {
          semesterId: sem1.id,
          ...s
        }
      });
      console.log(`Created subject: [${s.code}] ${s.name}`);
    }
  }

  console.log('--- Successfully Ingested All Ph.D. Coursework Subjects! ---');
}

main().catch(console.error).finally(() => prisma.$disconnect());

