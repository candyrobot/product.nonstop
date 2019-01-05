import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';

import GridListTileImage from '../component.env/GridListTileImage';
import '../component.env/GridList.css';

export default class extends Component {
  render() {
    return (
    <GridList
      id="component-images"
      cellHeight='auto' spacing={1}>
      {this.props.images.map((image, i) => (
        <GridListTileImage key={i} image={image} />
      ))}
    </GridList>
    );
  }
}
