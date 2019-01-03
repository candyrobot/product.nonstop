import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Grow from '@material-ui/core/Grow';
import Route from '../object/Route';

import '../component.env/Pic.css';
import ButtonToggleFavorite from '../component.env/ButtonToggleFavorite';

export default class extends Component {
  render() {
    if (!window.dat || !window.dat.favorites || !window.dat.favorites.length)
      return null;

    return (
    <GridList
      id="component-images" className="gridList"
      cellHeight='auto' spacing={1}>
      {/*INFO: https://material-ui.com/utils/transitions/*/}
      {this.props.images.map((tile, i) => (
        <Grow in={true} key={i}
          style={{ transformOrigin: '0 0 0' }}
        >
            {/*ref={(node)=> $(node).inView().length}*/}
          <GridListTile
            className="Pic fas fa-unlink"
            testAttr={tile.id}
            key={tile.id} cols={tile.featured ? 2 : 1} rows={tile.featured ? 2 : 1}>
            <div
              className="background"
              data-load-image={tile.url}
              onClick={()=> Route.push('image', { id: tile.id })}
            >
            </div>
            {/*<img src={tile.url} alt={tile.title} />*/}
            <GridListTileBar
              style={{ background: 'inherit', pointerEvents: 'none' }}
              title={tile.title}
              titlePosition="bottom"
              actionIcon={<ButtonToggleFavorite imageID={tile.id} />}
              actionPosition="right"
            />
          </GridListTile>
        </Grow>
      ))}
    </GridList>
    );
  }
}
