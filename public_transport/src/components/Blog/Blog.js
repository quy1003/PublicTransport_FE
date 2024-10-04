import RoutingStyle from "../../styles/RoutingStyle/RoutingStyle"
import { Button,IconButton,List,ListItem,ListItemText,Pagination } from "@mui/material"
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

const Blog = () => {
    const [page, setPage] = useState(1);
    const handlePageChange = (event, value) => {
        setPage(value);
        window.history.pushState(null, '', `/blogs?page=${value}`);
    };
    const [user] = React.useContext(UserContext);
    const [blogs, setBlogs] = useState(null)
    const loadBlogs = async (pageNumber) => {
        try{let res = await Apis.get(`${endpoints['blogs']}?page=${pageNumber}`);
        setBlogs(res.data);
        console.info(res.data)}
        catch(ex){
          alert(ex.response.data.message)
        }
    }
    useEffect(() => {
        loadBlogs(page);
    }, [page]);

    if (blogs === null) {
    return (
      <Spinner />
      );
    }
    return (
        <>
        <>
            <div style={RoutingStyle.container2}>
            <div style={RoutingStyle.pageContainer}>
                <Pagination count={blogs.totalPages} page={page} onChange={handlePageChange} variant="outlined" />
            </div>
            <div style={{margin: '20px 20%'}}>
            <TableContainer component={Paper} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Table sx={{ minWidth: '100%' }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{...RoutingDetailStyle.tableHeading}} align="center">Tiêu đề</StyledTableCell>
            <StyledTableCell style={{...RoutingDetailStyle.tableHeading}} align="center">Ngày đăng</StyledTableCell>
            <StyledTableCell style={{...RoutingDetailStyle.tableHeading}} align="center">Xem chi tiết</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {!blogs  ? <></> : blogs.blogs.map((blog) => (
            <StyledTableRow sx={{
                '&:hover': {
                    backgroundColor: 'rgba(0, 128, 128, 0.1)',
                    cursor: 'pointer',
                }
            }} key={blog._id}>
              <StyledTableCell style={{paddingLeft:'3%'}}  component="th" scope="row">
              {blog.title}
              </StyledTableCell>
              <StyledTableCell align="center">{convertDateTime(blog.createdAt)}</StyledTableCell>
              <StyledTableCell align="center">
              <Button color="primary" variant="contained" href={`/blogs/${blog._id}`}>
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
                            <IconButton href="/blogs/create-blog/" aria-label="toggle-input">
                                <SettingIcon />
                                <ListItemText primary="Thêm blog"/>
                            </IconButton>
                        </ListItem>
                    </List>
                </div>
            ) : null}
        </div>
        </>:<></>
        </>
    )
}

export default Blog

