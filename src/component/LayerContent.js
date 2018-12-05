import React, { Component } from 'react';
import Layer from './Layer';
import GridListAdvanced from './GridListAdvanced';

class LayerContent extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Layer>
        <GridListAdvanced images={this.props.images} />
      </Layer>
    );
  }
}

export default LayerContent;
