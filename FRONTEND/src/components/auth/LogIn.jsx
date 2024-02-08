import React from 'react'
import Container from '../Container'
import Title from '../form/Title'
import Input from '../form/Input'
import SubmitBtn from '../form/SubmitBtn'
import BottomLink from '../form/BottomLink'

export default function LogIn() {
  return (
    <div className='bg-[#1e1e1e] inset-0 fixed z-[-10] flex justify-center items-center'>
      <Container className="">
        <form className='bg-primary flex flex-col p-8 rounded-xl'>
          <Title>Log In</Title>
          <Input name='email' label='Email' placeholder='examplemail@gmail.com'/>
          <Input name='password' label='Password' placeholder='8-20 characters long'/>
          <SubmitBtn />
          <BottomLink goTo="#">Forgot Password?</BottomLink>
        </form>
      </Container>
    </div>
  )
}
