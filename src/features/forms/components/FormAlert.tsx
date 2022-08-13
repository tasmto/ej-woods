import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import Typography from '@/components/typography/Typography';

type Props = {
  formik: any;
  field: string;
};

const FormAlert = ({ formik, field }: Props) => {
  const touched = formik.touched[field];
  const error = formik.errors[field];

  return (
    <AnimatePresence>
      {touched && error ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className='rounded-lg bg-red-100 py-3 px-6 text-base text-red-700'
          role='alert'
        >
          <Typography size='small' as='p'>
            {error || ''}
          </Typography>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default FormAlert;
