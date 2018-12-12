import $ from 'jquery';
import {
  getUrlParameter,
  existParameter
} from './_util';
import { renderImage, renderImages } from './gridList';
import { renderLayer2Row1 } from './_layer2Row1';

// INFO: "imageIDが3かつuserIDが4"のような指定ができるようにするために、すべてクエリで表現。パスにはしない。
class Route {
  currentUrl = '';

  constructor() {
    $(window).on('popstate', (e)=> {
      console.log(e);
      // INFO: 進む/戻るボタンが反応していないのか戻れなくなる。その対策。URLが前と同じなら
      if(window.history.state && window.history.state.url === this.currentUrl)
        window.history.go(-1);
      // INFO: don't forget.
      this.currentUrl = window.history.state ? window.history.state.url : '';
      this.refresh();
    });
  }

  refresh() {
    const method = getUrlParameter('method') || 'images';
    const param = getUrlParameter('param') || undefined;
    this[method](param);
    $('#component-actions .login')[window.dat.session ? 'hide' : 'show']();
  }

  push(method, opt = {}) {
    const url = `/?method="${method}"&param=${JSON.stringify(opt)}`;
    const title = `${method} param: ${JSON.stringify(opt)}`;
    window.history.pushState({url: url, title: title}, title, url);
    // INFO: don't forget.
    // this.currentUrl = window.history.state ? window.history.state.url : '';
    return this;
  }

  images(opt = {}) {
    if(opt.id) {
      renderImage(opt.id);
      renderLayer2Row1(opt.id);
    }
    else {
      $('#layer2-row1').html('');
      renderImages(opt);
    }
  }
}

window.Route = new Route();
