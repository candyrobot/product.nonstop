import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

export default class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			open: this.props.open
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ open: nextProps.open });
	}

	render() {
		return (
			<Dialog
				className={'DialogSlide ' + this.props.className}
				open={this.state.open}
				TransitionComponent={Transition}
				keepMounted
				onClose={this.props.onClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				{this.props.children}
				<div className="close" onClick={()=> this.setState({ open: false })}>×</div>
			</Dialog>
		);
	}
}
