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
    {/*INFO: https://material-ui.com/utils/transitions/*/}

    const image = this.image = this.props.image;
    const onClick = this.props.onClick;
    return (
    <Grow in={true}
      style={{ transformOrigin: '0 0 0' }}
    >
        {/*ref={(node)=> $(node).inView().length}*/}
      <GridListTile
        style={this.props.style}
        className="Pic fas fa-unlink"
        testAttr={image.id}
        key={image.id} cols={image.featured ? 2 : 1} rows={image.featured ? 2 : 1}>
        <div
          className="background"
          data-load-image={image.url}
          onClick={()=> onClick ? onClick(this.pushRoute) : this.pushRoute()}
        >
          <GridListTileBar
            style={{ background: 'initial' }}
            title={image.title}
            titlePosition="bottom"
            actionIcon={<ButtonToggleFavorite
              image={this.props.image}
              guide={this.props.guide}
              onClick={this.props.onClickOnFavorite}
              />}
            actionPosition="right"
          />
        </div>
      </GridListTile>
    </Grow>
    );
  }
}
