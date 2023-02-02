import { useState } from "react";
import noteContext from "./noteContext";

 const theme={background:"linear-gradient(0.25turn, #3f87a6, #f69d3c)"} 

 const initialNotes=[]

const NoteState=(props)=>{
const [notes,setNotes]=useState(initialNotes)    // notes saved here after fetching from database
const [open,setOpen]=useState(false)          //state of Modal component

//get all notes
const getAllNotes=  async ()=>{
    const response= await fetch("http://localhost:5000/api/notes/allnotes",{
    method:"GET",
    headers:{
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('JWT-token')
    }
    });
    const json= await response.json();
    setNotes(json);
}

// Add notes
const AddNotefnc= async (title,tag,text)=>{
    const response = await fetch('http://localhost:5000/api/notes/addnotes',{
        method:"POST",
    headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('JWT-token')
    },
    body:JSON.stringify({
        title,tag,text
    })  
})
const json= await response.json()
console.log(json)
}

// Edit notes
const EditNotefnc= async (title,tag,text,id)=>{
    const response = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`,{
        method:"PUT",
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('JWT-token')
        },
        body:JSON.stringify({
            title,tag,text
        })  
    })
    const json= await response.json()
    console.log(json)
}

// delete Notes
const DeleteNote= async (id)=>{
    const response= await fetch(`http://localhost:5000/api/notes/deletenote/${id}`,{
        method:"DELETE",
        headers:{
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('JWT-token')
        }
        });
        getAllNotes();
}


const switchNoteModal=()=>{
  setOpen(!open)                       //editing state of modal component
}

return(
    <noteContext.Provider value={{theme,notes,open,
            AddNotefnc,EditNotefnc,DeleteNote,getAllNotes,switchNoteModal}} >
        {props.children}
    </noteContext.Provider>
)}

export default NoteState;