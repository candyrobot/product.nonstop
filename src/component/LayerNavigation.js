import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Layer from './Layer';
import ActionsBar from './ActionsBar';

const styles = {
  root: {
    width: '100%',
  },
};

class LayerNavigation extends Layer {
  constructor() {
  	super();
  }
  render() {
    return (
      <div>
        <ActionsBar />
      </div>
    );
  }
}

// LayerNavigation.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(LayerNavigation);
