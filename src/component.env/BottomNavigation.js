import React, { Component } from 'react';
import $ from 'jquery';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';

export default class extends Component {
	state = {
		value: 0,
	};

	beforeY = 0;

	isScrollStopping(y) {
		return y === this.beforeY; 
	}

	constructor() {
		super();
		setInterval(()=> {
			const y = $('.LayerBase .ReactList').scrollTop();

			if (this.isScrollStopping(y)) {
				$('.BottomNavigation').slideDown();
			}
			else {
				$('.BottomNavigation').slideUp();
			}

			this.beforeY = y;
		}, 700);
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};
	
	render() {
		const { value } = this.state;
		return (
			<BottomNavigation
				className="BottomNavigation"
				value={value}
				onChange={this.handleChange}
				showLabels
			>
				<BottomNavigationAction label="Recents" icon={<FavoriteIcon />} />
				<BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
				<BottomNavigationAction label="Nearby" icon={<FavoriteIcon />} />
			</BottomNavigation>
			);
	}
}
