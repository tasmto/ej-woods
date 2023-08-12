import React from 'react'
const RegionMap = () => {
  return (
    <div className='h-full max-h-[320px] min-h-[320px] w-full overflow-hidden rounded-xl bg-slate-300 md:max-h-[550px]'>
      <iframe
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d503929.08533276204!2d18.680555401151725!3d-33.9266254787688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc500f8826eed7%3A0x687fe1fc2828aa87!2sCape%20Town!5e0!3m2!1sen!2sza!4v1691850652064!5m2!1sen!2sza'
        width='100%'
        height='100%'
        style={{ border: 0 }}
        allowFullScreen={true}
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
      ></iframe>
    </div>
  )
}

export default RegionMap
