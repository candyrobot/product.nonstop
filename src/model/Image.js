import $ from 'jquery';
import {
  toast,
  domain
} from '../component.env/_util';

// TODO: Arrayをextendsして
// window.images = new Image(...dat.images);
// window.images.sortByNewer()と使えるようにしたい
export default window.Image = new class {
	constructor() {}

	// INFO: CRUDから命名
	create(files) {

	}

	// 命名だけよかった
	// saveUrl(url) {
	// }

	sortByRelated(imageID) {
		return window.dat.images
		.map((i)=> {
			return i.relatedScore = window.dat.favorites.where({imageID: imageID})
			.reduce((n, f)=> {
				return n + window.dat.favorites.where({imageID: i.id, userID: f.userID}).length;
			}, 0), console.log(i.relatedScore), i;
		}).sort((iA, iB)=> iA.relatedScore > iB.relatedScore ? -1 : 1);
	}

	sortByNewer() {
		if (!window.dat || !window.dat.images)
			return;
		return window.dat.images.sort((iA, iB)=> {
			return iA.created_at.getTime() > iB.created_at.getTime() ? -1 : 1;
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

	sortByRelatedEffort(imageID) {
		let images;
		if(window.dat.favorites.where({imageID: imageID}).length > 3)
			images = this.sortByRelated(imageID);
		else
			images = window.dat.images.shuffle();
		return this.excludeIFavorited(images.exclude({ id: imageID }));
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
