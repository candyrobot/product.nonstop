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
		<DialogSlide {...this.props}>
			<div
				id="component-conspicuous"
			>
				<i className="fab fa-twitter"></i>
				<h3 className="title">
					TwitterやTumblrより効率的に画像を収集しませんか？
				</h3>
				<p>※Tumblrは12/17以降、<br />成人向けの一切の画像が削除されました</p>
				<p>百聞は一見にしかず。</p>
				<p>まずは使ってみて下さい！</p>
			</div>
		</DialogSlide>
		);
	}
}
