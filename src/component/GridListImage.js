import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Favorite from '../model/Favorite';

export default class extends Component {
  render() {
    if (!window.dat || !window.dat.favorites || !window.dat.favorites.length)
      return null;

    return (
    <GridList
      id="component-images" className="gridList"
      cellHeight='auto' spacing={1}>
      {this.props.images.map(tile => (
        <GridListTile
          className="Pic fas fa-unlink"
          testAttr={tile.id}
          key={tile.id} cols={tile.featured ? 2 : 1} rows={tile.featured ? 2 : 1}>
          <div
            className="background"
            data-load-image={tile.url}
            onClick={()=> window.Route.push('images', { id: tile.id }).refresh()}
            >
            </div>
          {/*<img src={tile.url} alt={tile.title} />*/}
          <GridListTileBar
            style={{ background: 'inherit', pointerEvents: 'none' }}
            title={tile.title}
            titlePosition="bottom"
            actionIcon={
              !! window.dat.favorites.where({imageID: tile.id, userID: window.dat.session.id}).length
              ?
              <IconButton
                style={{ pointerEvents: 'initial', color: 'rgba(255, 0, 0, 0.8)' }}
                onClick={()=> Favorite.delete(tile.id)}>
                <FavoriteIcon />
              </IconButton>
              :
              <IconButton
                style={{ pointerEvents: 'initial' }}
                onClick={()=> Favorite.create(tile.id)}>
                <FavoriteIcon />
              </IconButton>
            }
            actionPosition="right"
          />
        </GridListTile>
      ))}
    </GridList>
    );
  }
}
