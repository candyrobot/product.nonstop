import React, { Component } from 'react';
import $ from 'jquery';
// import {
// 	loadImage
// } from './_util';
import GridListTileImage from '../component.env/GridListTileImage';

export default class extends Component {
	render() {
		const image = this.props.image;
		const open = this.props.open;
		if (image === undefined)
			return null;
		return (
		<div className="area-recommendation" style={{display: open ? 'block' : 'none'}}>
			<h4>関連</h4>
			<div className="component-images-horizontal">
				{Image.sortByRelatedEffort(image.id).map((image)=> <GridListTileImage image={image} />)}
			</div>
			<div className="close" onClick={(e)=> $(e.target).parent().hide(300)}>×</div>
		</div>
		);
	}
}
