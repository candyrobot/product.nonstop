import React, { Component } from 'react';
import $ from 'jquery';
import {
  isAndroid,
  login,
  signup,
  logout
} from './_util';
import './overlay.css';
export default class extends Component {
  render() {
    return (
    <div className="component-layer">
      <div id="component-login"
        className="component-overlay flex-justify-center" style={{ display: 'none' }}>
        <div className="small">忘れないようにメモを。</div>
        <input type="text" className="email" name="email" placeholder="email" />
        <input type="password" className="password" name="password" placeholder="password" />
        <div className="">
          <button className="button" onClick={()=> login()}>ログイン</button>
          <div className="small toSwitchSignUp"
          onClick={(e)=> {
            $(e.target).parent().hide(300);
            $(e.target).parent().next().show(300);
          }}>
          　新規登録 ＞
          </div>
        </div>
        <div className="" style={{ display: 'none' }}>
          <button className="button" onClick={()=> signup()}>サインアップ</button>
          <div className="small"
          onClick={(e)=> {
            $(e.target).parent().hide(300);
            $(e.target).parent().prev().show(300);
          }}>
          ＜ ログイン　
          </div>
        </div>
        <div className="close" onClick={(e)=> $(e.target).parent().hide(300)}>×</div>
      </div>

      <div id="component-logout" className="component-overlay flex-justify-center" style={{ display: 'none' }}>
        <h1>＼(^o^)／</h1>
        <h5>xxxxxxxxxx@xxxxx.xxx</h5>
        <button className="button" onClick={()=> logout()}>ログアウト</button>
        <div className="close" onClick={(e)=> $(e.target).parent().hide(300)}>×</div>
      </div>

      <div id="webview" className="component-overlay" style={{ display: 'none' }}>
        <div className="component-mediabox">
          <img src="https://nonstop-vr.firebaseapp.com//icons.nonstop/icon-384x384.png" />
          <h4 className="title">やり方を動画で解説</h4>
          <div className="desc">
            {isAndroid() ? 'Chrome' : 'Safari'}でホーム画面に
            <br />追加できます。
          </div>
        </div>
        <div className="frombottom">
          <iframe frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
        <div className="close" onClick={(e)=> $(e.target).parent().fadeOut(400)}>×</div>
      </div>
    </div>
    )
  }
}
