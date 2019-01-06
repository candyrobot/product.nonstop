import React, { Component } from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import $ from 'jquery';
import 'jquery.transit';

import './object/$';
import App from './object/App';

import DrawerTemporary from './component/DrawerTemporary';
import './component/balloon.css';

import {
  startLoading,
  stopLoading,
  loadImage,
  query
} from './component.env/_util';
import {
  DrawerConspicuous,
  DrawerLetsShare
} from './component.env/drawer';
import Overlays from './component.env/_overlays';
// import GridList from './component.env/GridList';
// import BottomNavigation from './component.env/bottomNavigation';
import LayerBase from './component.env/LayerBase';
import Recommendation from './component.env/Recommendation';

// INFO: https://qiita.com/peutes/items/d74e5758a36478fbc039
// document.addEventListener('touchend', event => {
//   event.preventDefault();
// }, false);
disableUsersZoom();
function disableUsersZoom() {
  // for zoom with multiple fingers
  document.addEventListener('touchstart', event => {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }, true);

  // for zoom with double tap.
  let lastTouch = 0;
  document.addEventListener('touchend', event => {
    const now = window.performance.now();
    if (now - lastTouch <= 500) {
      event.preventDefault();
    }
    lastTouch = now;
  }, true);
}

window.$ = $;

window.dat = App;

// TODO:
// - シングルのときの画像リンク切れのアイコンの位置が変

export default class extends Component {

  // INFO: 子コンポーネント
  recommendation;

  constructor() {
    super();

    // TODO: 動いていない
    startLoading();

    window.app = this;

    $(window).on('scroll', loadImage);

    $(window).on('popstate', (e)=> {
      this.setState({});
      loadImage();
    });

    window.dat.doAfterLoading = ()=> {
      stopLoading();
      this.setState({});
      loadImage();
    };

    if(window.dat.session) {
      setInterval(()=> {
        new DrawerLetsShare().create();
      }, 1000 * 60 * 1);
    }
    else {
      new DrawerConspicuous().create();
    }
  }

  render() {
    // INFO: 源のdataを書き換えてはいけない
    // Object.assign(window.dat, window.dat[query('method')](query('param')));
    const dat = window.dat[query('method')](query('param'));

    const imageID = query('method') === 'image' && query('param') && query('param').id;

    return (
    <div className="App">
      <LayerBase images={dat.images} imageID={imageID} />

      {/*INFO: LayerBaseより手前にだしたいものはこの中へ（position: fixed非推奨。ボタンが被る）*/}
      <div className="component-layer layer-2" style={{ top: 55 }}>
        <div id="drawer"></div>

        <div className="frombottom">
          {/*新しい画像 毎日20枚以上更新！
          <Fab
            onClick={()=> $('#component-login').show(300).find('.toSwitchSignUp').click()}
            variant="extended"
            size="medium"
            className="button"
            aria-label="Add"
            style={{ margin: '0 10px 25px' }}
          >
            <PlayArrowIcon className="poyooon" />
            ログイン
            <div className="balloon" position="top">
              👇登録してアプリのようにホーム画面に追加しよう！
              🌟このアプリをホーム画面に追加できるようになりました
            </div>
          </Fab>
          */}
          <Recommendation
            instance={(o)=> this.recommendation = o}
            imageID={imageID}
          />
        </div>
      </div>

      {/* INFO: from this line z-index: 1300 */}

      <DrawerTemporary classes={{}} />

      {/*INFO: Drawerよりも手前に出したいものはこの中へ*/}
      <Overlays />

      {/*INFO: 何よりも手前に出したいものはこの中へ*/}
      <div id="layer-appMessages" className="component-layer" style={{ zIndex: 1301 }}>
        <div className="loadingLine">
          <span className="expand"></span>
        </div>
        <div className="alerts"></div>
      </div>
    </div>
    );
  }
};
