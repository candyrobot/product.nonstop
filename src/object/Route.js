import $ from 'jquery';
import {
  query,
} from '../component.env/_util';

// 使い方: Route.push('imagesSortedByPopular');
// 使い方: Route.push('image', { id: 1 });
// 使い方: Route.is('imagesSortedByPopular')

class Route {

  routes = [];
  doWhen = {
    beforePushing: ()=> {},
    afterPushing: ()=> {},
    popstate: ()=> {},
  };

  constructor(routes) {
    this.routes = routes;
  }

  is(variable) {
    const route = this.routes.where({ variable })[0];
    return (
      query('method') === route.query.method
      && JSON.stringify(query('param')) === JSON.stringify(route.query.param)
    );
  }

  // TODO: routesに登録していない場合はundefinedを返す
  getCurrent() {
    
    if (this.routes.filter((v)=> v.query.method === query('method')).length === 0)
      return undefined;
    
    // return routes.filter((v)=> {
    //   return query('method') === v.method && query('param') === v.param
    // })[0].variable
  }

  redirectToDefault() {
    this.push(this.routes.where({ default: true })[0].variable);
  }

  /**
   * @param  {string} variable [description]
   * @param  {object} param    [description]
   */
  push(variable, param) {
    this.doWhen.beforePushing();

    const route = this.routes.where({ variable })[0];
    let url = '';

    if (route.query.method)
      url += `/?method="${route.query.method}"`;

    if (param)
      route.query.param = Object.assign(route.query.param || {}, param);
    if (route.query.param)
      url += `&param=${JSON.stringify(route.query.param)}`;

    const title = url;
    const state = { url, title, variable };
    window.history.pushState(state, title, url);

    this.doWhen.afterPushing(state);

    return this;
  }

  updateState(newState) {
    this.replaceHistory(Object.assign(window.history.state || {}, newState));
  }

  replaceHistory(state) {
    const { url, title } = window.history.state || {};
    window.history.replaceState(state, title, url);
  }

  on(eventName, fn) {
    if (eventName === 'popstate')
      $(window).on('popstate', (e)=> {
        fn(e);
      });
    else
      this.doWhen[eventName] = fn;
  }
}

export default Route;
