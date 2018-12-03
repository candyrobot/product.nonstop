import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Layer from './Layer';

const styles = {
  root: {
    width: '100%',
  },
};

class LayerContent extends Layer {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="hoge ">
        1
      </div>
    );
  }
}

// LayerContent.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(LayerContent);
