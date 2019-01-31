import React, { Component } from 'react';
import $ from 'jquery';
import {
	loadImage
} from './_util';
import GridListTileImage from '../component.env/GridListTileImage';

export default class extends Component {

	disableSetState = false;

	constructor(props) {
		super(props);
		this.props.instance && this.props.instance(this);
		this.state = {
			initialDisplayNum: 8,
			open: this.props.open
		};
	}

	getImages() {
		return Image.sortByRelatedEffort(this.props.imageID).filter((_, i)=> {
			return i < this.props.initialDisplayNum
		})
	}
	
	open(el) {
		$(el).show(300, ()=> {
			$('.component-images-horizontal').scrollLeft(window.history.state && window.history.state.imagesHorizontal_scrollLeft || 0)
			loadImage();
		});
	}
	
	close() {
		this.setState({ open: false });
	}

	// TODO: 他のプロダクトでも使い回しできるようにしたい
	isScrollIsAroundEnd(el) {
		const iMaxScroll = $(el).find('>*').reduce((p, el)=> p + $(el).outerWidth(true), 0) - $(el).innerWidth();
		const iAroundEnd = iMaxScroll - 500;
		return $(el).scrollLeft() >= iAroundEnd;
	}

	onScroll(v) {
		if (this.isScrollIsAroundEnd(v.target) && !this.disableSetState) {
			this.setState({ initialDisplayNum: this.state.initialDisplayNum + 8 });
			this.disableSetState = true;
		}
	}

	render() {
		this.disableSetState = false;

		return (
		<div
			ref={(el)=> this.state.open ? this.open(el) : $(el).hide(300)}
			className="area-recommendation"
		>
			<h4>関連</h4>
			<ul
				className="component-images-horizontal scroll"
				onScroll={(v)=> this.onScroll(v)}
			>
				{this.getImages().map((image, i)=> {
					return <GridListTileImage key={i} image={image} />
				})}
			</ul>
			<div className="close" onClick={()=> this.close()}>×</div>
		</div>
		);
	}
}
