import React, { Component } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';

import Favorite from '../model/Favorite';

import {
  DrawerLetsSignup
} from '../component.env/drawer';
import {
  countUp
} from '../component.env/_util';

export default class extends Component {
  render() {
    const image = this.props.image;
    const guide = this.props.guide;
    return (
    !! window.dat.favorites.where({imageID: image.id, userID: window.dat.session.id}).length
    ?
    <IconButton
      className="IconButton IconButton-skeleton on"
      onClick={()=> Favorite.delete(image.id)}>
      <FavoriteIcon />
    </IconButton>
    :
    <IconButton
      className="IconButton IconButton-skeleton"
      style={{ position: 'relative' }}
      onClick={(e)=> {
        Favorite.create(image.id);
        window.app.recommendation.setState({ open: true });
        countUp('favoriteCount') % 3 === 0 && new DrawerLetsSignup().create();
        e.stopPropagation();
      }}>
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
