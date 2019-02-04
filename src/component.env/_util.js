import $ from 'jquery';
import Toast from '../object/Toast';

// ！！！！！注意間違えて本番にやらないように！！！！！
// export const domain = "http://0.0.0.0:3000";
export const domain = "https://with-one-account-prd.herokuapp.com";

export const signup = function() {
  var dat;
  dat = {};
  dat.email = $('#component-login .email').val();
  dat.password = $('#component-login .password').val();
  if (isInvalid(dat)) {
    return;
  }
  startLoading();
  $.post(domain + '/users/', dat).fail(function(dat) {
    new Toast(dat.responseJSON.toast, true);
  }).done(function() {
    window.slack.postMessage(window.slackMessage.signup('新しい人'));

    login(dat);
  });
};

export const logout = function() {
  localStorage.removeItem('app.nonstop.session.token')
  setTimeout(()=> { window.location.href = '/'; }, 1000);
};

export const login = function(dat) {
  if (dat == null) {
    dat = {};
  }
  dat.email = dat.email || $('#component-login .email').val();
  dat.password = dat.password || $('#component-login .password').val();
  if (isInvalid(dat)) {
    return;
  }
  startLoading();
  return $.ajax({
    type: 'POST',
    url: domain + '/users/login',
    data: dat,
  })
  .fail(function(dat) {
    new Toast(dat.responseJSON.toast, true);
  })
  .done(function(dat) {
    window.slack.postMessage(window.slackMessage.login(`${dat.session.id} ${dat.session.email}`));

  	localStorage.setItem('app.nonstop.session.token', dat.session.token);
    setTimeout(()=> window.location.reload(), 1000);
  });
};

const isInvalid = function(dat) {
  return isEmpty(dat) || !isValidEmail(dat.email);
};

const isValidEmail = function(email) {
  return true;
};

const isEmpty = function(dat) {
  return false;
};

export const showWebview = function(url) {
  startLoading();
  $('#webview').fadeIn(400);
  $('#webview iframe').attr('src', url);
  $('#webview iframe').animate({
    top: 0
  }, 500);
  $('#webview .close').on('click', function() {
    $('#webview iframe').removeAttr('style');
    $('#webview iframe').removeAttr('src');
  });
  $('#webview iframe').on('load', function() {
    stopLoading();
  });
};

export const isAndroid = function() {
  return navigator.userAgent.indexOf('Android') > 0;
};

/**

@param {string} name - 引数にURLクエリのkeyをいれると、jsが評価できる値を返す

例)クエリが次の場合: `?hoge={}&foo=[1,2]&bar=true&piyo&fuga=hensu`
- query('hoge') // {}
- query('foo') // [1,2]
- query('bar') // true
- query('piyo') // undefined
- query('fuga') // エラー
- query('hogera') // undefined
*/
export const query = window.query = function(name, isRaw = false) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.search);
    if (results === null)
      return undefined;
    var decoded = decodeURIComponent( results[1].replace(/\+/g, ' ') );
    if (isRaw)
      return decoded;
    else
      return JSON.parse(decoded);
}

/**
@return {boolean} - そのkeyがあるかないか
*/
export function existParameter(name) {
    var v = window.location.search.match(name)
    return v ? true : false;
}

export const countUp = function(key) {
  var a;
  a = [];
  a[key] = JSON.parse(localStorage.getItem(key));
  if (a[key] === null) {
    a[key] = 0;
  }
  localStorage.setItem(key, JSON.stringify(++a[key]));
  return a[key];
};

export const getCount = (key)=> {
  const v = localStorage.getItem(key);
  return v === null ? 0 : JSON.parse(v);
};

export const startLoading = function() {
  const $el = $(`
<div class="loadingLine">
  <span class="expand"></span>
</div>
  `).appendTo('body').show(300);
  setTimeout(()=> stopLoading($el), 5000);
  return $el;
};

export const stopLoading = function($el) {
  $el.hide(300, ()=> {
    $el.remove();
  });
};

// INFO: https://qiita.com/peutes/items/d74e5758a36478fbc039
// document.addEventListener('touchend', event => {
//   event.preventDefault();
// }, false);
export function disableUsersZoom() {
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
