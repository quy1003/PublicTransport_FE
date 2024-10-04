import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import homeStyles from '../styles/HomeStyle/HomeStyle';
import { Divider } from '@mui/material';

const pages = [
  { name: 'HOME', href: '/' },
  { name: 'Tra cứu tuyến', href: '/routes/' },
  { name: 'Tìm đường', href: '/find-path/' },
  { name: 'Xem lịch trình', href: '/trips/' },
  { name: 'Blogs', href: '/blogs/'},
  { name: 'Đăng ký', href: '/sign-up/'},
];

const Header = () => {
  const [user, dispatch] = React.useContext(UserContext)
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const navigate = useNavigate()
  const handleNavigate = (path) => () => {
    navigate(path);
    handleCloseUserMenu();
  };
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const logout = () => {
    dispatch({
      "type": "logout"
    })
  }
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DirectionsBusIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BUSMAP
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to={page.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {page.name}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <DirectionsBusIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BUSMAP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.href}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0,display: 'flex' }}>
            {user !==null?<div>
              <Tooltip title="Cài đặt người dùng">
              
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <div style={homeStyles.userHi}>
                <p style={{marginRight: '1rem'}}>{user.username}</p>
                <Avatar alt="Remy Sharp" src={user.avatar} />
              </div>
                
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
              <MenuItem key={Math.random()} onClick={handleNavigate('/profile/')}>
                  <Typography textAlign="center">Hồ sơ</Typography>
              </MenuItem>
              {user && user.type === 'WORKER'?<div>
                <MenuItem key={Math.random()} onClick={handleNavigate('/reports/')}>
                  <Typography textAlign="center">Báo cáo vấn đề xe</Typography>
              </MenuItem>
              </div>:<div></div>}
              {user && user.type === 'DRIVER'?<div>
                <MenuItem key={Math.random()} onClick={handleNavigate('/buses/bus-position/')}>
                  <Typography textAlign="center">Bắt đầu hành trình</Typography>
              </MenuItem>
              </div>:<div></div>}
              {user && user.type !=='ADMIN'?<div>
              <MenuItem key={Math.random()} onClick={handleNavigate('/users/my-trip')}>
                  <Typography textAlign="center">Lịch trình</Typography>
              </MenuItem>
              <MenuItem key={Math.random()} onClick={handleNavigate('/user-chat/')}>
                  <Typography textAlign="center">Hỏi tổng đài</Typography>
              </MenuItem>
              </div>:<div></div>}
              
              {user && user.type === 'ADMIN' ? <div>
              <Divider/>
              <MenuItem key={Math.random()} onClick={handleNavigate('/admin-signup/')}>
                  <Typography textAlign="center">Đăng ký người dùng</Typography>
              </MenuItem>
              <MenuItem key={Math.random()} onClick={handleNavigate('/buses/')}>
                  <Typography textAlign="center">Xe buýt</Typography>
              </MenuItem>
              <MenuItem key={Math.random()} onClick={handleNavigate('/stations/')}>
                  <Typography textAlign="center">Trạm xe</Typography>
              </MenuItem>
              <MenuItem key={Math.random()} onClick={handleNavigate('/tickets/')}>
                  <Typography textAlign="center">Quản lý vé</Typography>
              </MenuItem>
              <MenuItem key={Math.random()} onClick={handleNavigate('/routes/')}>
                  <Typography textAlign="center">Tuyến xe</Typography>
              </MenuItem>
              <MenuItem key={Math.random()} onClick={handleNavigate('/trips/')}>
                  <Typography textAlign="center">Chuyến xe</Typography>
              </MenuItem>
              <MenuItem key={Math.random()} onClick={handleNavigate('/reports/')}>
                  <Typography textAlign="center">Báo cáo vấn đề xe</Typography>
              </MenuItem>
              <MenuItem key={Math.random()} onClick={handleNavigate('/admin-chat/')}>
                  <Typography textAlign="center">Phản hồi người dùng</Typography>
              </MenuItem>
              <MenuItem key={Math.random()} onClick={handleNavigate('/buses/all-position/')}>
                  <Typography textAlign="center">Định vị bus</Typography>
              </MenuItem>
              <MenuItem key={Math.random()} onClick={handleNavigate('/blogs/')}>
                  <Typography textAlign="center">Blogs</Typography>
              </MenuItem>
              <MenuItem key={Math.random()} onClick={handleNavigate('/tickets/statistics')}>
                  <Typography textAlign="center">Thống kê báo cáo</Typography>
              </MenuItem>
              </div>:<div></div>}
              <Divider />
              <MenuItem key={Math.random()} onClick={logout}>
                  <Typography textAlign="center">Đăng xuất</Typography>
              </MenuItem>
              
            </Menu>
            </div>:<div>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' },marginRight:{xs: '60%', sm: '20%', md: '0'} }}>
              <Button
                component={Link}
                to="/login"
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
              Đăng nhập
              </Button>
          </Box>
            </div>}
          
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
