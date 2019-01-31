import React, { Component } from 'react';
import $ from 'jquery';
import {
	loadImage,
	countUp
} from '../component.env/_util';
import Route from '../object/Route';
import User from '../model/User';
import AppBar from '../component/AppBar';
import GridListImage from '../component/GridListImage';
import PaperUser from '../component.env/PaperUser';
import Image from '../component.env/Image';
// import {
//   DrawerLetsSignup
// } from '../component.env/drawer';

export default class extends Component {

	elForAppBar

	state = {
		scrollTop: parseInt(localStorage.getItem('app.nonstop.forAppBar_scrollTop'))
	}

	constructor(props) {
		super(props);
		this.doAfterRendering(()=> {
			$(this.elForAppBar).find('.Pic, .message').filter((i)=> i < 10).show();
		
			this.bindScrollEnd(this.elForAppBar, ()=> {
				console.log('end');
			});
		});
	}

	doAfterRendering(callback) {
		// TODO: 正確に補足できていない
		// TODO: 正確に補足できていない
		// TODO: 正確に補足できていない
		// TODO: 正確に補足できていない
		// TODO: 正確に補足できていない
		// TODO: 正確に補足できていない
		// TODO: 正確に補足できていない
		// TODO: 正確に補足できていない
		setTimeout(()=> {
			callback();
		}, 1500);
	}

	bindScrollEnd(el, callback) {
		$(el).on('scroll', ()=> {
			this.isScrollEnd(el) && callback();
		});
	}

	// TODO: 判定がガバガバ.
	// TODO: 他のプロダクトでも使い回しできるようにしたい
	isScrollEnd() {
		const el = this.elForAppBar;
		const HANDE = 50;
		const maxScroll = $(el).find('>*').innerHeight() - $(el).innerHeight();
		return $(el).scrollTop() + HANDE >= maxScroll;
	}

	onScroll(v) {
		const y = $(v.target).scrollTop();
		
		Route.replaceHistory(Object.assign(window.history.state || {}, {
			forAppBar_scrollTop: y,
		}));

		loadImage();

		// this.isScrollEnd(v.target) && this.setState({});
	}

	ref(el) {
		const y = window.history.state && window.history.state.forAppBar_scrollTop || 0;
		this.elForAppBar = el;
		this.doAfterRendering(()=> {
			$(el).scrollTop(y);
			{/*TODO: 無限ループ問題*/}
			// this.bindScrollEnd(el, ()=> {
			// 	document.app.setState({ DialogLetsShareOpen: true });
			// });
		});
	}

	render() {
		const images = this.props.images;
		const imageID = this.props.imageID;
		return (
		<div className="LayerBase">
			<AppBar style={{ zIndex: 1, boxShadow: '0 2px 10px rgba(0,0,0,.5)' }} />
			<div
				ref={()=> this.ref()}
				onScroll={()=> this.onScroll()}
				className="forAppBar scroll"
				style={{ overflowY: 'scroll' }}
			>
				{window.app && window.app.images && (()=> {
					if (Route.is('user')) {
						return User.sortByMostHavingFavorites().map((user, i)=> {
							return <PaperUser key={i} user={user} />
						})
					}

					else if (imageID) {
						return (
						<div>
							<Image imageID={imageID} />

							<h5
								style={{
									color: 'white',
									marginTop: 5,
									marginBottom: 0,
									padding: 10,
									backgroundColor: '#ffffff14'
								}}
							>
								関連
							</h5>
							<GridListImage initialDisplayNum="8" images={images} />
						</div>
						)
					}

					else {
						return <GridListImage initialDisplayNum="8" images={images} />
					}
				})()}
			</div>
		</div>
		);
	}
}
