import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import Device from '../object/Device';

export default class extends React.Component {
  render() {
    const toggleDrawer = window.drawer && window.drawer.toggleDrawer || function() {};
    return (
    <AppBar position="static" style={{ zIndex: 'inherit' }}>
      <Toolbar style={{ padding: 0 }}>
        <IconButton color="inherit" aria-label="Menu">
          <MenuIcon onClick={toggleDrawer('left', true)} />
        </IconButton>
        <Typography
          style={{ width: '100%' }}
          variant="inherit" color="inherit"
          onClick={()=> console.log('みんな がでてくる')}
        >
          利用者数 1,520人以上 突破!!
        </Typography>
        <IconButton
          color="inherit"
          onClick={()=> new Device.Album()}>
          <AddIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
    );
  }
}
