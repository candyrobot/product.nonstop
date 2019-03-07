import React, { Component } from 'react';
import Swipeable from 'react-swipeable';
import $ from 'jquery';
import {
	getName
} from '../component.env/_util';
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
		const index = images.find(this.props.imageID, true);
		const targetImage = images[index - 1];
		if (targetImage === undefined)
			return;
		Route.push('image', { id: targetImage.id });
		window.slack.postMessage(`${getName()}さんが ${targetImage.id} をflickしました`);
	}

	onSwipedLeft() {
		const images = Image.sortByNewer();
		const index = images.find(this.props.imageID, true);
		const targetImage = images[index + 1];
		if (targetImage === undefined)
			return;
		Route.push('image', { id: targetImage.id });
		window.slack.postMessage(`${getName()}さんが ${targetImage.id} をflickしました`);
	}

	render() {
		const imageID = this.props.imageID;

		return (
		<Swipeable
			onSwipedLeft={(e)=> this.onSwipedLeft(e)}
			onSwipedRight={(e)=> this.onSwipedRight(e)}
			nodeName={'article'}
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
