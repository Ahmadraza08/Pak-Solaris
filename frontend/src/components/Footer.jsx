import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div>
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                <div>
                    <img src={assets.logo} className="mb-5 w-32" alt="" />
                    <p className="w-full md:w-2/3 text-gray-600">Pak solaris Solutions is your trusted destination for reliable solaris energy systems, including high-efficiency solaris panels, advanced inverters, durable batteries, and complete solaris installations. We provide competitive pricing, premium-quality products, and professional customer support to help you reduce electricity costs and switch to clean energy with confidence. Visit us for expert consultation or order online for fast service and the latest solaris solutions — efficiency and savings, all in one place.</p>
                </div>
                <div>
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div>
                    <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>+92 nill</li><li>paksolariss@gmail.com</li>
                        {/* <a href='https://www.google.com/maps/place/Hira+%26+Company/@24.8238674,67.1412639,17z/data=!3m1!4b1!4m6!3m5!1s0x3eb33b05321baeb3:0x9ca12f038799d8c5!8m2!3d24.8238674!4d67.1412639!16s%2Fg%2F11qsw2ng09?entry=ttu&g_ep=EgoyMDI1MDMxMi4wIKXMDSoASAFQAw%3D%3D' className="mt-6 cursor-pointer">Touch and Get the Location</a> */}
                    </ul>
                </div>
            </div>
            <div>
                {/* <hr className='fill-white'/> */}
                <p className="py-5 text-sm text-center border-t-1 border-gray-300">Copyright 2026@ paksolariss.com - All Right Reserved.</p>
            </div>
        </div>

    )
}

export default Footer