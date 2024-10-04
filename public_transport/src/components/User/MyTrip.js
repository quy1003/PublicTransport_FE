import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { authApi, endpoints } from '../../config/Apis';

const MyTrips = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await authApi().get(endpoints['my-trip']);
        setTrips(response.data);
      } catch (error) {
        console.error('Error fetching trip data:', error);
      }
    };

    fetchTrips();
  }, []);

  return (
    <Box
      sx={{
        maxHeight: '80vh',  
        overflowY: 'auto',   
        padding: 2,
      }}
    >
      {trips.map((trip) => (
        <Card key={trip._id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography style={{color:'rgb(25, 118, 210)', fontWeight:'bold'}} variant="h6" component="div">
              {trip.route.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {trip.isReverse ? 'Lượt về' : 'Lượt đi'}
            </Typography>
            <Typography variant="body1">
            {trip.bus.name}
            </Typography>
            <Typography variant="body1">
            {trip.seat.name}
            </Typography>
            <Typography variant="body1">
            {trip.price} VND
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Ngày mua: {new Date(trip.purchaseDay).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Thời gian khởi hành: {new Date(trip.departureTime).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default MyTrips;
