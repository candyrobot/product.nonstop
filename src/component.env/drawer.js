import $ from 'jquery';
import './drawer.css';
export default `
<div class="drawer">
  <div id="component-post" style="display: none">
    <!-- - 頭に "http" から始まっているURLは全て受け付けられます -->
    <!-- - "data:"と書かれてあるURLは当サービスでは受け付けられません -->
    <div>
      <input type="text" placeholder="画像のURL">
    </div>
    <button onclick="post()">投稿</button>
  </div>

  <div id="component-conspicuous" style="display: none">
    <h3 class="title">
      TwitterやTumblrより効率的に画像を収集しませんか？
    </h3>
    <p>※Tumblrは12/17以降、<br>成人向けの画像は一切投稿できなくなります</p>
    <p>百聞は一見にしかず。</p>
    <p>まずは使ってみて下さい！</p>
  </div>

  <div class="component-suggestion paper" style="display: none">
    <h3>登録してあなただけのお気入りBOXを🌟</h3>
    <p>
      <span class="small" onclick="$('#component-login').show(300)">ログイン</span>
      <button onclick="$('#component-login').show(300).find('.toSwitchSignUp').click()">アカウント作成</button>
    </p>
    <div class="close" onclick="$(this).parent().hide(300)">×</div>
  </div>

  <div class="component-suggestion paper">
    <h3 style="font-size: 18px; text-indent: .5em">拡散希望🌟</h3>
    <p>
      画像不足！<br>
      拡散してもっと画像を投稿してもらおう！
    </p>
    <p text-align="center">
      <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-size="large" data-text="Tumblrより画像収拾が8.3倍捗ると話題『nonStop』　" data-url="https://nonstop-vr.firebaseapp.com/?utm_source=twitter" data-hashtags="nonstop" data-related="rivalknockout,rivalknockout2" data-lang="ja" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    </p>
    <div class="close" onclick="$(this).parent().hide(300)">×</div>
  </div>
</div>
`;

window.drawer = (index)=> {
  $('.drawer > *').hide(300, ()=> {
    $('.drawer > *').eq(index).show(300)
  })

  // xxx.show().css({ y: -100 }).transit({ y: 0 }, 500, 'easeOutBack');
};
