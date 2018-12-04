import React, { Component } from 'react';
import Layer from './Layer';

class LayerOverlay extends Component {
  constructor() {
  	super();
  }
  render() {
    return (
      <Layer>
        <div>
          {3}
        </div>
      </Layer>
    );
  }
}

export default LayerOverlay;
