import $ from 'jquery';

/**
- 返す値
	- viewableDataのみ
- 定義する関数
	- get系: sort, filter, add propaty to the viewableData
	- set系: 通信し、callbackでdatを更新する

Gateway.set(v)
.done(()=> {
	this.setState( images: Gateway.getImagesSorted() )
})
*/
class Gateway {
	// INFO: サーバーから得た無加工のデータ
	dat = {}
	fn = function() {}
	constructor() {
		$.get('http://with-one-account-prd.herokuapp.com/application')
		.done((dat)=> {
			this.dat = dat;
			this.fn();
		});
	}

	done(fn) {
		this.fn = fn;
	}

	getImages() {
		return this.dat.images
	}
}

// INFO: https://qiita.com/NeGI1009/items/f8b17d856a4b15b1ecbc
export default new Gateway();
