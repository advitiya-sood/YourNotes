const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser=require('../middleWare/fetchUser')


const secretKey="I_am_Batman"; 
let success=false;



//ROUTE1: REGISTRATION ENDPOINT 
router.post("/register",
  [
    body("name").isLength({ min: 2 }),                          //validation for input by user
    body("email", "Enter a valid Email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
        const errors = validationResult(req);                       //  if any errors then show message
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

    try{
        let user=  await User.findOne({email:req.body.email});             //check for unique userEmail before sending the req
        if(user){
            return res.status(400).json({error:"sorry a user with same Email exist"});
        }
    
        const salt = await bcrypt.genSalt(10);                       
        const secretPass=  await bcrypt.hashSync(req.body.password,salt)    //hasing the password before storing

        user = await User({                                                 // check with user model
            name:req.body.name,
            email:req.body.email,
            password:secretPass
        });   
        
                                
        const data={                                                // implementing JWT token
            user:{
                id:user.id
            }
        }
        const JWT_Token= jwt.sign(data, secretKey); 

        user.save();                                              // save toDatabase
        success=true;
        res.json({success});
        } catch (error){ 
            console.error(error.message)
            res.status(500).send("Some Error Occured")
        } 
    }
    );
    

    // ROUTE2: LOGIN ENDPONT

    router.post("/login",
    [ body("email", "Enter a valid Email").isEmail(),  
      body("password","Password cannot be blank").exists()
    ], 
    async (req, res) => {
        const errors = validationResult(req);            //  if any errors then show error-messages
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        
        const {email,password}= req.body;
        try{
            let user=  await User.findOne({email});  // instead of email:email can just write email because same name
            if(!user){
                return res.status(400).send({error:"Please enter correct credentials"})
            }

            const passwordCompare= await bcrypt.compare(password,user.password)   // verify the password
            if (!passwordCompare){
                return res.status(400).send({error:"Please enter correct password"})
            }

            const data={
                user:{
                    id:user.id
                }
            }
            const JWT_Token= jwt.sign(data, secretKey); 
            success=true;
            res.json({success,Jwt_Token:JWT_Token});
        }catch(error){
            console.error(error.message)
            res.status(500).send("Some Error Occured")
        } 
    })


    //ROUTE3: GET USER INFO

    router.post("/user",fetchUser, async (req,res)=>{     //used a middleware function

        try{
            const userId=req.user.id;
            const loggedUser = await User.findById(userId).select("-password")
            res.send(loggedUser)

        }
        catch(error){
            console.error(error.message)
            res.status(500).send("Some Error Occured")
        }

    })

    module.exports = router;
    