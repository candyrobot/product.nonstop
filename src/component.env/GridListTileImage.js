import React, { Component } from 'react';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Grow from '@material-ui/core/Grow';
import Route from '../object/Route';

import '../component.env/Pic.css';
import ButtonToggleFavorite from '../component.env/ButtonToggleFavorite';

export default class extends Component {

  render() {
    {/*INFO: https://material-ui.com/utils/transitions/*/}

    const image = this.props.image;
    return (
    <Grow in={true}
      style={{ transformOrigin: '0 0 0' }}
    >
        {/*ref={(node)=> $(node).inView().length}*/}
      <GridListTile
        className="Pic fas fa-unlink"
        testAttr={image.id}
        key={image.id} cols={image.featured ? 2 : 1} rows={image.featured ? 2 : 1}>
        <div
          className="background"
          data-load-image={image.url}
          onClick={()=> Route.push('image', { id: image.id })}
        >
        </div>
        {/*<img src={image.url} alt={image.title} />*/}
        <GridListTileBar
          style={{ background: 'inherit', pointerEvents: 'none' }}
          title={image.title}
          titlePosition="bottom"
          actionIcon={<ButtonToggleFavorite {...this.props} imageID={image.id} />}
          actionPosition="right"
        />
      </GridListTile>
    </Grow>
    );
  }
}
