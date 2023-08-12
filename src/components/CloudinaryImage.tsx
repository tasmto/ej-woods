import * as React from 'react'
import Image, { ImageProps } from 'next/image'

import { CloudinaryTransformationType } from '@/constants/cloudinaryConstants'
import {
  applyCloudinaryTransformation,
  returnCloudinaryImageUrl,
} from '@/lib/cloudinaryHelpers'
import clsxm from '@/lib/clsxm'

type CloudinaryImageProps = {
  useSkeleton?: boolean
  imgClassName?: string
  blurClassName?: string
  alt: string
  src: string | undefined
  width?: string | number
  transformation?: CloudinaryTransformationType
} & (
  | { width: string | number; height: string | number }
  | { layout: 'fill'; width?: string | number; height?: string | number }
) &
  Omit<ImageProps, 'src'>

/**
 *
 * @description Must set width using `w-` className
 * @param useSkeleton add background with pulse animation, don't use it if image is transparent
 */
const IMG = ({
  useSkeleton = false,
  src,
  width,
  height,
  alt,
  className,
  imgClassName,
  blurClassName,
  transformation,
  ...rest
}: CloudinaryImageProps) => {
  const [status, setStatus] = React.useState(
    useSkeleton ? 'loading' : 'complete'
  )
  const widthIsSet =
    className?.includes('w-') || width !== undefined || rest.layout === 'fill'

  return (
    <figure
      style={!widthIsSet ? { width: `${width}px` } : undefined}
      className={clsxm(className, 'absolute top-0 left-0 h-full w-full')}
    >
      <Image
        className={clsxm(
          imgClassName,
          status === 'loading' && clsxm('animate-pulse', blurClassName)
        )}
        src={
          transformation
            ? applyCloudinaryTransformation(transformation, src)
            : returnCloudinaryImageUrl(src)
        }
        width={width}
        height={height}
        alt={alt}
        onLoadingComplete={() => setStatus('complete')}
        layout='responsive'
        {...rest}
      />
    </figure>
  )
}
export default IMG
