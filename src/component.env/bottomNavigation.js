import './bottomNavigation.css';
export default `
<div class="bottomNavigation">
    <div id="component-actions">
      <a class="most" href="/images?most">人気</a>
      <a class="newPosts" href="/images">新着</a>
      <a class="favorite" href="/images?favorite=true">お気入り一覧</a>
      <button class="mypage" onclick="$('#component-logout').show(300)">マイページ</button>
      <button class="login poyooon" onclick="$('#component-login').show(300)">ログイン</button>
    </div>
</div>
`;

window.doWhenClickMost = ()=> {

};
window.doWhenClickNewPosts = ()=> {

};
window.doWhenClickFavorite = ()=> {

};
window.doWhenClickMypage = ()=> {

};
