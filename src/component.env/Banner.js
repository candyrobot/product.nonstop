import React, { Component } from 'react';
import OverlayHowToAddToHomescreen from '../component.env/OverlayHowToAddToHomescreen';

export default class extends Component {
	render() {
		return (
		<div
			className="Banner"
			onClick={()=> OverlayHowToAddToHomescreen.create()}
		>
			スマホのホーム画面にこのアプリを追加することができるのです
			<i>(ここをタップ)</i>
		</div>
		);
	}
}
