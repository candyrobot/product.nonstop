import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import $ from 'jquery';
import DialogSlide from '../component/DialogSlide';

export default class extends React.Component {
	render() {
		return (
		<DialogSlide {...this.props} className="DialogAsHinanbasho">
			<div className="body">
				<h3 className="title">
					避難場所
				</h3>
				<p>スマホに残っていてはたいへん！！</p>
				<p>エロ画像の<b>避難場所としてお使いください😜</b></p>
				<p>（右上から<b>投稿</b>できます！）</p>
			</div>
		</DialogSlide>
		);
	}
}
