import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ButtonToggleFavorite from '../component.env/ButtonToggleFavorite';
import Banner from '../component.env/Banner';

export default class extends Component {
	isNotFavoritedAnybody(dat) {
		return !window.app.favorites.where({ imageID: dat.id }).length
	}
	render() {
		const dat = this.props.dat;
		return (
		<div
			{...this.props}
			style={{ backgroundImage: `url(${dat.url})` }}
			className="Image"
			cols="2"
			onClick={()=> window.Route.push('image', { id: dat.id })}
		>
			<GridListTileBar
				style={{ background: 'initial' }}
				title={this.isNotFavoritedAnybody(dat) ? 'New' : ''}
				titlePosition="bottom"
				actionIcon={<ButtonToggleFavorite image={dat} />}
				actionPosition="right"
			/>
		</div>
		);
	}
}