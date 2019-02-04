import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import $ from 'jquery';
import {
  query
} from '../component.env/_util';
import Recommendation from '../component.env/Recommendation';
import ButtonToggleFavorite from '../component.env/ButtonToggleFavorite';

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
        {imageID ?
          <ButtonToggleFavorite
            fab={true}
            image={window.app.images.find(imageID)}
            guide={!window.app.session}
            onClick={this.onClickOnFavorite}
          />
          :
          <Fab
            onClick={()=> $('#component-login').show(300)}
            variant="extended"
            size="medium"
            className="button"
            aria-label="Add"
            style={{ margin: '0 10px 25px' }}
          >
            <PlayArrowIcon className="poyooon" />
            ログイン

            <div className="balloon" position="top">
              新しい画像 毎日20枚以上更新！🌟
              {/*
              👇登録してアプリのようにホーム画面に追加しよう！
              🌟このアプリをホーム画面に追加できるようになりました*/}
            </div>
          </Fab>
        }
        <Recommendation
          initialDisplayNum="6"
          ref={(c)=> document.app.cRecommendation = c}
          imageID={imageID}
        />
      </div>
    </div>
    );
  }
}

          // <Fab color="secondary" className="Fab" aria-label="Edit">
          //   <Icon>edit_icon</Icon>
          // </Fab>



