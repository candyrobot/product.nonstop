import React, { Component } from 'react';
import $ from 'jquery';
import GridListTileImage from '../component.env/GridListTileImage';
// import CImage from '../component.env/Image';

class ComponentImagesHorizontal extends Component {

	disableSetState = false;

	state = {
		initialDisplayNum: 8
	}

	getImages() {
		return Image.sortByRelatedEffort(this.props.imageID).filter((_, i)=> {
			return i < this.state.initialDisplayNum
		})
	}

	// TODO: 他のプロダクトでも使い回しできるようにしたい
	isScrollIsAroundEnd(el) {
		const iMaxScroll = $(el).find('>*').reduce((p, el)=> p + $(el).outerWidth(true), 0) - $(el).innerWidth();
		const iAroundEnd = iMaxScroll - 200;
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
			<ul
				className="component-images-horizontal scroll"
				onScroll={(v)=> this.onScroll(v)}
			>
				{this.getImages().map((image, i)=> {
					return <GridListTileImage hasFav={true} key={i} image={image} />
					// return <CImage key={i} dat={image} />
				})}
			</ul>
		);
	}
}


export default class extends Component {

	constructor(props) {
		super(props);
		this.state = {
			open: this.props.open
		};
	}

	open(el) {
		$(el).show(300, ()=> {
			$('.component-images-horizontal').scrollLeft(window.history.state && window.history.state.imagesHorizontal_scrollLeft || 0)
		});
	}

	close() {
		this.setState({ open: false });
	}

	render() {
		return (
		<div
			ref={(el)=> this.state.open ? this.open(el) : $(el).hide(300)}
			className="area-recommendation"
		>
			<h4>関連</h4>
			<ComponentImagesHorizontal />
			<div className="close" onClick={()=> this.close()}>×</div>
		</div>
		);
	}
}
