import $ from 'jquery';
import '../object/Array';
import '../object/FileList';
import Route from '../object/Route';
import LocalStorage from '../object/LocalStorage';
import Firestore from '../object/Firestore';
import Me from '../object/Me';
import Toast from '../object/Toast';
import Image from '../model/Image';
import User from '../model/User';
import {
  domain,
  query
} from '../component.env/_util';

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
  loaded = false;
  isJustAddedToHomescreen = false;

  constructor() {

    window.slack.postMessage(`アクセスされました userID: ${window.app && window.app.session && window.app.session.id}`);

    this.images = LocalStorage.read('images');

    if (query('utm_source', true) === 'homescreen') {
      this.isJustAddedToHomescreen = true;
      LocalStorage.create({ addedToHomescreen: true });
    }

    initializeRouteAndRedirect();

    Promise.all([
      this.readImages(),
      this.readAll(),
      this.readUsers()
    ])
    .then((data)=> {
      this.loaded = true;


      const images = data[0];
      const dat = data[1];
      const users = data[2];

      dat.images = dat.images.concat(images);


      // INFO: マージする
      users.forEach((_u)=> {
        const u = dat.users.find(_u.id);
        if (u === undefined)
          return;
        Object.assign(u, _u);
      });


      this.users = dat.users;
      this.images = dat.images;
      this.favorites = dat.favorites;
      this.session = dat.session;


      if (this.session) {
        // TODO: window.app.session を廃止して window.Me.session にしたい。
        // したら Me.assign(dat.session) だけで良くなる
        Me.setSession(this.session);
        Me.assign(this.users.find(this.session.id));
      }


      if (this.isJustAddedToHomescreen) {
        window.slack.postMessage('ホーム画面からアクセスされました userID: ' + window.app.session.id);
      }

      if (LocalStorage.read('addedToHomescreen') && window.app.session.id) {
        User.update(window.app.session.id, { addedToHomescreen: true });
        console.log('isAddedToHomescreen', '更新しました');
      }


      if (!Me.isLogined()) {
        setTimeout(()=> {
          new Toast('タップして拡大できます', true);
        }, 1000 * 15);
      }


      this.doAfterLoading();
    });
  }

  readUsers() {
    return new Promise(function(resolve) {
      Firestore.readUsers().done((d)=> {
        console.log('firebase users done.');
        resolve(d);
      });
    });
  }

  readImages() {
    return new Promise(function(resolve) {
      Firestore.readImages().done((d)=> {
        console.log('firebase images done.');
        resolve(d);
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
        dat.images = dat.images.map((v)=> (v.created_at = new Date(v.created_at).getTime(), v));
        dat.users = dat.users.map((v)=> (v.id = v.id.toString(), v));

        resolve(dat);
      });

    });
  }

  isLoaded() {
    return this.loaded;
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
}
