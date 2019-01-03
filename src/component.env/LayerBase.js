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

export default class extends Component {
	render() {
		let image;
		if (getUrlParameter('method') === 'images')
			image = getUrlParameter('param');

		return (
		<div className="layer-1">
			<AppBar />
			<div className="forAppBar" onScroll={()=> loadImage()}>
				{Route.is('users') ? (
					User.sortByMostHavingFavorites().map((user, i)=> {
						return <PaperUser key={i} user={user} />
					})
				) : ([
					image && image.id && window.dat && ([
					<div className="fluid" testImageId={image.id}>
						<img src={window.dat.images.find(image.id).url} />
					</div>,
					<h5>関連</h5>
					]),
					<GridListImage key="1" images={Image.sortByNewer()} />
				])}
			</div>
		</div>
		);
	}
}