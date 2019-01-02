export default new class {
  sortByMostHavingFavorites() {
    if (!window.dat)
      return [];
    return window.dat.users.sort((uA, uB)=> {
      const a = window.dat.favorites.where({userID: uA.id}).length;
      const b = window.dat.favorites.where({userID: uB.id}).length;
      return a > b ? -1 : 1;
    });
  }
}
