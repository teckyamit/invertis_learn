export type Role = "SUPER_ADMIN" | "DEPARTMENT_ADMIN" | "FACULTY" | "STUDENT";

export type DegreeLevel = "UNDERGRADUATE" | "POSTGRADUATE" | "DIPLOMA";

export type SubjectType = "THEORY" | "PRACTICAL" | "MANDATORY" | "PROJECT" | "SEMINAR";

export interface DepartmentDTO {
  id: string;
  code: string;
  name: string;
  isActive: boolean;
}

export interface ProgrammeDTO {
  id: string;
  departmentId: string;
  code: string;
  name: string;
  degreeLevel: string;
  durationYears: number;
}

export interface CurriculumVersionDTO {
  id: string;
  programmeId: string;
  versionYear: string;
  regulationName: string | null;
  isCurrent: boolean;
}

export interface SemesterDTO {
  id: string;
  curriculumVersionId: string;
  semesterNumber: number;
  title: string;
}

export interface SubjectDTO {
  id: string;
  semesterId: string;
  code: string;
  name: string;
  lectureHours: number;
  tutorialHours: number;
  practicalHours: number;
  credits: number;
  subjectType: string;
  electiveGroup: string | null;
  syllabusUnits?: string | null;
}

export interface AcademicResourceDTO {
  id: string;
  subjectId: string;
  categoryId: string;
  title: string;
  originalFileName: string;
  storedFileName: string;
  storagePath: string;
  mimeType: string;
  fileSizeBytes: number;
  versionNumber: number;
  isPublished: boolean;
  createdAt: Date;
}
