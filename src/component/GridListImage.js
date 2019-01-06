import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';

import GridListTileImage from '../component.env/GridListTileImage';
import '../component.env/GridList.css';

export default class extends Component {
  render() {
    const images = this.props.images;

    if (!images)
      return null;

    return (
    <GridList
      id="component-images"
      cellHeight='auto' spacing={1}>
      {images.map((image, i) => (
        <GridListTileImage key={i} image={image} />
      ))}
    </GridList>
    );
  }
}
