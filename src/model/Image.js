import Firestore from '../object/Firestore';
// TODO: Arrayをextendsして
// window.images = new Image(...dat.images);
// window.images.sortByNewer()と使えるようにしたい
export default window.Image = new class {

	// INFO: CRUDから命名
	create(files) {

	}

	delete(imageID) {
		Firestore.update('images', imageID, { deleteFlag: true }) 
		alert('削除しました');
	}

	// 命名だけよかった
	// saveUrl(url) {
	// }

	sortByRelated(imageID) {
		return window.app.images
		.map((i)=> {
			i.relatedScore = window.app.favorites.where({imageID: imageID})
			.reduce((n, f)=> {
				return n + window.app.favorites.where({imageID: i.id, userID: f.userID}).length;
			}, 0);
			return i;
		}).sort((iA, iB)=> iA.relatedScore > iB.relatedScore ? -1 : 1);
	}

	sortByNewer() {
		return window.app.images.sort((iA, iB)=> {
			return iA.created_at.getTime() > iB.created_at.getTime() ? -1 : 1;
		});
	}

	sortByFavorites() {
		return window.app.images
		.map((i)=> {
			i.favorites = window.app.favorites.where({ imageID: i.id });
			return i;
		})
		.sort((iA, iB)=> iA.favorites.length > iB.favorites.length ? -1 : 1 );
	}

	sortByRelatedEffort(imageID) {
		let images;
		if (this.isEnoughToShowRecommendation(imageID)) {
			images = this.sortByRelated(imageID);
		}
		else {
			images = window.app.images.shuffle(imageID);
		}
		return this.excludeIFavorited(images.exclude({ id: imageID }));
	}

	// INFO: sortByRelatedアルゴリズムに必要なfavrite数があればtrue
	isEnoughToShowRecommendation(imageID) {
		return window.app.favorites.where({ imageID }).length > 3
	}

	filterByMyFavorite() {
		return window.app.images.filter((i)=> window.app.favorites.where({ imageID: i.id, userID: window.app.session.id }).length);
	}

	// TODO: Arrayをextendsしたら引数をとる
	excludeIFavorited(images) {
		if (window.app === undefined || window.app.session === undefined)
			return [];
		return images.filter((i)=> {
			if (i === undefined)
				return false;
			return !window.app.favorites.where({imageID: i.id, userID: window.app.session.id}).length
		});
	}

	isIFavorited(imageID) {
		return !!window.app.favorites.where({imageID: imageID, userID: window.app.session.id}).length;
	}
}
