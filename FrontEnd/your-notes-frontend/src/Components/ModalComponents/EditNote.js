import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import noteContext from '../../Context/Notes/noteContext';
import RootModal from './RootModal'

function EditNote() {

    const navigate=useNavigate();
    const context=useContext(noteContext);
    const {EditNotefnc,switchNoteModal,notes}=context;
    const {noteid}=useParams();
  
    const [note,setNote]=useState({
      title:"",
      tag:"",
      text:""
      })


    useEffect(() => {              //useSate rendering too many time resolved by putting it in useEffect
      //  logic to edit
    for (let index=0;index<notes.length;index++){
      const element=notes[index];
      if (element._id==noteid){
          setNote({title:element.title,
                    tag:element.tag,
                    text:element.text})
      }}
    }, [])


    const handleOnClick=(event)=>{
        EditNotefnc(note.title,note.tag,note.text,noteid);
        switchNoteModal();
        navigate("/notes")
        event.preventDefault();
    }

  return (
    <div>
      <RootModal  heading="EDIT THE NOTE" botton="SAVE" note={note} setNote={setNote} handleOnClick={handleOnClick} />
    </div>
  )
}

export default EditNote
