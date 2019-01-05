import React, { Component } from 'react';

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
import {
  DrawerLetsSignup
} from '../component.env/drawer';

export default class extends Component {
	render() {
		const image = this.props.image;
		return (
		<div className="layer-1">
			<AppBar />
			<div className="forAppBar scroll" style={{ overflowY: 'scroll' }} onScroll={()=> loadImage()}>
				{window.dat && window.dat.images && (()=> {
					if (Route.is('users')) {
						return User.sortByMostHavingFavorites().map((user, i)=> {
							return <PaperUser key={i} user={user} />
						})
					}
					else if (image) {
						return [
						<GridListTileImage
							key="0"
							onClick={(inherit)=> console.log('TODO: 全画面で見る')}
							onClickOnFavorite={(instance)=> {
								if (instance.on);
								else {
									window.app.recommendation.setState({ open: true });
									window.dat.session || countUp('favoriteCount') % 3 === 0 && new DrawerLetsSignup().create();
								}
							}}
							className="main"
							guide={!window.dat.session}
							image={image}
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
						<GridListImage key="2" images={Image.sortByRelatedEffort(image)} />
						]
					}
					else {
						return <GridListImage key="1" images={Image.sortByNewer()} />
					}
				})()}
			</div>
		</div>
		);
	}
}
