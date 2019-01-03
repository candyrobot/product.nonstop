import React, { Component } from 'react';

import Route from '../object/Route';

import User from '../model/User';

import AppBar from '../component/AppBar';
import GridListImage from '../component/GridListImage';

import {
	loadImage,
	getUrlParameter
} from '../component.env/_util';
import PaperUser from '../component.env/PaperUser';
import ButtonToggleFavorite from '../component.env/ButtonToggleFavorite';
import GridListTileImage from '../component.env/GridListTileImage';

export default class extends Component {
	render() {
		let image = {};
		if (getUrlParameter('method') === 'images')
			image = getUrlParameter('param');

		return (
		<div className="layer-1">
			<AppBar />
			<div className="forAppBar" onScroll={()=> loadImage()}>
				{(()=> {
					if (Route.is('users')) {
						return User.sortByMostHavingFavorites().map((user, i)=> {
							return <PaperUser key={i} user={user} />
						})
					}
					else if (image.id) {
						return window.dat && ([
						<GridListTileImage guide={true} image={window.dat.images.find(image.id)} />,
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
						</h5>,
						<GridListImage key="1" images={Image.sortByRelatedEffort(image)} />
						])
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
