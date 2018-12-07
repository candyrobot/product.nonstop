import $ from 'jquery';
import Toggle from './component.env/Toggle';

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
      $('.component-images-horizontal').on('click', 'a', function() {
        toast('ログインすると見れます。　最高のエロ画像を探そう!🌟');
        return false;
      });
    }
    if (window.location.search.indexOf('imageID') !== -1) {
      window.renderImage(dat.images[0]);
      imageID = dat.images[0].id;
      b = !!window.dat.favorites.filter(function(fav) {
        return imageID === parseInt(fav.imageID);
      }).length;
      $('.row').html(`
        ${countUp('x') > 3 ? '' : `
          <div class="balloon">
            タップして "お気入り" に入れると…　👉
          </div>
        `}
        <div class="fav-area" onclick="$(this).prev().hide()">
          ${new Toggle('favorites', 'imageID', b).html()}
        </div>
      `)
      .find('.component-fav').on('click', function() {
        startLoading();
        if ($(this).is('.true')) {
          deleteFav(imageID).done((function(_this) {
            return function() {
              return $(_this).removeClass('true');
            };
          })(this));
        } else {
          $.post(domain + '/favorites', {
            imageID: imageID
          }).fail(function(dat) {
            return toast(dat.responseJSON.toast);
          }).done((function(_this) {
            return function() {
              return $(_this).addClass('true');
            };
          })(this));
        }
        return $.get(domain + '/images/list', {
          related: true,
          imageID: imageID
        }).done(window.renderRecommendation).always(function() {
          return stopLoading();
        });
      });
    } else if (window.location.search.indexOf('most') !== -1) {
      $('#component-actions .most').hide();
      window.renderImages();
    } else if (window.location.search.indexOf('favorite') !== -1) {
      $('#component-actions .favorite').hide();
      window.renderImages();
    } else {
      $('#component-actions .newPosts').hide();
      window.renderImages();
    }
    $('#component-logout h1').text(window.dat.session.id);
    return $('#component-logout h5').text(window.dat.session.email);
  });
};

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

window.signup = function() {
  var dat;
  dat = {};
  dat.email = $('#component-login .email').val();
  dat.password = $('#component-login .password').val();
  if (isInvalid(dat)) {
    return;
  }
  return $.post(domain + '/users/', dat).fail(function(dat) {
    return toast(dat.responseJSON.toast);
  }).done(function() {
    return window.login(dat);
  });
};

window.logout = function() {
  return $.post(domain + '/users/logout').fail(function(dat) {
    return toast(dat.responseJSON.toast);
  }).done(function() {
    return setTimeout('window.location.reload()', 1000);
  });
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
    return toast(dat.responseJSON.toast);
  })
  .done(function(dat) {
  	localStorage.setItem('app.nonstop.session.token', dat.session.token);
    return setTimeout('window.location.reload()', 1000);
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

export const isShouldNotRender = function(image) {
  return image.id === parseInt($('.fluid').attr('data-imageID')) || window.dat.favorites.filter(function(fav) {
    return parseInt(fav.imageID) === image.id;
  }).length;
};

export const sortByFrequency = function(array) {
  var frequency, uniques;
  frequency = {};
  array.forEach(function(v) {
    return frequency[v.id] = 0;
  });
  uniques = array.filter(function(v) {
    return ++frequency[v.id] === 1;
  });
  return uniques.sort(function(a, b) {
    return frequency[b.id] - frequency[a.id];
  });
};

Array.prototype.removeDuplicate = function() {
  return Array.from(new Set(this));
};

Array.prototype.serialize = function() {
  return this.reduce(function(pre, current) {
    pre.push.apply(pre, current);
    return pre;
  }, []);
};

window.post = function() {
  var url;
  url = $('#component-post input').val();
  return $.post(domain + '/images/', {
    url: url
  }).fail(function(dat) {
    return toast(dat.responseJSON.toast);
  }).done(function() {
    return setTimeout('window.location.reload()', 1000);
  });
};

export const toast = function(txt) {
  if (!txt) {
    return;
  }
  return $("<div>" + txt + "</div>").appendTo('#layer-appMessages .alerts').hide().show(300, function() {
    return setTimeout((function(_this) {
      return function() {
        return $(_this).hide(300);
      };
    })(this), 2000);
  });
};

const countUp = function(key) {
  var a;
  a = [];
  a[key] = JSON.parse(localStorage.getItem(key));
  if (a[key] === null) {
    a[key] = 0;
  }
  localStorage.setItem(key, JSON.stringify(++a[key]));
  return a[key];
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
    return $('#webview iframe').removeAttr('src');
  });
  return $('#webview iframe').on('load', function() {
    return stopLoading();
  });
};

const startLoading = function() {
  $('.loadingLine').show(300);
  return setTimeout('stopLoading()', 5000);
};

const stopLoading = function() {
  return $('.loadingLine').hide(300);
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

export const isAlmostThere = function(threshold = 100) {
  return function() {
    var target = {
      top: $(this).offset().top - threshold,
      bottom: $(this).offset().top + $(this).outerHeight() + threshold,
    };
    var viewable = {
      top: $(document).scrollTop(),
      bottom: $(document).scrollTop() + $(window).innerHeight()
    }
    return target.top < viewable.bottom && target.bottom > viewable.top;
  };
};

/**
 - TODO: x軸の処理を書いていない
 * @param  {Boolean} isEntire - trueで要素全体が入ったときにtrueを返す
 * @return {Boolean}          [description]
 */
$.fn.isInview = function(isEntire = false) {
  var target = {
    top: $(this).offset().top,
    bottom: $(this).offset().top + $(this).outerHeight(),
  };
  var viewable = {
    top: $(document).scrollTop(),
    bottom: $(document).scrollTop() + $(window).innerHeight()
  }
  return target.top < viewable.bottom && target.bottom > viewable.top;
};
$.fn.isAlmostThere = function(threshold = 100) {
  var target = {
    top: $(this).offset().top - threshold,
    bottom: $(this).offset().top + $(this).outerHeight() + threshold,
  };
  var viewable = {
    top: $(document).scrollTop(),
    bottom: $(document).scrollTop() + $(window).innerHeight()
  }
  return target.top < viewable.bottom && target.bottom > viewable.top;
};

// ---
// generated by coffee-script 1.9.2