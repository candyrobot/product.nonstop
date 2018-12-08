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

  images(id) {
    // 初期化
    $('.area-recommendation').hide(300);
    if(id) {
      const url = `/?method="images"&param=${id}`;
      const title = `画像 ID: ${id}`;
      window.history.pushState({url: url, title: title}, title, url);
      // INFO: don't forget.
      // this.currentUrl = window.history.state ? window.history.state.url : '';
      renderImage(id);
      renderLayer2Row1(id);
    }
    else
      renderImages();
  }
}

window.Route = new Route();
