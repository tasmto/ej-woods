import IMG from '@/components/CloudinaryImage'
import clsxm from '@/lib/clsxm'
import { trpc } from '@/utils/trpc'
import { type ProductImage } from '@prisma/client'
import { IoTrashBinOutline } from 'react-icons/io5'

type Props = {
  image: ProductImage & {
    isMainImage: boolean
  }

  productId: number
  onDeleteImageSuccess?: (imageId: number) => void
}
const AdminProductImage = ({
  image,

  productId,
  onDeleteImageSuccess,
}: Props) => {
  const utils = trpc.useUtils()
  const setMutation = trpc.products.setProductMainImage.useMutation({
    onSuccess(input) {
      utils.products.singleProduct.invalidate({ productId: productId })
      utils.products.multipleProducts.invalidate({
        showArchived: true,
      })
    },
  })
  const deleteMutation = trpc.products.deleteProductImage.useMutation({
    onSuccess(input) {
      utils.products.singleProduct.invalidate({ productId: productId })
      utils.products.multipleProducts.invalidate({
        showArchived: true,
      })
      onDeleteImageSuccess?.(image.id)
    },
  })

  const { isLoading: setIsLoading, error: setError } = setMutation
  const { isLoading: deleteIsLoading, error: deleteError } = deleteMutation
  const handleDelete = async () => {
    if (deleteIsLoading) return
    await deleteMutation.mutateAsync({
      productId: productId,
      imageId: image.id,
    })
  }

  const handleSetMain = async () => {
    if (image.isMainImage) return
    if (setIsLoading) return
    await setMutation.mutateAsync({
      productId: productId,
      mainImageId: image.id,
    })
  }
  return (
    <div className='relative flex flex-col items-center border'>
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
      <div className='absolute left-2 top-2 flex justify-center space-x-2'>
        <button
          onClick={handleSetMain}
          disabled={setIsLoading}
          className={clsxm([
            'rounded-lg border border-green-600 bg-green-100 px-2 py-1 text-sm text-green-600 hover:bg-green-600 hover:text-white',
            image.isMainImage && 'bg-green-600 text-white',
          ])}
        >
          {image.isMainImage ? 'Cover Image' : 'Make Cover'}
        </button>
        <button
          onClick={handleDelete}
          title='Delete image'
          className={clsxm([
            'visibility-toggle',
            'rounded-lg border border-rose-700 bg-rose-100  p-1 text-rose-700 transition-colors hover:border-rose-800 hover:bg-rose-800 hover:text-white',
            // [!product.published && 'bg-rose-700 text-white sm:bg-rose-700'],
            // productVisibilityMutation.isLoading && 'cursor-wait opacity-50',
          ])}
        >
          <IoTrashBinOutline className='h-5 w-5' />
          <span className='sr-only'>Archive product</span>
        </button>
      </div>
    </div>
  )
}
export default AdminProductImage
