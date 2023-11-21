/*
  Warnings:

  - You are about to drop the column `CourseSubcribers` on the `Courses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Courses" DROP COLUMN "CourseSubcribers",
ADD COLUMN     "CourseSubscribers" TEXT[];
