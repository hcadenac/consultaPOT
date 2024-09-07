import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ForestIcon from '@mui/icons-material/Forest';
import HomeIcon from '@mui/icons-material/Home';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import {
    AppBar,
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem, ListItemButton,
    ListItemIcon,
    ListItemText,
    styled,
    Toolbar,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/logosgi_verde.png';




//const drawerWidth = 240;
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

export default function SideBar() {
    const [open, setOpen] = useState(false)

    const drawerOpen =()=>{
        setOpen(true);
    };
    const drawerClose =()=>{
        setOpen(false);
    };


    return (
        <Box>
            <Box sx={{ flexGrow: 1, height: '40px', display: 'flex', alignItems: 'center' }}>
            <AppBar>
                <Toolbar>
                    <IconButton size = 'large' edge='start' color='inherit' aria-label='Menu' sx={{mr:2}}
                    onClick={drawerOpen}>
                        < TravelExploreOutlinedIcon sx={{ fontSize: '40px', color: '#FF9800'}} />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Menu
                    </Typography>
                </Toolbar>
            </AppBar>
            </Box>
            <Drawer anchor ='left' open={open} onClose={drawerClose} >
            <DrawerHeader>
                <Box 
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '8px'
                    }}
                >
                    <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
                        <img src={logo} alt="Logo" style={{ height: '40px' }} />
                    </Box>
                    <IconButton onClick={drawerClose}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </Box>
            </DrawerHeader>
            <Divider />
                <List onClick={drawerClose}>
                    <ListItem disablePadding >
                        <ListItemButton
                            component={Link}
                            to={"/Inicio"}
                            sx={{
                                borderRadius: "12px",
                                "&:hover": {
                                    backgroundColor: "PowderBlue",
                                },
                            }}
                        >
                        <ListItemIcon>
                            <HomeIcon /> 
                        </ListItemIcon>
                            <ListItemText primary={'Home'} />
                        </ListItemButton>
                    </ListItem >
                    <ListItem disablePadding >
                    <ListItemButton
                        component={Link}
                        to={"/MapaUrbano"}
                        sx={{
                        borderRadius: "12px",
                        "&:hover": {
                            backgroundColor: "PowderBlue", // Cambia esto al color que desees
                        },
                        }}
                    >
                        <ListItemIcon>
                            <MapsHomeWorkIcon /> 
                        </ListItemIcon>
                            <ListItemText primary={'Mapa Urbano'} />
                        </ListItemButton>
                    </ListItem >
                    <ListItem disablePadding>
                    <ListItemButton
                        component={Link}
                        to={"/MapaRural"}
                        sx={{
                        borderRadius: "12px",
                        "&:hover": {
                            backgroundColor: "PowderBlue", // Cambia esto al color que desees
                        },
                        }}
                    >
                            <ListItemIcon>
                            <ForestIcon /> 
                        </ListItemIcon>
                            <ListItemText primary={'Mapa Rural'} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
            </Drawer>
           
        </Box>
    );
};