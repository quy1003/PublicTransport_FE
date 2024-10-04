import React, { useEffect, useState } from 'react';
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Pagination, Box, FormControl, InputLabel, MenuItem, Select, OutlinedInput } from '@mui/material';
import Apis, { endpoints } from '../../config/Apis';
import RoutingDetailStyle from '../../styles/RoutingStyle/RoutingDetailStyle';
import HeadingContent from '../Mutual/HeadingContent';
import StationMap from './StationMap';
import StationStyle from '../../styles/StationStyle/StationStyle';

const FindStation = () => {
  const [startStation, setStartStation] = useState('');
  const [endStation, setEndStation] = useState('');
  const [stations, setStations] = useState([]);
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1);

  const stationsPerPage = 1;

  const loadStations = async (page) => {
    setLoading(true);
    try {
      const res = await Apis.get(`${endpoints['stations']}?page=${page}`);
      if (res.data.stations.length > 0) {
        setStations((prevStations) => {
          const prevIds = new Set(prevStations.map(station => station._id));
          const newStations = res.data.stations.filter(station => !prevIds.has(station._id));
          return [...prevStations, ...newStations];
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
    loadStations(page);
  }, [page]);

  const handleScroll = (event) => {
    const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
    if (bottom && !loading && page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleFindPaths = async () => {
    if (!startStation || !endStation) {
      setError('Please select both start and end stations');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await Apis.post(endpoints['find-station'], {
        startStationId: startStation,
        endStationId: endStation,
      });
      setPaths(response.data);
      setCurrentPage(1);
    } catch (err) {
      setError('Error finding paths. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastStation = currentPage * stationsPerPage;
  const indexOfFirstStation = indexOfLastStation - stationsPerPage;
  const currentPath = paths.slice(indexOfFirstStation, indexOfLastStation);
  const totalPagesForPaths = Math.ceil(paths.length / stationsPerPage);

  return (
    <div style={StationStyle.divFindStation}>
      <HeadingContent title="Tra cứu xe buýt" />
      <Box sx={{ marginBottom: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="start-station-label">Chọn Trạm Bắt Đầu</InputLabel>
          <Select
            labelId="start-station-label"
            value={startStation}
            onChange={(e) => setStartStation(e.target.value)}
            input={<OutlinedInput label="Start Station" />}
            MenuProps={{
              PaperProps: {
                onScroll: handleScroll,
                style: {
                  maxHeight: 48 * 4.5 + 8,
                  width: 250,
                  overflowY: 'auto',
                },
              },
            }}
          >
            {stations.map((station) => (
              <MenuItem key={station._id} value={station._id}>
                {station.name}
              </MenuItem>
            ))}
            {loading && <MenuItem disabled>Loading...</MenuItem>}
            {page >= totalPages && <MenuItem disabled>No more stations to load</MenuItem>}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="end-station-label">Chọn Trạm Kết Thúc</InputLabel>
          <Select
            labelId="end-station-label"
            value={endStation}
            onChange={(e) => setEndStation(e.target.value)}
            input={<OutlinedInput label="End Station" />}
            MenuProps={{
              PaperProps: {
                onScroll: handleScroll,
                style: {
                  maxHeight: 48 * 4.5 + 8,
                  width: 250,
                  overflowY: 'auto',
                },
              },
            }}
          >
            {stations.map((station) => (
              <MenuItem key={station._id} value={station._id}>
                {station.name}
              </MenuItem>
            ))}
            {loading && <MenuItem disabled>Loading...</MenuItem>}
            {page >= totalPages && <MenuItem disabled>No more stations to load</MenuItem>}
          </Select>
        </FormControl>
      </Box>
        <div style={StationStyle.flexCenter}>
        <Button
        variant="contained"
        color="primary"
        onClick={handleFindPaths}
        style={{ marginTop: '20px' }}
        disabled={!startStation || !endStation}
      >
        Tra cứu
      </Button>
        </div>
      

      {loading && <CircularProgress style={StationStyle.mt20} />}
      {error && (
        <Typography color="error" style={StationStyle.mt20}>
          {error}
        </Typography>
      )}

      {currentPath.length > 0 && (
        <>
          <Pagination
            count={totalPagesForPaths}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            style={StationStyle.pgStyle}
          />

          <TableContainer component={Paper} style={StationStyle.mt20}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={StationStyle.distance} colSpan={2}>
                    Khoảng cách ước tính: {currentPath[0][0]?.total_distance} km
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{
                    ...RoutingDetailStyle.width40,
                    ...RoutingDetailStyle.tableHeading,
                  }}>Trạm xe buýt</TableCell>
                  <TableCell align='center' style={{
                    ...RoutingDetailStyle.width60,
                    ...RoutingDetailStyle.tableHeading,
                  }}>Tuyến tiếp theo của trạm</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentPath[0].slice(1).map((station, i) => (
                  <TableRow key={i}>
                    <TableCell>{station.name}</TableCell>
                    <TableCell align='center'>{station.routeName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <StationMap stations={currentPath[0]} /> 
        </>
      )}
    </div>
  );
};

export default FindStation;
