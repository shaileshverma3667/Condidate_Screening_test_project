import React, { useContext, useState } from 'react'
import Label from './Label'
import Select from 'react-select'
import { memo } from 'react'
import { AddNew_technology, AddNewquestion_type, Question_type } from './selectData'
import "./style/AddNewQuestion.css"
import { creatAPI } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'

const AddNewQuestion = ({ setAddNew }) => {
    const { formData, setFormData } = useContext(creatAPI)
    const [option, setOption] = useState([])
    const initialState={ AddTechnology:"", QuestionType: '', QuestionTitle: '',options: {}}
    const [addNewQuestion, setAddNewQuestion] = useState(initialState)
    
    //option handle
    const handleOption = () => {
        setOption([...option, 0])
    }
    const handleDelete = (index) => {
        let copyData = [...option]
        copyData.splice(index, 1)
        setOption(copyData)
    }
    const handleChangeAddNew = (fieldName, value) => {
        if (fieldName.includes('option')) {
            setAddNewQuestion((prev) => {
                return { ...prev, options: { ...prev.options, [fieldName]: value } }
            })
        } else {
            setAddNewQuestion((prev) => {
                return { ...prev, [fieldName]: value }
            })
        }
    }
     
    const SaveData = () => {
    if(Object.values(addNewQuestion).every(data=>Boolean(data)!==false))
    {
        setFormData({ ...formData, AddNewQuestionData: { ...formData.AddNewQuestionData, addNewQuestion } }) 
        let {AddTechnology,QuestionType,...rest}=addNewQuestion;

        axios.post("http://localhost:5000/AddNewQuestion", {
           AddTechnology:AddTechnology.value, QuestionType:QuestionType.value, ...rest
        })
        toast.success("Data inserted successfully")
        setAddNew(false)
        setAddNewQuestion(initialState)
        setFormData(pre => ({...pre, AddNewQuestionData:{...pre.AddNewQuestionData,newly_question_added:[pre.AddNewQuestionData.newly_question_added + 1]}}))
    }
    else{
        toast.error("please fill the all field")  
    }
    }
    const handleSave_create=()=>{
        if(Object.values(addNewQuestion).every(data=>Boolean(data)!==false))
        {
            setFormData({ ...formData, AddNewQuestionData: { ...formData.AddNewQuestionData, addNewQuestion } }) 
            let {AddTechnology,QuestionType,...rest}=addNewQuestion;

            axios.post("http://localhost:5000/AddNewQuestion", {
               AddTechnology:AddTechnology.value, QuestionType:QuestionType.value, ...rest
            })
            toast.success("Data inserted successfully")
            setAddNewQuestion(initialState)
            setFormData(pre => ({...pre, AddNewQuestionData:{...pre.AddNewQuestionData,newly_question_added:[pre.AddNewQuestionData.newly_question_added + 1]}}))
        }
        else{
            toast.error("please fill the all field")  
        }
    }
    return (
        <>
            <div className='addNewQuestion_box'>
                <div className='newQuestionText'>Add New Question</div>
                <div>
                    <Label label="Technology" className="Tecno_label" />
                    <Select options={AddNew_technology}
                        onChange={(value) => handleChangeAddNew("AddTechnology", value)}
                        className='add_technology' 
                        value={addNewQuestion.AddTechnology}/>
                </div>

                <div className='question_type_field'>
                    <Label label="Question_type" className="question_label" />
                    <Select options={AddNewquestion_type}
                        onChange={(value) => handleChangeAddNew("QuestionType", value)}
                        className='question_type' 
                        value={addNewQuestion.QuestionType}
                        />
                </div>

                <div className='question_title_field'>
                    <Label label="Question_Title" className="question_label" />
                    <input type="text"
                        onChange={(e) => handleChangeAddNew("QuestionTitle", e.target.value)}
                        value={addNewQuestion.QuestionTitle}
                        className='question_title_input' />
                </div>

                {addNewQuestion.QuestionType.value == "mcq" &&
                    <div>
                        <div className='ans_option'><span>Answer Options</span><button className='plus_add_btn' onClick={handleOption}>+</button> </div>
                        {
                            option.map((ele, index) => (
                                index < 4 ?
                                    <div className='minus_btn_field'>
                                        <div>
                                            <Label label={`Answer option ${index + 1}`} />
                                                <input type='text' className='anwerOption'
                                                 onChange={(e) => handleChangeAddNew(`option${index + 1}`, e.target.value)} />
                                        </div>
                                        <div className='minus_btn_field'>
                                             <p>Is Correct</p>
                                             <input type="radio" onClick={(e) => { setAddNewQuestion(pre => ({ ...pre, "correctOption": `option${index + 1}` })) }}
                                              name={`boxans`} className='AddNew_checkBox' />
                                             <button className='minus_btn_option'
                                              onClick={() => handleDelete(index)}>-</button>
                                        </div>
                                    </div>
                                    : <></>
                            ))
                        }
                    </div>
                }
                <div>
                    <button className='create_btn' onClick={SaveData}  >Create</button>
                    <button className='save_create_btn' onClick={handleSave_create}>Save & createNow</button>
                    <button className='cancle_btn' onClick={() => setAddNew(false)}>Cancle</button>
                </div>
            </div>
        </>
    )
}

export default memo(AddNewQuestion)