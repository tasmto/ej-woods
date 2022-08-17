import React from 'react';

import Container from '@/components/layout/Container';
import Typography from '@/components/typography/Typography';

const FooterCTA = () => {
  return (
    <Container as='section' aria-hidden='true'>
      <div className=' rounded-[2.5rem] bg-primary-900 p-8 text-slate-50 lg:p-12'>
        <Typography as='p' size='body1'>
          All of our items are available on order and{' '}
          <b>we offer cash-on-delivery for all our products</b>. We will always
          call or email you before we deliver to confirm your order and
          delivery.
        </Typography>
      </div>
    </Container>
  );
};

export default FooterCTA;
