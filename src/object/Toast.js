import $ from 'jquery';
// Usage1
// 	new Toast('message', 10000 or true);
//  trueにすると自動で消える

// Usage2
// 	const o = new Toast('message');
// 	o.html('更新');
// 	$('body').on('click', ()=> o.destroy());

export default class {
	$el
	txt
	constructor(txt, millisec) {
		this.txt = txt;
		if (millisec === true)
			millisec = 2500;

		if (typeof millisec === 'number')
			setTimeout(()=> this.destroy(), millisec);

		this.create();
	}

	destroy() {
		this.$el.hide(300, ()=> this.$el.remove());
	}

	create() {
		this.$el = 
		$(`<div style="display: none">${this.txt}</div>`)
		.appendTo('#layer-appMessages .alerts')
		.css({ x: '100%' })
		.show()
		.transit({ x: '0%' });
	}

	html(html) {
		this.$el.html(html);
	}
}
