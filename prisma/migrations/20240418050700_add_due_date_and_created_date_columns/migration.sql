/*
  Warnings:

  - Added the required column `createdDate` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dueDate` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "createdDate" BIGINT NOT NULL,
ADD COLUMN     "dueDate" BIGINT NOT NULL;
