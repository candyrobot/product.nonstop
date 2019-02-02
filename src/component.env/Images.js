import React, { Component } from 'react';
import ReactList from 'react-list';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Route from '../object/Route';
import ButtonToggleFavorite from '../component.env/ButtonToggleFavorite';
import Banner from '../component.env/Banner';

export class Image extends Component {
	isNotFavoritedAnybody(dat) {
		return !window.app.favorites.where({ imageID: dat.id }).length
	}
	render() {
		const dat = this.props.dat;
		return (
		<div
			style={{ backgroundImage: `url(${dat.url})` }}
			className="Image"
			cols="2"
			onClick={()=> Route.push('image', { id: dat.id })}
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

export default class extends Component {
	renderItem(i, key) {
		if (i === 0 || i % 12)
			return <Image key={key} dat={this.props.data[i]} />;
		else
			return [<Banner key="banner" />, <Image key={key} dat={this.props.data[i]} />];
	}
	render() {
		return (
		<div className="Images scroll" style={{ overflow: 'auto', maxHeight: '100%' }}>
			<ReactList
				itemRenderer={(index, key)=> this.renderItem(index, key)}
				length={this.props.data.length}
			/>
		</div>);
	}
}
