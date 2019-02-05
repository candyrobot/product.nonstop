import React from 'react';
import Fab from '@material-ui/core/Fab';

export default class extends React.Component {

	render() {
		const { onClick, icon, primary, secondary } = this.props;
		return (
			<Fab
				onClick={()=> onClick()}
				variant="extended"
				size="medium"
				className="button"
				aria-label="Add"
				style={{ margin: '0 10px 25px' }}
			>
				<icon />
				{primary}

				<div className="balloon" position="top">
					{secondary}
				</div>
			</Fab>
		);
	}
}
