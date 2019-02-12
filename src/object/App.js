import $ from 'jquery';
import '../object/Array';
import '../object/FileList';
import '../object/firebase';
import Route from '../object/Route';
import LocalStorage from '../object/LocalStorage';
import Image from '../model/Image';
import User from '../model/User';
import {
  domain,
  query
} from '../component.env/_util';

// const Server = {
//   firestore: {
//     load: ()=> {

//     }
//   },
//   heroku: {
//     load: ()=> {

//     }
//   }
// };

function initializeRouteAndRedirect() {
  // queryはユーザーに知られることを前提に書こう。URLで表現される。

  // INFO: doAfterPushingの挙動が同じ場合、rootは使わないほうがいい。current(bool)を得るためのisメソッドをもうひとつ書くことになる。
  // TODO: つまり初回のアクセスでもなんらかのクエリを持たさないといけないということ。

  window.Route = new Route([{
    default: true,
    variable: 'imagesSortedByNewer',
    query: { method: 'image' },
  }, {
    variable: 'imagesSortedByPopular',
    query: { method: 'image', param: { sortBy: 'favorite' } },
  }, {
    variable: 'image',
    query: { method: 'image', param: { id: -1 } }
  }, {
    variable: 'user',
    query: { method: 'user' },
  }, {
    variable: 'myFavorites',
    query: { method: 'favorite' },
  }]);
}

export default class {

  doAfterLoading = function() {};
  images = [];
  users = [];
  favorites = [];
  isLoaded = false;

  constructor() {

    // TODO: created_atの値を文字列にしないとstringifyしたときに復元不可な値になってしまう
    // this.images = LocalStorage.read('images');

    initializeRouteAndRedirect();

    if (LocalStorage.read('addedToHomescreen') && window.app && window.app.session) {
      User.update(window.app.session.id, { isAddedToHomescreen: true });
      console.log('isAddedToHomescreen', '更新しました');
    }

    let n = 0;

    // Server.firestore.load((images)=> {

    // });
    // Server.heroku.load((dat)=> {
    //   this.isLoadedSessionData = true;
    // });

    window.firebase.firestore().getImages((images)=> {
      n++; console.log('firebase done.');

      if (n === 2) {
        this.images = this.images.concat(images);
        this._doAfterAllLoading();
      }
      else {
        this.images = images;
      }
    });

    // TODO: herokuが重い。改善しないと表示が遅い
    // いやfirebaseのほうが遅い
    $.ajax({
      type: 'GET',
      url: domain + '/application' + window.location.search,
      headers: {
        'X-CSRF-Token': localStorage.getItem('app.nonstop.session.token')
      }
    })
    .done((dat)=> {
      n++; console.log('heroku done.');

      this.users = dat.users;
      this.favorites = dat.favorites;
      this.session = dat.session;

      // INFO: firebaseと統一しておく
      dat.images = dat.images.map((i)=> (i.created_at = new Date(i.created_at), i));

      if (n === 2) {
        this.images = this.images.concat(dat.images);
        this._doAfterAllLoading();
      }
      else {
        this.images = dat.images;
      }
    });
  }

  isAdmin() {
    return this.isLogined() && this.session && this.session.id === 1
  }

  isLogined() {
    return this.session;
  }

  isAddedToHomescreen() {
    return !!JSON.parse(localStorage.getItem('app.nonstop.addedToHomescreen'));
  }

  favorite(param) {
    return {
      images: Image.filterByMyFavorite(),
    }
  }

  user() {
    return this
  }

  image(param) {
    return {
      images: param && param.id ? Image.sortByRelatedEffort(param.id) : Image.sortByNewer()
    };
  }

  _doAfterAllLoading() {
    this.isLoaded = true;
    if (query('utm_source', true) === 'homescreen') {
      window.slack.postMessage('ホーム画面からアクセスされました userID: ' + window.app.session.id);
      localStorage.setItem('app.nonstop.addedToHomescreen', true);
    }
    

    this.doAfterLoading();
  }
}
