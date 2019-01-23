import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

export default class extends React.Component {

	render() {
		return (
			<Dialog
				className={this.props.className}
				open={this.props.open}
				TransitionComponent={Transition}
				keepMounted
				onClose={this.props.onClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
				children={this.props.children}
			/>
		);
	}
}
