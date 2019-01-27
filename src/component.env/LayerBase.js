import React, { Component } from 'react';
import $ from 'jquery';
import {
	loadImage,
	countUp
} from '../component.env/_util';
import Route from '../object/Route';
import User from '../model/User';
import Image from '../model/Image';
import AppBar from '../component/AppBar';
import GridListImage from '../component/GridListImage';
import DialogCanDoWithLogin from '../component.env/DialogCanDoWithLogin';
import PaperUser from '../component.env/PaperUser';
import GridListTileImage from '../component.env/GridListTileImage';
// import {
//   DrawerLetsSignup
// } from '../component.env/drawer';

export default class extends Component {

	state = {
		open: false,
		scrollTop: parseInt(localStorage.getItem('app.nonstop.forAppBar_scrollTop'))
	}

	handleClickThumbnail = (inherit)=> {
		if (!window.app.isLogined()) {
			this.setState({ open: true });
		}
		else if (!window.app.kakinzumi) {
			document.app.DialogCanDoWithKakin.xxx('保存するには課金します');
		}
		else {
			console.log('TODO: 全画面で見る');
		}
	};

	handleClickFavorite = (instance)=> {
		if (instance.on);
		else {
			document.app.recommendation.setState({ open: true });
			// TODO:
			// window.app.session || countUp('favoriteCount') % 3 === 0 && new DrawerLetsSignup().create();
		}
	};

	handleClose = ()=> {
		this.setState({ open: false });
	};

	doAfterRendering(callback) {
		// TODO: 正確に補足できていない
		setTimeout(()=> {
			callback();
		}, 1000);
	}

	bindScrollEnd(el, callback) {
		$(el).on('scroll', ()=> {
			isScrollEnd() && callback();
		});

		// TODO: 判定がガバガバ.
		// TODO: 他のプロダクトでも使い回しできるようにしたい
		function isScrollEnd() {
			const HANDE = 50;
			const maxScroll = $(el).find('>div').innerHeight() - $(el).innerHeight();
			return $(el).scrollTop() + HANDE >= maxScroll;
		}
	}

	render() {
		const images = this.props.images;
		const imageID = this.props.imageID;
		const y = window.history.state && window.history.state.forAppBar_scrollTop || 0;
		return (
		<div className="layer-1">
			<AppBar style={{ zIndex: 1, boxShadow: '0 2px 10px rgba(0,0,0,.5)' }} />
			<div
				ref={(el)=> {
					this.doAfterRendering(()=> {
						$(el).scrollTop(y);
						{/*TODO: 無限ループ問題*/}
						{/*this.bindScrollEnd(el, ()=> {
							document.app.setState({ DialogLetsShareOpen: true });
						});*/}
					});
				}}
				className="forAppBar scroll"
				style={{ overflowY: 'scroll' }}
				onScroll={(v)=> {
					Route.replaceHistory(Object.assign(window.history.state || {}, {
						forAppBar_scrollTop: $(v.target).scrollTop(),
					}));

					loadImage();
				}}
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
							<GridListTileImage
								onClick={this.handleClickThumbnail}
								onClickOnFavorite={this.handleClickFavorite}
								className="main"
								guide={!window.app.session}
								image={window.app.images.find(imageID)}
							/>
							<DialogCanDoWithLogin
								html='保存するにはログインします'
								open={this.state.open}
								onClose={this.handleClose}
							/>
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
							<GridListImage images={images} />
						</div>
						)
					}
					else {
						return <GridListImage images={images} />
					}
				})()}
			</div>
		</div>
		);
	}
}
