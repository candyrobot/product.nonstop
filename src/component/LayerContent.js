import React, { Component } from 'react';
import Layer from './Layer';

class LayerContent extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Layer>
        <div style={{ backgroundColor: 'blue' }}>
          1
        </div>
      </Layer>
    );
  }
}

export default LayerContent;
