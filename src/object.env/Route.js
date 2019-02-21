import Route from '../object/Route';

// queryはユーザーに知られることを前提に書こう。URLで表現される。

// INFO: doAfterPushingの挙動が同じ場合、rootは使わないほうがいい。current(bool)を得るためのisメソッドをもうひとつ書くことになる。
// TODO: つまり初回のアクセスでもなんらかのクエリを持たさないといけないということ。

export default new Route([{
	default: true,
	variable: 'imagesSortedByNewer',
	query: { method: 'image' },
}, {
	variable: 'imagesSortedByPopular',
	query: { method: 'image', param: { sortBy: 'favorite' } },
}, {
	variable: 'image',
	query: { method: 'image', param: { id: -1 } }
}, {
	variable: 'user',
	query: { method: 'user' },
}, {
	variable: 'myFavorites',
	query: { method: 'favorite' },
}]);
