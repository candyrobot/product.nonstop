import React, { Component } from 'react';
import ReactList from 'react-list';
import $ from 'jquery';
import {
	countUp,
	query,
	getPropsToShare
} from '../component.env/_util';
import User from '../model/User';
import AppBar from '../component/AppBar';
// import GridListImage from '../component/GridListImage';
import AdvancedImage from '../component.env/AdvancedImage';
import Image from '../component.env/Image';
import Favorite from '../component.env/Favorite';
import Banner from '../component.env/Banner';
import OverlayToSign from '../component.env/OverlayToSign';

const ItemMaster = new class {
	get() {
		const items = [];

		// INFO: 源のdataを書き換えてはいけない
		// Object.assign(window.app, window.app[query('method')](query('param')));
		let images = window.app[query('method')](query('param')).images;
		
		images = images.filter((v)=> !v.deleteFlag);

		images.forEach((v, i)=> {
			if (window.Me && i >= window.Me.getImageMaxDisplableNum())
				return;

			if (!window.Me.isAddedToHomescreen() && !(i === 0) && !(i % 12)) {
				items.push(<Banner data-react-list-index={i} key={i+'Banner'} />)
			}

			items.push(<Image data-react-list-index={i} key={i} dat={v} />);
		});

		return items;
	}
}

function PleaseShareToSeeMore() {
	return (
	<div className="Tile2 paper" key={'Tile2'}>
		<h3 style={{ fontSize: 30 }}>
			おっと！
		</h3>
		<p>
			<b>まだ無数にあります！</b>が、<br />
			これ以上はツイート（拡散）して頂きたいです！<br />
			{/*もっと画像を増やしてもらうために😋<br />*/}
		</p>
		{/*
		<p style={{ fontSize: 10, fontWeight: 'bold' }}>
			ツイートして今日は無制限に画像を閲覧しましょう！
		</p>*/}
		<p>
			<a
				{...getPropsToShare()}
				style={{ padding: '.5em 1em' }}
				className="button"
				>
				<i className="fab fa-twitter" style={{ paddingRight: 5 }}></i>
				もっと見るために拡散🌟
			</a>
		</p>
	</div>
	);
}

function NothingToShow() {
	return (
	<div className="Tile2 paper" key={'Tile2'}>
		<h3>
			これ以上ありません↓
		</h3>
		<p>
			まだまだ画像不足！<br />
			このサービスをお好きでしたら、
			ぜひツイートして画像をもっと投稿してもらいましょう！
		</p>
		<p>
			<a
				{...getPropsToShare()}
				style={{ padding: '.5em 1em' }}
				className="button"
				>
				<i className="fab fa-twitter" style={{ paddingRight: 5 }}></i>
				画像をもっと増やしてもらう🌟
			</a>
		</p>
	</div>
	);
}

function PleaseSignupToSeeMore() {
	return (
	<div className="PleaseSignupToSeeMore Tile2 paper" key={'Tile2'}>
		<h3 style={{ fontSize: 30 }}>
			おっと！
		</h3>
		<p>
			これ以上はログインして閲覧することが出来ます<br />
			<b style={{ fontSize: 15 }}>登録してあなただけのお気入りBOXを🌟</b>
		</p>
		<p>
			<span className="button-plane" onClick={()=> OverlayToSign.create()}>ログイン</span>
			　
			<button className="button" onClick={()=> OverlayToSign.create().find('.toSwitchSignUp').click()}>アカウント作成</button>
		</p>
	</div>
	)
}

export default class extends Component {

	cReactList = null;

	state = {
		scrollIndex: 0
	};

	componentDidUpdate(prevProps, prevState) {
		this.cReactList && this.cReactList.scrollTo(this.state.scrollIndex);
	}

	getScrollIndex() {
		const i = $('.LayerBase .ReactList [data-react-list-index]').inView().data('react-list-index');
		return i;
	}

	// TODO: 別クラスに移動させたい（移動先未定）
	_isSinglePage() {
		return !!query('param') && query('param').id;
	}

	getItems() {
		let items = [];

		if (!window.app.isLoaded())
			return items;

		if (query('method') === 'image' && this._isSinglePage()) {
			items.push(<AdvancedImage key="AdvancedImage" imageID={query('param').id} />);
			items.push(<h5 className="headline" key="headline">関連</h5>);
		}

		items = items.concat(ItemMaster.get());

		if (!window.Me.isLogined())
			items.push(<PleaseSignupToSeeMore />);
		else if (!window.Me.isJustShared())
			items.push(<PleaseShareToSeeMore />);
		else
			items.push(<NothingToShow />);

		return items;
	}

	getReactListUser() {
		const data = window.app.favorites;
		return {
			length: data.length,
			itemRenderer: (i, key)=> {
				return <Favorite data-react-list-index={i} key={key} dat={data[i]} />;
			},
		}
	}

	getReactListProps() {
		if (window.Route.is('user')) {
			return this.getReactListUser();
		}
		const items = this.getItems();
		return {
			length: items.length,
			itemRenderer: (i)=> items[i]
		}
	}

	render() {
		return (
		<div className="LayerBase">
			<AppBar style={{ zIndex: 1, boxShadow: '0 2px 10px rgba(0,0,0,.5)' }} />

			<div className="ReactList scroll" style={{ overflow: 'auto', maxHeight: '100%' }}>
				{this.getReactListProps().length === 0 ?
					<p style={{ color: 'white', textAlign: 'center' }}>loading, or nothing...</p> :
					<ReactList ref={(c)=> this.cReactList = c} {...this.getReactListProps()} />
				}
			</div>
		</div>
		);
	}
}
