import * as React from 'react';
import { Link, useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
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
                        News
                    </Typography>
                    <Button as={Link} to={"/Inicio"} color="inherit">Rural</Button>
                    <Button as={Link} to={"/MapView"} color="inherit">Urbano</Button>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    </Box>
  );
}
