/*
  Warnings:

  - You are about to drop the `Author` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Author";

-- CreateTable
CREATE TABLE "Courses" (
    "id" TEXT NOT NULL,
    "CourseTitle" TEXT NOT NULL,
    "CourseSubcribers" TEXT[],
    "AuthorName" TEXT NOT NULL,
    "CourseCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("id")
);
