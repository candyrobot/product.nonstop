import { renderImage, renderImages } from './gridList';

// INFO: "imageIDが3かつuserIDが4"のような指定ができるようにするために、すべてクエリで表現。パスにはしない。
class Route {
  constructor() {
    window.addEventListener('popstate', (e)=> {
      this.root();
    });
  }

  root() {
    renderImages();
  }

  images(id) {
    if(id) {
      const url = `/?imageID=${id}`;
      const title = `画像 ID: ${id}`;
      window.history.pushState({url: url, title: title}, title, url);
      renderImage(id);
    }
  }
}

window.Route = new Route();
