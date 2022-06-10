import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'; import ReactDOM from 'react-dom';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import countries from './resources/Countries.json';
//import Table from 'react-bootstrap/Table'
import { DataGrid ,GridToolbar} from '@mui/x-data-grid';
import Menu_top from './menu';

export default function Home() {
    
    const columns = [
        {
          field: 'countryId',
         headerName: 'countryId',
          width: 150
        },
        {
          field: 'countryName',
          headerName: 'countryName',
          width: 175
        },
        {
          field: 'regionId',
          headerName: 'regionId',
          width: 150
        }
     ]
      const rows = countries.Countries
    return (
        <Box sx={{ flexGrow: 1 }}>
           <Menu_top />
            <div className="tabularcomponents-centered">
      <div className="text-alligned">
      <center><h1>Countries Data with grid toolbar</h1></center>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={3}
          rowsPerPageOptions={[2]}
          checkboxSelection
          disableSelectionOnClick
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
    </div>  

        </Box>
    );
}
