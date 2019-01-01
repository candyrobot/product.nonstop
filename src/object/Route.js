import {
  getUrlParameter
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

  push(variable) {
    const { query, doAfterPushing } = this.routes.where({ variable })[0];
    let url = '';
    query.method && ( url += `/?method="${query.method}"` )
    query.param && ( url += `&param=${JSON.stringify(query.param)}` )
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
  variable: 'image.newer',
  query: { method: 'images' },
  doAfterPushing: function(inherit) {
    // TODO: images sorted by created_at
    inherit();
    // inheritを実行しなければ、上記newした時に設定した値(関数リテラル)を実行しない。
  }
});

route.set({
  variable: 'popular',
  query: { method: 'images', param: { sortBy: 'favorite' } },
  doAfterPushing: function(inherit) {
    inherit();
    // inheritを実行しなければ、上記newした時に設定した値(関数リテラル)を実行しない。
  }
});

route.set({
  variable: 'users',
  query: { method: 'users' },
  doAfterPushing: function(inherit) {
    // TODO: sortBy most having favorites.
    inherit();
    // inheritを実行しなければ、上記newした時に設定した値(関数リテラル)を実行しない。
  }
});

// 使い方: route.push('popular');
// 使い方: route.is('popular')

export default route;
