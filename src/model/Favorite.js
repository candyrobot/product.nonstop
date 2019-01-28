import $ from 'jquery';
import Toast from '../object/Toast';
import {
  domain,
  startLoading,
  stopLoading
} from '../component.env/_util';

export default new class {
  create(imageID, instance) {
    if (!window.app.session) {
      new Toast('ログインするとお気入りに保存できます', true);
      return;
    }
    startLoading();
    $.post(domain + '/favorites', { imageID })
    .fail((dat)=> {
      new Toast(dat.responseJSON.toast, true);
    })
    .done((favorites)=> {
      window.slack.postMessage(window.slackMessage.like(`${window.app.session.id} ${window.app.session.email}`), imageID);

      window.app.favorites.push(favorites[0]);
      instance.setState({});
    })
    .always(stopLoading);
  }

  delete(imageID, instance) {
    if (!window.app.session) {
      new Toast('ログインするとお気入りに保存できます', true);
      return;
    }
    startLoading();
    $.ajax({
      type: 'DELETE',
      url: domain + '/favorites',
      data: { imageID }
    })
    .done(()=> {
      window.slack.postMessage(window.slackMessage.unlike(`${window.app.session.id} ${window.app.session.email}`), imageID);

      window.app.favorites = window.app.favorites.exclude({ imageID, userID: window.app.session.id });
      instance.setState({});
    })
    .fail(function(dat) {
      return new Toast(dat.responseJSON.toast, true);
    })
    .always(stopLoading);
  }
}
