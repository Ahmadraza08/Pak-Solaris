import React, {useState, useEffect} from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/Newsletter'
import LoadingWrapper from '../components/LoadingWrapper'




const Contact = () => {
  
const [loading, setLoading] = useState(true);

useEffect(() => {
  // Simulate loading delay
  const timer = setTimeout(() => {
    setLoading(false);
  }, 1000);

  return () => clearTimeout(timer);
}, []);

  return (
    <LoadingWrapper isLoading={loading}>
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        {/* <img className='w-full md:max-w-[480px] rounded-3xl shadow-2xl shadow-gray-400' src={assets.contact_img} alt="" /> */}
        
        <div className='flex flex-col justify-center items-start gap-6'>
          {/* <p className='font-semibold text-xl text-gray-600'>Our Store</p> */}
          {/* <p className='text-gray-500'>Plot # Q-38, Sector 33/A <br /> Korangi No.2, Main, Landhi Town <br /> Karachi, Pakistan</p> */}
          <p className='text-gray-500'>Tel : +92 3218965400 <br /> Email: paksolariss@gmail.com</p>
          <a href='https://www.google.com/maps/place/Hira+%26+Company/@24.8238674,67.1412639,17z/data=!3m1!4b1!4m6!3m5!1s0x3eb33b05321baeb3:0x9ca12f038799d8c5!8m2!3d24.8238674!4d67.1412639!16s%2Fg%2F11qsw2ng09?entry=ttu&g_ep=EgoyMDI1MDMxMi4wIKXMDSoASAFQAw%3D%3D' className='border bg-black text-white border-black px-8 py-4 rounded-b-4xl text-sm hover:bg-white hover:text-black translate-all duration-500'> CLICK HERE AND GET THE LOCATION</a>
        </div>
      </div>

      {/* <NewsletterBox /> */}
    </div>
</LoadingWrapper>

  )
}

export default Contact
