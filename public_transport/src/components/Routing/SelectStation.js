import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useEffect, useState } from 'react';
import Apis, { endpoints } from '../../config/Apis';
import { StationContext } from './StationContext';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const SelectionStation = () => {
  const theme = useTheme();
  const [stations, setStations] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(null);
  const [personName, setPersonName] = useState([]);
  const { setSelectedStation } = React.useContext(StationContext);

  const handleStationSelect = (station) => {
    setSelectedStation((prevStations) => {
        const isSelected = prevStations.find((s) => s._id === station._id);

        if (isSelected) {
            return prevStations.filter((s) => s._id !== station._id);
        } else {
            return [...prevStations, station];
        }
    });
};
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
      alert(error.response?.data?.message || "Failed to load stations");
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

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Trạm</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={{
            PaperProps: {
              onScroll: handleScroll, // Sử dụng sự kiện cuộn trên toàn bộ menu
              style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
                overflowY: 'auto',
              },
            },
          }}
        >
          {stations.map((station) => (
            <MenuItem
            onClick={() => handleStationSelect(station)}
              key={station._id}
              value={station.name}
              style={{
                fontWeight: personName.indexOf(station.name) === -1
                  ? theme.typography.fontWeightRegular
                  : theme.typography.fontWeightMedium,
              }}
            >
              {station.name}
            </MenuItem>
          ))}
          {loading && <MenuItem disabled>Loading...</MenuItem>}
          {page >= totalPages && <MenuItem disabled>No more stations to load</MenuItem>}
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectionStation;
