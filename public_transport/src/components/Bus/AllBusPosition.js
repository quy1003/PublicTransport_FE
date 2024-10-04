import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import io from 'socket.io-client';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Typography,
  Button,
} from '@mui/material';

// Fix for default Leaflet icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const socket = io('http://localhost:5000');

function AllBusPositions() {
  const [busLocations, setBusLocations] = useState([]);
  const [tripDetails, setTripDetails] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [hide, setHide] = useState(false)
  useEffect(() => {
    socket.on('busLocationsUpdate', (locations) => {
      setBusLocations(locations);
    });

    socket.emit('startTripUpdates');
    socket.on('tripDetails', (details) => {
      console.info('Chi tiết chuyến đi:', details);
      setTripDetails(details);
    });

    return () => {
      socket.emit('stopTripUpdates');
      socket.off('busLocationsUpdate');
      socket.off('tripDetails');
    };
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0)
  };

  return (
    <div>
      {hide?<></>:<Paper style={{ padding: '20px' }}>
        {tripDetails.length > 0 ? (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{backgroundColor:'yellow'}}>
                    <TableCell>Xe</TableCell>
                    <TableCell>Tuyến</TableCell>
                    <TableCell>Tài xế</TableCell>
                    <TableCell>Giờ khởi hành</TableCell>
                    <TableCell>Giá</TableCell>
                    <TableCell>Chiều di chuyển</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tripDetails
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((trip, index) => (
                      <TableRow key={index}>
                        <TableCell>{trip.bus?.name}</TableCell>
                        <TableCell>{trip.route?.name}</TableCell>
                        <TableCell>{trip.driver?.name}</TableCell>
                        <TableCell>{new Date(trip.departureTime).toLocaleString()}</TableCell>
                        <TableCell>{trip.price}</TableCell>
                        <TableCell>{trip.isReverse ? 'Chiều về' : 'Chiều đi'}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={tripDetails.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        ) : (
          <Typography variant="h6" style={{ textAlign: 'center', margin: '20px' }}>
            Không có chuyến đi nào hiện tại
          </Typography>
        )}
      </Paper>}  
      <Button style={{float:'right', padding:'10px'}} onClick={()=>setHide(!hide)}>{hide?"Xem thông tin chi tiết":"Ẩn thông tin"}</Button>
      <MapContainer
        center={[10.77335405926088, 106.70638078409701]}
        zoom={13}
        style={{ height: '33rem', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Duyệt qua tất cả vị trí bus để tạo các Marker */}
        {busLocations.map((bus, index) => (
          <Marker key={index} position={[bus.lat, bus.lng]}>
            <Popup>
              <span>{bus.user ? bus.user : 'Unknown User'}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>


    </div>
  );
}

export default AllBusPositions;
