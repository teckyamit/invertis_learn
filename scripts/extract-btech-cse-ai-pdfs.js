const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

const userUploadedDir = 'C:\\Users\\amitp\\.gemini\\antigravity\\brain\\b8f499ed-4ced-49c7-9a45-e44e4aa6579c\\.user_uploaded';
const subjectsOutDir = path.join(process.cwd(), 'public', 'uploads', 'syllabus', 'subjects');
const compositeOutDir = path.join(process.cwd(), 'public', 'uploads', 'syllabus', 'btech_cse_ai');

if (!fs.existsSync(subjectsOutDir)) fs.mkdirSync(subjectsOutDir, { recursive: true });
if (!fs.existsSync(compositeOutDir)) fs.mkdirSync(compositeOutDir, { recursive: true });

// Source PDF files
const pdfYear1 = 'media_1793768968262_48da2cb4.pdf'; // 21 pages (Sem 1 & 2)
const pdfYear2 = 'media_1793768968232_90080010.pdf'; // 22 pages (Sem 3 & 4)
const pdfYear3 = 'media_1793768968347_1bf7eb92.pdf'; // 28 pages (Sem 5 & 6)
const pdfYear4 = 'media_1793768968269_62050bb0.pdf'; // 14 pages (Sem 7 & 8)

// Mapping: courseCode -> { pdfFile, pages: [0-indexed page numbers] }
const subjectPageMappings = [
  // SEMESTER 1
  { code: 'ENG105', file: pdfYear1, pages: [3] },
  { code: 'BCSAI101', file: pdfYear1, pages: [4] },
  { code: 'BCSAI102', file: pdfYear1, pages: [5] },
  { code: 'BEE101', file: pdfYear1, pages: [6] },
  { code: 'BCSAI103', file: pdfYear1, pages: [7] },
  { code: 'IIOT1', file: pdfYear1, pages: [1] }, // from scheme
  { code: 'BCSAI104', file: pdfYear1, pages: [8] },
  { code: 'BEE102', file: pdfYear1, pages: [9] },
  { code: 'BCSAI105', file: pdfYear1, pages: [10] },
  { code: 'ENG113', file: pdfYear1, pages: [11] },

  // SEMESTER 2
  { code: 'BCSAI201', file: pdfYear1, pages: [12] },
  { code: 'BCSAI202', file: pdfYear1, pages: [13] },
  { code: 'CHY103', file: pdfYear1, pages: [14] },
  { code: 'BCSAI203', file: pdfYear1, pages: [15] },
  { code: 'BCSAI204', file: pdfYear1, pages: [16] },
  { code: 'BCSAI205', file: pdfYear1, pages: [17] },
  { code: 'IIOT2', file: pdfYear1, pages: [2] }, // from scheme
  { code: 'BCSAI206', file: pdfYear1, pages: [18] },
  { code: 'BCSAI207', file: pdfYear1, pages: [19] },
  { code: 'ENG114', file: pdfYear1, pages: [20] },

  // SEMESTER 3
  { code: 'BCSAI301', file: pdfYear2, pages: [2] },
  { code: 'BCSAI302', file: pdfYear2, pages: [3] },
  { code: 'BCSAI303', file: pdfYear2, pages: [4] },
  { code: 'BCSAI304', file: pdfYear2, pages: [5, 6] },
  { code: 'BCSAI305', file: pdfYear2, pages: [7] },
  { code: 'BCSAI306', file: pdfYear2, pages: [8] },
  { code: 'IIOT3', file: pdfYear2, pages: [0] }, // from scheme
  { code: 'BCSAI307', file: pdfYear2, pages: [9] },
  { code: 'BCSAI308', file: pdfYear2, pages: [10] },
  { code: 'BCSAI309', file: pdfYear2, pages: [11] },

  // SEMESTER 4
  { code: 'BCSAI401', file: pdfYear2, pages: [12] },
  { code: 'BCSAI402', file: pdfYear2, pages: [13] },
  { code: 'BCSAI403', file: pdfYear2, pages: [14] },
  { code: 'BCSAI404', file: pdfYear2, pages: [15] },
  { code: 'BCSAI405', file: pdfYear2, pages: [16] },
  { code: 'IIOT4', file: pdfYear2, pages: [1] }, // from scheme
  { code: 'BCSAI406', file: pdfYear2, pages: [17, 18] },
  { code: 'BCSAI407', file: pdfYear2, pages: [19] },
  { code: 'BCSAI408', file: pdfYear2, pages: [20] },
  { code: 'BCSAI409', file: pdfYear2, pages: [21] },

  // SEMESTER 5
  { code: 'BCSAI501', file: pdfYear3, pages: [4] },
  { code: 'BCSAI502', file: pdfYear3, pages: [5] },
  { code: 'BCSAI503', file: pdfYear3, pages: [6] },
  { code: 'BCSAI504', file: pdfYear3, pages: [7] },
  { code: 'BCSAI505', file: pdfYear3, pages: [8] },
  { code: 'BCSAI506', file: pdfYear3, pages: [13] },
  { code: 'BCSAI507', file: pdfYear3, pages: [14] },
  { code: 'BCSAI508', file: pdfYear3, pages: [15] },
  { code: 'IIOT5', file: pdfYear3, pages: [0] }, // from scheme
  { code: 'BCSAI509', file: pdfYear3, pages: [9] },
  { code: 'BCSAI510', file: pdfYear3, pages: [10] },
  { code: 'BCSAI511', file: pdfYear3, pages: [11] },
  { code: 'BCSAI512', file: pdfYear3, pages: [12] },

  // SEMESTER 6
  { code: 'BCSAI601', file: pdfYear3, pages: [16] },
  { code: 'BCSAI602', file: pdfYear3, pages: [17] },
  { code: 'BCSAI603', file: pdfYear3, pages: [18] },
  { code: 'BCSAI604', file: pdfYear3, pages: [19] },
  { code: 'BCSAI605', file: pdfYear3, pages: [20] },
  { code: 'BCSAI606', file: pdfYear3, pages: [25] },
  { code: 'BCSAI607', file: pdfYear3, pages: [26] },
  { code: 'BCSAI608', file: pdfYear3, pages: [27] },
  { code: 'IIOT6', file: pdfYear3, pages: [2] }, // from scheme
  { code: 'BCSAI609', file: pdfYear3, pages: [21] },
  { code: 'BCSAI610', file: pdfYear3, pages: [22] },
  { code: 'BCSAI611', file: pdfYear3, pages: [23] },
  { code: 'BCSAI612', file: pdfYear3, pages: [24] },

  // SEMESTER 7
  { code: 'BCSAI701', file: pdfYear4, pages: [2] },
  { code: 'BCSAI702', file: pdfYear4, pages: [3] },
  { code: 'BCSAI703', file: pdfYear4, pages: [4] },
  { code: 'BCSAI704', file: pdfYear4, pages: [5] },
  { code: 'MGT103', file: pdfYear4, pages: [6] },
  { code: 'MGT201', file: pdfYear4, pages: [11] },
  { code: 'MBA204', file: pdfYear4, pages: [12] },
  { code: 'BCSAI705', file: pdfYear4, pages: [7] },
  { code: 'BCSAI706', file: pdfYear4, pages: [8] },
  { code: 'BCSAI707', file: pdfYear4, pages: [9] },
  { code: 'BCSAI708', file: pdfYear4, pages: [10] },

  // SEMESTER 8
  { code: 'BCSAI801', file: pdfYear4, pages: [13] },
  { code: 'BCSAI802', file: pdfYear4, pages: [1] }, // from scheme
  { code: 'BCSAI803', file: pdfYear4, pages: [1] }, // from scheme
  { code: 'BCSAI804', file: pdfYear4, pages: [1] }, // from scheme
  { code: 'BCSAI805', file: pdfYear4, pages: [1] }, // from scheme
];

