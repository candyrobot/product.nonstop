import React, { Component } from 'react';
import {
	isAndroid,
	showWebview
} from '../component.env/_util';

export default class extends Component {
	render() {
		return (
		<div
			className="Banner"
			onClick={()=> {
				if (isAndroid()) {
					return showWebview('https://www.youtube.com/embed/f9MsSWxJXhc');
				} else {
					return showWebview('https://www.youtube.com/embed/8iueP5sRQ-Y');
				}
			}}
		>
			スマホのホーム画面にこのアプリを追加することができるのです
			<i>(ここをタップ)</i>
		</div>
		);
	}
}
