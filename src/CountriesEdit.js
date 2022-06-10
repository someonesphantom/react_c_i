import * as React from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import apiUrlMapping from '../src/resources/apiM.json';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Dialog, DialogContent, DialogActions, DialogTitle } from '@mui/material';
import countries from './resources/Countries.json';
//import Table from 'react-bootstrap/Table'
import { DataGrid, GridToolbar,GridActionsCellItem } from '@mui/x-data-grid';
import Menu_top from './menu';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const geRowsWithId = (rows) => {
    let id = 0
    let completeRowListArray = []
    for (let row of rows) {
        const rowsWithId = {
            id: id,
            ...row
        }
        id++
        completeRowListArray.push(rowsWithId)
    }
    return completeRowListArray
}

export default function Countriesedit() {

    const CountriesTable = [
        {
            field:'actions',
            type:'actions',
            headerName:'Actions',
            width:100,
            getActions:(event)=>[
              <GridActionsCellItem onClick={(e)=>onClickOfEditButton(event)}icon={<EditIcon/>}label="Edit"/>,
              <GridActionsCellItem onClick={(e)=>deleteRecord(event.id)}icon={<DeleteIcon/>}label="Delete"/>,
              <GridActionsCellItem onClick={(e)=>onClickOfViewButton(event)}icon={<VisibilityOutlinedIcon/>}label="View"/>
            ],
          },
        {
            field: 'countryID',
            headerName: 'COUNTRY_ID',
            width: 150
        },
        {
            field: 'countryName',
            headerName: 'COUNTRY_NAME',
            width: 175
        },
        {
            field: 'regionID',
            headerName: 'REGION_ID',
            width: 150
        },
        
    ]
    //const rows = countries.Countries
    const [rows, setRows] = React.useState([]);
    const [addOrEdit, setAddOrEdit] = React.useState("");
    const handleClickOpen = () => { setOpen(true); };
    const [open, setOpen] = React.useState(false);
    const [CountryId, setcountryId] = React.useState("");
    const [CountryName, setcountryName] = React.useState("");
    const [RegionId, setregionId] = React.useState("");
    const handleClose = () => { setOpen(false); };
    const [editId,setEditId]=React.useState("");
    const [viewId, setViewId] = React.useState("")

    const getAllRecords = () => {
        axios.get(apiUrlMapping.countriesData.getAll).then(response => {
            setRows(geRowsWithId(response.data))
        });
    }

    const onClickofSaveRecord = () => {
        setAddOrEdit("Save")
        handleClickOpen()
    }

    useEffect(() => { getAllRecords() }, []);

    const addOrEditRecordAndClose = (type) => {
        if (type === "Edit") {editRecordAndClose()}
        if (type === "Save") { addRecordAndClose() }
         if (type === "View") {handleClose()
               setcountryId("")
                setcountryName("")
                setregionId("")
        }
    }

    const addRecordAndClose = () => {
        if (CountryId !== undefined && CountryName !== undefined && RegionId !== undefined) {
            let payload =
            {
                "countryID": CountryId,
                "countryName": CountryName,
                "regionID": RegionId

            }
            console.log("The Data to DB is " + payload)
            axios.post(apiUrlMapping.countriesData.post, payload).then(response => {
                getAllRecords()
                handleClose()
                setcountryId("")
                setcountryName("")
                setregionId("")

            })
        }
    }
    const deleteRecord=(index)=>{
        let dataId=rows[index]._id;
        axios.delete(apiUrlMapping.countriesData.delete + "/" + dataId).then(()=>{getAllRecords();});
    }
    const onClickOfViewButton = (e) =>
    {
        setAddOrEdit("View")
        viewRecordAndClose(e)  
      let viewRecord = rows[e.id]
        setcountryId(viewRecord.countryID)
        //console.log(editRecord.regionID)
        setcountryName(viewRecord.countryName)
        setregionId(viewRecord.regionID)
      setViewId(viewRecord._id)
      handleClickOpen()
      
    }
    const viewRecordAndClose=()=>{
        axios.get(apiUrlMapping.countriesData.getById + "/" + viewId).then(response => 
            {
              getAllRecords()
              //handleClose()
            //   setcountryId("")
            //     setcountryName("")
            //     setregionId("")
            })
    }
    const onClickOfEditButton=(e)=>{
        setAddOrEdit("Edit")
        let editRecord=rows[e.id]
        setcountryId(editRecord.countryID)
        //console.log(editRecord.regionID)
        setcountryName(editRecord.countryName)
        setregionId(editRecord.regionID)
        setEditId(editRecord._id)
        handleClickOpen()
      }
    
      const editRecordAndClose=()=>{
        if(CountryId !== undefined && CountryName !== undefined && RegionId !== undefined){
          let payload={
            "countryID": CountryId,
            "countryName": CountryName,
            "regionID": RegionId
          }
          axios.put(apiUrlMapping.countriesData.put + "/"+editId,payload).then(response=>
            {
              getAllRecords()
              handleClose()
              setcountryId("")
                setcountryName("")
                setregionId("")
            })
        }
      }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Menu_top />
            <div className="tabularcomponents-centered">
                <div className="text-alligned">
                <center> <h1>Countries Data with database</h1></center>
                </div>
                <div style={{ height: 400, width: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={CountriesTable}
                        components={{ Toolbar: GridToolbar, }}
                        componentsProps={{ toolbar: { showQuickFilter: true } }}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                        sx={{
                            boxShadow: 2,
                            border: 2,
                            borderColor: 'primary.light',
                            '& .MuiDataGrid-cell:hover': {
                              color: 'primary.main',
                            },
                          }}
                          getRowClassName={(params) => `super-app-theme--${params.row.status}`}
                    />
                </div>
               <center> <div className="center" >
                    <Button variant="contained" onClick={onClickofSaveRecord} >Add Record</Button>
                </div></center>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Countries Data</DialogTitle>
                    <DialogContent>
                        <TextField autoFocus margin="dense" id="countryID" onChange={(e) => { setcountryId(e.target.value) }} value={CountryId} label="countryID" type="text" disabled={addOrEdit==="View"}fullWidth />
                        <TextField autoFocus margin="dense" id="countryName" onChange={(e) => { setcountryName(e.target.value) }} value={CountryName} label="countryName" type="text" disabled={addOrEdit==="View"} fullWidth />
                        <TextField autoFocus margin="dense" id="regionID" onChange={(e) => { setregionId(e.target.value) }} value={RegionId} label="regionID" type="text" disabled={addOrEdit==="View"}fullWidth />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={() => { addOrEditRecordAndClose(addOrEdit) }}>Save</Button>
                    </DialogActions>
                </Dialog>
            </div>

        </Box>
    );
}
