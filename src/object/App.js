import $ from 'jquery';
import '../object/Array';
import '../object/FileList';
import '../object/firebase';
import Route from '../object/Route';
import Image from '../model/Image';
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

  const routes = [
    {
      default: true,
      variable: 'imagesSortedByNewer',
      query: { method: 'image' },
    },
    {
      variable: 'imagesSortedByPopular',
      query: { method: 'image', param: { sortBy: 'favorite' } },
    },
    {
      variable: 'image',
      query: { method: 'image', param: { id: -1 } },
      doAfterPushing: function(inherit) {
        window.app.images = window.app.images.shuffle();
        $('.forAppBar').scrollTop(0);
        inherit();
        // inheritを実行しなければ、newした時に設定したdoAfterPushingを実行しない。
      }
    },
    {
      variable: 'user',
      query: { method: 'user' },
    },
    {
      variable: 'myFavorites',
      query: { method: 'favorite' },
    },
  ];

  window.Route = new Route({
    routes,
    doAfterPushing: function() {
      if (!document.app)
        return;

      document.app.setState({});
      document.app.recommendation.setState({ open: false });
    }
  });
}

export default class {
  doAfterLoading = function() {};
  images = []
  users = []
  favorites = []
  constructor() {

    if (query('utm_source', true) === 'homescreen') {
      window.slack.postMessage('ホーム画面からアクセスされました');
    }

    initializeRouteAndRedirect();

    let n = 0;

    // Server.firestore.load((images)=> {

    // });
    // Server.heroku.load((dat)=> {
    //   this.isLoadedSessionData = true;
    // });

    window.firebase.firestore().getImages((images)=> {
      n++; console.log('firebase done.');

      this.images = this.images.concat(images);

      if (n === 2)
        this._doAfterAllLoading();
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

      this.images = this.images.concat(dat.images);

      if (n === 2)
        this._doAfterAllLoading();
    });
  }

  isAdmin() {
    return this.isLoaded() && this.isLogined() && this.session && this.session.id === 1
  }

  isLoaded() {
    return this.session !== undefined;
  }

  isLogined() {
    return this.session;
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
    this.images = this.images.shuffle();
    this.doAfterLoading();
  }
}
