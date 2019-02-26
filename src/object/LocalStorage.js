export default window.LocalStorage = new class {
	prefix = 'app.nonstop.';

	create(hash) {
		for (var key in hash) {
			localStorage.setItem(this.prefix + key, JSON.stringify(hash[key]));
		}
	}

	read(key) {
		try {
			return JSON.parse(localStorage.getItem(this.prefix + key));
		}
		catch (e) {
			return localStorage.getItem(this.prefix + key);
		}
	}
}
