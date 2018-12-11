// TODO: Arrayをextendsして 
// window.images = new Image(...dat.images);
// window.images.sortByNewer()と使えるようにしたい
class Image {
	constructor() {}

	sortByRelated(imageID) {
		return window.dat.images
		.map((i)=> {
			return i.relatedScore = window.dat.favorites.where({imageID: i.id})
			.reduce((n, f)=> {
				return n + window.dat.favorites.where({ userID: f.userID }).length;
			}, 0), i;
		}).sort((iA, iB)=> iA.relatedScore > iB.relatedScore ? -1 : 1);

		// return window.dat.favorites.where({imageID: imageID}).map((f)=> {
		// 	return window.dat.favorites.where({userID: f.userID})
		// 	.map((f)=> window.dat.images.find(f.imageID));
		// }).serialize().sortByFrequency();
	}

	sortByNewer() {
		return window.dat.images.sort((iA, iB)=> {
			return parseInt(iA.created_at.replace( /\D/g , '')) > parseInt(iB.created_at.replace( /\D/g , '')) ? -1 : 1;
		});
	}

	sortByFavorites() {
		return window.dat.images
		.map((i)=> {
			i.favorites = window.dat.favorites.filter((f)=> f.imageID == i.id);
			return i;
		})
		.sort((iA, iB)=> iA.favorites.length > iB.favorites.length ? -1 : 1 );
	}

	filterByMyFavorite() {
		return window.dat.images.filter((i)=> window.dat.favorites.where({ imageID: i.id, userID: window.dat.session.id }).length);
	}

	// TODO: Arrayをextendsしたら引数をとる
	excludeIFavorited(images) {
		return images.filter((i)=> {
			return !window.dat.favorites.where({imageID: i.id, userID: window.dat.session.id}).length
		});
	}

	isIFavorited(imageID) {
		return !!window.dat.favorites.where({imageID: imageID, userID: window.dat.session.id}).length;
	}
}

export default new Image();
