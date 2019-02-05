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
		return isAndroid()
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
						（右のようなアイコンです）
						<ol>
							<li>${this.isAndroid() ? 'Chrome' : 'Safari'}で開く</li>
							<li>${this.isAndroid() ? '右上の設定を開く' : '下から設定を開く'}</li>
							<li>ホーム画面に追加する旨${this.isAndroid() ? '' : 'のアイコン'}をタップ</li>
						</ol>
					</div>
				</div>

				<h5>👇 やり方を動画で解説</h5>
				<iframe frameBorder="0" allowFullScreen
					allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
				></iframe>

				<!--
				<div class="frombottom">
				</div>
				-->
				<div class="close" onClick="${e}.delete()">×</div>
			</div>
		</div>
		`;
	}
}
