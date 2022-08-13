import React from 'react';
const RegionMap = () => {
  return (
    <div className='h-full max-h-[320px] min-h-[320px] w-full overflow-hidden rounded-xl bg-slate-300 md:max-h-[550px]'>
      <iframe
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53002.740281970735!2d18.5236625!3d-33.8723619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc59550fd5cfeb%3A0x5d3b409e27ded873!2sMilnerton%2C%20Cape%20Town!5e0!3m2!1sen!2sza!4v1660223452678!5m2!1sen!2sza'
        width='100%'
        height='100%'
        style={{ border: 0 }}
        allowFullScreen={true}
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
      ></iframe>
    </div>
  );
};

export default RegionMap;
