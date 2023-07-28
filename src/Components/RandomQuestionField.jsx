import React, { useContext, useEffect, useState } from 'react'
import "./style/RandomQuestion.css"
import { memo } from 'react'
import Label from './Label'
import Select from 'react-select'
import { random_technology } from './selectData'
import PredefinedQuestion from './PredefinedQuestion'
import { creatAPI } from '../App'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify'
const RandomQuestionField = () => {
  const [showTab, setShowTab] = useState("left");
  const { formData, setFormData} = useContext(creatAPI)
  const {RandomQuestionData}=formData
  const handleChange = (e) => {
    const { name, value } = e.target
    if(value<0)
    {
      toast("Enter the valid random question")
    }
    if (name == 'randomq'){
      if (Number(value) <= Number(formData.TotalQuestion))
      {
        setFormData((prev)=>({ ...prev, RandomQuestionData: { ...prev.RandomQuestionData, [name]:value } }));
        setFormData((prev)=>({ ...prev, RandomQuestionData: { ...prev.RandomQuestionData, ["noOfMcq"]:value } }));

      }
      else
      {
        toast.warn("Enter the valid Question Number")
      }
    } else {
      if (formData.RandomQuestionData.randomq >= Number(value)) {
        setFormData({ ...formData, RandomQuestionData: { ...formData.RandomQuestionData, [name]:value}});
        if(Number(RandomQuestionData.descriptive)+Number(e.target.value)>Number(RandomQuestionData.randomq)){
          toast.error("Enter No is less than total random")
           }
      } else {
        toast.warn("Enter the valid number")
      }
    }
      
  }
    

  useEffect(()=>{
   setFormData({...formData,PredefinedQuestion:{...formData.PredefinedQuestion,totalPre:formData.TotalQuestion-formData.RandomQuestionData.randomq}})
  },[formData.RandomQuestionData.randomq])

  return (
    <div className='Question_tab'>
      <div><button className={`randomquestion_btn ${showTab === 'left' ? 'activeTab' : ''}`} onClick={() => setShowTab("left")}>RANDOM QUESTION</button></div>

      <div><button className={`predefinedQuestion_btn ${showTab === 'right' ? 'activeTab' : ''}`} onClick={() => setShowTab("right")}>PREDEFIND QUESTION</button></div>
      {
        showTab === 'left' ?
          <div className='random_box'>
            <div>
              <Label label="Random Question" className={"random_field_label"} />
              <input type="number" className='random_number_field' value={RandomQuestionData.randomq} onChange={handleChange} name="randomq" />
            </div>

            <div className='technology_field'>
              <Label label="Technology" className={"random_field_label"} />
              <Select options={random_technology} 
              className='random_technology_field'
              value={RandomQuestionData.randomTech}
              onChange={(e) => setFormData({ ...formData, RandomQuestionData: { ...formData.RandomQuestionData, "randomTech": e } })} />
            </div>
              
            {formData.isMcq=="true" || formData.managedBy=="agent" ?
            <div className='noOfmcq_field'>
              <Label label="number of Mcq Question" className={"random_field_label"} />
              <input type="number" name="noOfMcq" value={RandomQuestionData.noOfMcq} 
              onChange={handleChange} className='noOfMcq_field' 
              placeholder='Enter No of Mcq Question' />
            </div>
            :<div className='noOfmcq_field'>
           
            <input type="number" name="descriptive" value={RandomQuestionData.descriptive} 
            onChange={handleChange} className='noOfMcq_field' 
            placeholder='Enter No of Descriptive Question' />&nbsp;

          
            <input type="number" name="programing" value={RandomQuestionData.programming} 
            onChange={handleChange} className='noOfMcq_field' 
            placeholder='Enter No of Programing Question' />
          </div>
            }
          </div>
          : <p><PredefinedQuestion /></p>
      }

    </div>
  )
}

export default memo(RandomQuestionField)