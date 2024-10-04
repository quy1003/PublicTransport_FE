import {Button, List, ListItem, ListItemText, Pagination, TableCell, tableCellClasses} from "@mui/material"
import Apis, { endpoints } from "../../config/Apis"
import { useEffect, useState } from "react"
import RoutingStyle from "../../styles/RoutingStyle/RoutingStyle"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RoutingDetailStyle from "../../styles/RoutingStyle/RoutingDetailStyle";
import { styled } from '@mui/material/styles';
import SettingIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import Spinner from "../Mutual/Spinner";

const Station = () => {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: 'rgb(7, 171, 110)',
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: 'theme.palette.action.hover',
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
    const [stations, setStations] = useState(null)
    const [page, setPage] = useState(1);
    
    const loadStations = async (pageNumber) => {
        try{
            let res = await Apis.get(`${endpoints['stations']}?page=${pageNumber}`);
        setStations(res.data);
        }
        catch(ex){
            alert(ex.response.data.message)
        }
        
    }

    useEffect(() => {
        loadStations(page);
    }, [page]);

    const handlePageChange = (event, value) => {
        setPage(value);
        window.history.pushState(null, '', `/stations?page=${value}`);
    };

    if (stations === null) {
        return (
            <Spinner />
        );
  
    }

    return (
        <div style={RoutingStyle.container}>
            <div style={RoutingStyle.pageContainer}>
                <Pagination count={stations.totalPages} page={page} onChange={handlePageChange} variant="outlined" />
            </div>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',float: 'right', paddingRight:'10%', marginBottom: '1rem'  }}>
            <ListItem
          disableGutters
          secondaryAction={
            <IconButton href="/stations/create-station/" aria-label="comment">
              <SettingIcon />
              <ListItemText primary='Thêm trạm' />
            </IconButton>
          }
        >
          
        </ListItem>
        {/*  */}

        {/*  */}
    </List>

            {/* Table */}
            <div style={{margin: '20px 10%'}}>
            <TableContainer component={Paper} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Table sx={{ minWidth: '100%' }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{...RoutingDetailStyle.tableHeading}} align="center">Tên trạm</StyledTableCell>
            <StyledTableCell style={{...RoutingDetailStyle.tableHeading}} align="left">Địa chỉ</StyledTableCell>
            <StyledTableCell style={{...RoutingDetailStyle.tableHeading}} align="center">Xem chi tiết</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stations.stations.map((station) => (
            <StyledTableRow sx={{
                '&:hover': {
                    backgroundColor: 'rgba(0, 128, 128, 0.1)',
                    cursor: 'pointer',
                }
            }} key={station._id}>
              <StyledTableCell style={{paddingLeft:'3%'}}  component="th" scope="row">
                {station.name}
              </StyledTableCell>
              <StyledTableCell align="left">{station.location}</StyledTableCell>
              <StyledTableCell align="center">
              <Button variant="contained" href={`/stations/${station._id}`}>
                Chi tiết
            </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            </div>
        </div>
    )
}

export default Station