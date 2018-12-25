import React, { Component } from 'react';
import $ from 'jquery';
import Route, {
	popular,
	newer
} from './Route';
import './bottomNavigation.css';
import {
	toast,
	loadImage
} from './_util';
import {
	DrawerToUpload
} from './drawer';

export default class extends Component {
	render() {
		return (
		<div className="bottomNavigation">
			<div id="component-actions">
				<div
					onClick={()=> {
						if(!window.dat.session) { toast('ログインしたユーザーのみ使えます'); return false; };
						popular.push();
						this.props.setState({});
						// Route.push('images', { sort: 'favorites' }).refresh();
					}}
					className={`sort-favorites ${popular.current()? 'on' : ''}`}
					>
					<i className="fas fa-award"></i>
					<small>人気順</small>
				</div>
				<div
					onClick={()=> Route.push('images', { sort: 'newer' }).refresh()}
					className="sort-newer"
					>
					<i className="far fa-images"></i>
					<small>新着順</small>
				</div>
				<div
					onClick={()=> {
						if(!window.dat.session) { toast('ログインしたユーザーのみ使えます'); return false; }
						Route.push('images', { filter: 'myFavorite' }).refresh();
					}}
					className="filter-myFavorite"
					>
					<i className="fas fa-heart"></i>
					<small>お気入り</small>
				</div>
				<div
					onClick={()=> {
						if(!window.dat.session) { toast('ログインしたユーザーのみ使えます'); return false; }
						$('#component-logout').show(300);
					}}
					className="mypage"
					>
					<i className="fas fa-user-circle"></i>
					<small>マイページ</small>
				</div>
				<div
					onClick={()=> Route.push('users').refresh()}
					className="users"
					>
					<i className="fas fa-user-friends"></i>
					<small>みんな</small>
				</div>
				<div
					style={{ display: 'none' }}
					onClick={()=> $('#component-login').show(300)}
					className="login poyooon fill"
					>
					<i className="fas fa-play"></i>
					<small>ログイン</small>
				</div>
				<div
					style={{ display: 'none' }}
					onClick={()=> new DrawerToUpload().create().run()}
					className="upload poyooon fill"
					>
					<i className="far fa-plus-square"></i>
					<small>アップロード</small>
				</div>
			</div>
		</div>
		);
	}
}

window.bottomNavigation = {};
window.bottomNavigation.scroll = ()=> {
	const w = $('#component-actions > *').reduce(function(w, el) {
		return w + $(el).outerWidth(true);
	}, 0);
	$('#component-actions').animate({
		scrollLeft: w - $('#component-actions').outerWidth()
	}, 800);
};
