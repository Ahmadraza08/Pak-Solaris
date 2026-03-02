import React from 'react'
import { assets } from '../assets/assets.js'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[5%] justify-between'>
        <img src={assets.logo} className='w-[max(12%,150px)]' alt="" />
        <button onClick={() => setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar 