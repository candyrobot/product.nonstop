import React, { Component } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';

import Favorite from '../model/Favorite';

export default class extends Component {
  render() {
    const image = this.props.image;
    const guide = this.props.guide;
    const onClick = this.props.onClick || function() {};
    this.on = window.app.session && !!window.app.favorites.where({imageID: image.id, userID: window.app.session.id}).length;
    return (
    this.on ?
    <IconButton
      className="IconButton IconButton-skeleton on"
      onClick={(e)=> {
        e.stopPropagation();
        Favorite.delete(image.id, this);
        onClick(this);
      }}>
      <FavoriteIcon />
    </IconButton>
    :
    <IconButton
      className="IconButton IconButton-skeleton"
      style={{ position: 'relative' }}
      onClick={(e)=> {
        e.stopPropagation();
        Favorite.create(image.id, this);
        onClick(this);
      }}>
      <FavoriteIcon />
      {guide && (
        <div className="balloon" position="left">
          タップして "お気入り" に入れると…　<span role="img" aria-label="→">👉</span>
        </div>
      )}
    </IconButton>
    )
  }
}
