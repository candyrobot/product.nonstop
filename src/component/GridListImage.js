import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';

import {
  isAndroid,
  showWebview
} from '../component.env/_util';

import GridListTileImage from '../component.env/GridListTileImage';
import '../component.env/GridList.css';

export default class extends Component {
  render() {
    const images = this.props.images;

    if (!images)
      return null;

    return (
    <GridList
      id="component-images"
      cellHeight='auto' spacing={1}>
      {images.map((image, i) => [
        i % 12 || <div
          ref={(el)=> el.style = undefined}
          className="message"
          onClick={()=> {
            if (isAndroid()) {
              return showWebview('https://www.youtube.com/embed/f9MsSWxJXhc');
            } else {
              return showWebview('https://www.youtube.com/embed/8iueP5sRQ-Y');
            }
          }}
        >
          スマホのホーム画面にこのアプリを追加することができるのです
          <i>(ここをタップ)</i>
        </div>,
        <GridListTileImage key={i} image={image} />
      ])}
    </GridList>
    );
  }
}
