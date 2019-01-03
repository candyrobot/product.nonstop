import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Favorite from '../model/Favorite';

export default class extends Component {
  render() {
    const imageID = this.props.imageID;
    const guide = this.props.guide;
    return (
    !! window.dat.favorites.where({imageID, userID: window.dat.session.id}).length
    ?
    <IconButton
      style={{ pointerEvents: 'initial', color: 'rgba(255, 0, 0, 0.8)' }}
      onClick={()=> Favorite.delete(imageID)}>
      <FavoriteIcon />
    </IconButton>
    :
    <IconButton
      style={{ pointerEvents: 'initial', position: 'relative' }}
      onClick={()=> Favorite.create(imageID)}>
      <FavoriteIcon />
      {guide && (
        <div className="balloon" position="left">
          タップして "お気入り" に入れると…　👉
        </div>
      )}
    </IconButton>
    )
  }
}
