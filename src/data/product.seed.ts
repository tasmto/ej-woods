import products from '@/data/products'

const seeder = async () => {
  await Promise.all(
    products.map(async (item) => {
      try {
        const req = await fetch(
          'http://localhost:3000/api/trpc/products.create-product',
          {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          }
        )
        const data = await req.json()
        console.log('success! 😋🌟', data)
      } catch (error: any) {
        console.log('error! 😡', error.message)
      }
    })
  )
  console.log('done!')
}

seeder()
