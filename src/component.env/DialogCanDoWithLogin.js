import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import $ from 'jquery';
import DialogSlide from '../component/DialogSlide';

export default class extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			open: false,
			html: ''
		};
	}

	render() {
		return (
		<DialogSlide initialize={{ open: this.state.open }}>
				<div id="component-letsSignup" 
					className="hoge component-suggestion paper"
				>
					{this.state.html}
					<h3>登録してあなただけのお気入りBOXを🌟</h3>
					<p>
						<span className="button-plane" onClick={()=> $('#component-login').show(300)}>ログイン</span>
						<button className="button" onClick={()=> $('#component-login').show(300).find('.toSwitchSignUp').click()}>アカウント作成</button>
					</p>
					<div className="close" onClick={(e)=> $(e.target).parent().hide(300)}>×</div>
				</div>
		</DialogSlide>
		);
	}
}
