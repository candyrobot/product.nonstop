// 画像の条件
// - src属性
// - 始まりがhttps://66.media.tumblr.com
// - 終わりが .jpg ||

// 2018/12/28: 23225個

$ = jQuery;
const maxPageNum = 980;
window.a = [];

for (let i = 1; i < maxPageNum; i++) {
  $.get(`/blog/kimari-ronso/${i}`).done((d)=> {

    const r = $(d).find('img').filter(function() {
      return $(this).attr('src').match(/^https:\/\/66\.media\.tumblr\.com/)
      && $(this).attr('src').match(/\.jpg$|\.png$|\.gif$|\.jpeg$|\.JPG$|\.PNG$|\.GIF$|\.JPEG$/);
    })
    .map(function() {
      return $(this).attr('src');
    })
    .toArray();

    // console.log(1, r);

    a = a.concat(r);

    console.log(i, window.a.length)

  });
}
