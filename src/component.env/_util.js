import $ from 'jquery';

// export const domain = "http://0.0.0.0:3000";
export const domain = "https://with-one-account-prd.herokuapp.com";

$.ajaxSetup({
  headers: {
  	'X-CSRF-Token': localStorage.getItem('app.nonstop.session.token')
  }
});

window.initializeApp = function() {
  return $.get(domain + '/application' + window.location.search, function(dat) {
    var b, imageID;
    console.log(dat);
    window.dat = dat;
    if (dat.session) {
      $('#component-actions .login').hide();
      $('#component-actions .signup').hide();
    } else {
      $('#component-actions .mypage').hide();
      $('#component-actions .favorite').hide();
    }
    setTimeout('window.showDrawer()', 1000);
    window.Route.refresh();
    $('#component-logout h1').text(window.dat.session.id);
    $('#component-logout h5').text(window.dat.session.email);
  });
};

window.signup = function() {
  var dat;
  dat = {};
  dat.email = $('#component-login .email').val();
  dat.password = $('#component-login .password').val();
  if (isInvalid(dat)) {
    return;
  }
  $.post(domain + '/users/', dat).fail(function(dat) {
    toast(dat.responseJSON.toast);
  }).done(function() {
    window.login(dat);
  });
};

window.logout = function() {
  localStorage.removeItem('app.nonstop.session.token')
  setTimeout('window.location.reload()', 1000);
};

window.login = function(dat) {
  if (dat == null) {
    dat = {};
  }
  dat.email = dat.email || $('#component-login .email').val();
  dat.password = dat.password || $('#component-login .password').val();
  if (isInvalid(dat)) {
    return;
  }
  return $.post(domain + '/users/login', dat)
  .fail(function(dat) {
    toast(dat.responseJSON.toast);
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

window.post = function() {
  const url = $('#component-post input').val();
  if(url.match(/^http/) === null)
    toast('httpから始まるURLで入力して下さい。不正な値は後日削除されます', 3500);
  return $.post(domain + '/images/', {
    url: url
  }).fail(function(dat) {
    return toast(dat.responseJSON.toast);
  }).done(function() {
    return setTimeout('window.location.reload()', 1000);
  });
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

export const lazyShow = function(selector) {
  return $(selector).on('inview', function(e, isInView) {
    if (isInView) {
      return $(this)
      .nextAll(selector + ':first').nextAll(selector + ':first')
      .nextAll(selector + ':first').nextAll(selector + ':first')
      .nextAll(selector + ':first').nextAll(selector + ':first')
      .nextAll(selector + ':first').nextAll(selector + ':first')
      .fadeIn(500);
    }
  });
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
window.countUp = countUp;
export const getCount = (key)=> {
  const v = localStorage.getItem(key);
  return v === null ? 0 : JSON.parse(v);
};

export const startLoading = function() {
  $('.loadingLine').show(300);
  return setTimeout('stopLoading()', 5000);
};

export const stopLoading = function() {
  return $('.loadingLine').hide(300);
};

window.stopLoading = stopLoading;

export const deleteFav = function(imageID) {
  return $.ajax({
    type: 'DELETE',
    url: domain + '/favorites',
    data: {
      imageID: imageID
    }
  }).fail(function(dat) {
    return toast(dat.responseJSON.toast);
  });
};

export const toast = function(txt, millisec = 2500) {
  if (!txt) {
    return;
  }
  return $("<div>" + txt + "</div>").appendTo('#layer-appMessages .alerts')
  .hide().show(300, function() {
    setTimeout(()=> {
      $(this).hide(300);
    }, millisec);
  });
};

/**
 - TODO: x軸の処理を書いていない
 * @param  {Boolean} isEntire - trueで要素全体が入ったときにtrueを返す
 * @return {Boolean}          [description]
 */
$.fn.inView = function(isEntire = false) {
  return $(this).filter(function() {
    const target = {
      top: $(this).offset().top,
      bottom: $(this).offset().top + $(this).outerHeight(),
    };
    const viewable = {
      top: $(document).scrollTop(),
      bottom: $(document).scrollTop() + $(window).innerHeight()
    }
    return target.top < viewable.bottom && target.bottom > viewable.top;
  });
};
$.fn.inAlmostThere = function(threshold = 100) {
  return $(this).filter(function() {
    const target = {
      top: $(this).offset().top - threshold,
      bottom: $(this).offset().top + $(this).outerHeight() + threshold,
    };
    const viewable = {
      top: $(document).scrollTop(),
      bottom: $(document).scrollTop() + $(window).innerHeight()
    }
    return target.top < viewable.bottom && target.bottom > viewable.top;
  });
};
