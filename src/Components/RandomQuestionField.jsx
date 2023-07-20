import React, { useState } from 'react'
import "./style/RandomQuestion.css"
import Label from './Label'
import Select from 'react-select'
import { random_technology } from './selectData'
import PredefinedQuestion from './PredefinedQuestion'
const RandomQuestionField = ({formData,setFormData}) => {
  const [showTab,setShowTab]=useState("left");
  const handleChange=(e)=>{
     const {name,value}=e.target
    setFormData(({...formData,[name]:Number(value)}));
  }
  console.log(formData.randomq)
  return (
    <div className='Question_tab'>
       <div><button className={`randomquestion_btn ${showTab === 'left' ? 'activeTab' : ''}`} onClick={()=>setShowTab("left")}>RANDOM QUESTION</button></div> 

       <div><button className={`predefinedQuestion_btn ${showTab === 'right' ? 'activeTab' : ''}`} onClick={()=>setShowTab("right")}>PREDEFIND QUESTION</button></div>
      {
      showTab==='left' ?
      <div className='random_box'>
        <div>
        <Label label="Random Question" className={"random_field_label"}/>
        <input type="number" className='random_number_field' onChange={handleChange} name="randomq" />  
        </div>
        <div className='technology_field'>
          <Label label="Technology" className={"random_field_label"}/>
          <Select options={random_technology} className='random_technology_field' onChange={(e)=>setFormData({...formData,"Noofmcq":e.value})}/>
        </div>
        <div className='noOfmcq_field'>
          <Label label="number of Mcq Question" className={"random_field_label"}/>
          <input type="number" name="noOfMcq" onChange={handleChange} className='noOfMcq_field' placeholder='Enter No of Mcq Question'/>  
        </div>
       </div>
       : <p><PredefinedQuestion formData={formData} setFormData={setFormData}/></p>
    }
       
    </div>
  )
}

export default RandomQuestionField