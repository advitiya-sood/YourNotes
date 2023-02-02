const connecToDb=require('./db')
const express = require('express')
const cors=require("cors");


const corsOptions ={
  origin:'*'
}


connecToDb();

const app = express()
const port = 5000

app.use(express.json());
app.use(cors(corsOptions))

// Available Routes
app.use('/api/auth', require('./routes/Auth'))
app.use('/api/notes', require('./routes/Notes'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})