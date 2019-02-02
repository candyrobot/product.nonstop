import $ from 'jquery';
import Route from '../object/Route';
import {
  query,
} from '../component.env/_util';

// queryはユーザーに知られることを前提に書こう。URLで表現される。

// INFO: doAfterPushingの挙動が同じ場合、rootは使わないほうがいい。current(bool)を得るためのisメソッドをもうひとつ書くことになる。
// TODO: つまり初回のアクセスでもなんらかのクエリを持たさないといけないということ。

const routes = [
  {
    default: true,
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
  }
});

export default route;
