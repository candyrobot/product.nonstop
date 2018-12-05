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
    overflow: 'auto',
    boxShadow: '0 0 50px rgba(0,0,0,.3)'
  },
};

class ActionsBar extends Component {
  constructor() {
    super();
  }

  state = {
    value: 0,
  };

  handleChange = (event, index) => {
    var a = [
      'getImages',
      'getImagesReversed',
      'getImages',
      'getImagesReversed'
    ];
    this.props.update(a[index]);
    
    this.setState({ index });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="人気" icon={<RestoreIcon />} />
        <BottomNavigationAction label="新着" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="お気入り" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="マイページ" icon={<LocationOnIcon />} />
      </BottomNavigation>
    );
  }
}

ActionsBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ActionsBar);
