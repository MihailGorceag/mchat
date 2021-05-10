import React from 'react'

import './style.css'

const Button = (props) => {
  const {children, ...otherProps} = props
  return <button {...otherProps}>{children}</button>
}

export default Button