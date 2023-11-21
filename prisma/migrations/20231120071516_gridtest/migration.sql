/*
  Warnings:

  - You are about to drop the `newTable` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "newTable";

-- CreateTable
CREATE TABLE "Author" (
    "id" TEXT NOT NULL,
    "CourseTitle" TEXT NOT NULL,
    "CourseSubcribers" TEXT,
    "CourseUsers" TEXT[],
    "AuthorName" TEXT NOT NULL,
    "CourseCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Author_CourseSubcribers_key" ON "Author"("CourseSubcribers");
