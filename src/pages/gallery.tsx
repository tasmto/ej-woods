import React from 'react';

import clsxm from '@/lib/clsxm';

import Container from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';
import { D2, P1, P2 } from '@/components/typography/Typography';

const GalleryPage = () => {
  const images = [
    {
      title: 'The image title',
      image:
        'https://images.unsplash.com/photo-1515713519566-6f9bf3b4a07a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHdvb2RlbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
      title: 'The image title',
      image:
        'https://images.unsplash.com/photo-1561458338-60c444223320?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHdvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    },
    {
      title: 'The image title',
      image:
        'https://images.unsplash.com/photo-1617410225897-c9d260e3055e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fHdvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    },
    {
      title: 'The image title',
      image:
        'https://images.unsplash.com/photo-1551364827-375ede57f397?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njh8fHdvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    },
    {
      title: 'The image title',
      image:
        'https://images.unsplash.com/photo-1561458338-60c444223320?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHdvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    },
    {
      title: 'The image title',
      image:
        'https://images.unsplash.com/photo-1617410225897-c9d260e3055e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fHdvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    },
    {
      title: 'The image title',
      image:
        'https://images.unsplash.com/photo-1551364827-375ede57f397?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njh8fHdvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    },
    {
      title: 'The image title',
      image:
        'https://images.unsplash.com/photo-1561458338-60c444223320?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHdvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    },
    {
      title: 'The image title',
      image:
        'https://images.unsplash.com/photo-1617410225897-c9d260e3055e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fHdvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    },
  ];
  return (
    <Layout>
      <Container
        as='section'
        level={1}
        className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'
      >
        <div className='col-span-full mb-2 flex items-center justify-between gap-3'>
          <D2 className=' max-w-[600px] md:max-w-full'>Gallery</D2>
          <P2>{images.length} images.</P2>
        </div>
        {images?.map(({ image, title }, i) => (
          <figure
            key={i}
            className={clsxm([
              'content-stretch  relative grid h-80 w-full content-end items-stretch justify-items-stretch overflow-hidden rounded-xl bg-gray-400  text-slate-50 after:absolute after:bottom-0 after:block after:h-1/3 after:w-full after:bg-gradient-to-t after:from-black/90 after:via-black/60 after:to-black/0 md:h-[24rem]',
            ])}
          >
            <NextImage
              src={image}
              alt={title}
              quality={50}
              useSkeleton
              layout='fill'
              imgClassName='h-full w-full object-cover '
            />
            <figcaption className='absolute bottom-0 z-10 flex w-full items-center justify-between gap-4 p-4 sm:p-6'>
              <P1 className='mt-2'>{title}</P1>
            </figcaption>
          </figure>
        ))}
      </Container>
    </Layout>
  );
};

export default GalleryPage;
