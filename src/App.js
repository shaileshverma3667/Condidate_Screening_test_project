// import AddNewQuestion from './Components/AddNewQuestion';
import React,{useState} from "react";
import { createContext } from 'react';
import { ToastContainer} from 'react-toastify';
import QuestionField from './Components/QuestionField';
const creatAPI=createContext()
function App() {
  const [formData, setFormData] = useState({
    testname: "",
    testType: "",
    managedBy: "",
    isMcq: false,
    screeningType: "",
    TotalQuestion:0,
    RandomQuestionData:{},
    PredefindQuestion:{},
    AddNewQuestionData:{}
})
  return (
   <>
   <div className='test_title'>Condidate Screening Test Creation </div>
  <creatAPI.Provider value={{formData,setFormData}}>
  <QuestionField/>
  <ToastContainer/>
  </creatAPI.Provider>
  
   </>
  );
}

export default App;
export {creatAPI}
