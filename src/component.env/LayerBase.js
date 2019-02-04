import React, { Component } from 'react';
import ReactList from 'react-list';
import $ from 'jquery';
import {
	countUp,
	query
} from '../component.env/_util';
import User from '../model/User';
import AppBar from '../component/AppBar';
// import GridListImage from '../component/GridListImage';
import AdvancedImage from '../component.env/AdvancedImage';
import Image from '../component.env/Image';
import Favorite from '../component.env/Favorite';
import Banner from '../component.env/Banner';

export default class extends Component {

	cReactList = null;

	state = {
		scrollTop: 0
	};

	componentWillReceiveProps(nextProps) {
		this.cReactList.scrollTo(this.getIndexFromScroll(this.state.scrollTop));
	}

	getIndexFromScroll(scrollTop) {
		const i = $('.LayerBase .ReactList [data-react-list-index]').inView().data('react-list-index');
		console.log(4, i);
		return i;
	}

	getImages() {
		// INFO: 源のdataを書き換えてはいけない
		// Object.assign(window.app, window.app[query('method')](query('param')));
		const dat = window.app[query('method')](query('param'));
		return dat.images.filter((i)=> !i.deleteFlag);
	}

	getReactListUser() {
		const data = window.app.favorites;
		return {
			length: data.length,
			itemRenderer: (i, key)=> {
				return <Favorite data-react-list-index={i} key={key} dat={data[i]} />;
			},
		}
	}

	getReactListImage() {
		const imageID = query('method') === 'image' && query('param') && query('param').id;
		const data = this.getImages();
		return {
			length: data.length,
			itemRenderer: (i, key)=> {
				if (i === 0)
					return [
						<AdvancedImage key="AdvancedImage" imageID={imageID} />,
						<h5 className="headline" key="headline">
							関連
						</h5>,
						<Image data-react-list-index={i} key={key} dat={data[i]} />
					]
				if (i === 0 || i % 12)
					return <Image data-react-list-index={i} key={key} dat={data[i]} />;
				else
					return [<Banner key="banner" />, <Image data-react-list-index={i} key={key} dat={data[i]} />];
			},
		}
	}

	getReactListImages() {
		const data = this.getImages();
		return {
			length: data.length,
			itemRenderer: (i, key)=> {
				if (i === 0 || i % 12)
					return <Image data-react-list-index={i} key={key} dat={data[i]} />;
				else
					return [<Banner key="banner" />, <Image data-react-list-index={i} key={key} dat={data[i]} />];
			},
		}
	}

	getReactListProps() {
		if (window.Route.is('user')) {
			return this.getReactListUser();
		}
		else {
			const imageID = query('method') === 'image' && query('param') && query('param').id;
			if (imageID)
				return this.getReactListImage();
			else
				return this.getReactListImages();
		}
	}

	render() {
		return (
		<div className="LayerBase">
			<AppBar style={{ zIndex: 1, boxShadow: '0 2px 10px rgba(0,0,0,.5)' }} />

			<div className="ReactList scroll" style={{ overflow: 'auto', maxHeight: '100%' }}>
				<ReactList ref={(c)=> this.cReactList = c} {...this.getReactListProps()} />
			</div>
		</div>
		);
	}
}
