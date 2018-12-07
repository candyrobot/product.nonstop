import $ from 'jquery';
import './old';
import './old.css';
import drawer from './component.env/drawer';
import gridList from './component.env/gridList';
import bottomNavigation from './component.env/bottomNavigation';

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

$(`
<div class="layer-1">
  ${gridList}
</div>

<div class="component-layer layer-2">
  ${drawer}
  <div class="frombottom">
    <div class="row"></div>
    <div class="area-recommendation" style="display: none">
      <h4>関連</h4>
      <div class="component-images-horizontal"></div>
      <div class="close" onclick="$(this).parent().hide(300)">×</div>
    </div>
    ${bottomNavigation}
  </div>
</div>

<div class="component-layer">
  <div id="component-login" class="component-overlay" style="display: none;">
    <div class="small">忘れないようにメモを。</div>
    <input type="text" class="email" name="email" placeholder="email">
    <input type="password" class="password" name="password" placeholder="password">
    <div class="">
      <button onclick="login()">ログイン</button>
      <div class="small"
      onclick="$(this).parent().hide(300); $(this).parent().next().show(300)">
      　新規登録 ＞
      </div>
    </div>
    <div class="" style="display: none">
      <button onclick="signup()">サインアップ</button>
      <div class="small"
      onclick="$(this).parent().hide(300); $(this).parent().prev().show(300)">
      ＜ 戻る　
      </div>
    </div>
    <div class="close" onclick="$(this).parent().hide(300)">×</div>
  </div>

  <div id="component-logout" class="component-overlay" style="display: none;">
    <h1>＼(^o^)／</h1>
    <h5>xxxxxxxxxx@xxxxx.xxx</h5>
    <button onclick="logout()">ログアウト</button>
    <div class="close" onclick="$(this).parent().hide(300)">×</div>
  </div>

  <div id="webview" class="component-overlay" style="display: none;">
    <div class="frombottom">
      <p>やり方を動画で解説</p>

      <iframe frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

      <!-- <iframe src="" frameborder="0"></iframe> -->
    </div>
    <div class="close" onclick="$(this).parent().fadeOut(400)">×</div>
  </div>
</div>

<div id="layer-appMessages" class="component-layer">
  <div class="loadingLine">
    <span class="expand"></span>
  </div>
  <div class="alerts"></div>
</div>

<script>
  initializeApp()
</script>
`).appendTo('body');
