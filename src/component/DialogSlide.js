import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

export default class extends React.Component {

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	constructor(props) {
		super(props);

		this.state = {
			open: props.initialize.open,
		};
	}

	render() {
		return (
			<div>
				<Dialog
					open={this.state.open}
					TransitionComponent={Transition}
					keepMounted
					onClose={this.handleClose}
					aria-labelledby="alert-dialog-slide-title"
					aria-describedby="alert-dialog-slide-description"
					children={this.props.children}
				/>
			</div>
		);
	}
}
