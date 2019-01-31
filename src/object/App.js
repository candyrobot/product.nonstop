import $ from 'jquery';
import '../object/Array';
import '../object/FileList';
import '../object/firebase';
import Image from '../model/Image';
import {
  domain
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

export default class {
  doAfterLoading = function() {};
  images = []
  users = []
  favorites = []
  constructor() {
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
