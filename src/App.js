// import AddNewQuestion from './Components/AddNewQuestion';
import React, { useRef, useState } from "react";
import { createContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import QuestionField from './Components/QuestionField';
import { GridDeleteIcon } from "@mui/x-data-grid";
import "./App.css"

const creatAPI = createContext()
function App() {
  const [formCollection, setFormCollection] = useState([0])
  //flag to submit
  const [submit,setSubmit]=useState(false);

  const [disabledbtn, setDisabledbtn] = useState(false);

  const addNewForm = () => {   
    setFormCollection([...formCollection, 0])
  }
 const DeleteFormField=(index)=>{
    const copydata=[...formCollection]
      copydata.splice(index,1)
      setFormCollection(copydata)
 }
  return (
    <>
      <div className='test_title'>Candidate Screening Test Creation </div>
      <creatAPI.Provider value={{ addNewForm, setDisabledbtn,submit}}>
        {
          formCollection.map((ele,index) => (
            <>{index!==0?<button onClick={()=>DeleteFormField(index)} className="deleteIcon"><GridDeleteIcon/></button>:""}<QuestionField /></>
          ))
        }
        <ToastContainer />
      </creatAPI.Provider>
    
      <div className='submit_final_btn_box'>
        <button  className='submit_btn'
          style={{ background: `${disabledbtn ? 'blue' : 'gray'}` }}
          onClick={()=>setSubmit(!submit)}
          disabled={disabledbtn ? false : true}>Submit Candidate Test</button>

        <button className='final_Submit_btn' type="button" style={{ background: `${disabledbtn ? 'blue' : 'gray'}` }} disabled={disabledbtn ? false : true}>Final Submit</button>
      </div>

    </>
  );
}

export default App;
export { creatAPI }
