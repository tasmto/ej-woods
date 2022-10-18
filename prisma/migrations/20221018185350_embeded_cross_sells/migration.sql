/*
  Warnings:

  - You are about to drop the `CrossSells` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_cross_sells_to` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CrossSells" DROP CONSTRAINT "CrossSells_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "_cross_sells_to" DROP CONSTRAINT "_cross_sells_to_A_fkey";

-- DropForeignKey
ALTER TABLE "_cross_sells_to" DROP CONSTRAINT "_cross_sells_to_B_fkey";

-- DropTable
DROP TABLE "CrossSells";

-- DropTable
DROP TABLE "_cross_sells_to";

-- CreateTable
CREATE TABLE "_cross_sells" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_cross_sells_AB_unique" ON "_cross_sells"("A", "B");

-- CreateIndex
CREATE INDEX "_cross_sells_B_index" ON "_cross_sells"("B");

-- AddForeignKey
ALTER TABLE "_cross_sells" ADD CONSTRAINT "_cross_sells_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_cross_sells" ADD CONSTRAINT "_cross_sells_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
