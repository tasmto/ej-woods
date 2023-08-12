import { name } from '@cloudinary/url-gen/actions/namedTransformation'

import {
  CloudinaryTransformationType,
  transformations,
} from '@/constants/cloudinaryConstants'
import { cld } from '@/utils/cloudinary'

export const applyCloudinaryTransformation = (
  transformationName: CloudinaryTransformationType,
  url?: string
) => {
  if (!url) return url || ''

  const myImage = cld
    .image(url)
    .namedTransformation(name(transformations[transformationName]))
  return myImage.toURL()
}

export const returnCloudinaryImageUrl = (publicId?: string) => {
  if (!publicId) return publicId || ''

  const myImage = cld.image(publicId)

  return myImage.toURL()
}
