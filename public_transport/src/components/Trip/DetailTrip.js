import React, { useState, useEffect, useContext } from 'react';
import { Grid, Button, Container, Box} from '@mui/material';
import Apis, { authApi, endpoints } from '../../config/Apis';
import { useParams } from 'react-router-dom';
import HeadingContent from '../Mutual/HeadingContent';
import { ListGroup } from 'react-bootstrap';
import RoutingDetailStyle from '../../styles/RoutingStyle/RoutingDetailStyle';
import DetailTripStyle from '../../styles/TripStyle/DetailTripStyle';
import Spinner from '../Mutual/Spinner';
import DialogBox from '../Mutual/DialogBox'; // Import DialogBox
import { UserContext } from "../../App";
const DetailTrip = () => {
  const [seats, setSeats] = useState([]);
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); // State for dialog
  const [dialogMessage, setDialogMessage] = useState(''); // State for dialog message
  const [user] = useContext(UserContext);
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        let res= await Apis.get(endpoints['detailTrip'](id));;
        setTrip(res.data);
        const seatData = res.data.seats.map(seat => ({
          id: seat.seat._id,
          name: seat.seat.name,
          selected: seat.status, 
          status: seat.status 
        }));
        setSeats(seatData);
      } catch (error) {
        alert(error.response.data.message)
      }
    };
    fetchSeats();
  }, [id]);

  const handleSeatClick = (id) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.id === id ? { ...seat, selected: !seat.selected } : seat
      )
    );
  };

  const handleBookTickets = async () => {
    const selectedSeats = seats.filter(seat => seat.selected && !seat.status);
    const seatNames = selectedSeats.map(seat => seat.name).join(', ');
    const selectedCount = selectedSeats.length;
    const selectedSeatsIds = selectedSeats.map(seat => seat.id)
    try {
      const data = {
        seatIds: selectedSeatsIds
      }
      const res = await authApi().post(endpoints['book-seats'](id), data)
      console.info(res.data)
      window.location.assign(res.data.order_url)
      setDialogMessage(`Đặt vé thành công! Các ghế đã đặt: ${seatNames} \nSố lượng: ${selectedCount}`)
      setOpenDialog(true)
    } catch (ex) {
      setDialogMessage(ex.response?.data?.message || 'Không thể đặt vé')
      setOpenDialog(true)
    }
  };

  const selectedSeats = seats.filter(seat => seat.selected && !seat.status);
  const isButtonDisabled = selectedSeats.length === 0;
  const firstColumnSeats = seats.slice(0, 10);
  const secondColumnSeats = seats.slice(10, 20);
  const thirdColumnSeats = seats.slice(20);

  if (!trip || !seats) {
    return <Spinner />
  }

  return (
    <div>
      <HeadingContent title="Chi tiết chuyến xe" />
      <Container style={DetailTripStyle.container}>
        <Box style={DetailTripStyle.mainContent}>
          <Box sx={{ width: { md: '40%', sm: '100%' }, }} style={DetailTripStyle.seatList}>
            <Grid container spacing={0} justifyContent="center">
              <Grid item xs={4} sm={4} md={4} style={DetailTripStyle.column}>
                <Grid container spacing={1} direction="column">
                  {firstColumnSeats.map((seat) => (
                    <Grid item key={seat.id}>
                      <Button
                        variant="contained"
                        style={{
                          ...DetailTripStyle.seatButton,
                          backgroundColor: seat.status ? 'gray' : (seat.selected ? '#f50057' : '#4caf50'),
                          transform: seat.status ? 'none' : (seat.selected ? 'scale(1.1)' : 'scale(1)'),
                        }}
                        onClick={() => handleSeatClick(seat.id)}
                        disabled={seat.status}
                      >
                        {seat.name}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={4} sm={4} md={4} style={DetailTripStyle.column}>
                <Grid container spacing={1} direction="column">
                  {secondColumnSeats.map((seat) => (
                    <Grid item key={seat.id}>
                      <Button
                        variant="contained"
                        style={{
                          ...DetailTripStyle.seatButton,
                          backgroundColor: seat.status ? 'gray' : (seat.selected ? '#f50057' : '#4caf50'),
                          transform: seat.status ? 'none' : (seat.selected ? 'scale(1.1)' : 'scale(1)')
                        }}
                        onClick={() => handleSeatClick(seat.id)}
                        disabled={seat.status}
                      >
                        {seat.name}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={4} sm={4} md={4} style={DetailTripStyle.column}>
                <Grid container spacing={1} direction="column">
                  {thirdColumnSeats.map((seat) => (
                    <Grid item key={seat.id}>
                      <Button
                        variant="contained"
                        style={{
                          ...DetailTripStyle.seatButton,
                          backgroundColor: seat.status ? 'gray' : (seat.selected ? '#f50057' : '#4caf50'),
                          transform: seat.status ? 'none' : (seat.selected ? 'scale(1.1)' : 'scale(1)')
                        }}
                        onClick={() => handleSeatClick(seat.id)}
                        disabled={seat.status}
                      >
                        {seat.name}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Box style={DetailTripStyle.infoSection}>
            {trip ? <>
              <ListGroup as="ul">
                <ListGroup.Item as="li" active style={{ ...RoutingDetailStyle.tableHeading }}>
                  Thông tin chi tiết
                </ListGroup.Item>
                <ListGroup.Item as="li"><span style={{ fontWeight: 'bold' }}>Tuyến: </span>{trip.route.name}</ListGroup.Item>
                <ListGroup.Item as="li">
                  <span style={{ fontWeight: 'bold' }}>Xe: </span>{trip.bus.name}
                </ListGroup.Item>
                <ListGroup.Item as="li"><span style={{ fontWeight: 'bold' }}>Đơn giá: </span> {trip.price} VNĐ</ListGroup.Item>
                <ListGroup.Item as="li"><span style={{ fontWeight: 'bold' }}>Giờ khởi hành: </span>{convertDateTime(trip.departureTime)}</ListGroup.Item>
              </ListGroup>
              {user?<>
                <div style={DetailTripStyle.flex}>
                <Button
                  variant="contained"
                  color="primary"
                  style={DetailTripStyle.bookButton}
                  onClick={handleBookTickets}
                  disabled={isButtonDisabled}
                >
                  Đặt Vé
                </Button>
              </div>
              </>:<></>}
            </> : <></>}
          </Box>
        </Box>
      </Container>

      {/* DialogBox */}
      <DialogBox open={openDialog} message={dialogMessage} onClose={() => setOpenDialog(false)} />
    </div>
  );
};

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

export default DetailTrip;
