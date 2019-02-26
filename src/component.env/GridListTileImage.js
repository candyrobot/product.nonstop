import React, { Component } from 'react';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Grow from '@material-ui/core/Grow';
import '../component.env/Pic.css';
import ButtonToggleFavorite from '../component.env/ButtonToggleFavorite';
import Route from '../object.env/Route';

export default class extends Component {

  image

  pushRoute() {
    Route.push('image', { id: this.image.id });
  }

  render() {
    // TODO: transition
    // INFO: https://material-ui.com/utils/transitions/

    const { image, onClick, className } = this.props;

    if (!image)
      return null;

    this.image = image;

    return (
    <Grow in={true}
      style={{ transformOrigin: '0 0 0' }}
    >
        {/*ref={(node)=> $(node).inView().length}*/}
      <GridListTile
        className="Pic fas fa-unlink"
        key={image.id} cols={image.featured ? 2 : 1} rows={image.featured ? 2 : 1}>
        <div
          className={'Pic-background ' + className}
          style={{ backgroundImage: `url(${image.url})` }}
          onClick={()=> onClick ? onClick(this.pushRoute) : this.pushRoute()}
        >
          {this.props.hasFav &&
            <GridListTileBar
              style={{ background: 'initial' }}
              title={'' && image.id}
              titlePosition="bottom"
              actionIcon={<ButtonToggleFavorite
                image={image}
                />}
              actionPosition="right"
            />
          }
        </div>
      </GridListTile>
    </Grow>
    );
  }
}
