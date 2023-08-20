/*
  Warnings:

  - You are about to drop the `SaleProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SaleProduct" DROP CONSTRAINT "SaleProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "SaleProduct" DROP CONSTRAINT "SaleProduct_saleId_fkey";

-- DropTable
DROP TABLE "SaleProduct";

-- CreateTable
CREATE TABLE "orderProduct" (
    "id" SERIAL NOT NULL,
    "saleId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orderProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orderProduct_id_key" ON "orderProduct"("id");

-- AddForeignKey
ALTER TABLE "orderProduct" ADD CONSTRAINT "orderProduct_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderProduct" ADD CONSTRAINT "orderProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
