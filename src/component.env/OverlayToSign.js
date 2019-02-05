import $ from 'jquery';
import {
  login,
  signup
} from './_util';
import Element from '../component/Element';
import './overlay.css';

export default window.OverlayToSign = new class extends Element {
	html = `
	<div class="component-layer" style="z-index: 1300">
		<div id="component-login"
			class="component-overlay flex-justify-center">
			<div class="small">忘れないようにメモを。</div>
			<input type="text" class="email" name="email" placeholder="email" />
			<input type="password" class="password" name="password" placeholder="password" />
			<div class="">
				<button class="button" onClick="window.OverlayToSign.login()">ログイン</button>
				<div class="small toSwitchSignUp"
				onClick="
					$(event.target).parent().hide(300);
					$(event.target).parent().next().show(300);">
				　新規登録 ＞
				</div>
			</div>
			<div style="display: none">
				<button class="button" onClick="window.OverlayToSign.signup()">サインアップ</button>
				<div class="small"
				onClick="
					$(event.target).parent().hide(300);
					$(event.target).parent().prev().show(300);">
				＜ ログイン　
				</div>
			</div>
			<div class="close" onClick="window.OverlayToSign.delete()">×</div>
		</div>
	 </div>
	`;
	login() {
		login()
	}
	signup() {
		signup()
	}
}
