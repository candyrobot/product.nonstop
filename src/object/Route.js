import $ from 'jquery';
import {
  query,
} from '../component.env/_util';

// 使い方: Route.push('imagesSortedByPopular');
// 使い方: Route.push('image', { id: 1 });
// 使い方: Route.is('imagesSortedByPopular')

class Route {
  routes = [];

  constructor(setup = {}) {
    this.doAfterPushing = setup.doAfterPushing || function() {};
    setup.routes.forEach((r)=> this.set(r));

    // INFO: redirect
    this.routes
      .filter((v)=> v.query.method === query('method')).length === 0 &&
        this.push(this.routes.where({ default: true })[0].variable);
  }

  is(variable) {
    const route = this.routes.where({ variable })[0];
    return (
      query('method') === route.query.method
      && JSON.stringify(query('param')) === JSON.stringify(route.query.param)
    );
  }

  // getCurrent() {
  //   return routes.filter((v)=> {
  //     return query('method') === v.method && query('param') === v.param
  //   })[0].variable
  // }

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

    this.updateState({
      imagesHorizontal_scrollLeft: $('.component-images-horizontal').scrollLeft(),
      areaRecommendation_open: $('.area-recommendation').is(':visible')
    });
  }

  updateState(newState) {
    this.replaceHistory(Object.assign(window.history.state || {}, newState));
  }

  replaceHistory(state) {
    const { url, title } = window.history.state || {};
    window.history.replaceState(state, title, url);
  }

  set(o) {
    this.routes.push(o);
  }
}

export default Route;
