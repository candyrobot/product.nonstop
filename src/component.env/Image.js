import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ButtonToggleFavorite from '../component.env/ButtonToggleFavorite';
import Banner from '../component.env/Banner';
import {
  getName
} from '../component.env/_util';

export default class extends Component {
	render() {
		const dat = this.props.dat;
		return (
		<div
			{...this.props}
			style={{ backgroundImage: `url(${dat.url})` }}
			className="Image"
			cols="2"
			onClick={()=> {
				window.Route.push('image', { id: dat.id });
				window.slack.postMessage(`${getName()}さんが ${dat.id} をタップしました`);
			}}
		>
			<GridListTileBar
				style={{ background: 'initial' }}
				title={Image.isEnoughToShowRecommendation(dat.id) ? '' : 'New'}
				titlePosition="bottom"
				actionIcon={<ButtonToggleFavorite image={dat} />}
				actionPosition="right"
			/>
		</div>
		);
	}
}
