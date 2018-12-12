import $ from 'jquery';
import './bottomNavigation.css';
export default `
<div class="bottomNavigation">
	<div id="component-actions">
		<div
			onclick="
			if(!dat.session) { toast('ログインしたユーザーのみ使えます'); return false; };
			Route.push('images', { sort: 'favorites' }).refresh();
			$('#component-actions > *').removeClass('current');
			$('#component-actions > .sort-favorites').addClass('current');
			"
			class="sort-favorites"
			>
			<i class="fas fa-award"></i>
			<small>人気順</small>
		</div>
		<div
			onclick="
			Route.push('images', { sort: 'newer' }).refresh();
			$('#component-actions > *').removeClass('current');
			$('#component-actions > .sort-newer').addClass('current');
			"
			class="sort-newer"
			>
			<i class="far fa-images"></i>
			<small>新着順</small>
		</div>
		<div
			onclick="
			if(!dat.session) { toast('ログインしたユーザーのみ使えます'); return false; }
			Route.push('images', { filter: 'myFavorite' }).refresh();
			$('#component-actions > *').removeClass('current');
			$('#component-actions > .filter-myFavorite').addClass('current');
			"
			class="filter-myFavorite"
			>
			<i class="fas fa-heart"></i>
			<small>お気入り</small>
		</div>
		<div
			onclick="
			if(!dat.session) { toast('ログインしたユーザーのみ使えます'); return false; }
			$('#component-logout').show(300);
			"
			class="mypage"
			>
			<i class="fas fa-user-circle"></i>
			<small>マイページ</small>
		</div>
		<div
			style="display: none"
			onclick="$('#component-login').show(300)"
			class="login poyooon"
			>
			<i class="fas fa-play"></i>
			<small>ログイン</small>
		</div>
		<div
			style="display: none"
			onclick="window.promptToUpload()"
			class="upload"
			>
			<i class="far fa-plus-square"></i>
			<small>アップロード</small>
		</div>
	</div>
</div>
`;

window.bottomNavigation = {};
window.bottomNavigation.scroll = ()=> {
	const w = $('#component-actions > *').reduce(function(w, el) {
		return w + $(el).outerWidth(true);
	}, 0);
	$('#component-actions').animate({
		scrollLeft: w - $('#component-actions').outerWidth()
	}, 800);
};
