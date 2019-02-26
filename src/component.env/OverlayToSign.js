import $ from 'jquery';
import {
  login,
  signup
} from './_util';
import Element from '../component/Element';
import './overlay.css';

export default new class extends Element {
	
	login() {
		login()
	}
	
	signup() {
		signup()
	}

	html() {
		const e = `$(event.target).closest('.component-layer').get()[0].o`;
		return `
		<div class="component-layer" style="z-index: 1300">
			<div id="component-login"
				class="component-overlay flex-justify-center">
				<div class="small">忘れないようにメモを。</div>
				<input type="text" class="email" name="email" placeholder="email" />
				<input type="password" class="password" name="password" placeholder="password" />
				<div class="">
					<button class="button" onClick="${e}.login()">ログイン</button>
					<div class="small toSwitchSignUp"
					onClick="
						$(event.target).parent().hide(300);
						$(event.target).parent().next().show(300);">
					　新規登録 ＞
					</div>
				</div>
				<div style="display: none">
					<button class="button" onClick="${e}.signup()">サインアップ</button>
					<div class="small"
					onClick="
						$(event.target).parent().hide(300);
						$(event.target).parent().prev().show(300);">
					＜ ログイン　
					</div>
				</div>
				<div class="close" onClick="${e}.delete()">×</div>
			</div>
		 </div>
		`;
	}
}
