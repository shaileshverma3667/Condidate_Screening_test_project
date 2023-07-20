import React, { useContext, useState } from 'react'
import Label from './Label'
import Select from 'react-select'
import { memo } from 'react'
import { AddNew_technology, AddNewquestion_type, Question_type } from './selectData'
import "./style/AddNewQuestion.css"
import { creatAPI } from '../App'
const AddNewQuestion = ({setAddNew}) => {
    const{formData,setFormData}=useContext(creatAPI)
    const [option, setOption] = useState([])
    const  [addNewQuestion,setAddNewQuestion]=useState({
        AddTechnology:'',
        QuestionType:'',
        QuestionTitle:'',
        options:{}
    })
  console.log(addNewQuestion)
    const handleOption = () => {
        setOption([...option, 0])   
    }
    const handleDelete=(index)=>{
         let copyData=[...option]
         copyData.splice(index,1)
         setOption(copyData)
    } 
    const handleChangeAddNew=(fieldName,value)=>{
        // setAddNewQuestion({...addNewQuestion,[fieldName]:value})
        if(fieldName.includes('option')){
            setAddNewQuestion((prev) => {
                return { ...prev,options:{...prev.options,[fieldName]:value}}
            })
        }else{
            setAddNewQuestion((prev) => {
                return { ...prev,[fieldName]:value}
            })
        }
    }

    const SaveData=()=>{
        console.log(addNewQuestion);
      setFormData({...formData, AddNewQuestionData:{...formData.AddNewQuestionData, addNewQuestion}})
    }
    console.log(formData)
    return (
        <>
            <div className='addNewQuestion_box'>
                <div className='newQuestionText'>Add New Question</div>
                <div>
                    <Label label="Technology" className="Tecno_label" />
                    <Select options={AddNew_technology} onChange={(value)=>handleChangeAddNew("AddTechnology",value.value)} className='add_technology'/>
                </div>

                <div className='question_type_field'>
                    <Label label="Question_type" className="question_label" />
                    <Select options={AddNewquestion_type} onChange={(value)=>handleChangeAddNew("QuestionType",value.value)} className='question_type' />
                </div>

                <div className='question_title_field'>
                    <Label label="Question_Title" className="question_label" />
                    <input type="text" onChange={(e)=>handleChangeAddNew("QuestionTitle",e.target.value)} className='question_title_input' />
                </div>

                {addNewQuestion.QuestionType=="mcq" &&
                <div>                    
                <div className='ans_option'><span>Answer Options</span><button className='plus_add_btn' onClick={handleOption}>+</button> </div>
                {
                    option.map((ele,index)=>(
                        index<4 ?
                        <div className='minus_btn_field'>
                            <div>
                                <Label label=  {`Answer option ${index+1}`}  />
                                <input type='text' className='anwerOption' onChange={(e)=>handleChangeAddNew(`option${index+1}`,e.target.value)}/>
                            </div>
                            <div className='minus_btn_field'>
                                <p>Is Correct</p>
                                <input type="checkbox" name={`boxans`}className='AddNew_checkBox' />
                                <button className='minus_btn_option' onClick={()=>handleDelete(index)}>-</button>
                            </div>
                        </div>
                       :<></>
                    ) )
                }
            </div>
                }
                <div>
                    <button className='create_btn' onClick={SaveData}  >Create</button>
                    <button className='save_create_btn'>Save & createNow</button>
                    <button className='cancle_btn' onClick={()=>setAddNew(false)}>Cancle</button>
                </div>
            </div>
        </>
    )
}

export default memo(AddNewQuestion)