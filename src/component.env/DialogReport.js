import React from 'react';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import $ from 'jquery';
import DialogSlide from '../component/DialogSlide';

const styles = {
	appBar: {
		position: 'relative',
	},
	flex: {
		flex: 1,
	},
};

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

export default class FullScreenDialog extends React.Component {

	state = {
		messageBody: ''
	}

	// handleClickOpen = () => {
	// 	document.app.setState({ DialogReport: true });
	// };

	handleClose = () => {
		document.app.setState({ DialogReport: false });
	};

	report(username) {
		window.slack.postMessage(`
${username}さんから通報です:


${this.state.messageBody}


対象画像ID: ${this.props.imageID}
		`);
	}

	render() {
		const { classes } = this.props;
		return (
			<div>
				<Dialog
					fullScreen
					open={document.app.state.DialogReport}
					onClose={this.handleClose}
					TransitionComponent={Transition}
				>
					<AppBar style={{ position: 'relative' }}>
						<Toolbar>
							<IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
								<CloseIcon />
							</IconButton>
							<Typography variant="h6" color="inherit" style={{ flex: 1 }}>
								通報
							</Typography>
							<Button color="inherit" onClick={()=> {
								this.report(window.app.session ? `${window.app.session.id} ${window.app.session.email}` : '未ログイン');
								this.handleClose();
							}}>
								送信
							</Button>
						</Toolbar>
					</AppBar>
					<List>
						<ListItem button>
							<ListItemText primary="画像ID" secondary={this.props.imageID} />
						</ListItem>
						<ListItem>
							<TextField
								id="filled-multiline-static"
								label="通報内容"
								onChange={(e)=> this.setState({ messageBody: e.target.value })}
								multiline
								fullWidth={true}
								rows="4"
								className='{classes.textField}'
								margin="normal"
							/>
						</ListItem>
					</List>
				</Dialog>
			</div>
		);
	}
}
