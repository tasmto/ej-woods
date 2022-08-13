import React from 'react';

import Container from '@/components/layout/Container';
import Typography from '@/components/typography/Typography';

const FooterCTA = () => {
  return (
    <Container as='section' aria-hidden='true'>
      <div className=' rounded-[2.5rem] bg-primary-900 p-8 text-slate-50 lg:p-12'>
        <Typography as='p' size='body1'>
          Lorem ipsum dolor sit <b>amet consectetur adipisicing elit</b>.
          Suscipit eveniet aliquam optio neque corrupti dolorem perspiciatis
          <b>saepe necessitatibus blanditiis</b> nulla.
        </Typography>
      </div>
    </Container>
  );
};

export default FooterCTA;
