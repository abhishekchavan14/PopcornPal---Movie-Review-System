import React, {useState} from "react";

import { IoMdMenu, IoMdClose } from "react-icons/io";

export default function Navbar() {

  const[nav, setNav] = useState(false)

  function handleMenuClick(){
    setNav(!nav)
  }
  return (
    <div className="bg-primary p-2 shadow-md shadow-black">
      <div className="flex items-center justify-between">
        <h1 className=" text-3xl font-bold text-primary-red">PopcornPal</h1>
        <ul className="mr-10 text-white text-lg items-center hidden md:flex">
          <li className="mr-8 hover:text-primary-red duration-500 ease-in-out">
            <a href="#">Sign Up</a>
          </li>
          <li className="mr-8 hover:text-primary-red duration-500 ease-in-out">
            <a href="#">Log In</a>
          </li>
          <li className="hover:text-primary-red duration-500 ease-in-out">
            <a href="#">About</a>
          </li>
        </ul>
        <button className=" text-white justify-end fixed right-5 bg-secondary p-1 rounded-md block md:hidden" onClick={handleMenuClick}>
          {!nav ? <IoMdMenu className="size-5"/> : <IoMdClose className="size-5" />}
        
        </button>
        <div className={!nav ? "fixed right-[-100%]" : "fixed right-0 top-14 w-[40%] bg-primary-red text-white ease-in-out duration-300"}>
        <ul>
          <li className="p-4 border-b border-gray-600 delay-75 duration-300 ease-in mt-2">
            <a href="#">Sign Up</a>
          </li>
          <li className="p-4 border-b border-gray-600 delay-100 duration-300 ease-in">
            <a href="#">Log In</a>
          </li>
          <li className="p-4 border-b border-gray-600 delay-150 duration-300 ease-in">
            <a href="#">About</a>
          </li>
        </ul>
        </div>
      </div>
    </div>
  );
}
