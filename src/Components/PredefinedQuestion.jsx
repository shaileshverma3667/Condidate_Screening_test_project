import React, { useContext, useState } from 'react'
import Label from './Label'
import "./style/Predefined.css"
import Select from 'react-select'
import { memo } from 'react'
import { predefined_technology,Question_type } from './selectData'
import AddNewQuestion from './AddNewQuestion'
import PredefindTable from './PredefindTable'
import { creatAPI } from '../App'
const PredefinedQuestion = () => {
    const [addNew,setAddNew]=useState(false)
    const [searchData,setSearchData]=useState({predefinedTech:[],QuestionType:[]})
    const {formData,setFormData}=useContext(creatAPI)
    function setMultiTech(e,name){
        // setFormData({...formData, PredefindQuestion : { ...formData.PredefindQuestion, [name]: e}})
        setSearchData((prev)=>({...prev,[name]:e}))
        }
        
          const handleClear=()=>{
              setSearchData({predefinedTech:[],QuestionType:[]})
          }
          const handleSearch=()=>{
          console.log(searchData)
        }
  return (
   <>
    <div className='predefined_box'>
       <div>
         <Label label="Total Number of Predefined Question" className={"total_pre_label"}/>
         <input type='number'
                name="totalPre" 
                onChange={(e)=>setFormData({...formData, PredefindQuestion : { ...formData.PredefindQuestion, [e.target.name]: e.target.value}})} 
                className='total_predefined'/>
       </div>

        <div className='techology_field'>
        <Label label="technology" className={"technology_label"}/>
        <Select 
                isMulti
                onChange={(e)=>setMultiTech(e,"predefinedTech")} 
                options={predefined_technology} 
                className="pre_technology"  
                classNamePrefix="select"
                value={searchData.predefinedTech}
                />
                
        </div>

        <div className='Question_type_field'>
        <Label label="Question Type" className={"technology_label"}/>
        <Select isMulti
                onChange={(e)=>setMultiTech(e,"QuestionType")}  
                options={Question_type} className="pre_technology"  
                classNamePrefix="select"
                value={searchData.QuestionType}
                />
        </div>
        
        <div className='field_btn'>
            <button className='search_btn'onClick={handleSearch}>Search</button>
            <button className='clear_btn' onClick={()=>handleClear()}>Clear</button>
            <button className='add_new_btn' onClick={()=>setAddNew(true)}>Add New Question</button>
        </div>
        <div><PredefindTable/></div>
        {
            addNew ? <AddNewQuestion  setAddNew={setAddNew}/> :""
        }
    </div>
   </>
  )
}

export default memo(PredefinedQuestion)