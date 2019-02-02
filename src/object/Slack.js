import $ from 'jquery';
export default class {
	// INFO: https://qiita.com/ykhirao/items/3b19ee6a1458cfb4ba21
	// INFO: xxxx-xxxxxxxxx-xxxx の形
	// INFO: 設定を変えるとトークンが変わる可能性がある
	token = 'xoxp-134701714128-134701714240-535034012801-a0bbb411130cc7127d66b52f8c276622'

	// INFO: https://gist.github.com/achavez/9767499
	// INFO: https://www.sejuku.net/blog/74471
	postMessage(text = ':heartpulse:', opt = {}) {
		var url = 'https://hooks.slack.com/services/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';
		$.ajax({
				data: 'payload=' + JSON.stringify({
						"text": text
				}),
				dataType: 'json',
				processData: false,
				type: 'POST',
				url: url
		})
		.done((a,b,c)=> console.log(1, a,b,c))
		.fail((a,b,c)=> console.log(2, a,b,c))
	}

	// postMessage(text = ':heartpulse:', opt = {}) {
	// 	$.ajax({
	// 		type: 'GET', url: 'https://slack.com/api/chat.postMessage',
	// 		data: Object.assign({
	// 			token: this.token,
	// 			channel: '#app-nonstop',
	// 			username: 'app-nonstop',
	// 			text
	// 		}, opt),
	// 	})
	// 	.fail((a,b,c)=> console.log('fail slack:', a,b,c))
	// 	.done((data)=> {
	// 		console.log('Can I post to Slack? :' + data.ok );
	// 	});
	// }

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
	${username}さんが画像ID: ${imageID} をお気入りに入れました
	`,
	unlike: (username, imageID)=> `
	${username}さんが画像ID: ${imageID} をお気入りから外しました
	`,
};
