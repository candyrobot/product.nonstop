import $ from 'jquery';
export default class {
	// INFO: https://qiita.com/ykhirao/items/3b19ee6a1458cfb4ba21
	// INFO: xxxx-xxxxxxxxx-xxxx の形
	// INFO: 設定を変えるとトークンが変わる可能性がある
	token = 'xoxp-134701714128-134701714240-534586073603-c3e48e0b5de827591b8800945f0d1ab9'

	postMessage(text = ':heartpulse:', opt = {}) {
		$.ajax({
			type: 'GET', url: 'https://slack.com/api/chat.postMessage',
			data: Object.assign({
				token: this.token,
				channel: '#app-nonstop',
				username: 'app-nonstop',
				text
			}, opt),
		})
		.fail((a,b,c)=> console.log('fail slack:', a,b,c))
		.done((data)=> {
			console.log('Can I post to Slack? :' + data.ok );
		});
	}
}

export const slackMessage = {
	login: (username)=> `
	${username}さんがログインしました
	`,
	signup: (username)=> `
	:new: ${username}さんがサインアップしました
	`,
	postImage: (username)=> `
	${username}さんが画像を投稿しました
	`,
	like: (username, imageID)=> `
	${username}さんが画像ID:${imageID}をお気入りに入れました
	`,
	unlike: (username, imageID)=> `
	${username}さんが画像ID:${imageID}をお気入りから外しました
	`,
};
