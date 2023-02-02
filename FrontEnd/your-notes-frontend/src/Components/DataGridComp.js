import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import noteContext from '../Context/Notes/noteContext';


const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'title', headerName: 'Title', width: 90 },
  { field: 'tag', headerName: 'Tag', width: 90 },
  { field: 'text', headerName: 'Text', width: 90 },

];


export default function DataGridComp() {

  const context= React.useContext(noteContext);
  const{notes,getAllNotes}=context;



let tempData=[]                  //is concept ne dimag kharab kar dia but ho gaya finally
notes.map((note,id)=>{   
  tempData = [
    ...tempData,
    {id:id+1, title:note.title, tag:note.tag, text:note.text},
  ]
})


  const  [rows,setRows] = React.useState([])

React.useEffect(() => {
     getAllNotes()
}, [])


React.useEffect(() => {
    
      setRows(tempData)
     
}, [notes])

  return (
    <Box sx={{ height: 400, width: "40%", marginX:"auto", marginTop:"5vh", bgcolor:"#EBF5FB",
     border:"1px solid orange" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
