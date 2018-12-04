import React, { Component } from 'react';
import Layer from './Layer';
import ActionsBar from './ActionsBar';

class LayerNavigation extends Component {
  constructor() {
  	super();
  }
  render() {
    return (
      <Layer className="LayerNavigation">
        <ActionsBar />
      </Layer>
    );
  }
}

export default LayerNavigation;
