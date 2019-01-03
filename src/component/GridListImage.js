import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';

import GridListTileImage from '../component.env/GridListTileImage';
import '../component.env/GridList.css';

export default class extends Component {
  render() {
    if (!window.dat || !window.dat.favorites || !window.dat.favorites.length)
      return null;

    return (
    <GridList
      id="component-images" className="gridList"
      cellHeight='auto' spacing={1}>
      {this.props.images.map((image, i) => (
        <GridListTileImage image={image} />
      ))}
    </GridList>
    );
  }
}
