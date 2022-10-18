/*
  Warnings:

  - You are about to drop the `_cross_sells` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_cross_sells" DROP CONSTRAINT "_cross_sells_A_fkey";

-- DropForeignKey
ALTER TABLE "_cross_sells" DROP CONSTRAINT "_cross_sells_B_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "_cross_sells";

-- CreateTable
CREATE TABLE "CrossSells" (
    "id" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CrossSells_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_cross_sells_to" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CrossSells_id_key" ON "CrossSells"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CrossSells_ownerId_key" ON "CrossSells"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "_cross_sells_to_AB_unique" ON "_cross_sells_to"("A", "B");

-- CreateIndex
CREATE INDEX "_cross_sells_to_B_index" ON "_cross_sells_to"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");

-- AddForeignKey
ALTER TABLE "CrossSells" ADD CONSTRAINT "CrossSells_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_cross_sells_to" ADD CONSTRAINT "_cross_sells_to_A_fkey" FOREIGN KEY ("A") REFERENCES "CrossSells"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_cross_sells_to" ADD CONSTRAINT "_cross_sells_to_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
