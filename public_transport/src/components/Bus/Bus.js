import RoutingStyle from "../../styles/RoutingStyle/RoutingStyle"
import {Button,IconButton,List,ListItem,ListItemText,Pagination } from "@mui/material"
import { authApi, endpoints } from "../../config/Apis"
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
import Spinner from "../Mutual/Spinner";
import SettingIcon from '@mui/icons-material/Settings';
import { UserContext } from "../../App";



  import { Modal, TextField, Box } from "@mui/material";
  import { useForm } from "react-hook-form"; // Sử dụng react-hook-form để quản lý form
  import CloseIcon from "@mui/icons-material/Close";
import staticStyles from "../../styles/HomeStyle/Static";
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
  const Bus = () => {
      const [page, setPage] = useState(1);
      const [user] = React.useContext(UserContext);
      const [buses, setBuses] = useState(null);
      const [open, setOpen] = useState(false);
      const [selectedBus, setSelectedBus] = useState(null); 
      const { register, handleSubmit, reset } = useForm();
      const handleOpenModal = (busId) => {
          setSelectedBus(busId);
          setOpen(true);
      };
  
      const handleCloseModal = () => {
          setOpen(false);
          setSelectedBus(null);
          reset();
      };
  
      const handlePageChange = (event, value) => {
          setPage(value);
          window.history.pushState(null, '', `/buses?page=${value}`);
      };
  
      const loadBuses = async (pageNumber) => {
          try {
              let res = await authApi().get(`${endpoints['buses']}?page=${pageNumber}`);
              setBuses(res.data);
          } catch (ex) {
              alert(ex.response.data.message);
          }
      };
  
      const onSubmitReport = async (data) => {
          try {
              if(selectedBus){
                await authApi().post(endpoints['create-report'], {
                  busId: selectedBus,
                  note: data.note,
              });
              alert("Tạo báo cáo thành công!");
              handleCloseModal()
              }
          } catch (ex) {
              alert(ex.response.data.message || "Có lỗi xảy ra");
          }
      };
  
      useEffect(() => {
          loadBuses(page);
      }, [page]);
  
      if (buses === null) {
          return <Spinner />;
      }
  
      return (
          <>
              {user ? (
                  <>
                      <div style={RoutingStyle.container}>
                          <div style={RoutingStyle.pageContainer}>
                              <Pagination count={buses.totalPages} page={page} onChange={handlePageChange} variant="outlined" />
                          </div>
  
                          {/* Table */}
                          <div style={{ margin: '20px 10%' }}>
                              <TableContainer component={Paper} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                  <Table sx={{ minWidth: '100%' }} aria-label="customized table">
                                      <TableHead>
                                          <TableRow>
                                              <StyledTableCell align="center">Xe buýt</StyledTableCell>
                                              <StyledTableCell align="center">Tuyến xe</StyledTableCell>
                                              <StyledTableCell align="center">Sức chứa</StyledTableCell>
                                              <StyledTableCell align="center">Trạng thái</StyledTableCell>
                                              <StyledTableCell align="center">Báo lỗi</StyledTableCell>
                                          </TableRow>
                                      </TableHead>
                                      <TableBody>
                                          {buses.buses.map((bus) => (
                                              <StyledTableRow key={bus._id} sx={{ '&:hover': { backgroundColor: 'rgba(0, 128, 128, 0.1)', cursor: 'pointer' } }}>
                                                  <StyledTableCell style={{ paddingLeft: '3%' }} component="th" scope="row">
                                                      {bus.name}
                                                  </StyledTableCell>
                                                  <StyledTableCell align="center">{bus.route.name}</StyledTableCell>
                                                  <StyledTableCell align="center">{bus.capacity}</StyledTableCell>
                                                  <StyledTableCell align="center">{bus.status ? 'Hoạt động' : 'Nghỉ ngơi'}</StyledTableCell>
                                                  <StyledTableCell align="center">
                                                      <Button color="error" variant="contained" onClick={() => handleOpenModal(bus._id)}>
                                                          Báo lỗi
                                                      </Button>
                                                  </StyledTableCell>
                                              </StyledTableRow>
                                          ))}
                                      </TableBody>
                                  </Table>
                              </TableContainer>
                          </div>
  
                          <Modal open={open} onClose={handleCloseModal}>
                              <Box
                                  sx={staticStyles.modalBox}
                              >
                                  <IconButton onClick={handleCloseModal} sx={{ alignSelf: 'flex-end' }}>
                                      <CloseIcon />
                                  </IconButton>
                                  <h3 style={{marginTop:'-30px'}}>Báo lỗi xe buýt</h3>
                                  <form onSubmit={handleSubmit(onSubmitReport)}>
                                      <TextField
                                          label="Ghi chú"
                                          multiline
                                          rows={4}
                                          fullWidth
                                          variant="outlined"
                                          {...register("note")}
                                      />
                                      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} style={{float:'right'}}>
                                          Gửi báo cáo
                                      </Button>
                                  </form>
                              </Box>
                          </Modal>
  
                          {user && user.type === 'ADMIN' && (
                              <div style={RoutingStyle.divListRouting2}>
                                  <List style={{ paddingTop: '0' }} sx={RoutingStyle.listRouting}>
                                      <ListItem disableGutters>
                                          <IconButton href="/buses/create-bus" aria-label="toggle-input">
                                              <SettingIcon />
                                              <ListItemText primary="Thêm xe buýt" />
                                          </IconButton>
                                      </ListItem>
                                  </List>
                              </div>
                          )}
                      </div>
                  </>
              ) : (
                  <h1>Unauthorized</h1>
              )}
          </>
      );
  };
  
  export default Bus;