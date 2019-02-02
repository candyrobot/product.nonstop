import React, { Component } from 'react';
import $ from 'jquery';
import Toast from '../object/Toast';
import IconButton from '@material-ui/core/IconButton';
import ReportIcon from '@material-ui/icons/Report';
import GridListTileImage from '../component.env/GridListTileImage';
import DialogReport from '../component.env/DialogReport';
import DialogCanDoWithLogin from '../component.env/DialogCanDoWithLogin';

export default class extends Component {

	state = {
		open: false,
	}

	handleClickThumbnail = (inherit)=> {
		if (!window.app.isLogined()) {
			this.setState({ open: true });
		}
		// else if (!window.app.kakinzumi) {
		// 	console.log('TODO: ここ作ってないから通るはずない');
			// document.app.DialogCanDoWithKakin.xxx('保存するには課金します');
		// }
		else {
			new Toast('タップで閉じる', true);
			const imageUrl = window.app.images.find(this.props.imageID).url;
			const $el = $(`<div class="fullscreenImage"><div class="imageContainer"><img src="${imageUrl}"></div></div>`)
			.appendTo('body')
			.on('click', function() {
				$el.remove();
			});
		}
	};

	handleClickFavorite = (instance)=> {
		if (instance.on);
		else {
			document.app.recommendation.setState({ open: true });
			// TODO:
			// window.app.session || countUp('favoriteCount') % 3 === 0 && new DrawerLetsSignup().create();
		}
	};

	handleClose = ()=> {
		this.setState({ open: false });
	};

	render() {
		const imageID = this.props.imageID;

		return (
		<div className="Image" style={{ position: 'relative', width: '100%' }}>
			<GridListTileImage
				onClick={this.handleClickThumbnail}
				onClickOnFavorite={this.handleClickFavorite}
				className="main"
				guide={!window.app.session}
				image={window.app.images.find(imageID)}
			/>

			{window.app.isAdmin() ?
				<h3 style={{ color: 'white' }}
					onClick={(e)=> {
						window.Image.delete(imageID);
					}}>
					削除
				</h3>
				:
				<IconButton
					className="ReportIcon"
					onClick={(e)=> {
						document.app.setState({ DialogReport: true });
					}}>
					<ReportIcon />
				</IconButton>
			}

			<DialogReport imageID={imageID} />

			<DialogCanDoWithLogin
				html="保存するにはログインします"
				open={this.state.open}
				onClose={this.handleClose}
			/>
		</div>
		)
	}
}
