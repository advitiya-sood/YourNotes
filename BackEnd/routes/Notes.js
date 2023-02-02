const express = require("express");
const fetchUser = require("../middleWare/fetchUser");
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");
const router= express.Router();


// Route1: Get all notes for a user
router.get('/allnotes', fetchUser ,async (req,res)=>{

    try{
        const notes = await Note.find({userid:req.user.id});       // find notes by userId, received from middleware
        res.json(notes)
    }
    catch(error){
        console.error(error.message);
        res.status(500).send({error:"Internal Server Error"})
    }
})



// Route2: Add notes
router.post('/addnotes', fetchUser,  
[
    body("title","minLength:4").isLength({ min: 4 }),                          //validation for input by user
    body("text","minLength:5").isLength({ min: 5 }),
    body("tag","minLength:2").isLength({ min: 2 }),
], 
    async (req,res)=>{
    const {title, text, tag}=req.body
 
    const errors = validationResult(req);                         //  if any errors then show error-messages
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }

try{
    let note = await Note({                                                 // check with user model
        title:title,
        text:text,
        tag:tag,
        userid:req.user.id
    }); 

    note.save();
    res.json(note)
}
catch(error){
    console.error(error.message);
    res.status(500).send({error:"Internal Server Error"})
}
})



// Route3: Update Notes
router.put('/updatenote/:id', fetchUser,
 async(req,res)=>{
try{
    let updatedNote={};
    const {title,text,tag}=req.body;

    if(title){updatedNote.title=title}
    if(text){updatedNote.text=text}
    if(tag){updatedNote.tag=tag}

    let note= await Note.findById(req.params.id);    //id of the selected note
    if(!note){
        res.status(404).send({error:"Note not available"})
    }
    if(note.userid.toString()!== req.user.id){                      //check if its user's note or not
        res.status(401).send({error:"Unauthorised access"})
    }    
    note= await Note.findByIdAndUpdate(req.params.id,{$set: updatedNote}, {new:true})
    res.json(note);
}catch(error){
    console.error(error.message);
    res.status(500).send({error:"Internal Server Error"})       
}
})

//Route4: Delete the note
router.delete("/deletenote/:id",fetchUser, async(req,res)=>{
try{
    let note=  await Note.findById(req.params.id);

    if(!note){                                                          
        res.status(404).send({error:" Note not found"})
    }
    if(req.user.id!==note.userid.toString()){
        res.status(401).send({error:"Unauthorised access"})
    }

    note= await Note.findByIdAndDelete(req.params.id)
    res.send("Note Deleted")
}catch(errors){
    console.error(errors.message);
    res.status(500).send({error:"Internal Server Error"})  
}
})


module.exports= router;