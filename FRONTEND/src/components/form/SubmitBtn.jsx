import React from 'react'

export default function SubmitBtn({value, onclick}) {
  return (
    <input type="submit" onClick={onclick} className='border border-green text-white px-4 py-2 self-center hover:bg-green hover:text-black transition duration-300 cursor-pointer' value={value} />
  )
}
