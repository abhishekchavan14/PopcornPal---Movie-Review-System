import React from "react"
import Navbar from "./components/Navbar"
import LogIn from "./components/auth/LogIn"
import SignUp from "./components/auth/SignUp"
import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import About from "./components/About"
import ResetPassword from "./components/auth/ResetPassword"
import EmailVerification from "./components/auth/EmailVerification"
import ConfirmPassword from "./components/auth/ConfirmPassword"

export default function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/sign-up" element={<SignUp />} />
      <Route path="/auth/log-in" element={<LogIn />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
      <Route path="/auth/confirm-password" element={<ConfirmPassword />} />
      <Route path="/auth/email-verification" element={<EmailVerification />} />
      <Route path="/about" element={<About />} />
    </Routes>
    </>
  )
}