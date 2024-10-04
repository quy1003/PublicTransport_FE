import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useEffect, useState } from 'react';
import Apis, { authApi, endpoints } from '../../config/Apis';
import { Button, Typography, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import HeadingContent from "../Mutual/HeadingContent";
import { UserContext } from '../../App';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const CreateTrip = () => {
  const [routes, setRoutes] = useState([]);
  const [buses, setBuses] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedBus, setSelectedBus] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const [departureTime, setDepartureTime] = useState('');
  const [price, setPrice] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [user] = React.useContext(UserContext);
  const [drivers, setDrivers] = useState(null)
  const [selectedDriver, setSelectedDriver] = useState('')
  const loadRoutes = async (page) => {
    setLoading(true);
    try {
      const res = await Apis.get(`${endpoints['routes']}?page=${page}`);
      if (res.data.routes.length > 0) {
        setRoutes((prevRoutes) => {
          const prevIds = new Set(prevRoutes.map(route => route._id));
          const newRoutes = res.data.routes.filter(route => !prevIds.has(route._id));
          return [...prevRoutes, ...newRoutes];
        });
        setTotalPages(res.data.totalPages);
        setPage(res.data.currentPage);
      }
    } catch (error) {
      alert(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const loadBuses = async (routeId) => {
    try {
      const res = await Apis.get(endpoints['detailRoute'](routeId));
      setBuses(res.data.buses || []);
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  const loadDrivers = async () => {
    try {
      const res = await authApi().get(endpoints['drivers']);
      setDrivers(res.data|| null);
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  useEffect(()=>{
    loadDrivers()
  },[])
  useEffect(() => {
    loadRoutes(page);
  }, [page]);

  useEffect(() => {
    if (selectedRoute) {
      loadBuses(selectedRoute);
    }
  }, [selectedRoute]);

  const handleScroll = (event) => {
    const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
    if (bottom && !loading && page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleRouteChange = (event) => {
    setSelectedRoute(event.target.value);
    setSelectedBus('');
  };
  const handleDriverChange = (event) => {
    setSelectedDriver(event.target.value);
  };
  const handleBusChange = (event) => {
    setSelectedBus(event.target.value);
  };

  const handleDirectionChange = (value) => {
    setIsReverse(value);
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value);
    }
  };

  const handleSubmit = async () => {
    if (isNaN(price)) {
      alert('Giá tiền phải là số');
      return;
    }

    try {
      await authApi().post(endpoints['create-trip'], {
        routeId: selectedRoute,
        busId: selectedBus,
        driverId: selectedDriver,
        isReverse: isReverse,
        departureTime: departureTime,
        price: price,
      });
      setOpenDialog(true);
      //
      setSelectedDriver('')
      setSelectedBus('')
      setSelectedRoute('')
      setPrice('')
      setDepartureTime('')
      
    } catch (error) {
      console.error('Error creating trip:', error);
      alert(error.response?.data?.message || 'Không thể tạo trip mới');
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div style={{marginBottom: '2rem'}}>
      {user && user.type === 'ADMIN'?<>
        <HeadingContent title="Thêm lịch trình" />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px', margin: 'auto' }}>
        <FormControl fullWidth>
          <InputLabel id="route-label">Chọn Tuyến Đường</InputLabel>
          <Select
            labelId="route-label"
            value={selectedRoute}
            onChange={handleRouteChange}
            input={<OutlinedInput id="select-route" label="Tuyến Đường" />}
            MenuProps={{
              PaperProps: {
                onScroll: handleScroll,
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                  width: 250,
                  overflowY: 'auto',
                },
              },
            }}
          >
            {routes.map((route) => (
              <MenuItem key={route._id} value={route._id}>
                {route.name}
              </MenuItem>
            ))}
            {loading && <MenuItem disabled>Loading...</MenuItem>}
            {page >= totalPages && <MenuItem disabled>No more routes to load</MenuItem>}
          </Select>
        </FormControl>

        <FormControl fullWidth disabled={!selectedRoute}>
          <InputLabel id="bus-label">Chọn Bus</InputLabel>
          <Select
            labelId="bus-label"
            value={selectedBus}
            onChange={handleBusChange}
            input={<OutlinedInput id="select-bus" label="Bus" />}
          >
            {buses.length > 0 ? (
              buses.map((bus) => (
                <MenuItem key={bus._id} value={bus._id}>
                  {bus.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Không có bus nào</MenuItem>
            )}
          </Select>
        </FormControl>
        {/*  */}
        <FormControl fullWidth>
          <InputLabel id="route-label">Chọn Tài Xế</InputLabel>
          <Select
            labelId="route-label"
            value={selectedDriver}
            onChange={handleDriverChange}
            input={<OutlinedInput id="select-driver" label="Tài xế" />}
            MenuProps={{
              PaperProps: {
                onScroll: handleScroll,
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                  width: 250,
                  overflowY: 'auto',
                },
              },
            }}
          >
            {drivers ? (
      drivers.map((driver) => (
        <MenuItem key={driver._id} value={driver._id}>
          {driver.name}
        </MenuItem>
      ))
    ) : (
      <MenuItem disabled>Loading...</MenuItem>
    )}
            
          </Select>
        </FormControl>
        {/*  */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
          <Button
            variant={!isReverse ? "contained" : "outlined"}
            onClick={() => handleDirectionChange(false)}
            sx={{ width: '45%' }}
          >
            Lượt đi
          </Button>
          <Button
            variant={isReverse ? "contained" : "outlined"}
            onClick={() => handleDirectionChange(true)}
            sx={{ width: '45%' }}
          >
            Lượt về
          </Button>
        </Box>

        <TextField
          label="Thời gian khởi hành"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          value={departureTime}
          onChange={(e) => setDepartureTime(e.target.value)}
          required
          fullWidth
        />

        <TextField
          label="Giá"
          type="number"
          value={price}
          onChange={handlePriceChange}
          required
          fullWidth
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 1 }}
          disabled={!selectedRoute || !selectedBus} // Disable button if no route or bus is selected
        >
          Submit
        </Button>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <Typography>Đăng kí tuyến xe thành công!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      </>:<>
      <h1>Unauthenticated</h1>
      </>}
    </div>
  );
};

export default CreateTrip;
