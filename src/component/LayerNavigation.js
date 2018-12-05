import React, { Component } from 'react';
import Layer from './Layer';
import ActionsBar from './ActionsBar';
import Conspicuous from './Conspicuous';

class LayerNavigation extends Component {
  constructor() {
  	super();
  }
  render() {
    return (
      <Layer className="LayerNavigation">
        <Conspicuous />
        <ActionsBar update={this.props.update} />
      </Layer>
    );
  }
}

export default LayerNavigation;
