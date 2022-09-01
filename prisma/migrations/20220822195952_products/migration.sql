-- CreateEnum
CREATE TYPE "ProductTypes" AS ENUM ('WOOD', 'FURNITURE');

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 200,
    "weight" INTEGER NOT NULL DEFAULT 0,
    "type" "ProductTypes" NOT NULL DEFAULT 'WOOD',
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[] DEFAULT ARRAY['/images/placeholder-product-image.jpg']::TEXT[],
    "countInStock" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
