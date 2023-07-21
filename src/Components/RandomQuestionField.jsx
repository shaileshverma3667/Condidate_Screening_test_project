import React, { useContext, useState } from 'react'
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
  const { formData, setFormData } = useContext(creatAPI)
  const handleChange = (e) => {
    const { name, value } = e.target

    if (name == 'randomq') {
      if (formData.TotalQuestion >= value) {
        setFormData({ ...formData, RandomQuestionData: { ...formData.RandomQuestionData, [name]: Number(value) } });
      } else {
        toast("Enter the valid number")
      }
    } else {
      if (formData.RandomQuestionData.randomq >= value) {
        setFormData({ ...formData, RandomQuestionData: { ...formData.RandomQuestionData, [name]: Number(value) } });
      } else {
        toast("Enter the valid number")
      }
    }
  }
 

  return (
    <div className='Question_tab'>
      <div><button className={`randomquestion_btn ${showTab === 'left' ? 'activeTab' : ''}`} onClick={() => setShowTab("left")}>RANDOM QUESTION</button></div>

      <div><button className={`predefinedQuestion_btn ${showTab === 'right' ? 'activeTab' : ''}`} onClick={() => setShowTab("right")}>PREDEFIND QUESTION</button></div>
      {
        showTab === 'left' ?
          <div className='random_box'>
            <div>
              <Label label="Random Question" className={"random_field_label"} />
              <input type="number" className='random_number_field' onChange={handleChange} name="randomq" />
            </div>

            <div className='technology_field'>
              <Label label="Technology" className={"random_field_label"} />
              <Select options={random_technology} className='random_technology_field' onChange={(e) => setFormData({ ...formData, RandomQuestionData: { ...formData.RandomQuestionData, "randomTech": e.value } })} />
            </div>

            <div className='noOfmcq_field'>
              <Label label="number of Mcq Question" className={"random_field_label"} />
              <input type="number" name="noOfMcq" onChange={handleChange} className='noOfMcq_field' placeholder='Enter No of Mcq Question' />
            </div>
          </div>
          : <p><PredefinedQuestion /></p>
      }

    </div>
  )
}

export default memo(RandomQuestionField)