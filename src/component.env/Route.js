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
  constructor() {
    $(window).on('popstate', (e)=> {
      console.log(e);
      // INFO: 進むボタンが反応していないのか戻れなくなる。その対策。URLの差分がなければ
      // window.history.go(-2);
      this.refresh();
    });
  }

  refresh() {
    const method = getUrlParameter('method') || 'root';
    const param = getUrlParameter('param') || undefined;
    this[method](param);
  }

  root() {
    renderImages();
  }

  images(id) {
    if(id) {
      const url = `/?method="images"&param=${id}`;
      const title = `画像 ID: ${id}`;
      window.history.pushState({url: url, title: title}, title, url);
      renderImage(id);
      renderLayer2Row1(id);
    }
  }
}

window.Route = new Route();
