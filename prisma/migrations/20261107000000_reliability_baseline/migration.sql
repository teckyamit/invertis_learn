-- CreateTable
CREATE TABLE "Department" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "facultyDean" TEXT,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Programme" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "departmentId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "degreeLevel" TEXT NOT NULL DEFAULT 'UNDERGRADUATE',
    "category" TEXT NOT NULL DEFAULT 'UNDERGRADUATE',
    "durationYears" INTEGER NOT NULL DEFAULT 4,
    "eligibility" TEXT,
    "specializations" TEXT,
    "description" TEXT,
    "careerProspects" TEXT,
    "officialSourceUrl" TEXT,
    "hasOfficialSyllabus" BOOLEAN NOT NULL DEFAULT false,
    "isLateralEntry" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Programme_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CurriculumVersion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "programmeId" TEXT NOT NULL,
    "versionYear" TEXT NOT NULL,
    "regulationName" TEXT,
    "isCurrent" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CurriculumVersion_programmeId_fkey" FOREIGN KEY ("programmeId") REFERENCES "Programme" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Semester" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "curriculumVersionId" TEXT NOT NULL,
    "semesterNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    CONSTRAINT "Semester_curriculumVersionId_fkey" FOREIGN KEY ("curriculumVersionId") REFERENCES "CurriculumVersion" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "semesterId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lectureHours" INTEGER NOT NULL DEFAULT 3,
    "tutorialHours" INTEGER NOT NULL DEFAULT 1,
    "practicalHours" INTEGER NOT NULL DEFAULT 0,
    "credits" REAL NOT NULL DEFAULT 3.0,
    "subjectType" TEXT NOT NULL DEFAULT 'THEORY',
    "electiveGroup" TEXT,
    "evaluationMarks" TEXT,
    "syllabusDetails" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Subject_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ResourceCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "AcademicResource" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "subjectId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "originalFileName" TEXT NOT NULL,
    "storedFileName" TEXT NOT NULL,
    "storagePath" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL DEFAULT 'application/pdf',
    "fileSizeBytes" INTEGER NOT NULL,
    "versionNumber" INTEGER NOT NULL DEFAULT 1,
    "academicYear" TEXT,
    "examType" TEXT,
    "hasSolutions" BOOLEAN NOT NULL DEFAULT false,
    "unitNumber" INTEGER,
    "resourceType" TEXT,
    "authorName" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "provenanceStatus" TEXT NOT NULL DEFAULT 'UNVERIFIED',
    "sourceReference" TEXT,
    "reviewedBy" TEXT,
    "reviewedAt" DATETIME,
    "reviewNote" TEXT,
    "uploadedById" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AcademicResource_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "AcademicResource_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ResourceCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AcademicResource_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'STUDENT',
    "departmentId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExternalResource" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "subjectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "unitNumber" INTEGER,
    "topic" TEXT,
    "pricingType" TEXT NOT NULL DEFAULT 'FREE',
    "resourceType" TEXT NOT NULL DEFAULT 'TUTORIAL',
    "isVerified" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ExternalResource_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VideoLecture" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "subjectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "youtubeUrl" TEXT NOT NULL,
    "youtubeId" TEXT NOT NULL,
    "videoType" TEXT NOT NULL DEFAULT 'PLAYLIST',
    "channelName" TEXT NOT NULL,
    "unitNumber" INTEGER,
    "topic" TEXT,
    "description" TEXT NOT NULL,
    "pricingType" TEXT NOT NULL DEFAULT 'FREE',
    "isVerified" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "VideoLecture_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AuditEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "action" TEXT NOT NULL,
    "targetId" TEXT,
    "actor" TEXT NOT NULL,
    "detail" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Department_code_key" ON "Department"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Programme_code_key" ON "Programme"("code");

-- CreateIndex
CREATE UNIQUE INDEX "CurriculumVersion_programmeId_versionYear_key" ON "CurriculumVersion"("programmeId", "versionYear");

-- CreateIndex
CREATE UNIQUE INDEX "Semester_curriculumVersionId_semesterNumber_key" ON "Semester"("curriculumVersionId", "semesterNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_semesterId_code_key" ON "Subject"("semesterId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "ResourceCategory_code_key" ON "ResourceCategory"("code");

-- CreateIndex
CREATE INDEX "AcademicResource_subjectId_categoryId_idx" ON "AcademicResource"("subjectId", "categoryId");

-- CreateIndex
CREATE INDEX "AcademicResource_categoryId_academicYear_idx" ON "AcademicResource"("categoryId", "academicYear");

-- CreateIndex
CREATE INDEX "AcademicResource_categoryId_resourceType_idx" ON "AcademicResource"("categoryId", "resourceType");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "ExternalResource_subjectId_category_idx" ON "ExternalResource"("subjectId", "category");

-- CreateIndex
CREATE INDEX "ExternalResource_subjectId_unitNumber_idx" ON "ExternalResource"("subjectId", "unitNumber");

-- CreateIndex
CREATE INDEX "VideoLecture_subjectId_unitNumber_idx" ON "VideoLecture"("subjectId", "unitNumber");

-- CreateIndex
CREATE INDEX "AuditEvent_createdAt_idx" ON "AuditEvent"("createdAt");
