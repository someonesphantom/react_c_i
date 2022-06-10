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
import { GridRowModes,DataGrid, GridToolbar, GridToolbarContainer,GridActionsCellItem} from '@mui/x-data-grid';
import Menu_top from './menu';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import CancelIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import SaveIcon from '@mui/icons-material/Save';


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

  
   

export default function Countries() {
    //const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState({});
  
    const handleRowEditStart = (params, event) => {
      event.defaultMuiPrevented = true;
    };
  
    const handleRowEditStop = (params, event) => {
      event.defaultMuiPrevented = true;
    };
  
    const handleEditClick = (id) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };
  
    const handleSaveClick = (id) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };
  
    const handleDeleteClick = (id) => () => {
      setRows(rows.filter((row) => row.id !== id));
    };
  
    const handleCancelClick = (id) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
        
      });
  
      const editedRow = rows.find((row) => row.id === id);
      if (editedRow.isNew) {
        setRows(rows.filter((row) => row.id !== id));
      }
    };
  
    const processRowUpdate = (newRow) => {
      const updatedRow = { ...newRow, isNew: false };
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      return updatedRow;
    };
    const CountriesTable = [
        {
            field: 'countryID',
            headerName: 'COUNTRY_ID',
            width: 150,
            editable: true,
        },
        {
            field: 'countryName',
            headerName: 'COUNTRY_NAME',
            width: 175,
            editable: true,
        },
        {
            field: 'regionID',
            headerName: 'REGION_ID',
            width: 150,
            editable: true,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
              const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
      
              if (isInEditMode) {
                return [
                  <GridActionsCellItem
                    icon={<SaveIcon />}
                    label="Save"
                    onClick={handleSaveClick(id)}
                    color="primary"
                  />,
                  <GridActionsCellItem
                    icon={<CancelIcon />}
                    label="Cancel"
                    className="textPrimary"
                    onClick={handleCancelClick(id)}
                    color="inherit"
                  />,
                ];
              }
      
              return [
                <GridActionsCellItem
                  icon={<EditIcon />}
                  label="Edit"
                  className="textPrimary"
                  onClick={handleEditClick(id)}
                  color="inherit"
                />,
                <GridActionsCellItem
                  icon={<DeleteIcon />}
                  label="Delete"
                  onClick={handleDeleteClick(id)}
                  color="inherit"
                />,
              ];
            },
          },
    ]
    //const rows = countries.Countries
    const [rows, setRows] = React.useState([])
    const [addOrEdit, setAddOrEdit] = React.useState("")
    const handleClickOpen = () => { setOpen(true); };
    const [open, setOpen] = React.useState(false);
    const [CountryId, setcountryId] = React.useState("");
    const [CountryName, setcountryName] = React.useState("");
    const [RegionId, setregionId] = React.useState("");

    const handleClose = () => { setOpen(false); };

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
        // if (type === "Edit") {editRecordAndClose()}
        if (type === "Save") { addRecordAndClose() }
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
                        editMode="row"
                        rowModesModel={rowModesModel}
                        onRowEditStart={handleRowEditStart}
                        onRowEditStop={handleRowEditStop}
                        processRowUpdate={processRowUpdate}
                        components={{
                            Toolbar:GridToolbar, }}
                        componentsProps={{ toolbar: { showQuickFilter: true },
                                        toolbar: { setRows, setRowModesModel },
                                        }}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                    />
                </div>
               <center> <div className="center" >
                    <Button variant="contained" startIcon={<AddIcon />} onClick={onClickofSaveRecord} >Add Record</Button>
                </div></center>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Save Data</DialogTitle>
                    <DialogContent>
                        <TextField autoFocus margin="dense" id="countryID" onChange={(e) => { setcountryId(e.target.value) }} value={CountryId} label="Country Id" type="text" fullWidth />
                        <TextField autoFocus margin="dense" id="countryName" onChange={(e) => { setcountryName(e.target.value) }} value={CountryName} label="Country Name" type="text" fullWidth />
                        <TextField autoFocus margin="dense" id="regionID" onChange={(e) => { setregionId(e.target.value) }} value={RegionId} label="region Id" type="text" fullWidth />
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
