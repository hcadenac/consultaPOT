import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoMulti1 from '../Assets/logosgi_verde.png';


const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#073a1d',
      },
    },
  });

export const NavBar =()=> {
  
  return (
    <>
    <Box sx={{ flexGrow: 1, height: '40px', display: 'flex', alignItems: 'center' }}>
        <ThemeProvider theme={darkTheme}>
            <AppBar position="static" color="primary" enableColorOnDark>
                <Toolbar sx={{ minHeight: '36px' }}>
                <img
                    src={logoMulti1}
                    alt="Logo de la empresa"
                    style={{ width: "50px", height: "auto", marginRight: "10px" }}
                />
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Consulta
                    </Typography>
                    <Button as={Link} to={"/MapaRural"} color="inherit">Rural</Button>                    
                    <Button as={Link} to={"/MapaUrbano"} color="inherit">Urbano</Button>
                </Toolbar>
            </AppBar>
        </ThemeProvider> 
    </Box>
   
    </>
  );
}
