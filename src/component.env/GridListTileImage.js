import React, { Component } from 'react';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Grow from '@material-ui/core/Grow';
import Route from '../object/Route';

import '../component.env/Pic.css';
import ButtonToggleFavorite from '../component.env/ButtonToggleFavorite';

export default class extends Component {

  image

  pushRoute() {
    Route.push('image', { id: this.image.id });
  }

  render() {
    // TODO: transition
    // INFO: https://material-ui.com/utils/transitions/

    this.image = this.props.image;
    const { onClick, className, style, guide, onClickOnFavorite } = this.props;

    if (!this.image)
      return null;

    return (
    <Grow in={true}
      style={{ transformOrigin: '0 0 0' }}
    >
        {/*ref={(node)=> $(node).inView().length}*/}
      <GridListTile
        style={style}
        className="Pic fas fa-unlink"
        key={this.image.id} cols={this.image.featured ? 2 : 1} rows={this.image.featured ? 2 : 1}>
        <div
          className={'Pic-background ' + className}
          data-load-image={this.image.url}
          onClick={()=> onClick ? onClick(this.pushRoute) : this.pushRoute()}
        >
          <GridListTileBar
            style={{ background: 'initial' }}
            title={this.image.id}
            titlePosition="bottom"
            actionIcon={<ButtonToggleFavorite
              image={this.image}
              guide={guide}
              onClick={onClickOnFavorite}
              />}
            actionPosition="right"
          />
        </div>
      </GridListTile>
    </Grow>
    );
  }
}
