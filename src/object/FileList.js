// INFO: https://qiita.com/merotan/items/1b94ba43c26a6c370661
Object.defineProperty(FileList.prototype, 'forEach', {
  value: Array.prototype.forEach,
  enumerable: false
});
