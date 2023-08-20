/*
  Warnings:

  - You are about to drop the column `saleId` on the `orderProduct` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `orderProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orderProduct" DROP CONSTRAINT "orderProduct_saleId_fkey";

-- AlterTable
ALTER TABLE "orderProduct" DROP COLUMN "saleId",
ADD COLUMN     "orderId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "orderProduct" ADD CONSTRAINT "orderProduct_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
