import React, { useContext, useEffect } from 'react'
import { Grid, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system';
import noteContext from '../Context/Notes/noteContext'
import NoteItem from './NoteItem';

function Notes() {
    const context= useContext(noteContext);
    const{notes,getAllNotes}=context;


    useEffect(() => {
        getAllNotes()
    }, [])
    
  return (
    <Box  margin="10px" >
        <Grid container justifyContent="space-evenly" alignItems="center">
            {notes.map((note)=>(
            <Grid item  marginX="1vh"><NoteItem key={note._id} note={note} /></Grid>
            ))}
        </Grid>
    </Box>
   
  )
}

export default Notes
