import React, { useEffect, useState } from 'react'
import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { IoTrashBinOutline } from 'react-icons/io5'
import { Product, ProductImage } from '@prisma/client'
import { useRouter } from 'next/navigation'

import IMG from '@/components/CloudinaryImage'
import { P2, P3 } from '@/components/typography/Typography'
import StockInput from '@/features/products/components/StockInput'
import { useDebounce } from '@/hooks/useDebounce'
import { useIsFirstRender } from '@/hooks/useIsFirstRender'
import { FormatCurrency, FormatDate } from '@/lib/FormatNumber'
import { trimString } from '@/lib/FormatString'
import clsxm from '@/utils/clsxm'
import { trpc } from '@/utils/trpc'

type Props = {
  className?: string
  product: Product & {
    images: ProductImage[]
  }
  handleRefreshData?: () => void
  showMoreInfo?: boolean
}

const HorizontalProductCard = ({
  className,
  product,
  handleRefreshData,
  showMoreInfo = false,
}: Props) => {
  const {
    name,
    price,
    type,
    images,
    weight,
    createdAt,
    countInStock,
    hasInfiniteStock,
    slug,
    published,
  } = product
  const trpcContext = trpc.useContext()
  const router = useRouter()
  const mutation = trpc.products.setProductStock.useMutation()
  const productVisibilityMutation =
    trpc.products.setProductVisibility.useMutation()
  const [formData, setFormData] = useState({
    countInStock: countInStock,
    hasInfiniteStock: hasInfiniteStock,
  })
  const isInitialRender = useIsFirstRender()
  const [isLoading, setIsLoading] = useState(false)

  const debouncedFormData = useDebounce(formData, 1500)

  useEffect(() => {
    if (isInitialRender) return
    setIsLoading(true)
    mutation.mutate(
      {
        productId: product.id,
        countInStock: debouncedFormData.countInStock,
        hasInfiniteStock: debouncedFormData.hasInfiniteStock,
      },
      {
        onSuccess: onMutationSuccess,
        onSettled: () => {
          setIsLoading(false)
        },
      }
    )
  }, [debouncedFormData.countInStock, debouncedFormData.hasInfiniteStock])

  const handleStockChange = (stock?: number, hasInfiniteStock?: boolean) => {
    setFormData((prev) => ({
      countInStock: stock ?? prev.countInStock,
      hasInfiniteStock: hasInfiniteStock ?? prev.hasInfiniteStock,
    }))
  }

  const handleToggleProductVisibility = () => {
    setIsLoading(true)
    productVisibilityMutation.mutate(
      {
        productId: product.id,
        published: !product.published,
      },
      {
        onSuccess: onMutationSuccess,
        onSettled: () => {
          setIsLoading(false)
        },
      }
    )
  }

  const onMutationSuccess = async () => {
    trpcContext.products.multipleProducts.invalidate()
    trpcContext.products.singleProduct.invalidate({
      productId: product.id,
    })
    if (handleRefreshData) await handleRefreshData()
  }

  return (
    <article
      role='link'
      onClick={(e) => {
        // @ts-expect-error: the closest method is not on the event type
        if (e.target.closest('.stock-input')) return
        // @ts-expect-error: the closest method is not on the event type
        if (e.target.closest('.visibility-toggle')) return
        if (
          formData.hasInfiniteStock !== debouncedFormData.hasInfiniteStock ||
          formData.countInStock !== debouncedFormData.countInStock
        )
          return
        if (mutation.isLoading) return
        router.push(`/admin/products/${slug}`)
      }}
      className={clsxm(
        'sm:flex-no-wrap group relative grid cursor-pointer grid-cols-[50px_1fr] items-center gap-2 divide-x-[8px] divide-transparent overflow-hidden rounded-xl p-2 outline outline-1 outline-primary-50/50 sm:flex sm:gap-0 sm:py-2',
        'hover:bg-gray-700/20',
        className,
        mutation.isLoading &&
          'skeleton pointer-events-none cursor-wait opacity-50',
        isLoading && 'skeleton'
      )}
    >
      <div className='relative w-12 sm:min-w-[45px]'>
        <IMG
          src={images[0]?.url}
          transformation='cartOverlayThumbnail'
          layout='responsive'
          className=' w-full rounded-lg bg-gray-400 object-cover shadow-black/10 transition-all duration-200'
          height={45}
          quality={20}
          width={45}
          alt=''
          useSkeleton
        />
        {!published && (
          <AiOutlineEyeInvisible className='absolute top-2 translate-x-1 text-4xl text-gray-100/90' />
        )}
      </div>
      <div className={clsxm(['grid gap-[2px]', 'w-auto'])}>
        <P2 className='break-all !leading-tight sm:break-normal lg:!text-[1.3rem]'>
          {trimString(name, 40)}
        </P2>
        <P3 className='text-primary-200' suppressHydrationWarning>
          <b suppressHydrationWarning>{FormatCurrency(price) ?? 0}</b>
          {type === 'FURNITURE' ? ` each` : ` per ${weight} ${"kg's"}`}
          {' · '}
          {type[0]?.toUpperCase()}
          {type.slice(1).toLowerCase()}
          {' · '}
          {formData.hasInfiniteStock
            ? 'unlimited stock'
            : `${formData.countInStock} in stock`}
          {' · '}
          {showMoreInfo &&
            `updated ${FormatDate(createdAt, {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })} · ${images?.length || 0} image(s)`}

          {'.'}
        </P3>
      </div>
      <div
        className={clsxm([
          'col-span-full flex gap-1 py-2 transition-all duration-300 ease-in-out',
          'sm:absolute sm:right-[-1.25rem] sm:z-10 sm:opacity-0 sm:group-hover:right-2 sm:group-hover:opacity-100',
        ])}
      >
        <button
          onClick={handleToggleProductVisibility}
          title={published ? 'Un-archive product' : 'Archive product'}
          className={clsxm([
            'visibility-toggle',
            'rounded-lg border border-rose-700 bg-white/0 p-1 text-rose-700 transition-colors hover:border-rose-800 hover:bg-rose-800 hover:text-white sm:bg-rose-100',
            [!product.published && 'bg-rose-700 text-white sm:bg-rose-700'],
            productVisibilityMutation.isLoading && 'cursor-wait opacity-50',
          ])}
        >
          <IoTrashBinOutline className='h-5 w-5' />
          <span className='sr-only'>Archive product</span>
        </button>
        <div className='rounded-lg border border-gray-500 p-1 text-gray-700 transition-colors '>
          <StockInput
            product={product}
            stock={formData.countInStock}
            hasInfiniteStock={formData.hasInfiniteStock}
            onChange={(count) => {
              handleStockChange(count, undefined)
            }}
            onToggleInfiniteStock={() => {
              handleStockChange(undefined, !formData.hasInfiniteStock)
            }}
            className='stock-input'
          />
        </div>
      </div>
    </article>
  )
}

export default HorizontalProductCard
