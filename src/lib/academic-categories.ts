import { PrismaClient } from "@prisma/client";

export interface CategorySpec {
  code: string;
  name: string;
  description: string;
}

export const CORE_CATEGORIES: CategorySpec[] = [
  {
    code: "SYLLABUS",
    name: "Official Syllabus",
    description: "Official university curriculum and ordinance documents"
  },
  {
    code: "PYQ",
    name: "Previous-Year Paper",
    description: "Official previous-year semester and session examination papers"
  },
  {
    code: "NOTES",
    name: "Faculty Lecture Notes & Learning Materials",
    description: "Lecture notes, unit summaries, revision guides, typed notes and handwritten material"
  },
  {
    code: "LAB_MANUAL",
    name: "Laboratory Manual",
    description: "Practical experiment manuals, lab notes, practical files, programs and viva material"
  },
  {
    code: "PROJECT_ARCHIVE",
    name: "Capstone Project & Academic Knowledge Archive",
    description: "University project manuals, IEEE synopsis templates, and internship guidelines"
  }
];

export const NOTE_RESOURCE_TYPES = [
  { value: "COMPLETE_NOTES", label: "Complete Subject Notes" },
  { value: "UNIT_WISE", label: "Unit-wise Notes" },
  { value: "HANDWRITTEN", label: "Handwritten Notes" },
  { value: "TYPED", label: "Typed Notes" },
  { value: "REVISION", label: "Revision Notes" },
  { value: "IMPORTANT_QUESTIONS", label: "Important Questions" },
  { value: "SHORT_NOTES", label: "Short Notes" },
  { value: "EXAM_PREP", label: "Exam Preparation Notes" },
  { value: "LECTURE_NOTES", label: "Lecture Notes" },
  { value: "UNIT_SUMMARY", label: "Unit Summary" },
  { value: "PPT_SLIDES", label: "Presentation Slides" },
  { value: "FORMULA_SHEET", label: "Formula Sheet" },
] as const;

export const PRACTICAL_RESOURCE_TYPES = [
  { value: "LAB_MANUAL", label: "Lab Manual" },
  { value: "LAB_NOTES", label: "Lab Notes" },
  { value: "PRACTICAL_FILE", label: "Practical File" },
  { value: "PRACTICAL_PROGRAMS", label: "Practical Programs" },
  { value: "EXPERIMENT_SOLUTIONS", label: "Experiment Solutions" },
  { value: "VIVA_QUESTIONS", label: "Viva Questions & Answers" },
  { value: "CODE_TEMPLATE", label: "Starter Code Template" },
] as const;

export async function ensureCoreCategories(prisma: PrismaClient) {
  for (const cat of CORE_CATEGORIES) {
    await prisma.resourceCategory.upsert({
      where: { code: cat.code },
      update: { name: cat.name, description: cat.description },
      create: { code: cat.code, name: cat.name, description: cat.description }
    });
  }
}
