import React from 'react'

 export  function Input({children , classname = ""}) {
  return (
    <input className={`bg-white ${classname}`}>{children}</input>
  )
}

export default Input