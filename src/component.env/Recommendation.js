import React, { Component } from 'react';
import $ from 'jquery';
// import {
// 	loadImage
// } from './_util';
import GridListTileImage from '../component.env/GridListTileImage';

// TODO:
//     $('.area-recommendation').show(300, ()=> {
//       $('.component-images-horizontal').scrollLeft(0);
//     });

//     loadImage();
//     $('.component-images-horizontal').on('scroll', loadImage);

export default class extends Component {
	constructor(props) {
		super(props);
		this.props.instance && this.props.instance(this);
		this.state = {
			open: this.props.open
		};
	}
	render() {
		const image = this.props.image;
		if (image === undefined)
			return null;

		return (
		<div
			ref={(el)=> this.state.open ? $(el).show(300) : $(el).hide(300)}
			className="area-recommendation"
		>
			<h4>関連</h4>
			<div className="component-images-horizontal">
				{Image.sortByRelatedEffort(image.id).map((image)=> <GridListTileImage image={image} />)}
			</div>
			<div className="close" onClick={()=> this.close()}>×</div>
		</div>
		);
	}
	close() {
		this.setState({ open: false });
	}
}
