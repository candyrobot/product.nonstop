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
  constructor(dbTableName, columnName, isTrue = false, opt = {}) {
    this.isTrue = isTrue;
    this.isRounded = !!opt.isRounded || false;
  }

  html() {
    return `
    <div class="component-fav ${this.isTrue} ${this.isRounded ? 'isRounded' : ''}">
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
  startLoading();
  if ($(el).is('.true')) {
    deleteFav(imageID)
    .done(()=> $(el).removeClass('true'))
    .fail(()=> toast('ログインするとお気入りに保存できます'))
    .always(stopLoading);
  } else {
    $.post(domain + '/favorites', {
      imageID: imageID
    }).fail((dat)=> {
      toast(dat.responseJSON.toast);
    })
    .done(()=> $(el).addClass('true'))
    .fail(()=> toast('ログインするとお気入りに保存できます'))
    .always(stopLoading);
  }
};
