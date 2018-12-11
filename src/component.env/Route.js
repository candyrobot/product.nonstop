import $ from 'jquery';
import {
  getUrlParameter,
  existParameter
} from './_util';
import { renderImage, renderImages } from './gridList';
import { renderLayer2Row1 } from './_layer2Row1';


//   } else if (existParameter('most')) {
//     $('#component-actions .most').hide();
//     renderImages();
//   } else if (existParameter('favorite')) {
//     $('#component-actions .favorite').hide();
//     renderImages();
//   } else {
//     $('#component-actions .newPosts').hide();
//     renderImages();
//   }


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
      // 初期化
      $('.area-recommendation').hide(300);
      renderImages(opt);
    }
  }
}

window.Route = new Route();