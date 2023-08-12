import { PrismaClient, Product, ProductTypes } from '@prisma/client'

import productsData from './seedData/products.json'

const prisma = new PrismaClient()
async function main() {
  // delete all products
  await prisma.product.deleteMany({})
  // Seed products
  const allProducts: Product[] = []
  for (const [index, product] of productsData.entries()) {
    const createdProduct = await prisma.product.create({
      data: {
        name: product.name,
        slug: `${product.name.toLowerCase().replace(/ /g, '-')}-${Date.now()}`,
        description: product.description,
        price: product.price,
        weight: product.weight,

        type: product.type as ProductTypes,
        images: {
          create: product.images.slice(1),
        },
        mainImage: {
          create: product.images[0],
        },
        published: true,
        countInStock: 20 - index,
        hasInfiniteStock: index % 2 === 0,
      },
    })
    allProducts.push(createdProduct)
  }

  //add crossSells and relatedTo
  for (const [index, product] of allProducts.entries()) {
    // select 3 but first jumble the array
    const crossSells = allProducts
      .filter((p) => p.id !== product.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
    const relatedTo = allProducts
      .filter((p) => p.id !== product.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)

    await prisma.product.update({
      where: { id: product.id },
      data: {
        crossSells: {
          connect: crossSells.map((p) => ({ id: p.id })),
        },
        relatedTo: {
          connect: relatedTo.map((p) => ({ id: p.id })),
        },
      },
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
