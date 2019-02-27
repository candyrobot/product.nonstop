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
			open: this.props.open,
			count: this.props.timeToLockClosing ? this.props.timeToLockClosing / 1000 : undefined
		};


		if (this.props.timeToLockClosing && props.open === true) {
			this.setTimeouts();
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ open: nextProps.open });
		

		if (this.props.timeToLockClosing && nextProps.open === true) {
			this.setTimeouts();
		}
	}

	setTimeouts() {
		this.setState({ count: this.props.timeToLockClosing / 1000 });
		// TODO: 5秒限定になってるので汎用的に
		setTimeout(()=> this.reduceCount(), 1000);
		setTimeout(()=> this.reduceCount(), 2000);
		setTimeout(()=> this.reduceCount(), 3000);
		setTimeout(()=> this.reduceCount(), 4000);
		setTimeout(()=> this.reduceCount(), 5000);
	}

	reduceCount() {
		this.setState({ count: --this.state.count })
	}

	render() {
		return (
			<Dialog
				className={'DialogSlide ' + this.props.className}
				open={this.state.open}
				TransitionComponent={Transition}
				keepMounted
				disableBackdropClick={!!this.state.count}
				disableEscapeKeyDown={!!this.state.count}
				onClose={this.props.onClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				{this.props.children}
				<div className="close" onClick={()=> {
					if (this.state.count)
						return;

					this.setState({ open: false });
					this.props.onClose();
				}}>
					{this.state.count || '×'}
				</div>
			</Dialog>
		);
	}
}
