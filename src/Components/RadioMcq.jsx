import React from 'react'
import Label from './Label'
import Radio from "./Field/Radio"
import { memo } from 'react'

const RadioMcq = ({formData,setFormData}) => {
const handleRadioChange=(e)=>{
     if(e.target.value=="yes")
        setFormData({...formData, isMcq:"true"})
     else
        setFormData({...formData,isMcq:"false"})
    }
    
  return (
    <div style={{position:'relative'}}>
     {
            formData.managedBy === 'agent'
            ?
                <div className='radio_mcq'>
                <Label label={"Is MCQ"}/>  <br/> 
                <Radio name="mcq" label="yes" onChange={handleRadioChange} disabled={true} checked={true}/>&nbsp;
                <Radio name="mcq" label="No" onChange={handleRadioChange} disabled={true}/>
                </div>
            :
                <div className='radio_mcq' style={{width:'150px'}}>
                <Label label={"Is MCQ"}/>  <br/> 
                <Radio name="mcq" label="yes" onChange={handleRadioChange}  disabled={false} checked={false}/>&nbsp;
                <Radio name="mcq" label="No" onChange={handleRadioChange}/>
                </div>
                
        }
    </div>
  )
}

export default memo(RadioMcq)