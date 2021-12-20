import React, { useContext } from 'react';
import { store, openDraver } from '../../context/index';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const { dispatch } = useContext(store);
  return (
    <AppBar position="sticky" sx={{background: '#f2f2f2'}} >
      <Toolbar variant="dense">
        <IconButton
          size="large"
          edge="start"
          color="default"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => openDraver(dispatch, true)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;