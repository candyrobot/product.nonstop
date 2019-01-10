import React, { Component } from 'react';
import $ from 'jquery';
import './drawer.css';

export default class extends Component {
  state = {
    // INFO: アニメーション中はラグがあるためこれを使って表示/非表示を行う
    realyShowingIndex: 0
  };
  render() {
    const { showingIndex } = this.props;

    console.log(1)

    $('.Conspicuous').hide(300, ()=> {
      this.setState({ realyShowingIndex: showingIndex })
    });

    if (this.state.realyShowingIndex === 0)
      return (
      <div id="component-conspicuous"
        className="Conspicuous"
        ref={(el)=> $(el).show(300)}
      >
        <i className="fab fa-twitter"></i>
        <h3 className="title">
          TwitterやTumblrより効率的に画像を収集しませんか？
        </h3>
        <p>※Tumblrは12/17以降、<br />成人向けの一切の画像が削除されました</p>
        <p>百聞は一見にしかず。</p>
        <p>まずは使ってみて下さい！</p>
        <div className="close" onClick={(e)=> $(e.target).parent().hide(300)}>×</div>
      </div>
      );
    if (this.state.realyShowingIndex === 1)
      return (
      <div id="component-letsSignup" 
        className="Conspicuous component-suggestion paper"
        ref={(el)=> $(el).show(300)}
      >
        <h3>登録してあなただけのお気入りBOXを🌟</h3>
        <p>
          <span className="button-plane" onClick={()=> $('#component-login').show(300)}>ログイン</span>
          <button className="button" onClick={()=> $('#component-login').show(300).find('.toSwitchSignUp').click()}>アカウント作成</button>
        </p>
        <div className="close" onClick={(e)=> $(e.target).parent().hide(300)}>×</div>
      </div>
      );
    if (this.state.realyShowingIndex === 2) {
      const t = encodeURI('Tumblrより画像収拾が8.3倍捗ると話題『nonStop』　pic.twitter.com/WREvim9ydM　リンク: ');
      const u = encodeURI('https://nonstop-vr.firebaseapp.com/');
      const h = encodeURI('nonstopVr');
      const o = encodeURI(window.location.href);
      return (
      <div id="component-LetsShare"
        className="Conspicuous component-suggestion paper"
        ref={(el)=> $(el).show(300)}
      >
        <h3 style={{ fontSize: 18, textIndent: '.5em' }}>
          拡散希望🌟
        </h3>
        <p>
          まだまだ画像不足！<br />
          拡散して毎日画像を投稿してもらおう！
        </p>
        <p text-align="center">
          <a
            target="_blank"
            style={{ padding: '.5em 1em' }}
            className="button"
            href="
            https://twitter.com/intent/tweet?text=${t}&url=${u}&original_referer=${o}&hashtags=${h}
            "
            >
            <i className="fab fa-twitter"></i>
            画像を増やしてもらう🌟
          </a>
        </p>
        <div className="close" onClick={(e)=> $(e.target).parent().hide(300)}>×</div>
      </div>
      );
    }
  }
}

// class Drawer {
//   create() {
//     // TODO: いまは閉じてもshowingHtmlに残ってるので正しく比較できていない
//     // if(showingHtml === this.html())
//     //   return;
//     $('#drawer > *').length ?
//       $('#drawer > *').hide(300, ()=> this.render()) : this.render();
//     return this;
//   }

//   render() {
//     $('#drawer').html(this.html());
//     $('#drawer > *').show(300);

//     // xxx.show().css({ y: -100 }).transit({ y: 0 }, 500, 'easeOutBack');

//     showingHtml = this.html();
//   }
// }

// export class DrawerConspicuous extends Drawer {
//   html() {
//     return `
//     <div id="component-conspicuous" style="display: none">
//       <i class="fab fa-twitter"></i>
//       <h3 class="title">
//         TwitterやTumblrより効率的に画像を収集しませんか？
//       </h3>
//       <p>※Tumblrは12/17以降、<br>成人向けの一切の画像が削除されました</p>
//       <p>百聞は一見にしかず。</p>
//       <p>まずは使ってみて下さい！</p>
//       <div class="close" onclick="$(this).parent().hide(300)">×</div>
//     </div>`
//   }
// }

// export class DrawerLetsSignup extends Drawer {
//   html() {
//     return `
//     <div id="component-letsSignup" class="component-suggestion paper" style="display: none">
//       <h3>登録してあなただけのお気入りBOXを🌟</h3>
//       <p>
//         <span class="button-plane" onclick="$('#component-login').show(300)">ログイン</span>
//         <button class="button" onclick="$('#component-login').show(300).find('.toSwitchSignUp').click()">アカウント作成</button>
//       </p>
//       <div class="close" onclick="$(this).parent().hide(300)">×</div>
//     </div>`
//   }
// }

// export class DrawerPost extends Drawer {
//   html() {
//     return `
//     <div id="component-post" style="display: none">
//       <div>
//         <input type="text" placeholder="画像のURL">
//       </div>
//       <button class="button" onclick="post($('#component-post input').val())">投稿</button>
//     </div>`
//   }
// }

// export class DrawerLetsShare extends Drawer {
//   // INFO: https://blog.ikunaga0.com/twitter-com-intent-tweet/
//   html() {
//     const t = encodeURI('Tumblrより画像収拾が8.3倍捗ると話題『nonStop』　pic.twitter.com/WREvim9ydM　リンク: ');
//     const u = encodeURI('https://nonstop-vr.firebaseapp.com/');
//     const h = encodeURI('nonstopVr');
//     const o = encodeURI(window.location.href);
//     return `
//     <div id="component-LetsShare" class="component-suggestion paper" style="display: none">
//       <h3 style="font-size: 18px; text-indent: .5em">
//         拡散希望🌟
//       </h3>
//       <p>
//         まだまだ画像不足！<br>
//         拡散して毎日画像を投稿してもらおう！
//       </p>
//       <p text-align="center">
//         <a
//           target="_blank"
//           style="padding: .5em 1em"
//           class="button"
//           href="
//           https://twitter.com/intent/tweet?text=${t}&url=${u}&original_referer=${o}&hashtags=${h}
//           "
//           >
//           <i class="fab fa-twitter"></i>
//           画像を増やしてもらう🌟
//         </a>
//       </p>
//       <div class="close" onclick="$(this).parent().hide(300)">×</div>
//     </div>`
//   }
// }
