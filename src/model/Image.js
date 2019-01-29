// TODO: Arrayをextendsして
// window.images = new Image(...dat.images);
// window.images.sortByNewer()と使えるようにしたい
export default window.Image = new class {

	// INFO: CRUDから命名
	create(files) {

	}

	delete(imageID) {
		window.firebase.firestore().delete(imageID);
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
		if (window.app.favorites.where({ imageID }).length > 3) {
			images = this.sortByRelated(imageID);
		}
		else {
			images = window.app.images;
		}
		return this.excludeIFavorited(images.exclude({ id: imageID }));
	}

	filterByMyFavorite() {
		return window.app.images.filter((i)=> window.app.favorites.where({ imageID: i.id, userID: window.app.session.id }).length);
	}

	// TODO: Arrayをextendsしたら引数をとる
	excludeIFavorited(images) {
		return images.filter((i)=> {
			return !window.app.favorites.where({imageID: i.id, userID: window.app.session.id}).length
		});
	}

	isIFavorited(imageID) {
		return !!window.app.favorites.where({imageID: imageID, userID: window.app.session.id}).length;
	}
}
