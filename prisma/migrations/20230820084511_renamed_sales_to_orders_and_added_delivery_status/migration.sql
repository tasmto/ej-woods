/*
  Warnings:

  - You are about to drop the `Sale` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'DELIVERED', 'CANCELLED', 'REFUNDED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('PENDING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "SaleProduct" DROP CONSTRAINT "SaleProduct_saleId_fkey";

-- DropTable
DROP TABLE "Sale";

-- DropEnum
DROP TYPE "SaleStatus";

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "paymentId" TEXT,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerPhoneNumber" TEXT NOT NULL,
    "deliveryTimeSlotStart" TEXT NOT NULL,
    "deliveryTimeSlotEnd" TEXT NOT NULL,
    "deliveryPhoneNumber" TEXT NOT NULL,
    "deliveryAddress" TEXT NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "totalQuantity" INTEGER NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "deliveryStatus" "DeliveryStatus" NOT NULL DEFAULT 'PENDING',
    "paymentMethod" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_paymentId_key" ON "Order"("paymentId");

-- AddForeignKey
ALTER TABLE "SaleProduct" ADD CONSTRAINT "SaleProduct_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
