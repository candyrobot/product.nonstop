import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import Device from '../object/Device';
import DialogCanDoWithLogin from '../component.env/DialogCanDoWithLogin';

export default class extends Component {

  cDialogCanDoWithLogin = null;

  onClick() {
    if (window.app.isLoaded() && window.app.isLogined())
      new Device.Album();
    else
      this.cDialogCanDoWithLogin.setState({ open: true });
  }

  render() {
    const toggleDrawer = window.drawer && window.drawer.toggleDrawer || function() {};
    return (
    <AppBar className="AppBar" position="static" style={this.props.style}>
      <Toolbar style={{ padding: 0 }}>
        <IconButton color="inherit" aria-label="Menu" onClick={toggleDrawer('left', true)}>
          <Badge badgeContent={window.app.favorites.length} color="error" max={99}>
            <MenuIcon />
          </Badge>
        </IconButton>
        <Typography
          style={{ width: '100%', textAlign: 'center' }}
          variant="inherit" color="inherit"
          onClick={()=> console.log('みんな がでてくる')}
        >
          <span style={{ fontFamily: 'impact', fontSize: 27 }}>
            nonstop
          </span>
        </Typography>
        <IconButton
          color="inherit"
          onClick={()=> this.onClick()}>
          <AddIcon />
        </IconButton>
      </Toolbar>

      <DialogCanDoWithLogin
        ref={(c)=> this.cDialogCanDoWithLogin = c}
        html="アップロードするにはログインします"
      />
    </AppBar>
    );
  }
}
