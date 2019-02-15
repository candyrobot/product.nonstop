import React, { Component } from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AddHomescreenIcon from '@material-ui/icons/AddToHomeScreen';
// import AddHomescreenIcon from '@material-ui/icons/GetApp';
import $ from 'jquery';
import {
  query
} from '../component.env/_util';
import Button from '../component/Button';
import BottomNavigation from '../component.env/BottomNavigation';
import Recommendation from '../component.env/Recommendation';
import ButtonToggleFavorite from '../component.env/ButtonToggleFavorite';
import OverlayToSign from '../component.env/OverlayToSign';
import OverlayHowToAddToHomescreen from '../component.env/OverlayHowToAddToHomescreen';

export default class extends Component {

  cRecommendation = null;

  onClickOnFavorite(instance) {
    if (instance.on);
    else {
      document.app.cRecommendation.setState({ open: true });
    }
  }

  render() {
    const imageID = query('method') === 'image' && query('param') && query('param').id;

    return (
    <div className="LayerFront component-layer" style={{ top: 55 }}>

      {/*<Conspicuous showingIndex={this.state.conspicuousShowingIndex} />*/}

      <div className="frombottom">
        {(()=> {

          if (imageID) {
            return <ButtonToggleFavorite
              rounded={true}
              image={window.app.images.find(imageID)}
              guide={!window.app.session}
              onClick={this.onClickOnFavorite}
            />
          }

          else if (!window.Me.isLogined()) {
            return <Button
              onClick={()=> OverlayToSign.create().find('.toSwitchSignUp').click()}
              icon={<PlayArrowIcon className="poyooon" />}
              primary={'アカウント作成'}
              secondary={'新しい画像 毎日20枚以上更新！🌟'}
            />
          }

          else if (window.Me.isLogined() && !window.Me.isAddedToHomescreen()) {
            return <Button
              style={{ fontSize: 12 }}
              onClick={()=> OverlayHowToAddToHomescreen.create()}
              icon={<AddHomescreenIcon className="poyooon" />}
              primary={'やり方を見る: スマホのホーム画面に追加💡'}
              secondary={'アプリのようにホーム画面に追加しよう！🌟'}
            />
          }

          else {
            return null;
          }

        })()}
        <Recommendation
          initialDisplayNum="6"
          ref={(c)=> document.app.cRecommendation = c}
          imageID={imageID}
        />
        {/*<BottomNavigation />*/}
      </div>
    </div>
    );
  }
}
