
//============================================================================
// 80点の導線✨
// 80点の導線✨
// 80点の導線✨
// 80点の導線✨
// 80点の導線✨
// 80点の導線✨
// 80点の導線✨
// - タップが反応しないときがある
// - スクロールが読み込まれない @画像一覧
//============================================================================

import React, { Component } from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import $ from 'jquery';
import 'jquery.transit';
import './object/$';
import App from './object/App';
import Slack, { slackMessage } from './object/Slack';
import DrawerTemporary from './component/DrawerTemporary';
import './component/balloon.css';
import {
  startLoading,
  stopLoading,
  query,
  disableUsersZoom
} from './component.env/_util';
import './component.env/dialog.css';
import Overlays from './component.env/_overlays';
import LayerBase from './component.env/LayerBase';
import Recommendation from './component.env/Recommendation';
import DialogWhatIsThisApp from './component.env/DialogWhatIsThisApp';
import DialogLetsShare from './component.env/DialogLetsShare';


// INFO: これが何なのかは秀明にきいてねw
import Hideaki from './component.env/Hideaki';

// disableUsersZoom();

window.$ = $;
window.app = new App();
window.slack = new Slack();
window.slackMessage = slackMessage;

export default class extends Component {

  // INFO: 子コンポーネント
  recommendation = null;

  // INFO: このアプリが何なのかを示すDialog
  DialogWhatIsThisApp = null;

  state = {
    conspicuousShowingIndex: 2,
    DialogWhatIsThisAppOpen: true,
    DialogLetsShareOpen: true,
    DialogReport: false,
  };

  constructor() {
    super();

    // TODO: 動いていない
    startLoading();

    document.app = this;

    $(window).on('popstate', (e)=> {
      document.app.recommendation.setState({ open: window.history.state && window.history.state.areaRecommendation_open });
      this.setState({});
    });

    window.app.doAfterLoading = ()=> {
      stopLoading();
      this.setState({});
    };

    setInterval(()=> {
      this.setState({ DialogLetsShareOpen: true });
    },
    // INFO: 2.5分
    1000 * 60 * 2.5);
  }

  render() {

    const imageID = query('method') === 'image' && query('param') && query('param').id;

    return (
    <div className="App">


      {/* INFO: from this line z-index: 1300 */}

      <DrawerTemporary classes={{}} />

      {window.app.isLoaded() && !window.app.isLogined() &&
        <DialogWhatIsThisApp open={this.state.DialogWhatIsThisAppOpen} onClose={()=> this.setState({ DialogWhatIsThisAppOpen: false })} />}

      {window.app.isLoaded() && window.app.isLogined() &&
        <DialogLetsShare open={this.state.DialogLetsShareOpen} onClose={()=> this.setState({ DialogLetsShareOpen: false })} />}


      {/* INFO: from this line z-index: 1301 */}

      <Overlays />

      <div id="layer-appMessages" className="component-layer" style={{ zIndex: 1301 }}>
        <div className="loadingLine">
          <span className="expand"></span>
        </div>
        <div className="alerts"></div>
      </div>


      {/* INFO: from this line z-index: 1400 */}

      {query('hideaki') === 1 && <Hideaki />}


      {/* INFO: from this line z-index: initial */}

      <LayerBase />

      {/*INFO: LayerBaseより手前にだしたいものはこの中へ（position: fixed非推奨。ボタンが被る）*/}
      <div className="component-layer layer-2" style={{ top: 55 }}>

        {/*<Conspicuous showingIndex={this.state.conspicuousShowingIndex} />*/}

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
            initialDisplayNum="6"
            instance={(o)=> this.recommendation = o}
            imageID={imageID}
          />
        </div>
      </div>
    </div>
    );
  }
};
