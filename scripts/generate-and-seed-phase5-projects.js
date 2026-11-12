const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createProjectPdf(filename, title, subtitle, author, sections) {
  const pdfDoc = await PDFDocument.create();
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const page = pdfDoc.addPage([595.28, 841.89]); // A4
  const { width, height } = page.getSize();

  // Header Banner
  page.drawRectangle({
    x: 0,
    y: height - 100,
    width: width,
    height: 100,
    color: rgb(0.08, 0.13, 0.24) // Deep Navy
  });

  page.drawText("INVERTIS UNIVERSITY BAREILLY", {
    x: 50,
    y: height - 42,
    size: 14,
    font: fontBold,
    color: rgb(1, 1, 1)
  });

  page.drawText("FACULTY OF ENGINEERING & TECHNOLOGY • DEPARTMENT KNOWLEDGE ARCHIVES", {
    x: 50,
    y: height - 60,
    size: 8,
    font: fontRegular,
    color: rgb(0.3, 0.78, 0.55) // Emerald
  });

  page.drawText(title, {
    x: 50,
    y: height - 85,
    size: 12,
    font: fontBold,
    color: rgb(1, 1, 1)
  });

  let currentY = height - 130;

  // Metadata Row
  page.drawRectangle({
    x: 50,
    y: currentY - 25,
    width: width - 100,
    height: 35,
    color: rgb(0.96, 0.97, 0.98),
    borderColor: rgb(0.88, 0.9, 0.92),
    borderWidth: 1
  });

  page.drawText(`Authority: ${author}  |  Regulation: Session 2023-2024  |  Curriculum Pillar: Phase 5`, {
    x: 60,
    y: currentY - 12,
    size: 8,
    font: fontRegular,
    color: rgb(0.2, 0.25, 0.3)
  });

  currentY -= 55;

  // Body Sections
  for (const sec of sections) {
    if (currentY < 120) break;

    page.drawText(sec.heading.toUpperCase(), {
      x: 50,
      y: currentY,
      size: 10,
      font: fontBold,
      color: rgb(0.12, 0.25, 0.45)
    });

    currentY -= 15;

    for (const point of sec.content) {
      if (currentY < 90) break;
      page.drawText(`•  ${point}`, {
        x: 60,
        y: currentY,
        size: 9,
        font: fontRegular,
        color: rgb(0.25, 0.3, 0.35)
      });
      currentY -= 14;
    }

    currentY -= 12;
  }

  // Footer
  page.drawLine({
    start: { x: 50, y: 50 },
    end: { x: width - 50, y: 50 },
    thickness: 1,
    color: rgb(0.85, 0.88, 0.9)
  });

  page.drawText("Invertis Learn Academic Companion — Generated Practice Project Archive", {
    x: 50,
    y: 36,
    size: 8,
    font: fontRegular,
    color: rgb(0.5, 0.55, 0.6)
  });

  page.drawText("Page 1 of 1", {
    x: width - 100,
    y: 36,
    size: 8,
    font: fontBold,
    color: rgb(0.5, 0.55, 0.6)
  });

  const pdfBytes = await pdfDoc.save();
  const destDir = require("./lib/storage-path.cjs").resourcePath('projects');
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const fullPath = path.join(destDir, filename);
  fs.writeFileSync(fullPath, pdfBytes);
  console.log(`[GENERATED] ${filename} (${(pdfBytes.length / 1024).toFixed(1)} KB)`);
  return pdfBytes.length;
}

