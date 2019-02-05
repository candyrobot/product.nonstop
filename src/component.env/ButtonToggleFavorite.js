import React, { Component } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Favorite from '../model/Favorite';

export default class extends Component {
  render() {
    const image = this.props.image;
    const guide = this.props.guide;
    const onClick = this.props.onClick || function() {};

    const Wrap = this.props.rounded ? Fab : IconButton;

    this.on = window.app.session && !!window.app.favorites.where({imageID: image.id, userID: window.app.session.id}).length;
    return (
    this.on ?
    <Wrap
      className={'IconButton IconButton-skeleton on ' + (this.props.rounded && 'rounded')}
      onClick={(e)=> {
        e.stopPropagation();
        Favorite.delete(image.id, this);
        onClick(this);
      }}>
      <FavoriteIcon />
    </Wrap>
    :
    <Wrap
      className={'IconButton IconButton-skeleton ' + (this.props.rounded && 'rounded')}
      style={{ position: 'relative' }}
      onClick={(e)=> {
        e.stopPropagation();
        Favorite.create(image.id, this);
        onClick(this);
      }}>
      <FavoriteIcon />
      {guide && (
        <div className="balloon" position="left" style={{ left: -5 }}>
          タップして "お気入り" に入れると…　<span role="img" aria-label="→">👉</span>
        </div>
      )}
    </Wrap>
    )
  }
}
