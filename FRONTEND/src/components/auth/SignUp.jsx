import React, { useState } from "react";
import Container from "../Container";
import Title from "../form/Title";
import Input from "../form/Input";
import SubmitBtn from "../form/SubmitBtn";
import BottomLink from "../form/BottomLink";
import Footer from "../Footer";
import { createUser } from "../../api/auth";

const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^.{8,20}$/;


const validateUserInfo = ({username, email, password}) => {
  if(!usernameRegex.test(username)){
    return {ok:false, error:"Invalid Username!"}
  }
  if(!emailRegex.test(email)){
    return {ok:false, error:"Invalid Email ID!"}
  }
  if(!passwordRegex.test(password)){
    return {ok:false, error:"Password should be 8-20 characters long!"}
  }
  return {ok:true}
}

export default function SignUp() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = ({target}) =>{
    const {name, value} = target
    setUserInfo({...userInfo, [name]: value})
  }

  const handleClick = (e) =>{
    e.preventDefault()
    const {ok, error} = validateUserInfo(userInfo)

    if(!ok){
      return console.log(error)
    }

    createUser(userInfo)
  }
  return (
    <div className="bg-[#1e1e1e] inset-0 fixed z-[-10] flex justify-center items-center">
      <Container className="">
        <form className="bg-primary flex flex-col p-8 rounded-xl">
          <Title>Sign Up</Title>
          <Input value={userInfo.name} name="username" label="Username" placeholder="abhichavan14" onChange={handleChange} />
          <Input
            name="email"
            label="Email"
            value={userInfo.email}
            placeholder="examplemail@gmail.com"
            onChange={handleChange}
          />
          <Input
            name="password"
            label="Password"
            value={userInfo.password}
            placeholder="8-20 characters long"
            type="password"
            onChange={handleChange}
          />
          <SubmitBtn value="Proceed" onclick={handleClick}/>
          <BottomLink goTo="/auth/log-in">Already have an account?</BottomLink>
        </form>
      </Container>
      <Footer />
    </div>
  );
}
