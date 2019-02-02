import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import PetsIcon from '@material-ui/icons/Pets';

export default class extends Component {
	getName(dat) {
		if (dat.userID == 1)
			return '名無しさん';
		else
			return '@' + (dat.userID * Math.random()).toString(36).slice(-8)
	}
	render() {
		const dat = this.props.dat;
		return (
			<ListItem className="Favorite">
				<Avatar className="Avatar">
					<PetsIcon />
				</Avatar>
				<div style={{ width: '100%', marginLeft: 5 }}>
					<ListItemText
						className="ListItemText"
						// INFO: https://qiita.com/ryounagaoka/items/4736c225bdd86a74d59c
						primary={this.getName(dat)}
						secondary={dat.created_at.replace('T', ' ').replace(/\..*$/, '')}
					/>
					<div className="text">お気入りに追加しました</div>
					<CardMedia
						onClick={()=> window.Route.push('image', { id: dat.imageID })}
						className="CardMedia"
						image={window.app.images.find(dat.imageID).url}
						title="Contemplative Reptile"
					/>
				</div>
			</ListItem>
		)
	}
}
