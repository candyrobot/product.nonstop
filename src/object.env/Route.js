import Route from '../object/Route';

// queryはユーザーに知られることを前提に書こう。URLで表現される。

// INFO: doAfterPushingの挙動が同じ場合、rootは使わないほうがいい。current(bool)を得るためのisメソッドをもうひとつ書くことになる。
// TODO: つまり初回のアクセスでもなんらかのクエリを持たさないといけないということ。

export default new Route([
	{
		default: true,
		key: 'imagesSortedByNewer',
		query: { method: 'image' },
	},
	{
		key: 'imagesSortedByPopular',
		query: { method: 'image', param: { sortBy: 'favorite' } },
	},
	{
		key: 'hot',
		query: { method: 'hot' },
	},
	{
		key: 'image',
		query: { method: 'image', param: { id: -1 } }
	},
	{
		key: 'user',
		query: { method: 'user' },
	},
	{
		key: 'myFavorites',
		query: { method: 'favorite' },
	},
]);
