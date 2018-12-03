// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Layer from './component/Layer';

const styles = {
  root: {
    width: '100%',
  },
};

class LayerAppNotification extends Layer {
  constructor() {
  	super();
  }
  render() {
    <div>
    	{4}
    </div>
  }
}

// LayerAppNotification.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(LayerAppNotification);
