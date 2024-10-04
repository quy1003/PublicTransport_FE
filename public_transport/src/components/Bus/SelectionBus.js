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
import { authApi, endpoints } from '../../config/Apis';
import { BusContext } from './BusContext';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const SelectionBus = () => {
  const theme = useTheme();
  const [buses, setBuses] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(null);
  const [personName, setPersonName] = useState([]);
  const { setSelectedBus } = React.useContext(BusContext);

  const handleStationSelect = (bus) => {
    setSelectedBus((prevBuses) => {
        const isSelected = prevBuses.find((s) => s._id === bus._id);

        if (isSelected) {
            return prevBuses.filter((s) => s._id !== bus._id);
        } else {
            return [...prevBuses, bus];
        }
    });
};
  const loadBuses = async (page) => {
    setLoading(true);
    try {
      const res = await authApi().get(`${endpoints['buses']}?page=${page}`);
      if (res.data.buses.length > 0) {
        setBuses((prevBuses) => {
          const prevIds = new Set(prevBuses.map(bus => bus._id));
          const newBuses = res.data.buses.filter(bus => !prevIds.has(bus._id));
          return [...prevBuses, ...newBuses];
        });

        setTotalPages(res.data.totalPages);
        setPage(res.data.currentPage);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to load buses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBuses(page);
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
        <InputLabel id="demo-multiple-chip-label">Bus</InputLabel>
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
          {buses.map((bus) => (
            <MenuItem
            onClick={() => handleStationSelect(bus)}
              key={bus._id}
              value={bus.name}
              style={{
                fontWeight: personName.indexOf(bus.name) === -1
                  ? theme.typography.fontWeightRegular
                  : theme.typography.fontWeightMedium,
              }}
            >
              {bus.name}
            </MenuItem>
          ))}
          {loading && <MenuItem disabled>Loading...</MenuItem>}
          {page >= totalPages && <MenuItem disabled>No more buses to load</MenuItem>}
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectionBus;
