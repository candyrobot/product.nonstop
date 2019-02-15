import LocalStorage from '../object/LocalStorage';

export default window.Me = new class Me {

	imageMaxDisplableNum = 80;

	unlockedShowingImagesLimited = false;

	session = null;

	assign(user) {
		Object.assign(this, user);

		if (this.isJustShared())
			this.unlockedShowingImagesLimited = true;

		if (this.unlockedShowingImagesLimited)
			this.imageMaxDisplableNum = Infinity;
	}

	setSession(session) {
		this.session = session;
	}

	isUnlockedShowingImagesLimited() {
		return this.unlockedShowingImagesLimited;
	}

	isJustShared() {
		const v = LocalStorage.read('time.lastShared');
		if (v === null)
			return false;
		const iPast = parseInt(LocalStorage.read('time.lastShared'));
		return (new Date().getTime() - iPast) <= 1000 * 60 * 60 * 24;
	}

	isAdmin() {
		return this.isLogined() && this.session && this.session.id === 1
	}

	isAddedToHomescreen() {
		return LocalStorage.read('addedToHomescreen');
	}

	isLogined() {
		return this.session;
	}
}
