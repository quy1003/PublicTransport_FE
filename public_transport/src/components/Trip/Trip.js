import RoutingStyle from "../../styles/RoutingStyle/RoutingStyle"
import {Button,IconButton,List,ListItem,ListItemText,Pagination } from "@mui/material"
import Apis, { endpoints } from "../../config/Apis"
import { useEffect, useState } from "react"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RoutingDetailStyle from "../../styles/RoutingStyle/RoutingDetailStyle";
import Spinner from "../Mutual/Spinner";
import SettingIcon from '@mui/icons-material/Settings';
import { UserContext } from "../../App";

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
  
  function convertDateTime(isoString) {
    const date = new Date(isoString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}


const Trip = () => {
    const [page, setPage] = useState(1);
    const handlePageChange = (event, value) => {
        setPage(value);
        window.history.pushState(null, '', `/trips?page=${value}`);
    };
    const [user] = React.useContext(UserContext);
    const [trips, setTrips] = useState(null)
    const loadTrips = async (pageNumber) => {
        try{let res = await Apis.get(`${endpoints['trips']}?page=${pageNumber}`);
        setTrips(res.data);
        console.info(res.data)}
        catch(ex){
          alert(ex.response.data.message)
        }
    }
    useEffect(() => {
        loadTrips(page);
    }, [page]);

    if (trips === null) {
    return (
      <Spinner />
      );
    }
    return (
        <div style={RoutingStyle.container}>
            <div style={RoutingStyle.pageContainer}>
                <Pagination count={trips.totalPages} page={page} onChange={handlePageChange} variant="outlined" />
            </div>
            {/* Table */}
            <div style={{margin: '20px 10%'}}>
            <TableContainer component={Paper} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Table sx={{ minWidth: '100%' }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{...RoutingDetailStyle.tableHeading}} align="center">Tuyến xe</StyledTableCell>
            <StyledTableCell style={{...RoutingDetailStyle.tableHeading}} align="center">Xe buýt</StyledTableCell>
            <StyledTableCell style={{...RoutingDetailStyle.tableHeading}} align="center">Giờ khởi hành</StyledTableCell>
            <StyledTableCell style={{...RoutingDetailStyle.tableHeading}} align="center">Lượt</StyledTableCell>
            <StyledTableCell style={{...RoutingDetailStyle.tableHeading}} align="center">Giá</StyledTableCell>
            <StyledTableCell style={{...RoutingDetailStyle.tableHeading}} align="center">Chi tiết</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {!trips  ? <></> : trips.trips.map((trip) => (
            <StyledTableRow sx={{
                '&:hover': {
                    backgroundColor: 'rgba(0, 128, 128, 0.1)',
                    cursor: 'pointer',
                }
            }} key={trip._id}>
              <StyledTableCell style={{paddingLeft:'3%'}}  component="th" scope="row">
                {trip.route.name}
              </StyledTableCell>
              <StyledTableCell align="center">{trip.bus.name}</StyledTableCell>
              <StyledTableCell align="center">{convertDateTime(trip.departureTime)}</StyledTableCell>
              <StyledTableCell align="center">{trip.isReverse ? 'Lượt về' : 'Lượt đi'}</StyledTableCell>
              <StyledTableCell align="center">{trip.price}</StyledTableCell>
              <StyledTableCell align="center">
              <Button variant="contained" href={`/trips/${trip._id}`}>
                Chi tiết
            </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            </div>

        {user && user.type === 'ADMIN' ? (
                <div style={RoutingStyle.divListRouting2}>
                    <List  style={{paddingTop: '0'}} sx={RoutingStyle.listRouting}>
                        <ListItem disableGutters>
                            <IconButton href="/trips/create-trip" aria-label="toggle-input">
                                <SettingIcon />
                                <ListItemText primary="Thêm chuyến xe"/>
                            </IconButton>
                        </ListItem>
                    </List>
                </div>
            ) : null}
    
        </div>
    )
}

export default Trip

