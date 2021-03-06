import LocalStorage from '../object/LocalStorage';

export default window.Me = new class Me {

	session = null;

	assign(user) {
		Object.assign(this, user);
	}

	setSession(session) {
		this.session = session;
	}

	getImageMaxDisplableNum() {
		if (!this.isLogined())
			return 50;
		if (!this.isJustShared())
			return 120;
		return Infinity;
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
