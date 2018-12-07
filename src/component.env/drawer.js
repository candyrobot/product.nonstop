import $ from 'jquery';
import './drawer.css';
export default `
<div class="drawer">
  <div id="component-post" style="display: none">
    <!-- - 頭に "http" から始まっているURLは全て受け付けられます -->
    <!-- - "data:"と書かれてあるURLは当サービスでは受け付けられません -->
    <div>
      <input type="text" placeholder="画像のURL">
    </div>
    <button onclick="post()">投稿</button>
  </div>
  <div id="component-conspicuous" style="display: none">
    <h3 class="title">
      TwitterやTumblrより効率的に画像を収集しませんか？
    </h3>
    <p>※Tumblrは12/17以降、<br>成人向けの画像は一切投稿できなくなります</p>
    <p>百聞は一見にしかず。</p>
    <p>まずは使ってみて下さい！</p>
  </div>
</div>
`;

window.drawer = (index)=> {
  $('.drawer > *').hide(300, ()=> {
    $('.drawer > *').eq(index).show(300)
  })

  // xxx.show().css({ y: -100 }).transit({ y: 0 }, 500, 'easeOutBack');
};
