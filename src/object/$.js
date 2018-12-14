import $ from 'jquery';

/**
 * @param  {Boolean} isEntire - trueで要素全体が入ったときにtrueを返す
 * @param  {int} extendedViewport - pxで指定。px分viewportは縦横共に拡大する。inViewのタイミングを早めに感知したい場合などに使う。（元inAlmostThere関数に使っていた）
 * @return {Boolean}
 */
$.fn.inView = function(isEntire = false, extendedViewport = 100) {
  return this.filter(function() {
    const target = {
      top: $(this).forViewport().y,
      left: $(this).forViewport().x,
      bottom: $(this).forViewport().y + $(this).outerHeight(),
      right: $(this).forViewport().x + $(this).outerWidth(),
    };
    const viewport = {
      w: $(window).innerWidth(),
      h: $(window).innerHeight()
    };
    return (
      target.top < viewport.h + extendedViewport && target.bottom > 0 - extendedViewport
      && target.left < viewport.w + extendedViewport && target.right > 0 - extendedViewport
    )
  });
};

/**
 * INFO: 可視領域の左上の点を基準にした座標を取得する
 * ヒント: .offsetはwindowからの座標のようだ
 */
$.fn.forViewport = function() {
  return {
    x: $(this).offset().left - $(window).scrollLeft(),
    y: $(this).offset().top - $(window).scrollTop()
  }
};

$.fn.reduce = function(fn, initialValue) {
  let v = initialValue;
  this.each(function() {
    v = fn(v, this);
  });
  return v;
};
