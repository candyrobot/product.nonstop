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

	readUsers() {
		let fn = function() {};
		this.read('users').done((querySnapshot)=> {
			const a = [];
			querySnapshot.forEach((doc) => {
				a.push({
					id: doc.id,
					addedToHomescreen: doc.get('addedToHomescreen'),
					isUnlockedShowingImagesLimited: doc.get('isUnlockedShowingImagesLimited')
				});
			});
			fn(a);
		});
		return { done: (_fn)=> fn = _fn }
	}

	readImages() {
		let fn = function() {};
		this.read('images').done((querySnapshot)=> {
			const a = [];
			querySnapshot.forEach((doc) => {
				a.push({
					id: doc.id,
					url: doc.get('url') || this._getDownloadURL(doc.get('filePath')),
					created_at: doc.get('created_at').toDate().getTime(),
					deleteFlag: doc.get('deleteFlag')
				});
			});
			fn(a);
		});
		return { done: (_fn)=> fn = _fn }
	}

	_getDownloadURL(filePath) {
		const bucketName = window.config.projectId + '.appspot.com';
		return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(filePath)}?alt=media`;
	}
}
