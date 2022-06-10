import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import TextField from "@mui/material/TextField";
import { InputLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import { Select } from "@mui/material";
import { useState } from "react";
import Menu_top from './menu';
export default function Interest() {
    const [principle, setprinciple] = useState();
  const [rate, setrate] = useState();
  const [time,settime] = useState();
  const [operation, setOperation] = useState();
  const [resultValue, setResultValue] = useState("");


  const OnSubmitClick = (e) => {
    let evaluation = "";
    try {
        if (operation == "Simple Interest"){
            evaluation = eval(principle  *time * rate);
        }
        else {
            evaluation = eval((principle*Math.pow((1+rate),time))-principle);
        }
    } catch (error) {
      evaluation = "ERROR";
    }
    setResultValue(evaluation);
  }
    return (
        <Box sx={{ flexGrow: 2 }}>
           <Menu_top />
           <center><h1>Interest rate calculator</h1></center>
            <div className="Calc" style={{
                    //display: 'flex',
                    paddingRight: "250px",
                    paddingLeft: "250px",
                    paddingTop:"100px",
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <br></br>
                <div className="textbox" style={{padding:"10px"}}>
                    <TextField fullWidth id="outlined-basic" label="principle" onChange={(e) => { setprinciple(e.target.value); }} value={principle} variant="outlined" />
                </div>
                <div className="textbox" style={{padding:"10px"}}>
                    <TextField fullWidth id="outlined-basic" label="interest rate" onChange={(e) => { setrate(e.target.value); }} value={rate} variant="outlined" />
                </div>
                <div className="textbox" style={{padding:"10px"}}>
                    <TextField fullWidth id="outlined-basic" label="time" onChange={(e) => { settime(e.target.value); }} value={time} variant="outlined" />
                </div>
                <div className="dropdown" style={{padding:"10px"}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Operation</InputLabel>
                        <Select labelId="demo-simple-select-label" id="demo-simple-select" onChange={(e) => { setOperation(e.target.value); }} value={operation} label="Operation"  >
                            <MenuItem value={"Simple Interest"}>Simple Interest Rate</MenuItem>
                            <MenuItem value={"Compound Interest"}>Compound Interest Rate</MenuItem>
                            
                        </Select>
                    </FormControl>
                </div>
                <div className="button"style={{padding:"10px"}}>
                    <Button variant="contained" disabled={!(operation !== undefined && rate !== undefined && principle !== undefined)} onClick={(e) => { OnSubmitClick(e.target.value); }}>Calculate</Button>
                </div>

                <div className="text-alligned " style={{padding:"10px"}}>
                    <h2>
                        {operation} is {resultValue}
                    </h2>
                </div>


            </div>
        </Box>
    );
}