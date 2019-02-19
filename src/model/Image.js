import Firestore from '../object/Firestore';
// TODO: Arrayをextendsして
// window.images = new Image(...dat.images);
// window.images.sortByNewer()と使えるようにしたい
export default window.Image = new class {

	setData(data) {
		this.data = data;
	}

	create(files) {

	}

	delete(imageID) {
		Firestore.update('images', imageID, { deleteFlag: true }) 
		alert('削除しました');
	}

	sortByRelated(imageID) {
		if (this.data === undefined)
			return [];

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
		if (this.data === undefined)
			return [];

		return window.app.images.sort((iA, iB)=> {
			return iA.created_at > iB.created_at ? -1 : 1;
		});
	}

	sortByFavorites() {
		if (this.data === undefined)
			return [];

		return window.app.images
		.map((i)=> {
			i.favorites = window.app.favorites.where({ imageID: i.id });
			return i;
		})
		.sort((iA, iB)=> iA.favorites.length > iB.favorites.length ? -1 : 1 );
	}

	sortByRelatedEffort(imageID) {
		if (this.data === undefined)
			return [];

		let images;
		if (this.isEnoughToShowRecommendation(imageID)) {
			images = this.sortByRelated(imageID);
		}
		else {
			images = this.shuffle(imageID);
		}
		return this.excludeIFavorited(images.exclude({ id: imageID }));
	}

	shuffle(imageID) {
		if (this.data === undefined)
			return [];

		return this.sortByNewer().shuffle(imageID);
	}

	// INFO: sortByRelatedアルゴリズムに必要なfavrite数があればtrue
	isEnoughToShowRecommendation(imageID) {
		if (this.data === undefined)
			return [];

		return window.app.favorites.where({ imageID }).length > 3
	}

	filterByMyFavorite() {
		if (this.data === undefined)
			return [];

		return window.app.images.filter((i)=> window.app.favorites.where({ imageID: i.id, userID: window.app.session.id }).length);
	}

	// TODO: Arrayをextendsしたら引数をとる
	excludeIFavorited(images) {
		if (this.data === undefined || !window.Me.isLogined())
			return images;

		return images.filter((i)=> {
			if (i === undefined)
				return false;
			return !window.app.favorites.where({imageID: i.id, userID: window.app.session.id}).length
		});
	}

	isIFavorited(imageID) {
		if (this.data === undefined)
			return [];

		return !!window.app.favorites.where({imageID: imageID, userID: window.app.session.id}).length;
	}
}
