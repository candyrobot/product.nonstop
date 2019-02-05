import $ from 'jquery';
export default class Element {
	$el = null;
	create() {
		this.$el = $(this.html()).hide().appendTo('body').show(300);
		this.$el.get()[0].o = this; // INFO: メソッドらが使える onClick="$(event.target).closest(parent).get()[0].o.xxxx"
		this.doAfterCreate && this.doAfterCreate(this.$el);
		return this.$el;
	}
	delete() {
		this.$el.hide(300, ()=> this.$el.remove());
	}
}
