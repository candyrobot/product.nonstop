import React, { Component } from 'react';
import $ from 'jquery';
import {
  query
} from '../component.env/_util';

export default class extends Component {
	state = {
		index: query('index') || 0
	};
	render() {
		window.hideaki = this;
		return (
		<div 
			ref={(el)=> $(el).scrollTop(2000) }
			style={{ 
			position: 'fixed',
			left: 0, top: 0,
			width: '100%', height: '100%',
			backgroundColor: 'black', zIndex: 1400,
			overflow: 'scroll'
		}}>
			<img src={this.a[this.state.index]} style={{ display: 'block', width: '100%' }} />
			<button 
				style={{ display: 'inline-block', width: '45%', backgroundColor: 'white', 
					paddingTop: 20, paddingBottom: 20 }}
				onClick={()=> {
					var index = this.state.index - 1;
					this.push({ index });
					this.setState({ index });
			}}>←</button>
			<button 
				style={{ display: 'inline-block', width: '45%', backgroundColor: 'white', 
					paddingTop: 20, paddingBottom: 20 }}
				onClick={()=> {
					var index = this.state.index + 1;
					this.push({ index });
					this.setState({ index });
			}}>→</button>
		</div>
		);
	}
	
	push(param) {
		let url = '/?method="image"&&hideaki=1';

		url += `&index=${JSON.stringify(param.index)}`;

		const title = url;
		window.history.pushState({url, title}, title, url);
		return this;
	}
}