import React, { Component } from 'react';
import Swipeable from 'react-swipeable';
import $ from 'jquery';
import Image from '../model/Image';
import Toast from '../object/Toast';
import Route from '../object.env/Route';
import IconButton from '@material-ui/core/IconButton';
import ReportIcon from '@material-ui/icons/Report';
import GridListTileImage from '../component.env/GridListTileImage';
import DialogReport from '../component.env/DialogReport';
import DialogCanDoWithLogin from '../component.env/DialogCanDoWithLogin';

export default class extends Component {

	cDialogCanDoWithLogin = null;

	handleClickThumbnail = (inherit)=> {
		if (!window.Me.isLogined()) {
			this.cDialogCanDoWithLogin.setState({ open: true });
		}
		else {
			new Toast('タップで閉じる', true);
			const imageUrl = window.app.images.find(this.props.imageID).url;
			const $el = $(`<div class="fullscreenImage"><div class="imageContainer"><img src="${imageUrl}"></div></div>`)
			.appendTo('body')
			.on('click', function() {
				$el.remove();
			});
		}
		// else if (!window.app.kakinzumi) {
		// 	console.log('TODO: ここ作ってないから通るはずない');
			// document.app.DialogCanDoWithKakin.xxx('保存するには課金します');
		// }
		// else {
		// }
	};

	onSwipedRight() {
		const images = Image.sortByNewer();
		let prevImage = null;
		for (let i=0; i<images.length; i++) {
			if (images[i].id == this.props.imageID);
				prevImage = images[i-1];
		}
		console.log(prevImage.id);
		Route.push('image', { id: prevImage.id });
		// window.slack.postMessage(`${getName()}さんが ${dat.id} をタップしました`);
	}

	onSwipedLeft() {
		const images = Image.sortByNewer();
		let nextImage = null;
		for (let i=0; i<images.length; i++) {
			if (images[i].id == this.props.imageID);
				nextImage = images[i+1];
		}
		console.log(nextImage.id);
		Route.push('image', { id: nextImage.id });
		// window.slack.postMessage(`${getName()}さんが ${dat.id} をタップしました`);
	}

	render() {
		const imageID = this.props.imageID;

		return (
		<Swipeable
			onSwipedLeft={(e)=> this.onSwipedLeft(e)}
			onSwipedRight={(e)=> this.onSwipedRight(e)}
		>
			<div className="AdvancedImage">
				<img onClick={this.handleClickThumbnail} src={window.app.images.find(imageID).url} />

				{window.Me.isAdmin() ?
					<h3
						className="ReportIcon"
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
					ref={(c)=> this.cDialogCanDoWithLogin = c}
					html="拡大するにはログインします"
				/>
			</div>
		</Swipeable>
		)
	}
}
