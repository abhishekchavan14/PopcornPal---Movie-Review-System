import React, { useState } from "react";

import { IoMdMenu, IoMdClose } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation(); //used in keeping the Home,About etc in Navbar active when we on that corresponding path

  //to toggle between the menu and close icon (for mobile devices)
  const [nav, setNav] = useState(false);
  function handleMenuClick() {
    setNav(!nav);
  }

  return (
    <div className="bg-primary p-2 shadow-md shadow-black">
      <div className="flex items-center justify-between">
        <h1 className=" text-3xl font-bold text-primary-red">PopcornPal</h1>
        <ul className="mr-10 text-lg items-center hidden md:flex">
          <li className="mr-8">
            <Link
              to="/"
              className={
                location.pathname === "/"
                  ? "text-primary-red"
                  : "text-white hover:text-primary-red duration-300"
              }
            >
              Home
            </Link>
          </li>
          <li className="mr-8">
            <Link
              to="/auth/sign-up"
              className={
                location.pathname === "/auth/sign-up"
                  ? "text-primary-red"
                  : "text-white hover:text-primary-red duration-300"
              }
            >
              Sign up
            </Link>{" "}
          </li>
          <li className="mr-8">
            <Link
              to="/auth/log-in"
              className={
                location.pathname === "/auth/log-in"
                  ? "text-primary-red"
                  : "text-white hover:text-primary-red duration-300"
              }
            >
              Log in
            </Link>
          </li>
          <li>
            <Link
              to="/About"
              className={
                location.pathname === "/About"
                  ? "text-primary-red"
                  : "text-white hover:text-primary-red duration-300"
              }
            >
              About
            </Link>
          </li>
        </ul>
        {/*till this was the navbar for large devices*/}
        {/*------------------------------------------------------------------------------------------------------------------------------------*/}
        {/*below is the menu bar that is only for smaller devices*/}
        <button
          className=" text-white justify-end fixed right-5 bg-secondary p-1 rounded-md block md:hidden"
          onClick={handleMenuClick}
        >
          {!nav ? (
            <IoMdMenu className="size-5" />
          ) : (
            <IoMdClose className="size-5" />
          )}
        </button>
        <div
          className={
            !nav
              ? "fixed right-[-100%]"
              : "fixed right-0 top-14 w-[40%] bg-primary-red text-white ease-in-out duration-300 z-30"
          }
        >
          <ul>
            <li className="p-4 border-b border-gray-600 delay-75 duration-300 ease-in mt-2">
              <Link to="/">Home</Link>
            </li>
            <li className="p-4 border-b border-gray-600 delay-75 duration-300 ease-in mt-2">
              <Link to="/auth/sign-up">Sign Up</Link>
            </li>
            <li className="p-4 border-b border-gray-600 delay-100 duration-300 ease-in">
              <Link to="/auth/log-in">Log In</Link>
            </li>
            <li className="p-4 border-b border-gray-600 delay-150 duration-300 ease-in">
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
