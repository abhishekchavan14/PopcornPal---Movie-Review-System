import React from 'react'
import { FaYoutube, FaInstagram, FaLinkedin  } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <>
    <div className='hidden sm:block absolute text-white bottom-0 right-0 h-[5%] w-[15%] bg-primary-red rounded-tl-xl' style={{boxShadow: '-2px -2px 10px #000000'} }>
        <ul className='flex justify-evenly items-center my-3'>
            <li className='hover:text-black transition duration-300'><a href="#"><FaInstagram /></a></li>
            <li className='hover:text-black transition duration-300'><a href="#"><FaLinkedin /></a></li>
            <li className='hover:text-black transition duration-300'><a href="#"><FaYoutube /></a></li>
            <li className='hover:text-black transition duration-300'><a href="#"><FaXTwitter /></a></li>
        </ul>
    </div>
    <div className='text-white absolute bottom-0 left-0 text-xs text-dark-subtle'>© 2024 PopcornPal. All rights reserved.</div>
    </>
  )
}
