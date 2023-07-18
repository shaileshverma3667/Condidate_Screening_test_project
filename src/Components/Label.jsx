import React from 'react'
import { memo } from 'react'
const Label = ({label,className}) => {
  return (
    <>
    <label htmlFor={label} className={className}>{label}</label><br/>
    </>
  )
}

export default memo(Label)