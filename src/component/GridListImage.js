import React, { Component } from 'react';
import $ from 'jquery';
import GridList from '@material-ui/core/GridList';
import {
  isAndroid,
  showWebview
} from '../component.env/_util';
import GridListTileImage from '../component.env/GridListTileImage';
import '../component.env/GridList.css';

class Banner extends Component {
  render() {
    return (
    <div
      style={{ 
        display: 'none',
        padding: undefined, width: undefined, height: undefined
      }}
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
    </div>
    );
  }
}

export default class extends Component {

  xxxxx() {
    return Math.floor($('.forAppBar').scrollTop() / $('.forAppBar .Pic').outerHeight()) * 2;
  }

  render() {
    const images = this.props.images.reduce((a, image, i)=> {
      i === 0 || i % 12 || a.push({ type: 'banner' });
      
      // image.hiddenToPerformance = i >= 10 + this.xxxxx();
      
      a.push(image);
      return a;
    }, []);

    if (!images)
      return null;

    return (
    <GridList
      id="component-images"
      cellHeight='auto' spacing={1}>
      {images.map((image, i) => {
        // return;
        // if (image.hiddenToPerformance)
        //   return;

        if (image.deleteFlag)
          return;
        
        return (
          image.type === 'banner' ?
          <Banner key={i} /> :
          <GridListTileImage key={i} image={image} />
        );
      })}
    </GridList>
    );
  }
}
