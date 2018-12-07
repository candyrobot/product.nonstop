import $ from 'jquery';
import {
  getUrlParameter,
  existParameter,
  countUp,
  startLoading,
  stopLoading,
  deleteFav,
  domain,
  toast
} from './_util';
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

  toggle(el, imageID) {
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

Toggle.toggle = (el, imageID)=> {
  if ($(el).is('.true')) {
    deleteFav(imageID).done(()=> $(el).removeClass('true'));
  } else {
    $.post(domain + '/favorites', {
      imageID: imageID
    }).fail((dat)=> {
      toast(dat.responseJSON.toast);
    }).done(()=> $(el).addClass('true'));
  }
};
