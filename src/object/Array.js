import Random from './Math';


// WARN: ！！！元の配列を破壊しないで！！！
// WARN: ！！！元の配列を破壊しないで！！！
// WARN: ！！！元の配列を破壊しないで！！！
// でも同じポインタが欲しい時(=参照渡ししたい時)もあるからoptionalで


/**
 * 非破壊型
 * sample: `[0,1].merge(1, [0,0]) => [0,0,0]`
 * @param  {[type]}   X   - 位置をindexで指定
 * @param  {[type]}   arr - マージしたい配列
 * @param  {Function} fn  - call when conflict.
 * @return {[type]}       [description]
 *
 * INFO: .map関数でやりたかったが値が特殊値`empty`の場合はmapのコールバックが呼ばれないorz
 */
Array.prototype.merge = function(X, arr, fn = function(val1, val2) { return val2 }) {
  var newArr = [];
  var newArrLength = Math.max(X + arr.length, this.length);
  for (var i = 0; i < newArrLength; i++) {
    var val = this[i];
    if(i<X) {
      newArr[i] = val;
    }
    else if(undefined !== this[i] && undefined !== arr[i-X]) {
      newArr[i] = fn(val, arr[i-X], i);
    }
    else {
      newArr[i] = undefined !== arr[i-X] ? arr[i-X] : this[i];
    }
  }
  return newArr;
};

/**
 * 縦軸と横軸入れ替える
 * `左上と右下を結ぶ`軸で入れ替えるのであらゆる面で都合が良い
 * @return {[type]}
 */
Array.prototype.transpose = function() {
  return this[0].map((_, i)=> this.map(a=> a[i]));
}

/**
 * 2次元配列専用
 * @return {[type]}
 */
Array.prototype.stringify = function() {
  var str = '\n';
  this.forEach((arr)=> {
    str += JSON.stringify(arr) + "\n";
  });
  return str;
};

/**
 * 条件(fn)にあった場所`position`を配列で返す
 * INFO: 3次元以降に対応していない。したい。
 * @param {function}
 *        @arg {any} - {探索中の値}
 *        @arg {object} - {x,y}
 * @return {Array}
 */
Array.prototype.getPositions = function(fn) {
  return this.map((a, y)=> {
    return a.map((v, x)=> {
      return fn(this[y][x], { x:x, y:y }) ? { x:x, y:y } : undefined;
    }).filter((v)=> v!==undefined);
  })
  // INFO: 2次元配列を1次元配列に
  .reduce((pre,current) => {pre.push(...current);return pre},[]);
};

/**
 * 多次元配列もディープコピーできる
 * @return {[type]}         [description]
 */
Array.prototype.clone = function() {
  return JSON.parse(JSON.stringify(this));
};

/**
 * INFO: 3次元以降に対応していない。したい。
 * @param  {[type]}
 * @return {[type]}
 */
Array.prototype.mapAll = function(fn) {
  return this.map((a, y)=> {
    return a.map((v, x)=> {
      return fn(v, { x:x, y:y }, this);
    });
  });
};

/**
 * 右回転する
 * @return {[type]} [description]
 */
Array.prototype.turn = function() {
  return this.mapAll((_, p, a)=> this[this.length-1-p.x][p.y]);
};

// TODO: まだチューニングできると思う
// @param {object} - { key: value }
Array.prototype.where = function(hash) {
  // return this.filter((o)=> {
  //   return Object.keys(hash).filter((k)=> {
  //     return hash[k] == o[k];
  //   }).length === Object.keys(hash).length;
  // });

  var a = this;
  for (const key in hash) {
    a = a.filter((a)=> a[key] == hash[key]);
  }
  return a;
};

// rubyでいうfind
Array.prototype.find = function(id) {
  return this.filter((dat)=> dat.id == id )[0];
};

// INFO: whereの逆。除く
Array.prototype.exclude = function(hash) {
  return this.filter((o)=> {
    return Object.keys(hash).filter((k)=> {
      return hash[k] == o[k];
    }).length !== Object.keys(hash).length;

    // for (const k in hash) {
    //   hash[k] == o[k]
    // }
  });
};

// INFO: 要素を消すには？
// - a = a.exclude(...)
// - deleteなどで要素を消すなどがある
//   - https://www.sejuku.net/blog/22295#filter
// - Railsの場合
//     favorites = Favorite.where imageID: params[:imageID], userID: user.id
//     favorites[0].destroy

Array.prototype.sortByFrequency = function() {
  const frequency = {};
  this.forEach((v)=> {
    return frequency[v.id] = 0;
  });
  const uniques = this.filter((v)=> {
    return ++frequency[v.id] === 1;
  });
  return uniques.sort((a, b)=> {
    return frequency[b.id] - frequency[a.id];
  });
};

Array.prototype.removeDuplicate = function() {
  return Array.from(new Set(this));
};

Array.prototype.serialize = function() {
  return this.reduce(function(pre, current) {
    pre.push.apply(pre, current);
    return pre;
  }, []);
};

// INFO: https://sbfl.net/blog/2017/06/01/javascript-reproducible-random/
// INFO: Google: 疑似乱数, シード値
// INFO: https://qiita.com/komaji504/items/62a0f8ea43053e90555a
Array.prototype.shuffle = function() {
  for(var i = this.length - 1; i > 0; i--){
      var r = Math.floor(Math.random() * (i + 1));
      var tmp = this[i];
      this[i] = this[r];
      this[r] = tmp;
  }
  return this;
};
