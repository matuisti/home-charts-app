import React, { useContext } from 'react';
import { styled } from '@mui/material/styles';
import { store, openDraver } from '../../context/index';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TimelineIcon from '@mui/icons-material/Timeline';
import BoltIcon from '@mui/icons-material/Bolt';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const DrawerHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '0px 8px;',
  minHeight: '56px',
  justifyContent: 'flex-end',
});

const SideDraver = () => {
  const { state: { draver }, dispatch } = useContext(store);
  return (
    <Drawer
      anchor="left"
      open={draver.open}
      onClose={() => openDraver(dispatch, false)}
    >
      <Box
        sx={{ width: 250 }}
        role="presentation"
      >
        <DrawerHeader>
          <IconButton onClick={() => openDraver(dispatch, false)}>
           <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText primary="Trendit" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <BoltIcon />
            </ListItemIcon>
            <ListItemText primary="Akun varaus" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default SideDraver;