import { useState, React, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DocumentScannerOutlinedIcon from "@mui/icons-material/DocumentScannerOutlined";
import noteContext from "../Context/Notes/noteContext";

function NavBar() {
  const navigate = useNavigate();
  const context = useContext(noteContext)
  const{switchNoteModal}=context;

  const pages = ["Notes", "About","DataGrid"];
  const settings = ["Profile", "Logout"];

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = async (event) => {

    if(event=="Logout"){
        localStorage.removeItem('JWT-token')
        navigate("/")
    }
    setAnchorElUser(null);
    
   
  };

  

  const handleClickChange=()=>{
    switchNoteModal();
    navigate('/addnote')
  }

  return (
    <AppBar
      position="static"
      sx={{ background: "linear-gradient(0.25turn, #3f87a6, #f69d3c)"}}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            color="inherit"
            disableRipple={true}
            onClick={() => {
              navigate("/notes");
            }}
          >
            <DocumentScannerOutlinedIcon
              sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 3,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              YourNotes
            </Typography>
          </IconButton>

          <Box
            sx={{
              flexGrow: 1,
              marginX: "auto",
              display: { xs: "flex", md: "flex" },
              justifyContent:"center"
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                value={page}
                onClick={() => navigate(`/${page}`)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box  display="flex" >
            <Button  onClick={handleClickChange}
                sx={{ color: "white", marginX:"10px" }}
                width="20%"
                startIcon={<AddCircleOutlineOutlinedIcon />}
            >
                Add Note
            </Button>
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="" />
                </IconButton>
                </Tooltip>
                <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                >
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={()=>handleCloseUserMenu(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
