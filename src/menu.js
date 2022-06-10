import * as React from 'react';
import AppBar from '@mui/material/AppBar';
//import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'; import ReactDOM from 'react-dom';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';


export default function Menu_top() {
    return (
        
            <AppBar position="static">
                <Toolbar>

                    <PopupState variant="popover" popupId="demo-popup-menu">
                        {(popupState) => (
                            <React.Fragment>
                                <Button variant="contained" {...bindTrigger(popupState)}>
                                    <IconButton
                                        size="large"
                                        edge="start"
                                        color="inherit"
                                        aria-label="menu"
                                        sx={{ mr: 2 }}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                </Button>
                                <Menu {...bindMenu(popupState)}>
                                    <MenuItem onClick={(e) => {
                                            e.preventDefault();
                                            window.location.href = '/home';
                                        }}>Countries Data with grid toolbar</MenuItem>
                                    <MenuItem onClick={(e) => {
                                            e.preventDefault();
                                            window.location.href = '/countries';
                                        }}>Countries Data with edit toolbar</MenuItem>
                                    <MenuItem onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = '/calc';
                                    }}>Calculator</MenuItem>

                                    <MenuItem onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = '/interest';
                                    }}>Interest Rate Calculator</MenuItem>
                                    <MenuItem onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = '/cEdit';
                                    }}>Countries Data with database</MenuItem>
                                </Menu>
                            </React.Fragment>
                        )}
                    </PopupState>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    </Typography>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> V
                    <PopupState variant="popover" popupId="demo-popup-menu">
                        {(popupState) => (
                            <React.Fragment>
                                <Button variant="contained" {...bindTrigger(popupState)}>
                                </Button>
                                <Menu {...bindMenu(popupState)}>
                                    
                                    <MenuItem onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = '/';
                                    }}>Logout</MenuItem>
                                </Menu>
                            </React.Fragment>
                        )}
                    </PopupState>
                    </Avatar>
                </Toolbar>
            </AppBar>
          
    );
}