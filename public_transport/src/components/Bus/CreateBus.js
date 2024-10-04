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
import homeStyles from '../../styles/HomeStyle/HomeStyle';
import { UserContext } from '../../App';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const CreateBus = () => {
  const [routes, setRoutes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState('')
  const [capacity, setCapacity] = useState(30)
  const [user] = React.useContext(UserContext)
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

  useEffect(() => {
    loadRoutes(page);
  }, [page]);


  const handleScroll = (event) => {
    const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
    if (bottom && !loading && page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleRouteChange = (event) => {
    setSelectedRoute(event.target.value);
  };


  const handleSubmit = async () => {
    if (isNaN(capacity) || capacity === 0) {
      alert('Sức chứa không hợp lệ');
      return;
    }
    const data = {
        "routeId": selectedRoute,
        "capacity": capacity,
        "name": name
    }
    try {
      await authApi().post(endpoints['create-bus'],data)
      setOpenDialog(true)
      
      setName('')
      setCapacity(0)
      setSelectedRoute('')
    } catch (error) {
      console.error('Error creating trip:', error);
      alert(error.response?.data?.message || 'Không thể tạo bus mới');
    }
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  return (
    <div style={{marginBottom: '8.9rem'}}>
      {user && user.type === 'ADMIN'?<>
        <HeadingContent title="Tạo mới Bus" />
      
      <Box sx={{...homeStyles.box}}>
      <TextField
          label="Nhập tên xe buýt"
          type="text"
          InputLabelProps={{ shrink: true }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Nhập sức tải"
          type="number"
          InputLabelProps={{ shrink: true }}
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          required
          fullWidth
        />
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

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 1 }}
          disabled={!name || !capacity}
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
      </>:<h1>Unauthenticated</h1>}
    </div>
  );
};

export default CreateBus;