async function main() {
  console.log('--- Step 1: Copy Composite Source PDFs to Public ---');
  fs.copyFileSync(path.join(userUploadedDir, pdfYear1), path.join(compositeOutDir, 'BTech_CSE_AI_Year_1_Syllabus.pdf'));
  fs.copyFileSync(path.join(userUploadedDir, pdfYear2), path.join(compositeOutDir, 'BTech_CSE_AI_Year_2_Syllabus.pdf'));
  fs.copyFileSync(path.join(userUploadedDir, pdfYear3), path.join(compositeOutDir, 'BTech_CSE_AI_Year_3_Syllabus.pdf'));
  fs.copyFileSync(path.join(userUploadedDir, pdfYear4), path.join(compositeOutDir, 'BTech_CSE_AI_Year_4_Syllabus.pdf'));
  console.log('Saved 4 annual/composite PDFs in public/uploads/syllabus/btech_cse_ai/');

  console.log('\n--- Step 2: Load Source PDFs in Memory ---');
  const cache = {};
  const loadPdf = async (filename) => {
    if (!cache[filename]) {
      const bytes = fs.readFileSync(path.join(userUploadedDir, filename));
      cache[filename] = await PDFDocument.load(bytes);
    }
    return cache[filename];
  };

  console.log('\n--- Step 3: Extract Isolated Subject-Wise Syllabus PDFs ---');
  let count = 0;
  for (const item of subjectPageMappings) {
    const srcDoc = await loadPdf(item.file);
    const subDoc = await PDFDocument.create();
    const copiedPages = await subDoc.copyPages(srcDoc, item.pages);
    copiedPages.forEach(p => subDoc.addPage(p));
    const subPdfBytes = await subDoc.save();
    const outFilename = `${item.code}_Syllabus.pdf`;
    const outPath = path.join(subjectsOutDir, outFilename);
    fs.writeFileSync(outPath, subPdfBytes);
    count++;
    console.log(`[${count}/${subjectPageMappings.length}] Extracted ${item.code} (${item.pages.length} pages) -> ${outFilename}`);
  }

  console.log(`\nSuccessfully extracted all ${count} subject-isolated PDFs!`);
}

main().catch(console.error);
