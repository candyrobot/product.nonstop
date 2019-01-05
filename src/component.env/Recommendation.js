import React, { Component } from 'react';
import $ from 'jquery';
import {
	loadImage
} from './_util';
import GridListTileImage from '../component.env/GridListTileImage';

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
			ref={(el)=> this.state.open ? this.open(el) : $(el).hide(300)}
			className="area-recommendation"
		>
			<h4>関連</h4>
			<div className="component-images-horizontal" onScroll={()=> loadImage()}>
				{Image.sortByRelatedEffort(image).map((image)=> <GridListTileImage image={image} />)}
			</div>
			<div className="close" onClick={()=> this.close()}>×</div>
		</div>
		);
	}
	open(el) {
		$(el).show(300, ()=> {
			$('.component-images-horizontal').scrollLeft(0);
			loadImage();
		});
	}
	close() {
		this.setState({ open: false });
	}
}
