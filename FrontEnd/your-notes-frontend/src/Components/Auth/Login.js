import {React, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';
import { motion } from "framer-motion"


function Login() {
    const navigate=useNavigate();
    const [formInfo,setFormInfo]=useState({
        email:"",
        password:""
    })

    const handleSubmit= async (event)=>{
        event.preventDefault();
        const response= await fetch("http://localhost:5000/api/auth/login",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email:formInfo.email,
                password:formInfo.password
            })
        })
        const json= await response.json()
        console.log(json);
        if(json.success){                            // save authtoken to local storage and redirect
           await localStorage.setItem('JWT-token',json.Jwt_Token);
            navigate("/notes");
        }else{ alert("Invalid Credentials")}
    }

    const handleOnChange=(event)=>{
        setFormInfo({...formInfo,[event.target.name]:event.target.value})
    }

  return (
    <motion.div
    initial={{opacity:0}}
    animate={{opacity:1,transition:{duration:"0.2"}}}
    exit={{opacity:0}}
    >

        <Box style={{background:"linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)"}}
        alignItems= 'center' height="100vh" display="flex">
        <Container component="main" maxWidth="xs">
    <motion.div  drag  dragConstraints={{left:40, right: 40, top:20 ,bottom:20 }} >
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding:"20px",
                bgcolor:"white",
                borderRadius:"30px",
                boxShadow:"rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"
                }}
                >
            <Avatar sx={{ m: 1, bgcolor: '#009999' }}>
                <DocumentScannerOutlinedIcon/>
            </Avatar>
            <Typography  variant="h5">
                YourNotes
            </Typography>
            <Typography color="grey" variant='body2' fontSize="13px">Login to your account </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField onChange={handleOnChange}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={formInfo.email}
                autoComplete="email"
                
                />
                <TextField onChange={handleOnChange}
                margin="normal"
                required
                fullWidth
                name="password"
                value={formInfo.password}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                LogIn
                </Button>
                <Grid container>
                <Grid item marginX="20%">
                    <Link  style={{cursor:"pointer" }}  to="/register" variant="body2">
                    Don't have an account? Sign Up
                    </Link>
                    
                </Grid>
                </Grid>
            </Box>
            </Box>
    </motion.div>
        </Container>
        </Box>
    </motion.div>
    
  )
}

export default Login
