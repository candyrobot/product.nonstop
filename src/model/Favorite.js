import $ from 'jquery';
import Toast from '../object/Toast';
import {
  domain,
  startLoading,
  stopLoading
} from '../component.env/_util';

export default new class {
  create(imageID, instance) {
    if (!window.dat.session) {
      new Toast('ログインするとお気入りに保存できます', true);
      return;
    }
    startLoading();
    $.post(domain + '/favorites', { imageID })
    .fail((dat)=> {
      new Toast(dat.responseJSON.toast, true);
    })
    .done((favorites)=> {
      window.dat.favorites.push(favorites[0]);
      instance.setState({});
    })
    .always(stopLoading);
  }

  delete(imageID, instance) {
    if (!window.dat.session) {
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
      window.dat.favorites = window.dat.favorites.exclude({ imageID, userID: window.dat.session.id });
      instance.setState({});
    })
    .fail(function(dat) {
      return new Toast(dat.responseJSON.toast, true);
    })
    .always(stopLoading);
  }
}
