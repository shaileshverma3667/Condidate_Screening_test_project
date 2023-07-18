import React from 'react'
import { memo } from 'react'
const Radio = ({name,className,label,disabled=false, checked,onChange}) => {

  return (
   <>
   <input type='radio' name={name} value={label} onChange={onChange} className={className} checked={checked ? true : null} disabled={disabled}/>&nbsp;&nbsp;
   <label>{label}</label>
   </>
  )
}

export default memo(Radio)