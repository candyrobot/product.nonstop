import React, { Component } from 'react';
import $ from 'jquery';

import Route from '../object/Route';

import User from '../model/User';
import Image from '../model/Image';

import AppBar from '../component/AppBar';
import GridListImage from '../component/GridListImage';

import {
	loadImage,
	countUp
} from '../component.env/_util';
import PaperUser from '../component.env/PaperUser';
import GridListTileImage from '../component.env/GridListTileImage';
// import {
//   DrawerLetsSignup
// } from '../component.env/drawer';

export default class extends Component {
	render() {
		const images = this.props.images;
		const imageID = this.props.imageID;
		return (
		<div className="layer-1">
			<AppBar style={{ zIndex: 1, boxShadow: '0 2px 10px rgba(0,0,0,.5)' }} />
			<div
				ref={(el)=> $(el).scrollTop(window.history.state && window.history.state.forAppBar_scrollTop || 0) }
				className="forAppBar scroll"
				style={{ overflowY: 'scroll' }}
				onScroll={()=> loadImage()}
			>
				{window.app && window.app.images && (()=> {
					if (Route.is('user')) {
						return User.sortByMostHavingFavorites().map((user, i)=> {
							return <PaperUser key={i} user={user} />
						})
					}
					else if (imageID) {
						return [
						<GridListTileImage
							key="0"
							onClick={(inherit)=> console.log('TODO: 全画面で見る')}
							onClickOnFavorite={(instance)=> {
								if (instance.on);
								else {
									document.app.recommendation.setState({ open: true });
									// TODO:
									// window.app.session || countUp('favoriteCount') % 3 === 0 && new DrawerLetsSignup().create();
								}
							}}
							className="main"
							guide={!window.app.session}
							image={window.app.images.find(imageID)}
						/>,
						<h5
							key="1"
							style={{
								color: 'white',
								marginTop: 5,
								marginBottom: 0,
								padding: 10,
								backgroundColor: '#ffffff14'
							}}
						>
							関連
						</h5>,
						<GridListImage key="2" images={images} />
						]
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
