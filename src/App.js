
//============================================================================
// 80点の導線✨
// 80点の導線✨
// 80点の導線✨
// 80点の導線✨
// 80点の導線✨
// 80点の導線✨
// 80点の導線✨
//============================================================================

import React, { Component } from 'react';
import $ from 'jquery';
import 'jquery.transit';
import './object/$';
import './object/Slack';
import App from './object/App';
import LocalStorage from './object/LocalStorage';
import Route from './object.env/Route';
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
import DialogAsHinanbasho from './component.env/DialogAsHinanbasho';
import DialogLetsShare from './component.env/DialogLetsShare';
import DialogCanDoWithLogin from './component.env/DialogCanDoWithLogin';

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
    DialogAsHinanbashoOpen: false,
    DialogLetsShareOpen: true,
    DialogReport: false,
  };

  updateHistoryState() {
    Route.updateState({
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

    Route.on('afterPushing', (state)=> {
      this.setState({});
      this.cRecommendation.setState({ open: false });
      this.cLayerBase.setState({ scrollIndex: 0 });
    });

    Route.on('beforePushing', ()=> {
      this.updateHistoryState();
    });

    Route.on('popstate', ()=> {
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

      {window.app.isLoaded() && !window.Me.isLogined() &&
        <DialogCanDoWithLogin ref={(c)=> window.cDialogCanDoWithLogin = c} />
      }

      {window.app.isLoaded() && !window.Me.isLogined() &&
        <DialogWhatIsThisApp open={this.state.DialogWhatIsThisAppOpen} onClose={()=> {
          this.setState({ DialogWhatIsThisAppOpen: false });
          this.setState({ DialogAsHinanbashoOpen: true })
        }} />
      }

      {window.app.isLoaded() && !window.Me.isLogined() &&
        <DialogAsHinanbasho open={this.state.DialogAsHinanbashoOpen} onClose={()=> this.setState({ DialogAsHinanbashoOpen: false })} />
      }

      {window.app.isLoaded() && window.Me.isLogined() &&
        <DialogLetsShare open={this.state.DialogLetsShareOpen} onClose={()=> this.setState({ DialogLetsShareOpen: false })} />
      }


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
