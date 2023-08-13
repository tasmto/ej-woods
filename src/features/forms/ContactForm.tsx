import { useFormik } from 'formik'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import * as Yup from 'yup'

import Button from '@/components/buttons/Button'
import ArrowLink from '@/components/links/ArrowLink'
import { H2, P2 } from '@/components/typography/Typography'

import SingleLineInput from '@/features/forms/components/SingleLineInput'
import TextArea from '@/features/forms/components/TextArea'

const ContactForm = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = React.useState(false)

  const handleFormMutate = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('We need your name'),
      email: Yup.string()
        .email('Please enter a valid email')
        .required('We need to know your email'),
      message: Yup.string().required('Please enter a message'),
    }),
    onSubmit: async (values) => {
      await console.log(JSON.stringify(values, null, 2))
      // Todo return an error if the form is invalid
      setSubmitted(true)
    },
  })

  return (
    <AnimatePresence mode='wait'>
      {!submitted ? (
        <motion.form
          onSubmit={formik.handleSubmit}
          className='grid w-full gap-5'
          layout
          initial={{ opacity: 0, x: -20 }}
          exit={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <SingleLineInput
            formik={formik}
            label='What is your name?'
            name='name'
            type='text'
            placeholder='i.e. Handsome'
          />
          <SingleLineInput
            formik={formik}
            label='What is your email?'
            name='email'
            type='email'
            placeholder='i.e. handsome@example.co.za'
          />
          <TextArea
            formik={formik}
            label='What did you want to say?'
            name='message'
            placeholder='What did you want to talk to us about? i.e. I have a question about delivery costs if I live just outside of Cape Town.'
          />

          <Button
            type='submit'
            variant='outline'
            className='mt-3 w-full justify-center justify-self-stretch text-center'
            icon='💬'
            iconPosition='start'
            curve='top'
            disabled={formik.isSubmitting || formik.isValidating}
          >
            Submit
          </Button>
        </motion.form>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          exit={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className='mt-2 grid w-full gap-4 rounded-xl border border-dashed  border-slate-300 bg-slate-200/80 py-8 px-4 text-slate-800'
        >
          <H2>Thank you so much!</H2>
          <P2>
            We will get back to you as soon as we can! Incase you need immediate
            assistance please contact us on our other social media channels on
            the page linked below:
          </P2>
          <motion.div
            className='mt-6 justify-self-start'
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <ArrowLink href='/contact'>Our contact page.</ArrowLink>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ContactForm
