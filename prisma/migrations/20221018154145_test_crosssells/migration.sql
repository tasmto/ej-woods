/*
  Warnings:

  - The primary key for the `CrossSells` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `crossSellIds` column on the `CrossSells` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "CrossSells" DROP CONSTRAINT "CrossSells_crossSellIds_fkey";

-- AlterTable
ALTER TABLE "CrossSells" DROP CONSTRAINT "CrossSells_pkey",
DROP COLUMN "crossSellIds",
ADD COLUMN     "crossSellIds" INTEGER[],
ADD CONSTRAINT "CrossSells_pkey" PRIMARY KEY ("ownerId");

-- CreateTable
CREATE TABLE "_cross_sells_to" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_cross_sells_to_AB_unique" ON "_cross_sells_to"("A", "B");

-- CreateIndex
CREATE INDEX "_cross_sells_to_B_index" ON "_cross_sells_to"("B");

-- AddForeignKey
ALTER TABLE "_cross_sells_to" ADD CONSTRAINT "_cross_sells_to_A_fkey" FOREIGN KEY ("A") REFERENCES "CrossSells"("ownerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_cross_sells_to" ADD CONSTRAINT "_cross_sells_to_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
