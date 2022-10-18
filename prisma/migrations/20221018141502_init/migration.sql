-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "images" SET DEFAULT ARRAY['/images/placeholder-product-imag.jpg']::TEXT[];

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
