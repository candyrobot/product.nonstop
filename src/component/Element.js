import $ from 'jquery';
export default class Element {
	$el = null;
	create() {
		this.$el = $(this.html).hide().appendTo('body').show(300);
		return this.$el;
	}
	delete() {
		this.$el.hide(300, ()=> this.$el.remove());
	}
}
