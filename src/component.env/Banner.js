import React, { Component } from 'react';
import {
	showHowToAddToHomescreen
} from '../component.env/_util';

export default class extends Component {
	render() {
		return (
		<div
			className="Banner"
			onClick={()=> showHowToAddToHomescreen()}
		>
			スマホのホーム画面にこのアプリを追加することができるのです
			<i>(ここをタップ)</i>
		</div>
		);
	}
}
