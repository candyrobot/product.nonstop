
export default class {
  favorite(param) {
    return {
      images: window.dat.images.filterByMyFavorite()
    }
  }
}
