import React from 'react'

export default function Container({children, className}) {
  return (
    <div className={"w-[70%] md:w-[30%]" + className}>{children}</div>
  )
}
