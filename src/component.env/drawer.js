import $ from 'jquery';
import './drawer.css';
import {
  getCount
} from './_util';

let showingHtml = '';

class Drawer {
  create() {
    // TODO: いまは閉じてもshowingHtmlに残ってるので正しく比較できていない
    // if(showingHtml === this.html())
    //   return;
    $('#drawer > *').length ?
      $('#drawer > *').hide(300, ()=> this.render()) : this.render();
  }

  render() {
    $('#drawer').html(this.html());
    $('#drawer > *').show(300);

    // xxx.show().css({ y: -100 }).transit({ y: 0 }, 500, 'easeOutBack');

    showingHtml = this.html();
  }
}

export class DrawerConspicuous extends Drawer {
  html() {
    return `
    <div id="component-conspicuous" style="display: none">
      <i class="fab fa-twitter"></i>
      <h3 class="title">
        TwitterやTumblrより効率的に画像を収集しませんか？
      </h3>
      <p>※Tumblrは12/17以降、<br>成人向けの一切の画像が削除されます</p>
      <p>百聞は一見にしかず。</p>
      <p>まずは使ってみて下さい！</p>
      <div class="close" onclick="$(this).parent().hide(300)">×</div>
    </div>`
  }
}

export class DrawerLetsSignup extends Drawer {
  html() {
    return `
    <div id="component-letsSignup" class="component-suggestion paper" style="display: none">
      <h3>登録してあなただけのお気入りBOXを🌟</h3>
      <p>
        <span class="small" onclick="$('#component-login').show(300)">ログイン</span>
        <button onclick="$('#component-login').show(300).find('.toSwitchSignUp').click()">アカウント作成</button>
      </p>
      <div class="close" onclick="$(this).parent().hide(300)">×</div>
    </div>`
  }
}

export class DrawerPost extends Drawer {
  html() {
    return `
    <div id="component-post" style="display: none">
      <div>
        <input type="text" placeholder="画像のURL">
      </div>
      <button onclick="post($('#component-post input').val())">投稿</button>
    </div>`
  }
}

export class DrawerLetsShare extends Drawer {
  html() {
    return `
    <div id="component-LetsShare" class="component-suggestion paper" style="display: none">
      <h3 style="font-size: 18px; text-indent: .5em">拡散希望🌟</h3>
      <p>
        画像不足！<br>
        拡散してもっと画像を投稿してもらおう！
      </p>
      <p text-align="center">
        <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-size="large" data-text="Tumblrより画像収拾が8.3倍捗ると話題『nonStop』　" data-url="https://nonstop-vr.firebaseapp.com/?utm_source=twitter" data-hashtags="nonstop" data-related="rivalknockout,rivalknockout2" data-lang="ja" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      </p>
      <div class="close" onclick="$(this).parent().hide(300)">×</div>
    </div>`
  }
}
