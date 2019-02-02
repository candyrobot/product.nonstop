import React, { Component } from 'react';
import ReactList from 'react-list';
// import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
// import ImageIcon from '@material-ui/icons/Image';
// import WorkIcon from '@material-ui/icons/Work';
import PetsIcon from '@material-ui/icons/Pets';
import Route from '../object/Route';

class Favorite extends Component {
	getName(dat) {
		if (dat.userID == 1)
			return '名無しさん';
		else
			return '@' + (dat.userID * Math.random()).toString(36).slice(-8)
	}
	render() {
		const dat = window.app.favorites[this.props.i];
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
						onClick={()=> Route.push('image', { id: dat.imageID })}
						className="CardMedia"
						image={window.app.images.find(dat.imageID).url}
						title="Contemplative Reptile"
					/>
				</div>
			</ListItem>
		)
	}
}

export default class extends Component {
	renderItem(i, key) {
		return <Favorite key={key} i={i} />;
	}
	render() {
		return (
		<div className="scroll" style={{ overflow: 'auto', maxHeight: '100%' }}>
			<ReactList
				itemRenderer={(index, key)=> this.renderItem(index, key)}
				length={this.props.data.length}
			/>
		</div>);
		// return window.app.favorites.map((f, i)=> <Favorite key={i} dat={f} />);
	}
}