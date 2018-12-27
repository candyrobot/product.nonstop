import $ from 'jquery';
import Toast from '../object/Toast';

// ！！！！！注意間違えて本番にやらないように！！！！！
// export const domain = "http://0.0.0.0:3000";
export const domain = "https://with-one-account-prd.herokuapp.com";

$.ajaxSetup({
  headers: {
  	'X-CSRF-Token': localStorage.getItem('app.nonstop.session.token')
  }
});

export const loadImage = ()=> {
  $('[data-load-image]:not([style*="background"])').inView().each(function() {
    var url = $(this).data('load-image');
    console.log(url);
    $(this).css({
      backgroundImage: `url(${url})`
    });
  });
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
  $.post(domain + '/users/', dat).fail(function(dat) {
    new Toast(dat.responseJSON.toast, true);
  }).done(function() {
    window.login(dat);
  });
};

export const logout = function() {
  localStorage.removeItem('app.nonstop.session.token')
  setTimeout('window.location.href = "/"', 1000);
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
  return $.post(domain + '/users/login', dat)
  .fail(function(dat) {
    new Toast(dat.responseJSON.toast, true);
  })
  .done(function(dat) {
  	localStorage.setItem('app.nonstop.session.token', dat.session.token);
    setTimeout('window.location.reload()', 1000);
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
- getUrlParameter('hoge') // {}
- getUrlParameter('foo') // [1,2]
- getUrlParameter('bar') // true
- getUrlParameter('piyo') // null
- getUrlParameter('fuga') // エラー
- getUrlParameter('hogera') // null
*/
export function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.search);
    return results === null ? null : JSON.parse(decodeURIComponent( results[1].replace(/\+/g, ' ') ));
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
  $('.loadingLine').show(300);
  return setTimeout('stopLoading()', 5000);
};

export const stopLoading = window.stopLoading = function() {
  return $('.loadingLine').hide(300);
};