async function seedPhase5() {
  console.log('==================================================================');
  console.log('  GENERATING & SEEDING PHASE 5: PROJECT & KNOWLEDGE ARCHIVES');
  console.log('==================================================================\n');

  // Step 1: Ensure Category Exists
  const projectCat = await prisma.resourceCategory.upsert({
    where: { code: 'PROJECT_ARCHIVE' },
    update: {
      name: 'Capstone Project & Academic Knowledge Archive',
      description: 'University project manuals, IEEE synopsis templates, internship report guidelines, and colloquium colloquia'
    },
    create: {
      code: 'PROJECT_ARCHIVE',
      name: 'Capstone Project & Academic Knowledge Archive',
      description: 'University project manuals, IEEE synopsis templates, internship report guidelines, and colloquium colloquia'
    }
  });
  console.log(`ResourceCategory PROJECT_ARCHIVE ready: ${projectCat.id}`);

  // Step 2: Generate Official PDF Documents
  const documents = [
    {
      filename: "Invertis_BTech_Capstone_Project_Manual_2023-24.pdf",
      title: "B.Tech Final-Year Capstone Project Guidelines & Manual",
      subtitle: "Practice Handbook for Project-II (BCS-753) and Project-III (BCS-854)",
      author: "Department of Computer Science & Engineering, Academic Council",
      resourceType: "PROJECT_MANUAL",
      targetCodes: ['BCS-753', 'BCS-854', 'BCSAI 706', 'BCSAI 802'],
      sections: [
        {
          heading: "1. Project Lifecycle & Milestone Phases",
          content: [
            "Phase I: Project Selection & IEEE Synopsis Defense (Within first 3 weeks).",
            "Phase II: Architecture Specification, SRS Documentation & Mid-Term Review (Week 7).",
            "Phase III: Prototype Implementation, Benchmarking & Code Verification (Week 12).",
            "Phase IV: Final Technical Dissertation Submission & External Viva Voce (Week 15)."
          ]
        },
        {
          heading: "2. Approved Technical Domains",
          content: [
            "Artificial Intelligence & Machine Learning: Explainable AI, LLM RAG pipelines, Vision.",
            "Distributed Systems & Cloud Computing: Microservices, Kubernetes, High-availability APIs.",
            "Cyber Security & Cryptography: Zero-trust architectures, vulnerability scanners.",
            "Internet of Things (IoT) & Embedded Robotics: Autonomous navigation, sensor telemetry."
          ]
        },
        {
          heading: "3. Evaluation Rubric & Marks Distribution (Total: 100 Marks)",
          content: [
            "Literature Review & Problem Formulation: 20 Marks (Internal Guide).",
            "System Architecture & Innovative Engineering: 30 Marks (Department Committee).",
            "Working Implementation & Quality of Code: 30 Marks (Lab Demonstration).",
            "Viva Voce Defense & Technical Report Presentation: 20 Marks (External Examiner)."
          ]
        }
      ]
    },
    {
      filename: "Invertis_Industrial_Training_Internship_Report_Guide.pdf",
      title: "Summer Industrial Training & Internship Diary Guidelines",
      subtitle: "Practice Handbook for Industrial Training Evaluation (BCS-754 / BCSAI 801)",
      author: "Directorate of Training & Placement, Invertis University",
      resourceType: "INTERNSHIP_GUIDE",
      targetCodes: ['BCS-754', 'BCSAI 801'],
      sections: [
        {
          heading: "1. Mandatory Internship Requirements",
          content: [
            "Minimum 6 to 8 weeks internship at an accredited industrial enterprise or tech company.",
            "Maintenance of Weekly Training Diary with supervisor sign-off and company seal.",
            "Submission of original Training Completion Certificate on company letterhead.",
            "Presentation of 25-page comprehensive technical training report following university format."
          ]
        },
        {
          heading: "2. Technical Report Structure",
          content: [
            "Company Profile, Product Ecosystem & Organizational Hierarchy.",
            "Technology Stack, Architecture & Tools utilized during the training period.",
            "Specific Problem Assigned, Modules Developed, and Practical Deliverables.",
            "Critical Learning Outcomes, Industry Challenges, and Professional Growth Summary."
          ]
        },
        {
          heading: "3. Evaluation & Viva Voce Scheme",
          content: [
            "Industry Supervisor Assessment Rating & Verification: 40% Weightage.",
            "Quality and Rigor of Technical Training Report: 30% Weightage.",
            "Departmental Oral Presentation & Technical Viva: 30% Weightage."
          ]
        }
      ]
    },
    {
      filename: "Invertis_IEEE_Project_Synopsis_Template.pdf",
      title: "Standard IEEE Format Project Synopsis Template",
      subtitle: "Mandatory 2-Column Template for Capstone Proposal Defense",
      author: "Academic Committee, Faculty of Engineering & Technology",
      resourceType: "IEEE_TEMPLATE",
      targetCodes: ['BCS-753', 'BCS-854', 'BCSAI 706', 'BCSAI 802'],
      sections: [
        {
          heading: "1. Synopsis Formatting Guidelines",
          content: [
            "Page Limit: Strictly maximum 4 pages in standard IEEE 2-column format.",
            "Typography: Title 18pt bold, Author affiliations 10pt, Body 10pt Times New Roman.",
            "Margins: Top 0.75 in, Bottom 1.0 in, Left 0.625 in, Right 0.625 in.",
            "Section Headings: Numbered with Roman Numerals (I. INTRODUCTION, II. PROBLEM STATEMENT)."
          ]
        },
        {
          heading: "2. Mandatory Sections",
          content: [
            "Abstract & Index Terms: 150-200 words summarizing objectives and novel methodologies.",
            "Literature Survey: Review of at least 8 recent IEEE/ACM peer-reviewed research papers.",
            "Proposed System Architecture: Block schematic with data-flow specifications.",
            "Hardware & Software Environment: Target operating system, frameworks, and APIs.",
            "Work Timeline (Gantt Chart): Week-by-week implementation milestones."
          ]
        }
      ]
    },
    {
      filename: "Invertis_MTech_Thesis_Colloquium_Guide_2023-24.pdf",
      title: "M.Tech Dissertation & Research Colloquium Guidelines",
      subtitle: "Handbook for Colloquium (MCS-151/251/351) & Thesis (MCS393/394)",
      author: "Postgraduate Research Board, Department of CSE",
      resourceType: "THESIS_GUIDE",
      targetCodes: ['MCS-151', 'MCS-251', 'MCS351', 'MCS393', 'MCS-394'],
      sections: [
        {
          heading: "1. Research Colloquium & Literature Review Standards",
          content: [
            "Colloquium I & II require exhaustive critical review of top-tier SCI/Scopus indexed literature.",
            "Presentation of 30-minute departmental seminar defending research gaps and methodology.",
            "Mandatory submission of draft research paper in IEEE Conference format.",
            "Plagiarism threshold: Less than 10% similarity index via Turnitin/Urkund."
          ]
        },
        {
          heading: "2. Preliminary Thesis & Final Dissertation Defense",
          content: [
            "MCS-393: Research proposal defense, mathematical modeling, simulation framework setup.",
            "MCS-394: Empirical validation, comparative benchmarking, and final thesis book submission.",
            "Requirement of at least one accepted publication in a peer-reviewed indexed journal.",
            "Open oral defense before External Examiner appointed by Vice-Chancellor."
          ]
        }
      ]
    }
  ];

  let totalSize = 0;
  for (const doc of documents) {
    const size = await createProjectPdf(doc.filename, doc.title, doc.subtitle, doc.author, doc.sections);
    totalSize += size;
  }

  // Step 3: Register Resources in Database
  let resourcesCount = 0;
  for (const doc of documents) {
    const filePath = `uploads/projects/${doc.filename}`;
    const fullDiskPath = path.join(process.cwd(), 'public', filePath);
    const stats = fs.statSync(fullDiskPath);

    for (const code of doc.targetCodes) {
      const subjects = await prisma.subject.findMany({
        where: {
          code: code,
          semester: {
            curriculumVersion: {
              isCurrent: true,
              programme: {
                department: { code: 'ENG' }
              }
            }
          }
        }
      });

      for (const sub of subjects) {
        // Delete existing identical resource for idempotency
        await prisma.academicResource.deleteMany({
          where: {
            subjectId: sub.id,
            storedFileName: doc.filename
          }
        });

        await prisma.academicResource.create({
          data: {
            subjectId: sub.id,
            categoryId: projectCat.id,
            title: doc.title,
            originalFileName: doc.filename,
            storedFileName: doc.filename,
            storagePath: filePath,
            mimeType: 'application/pdf',
            fileSizeBytes: stats.size,
            authorName: doc.author,
            resourceType: doc.resourceType,
            isPublished: false, provenanceStatus: "PRACTICE", sourceReference: "Repository-generated practice material"
          }
        });
        resourcesCount++;
      }
    }
  }

  // Step 4: Enrich Capstone & Project Syllabus Details
  console.log('\nEnriching Capstone & Project Syllabus Details...');
  const capstoneEnrichments = {
    'BCS-753': {
      title: "Project-II (Capstone Phase I)",
      modules: [
        {
          title: "MODULE-1: Problem Formulation & Literature Survey",
          topics: "Identification of real-world research or industrial problem statement. Comprehensive review of peer-reviewed literature and patent databases. Feasibility study, domain scoping, and submission of IEEE format Project Synopsis."
        },
        {
          title: "MODULE-2: Software Requirements & Architectural Design",
          topics: "Preparation of IEEE 830 compliant Software Requirements Specification (SRS). High-level and detailed architectural design, Unified Modeling Language (UML) structural and behavioral diagrams, Database schema design and API specification."
        },
        {
          title: "MODULE-3: Mid-Term Prototype Demonstration & Defense",
          topics: "Initial prototype implementation and module integration. Execution of initial test suites, proof-of-concept validation, and presentation of progress report before the Departmental Project Evaluation Committee."
        }
      ]
    },
    'BCS-854': {
      title: "Project-III (Capstone Final Dissertation)",
      modules: [
        {
          title: "MODULE-1: Full System Implementation & Engineering",
          topics: "Complete technical implementation of approved system architecture. Production deployment setup, continuous integration, frontend and backend integration, database tuning, and performance optimization."
        },
        {
          title: "MODULE-2: System Testing, Security Audit & Benchmarking",
          topics: "Comprehensive unit testing, integration testing, load testing, and security vulnerability analysis. Benchmarking performance against baseline metrics and state-of-the-art algorithms."
        },
        {
          title: "MODULE-3: Technical Dissertation & External Viva Defense",
          topics: "Preparation of 80-120 page final project thesis adhering to Invertis University guidelines. Demonstration of working production software, publication of project research paper, and defense before External Examiner."
        }
      ]
    },
    'BCS-754': {
      title: "Industrial Training & Internship Viva",
      modules: [
        {
          title: "MODULE-1: Industrial Exposure & Organization Structure",
          topics: "Active participation in 6-8 weeks summer internship within an approved industrial enterprise. Understanding organizational hierarchy, product lifecycle management, software development workflows, and agile team practices."
        },
        {
          title: "MODULE-2: Practical Project Execution in Industry",
          topics: "Execution of assigned commercial or production software tasks. Usage of enterprise tools, cloud infrastructure, version control, ticketing systems, and compliance frameworks."
        },
        {
          title: "MODULE-3: Technical Report Preparation & Viva Voce",
          topics: "Compilation of official Internship Training Diary, company evaluation feedback, and comprehensive internship report. Defense of practical competencies during university viva examination."
        }
      ]
    },
    'BCSAI 706': {
      title: "Mini Project (AI Systems)",
      modules: [
        {
          title: "MODULE-1: AI Problem Scoping & Dataset Acquisition",
          topics: "Formulation of machine learning or deep learning problem. Dataset acquisition, data cleaning, exploratory data analysis, feature engineering, and baseline model construction."
        },
        {
          title: "MODULE-2: Model Training, Tuning & Evaluation",
          topics: "Model training using PyTorch/TensorFlow, hyperparameter optimization, cross-validation, and performance evaluation using precision, recall, F1-score, and ROC-AUC curves."
        },
        {
          title: "MODULE-3: Model Deployment & Demonstration",
          topics: "Deployment of trained AI model via REST API or interactive web interface (Streamlit/FastAPI), containerization with Docker, and presentation before faculty panel."
        }
      ]
    },
    'BCSAI 802': {
      title: "Project (AI & ML Capstone)",
      modules: [
        {
          title: "MODULE-1: Advanced AI System Architecture",
          topics: "Design of end-to-end intelligent agent or machine learning system. Pipeline architecture from distributed data ingestion to real-time inference and model monitoring."
        },
        {
          title: "MODULE-2: Empirical Validation & Benchmark Testing",
          topics: "Ablation studies, comparative analysis against state-of-the-art architectures, model interpretability analysis (SHAP/LIME), and stress testing under high query loads."
        },
        {
          title: "MODULE-3: Final AI Dissertation & Viva Voce",
          topics: "Preparation of technical thesis, research paper submission, open-source code release, and final defense before external university examiner."
        }
      ]
    },
    'MCS-394': {
      title: "Master's Thesis Dissertation",
      modules: [
        {
          title: "MODULE-1: Theoretical Framework & Experimental Design",
          topics: "Formulation of advanced postgraduate research hypothesis. Mathematical proofs, algorithm design, simulation setup, and benchmark dataset curation."
        },
        {
          title: "MODULE-2: Novel Methodology Implementation & Verification",
          topics: "Implementation of proposed novel algorithms or architectural modifications. Comprehensive empirical evaluation, statistical significance testing, and complexity profiling."
        },
        {
          title: "MODULE-3: Master's Thesis Book Submission & Defense",
          topics: "Submission of peer-reviewed journal publication, thesis book formatted to university standards, and defense in open research colloquium before Vice-Chancellor's nominee."
        }
      ]
    }
  };

  let enrichedCount = 0;
  for (const [code, data] of Object.entries(capstoneEnrichments)) {
    const subs = await prisma.subject.findMany({
      where: {
        code: code,
        semester: {
          curriculumVersion: {
            isCurrent: true,
            programme: { department: { code: 'ENG' } }
          }
        }
      }
    });

    for (const sub of subs) {
      await prisma.subject.update({
        where: { id: sub.id },
        data: {
          syllabusDetails: JSON.stringify({
            objectives: [
              `To provide hands-on capstone engineering experience in ${sub.name}.`,
              "To apply theoretical knowledge to solve real-world industry and research challenges.",
              "To develop professional technical documentation, project management, and defense skills."
            ],
            outcomes: [
              `Formulate, analyze and solve complex engineering problems in ${sub.name}.`,
              "Design sustainable, high-performance system architectures and prototype implementations.",
              "Produce comprehensive technical documentation conforming to international IEEE standards.",
              "Effectively defend project methodology and results before an academic evaluation panel."
            ],
            modules: data.modules,
            referenceBooks: [
              "Invertis University Capstone Project Manual & Dissertation Guidelines (2023-24).",
              "IEEE Standards Style Manual & Author Guidelines for Academic Dissertations.",
              "Research Methodology: Methods and Techniques by C.R. Kothari, New Age International."
            ]
          })
        }
      });
      enrichedCount++;
      console.log(`Enriched structured syllabus for Capstone [${sub.code}] ${sub.name}`);
    }
  }

  console.log('\n==================================================================');
  console.log(`TOTAL PHYSICAL PROJECT MANUALS GENERATED: ${documents.length}`);
  console.log(`TOTAL DATABASE ACADEMIC RESOURCES LINKED: ${resourcesCount}`);
  console.log(`TOTAL CAPSTONE SUBJECTS ENRICHED: ${enrichedCount}`);
  console.log('==================================================================\n');

  await prisma.$disconnect();
}

seedPhase5().catch(console.error);

