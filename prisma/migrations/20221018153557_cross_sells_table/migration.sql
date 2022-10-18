/*
  Warnings:

  - The primary key for the `CrossSells` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CrossSells` table. All the data in the column will be lost.
  - You are about to drop the `_cross_sells_to` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `crossSellIds` to the `CrossSells` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_cross_sells_to" DROP CONSTRAINT "_cross_sells_to_A_fkey";

-- DropForeignKey
ALTER TABLE "_cross_sells_to" DROP CONSTRAINT "_cross_sells_to_B_fkey";

-- DropIndex
DROP INDEX "CrossSells_id_key";

-- DropIndex
DROP INDEX "CrossSells_ownerId_key";

-- AlterTable
ALTER TABLE "CrossSells" DROP CONSTRAINT "CrossSells_pkey",
DROP COLUMN "id",
ADD COLUMN     "crossSellIds" INTEGER NOT NULL,
ADD CONSTRAINT "CrossSells_pkey" PRIMARY KEY ("ownerId", "crossSellIds");

-- DropTable
DROP TABLE "_cross_sells_to";

-- AddForeignKey
ALTER TABLE "CrossSells" ADD CONSTRAINT "CrossSells_crossSellIds_fkey" FOREIGN KEY ("crossSellIds") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
