import $ from 'jquery';
import './toggle.css';
export default class Toggle {
  constructor(dbTableName, columnName, isTrue = false) {
    this.isTrue = isTrue;
  }

  html() {
    return `
    <div class="component-fav ${this.isTrue}">
      <span>♡</span>
      <span>♥</span>
    </div>
    `;
  }

  toggle() {
    // if (this.isTrue) {
    //   deleteFav(imageID)
    //   .done((function(_this) {
    //     return function() {
    //       return $(_this).removeClass('true');
    //     };
    //   })(this));
    // } else {
    //   return $.post(domain + '/favorites', {
    //     imageID: imageID
    //   }).fail(function(dat) {
    //     return toast(dat.responseJSON.toast);
    //   }).done((function(_this) {
    //     return function() {
    //       return $(_this).addClass('true');
    //     };
    //   })(this));
    // }
  }
}
