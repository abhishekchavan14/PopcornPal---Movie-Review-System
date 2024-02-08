import React from 'react'

export default function BottomLink({children, goTo}) {
  return (
    <a href={goTo} className='text-blue text-xs mt-6 self-center hover:text-white transition duration-200'>{children}</a>
  )
}
