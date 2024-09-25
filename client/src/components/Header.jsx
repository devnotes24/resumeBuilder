import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
// import ThemeButton from './ThemeButton';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';


// import FullscreenButton from './FullScreenButton';
import { useGlobalState } from '../context/useGlobalState';

const pages = [{label : "HOME" , path : ""},{label : "PROFILE" , path : "/profile"},{label : "RESUME" , path : "/resume"},{label : "DEVELOPERS" , path : "/developerInfo"}];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Header() {
  const navigate = useNavigate();
  const {isAuthenticated , setIsAuthenticated} = useGlobalState();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);
  const {isDarkMode} = useGlobalState();


  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  //logout function
  const handleLogout = () => {
    console.log("Logout cliicked");
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate("/");
    window.location.reload();
    // handleCloseUserMenu();
  };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };
  function handleNavigate(path){
    navigate(path);
    handleCloseNavMenu();
  }
  return (<>
    <AppBar position="static" sx={{background : isDarkMode? 'primary' :  'linear-gradient(45deg, #ff6b6b, #f06595)' , color : "white"}}>
    {/* background: 'linear-gradient(45deg, #ff6b6b, #f06595)', */}
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          <Box
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
            }}
          >
             <img width={"40px"} height={"40px"} src="Logo.svg"/>
          </Box>

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
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={() => handleNavigate(page.path)} >
                  <Typography sx={{ textAlign: 'center' }}>{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
            }}
          >
             <img width={"40px"} height={"40px"} src="Logo.svg"/>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={() => handleNavigate(page.path)}

                sx={{ my: 2, color: 'white', display: 'block'  }}
              >
                {page.label}
              </Button>
            ))}
          </Box>
          <Box>
            {isAuthenticated ? <Button variant='text' sx={{color : "#fff"}} onClick={handleLogout}>Logout</Button> : <Button sx={{color : "#fff"}} variant='text' onClick={() => {navigate("/signIn")}} >Login</Button>}
          </Box>
          
        </Toolbar>
      </Container>
    </AppBar>
</>
  );
}
export default Header;
