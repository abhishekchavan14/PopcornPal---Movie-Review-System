import React from "react"
import Navbar from "./components/landing/navbar"
import LogIn from "./components/auth/LogIn"
import Hero from "./components/landing/Hero"
import Footer from "./components/landing/Footer"
import SignUp from "./components/auth/SignUp"

export default function App() {
  return (
    <>
    <Navbar />
    <SignUp />
    {/* <Hero /> */}
    <Footer />
    </>
  )
}