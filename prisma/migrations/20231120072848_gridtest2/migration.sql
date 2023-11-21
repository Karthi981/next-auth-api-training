/*
  Warnings:

  - You are about to drop the column `CourseUsers` on the `Author` table. All the data in the column will be lost.
  - The `CourseSubcribers` column on the `Author` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "Author_CourseSubcribers_key";

-- AlterTable
ALTER TABLE "Author" DROP COLUMN "CourseUsers",
DROP COLUMN "CourseSubcribers",
ADD COLUMN     "CourseSubcribers" TEXT[];
