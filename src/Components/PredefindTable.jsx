import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from 'axios'


export default function  PredefindTable() {

const [axiosData,setAxiosData]=useState([])
const columns= [
  { field: 'id', headerName: 'ID', width:100 },
  { field: 'title', headerName: 'Question Title', width:200 },
  { field: 'technology', headerName: 'Technology', width: 130 },
  { field: 'question_type', headerName: 'Question Type', width: 130 },  
];
const [rows,setRows]=useState([]);


  const FetchData=()=>{
  return  axios.get("http://localhost:5000/AddNewQuestion").then((res)=>setAxiosData(res.data))
}
   const temp=axiosData.map((item,index)=>{
   return {id:item.id,"title":item?.QuestionTitle,"technology":item?.AddTechnology,"question_type":item?.QuestionType }
    });
 
   useEffect(()=>{
      FetchData();
      setRows(temp);
      

   },[])
  //  console.log(table)
  return (
    <div style={{ height: 340, maxWidth: '60%' }}>
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
    />
  </div>
  );
}
