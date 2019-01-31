import React, { Component } from 'react';
import $ from 'jquery';
import IconButton from '@material-ui/core/IconButton';
import ReportIcon from '@material-ui/icons/Report';
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
import DialogReport from '../component.env/DialogReport';
// import {
//   DrawerLetsSignup
// } from '../component.env/drawer';

export default class extends Component {

	state = {
		open: false,
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

	handleClickThumbnail = (inherit)=> {
		if (!window.app.isLogined()) {
			this.setState({ open: true });
		}
		// else if (!window.app.kakinzumi) {
		// 	console.log('TODO: ここ作ってないから通るはずない');
			// document.app.DialogCanDoWithKakin.xxx('保存するには課金します');
		// }
		else {
			const imageUrl = window.app.images.find(this.props.imageID).url;
			const $el = $(`<div class="fullscreenImage"><div class="imageContainer"><img src="${imageUrl}"></div></div>`)
			.appendTo('body')
			.on('click', function() {
				$el.remove();
			});
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

	render() {
		const images = this.props.images;
		const imageID = this.props.imageID;
		const y = window.history.state && window.history.state.forAppBar_scrollTop || 0;
		return (
		<div className="layer-1">
			<AppBar style={{ zIndex: 1, boxShadow: '0 2px 10px rgba(0,0,0,.5)' }} />
			<div
				ref={(el)=> {
					this.elForAppBar = el;
					this.doAfterRendering(()=> {
						$(el).scrollTop(y);
						{/*TODO: 無限ループ問題*/}
						// this.bindScrollEnd(el, ()=> {
						// 	document.app.setState({ DialogLetsShareOpen: true });
						// });
					});
				}}
				className="forAppBar scroll"
				style={{ overflowY: 'scroll' }}
				onScroll={(v)=> {
					Route.replaceHistory(Object.assign(window.history.state || {}, {
						forAppBar_scrollTop: $(v.target).scrollTop(),
					}));

					loadImage();

					// this.isScrollEnd(v.target) && this.setState({});
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
						<div className="LayerBase" style={{ position: 'relative' }}>
							<GridListTileImage
								onClick={this.handleClickThumbnail}
								onClickOnFavorite={this.handleClickFavorite}
								className="main"
								guide={!window.app.session}
								image={window.app.images.find(imageID)}
							/>

							{window.app.isAdmin() ?
								<h3 style={{ color: 'white' }}
									onClick={(e)=> {
										window.Image.delete(imageID);
									}}>
									削除
								</h3>
								:
								<IconButton
									className="ReportIcon"
									onClick={(e)=> {
										document.app.setState({ DialogReport: true });
									}}>
									<ReportIcon />
								</IconButton>
							}

							<DialogReport imageID={imageID} />

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
