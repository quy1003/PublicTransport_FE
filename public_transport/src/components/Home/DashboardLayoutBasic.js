import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BusIcon from '@mui/icons-material/DirectionsBus';
import ScheduleIcon from '@mui/icons-material/Schedule';
import RouteIcon from '@mui/icons-material/AltRoute';
import StationIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const NAVIGATION = [
  {
    segment: '/buses',
    title: 'Bus',
    icon: <BusIcon />,
  },
  {
    segment: '/trips',
    title: 'Lịch trình',
    icon: <ScheduleIcon />,
  },
  {
    segment: '/routes',
    title: 'Tuyến xe',
    icon: <RouteIcon />,
  },
  {
    segment: '/stations',
    title: 'Trạm',
    icon: <StationIcon />,
  },
];

const demoTheme = createTheme({
  palette: {
    mode: 'light', 
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});


function DashboardLayoutBranding(props) {
  const { window } = props;
  const navigate = useNavigate()
  const handleNavigation = (path) => {
    navigate(path);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={demoTheme}>
      <Box sx={{ display: 'flex'}}>
        <CssBaseline />
        <Drawer
          container={container}
          variant="permanent"
          anchor="right" 
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              height:'100%', 
              backgroundColor: 'rgba(0, 0, 0, 0.7)', 
              color: '#ffffff',
            },
          }}
          open
        >
          <Toolbar />
          <Divider />
          <List>
            {NAVIGATION.map((navItem) => (
              <ListItem button key={navItem.segment} onClick={() => handleNavigation(navItem.segment)}>
                <ListItemIcon sx={{ color: '#ffffff' }}>{navItem.icon}</ListItemIcon> {/* White icons */}
                <ListItemText primary={navItem.title} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` }
          }}
        >
        </Box>
      </Box>
    </ThemeProvider>
  );
}

DashboardLayoutBranding.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBranding;
