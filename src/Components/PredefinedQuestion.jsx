import React, { useState } from 'react'
import Label from './Label'
import "./style/Predefined.css"
import Select from 'react-select'
import { memo } from 'react'
import { predefined_technology,Question_type } from './selectData'
import AddNewQuestion from './AddNewQuestion'
import PredefindTable from './PredefindTable'
const PredefinedQuestion = ({formData,setFormData}) => {
    const [addNew,setAddNew]=useState(false)

    function setMultiTech(e,name){
        let arr=[];
        e.map((ele,index)=>{
            arr=[...arr,ele.value];
        }); 
        setFormData({...formData,[name]:arr})
    }
    console.log(formData.totalPre)
  return (
   <>
    <div className='predefined_box'>
       <div>
         <Label label="Total Number of Predefined Question" className={"total_pre_label"}/>
         <input type='number' name="totalPre" onChange={(e)=>setFormData({...formData,[e.target.name]:Number(e.target.value)})} className='total_predefined'/>
       </div>

        <div className='techology_field'>
        <Label label="technology" className={"technology_label"}/>
        <Select isMulti  onChange={(e)=>setMultiTech(e,"predefinedTech")} options={predefined_technology} className="pre_technology"  classNamePrefix="select"/>
        </div>
        <div className='Question_type_field'>
        <Label label="Question Type" className={"technology_label"}/>
        <Select isMulti   onChange={(e)=>setMultiTech(e,"QuestionType")}  options={Question_type} className="pre_technology"  classNamePrefix="select"/>
        </div>
        <div className='field_btn'>
            <button className='search_btn'>Search</button>
            <button className='clear_btn'>Clear</button>
            <button className='add_new_btn' onClick={()=>setAddNew(true)}>Add New Question</button>
        </div>
        <div><PredefindTable/></div>
        {
            addNew ? <AddNewQuestion formData={formData} setFormData={setFormData} setAddNew={setAddNew}/> :""
        }
    </div>
   </>
  )
}

export default memo(PredefinedQuestion)