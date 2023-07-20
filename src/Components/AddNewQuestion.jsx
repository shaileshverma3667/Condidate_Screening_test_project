import React, { useState } from 'react'
import Label from './Label'
import Select from 'react-select'
import { memo } from 'react'
import { AddNew_technology, AddNewquestion_type } from './selectData'
import "./style/AddNewQuestion.css"
const AddNewQuestion = ({formData,setFormData,setAddNew}) => {
    const [option, setOption] = useState([])
    const [cancle,setCancle]=useState(true)
    const handleOption = () => {
        setOption([...option, 0])   
    }
    const handleDelete=(index)=>{
          option.splice(index,1)
    }
    return (
        <>
            <div className='addNewQuestion_box'>
                <div className='newQuestionText'>Add New Question</div>
                <div>
                    <Label label="Technology" className="Tecno_label" />
                    <Select options={AddNew_technology} onChange={(e)=>setFormData({...formData,"AddTechnology":e.value})} className='add_technology' />
                </div>

                <div className='question_type_field'>
                    <Label label="Question_type" className="question_label" />
                    <Select options={AddNewquestion_type} onChange={(e)=>setFormData({...formData,"AddQuestionType":e.value})} className='question_type' />
                </div>

                <div className='question_title_field'>
                    <Label label="Question_Title" className="question_label" />
                    <input type="text" onChange={(e)=>setFormData({...formData,"AddQuestionTitle":e.target.value})} className='question_title_input' />
                </div>

                {formData.AddQuestionType=="mcq" &&
                <div>                    
                <div className='ans_option'><span>Answer Options</span><button className='plus_add_btn' onClick={handleOption}>+</button> </div>
                {
                    option.map((ele,index)=>(
                        index<4 ?
                        <div className='minus_btn_field'>
                            <div>
                                <Label label=  {`Answer option ${index+1}`}  />
                                <input type='text' className='anwerOption' />
                            </div>
                            <div className='minus_btn_field'>
                                <p>Is Correct</p>
                                <input type="radio" name="boxans" className='AddNew_checkBox'/>
                                <button className='minus_btn_option' onClick={()=>handleDelete(index)}>-</button>
                            </div>
                        </div>
                       :""
                    ) )
                }
            </div>
                }
                <div>
                    <button className='create_btn'>Create</button>
                    <button className='save_create_btn'>Save & createNow</button>
                    <button className='cancle_btn' onClick={()=>setAddNew(false)}>Cancle</button>
                </div>
            </div>
        </>
    )
}

export default memo(AddNewQuestion)