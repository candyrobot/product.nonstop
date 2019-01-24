import $ from 'jquery';

import {
  query,
  loadImage
} from '../component.env/_util';

class Route {
  routes = [];

  constructor(setup = {}) {
    this.doAfterPushing = setup.doAfterPushing || function() {};
    setup.routes.forEach((r)=> this.set(r));
  }

  is(variable) {
    const route = this.routes.where({ variable })[0];
    return (
      query('method') === route.query.method
      && JSON.stringify(query('param')) === JSON.stringify(route.query.param)
    );
  }

  /**
   * @param  {string} variable [description]
   * @param  {object} param    [description]
   */
  push(variable, param) {
    this.doBeforePushing();

    const route = this.routes.where({ variable })[0];
    let url = '';

    if (route.query.method)
      url += `/?method="${route.query.method}"`;

    if (param)
      route.query.param = Object.assign(route.query.param || {}, param);
    if (route.query.param)
      url += `&param=${JSON.stringify(route.query.param)}`;

    const title = url;
    window.history.pushState({url, title}, title, url);
    route.doAfterPushing ? route.doAfterPushing(this.doAfterPushing) : this.doAfterPushing();
    return this;
  }

  doBeforePushing() {
    // if (!window.history.state)
    //   return;

    this.saveState();
  }

  saveState() {
    this.replaceHistory(Object.assign(window.history.state, {
      forAppBar_scrollTop: $('.forAppBar').scrollTop(),
      imagesHorizontal_scrollLeft: $('.component-images-horizontal').scrollLeft(),
      areaRecommendation_open: $('.area-recommendation').is(':visible')
    }));
  }

  replaceHistory(state) {
    const { url, title } = window.history.state || {};
    window.history.replaceState(state, title, url);
  }

  set(o) {
    this.routes.push(o);
  }
}


// depends on app from this line.


// queryはユーザーに知られることを前提に書こう。URLで表現される。

// INFO: doAfterPushingの挙動が同じ場合、rootは使わないほうがいい。current(bool)を得るためのisメソッドをもうひとつ書くことになる。
// TODO: つまり初回のアクセスでもなんらかのクエリを持たさないといけないということ。

const routes = [
  {
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

const route = new Route({
  routes,
  doAfterPushing: function() {
    if (!document.app)
      return;

    document.app.setState({});
    document.app.recommendation.setState({ open: false });
    setTimeout(()=> loadImage(), 500);
  }
});

if (window.location.search === '')
  route.push('imagesSortedByNewer')

// 使い方: route.push('imagesSortedByPopular');
// 使い方: route.push('image', { id: 1 });
// 使い方: route.is('imagesSortedByPopular')

export default route;
