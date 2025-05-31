import React from 'react'

 export  function Button({children , classname = ""}) {
  return (
  <button className = {`text-base bg-blue-400 px-4 py-2 rounded-3xl hover:bg-blue-500 transition${classname}`}>{children}</button>
  )
}

export default Button