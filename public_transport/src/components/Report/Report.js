import React, { useEffect, useState } from "react";
import { Container, Typography, List, ListItem, ListItemText, Pagination, CircularProgress, Button } from "@mui/material";
import { authApi, endpoints } from "../../config/Apis";
import DetailTripStyle from "../../styles/TripStyle/DetailTripStyle";

const ReportsComponent = () => {
    const [reports, setReports] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false)
    const fetchReports = async (page = 1) => {
        setLoading(true); 
        try {
            const response = await authApi().get(`${endpoints['reports']}?page=${page}`)
            const data = response.data;
            setReports(data.reports);
            setTotalPages(data.totalPages);
            setCurrentPage(data.currentPage); 
        } catch (error) {
            console.error("Error fetching reports:", error);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchReports();
    }, [isSubmit]);

    const handlePageChange = (event, value) => {
        fetchReports(value);
    };
    const updateReport = async (id) => {
        try{
            await authApi().patch(endpoints['update-report'](id))
            alert('Cập nhật thành công')
            setIsSubmit(!isSubmit)
        }
        catch(ex){
            alert(ex.data.response.message)
        }
    }
    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Danh sách báo cáo
            </Typography>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                sx={{ marginTop: 2 }}
            />
            {loading ? (
                <CircularProgress />
            ) : (
                <List>
                    {reports.length === 0 ? (
                        <Typography>No reports found</Typography>
                    ) : (
                        reports.map((report) => (
                            <ListItem key={report._id}>
                                <ListItemText
                                    primary={`${report.bus.name} - ${report.note}`}
                                    secondary={`Status: ${report.status ? "Đã sửa" : "Chưa sửa"} - Ghi nhận lúc: ${new Date(report.createdAt).toLocaleString()}`}
                                />

                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={DetailTripStyle.bookButton3}
                                    onClick={()=>updateReport(report._id)}
                                    disabled={report.status === true}
                                >
                                    Báo xong
                                </Button>
                            </ListItem>
                        ))
                    )}
                </List>
            )}

            
        </Container>
    );
};

export default ReportsComponent;
