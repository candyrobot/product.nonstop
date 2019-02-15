import $ from 'jquery';
import Toast from '../object/Toast';
import {
  domain,
  startLoading,
  stopLoading,
  getName
} from '../component.env/_util';

export default new class {
  create(imageID, instance) {
    window.slack.postMessage(`${getName()}さん 画像ID: ${imageID} お気入りボタン クリックしました`);
    if (!window.app.session) {
      new Toast('ログインするとお気入りに保存できます', true);
      return;
    }
    const $el = startLoading();
    $.ajax({
      type: 'POST',
      url: domain + '/favorites',
      data: { imageID },
      headers: {
        'X-CSRF-Token': localStorage.getItem('app.nonstop.session.token')
      }
    })
    .fail((dat)=> {
      new Toast(dat.responseJSON.toast, true);
    })
    .done((favorites)=> {
      window.app.favorites.push(favorites[0]);
      instance.setState({});
    })
    .always(()=> stopLoading($el));
  }

  delete(imageID, instance) {
    window.slack.postMessage(`${getName()}さん 画像ID: ${imageID} 否お気入りボタン クリックしました`);
    if (!window.app.session) {
      new Toast('ログインするとお気入りに保存できます', true);
      return;
    }
    const $el = startLoading();
    $.ajax({
      type: 'DELETE',
      url: domain + '/favorites',
      data: { imageID },
      headers: {
        'X-CSRF-Token': localStorage.getItem('app.nonstop.session.token')
      }
    })
    .done(()=> {
      window.app.favorites = window.app.favorites.exclude({ imageID, userID: window.app.session.id });
      instance.setState({});
    })
    .fail(function(dat) {
      return new Toast(dat.responseJSON.toast, true);
    })
    .always(()=> stopLoading($el));
  }
}
