import React from 'react';

import Container from '@/components/layout/Container';
import ArrowLink from '@/components/links/ArrowLink';
import NextImage from '@/components/NextImage';
import Typography from '@/components/typography/Typography';

type Props = {
  contactInfo?: {
    openingHours: string;
    phoneNumber: string;
    email: string;
    whatsAppLink: string;
    location: string;
  };
};

const ContactDetailsCards = ({ contactInfo }: Props) => {
  if (!contactInfo) return null;
  const { openingHours, phoneNumber, email, whatsAppLink, location } =
    contactInfo;
  return (
    <Container className='grid gap-3'>
      {openingHours && (
        <article className='flex gap-6 rounded-3xl rounded-tl-none bg-[#EBE2F1] p-3'>
          <NextImage
            layout='intrinsic'
            width={56}
            height={56}
            src='/icons/calender-iso.png'
            alt=''
            className='h-14 w-14'
          />
          <div className='grid gap-1'>
            <Typography as='h3' size='heading3' weight='semiBold'>
              Operating hours
            </Typography>
            <Typography as='p' size='body3'>
              {openingHours}
            </Typography>
          </div>
        </article>
      )}
      {whatsAppLink && phoneNumber && (
        <article className='flex gap-6 rounded-3xl rounded-tl-none bg-[#EADFDF] p-3'>
          <NextImage
            layout='intrinsic'
            width={56}
            height={56}
            src='/icons/chat-text-iso.png'
            alt=''
            className='h-14 w-14'
          />
          <div className='grid gap-1'>
            <Typography as='h3' size='heading3' weight='semiBold'>
              WhatsApp Us.
            </Typography>
            <Typography as='p' size='body3' className='flex gap-3'>
              <span>{phoneNumber}</span>
              <span>|</span>
              <ArrowLink href={whatsAppLink}>
                Click Here to Open WhatsApp
              </ArrowLink>
            </Typography>
          </div>
        </article>
      )}
      {phoneNumber && (
        <article className='flex gap-6 rounded-3xl rounded-tl-none bg-[#D8EADB] p-3'>
          <NextImage
            layout='intrinsic'
            width={56}
            height={56}
            src='/icons/phone-only-iso.png'
            alt=''
            className='h-14 w-14'
          />
          <div className='grid gap-1'>
            <Typography as='h3' size='heading3' weight='semiBold'>
              Contact Number
            </Typography>
            <Typography as='p' size='body3' className='grid'>
              <ArrowLink
                href={`tel:${phoneNumber.trim()}`}
                className='justify-self-start'
              >
                {phoneNumber}
              </ArrowLink>
            </Typography>
          </div>
        </article>
      )}
      {location && (
        <article className='flex gap-6 rounded-3xl rounded-tl-none bg-[#F2EBC3] p-3'>
          <NextImage
            layout='intrinsic'
            width={56}
            height={56}
            src='/icons/map-pin-iso.png'
            alt=''
            className='h-14 w-14'
          />
          <div className='grid gap-1'>
            <Typography as='h3' size='heading3' weight='semiBold'>
              Our Location
            </Typography>
            <Typography as='p' size='body3'>
              {location}
            </Typography>
          </div>
        </article>
      )}
    </Container>
  );
};

export default ContactDetailsCards;
