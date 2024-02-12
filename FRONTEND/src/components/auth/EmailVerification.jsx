import React, { useEffect, useRef, useState } from "react";
import Container from "../Container";
import Title from "../form/Title";
import Input from "../form/Input";
import SubmitBtn from "../form/SubmitBtn";
import BottomLink from "../form/BottomLink";
import Footer from "../Footer";

const OTP_LENGTH = 6;

export default function EmailVerification() {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill("")); //initializing an empty otp array
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="bg-[#1e1e1e] inset-0 fixed z-[-10] flex justify-center items-center">
      <Container className="">
        <form className="bg-primary flex flex-col p-8 rounded-xl">
          <Title>Email Verification</Title>
          <p className="text-white text-sm text-center">
            OTP has been sent to your mail!
          </p>

          {/* <div className="mt-6 mb-10 flex justify-between items-center">
            {
              otp.map((_, index) => {
                return (
                  <input type="number" className="bg-transparent border md:w-10 md:h-10 w-5 h-5 outline-none focus:border-primary-red duration-300 text-white text-center text-xl rounded" />
                );
              })
            }
          </div> */}
          <input
            ref={inputRef}
            type="number"
            className="bg-transparent border rounded text-white h-10 w-[70%] text-center mt-6 mb-10  self-center outline-none focus:border-primary-red duration-1000"
          />
         
          <SubmitBtn value="Verify OTP" />
        </form>
      </Container>
      <Footer />
    </div>
  );
}
