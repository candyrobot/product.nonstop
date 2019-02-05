import $ from 'jquery';
import {
	isAndroid,
	startLoading,
	stopLoading
} from './_util';
import Element from '../component/Element';
import './overlay.css';

export default new class extends Element {

	isAndroid() {
		isAndroid()
	}
	
	doAfterCreate($el) {
		const url = isAndroid() ? 'https://www.youtube.com/embed/f9MsSWxJXhc' : 'https://www.youtube.com/embed/8iueP5sRQ-Y';
		$el.find('iframe').attr('src', url);
		$el.find('iframe').on('load', ()=> stopLoading());
		startLoading();
	}

	html() {
		const e = `$(event.target).closest('.component-layer').get()[0].o`;
		return `
		<div class="component-layer" style="z-index: 1300">
			<div id="webview" class="component-overlay">
				<div class="component-mediabox">
					<img src="https://nonstop-vr.firebaseapp.com//icons.nonstop/icon-384x384.png" />
					<h4 class="title">やり方を動画で解説</h4>
					<div class="desc">
						${this.isAndroid() ? 'Chrome' : 'Safari'}でホーム画面に
						<br />追加できます。
					</div>
				</div>
				<div class="frombottom">
					<iframe frameBorder="0" allowFullScreen
						allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
				</div>
				<div class="close" onClick="${e}.delete()">×</div>
			</div>
		</div>
		`;
	}
}
