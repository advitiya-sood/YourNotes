import React, { useContext, useState } from 'react'
import noteContext from '../../Context/Notes/noteContext';
import RootModal from './RootModal'
import { useNavigate } from "react-router-dom";

function UploadNote() {

    const navigate=useNavigate();
    const context=useContext(noteContext);
    const {AddNotefnc,switchNoteModal}=context;

    const [note,setNote]=useState({
        title:"",
        tag:"",
        text:""
    })

    const handleOnClick=(event)=>{
        AddNotefnc(note.title,note.tag,note.text);
        switchNoteModal();
        navigate("/notes")
        event.preventDefault();
    }
  return (
    <div>
      <RootModal heading="ADD A NOTE" note={note} setNote={setNote} botton="ADD" handleOnClick={handleOnClick}/>
    </div>
  )
}

export default UploadNote
