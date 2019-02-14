import React, { Component } from 'react';

export default class extends Component {
	render() {
		const t = encodeURI('Tumblrより画像収拾が8.3倍捗ると話題『nonStop』　pic.twitter.com/WREvim9ydM　リンク: ');
		const u = encodeURI('https://nonstop-vr.firebaseapp.com/');
		const h = encodeURI('nonstopVr');
		const o = encodeURI(window.location.href);

		return (
			<div className="component-suggestion paper">
				<h3 style={{ fontSize: 18, textIndent: '.5em' }}>
					このアプリを拡散希望🌟
				</h3>
				<p>
					まだまだ画像不足！<br />
					拡散して毎日画像を投稿してもらおう！
				</p>
				<p style={{ fontSize: 10, fontWeight: 'bold' }}>
					※ツイートするとこのポップアップはしばらくでてきません
				</p>
				<p text-align="center">
					<a
						target="_blank"
						style={{ padding: '.5em 1em' }}
						className="button"
						onClick={()=> this.onClick()}
						href={
						`https://twitter.com/intent/tweet?text=${t}&url=${u}&original_referer=${o}&hashtags=${h}`
						}
						>
						<i className="fab fa-twitter" style={{ paddingRight: 5 }}></i>
						画像をもっと増やしてもらう🌟
					</a>
				</p>
			</div>
		);
	}
}
