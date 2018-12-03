import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Layer from './Layer';

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
    return (
      <div className="hoge">
        4
      </div>
    );
  }
}

// LayerAppNotification.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(LayerAppNotification);
