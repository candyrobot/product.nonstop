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
  isJustAddedToHomescreen = false;

  constructor() {

    // TODO: created_atの値を文字列にしないとstringifyしたときに復元不可な値になってしまう
    // this.images = LocalStorage.read('images');

    if (query('utm_source', true) === 'homescreen') {
      this.isJustAddedToHomescreen = true;
      LocalStorage.create({ addedToHomescreen: true });
    }

    initializeRouteAndRedirect();

    Promise.all([
      this.readImages(),
      this.readAll(),
    ])
    .then((data)=> {
      const images = data[0];
      const dat = data[1];

      dat.images.concat(images);

      this.users = dat.users;
      this.images = dat.images;
      this.favorites = dat.favorites;
      this.session = dat.session;

      this._doAfterAllLoading();
    });
  }

  readImages() {
    return new Promise(function(resolve) {
      window.firebase.firestore().getImages((images)=> {
        console.log('firebase done.');
        resolve(images);
      });

    })
  }

  readAll() {
    return new Promise(function(resolve) {
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
        console.log('heroku done.');

        // INFO: firebaseと統一しておく
        dat.images = dat.images.map((i)=> (i.created_at = new Date(i.created_at), i));

        resolve(dat);
      });

    });
  }

  isAdmin() {
    return this.isLogined() && this.session && this.session.id === 1
  }

  isLogined() {
    return this.session;
  }

  isAddedToHomescreen() {
    return LocalStorage.read('addedToHomescreen');
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
    if (this.isJustAddedToHomescreen) {
      window.slack.postMessage('ホーム画面からアクセスされました userID: ' + window.app.session.id);
    }

    if (LocalStorage.read('addedToHomescreen') && window.app.session.id) {
      User.update(window.app.session.id, { addedToHomescreen: true });
      console.log('isAddedToHomescreen', '更新しました');
    }

    this.doAfterLoading();
  }
}
