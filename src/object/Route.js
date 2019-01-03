import $ from 'jquery';

import {
  getUrlParameter,
  loadImage
} from '../component.env/_util';

class Route {
  routes = [];
  doAfterPushing = function() {};

  constructor(setup = {}) {
    setup.doAfterPushing && (this.doAfterPushing = setup.doAfterPushing);
  }

  is(variable) {
    const { query } = this.routes.where({ variable })[0];
    return (
      getUrlParameter('method') == query.method
      && JSON.stringify(getUrlParameter('param')) == JSON.stringify(query.param)
    );
  }

  /**
   * @param  {string} variable [description]
   * @param  {object} param    [description]
   */
  push(variable, param) {
    const { query, doAfterPushing } = this.routes.where({ variable })[0];
    let url = '';
    query.method && ( url += `/?method="${query.method}"` );
    param && ( query.param = Object.assign(query.param || {}, param) );
    query.param && ( url += `&param=${JSON.stringify(query.param)}` );
    const title = url;
    window.history.pushState({url: url, title: title}, title, url);
    doAfterPushing ? doAfterPushing(this.doAfterPushing) : this.doAfterPushing();
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
  query: { method: 'images', id: -1 },
  doAfterPushing: function(inherit) {
    $('.forAppBar').scrollTop(0);
    inherit();
    // inheritを実行しなければ、上記newした時に設定した値(関数リテラル)を実行しない。
  }
});

route.set({
  variable: 'users',
  query: { method: 'users' },
});

// 使い方: route.push('imagesSortedByPopular');
// 使い方: route.push('image', { id: 1 });
// 使い方: route.is('imagesSortedByPopular')

export default route;
