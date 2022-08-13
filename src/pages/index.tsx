import * as React from 'react';

import ContactDetailsCards from '@/components/forms/ContactDetailsCards';
import Container from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import RegionMap from '@/components/maps/RegionMap';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';
import { D1, D2, H2, P1, P2 } from '@/components/typography/Typography';

import ContactForm from '@/features/forms/ContactForm';
import ProductCard from '@/features/products/components/Card';
import { fetchAllProducts } from '@/features/products/lib/fetchProduct';
import { ProductType } from '@/features/products/types';
import ServiceCards from '@/features/services/components/Cards';

type Props = {
  products: ProductType[];
  contactInfo: {
    openingHours: string;
    phoneNumber: string;
    email: string;
    whatsAppLink: string;
    location: string;
  };
};

export default function HomePage({ contactInfo, products }: Props) {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <Container
        as='section'
        level={1}
        className='grid grid-cols-1 items-center justify-center gap-14 md:grid-cols-2 lg:grid-cols-5 lg:gap-20 '
      >
        <Container
          as='article'
          className='grid justify-items-start gap-6 pt-10 pb-0 md:gap-8 md:pt-20 md:pb-16 lg:col-span-2'
        >
          <D1 className='max-w-[600px] md:max-w-full'>
            Your friendly and reliable neighbor-hood carpenter
          </D1>
          <ButtonLink variant='outline' href='/contact'>
            Request a call back
          </ButtonLink>
        </Container>
        <Container className='overflow-y-none relative grid h-full min-h-[300px] w-full content-end overflow-x-visible bg-gray-200 p-8 sm:p-10 md:min-h-[300px] md:rounded-l-3xl lg:col-span-3 lg:p-12'>
          <div className='align-self-end z-10 text-white'>
            <D2 as='h2' weight='semiBold' className='drop-shadow-md'>
              The Name of the product
            </D2>
            <P1 className='mt-2 drop-shadow-md md:mt-3'>R250.00 per kg</P1>
          </div>
          <div
            className='img-full-w-curve--right after:absolute after:top-0 after:block after:h-full after:w-full after:bg-gradient-to-t after:from-black/90 after:via-black/0
              after:to-black/0'
          >
            <NextImage
              layout='fill'
              src='/images/sample-product-image-large.jpg'
              alt=''
              className='h-full w-full md:rounded-l-3xl'
              imgClassName='md:rounded-l-3xl object-cover w-full'
            />
          </div>
        </Container>
      </Container>

      <Container as='section' level={1} aria-hidden='true'>
        <Container
          as='div'
          className='flex rounded-b-3xl bg-primary-900 p-8 text-slate-200 lg:p-12'
        >
          <div className='grid gap-2 sm:grid-cols-3 sm:gap-8'>
            <H2 as='p' className='sm:col-span-1'>
              <span>Your bones do not break, mine do. That is clear.</span>
            </H2>
            <div className='grid gap-5 sm:col-span-2 sm:gap-3 sm:border-l-2 sm:border-slate-400 sm:pl-4'>
              <P2>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Suscipit eveniet aliquam optio neque corrupti dolorem.
              </P2>
              <div className='flex gap-6'>
                <ArrowLink className='col-span-full' href='/'>
                  Show More Products
                </ArrowLink>
                <ArrowLink className='col-span-full' href='/'>
                  Show More Products
                </ArrowLink>
              </div>
            </div>
          </div>
        </Container>
      </Container>
      <Container
        as='section'
        level={1}
        className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'
      >
        {products?.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
        <ArrowLink
          className='col-span-full mt-3 justify-self-start md:mt-4'
          href='/'
        >
          Show More Products
        </ArrowLink>
      </Container>
      <Container
        level={1}
        as='section'
        className='relative grid gap-5 md:grid-cols-2 md:gap-14  lg:gap-20'
      >
        <div className='grid gap-8 self-center'>
          <D2 as='h2' weight='normal'>
            Our contact details.
          </D2>
          <ContactDetailsCards contactInfo={contactInfo} />
        </div>
        <NextImage
          src='https://images.unsplash.com/photo-1569695145335-ed8e60d92945?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8d29vZCUyMHdvcmt8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
          alt=''
          className='hidden justify-items-center self-center overflow-hidden md:block'
          imgClassName='rounded-2xl object-cover w-full'
          layout='responsive'
          width={410}
          height={456}
        />
      </Container>

      <Container
        as='section'
        level={1}
        className='grid grid-cols-1 items-center justify-center gap-14 md:grid-cols-2  lg:gap-20 '
      >
        <Container className='overflow-y-none relative order-last grid h-full min-h-[300px] w-full content-end overflow-x-visible p-8 sm:p-10 md:order-first'>
          <div className='img-full-w-curve--left'>
            <NextImage
              layout='fill'
              src='https://images.unsplash.com/photo-1504624720567-64a41aa25d70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2076&q=80'
              alt=''
              className='h-full w-full md:rounded-r-3xl'
              imgClassName='md:rounded-r-3xl object-cover w-full'
            />
          </div>
        </Container>
        <article className='grid justify-items-start  gap-4 sm:gap-6 '>
          <D2 className='max-w-[600px] md:max-w-full'>
            Your bones dont break, mine do. Thats clear.
          </D2>
          <P2>
            Your bones dont break, mine do. Thats clear. Your cells react to
            bacteria and viruses differently than mine. You dont get sick, I do.
            Thats also clear. But for some reason, you and I react the exact
            same way to water. We swallow it too fast, we choke. We get some in
            our lungs, we drown. However unreal it may seem, we are connected,
            you and I. Were on the same curve, just on opposite ends.
          </P2>
          <ArrowLink
            className='col-span-full mt-3 justify-self-start md:mt-4'
            href='/about'
          >
            Read more about us
          </ArrowLink>
        </article>
      </Container>
      <Container as='section' level={1} className='grid gap-6'>
        <D2 className='max-w-[600px] md:max-w-full'>
          Here are the services and products we offer.
        </D2>
        <div className='grid gap-5 sm:grid-cols-3'>
          <ServiceCards include='all' />
        </div>
      </Container>

      <Container
        as='section'
        level={1}
        className='grid grid-cols-1 items-center justify-center gap-14 md:grid-cols-2  lg:gap-20'
      >
        <div className='grid justify-items-start gap-8  '>
          <D2 className='max-w-[600px] md:max-w-full'>
            Fill in the form below if you have any questions and we will get
            right back to you.
          </D2>
          <ContactForm />
        </div>
        <RegionMap />
      </Container>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const products = await fetchAllProducts({ limit: 6 }); // todo: abso-freakinlutely not static props (handle through react query)
  return {
    props: {
      products,
      contactInfo: {
        openingHours:
          'Open 6am/10pm Monday - Friday & 8am - 6pm Saturday- Sunday',
        phoneNumber: '+27 65 000 0000',
        email: 'info@ej-wood.co.za',
        whatsAppLink: 'https://wa.me/0000000000',
        location: '0000 Street Name, City, Province, Country',
      },
    },
  };
};
