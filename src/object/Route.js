import $ from 'jquery';

import {
  query,
  loadImage
} from '../component.env/_util';

class Route {
  routes = [];
  doAfterPushing = function() {};

  constructor(setup = {}) {
    setup.doAfterPushing && (this.doAfterPushing = setup.doAfterPushing);
  }

  is(variable) {
    const route = this.routes.where({ variable })[0];
    return (
      query('method') == route.query.method
      && JSON.stringify(query('param')) == JSON.stringify(route.query.param)
    );
  }

  /**
   * @param  {string} variable [description]
   * @param  {object} param    [description]
   */
  push(variable, param) {
    const route = this.routes.where({ variable })[0];
    let url = '';
    route.query.method && ( url += `/?method="${route.query.method}"` );
    param && ( route.query.param = Object.assign(route.query.param || {}, param) );
    route.query.param && ( url += `&param=${JSON.stringify(route.query.param)}` );
    const title = url;
    window.history.pushState({url: url, title: title}, title, url);
    route.doAfterPushing ? route.doAfterPushing(this.doAfterPushing) : this.doAfterPushing();
    return this;
  }

  set(o) {
    this.routes.push(o);
  }
}

// depends on app from this line.

const route = new Route({
  doAfterPushing: function() {
    window.app.setState({});
    window.app.recommendation.setState({ open: false });
    setTimeout(()=> loadImage(), 500);
  }
});

// queryはユーザーに知られることを前提に書こう。URLで表現される。

// INFO: doAfterPushingの挙動が同じ場合、rootは使わないほうがいい。current(bool)を得るためのisメソッドをもうひとつ書くことになる。
// TODO: つまり初回のアクセスでもなんらかのクエリを持たさないといけないということ。
// route.set({
//   variable: 'root',
//   doAfterPushing: function(inherit) {
//     // TODO: images sorted by created_at
//     inherit();
//     // inheritを実行しなければ、上記newした時に設定した値(関数リテラル)を実行しない。
//   }
// });

route.set({
  variable: 'imagesSortedByNewer',
  query: { method: 'images' },
});

route.set({
  variable: 'imagesSortedByPopular',
  query: { method: 'images', param: { sortBy: 'favorite' } },
});

route.set({
  variable: 'image',
  query: { method: 'images', param: { id: -1 } },
  doAfterPushing: function(inherit) {
    window.dat.images = window.dat.images.shuffle();
    $('.forAppBar').scrollTop(0);
    inherit();
    // inheritを実行しなければ、上記newした時に設定した値(関数リテラル)を実行しない。
  }
});

route.set({
  variable: 'users',
  query: { method: 'users' },
});

route.set({
  variable: 'myFavorites',
  query: { method: 'favorite' },
});

// 使い方: route.push('imagesSortedByPopular');
// 使い方: route.push('image', { id: 1 });
// 使い方: route.is('imagesSortedByPopular')

export default route;
