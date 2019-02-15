import $ from 'jquery';
import Toast from '../object/Toast';

// ！！！！！注意間違えて本番にやらないように！！！！！
// export const domain = "http://0.0.0.0:3000";
export const domain = "https://with-one-account-prd.herokuapp.com";

export const getName = function() {
  if (window.app && window.app.session && window.app.session.id)
    return `${window.app.session.id} ${window.app.session.email}`;
  else
    return undefined;
}

export const getPropsToShare = function() {
  const t = encodeURI('Tumblrより画像収拾が8.3倍捗ると話題『nonStop』　pic.twitter.com/WREvim9ydM　リンク: ');
  const u = encodeURI('https://nonstop-vr.firebaseapp.com/');
  const h = encodeURI('nonstopVr');
  const o = encodeURI(window.location.href);
  return {
    href: `https://twitter.com/intent/tweet?text=${t}&url=${u}&original_referer=${o}&hashtags=${h}`,
    onClick: ()=> {
      localStorage.setItem('app.nonstop.time.lastShared', new Date().getTime())
      if (window.app.session)
        window.slack.postMessage(window.app.session.id + 'さんが拡散しようとしています');
      document.app.setState({});
    },
    target: '_blank'
  };
};

export const signup = function() {
  var dat;
  dat = {};
  dat.email = $('#component-login .email').val();
  dat.password = $('#component-login .password').val();
  if (isInvalid(dat)) {
    return;
  }
  startLoading();
  $.post(domain + '/users/', dat)
  .fail(function(dat) {
    new Toast(dat.responseJSON.toast, true);
    stopLoading();
  })
  .done(function() {
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
    stopLoading();
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
  const t = setTimeout(()=> {
    stopLoading($el);
    new Toast('ネットワーク環境をお確かめの上、リロードしてください', true);
  }, 1000 * 10);
  (window.timers || (window.timers = [])).push(t);
  return $el;
};

export const stopLoading = function($el = $('body > .loadingLine')) {
  clearTimeout((window.timers || (window.timers = [])).pop());
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
