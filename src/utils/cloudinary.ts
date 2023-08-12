import { Cloudinary } from '@cloudinary/url-gen'
// Create a Cloudinary instance, setting some Cloud and URL configuration parameters.
const cld = new Cloudinary({
  cloud: {
    cloudName: 'donx8yylo',
  },
  //   url: {
  //     secureDistribution: 'www.example.com',
  //     secure: true,
  //   },
})

export { cld }
