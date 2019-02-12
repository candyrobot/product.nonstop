import Firestore from '../object/Firestore';

export default window.User = new class {
  sortByMostHavingFavorites() {
    if (!window.app)
      return [];
    return window.app.users.sort((uA, uB)=> {
      const a = window.app.favorites.where({userID: uA.id}).length;
      const b = window.app.favorites.where({userID: uB.id}).length;
      return a > b ? -1 : 1;
    });
  }

  update(userID, hash) {
    Firestore.update('users', userID, hash);
  }

  read() {
    Firestore.read('users').done((querySnapshot)=> {
      console.log(2, querySnapshot);
      // TODO: herokuのあとに呼んでwindow.app.usersとマージ
      debugger;
    });
  }
}
