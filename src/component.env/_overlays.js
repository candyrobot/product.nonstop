import $ from 'jquery';
import {
  isAndroid
} from './_util';
import './overlay.css';
export default `
<div id="component-login" class="component-overlay flex-justify-center" style="display: none;">
  <div class="small">忘れないようにメモを。</div>
  <input type="text" class="email" name="email" placeholder="email">
  <input type="password" class="password" name="password" placeholder="password">
  <div class="">
    <button onclick="login()">ログイン</button>
    <div class="small toSwitchSignUp"
    onclick="$(this).parent().hide(300); $(this).parent().next().show(300)">
    　新規登録 ＞
    </div>
  </div>
  <div class="" style="display: none">
    <button onclick="signup()">サインアップ</button>
    <div class="small"
    onclick="$(this).parent().hide(300); $(this).parent().prev().show(300)">
    ＜ ログイン　
    </div>
  </div>
  <div class="close" onclick="$(this).parent().hide(300)">×</div>
</div>

<div id="component-logout" class="component-overlay flex-justify-center" style="display: none;">
  <h1>＼(^o^)／</h1>
  <h5>xxxxxxxxxx@xxxxx.xxx</h5>
  <button onclick="logout()">ログアウト</button>
  <div class="close" onclick="$(this).parent().hide(300)">×</div>
</div>

<div id="webview" class="component-overlay" style="display: none;">
  <div class="component-mediabox">
    <img src="https://nonstop-vr.firebaseapp.com//icons.nonstop/icon-384x384.png">
    <h4 class="title">やり方を動画で解説</h4>
    <div class="desc">
      ${isAndroid() ? 'Chrome' : 'Safari'}でホーム画面に
      <br>追加できます。
    </div>
  </div>
  <div class="frombottom">
    <iframe frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

    <!-- <iframe src="" frameborder="0"></iframe> -->
  </div>
  <div class="close" onclick="$(this).parent().fadeOut(400)">×</div>
</div>
`;
