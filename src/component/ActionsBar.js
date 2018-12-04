import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import './ActionsBar.css';

const styles = {
  root: {
    width: '100%',
    position: 'fixed',
    justifyContent: 'initial',
    bottom: 0,
    overflow: 'auto'
  },
};

class ActionsBar extends Component {
  constructor() {
    super();
    this.hoge = 1;
    this.state = {
      items: [1,2,3]
    };
  }
  
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  // - 人気
  // - 新着
  // - お気入り
  // - マイページ

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    console.log(this.props)
    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
    );
  }
}

ActionsBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ActionsBar);
