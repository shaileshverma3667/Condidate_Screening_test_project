import React, { memo, useContext, useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from 'axios'
import { creatAPI } from '../App';


function PredefindTable({axiosData,setAxiosData,clear,onHeaderCheckSelection,onClick, setSelectData,selectData}) {


  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'QuestionTitle', headerName: 'Question Title', width: 200 },
    { field: 'AddTechnology', headerName: 'Technology', width: 130 },
    { field: 'QuestionType', headerName: 'Question Type', width: 130 },
  ];

  const {formData} = useContext(creatAPI)
  
  useEffect(() => {
    axios.get("http://localhost:5000/AddNewQuestion").then((res) => setAxiosData(res.data))
   
  }, [formData.AddNewQuestionData.newly_question_added[0],clear])

   
  return (
    <div style={{ height: 340, maxWidth: '68%' }}>
      <DataGrid

        rowSelectionModel={selectData}
        rows={axiosData}
        columns={columns}
        initialState={{
            pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onCellClick={(newSelection) => {
          onClick(newSelection)
       }}
       onRowSelectionModelChange={(arr)=>
        {
         
          onHeaderCheckSelection(arr)
          setSelectData(arr)
        } }
      />
    </div>
  );
}

export default memo(PredefindTable)