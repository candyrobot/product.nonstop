import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Layer from './Layer';

const styles = {
  root: {
    width: '100%',
  },
};

class LayerOverlay extends Layer {
  constructor() {
  	super();
  }
  render() {
    return (
      <div>
        {3}
      </div>
    );
  }
}

// LayerOverlay.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(LayerOverlay);
