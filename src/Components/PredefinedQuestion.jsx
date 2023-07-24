import React, { useContext, useState } from 'react'
import Label from './Label'
import "./style/Predefined.css"
import Select from 'react-select'
import { memo } from 'react'
import { predefined_technology,Question_type } from './selectData'
import AddNewQuestion from './AddNewQuestion'
import PredefindTable from './PredefindTable'
import { creatAPI } from '../App'
import axios from 'axios'

const PredefinedQuestion = () => {
    const [addNew,setAddNew]=useState(false)
    const [searchData,setSearchData]=useState({predefinedTech:[],QuestionType:[]})
    const [clear,setClear]=useState(false)
    const [axiosData, setAxiosData] = useState([])

    const {formData,setFormData}=useContext(creatAPI)
    function setMultiTech(e,name){
        setSearchData((prev)=>({...prev,[name]:e}))
        }
        const handleClear=()=>{
         setSearchData({predefinedTech:[],QuestionType:[]})
         setClear(!clear)
         }

        const handleSearch=()=>{

        const {predefinedTech,QuestionType}=searchData
    
        const technology1 = searchData.predefinedTech.length != 0 && predefinedTech[0]?.value
        const technology2 = searchData.predefinedTech.length === 2 && predefinedTech[1]?.value
        const question_type1 = searchData.QuestionType.length !== 0 && QuestionType[0]?.value
        const question_type2 = searchData.QuestionType.length === 2 && QuestionType[1]?.value

        if (question_type1) {
            if (question_type2 && technology2) {
              axios.get(`http://localhost:5000/AddNewQuestion?AddTechnology=${technology1}&AddTechnology=${technology2}&QuestionType=${question_type1}&QuestionType=${question_type2}`).then(resp => {
                    setAxiosData(resp.data)
                })
            }
            else if(question_type2 && technology1){
                axios.get(`http://localhost:5000/AddNewQuestion?AddTechnology=${technology1}&QuestionType=${question_type1}&QuestionType=${question_type2}`).then(resp => {
                    setAxiosData(resp.data)
                })
            }else if(technology1 && technology2) {
                axios.get(`http://localhost:5000/AddNewQuestion?AddTechnology=${technology1}&AddTechnology=${technology2}&QuestionType=${question_type1}`).then(resp => {
                    setAxiosData(resp.data)
                })
            }
             else if(technology1) {
                axios.get(`http://localhost:5000/AddNewQuestion?AddTechnology=${technology1}&QuestionType=${question_type1}`).then(resp => {
                    setAxiosData(resp.data)
                })
            }else{
                axios.get(`http://localhost:5000/AddNewQuestion?QuestionType=${question_type1}`).then(resp => {
                    setAxiosData(resp.data)
                })
            }
        } else if (technology2) {
            axios.get(`http://localhost:5000/AddNewQuestion?AddTechnology=${technology1}&AddTechnology=${technology2}`).then(resp => {
                setAxiosData(resp.data)
            })
        } else {
            axios.get(`http://localhost:5000/AddNewQuestion?AddAddTechnology=${technology1}`).then(resp => setAxiosData(resp.data))
        }

    }
        const handleTotalPredefined=(e)=>{
         //  console.log(formData.RandomQuestionData.randomq+formData.PredefindQuestion.totalPre<=formData.TotalQuestion)
        // let predefineData=formData.TotalQuestion-formData.RandomQuestionData.randomq
          setFormData({...formData, PredefindQuestion : { ...formData.PredefindQuestion,[e.target.name]:e.target.value}})
       
        }

        //checkbox selections function is here
       const onHeaderCheckSelection=(data)=>{
            console.log(data,"onHeaderCheckSelection")
       }
       const onClick=(data)=>{
        console.log(data.row, " onClick")
       }
  return (
   <>
    <div className='predefined_box'>
       <div>
         <Label label="Total Number of Predefined Question" className={"total_pre_label"}/>
         <input type='number'
                name="totalPre" 
                value={formData.PredefindQuestion.totalPre}
                onChange={handleTotalPredefined} 
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
            <button className='add_new_btn' onClick={()=>setAddNew(!addNew)}>Add New Question</button>
        </div>
        <div><PredefindTable clear={clear} axiosData={axiosData}  setAxiosData={setAxiosData} onHeaderCheckSelection={onHeaderCheckSelection} onClick={onClick}/></div>
        {
            addNew ? <AddNewQuestion  setAddNew={setAddNew}/> :""
        }
    </div>
   </>
  )
}

export default memo(PredefinedQuestion)