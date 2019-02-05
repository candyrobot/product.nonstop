import React from 'react';
import Fab from '@material-ui/core/Fab';

export default class extends React.Component {

	render() {
		const { onClick, icon, primary, secondary, style } = this.props;
		return (
			<Fab
				onClick={()=> onClick()}
				variant="extended"
				size="medium"
				className="button"
				aria-label="Add"
				style={Object.assign({ margin: '0 10px 25px' }, style)}
			>
				{icon}
				{primary}

				<div className="balloon" position="top">
					{secondary}
				</div>
			</Fab>
		);
	}
}
