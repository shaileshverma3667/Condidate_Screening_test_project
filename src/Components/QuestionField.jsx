import React, { useContext, useState } from 'react'
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

const QuestionField = () => {
    const [createData,setCreateData]=useState(options)
    const createfield=(inputValue)=>{
            setCreateData((prev)=>([...prev,{"value":inputValue,"label":inputValue}]))
    }

const{formData,setFormData}=useContext(creatAPI)   
    function handleSubmit(e)
    {
        e.preventDefault()
        console.log(formData)
    }

    return (
        <>
            <div className='container'>
                    <form onSubmit={handleSubmit}>
                     <div className='test_name'>
                          <Label label={"test Name"} 
                           className={"test_name_label"} />
                          <input type="text" 
                           className='test_type_field' 
                           onChange={(e) => setFormData({"testname":e.target.value})} 
                           placeholder='Enter test name'/>
                          <button className='plus_btn'>+</button>
                    </div>

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
                        <input type="number"  className='totalNumberfield' onChange={(e) => setFormData({ ...formData, "TotalQuestion":Number(e.target.value)})} />
                    </div>
                    {formData.TotalQuestion? <RandomQuestionField
                     formData={formData} setFormData={setFormData}/>:""}
                    <div className='submit_final_btn_box'>
                        <button className='submit_btn'>Submit Condidate Test</button>
                        <button className='final_Submit_btn'>Final Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default QuestionField