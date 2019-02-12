export default new class {
  // USAGE: 'users', userID, { isAddedToHomescreen: true }
  update(collectionName, id, hash) {
    const db = window.firebase.firestore();
    var ref = db.collection(collectionName).doc(id.toString());
    var setWithMerge = ref.set(hash, { merge: true });
  }
}
