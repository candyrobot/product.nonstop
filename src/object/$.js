import $ from 'jquery';

/**
 - TODO: x軸の処理を書いていない
 * @param  {Boolean} isEntire - trueで要素全体が入ったときにtrueを返す
 * @return {Boolean}          [description]
 */
$.fn.inView = function(isEntire = false) {
  return this.filter(function() {
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
  return this.filter(function() {
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

$.fn.reduce = function(fn, initialValue) {
  let v = initialValue;
  this.each(function() {
    v = fn(v, this);
  });
  return v;
};
