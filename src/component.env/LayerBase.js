import React, { Component } from 'react';
import $ from 'jquery';
import {
	countUp
} from '../component.env/_util';
import Route from '../object/Route';
import User from '../model/User';
import AppBar from '../component/AppBar';
import GridListImage from '../component/GridListImage';
import PaperUser from '../component.env/PaperUser';
import Image from '../component.env/Image';
import Favorites from '../component.env/Favorites';
// import {
//   DrawerLetsSignup
// } from '../component.env/drawer';

export default class extends Component {

	elForAppBar
	disableSetState = false

	state = {
		initialDisplayNum: 8
	}

	// constructor(props) {
	// 	super(props);
	// 	this.doAfterRendering(()=> {
	// 		$(this.elForAppBar).find('.Pic, .message').filter((i)=> i < 10).show();

	// 		this.bindScrollEnd(this.elForAppBar, ()=> {
	// 			console.log('end');
	// 		});
	// 	});
	// }

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
			this.isScrollIsAroundEnd(el) && callback();
		});
	}

	// TODO: 他のプロダクトでも使い回しできるようにしたい
	isScrollIsAroundEnd() {
		const iMaxScroll = $(this.elForAppBar).find('>*').innerHeight() - $(this.elForAppBar).innerHeight();
		const iAroundEnd = iMaxScroll - 500;
		return $(this.elForAppBar).scrollTop() >= iAroundEnd;
	}

	onScroll(v) {
		const y = $(v.target).scrollTop();

		Route.replaceHistory(Object.assign(window.history.state || {}, {
			forAppBar_scrollTop: y,
		}));

		if (this.isScrollIsAroundEnd() && !this.disableSetState) {
			this.setState({ initialDisplayNum: this.state.initialDisplayNum + 8 });
			this.disableSetState = true;
		}
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
		this.disableSetState = false;

		const images = this.props.images;
		const imageID = this.props.imageID;
		return (
		<div className="LayerBase">
			<AppBar style={{ zIndex: 1, boxShadow: '0 2px 10px rgba(0,0,0,.5)' }} />
			{window.app && window.app.images && (()=> {
				if (Route.is('user')) {
					return <Favorites data={window.app.favorites} />
					// return User.sortByMostHavingFavorites().map((user, i)=> {
					// 	 return <PaperUser key={i} user={user} />
					// })
				}
				else {
					return (
					<div
						ref={(el)=> this.ref(el)}
						onScroll={(v)=> this.onScroll(v)}
						className="forAppBar scroll"
						style={{ overflowY: 'scroll' }}
					>
						{window.app && window.app.images && (()=> {
							if (imageID) {
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
									<GridListImage initialDisplayNum={this.state.initialDisplayNum} images={images} />
								</div>
								)
							}
							else {
								return <GridListImage initialDisplayNum={this.state.initialDisplayNum} images={images} />
							}
						})()}
					</div>
					)
				}
			})()}
		</div>
		);
	}
}
