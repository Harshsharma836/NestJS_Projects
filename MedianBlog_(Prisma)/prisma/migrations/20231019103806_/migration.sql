/*
  Warnings:

  - A unique constraint covering the columns `[id,authorId]` on the table `Article` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adress` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "adress" TEXT NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Article_id_authorId_key" ON "Article"("id", "authorId");
