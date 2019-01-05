import $ from 'jquery';
import {
  domain
} from '../component.env/_util';

export default new class {
  doAfterLoading = function() {};
  images = []
  users = []
  favorites = []
  constructor() {
    let n = 0;
    window.firebase.firestore().getImages((images)=> {
      n++; console.log('firebase done.');

      this.images = this.images.concat(images);

      if (n === 2)
        this._xxxx();
    });

    // TODO: herokuが重い。改善しないと表示が遅い
    // いやfirebaseのほうが遅い
    $.get(domain + '/application' + window.location.search, (dat)=> {
      n++; console.log('heroku done.');

      this.users = dat.users;
      this.favorites = dat.favorites;
      this.session = dat.session;

      // INFO: firebaseと統一しておく
      dat.images = dat.images.map((i)=> (i.created_at = new Date(i.created_at), i));

      this.images = this.images.concat(dat.images);

      if (n === 2)
        this._xxxx();
    });
  }

  xxxx

  _xxxx() {
    this.images = this.images.shuffle();
    this.doAfterLoading();
  }

  favorite(param) {
    return {
      images: this.images.filterByMyFavorite()
    }
  }
}
