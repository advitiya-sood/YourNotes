import { Box, Button, Input, Modal, TextField, Typography } from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Stack } from '@mui/system'
import React, { useState, useContext } from 'react'
import noteContext from '../../Context/Notes/noteContext';
import { useNavigate } from "react-router-dom";

export default function RootModal(props) {
  console.log( "props", props.heading)

const navigate=useNavigate();
const context=useContext(noteContext);
const {open,switchNoteModal}=context;

console.log(open)

const handleOnChange=(event)=>{
    props.setNote({...props.note,[event.target.name]:event.target.value})
}

const handleOnClose=()=>{
    switchNoteModal();
    navigate("/notes")
}

  return (
<>
    <Modal  sx={{display:"flex", alignItems:"center",justifyContent:"center"}}
  open={open}
  onClose={handleOnClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
    >
  <Box textAlign="center" width="80vh" height="65vh" 
  borderRadius={5} 
  bgcolor="white"
   >
    <Typography  marginTop="5vh" variant='h5'> {props.heading}</Typography>
    <Box  flexDirection="column" gap="80px" display="flex"
        padding="5px 20px"  marginY="5vh" >
    <Stack direction="row" display="flex" justifyContent="space-between" >
        <TextField   onChange={handleOnChange}
            id="outlined"
            variant="filled"
            placeholder="Title"
            name="title"
            value={props.note.title}
            sx={{width:"45%" , height:"10px"}}
            />
        <TextField  onChange={handleOnChange}
            id="outlined"
            variant="filled"
            color="success"
            name="tag"
            value={props.note.tag}
            placeholder="Tag"
            sx={{width:"45%" , height:"10px"}}
            />
    </Stack>
        <TextField onChange={handleOnChange}
          id="outlined"
          variant="filled"
          placeholder="Text"
          name="text"
          value={props.note.text}
          multiline
          rows={3}
          />
    </Box>
    <Button variant="filled" sx={{background:"linear-gradient(0.25turn, #3f87a6, #f69d3c)"}} 
    width="20%"   onClick={props.handleOnClick}
    startIcon={<AddCircleOutlineOutlinedIcon />}>
        {props.botton}
    </Button>
  </Box>
</Modal>
    
    
    </>
  )
}
