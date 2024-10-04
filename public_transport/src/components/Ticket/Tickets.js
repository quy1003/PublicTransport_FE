import RoutingStyle from "../../styles/RoutingStyle/RoutingStyle"
import {Pagination } from "@mui/material"
import  { authApi, endpoints } from "../../config/Apis"
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
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  


const Tickets = () => {
    const [page, setPage] = useState(1);
    const handlePageChange = (event, value) => {
        setPage(value);
        window.history.pushState(null, '', `/tickets?page=${value}`);
    };
    const [user] = React.useContext(UserContext);
    const [trips, setTrips] = useState(null)
    const loadTrips = async (pageNumber) => {
        try{let res = await authApi().get(`${endpoints['tickets']}?page=${pageNumber}`);
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
    if(!user){
      return <h1>Unauthentication</h1>
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
            <StyledTableCell style={{...RoutingDetailStyle.tableHeading}} align="center">Người dùng</StyledTableCell>
            <StyledTableCell style={{...RoutingDetailStyle.tableHeading}} align="center">Tuyến xe</StyledTableCell>
            <StyledTableCell style={{...RoutingDetailStyle.tableHeading}} align="center">Xe buýt</StyledTableCell>
            <StyledTableCell style={{...RoutingDetailStyle.tableHeading}} align="center">Ghế</StyledTableCell>
            <StyledTableCell style={{...RoutingDetailStyle.tableHeading}} align="center">Lượt</StyledTableCell>
            <StyledTableCell style={{...RoutingDetailStyle.tableHeading}} align="center">Giờ khởi hành</StyledTableCell>
            <StyledTableCell style={{...RoutingDetailStyle.tableHeading}} align="center">Thời gian giao dịch</StyledTableCell>
            <StyledTableCell style={{...RoutingDetailStyle.tableHeading}} align="center">Giá</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {!trips  ? <></> : trips.tickets.map((trip) => (
            <StyledTableRow sx={{
                '&:hover': {
                    backgroundColor: 'rgba(0, 128, 128, 0.1)',
                    cursor: 'pointer',
                }
            }} key={trip._id}>
              <StyledTableCell style={{paddingLeft:'3%'}}  component="th" scope="row">
                {trip.user}
              </StyledTableCell>
              <StyledTableCell align="center">{trip.route}</StyledTableCell>
              <StyledTableCell align="center">{trip.bus}</StyledTableCell>
              <StyledTableCell align="center">{trip.seat}</StyledTableCell>
              <StyledTableCell align="center">{trip.isReverse ? 'Lượt về' : 'Lượt đi'}</StyledTableCell>
              <StyledTableCell align="center">{trip.departureTime}</StyledTableCell>
              <StyledTableCell align="center">{trip.purchaseDay}</StyledTableCell>
              <StyledTableCell align="center">{trip.price}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            </div>

    
        </div>
    )
}

export default Tickets

