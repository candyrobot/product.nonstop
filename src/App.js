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
  query,
  disableUsersZoom
} from './component.env/_util';
import Overlays from './component.env/_overlays';
// import GridList from './component.env/GridList';
// import BottomNavigation from './component.env/bottomNavigation';
import LayerBase from './component.env/LayerBase';
import Recommendation from './component.env/Recommendation';
import Conspicuous from './component.env/Conspicuous';


// INFO: これが何なのかは秀明にきいてねw
import Hideaki from './component.env/Hideaki';


// disableUsersZoom();


window.$ = $;

window.dat = App;

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
      window.app.recommendation.setState({ open: window.history.state && window.history.state.areaRecommendation_open });
      this.setState({});
      loadImage();
    });

    window.dat.doAfterLoading = ()=> {
      stopLoading();
      this.setState({});
      loadImage();
    };

    // if(window.dat.session) {
    //   setInterval(()=> {
    //     new DrawerLetsShare().create();
    //   }, 1000 * 60 * 1);
    // }
    // else {
    //   debugger
    //   new DrawerConspicuous().create();
    // }
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
        <Conspicuous showingIndex={2} ref={(c)=> window.c = c} />

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

      {query('hideaki') === 1 && <Hideaki />}

    </div>
    );
  }
};
