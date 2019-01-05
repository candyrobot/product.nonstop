import $ from 'jquery';
import Toast from '../object/Toast';
import {
	countUp
} from '../component.env/_util';

export default window.Device = {
	Album: class {
		message = `
画像を投稿
🌟複数アップロード可能
🌟あまり多いと時間がかかるため少量をお薦めします
🌟コンセプトに不当な画像は後日削除されます
		`
		$input
		constructor() {
			if(countUp('Device.Album') < 3)
				alert(this.message);

			this.$input =
			$('<input type="file" accept="image/*,video/*" multiple />')
			.appendTo('body')
			.on('change', (e)=> {
				this.upload(e.target.files);
				this.destroy();
			})
			.click();
		}

		upload(files) {
			const toast = new Toast('アップロードを開始します');
			let n = 1;
			files.forEach((f)=> {
				window.firebase.storage().upload(f)
				.done((dat)=> {
						// TODO: ひとつずつsetStateしていきたい
						if(n === files.length) {
							setTimeout(()=> window.location.reload(), 1000);
							toast.destroy();
						}
						toast.html(`アップロード中 ${n}/${files.length}個完了`);
						n++;
				});
			});

			// Image.create(e.target.files);
		}

		destroy() {
			this.$input.remove();
		}
	}
}
