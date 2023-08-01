import React, { useContext, useEffect, useRef, useState } from 'react'
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
import AddBoxIcon from '@mui/icons-material/AddBox';

const QuestionField = () => {
    const [createData,setCreateData]=useState(options)
    const createfield=(inputValue)=>{
            setCreateData((prev)=>([...prev,{"value":inputValue,"label":inputValue}]))
    }

    const [render,setRender]=useState(false);
    const [formData, setFormData] = useState({
        testname: "",
        testType: "",
        managedBy: "",
        isMcq: "true",
        screeningType: "",
        TotalQuestion: 0,
        RandomQuestionData: { randomq: 0,randomTech: "", noOfMcq: 0 },
        PredefinedQuestion: { totalPre: 0 },
        AddNewQuestionData: { newly_question_added: [0] }
      })
    
const{addNewForm, setDisabledbtn,submit,...rest}=useContext(creatAPI)   
    function handleSubmit(e)
    {
        e.preventDefault()  
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
    },[flag2]);

    useEffect(()=>{
        render?console.log(formData):setRender(true);
    },[submit])

    return (
        <>
        <creatAPI.Provider value={{formData, setFormData, setDisabledbtn ,...rest}}>
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
                    <button className='plus_btn' onClick={addNewForm}><AddBoxIcon/></button>
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
                        <Label label={"Screening Type"} className={"screeningType_label"} />
                        <Select  options={ScreeningType} onChange={(e) => setFormData({ ...formData, "screeningType": e.value })} />
                       
                    </div>

                    <div className='totalNoQuField'>
                        <Label label={"Total Number of Question"} className={"totalnoq"} />
                        <input type="number" name="TotalQuestion"  className='totalNumberfield' onChange={onChangeTotalNumber} />
                    </div>
                     {(flag && formData.TotalQuestion)? <RandomQuestionField />:""}
                    <br/><br/>
                </form>
            </div>
        </creatAPI.Provider>
        </>
    )
}

export default QuestionField