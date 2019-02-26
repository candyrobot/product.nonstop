export default window.LocalStorage = new class {
	prefix = 'app.nonstop.';

	create(hash) {
		for (var key in hash) {
			localStorage.setItem(this.prefix + key, JSON.stringify(hash[key]));
		}
	}

	read(key) {
		return JSON.parse(localStorage.getItem(this.prefix + key));
	}
}
