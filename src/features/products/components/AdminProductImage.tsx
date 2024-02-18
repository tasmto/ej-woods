import IMG from '@/components/CloudinaryImage'
import { type ProductImage } from '@prisma/client'

type Props = {
  image: ProductImage
}
const AdminProductImage = ({ image }: Props) => {
  const handleDelete = async () => {}
  const handleSetMain = async () => {}
  return (
    <div className='flex flex-col items-center border'>
      <IMG
        quality={50}
        useSkeleton
        width={200}
        height={200}
        transformation='productImageThumbnail'
        src={image.url}
        alt={`A product image`}
        className='h-32 w-32 object-cover'
      />
      <div className='flex justify-center space-x-2'>
        <button
          onClick={handleSetMain}
          className='rounded bg-green-500 px-2 py-1 text-white'
        >
          Set Main
        </button>
        <button
          onClick={handleDelete}
          className='rounded bg-red-500 px-2 py-1 text-white'
        >
          Delete
        </button>
      </div>
    </div>
  )
}
export default AdminProductImage
