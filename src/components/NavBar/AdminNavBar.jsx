import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import styled from 'styled-components';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import {
  Avatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MenuListItems } from './MenuListItems';
import { COLORS } from '../../styles/color';
import { HStack } from '../HStack';
import Profile from '../../assets/images/person.png';
import Logo from '../../assets/images/coca-cola.png';
import { logout } from '../../store/actions';

function AdminNavBar({ open, toggleDrawer }) {
  const auth = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth/login');
  };


  return (
    <FlexBox>
      <CssBaseline />
      <MuiAppBar
        position="fixed"
        sx={{ zIndex: (row) => row.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <LogoContainer>
            <LogoAvatar src={Logo} />
            <Typography>Dashboard</Typography>
            <MenuIconButton
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
              }}
            >
              <MenuIcon />
            </MenuIconButton>
          </LogoContainer>

          <HStack>
            <Avatar alt="P" src={Profile} />
            <Typography onClick={handleClick}>{auth.user?.name}</Typography>
          </HStack>

          <Menu anchorEl={anchorEl} open={openMenu} onClose={handleClose}>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText>{auth.user?.name}</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Toolbar>
      </MuiAppBar>

      <Drawer
        open={open}
        variant="persistent"
      >
        <Toolbar />
        <DrawerContentContainer>
          <List component="nav">
            <MenuListItems />
          </List>
        </DrawerContentContainer>
      </Drawer>
    </FlexBox>
  );
}

export default AdminNavBar;

export const FlexBox = styled(Box)`
  display: flex;
`;
const MenuIconButton = styled(IconButton)`
  && {
    margin-right: '36px';
    padding-left: '20px';
    color: ${COLORS.WHITE};
  }
`;
const LogoText = styled.h3`
  white-space: nowrap;
  flex-grow: 1;
`;

export const Drawer = styled(MuiDrawer)`
  width: drawerWidth;
  flex-shrink: 0;
  && {
    .MuiDrawer-paper {
      width: drawerWidth;
      box-sizing: border-box;
    }
  }
`;

const LogoAvatar = styled(Avatar)`
  && {
    width: 30px;
    height: 30px;
  }
`;

const LogoContainer = styled(LogoText)`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const DrawerContentContainer = styled(Box)`
  padding: 20px 0px;
`;
