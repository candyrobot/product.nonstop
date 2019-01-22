export default new class {
  sortByMostHavingFavorites() {
    if (!window.app)
      return [];
    return window.app.users.sort((uA, uB)=> {
      const a = window.app.favorites.where({userID: uA.id}).length;
      const b = window.app.favorites.where({userID: uB.id}).length;
      return a > b ? -1 : 1;
    });
  }
}
