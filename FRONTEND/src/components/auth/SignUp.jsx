import React from 'react'
import Container from '../Container'
import Title from '../form/Title'
import Input from '../form/Input'
import SubmitBtn from '../form/SubmitBtn'
import BottomLink from '../form/BottomLink'

export default function SignUp() {
  return (
    <div className='bg-[#1e1e1e] inset-0 fixed z-[-10] flex justify-center items-center'>
      <Container className="">
        <form className='bg-primary flex flex-col p-8 rounded-xl'>
          <Title>Sign Up</Title>
          <Input name='username' label='Username' placeholder='abhichavan14'/>
          <Input name='email' label='Email' placeholder='examplemail@gmail.com'/>
          <Input name='password' label='Password' placeholder='8-20 characters long'/>
          <SubmitBtn />
          <BottomLink goTo="#">Already have an account?</BottomLink>
        </form>
      </Container>
    </div>
  )
}
