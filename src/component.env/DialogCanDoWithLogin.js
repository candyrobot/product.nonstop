import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import $ from 'jquery';
import DialogSlide from '../component/DialogSlide';
import OverlayToSign from '../component.env/OverlayToSign';

export default class extends React.Component {

	state = {
		open: false
	};

	handleClose() {
		this.setState({ open: false });
	}

	open() {
		// INFO: うち以外によるバグ。Dialogを消さないとどう頑張ってもinputにフォーカスがあたらない。
		// なのでDialogを消す
		this.handleClose();
		return OverlayToSign.create();
	}

	render() {
		return (
		<DialogSlide className='Dialog-margin-small' onClose={()=> this.handleClose()} open={this.state.open}>
			<div
				id="component-letsSignup"
				className="component-suggestion paper"
			>
				{this.props.html}
				<h3>登録してあなただけのお気入りBOXを🌟</h3>
				<p>
					<span className="button-plane" onClick={()=> this.open()}>ログイン</span>
					<button className="button" onClick={()=> this.open().find('.toSwitchSignUp').click()}>アカウント作成</button>
				</p>
			</div>
		</DialogSlide>
		);
	}
}
