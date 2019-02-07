
//============================================================================
// 80点の導線✨
// 80点の導線✨
// 80点の導線✨
// 80点の導線✨
// 80点の導線✨
// 80点の導線✨
// 80点の導線✨
// - 前回のshuffleを記憶したい（popstate時に復元
//============================================================================

import React, { Component } from 'react';
import $ from 'jquery';
import 'jquery.transit';
import './object/$';
import './object/Slack';
import App from './object/App';
import DrawerTemporary from './component/DrawerTemporary';
import './component/balloon.css';
import {
  startLoading,
  stopLoading,
  query,
  disableUsersZoom
} from './component.env/_util';
import './component.env/dialog.css';
// import Overlays from './component.env/_overlays';
import LayerBase from './component.env/LayerBase';
import LayerFront from './component.env/LayerFront';
import DialogWhatIsThisApp from './component.env/DialogWhatIsThisApp';
import DialogLetsShare from './component.env/DialogLetsShare';

// disableUsersZoom();

window.$ = $;
window.app = new App();

export default class extends Component {

  // INFO: 子コンポーネントら
  cRecommendation = null;
  cLayerBase = null;

  state = {
    conspicuousShowingIndex: 2,
    DialogWhatIsThisAppOpen: true,
    DialogLetsShareOpen: true,
    DialogReport: false,
  };

  updateHistoryState() {
    window.Route.updateState({
      // x: LayerBase_scrollTop: $('.LayerBase .ReactList').scrollTop(),
      LayerBase_scrollIndex: this.cLayerBase.getScrollIndex(),
      imagesHorizontal_scrollLeft: $('.component-images-horizontal').scrollLeft(),
      areaRecommendation_open: $('.area-recommendation').is(':visible')
    });
  }

  readHistoryState() {
    return window.history.state;
  }

  constructor() {
    super();

    window.Route.on('afterPushing', (state)=> {
      this.setState({});
      this.cRecommendation.setState({ open: false });
      this.cLayerBase.setState({ scrollIndex: 0 });
    });

    window.Route.on('beforePushing', ()=> {
      this.updateHistoryState();
    });

    window.Route.on('popstate', ()=> {
      this.setState({});
      const {
        LayerBase_scrollIndex,
        imagesHorizontal_scrollLeft,
        areaRecommendation_open
      } = this.readHistoryState();

      this.cRecommendation.setState({ open: !!areaRecommendation_open });
      this.cLayerBase.setState({ scrollIndex: LayerBase_scrollIndex || 0 });
    });


    const $el = startLoading();

    window.app.doAfterLoading = ()=> {
      stopLoading($el);
      this.setState({});
    };


    setInterval(()=> {
      this.setState({ DialogLetsShareOpen: true });
    },
    // INFO: 2.5分
    // 1000 * 60 * 2.5
    // INFO: 5分
    1000 * 60 * 5);

    document.app = this;
  }

  render() {
    return (
    <div className="App">

      <DrawerTemporary classes={{}} />

      {!window.app.isLogined() &&
        <DialogWhatIsThisApp open={this.state.DialogWhatIsThisAppOpen} onClose={()=> this.setState({ DialogWhatIsThisAppOpen: false })} />}

      {window.app.isLogined() &&
        <DialogLetsShare open={this.state.DialogLetsShareOpen} onClose={()=> this.setState({ DialogLetsShareOpen: false })} />}


      {/*
      TODO:
      material-uiの`z-index: 1300`などを持ってるコンポーネントらは、<App>の外にappendしている。
      よって、いくらここで大きい数値を与えても、手前にはこない
      need fix.
      */}

      {/*<Overlays />*/}

      <div id="layer-appMessages" className="component-layer" style={{ zIndex: 1301 }}>
        <div className="alerts"></div>
      </div>


      <LayerBase ref={(c)=> this.cLayerBase = c} />

      {/*INFO: LayerBaseより手前にだしたいものはこの中へ（position: fixed非推奨。ボタンが被る）*/}
      <LayerFront />
    </div>
    );
  }
};
