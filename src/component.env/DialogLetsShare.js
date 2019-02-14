import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import $ from 'jquery';
import DialogSlide from '../component/DialogSlide';
import {
  getPropsToShare,
} from '../component.env/_util';

export default class extends React.Component {

	shouldOpen() {
		const v = localStorage.getItem('app.nonstop.time.lastShared');
		if (v === null)
			return true;
		const iPast = parseInt(localStorage.getItem('app.nonstop.time.lastShared'));
		return (new Date().getTime() - iPast) > 1000 * 60 * 60 * 24;
	}

	render() {
		return (
		<DialogSlide
			className='Dialog-margin-small'
			open={this.shouldOpen() && this.props.open}
			onClose={this.props.onClose}
		>
			<div className="component-suggestion paper">
				<h3 style={{ fontSize: 18, textIndent: '.5em' }}>
					このアプリを拡散希望🌟
				</h3>
				<p>
					まだまだ画像不足！<br />
					拡散して毎日画像を投稿してもらおう！
				</p>
				<p style={{ fontSize: 10, fontWeight: 'bold' }}>
					※ツイートするとこのポップアップはしばらくでてきません
				</p>
				<p text-align="center">
					<a
						{...getPropsToShare()}
						style={{ padding: '.5em 1em' }}
						className="button"
						>
						<i className="fab fa-twitter" style={{ paddingRight: 5 }}></i>
						画像をもっと増やしてもらう🌟
					</a>
				</p>
			</div>
		</DialogSlide>
		);
	}
}
				// <p>
				// 	まだまだ画像不足！<br />
				// 	拡散して毎日画像を投稿してもらおう！
				// </p>
				// <p>
				// 	ツイートするだけ！
				// </p>
