import $ from 'jquery';
export default class {
	// INFO: https://qiita.com/ykhirao/items/3b19ee6a1458cfb4ba21
	// INFO: xxxx-xxxxxxxxx-xxxx の形
	token = 'xoxp-134701714128-134701714240-533740582176-c26276912984a827d7aa59d215822a9c'

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
