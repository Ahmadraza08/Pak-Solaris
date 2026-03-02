// import React,{useState, useEffect} from 'react'
// import Title from '../components/Title'
// import { assets } from '../assets/assets'
// import NewsletterBox from '../components/Newsletter'
// import LoadingWrapper from '../components/LoadingWrapper'

// const About = () => {

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <LoadingWrapper isLoading={loading}>

//       <div>

//         {/* Heading */}
//         <div className='text-2xl text-center pt-8 border-t'>
//           <Title text1={'ABOUT'} text2={'US'} />
//         </div>

//         {/* About Section */}
//         <div className='my-10 flex flex-col md:flex-row gap-16'>

//           <img
//             src={assets.hero}
//             className='w-full rounded-3xl shadow-2xl shadow-green-200 md:max-w-[450px]'
//             alt="solaris Energy"
//           />

//           <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>

//             <p>
//               Pak solaris Solutions was founded with a vision to make clean,
//               reliable, and affordable solaris energy accessible to every home
//               and business. Our goal is to help customers reduce electricity
//               bills and achieve energy independence through advanced solaris
//               technology and professional installation services.
//             </p>

//             <p>
//               We specialize in high-efficiency solaris panels, smart hybrid
//               inverters, long-lasting battery systems, and complete solaris
//               energy solutions designed for maximum performance and savings.
//               Every system is carefully selected to ensure durability,
//               reliability, and long-term energy production.
//             </p>

//             <b className='text-gray-800'>Our Mission</b>

//             <p>
//               Our mission is to empower communities with sustainable energy
//               solutions that combine efficiency, affordability, and trust.
//               From consultation and system design to installation and
//               after-sales support, we aim to make the transition to solaris
//               simple, transparent, and stress-free.
//             </p>

//           </div>
//         </div>

//         {/* Why Choose Us */}
//         <div className='text-xl py-4'>
//           <Title text1={'WHY'} text2={'CHOOSE US'} />
//         </div>

//         <div className='flex flex-col md:flex-row text-sm mb-20'>

//           <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 hover:shadow-lg transition'>
//             <b className='text-green-700'>Quality Assurance:</b>
//             <p className='text-gray-600'>
//               We use certified solaris equipment tested for performance and
//               durability, ensuring reliable energy generation for years.
//             </p>
//           </div>

//           <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 hover:shadow-lg transition'>
//             <b className='text-green-700'>Smart Energy Solutions:</b>
//             <p className='text-gray-600'>
//               Our systems are engineered to maximize power production and
//               significantly reduce electricity bills through efficient
//               solaris technology.
//             </p>
//           </div>

//           <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 hover:shadow-lg transition'>
//             <b className='text-green-700'>Professional Support:</b>
//             <p className='text-gray-600'>
//               Our expert team provides consultation, installation, and
//               ongoing assistance to ensure a smooth and confident switch
//               to solaris energy.
//             </p>
//           </div>

//         </div>

//         <NewsletterBox />

//       </div>

//     </LoadingWrapper>
//   )
// }

// export default About

import React, { useState, useEffect } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/Newsletter';
import LoadingWrapper from '../components/LoadingWrapper';

const About = () => {
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Stop loading when image is fully loaded
  useEffect(() => {
    if (imageLoaded) {
      setLoading(false);
    }
  }, [imageLoaded]);

  return (
    <LoadingWrapper isLoading={loading}>
      <div>
        {/* Heading */}
        <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'} />
        </div>

        {/* About Section */}
        <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img
            src={assets.hero}
            className='w-full rounded-3xl shadow-2xl shadow-green-200 md:max-w-[450px]'
            alt="solaris Energy"
            onLoad={() => setImageLoaded(true)} // <-- signal when image is ready
          />

          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
            <p>
              Pak solaris Solutions was founded with a vision to make clean,
              reliable, and affordable solaris energy accessible to every home
              and business. Our goal is to help customers reduce electricity
              bills and achieve energy independence through advanced solaris
              technology and professional installation services.
            </p>

            <p>
              We specialize in high-efficiency solaris panels, smart hybrid
              inverters, long-lasting battery systems, and complete solaris
              energy solutions designed for maximum performance and savings.
              Every system is carefully selected to ensure durability,
              reliability, and long-term energy production.
            </p>

            <b className='text-gray-800'>Our Mission</b>

            <p>
              Our mission is to empower communities with sustainable energy
              solutions that combine efficiency, affordability, and trust.
              From consultation and system design to installation and
              after-sales support, we aim to make the transition to solaris
              simple, transparent, and stress-free.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className='text-xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
        </div>

        <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 hover:shadow-lg transition'>
            <b className='text-green-700'>Quality Assurance:</b>
            <p className='text-gray-600'>
              We use certified solaris equipment tested for performance and
              durability, ensuring reliable energy generation for years.
            </p>
          </div>

          <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 hover:shadow-lg transition'>
            <b className='text-green-700'>Smart Energy Solutions:</b>
            <p className='text-gray-600'>
              Our systems are engineered to maximize power production and
              significantly reduce electricity bills through efficient
              solaris technology.
            </p>
          </div>

          <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 hover:shadow-lg transition'>
            <b className='text-green-700'>Professional Support:</b>
            <p className='text-gray-600'>
              Our expert team provides consultation, installation, and
              ongoing assistance to ensure a smooth and confident switch
              to solaris energy.
            </p>
          </div>
        </div>

        <NewsletterBox />
      </div>
    </LoadingWrapper>
  );
};

export default About;