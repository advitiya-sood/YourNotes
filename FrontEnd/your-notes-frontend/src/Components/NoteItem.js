import  {React, useEffect, useState, useContext } from 'react';
import styled from '@emotion/styled'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import noteContext from '../Context/Notes/noteContext';
import { useNavigate } from "react-router-dom";
import { CardActionArea } from '@mui/material';

function NoteItem(props) {

    const StyledCard=styled(Card)`
        max-width:65vh;
        min-width:65vh;
        background-color:#EBEDEF;
        margin-top:20px;
        box-shadow:rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
        &:hover {
            background-color: #C2E3E3;
        }
    `

    const navigate=useNavigate();
    const [randomColor,setRandomColour]=useState("#F5B041");
    const context= useContext(noteContext);
    const{switchNoteModal,DeleteNote}=context;

    useEffect(() => {
        setRandomColour("#"+ Math.floor(Math.random()*16777215).toString(16))
    }, [1])
      
    const handleClickChange=()=>{
      switchNoteModal();
      navigate(`/editnote/${props.note._id}`)
    }

  return (
    <StyledCard>    
      <CardContent  sx={{ minHeight:"20vh", height:"20vh" , overflow:"auto","&:hover":{height:"auto"}}}>
        <Box style={{
          display:"flex",
          position:"relative",
          left:"auto",
          borderRadius:"3px",
          color:"white",
          padding:"1px 4px",
          width:"fit-content",
          height:"fit-content", 
          backgroundColor:randomColor  
        }} >
            <Typography fontSize="12px" >{props.note.tag}</Typography>
        </Box>
        <Typography variant="h5" sx={{fontWeight:"700",fontStyle:"oblique" }}  gutterBottom>
           {props.note.title}
        </Typography>
        <Typography>{props.note.text} </Typography>
      </CardContent>


      <CardActions sx={{marginLeft:"10px",}}> 
        <IconButton onClick={handleClickChange} ><ModeEditIcon/></IconButton>
        <IconButton  onClick={()=>DeleteNote(props.note._id)} ><DeleteIcon/></IconButton>
        <Typography 
            display="flex" 
            flex="1"
            position="relative"    right="10px"
            justifyContent="right"  color="grey"  
            fontSize="10px">
            {new Date(props.note.date).toLocaleString()}
        </Typography> 
      </CardActions>
    </StyledCard>
  )
}

export default NoteItem
