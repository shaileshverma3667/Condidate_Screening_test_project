// import AddNewQuestion from './Components/AddNewQuestion';
import React, { useState } from "react";
import { createContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import QuestionField from './Components/QuestionField';
const creatAPI = createContext()
function App() {
  const [formCollection, setFormCollection] = useState([0])
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
  console.log(formData);
  const [disabledbtn, setDisabledbtn] = useState(false);

  const addNewForm = () => {
    setFormCollection([...formCollection, 0])
  }

    const condidateSubmit=()=>{
      console.log(formData)
      toast.success("Test submitted successful")
    }
  
  return (
    <>
      <div className='test_title'>Candidate Screening Test Creation </div>
      <creatAPI.Provider value={{ formData, setFormData, addNewForm, setDisabledbtn }}>
        {
          formCollection.map(() => (
            <QuestionField />
          ))
        }
        <ToastContainer />
      </creatAPI.Provider>
   
      <div className='submit_final_btn_box'>
        <button className='submit_btn'
          style={{ background: `${disabledbtn ? 'blue' : 'gray'}` }}
          onClick={condidateSubmit}
          disabled={disabledbtn ? false : true}>Submit Candidate Test</button>

        <button className='final_Submit_btn' type="button" style={{ background: `${disabledbtn ? 'blue' : 'gray'}` }} disabled={disabledbtn ? false : true}>Final Submit</button>
      </div>
    </>
  );
}

export default App;
export { creatAPI }
