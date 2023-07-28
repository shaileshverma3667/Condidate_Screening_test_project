import React, { useContext, useEffect, useState } from 'react'
import "./style/QuestionField.css"
import Creatable from "react-select/creatable"
import { options } from './selectData'
import Label from './Label'
import { ManagedBy } from './selectData'
import { ScreeningType } from './selectData'
import Select from 'react-select'
import RadioMcq from './RadioMcq'
import RandomQuestionField from './RandomQuestionField'
import { creatAPI } from '../App'
import { toast } from 'react-toastify'

const QuestionField = () => {
    const [createData,setCreateData]=useState(options)
    const createfield=(inputValue)=>{
            setCreateData((prev)=>([...prev,{"value":inputValue,"label":inputValue}]))
    }
const{formData,setFormData, addNewForm, setDisabledbtn}=useContext(creatAPI)   
    function handleSubmit(e)
    {
        e.preventDefault()
        console.log(formData)   
    }
    const onChangeTotalNumber=(e)=>{
        if(e.target.value<0)
         toast.error("Enter number of grater then 0")
         else
         setFormData({ ...formData,[e.target.name]:e.target.value})
       
    }
    
    let flag=(Object.values(formData).every(data=>Boolean(data)!==false));
    let flag2=(Object.values(formData.RandomQuestionData).every(data=>Boolean(data)!==false));
    
    useEffect(()=>{
        flag2 ? setDisabledbtn(true):setDisabledbtn(false)
    },[flag2])
    return (
        <>
            <div className='container'>
                    <form onSubmit={handleSubmit}>
                     <div className='test_name'>
                          <Label label={"test Name"} 
                           className={"test_name_label"} />
                           <input type="text" 
                           className='test_type_field' 
                           name="testname"
                           onChange={onChangeTotalNumber} 
                           placeholder='Enter test name'/>
                    </div>
                    <button className='plus_btn' onClick={addNewForm}>+</button>
                    <div className='select_test_type'>
                         <Label label={"Select test type or add new test type :"} 
                          className={"test_type_label"} />
                          <Creatable options={createData} 
                           onCreateOption={createfield}
                           onChange={(e) => setFormData({ ...formData, "testType": e.value })} />
                    </div>

                    <div className='managedBy_field'>
                            <RadioMcq formData={formData} setFormData={setFormData} />
                            <Label label={"Managed by :"} className={"manageBy_label"} />
                            <Select options={ManagedBy} onChange={(e) => {
                            e.value === 'agent'
                            ? setFormData({ ...formData, "managedBy": e.value, isMcq:true })
                            : setFormData({ ...formData, "managedBy": e.value })
                        }} />
                       
                    </div>

                    <div className='screeningType_field'>
                        <Select  options={ScreeningType} onChange={(e) => setFormData({ ...formData, "screeningType": e.value })} />
                        <Label label={"Screening Type"} className={"screeningType_label"} />
                    </div>

                    <div className='totalNoQuField'>
                        <Label label={"Total Number of Question"} className={"totalnoq"} />
                        <input type="number" name="TotalQuestion"  className='totalNumberfield' onChange={onChangeTotalNumber} />
                    </div>
                     {(flag && formData.TotalQuestion)? <RandomQuestionField />:""}
                    
                </form>
            </div>
        </>
    )
}

export default QuestionField