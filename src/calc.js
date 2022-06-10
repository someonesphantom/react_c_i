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
export default function Calc() {
    const [numberOne, setNumberOne] = useState();
  const [numberTwo, setNumberTwo] = useState();
  const [operation, setOperation] = useState();
  const [resultValue, setResultValue] = useState("");


  const OnSubmitClick = (e) => {
    let evaluation = "";
    try {
      evaluation = eval(numberOne + operation + numberTwo);
    } catch (error) {
      evaluation = "ERROR";
    }
    setResultValue(evaluation);
  }
    return (
        <Box sx={{ flexGrow: 2 }}>
            <Menu_top />
            <center><h1>Calculator</h1></center>
            <div className="Calc" style={{
                    //display: 'flex',
                    padding: "250px",
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <br></br>
                <div className="textbox" style={{padding:"10px"}}>
                    <TextField fullWidth id="outlined-basic" label="NumberOne" onChange={(e) => { setNumberOne(e.target.value); }} value={numberOne} variant="outlined" />
                </div>
                <div className="textbox" style={{padding:"10px"}}>
                    <TextField fullWidth id="outlined-basic" label="NumberTwo" onChange={(e) => { setNumberTwo(e.target.value); }} value={numberTwo} variant="outlined" />
                </div>
                <div className="dropdown" style={{padding:"10px"}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Operation</InputLabel>
                        <Select labelId="demo-simple-select-label" id="demo-simple-select" onChange={(e) => { setOperation(e.target.value); }} value={operation} label="Operation"  >
                            <MenuItem value={"+"}>ADD</MenuItem>
                            <MenuItem value={"-"}>SUB</MenuItem>
                            <MenuItem value={"*"}>MUL</MenuItem>
                            <MenuItem value={"/"}>DIV</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="button"style={{padding:"10px"}}>
                    <Button variant="contained" disabled={!(operation !== undefined && numberTwo !== undefined && numberOne !== undefined)} onClick={(e) => { OnSubmitClick(e.target.value); }}>Calculate</Button>
                </div>

                <div className="text-alligned " style={{padding:"10px"}}>
                    <h2>
                        {numberOne} {operation} {numberTwo} is {resultValue}
                    </h2>
                </div>


            </div>
        </Box>
    );
}