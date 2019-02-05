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
		<div class="OverlayHowToAddToHomescreen component-layer" style="z-index: 1300">
			<div class="component-overlay">
				<h4 class="title">▼ ホーム画面に追加する方法</h4>
				<div class="component-mediabox">
					<img src="https://nonstop-vr.firebaseapp.com//icons.nonstop/icon-384x384.png" />
					<div class="desc">
						<b>👇 やり方を動画で解説</b><br />
						（右のようなアイコンです）
						<!--
						${this.isAndroid() ? 'Chrome' : 'Safari'}でホーム画面に
						<br />追加できます。
						-->
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
