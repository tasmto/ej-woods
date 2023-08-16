-- CreateEnum
CREATE TYPE "ProductTypes" AS ENUM ('WOOD', 'FURNITURE');

-- CreateEnum
CREATE TYPE "SaleStatus" AS ENUM ('PENDING', 'PAID', 'DELIVERED', 'CANCELLED', 'REFUNDED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 200,
    "weight" INTEGER NOT NULL DEFAULT 0,
    "type" "ProductTypes" NOT NULL DEFAULT 'WOOD',
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "mainImageId" INTEGER,
    "countInStock" INTEGER NOT NULL DEFAULT 0,
    "hasInfiniteStock" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL DEFAULT '/images/placeholder-product-image.jpg',
    "productId" INTEGER,

    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerPhoneNumber" TEXT NOT NULL,
    "deliveryTimeSlotStart" TEXT NOT NULL,
    "deliveryTimeSlotEnd" TEXT NOT NULL,
    "deliveryPhoneNumber" TEXT NOT NULL,
    "deliveryAddress" TEXT NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "totalQuantity" INTEGER NOT NULL,
    "status" "SaleStatus" NOT NULL DEFAULT 'PENDING',
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaleProduct" (
    "id" SERIAL NOT NULL,
    "saleId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SaleProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToProductImage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_cross_sells" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ProductImage_id_key" ON "ProductImage"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Sale_id_key" ON "Sale"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SaleProduct_id_key" ON "SaleProduct"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToProductImage_AB_unique" ON "_ProductToProductImage"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToProductImage_B_index" ON "_ProductToProductImage"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_cross_sells_AB_unique" ON "_cross_sells"("A", "B");

-- CreateIndex
CREATE INDEX "_cross_sells_B_index" ON "_cross_sells"("B");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_mainImageId_fkey" FOREIGN KEY ("mainImageId") REFERENCES "ProductImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleProduct" ADD CONSTRAINT "SaleProduct_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleProduct" ADD CONSTRAINT "SaleProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToProductImage" ADD CONSTRAINT "_ProductToProductImage_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToProductImage" ADD CONSTRAINT "_ProductToProductImage_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductImage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_cross_sells" ADD CONSTRAINT "_cross_sells_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_cross_sells" ADD CONSTRAINT "_cross_sells_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
