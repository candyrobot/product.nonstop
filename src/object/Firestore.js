export default new class {
	db = window.firebase.firestore();

	// USAGE: 'users', userID, { isAddedToHomescreen: true }
	update(collectionName, id, hash) {
		var ref = this.db.collection(collectionName).doc(id.toString());
		var setWithMerge = ref.set(hash, { merge: true });
	}

	// USAGE: 'images'
	// @return {object} - .done
	read(collectionName) {
		let fn = function() {};
		this.db.collection(collectionName).get().then((querySnapshot) => {
			fn(querySnapshot);
		});
		return { done: (_fn)=> fn = _fn }
	}
}
