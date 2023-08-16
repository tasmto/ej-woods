/*
  Warnings:

  - A unique constraint covering the columns `[paymentId]` on the table `Sale` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "paymentId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Sale_paymentId_key" ON "Sale"("paymentId");
