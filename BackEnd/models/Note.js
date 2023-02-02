const mongoose =require('mongoose')
const {Schema}= mongoose;


const NotesSchema =new Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,                  // linked with id of User model
        ref:'Usermodel'
    },
    title:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type: Date,
        default:Date.now
    }
})

module.exports=mongoose.model("Notesmodel",NotesSchema);