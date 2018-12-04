import React, { Component } from 'react';
import './Layer.css';

class Layer extends Component {
  render() {
    return (
      <div className={'Layer ' + this.props.className}>
      	{this.props.children}
      </div>
    );
  }
}

export default Layer;
