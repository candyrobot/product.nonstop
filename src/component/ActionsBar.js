import React, { Component } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import './ActionsBar.css';

class ActionsBar extends Component {
  constructor() {
    super();
    this.hoge = 1;
    this.state = {
      items: [1,2,3]
    };
  }
  render() {
    return (
      <BottomNavigation
        value={1}
        // onChange={this.handleChange}
        showLabels
        // className={classes.root}
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
    );
  }
}

export default ActionsBar;
