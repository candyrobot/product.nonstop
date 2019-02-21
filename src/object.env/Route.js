import Route from '../object/Route';

// queryはユーザーに知られることを前提に書こう。URLで表現される。

// INFO: doAfterPushingの挙動が同じ場合、rootは使わないほうがいい。current(bool)を得るためのisメソッドをもうひとつ書くことになる。
// TODO: つまり初回のアクセスでもなんらかのクエリを持たさないといけないということ。

// HINT: これでレイアウトを構成しちゃうくらい。こっちが親。Componentじゃない。

export default new Route([
	{
		default: true,
		key: 'imagesSortedByNewer',
		query: { method: 'image' },
		getViewableData: ()=> {
			return {
				LayerBase: {
					data: Image.sortByNewer().filter((v)=> !v.deleteFlag).filter((_, i)=> i < window.Me.getImageMaxDisplableNum())
				}
			}
		}
	},
	{
		key: 'imagesSortedByPopular',
		query: { method: 'image', param: { sortBy: 'favorite' } },
		getViewableData: ()=> {

		}
	},
	{
		key: 'pickup',
		query: { method: 'pickup' },
		getViewableData: ()=> {

		}
	},
	{
		key: 'image',
		query: { method: 'image', param: { id: -1 } },
		getViewableData: ()=> {
			Image.sortByRelatedEffort(param.id)
		}
	},
	{
		key: 'user',
		query: { method: 'user' },
		getViewableData: ()=> {
			this(window.app)
		}
	},
	{
		key: 'myFavorites',
		query: { method: 'favorite' },
		getViewableData: ()=> {
			Image.filterByMyFavorite()
		}
	},
]);
