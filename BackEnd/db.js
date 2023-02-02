
const mongoURI="mongodb://localhost:27017/?directConnection=true"
const mongoose=require("mongoose")

const connecToDb=()=>{
    mongoose.set('strictQuery',false);
    mongoose.connect(mongoURI,()=>{console.log("Connected to mongoDb")})
}

module.exports= connecToDb;