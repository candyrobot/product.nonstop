import $ from 'jquery';

// const domain = "http://0.0.0.0:3000";
const domain = "https://with-one-account-prd.herokuapp.com";

var countUp, deleteFav, getHtmlFav, isAndroid, isEmpty, isInvalid, isShouldNotRender, isValidEmail, lazyShow, renderImage, renderImages, renderRecommendation, showWebview, sortByFrequency, startLoading, stopLoading, toast;

window.initializeApp = function() {
  return $.get(domain + '/application' + window.location.search, function(dat) {
    var b, imageID;
    console.log(dat);
    dat.session = dat.session || {};
    window.dat = dat;
    if (dat.session.userID) {
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
      renderImage(dat.images[0]);
      imageID = dat.images[0].id;
      b = !!window.dat.favorites.filter(function(fav) {
        return imageID === parseInt(fav.imageID);
      }).length;
      $('.row').html("			" + (countUp('x') > 3 ? "" : "<div class=\"balloon\">\n	タップして \"お気入り\" に入れると…　👉\n</div>") + ("<div class=\"fav-area\" onclick=\"$(this).prev().hide()\">" + (getHtmlFav(b)) + "</div>")).find('.component-fav').on('click', function() {
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
        }).done(renderRecommendation).always(function() {
          return stopLoading();
        });
      });
    } else if (window.location.search.indexOf('most') !== -1) {
      $('#component-actions .most').hide();
      renderImages();
    } else if (window.location.search.indexOf('favorite') !== -1) {
      $('#component-actions .favorite').hide();
      renderImages();
    } else {
      $('#component-actions .newPosts').hide();
      renderImages();
    }
    $('#component-logout h1').text(window.dat.session.userID);
    return $('#component-logout h5').text(window.dat.session.email);
  });
};

deleteFav = function(imageID) {
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
  return $.post(domain + '/users/login', dat).fail(function(dat) {
    return toast(dat.responseJSON.toast);
  }).done(function() {
    return setTimeout('window.location.reload()', 1000);
  });
};

isInvalid = function(dat) {
  return isEmpty(dat) || !isValidEmail(dat.email);
};

isValidEmail = function(email) {
  return true;
};

isEmpty = function(dat) {
  return false;
};

isShouldNotRender = function(image) {
  return image.id === parseInt($('.fluid').attr('data-imageID')) || window.dat.favorites.filter(function(fav) {
    return parseInt(fav.imageID) === image.id;
  }).length;
};

renderRecommendation = function(images) {
  var html;
  html = sortByFrequency(images.serialize()).reduce(function(prev, image) {
    return prev + (isShouldNotRender(image) ? "" : "<a\nhref=\"/images?imageID=" + image.id + "\"\nstyle=\"background-image: url(" + image.url + ")\"></a>");
  }, "");
  if (!html) {
    return;
  }
  return $('.component-images-horizontal').html(html).closest('.area-recommendation').show(300);
};

sortByFrequency = function(array) {
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

getHtmlFav = function(isTrue) {
  return "<div class=\"component-fav " + isTrue + "\">\n	<span>♡</span>\n	<span>♥</span>\n</div>";
};

renderImages = function() {
  var html, j;
  j = 0;
  html = "";
  if (window.dat.session.userID) {
    html = "<div class=\"outer additional\">\n	<div class=\"inner\">\n		<i class=\"fas fa-plus\"></i>\n	</div>\n</div>";
    j++;
  }
  html += window.dat.images.reduce(function(prev, dat, i) {
    var s, t;
    s = getHtmlFav(!!window.dat.favorites.filter(function(fav) {
      return dat.id === parseInt(fav.imageID);
    }).length);
    t = (j + i) % 12 ? "" : "<div class=\"message\">\n	スマホのホーム画面にこのアプリを追加することができるのです\n	<i>(ここをタップ)</i>\n</div>";
    return prev + (t + `
      <div
        style="display: none"
        class="outer fas fa-unlink"
        data-imageID="${dat.id}">
        <a
          class="inner"
          href="/images?imageID=${dat.id}"
          style="background-image: url(${dat.url})">
        </a>
        ${s}
        <div class="favoriteNum">${dat.favorite ? dat.favorite : ''}</div>
      </div>
    `);
  }, "");
  $('#component-images').html(html).find('.component-fav').on('click', function() {
    var imageID;
    imageID = $(this).closest('.outer').data('imageid');
    if ($(this).is('.true')) {
      return deleteFav(imageID).done((function(_this) {
        return function() {
          return $(_this).removeClass('true');
        };
      })(this));
    } else {
      return $.post(domain + '/favorites', {
        imageID: imageID
      }).fail(function(dat) {
        return toast(dat.responseJSON.toast);
      }).done((function(_this) {
        return function() {
          return $(_this).addClass('true');
        };
      })(this));
    }
  });

  $('#component-images > .outer').filter(isAlmostThere()).show();
  $(document).on('scroll', function() {
    $('#component-images > .outer').filter(isAlmostThere()).fadeIn();
  });

  $('#component-images').find('.message').on('click', function() {
    if (isAndroid()) {
      return showWebview('https://www.youtube.com/embed/f9MsSWxJXhc');
    } else {
      return showWebview('https://www.youtube.com/embed/8iueP5sRQ-Y');
    }
  });
  return lazyShow('#component-images .outer');
};

renderImage = function(image) {
  var html;
  html = "<div class=\"fluid\" data-imageID=\"" + image.id + "\">\n	<img src=\"" + image.url + "\">\n</div>";
  return $('#component-images').html(html);
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

toast = function(txt) {
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

countUp = function(key) {
  var a;
  a = [];
  a[key] = JSON.parse(localStorage.getItem(key));
  if (a[key] === null) {
    a[key] = 0;
  }
  localStorage.setItem(key, JSON.stringify(++a[key]));
  return a[key];
};

showWebview = function(url) {
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

startLoading = function() {
  $('.loadingLine').show(300);
  return setTimeout('stopLoading()', 5000);
};

stopLoading = function() {
  return $('.loadingLine').hide(300);
};

isAndroid = function() {
  return navigator.userAgent.indexOf('Android') > 0;
};

lazyShow = function(selector) {
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

const isAlmostThere = function(threshold = 100) {
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