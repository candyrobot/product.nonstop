import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import $ from 'jquery';
import 'jquery.transit';

import './object/$';
import './object/Array';
import './object/FileList';
import './object/firebase';

import Image from './model/Image';

import DrawerTemporary from './component/DrawerTemporary';
import './component/balloon.css';

// TODO:
// - 遅い原因: imagesですべてのコンポーネントを呼んでるから？
// - 他の TODO: をgrepして確認する
// - リダイレクト
// - アップロードした画像が新着にでてこない
  // - firestoreにドキュメントが追加されないのが原因 -> prdにfunctionをdeployすれば良さそう


import {
  loadImage,
  domain,
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

// TODO:
// - シングルのときの画像リンク切れのアイコンの位置が変

export default class extends Component {

  // INFO: 子コンポーネント
  recommendation;

  constructor() {
    super();

    // TODO: logicとviewを分ける
    // new App()[query('method')](query('param'));

    window.app = this;

    this.initializeApp();

    $(window).on('popstate', (e)=> {
      this.setState({});
      loadImage();
    });
  }

  initializeApp() {
    $(window).on('scroll', loadImage);


    // TODO: herokuが重い。改善しないと表示が遅い
    $.get(domain + '/application' + window.location.search, (dat)=> {

      // INFO: firebaseと統一しておく
      dat.images = dat.images.map((i)=> (i.created_at = new Date(i.created_at), i));

      console.log(dat);
      window.dat = dat;

      // this.setState({});
      // loadImage();

      window.firebase.firestore().getImages((images)=> {
        window.dat.images = window.dat.images.concat(images).shuffle();

        this.setState({});
        loadImage();
      });

      if(window.dat.session) {
        setInterval(()=> {
          new DrawerLetsShare().create();
        }, 1000 * 60 * 1);
      }
      else {
        new DrawerConspicuous().create();
      }
    });
  }

  render() {
    let image;
    if (window.dat
      && query('method') === 'images'
      && query('param')
      && query('param').id
    ) {
      image = window.dat.images.find(query('param').id);
    }
    return (
    <div className="App">
      <LayerBase image={image} />

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
            image={image}
          />
        </div>
      </div>

      {/* from this line z-index: 1300 */}
      <DrawerTemporary classes={{}} />

      <Overlays />

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
