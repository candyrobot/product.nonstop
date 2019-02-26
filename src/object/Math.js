
// 問題: ちがうシード値を与えても、偏りが見られるくらいほぼ変化していないこと
// 解決: 9桁のシード値が必要

// INFO: https://sbfl.net/blog/2017/06/01/javascript-reproducible-random/
// INFO: Google: 疑似乱数, シード値
// export default window.Random = class Random {

//   constructor(seed = 88675123) {
//     this.x = 123456789;
//     this.y = 362436069;
//     this.z = 521288629;
//     this.w = seed;
//   }

//   // XorShift
//   next() {
//     let t;

//     t = this.x ^ (this.x << 11);
//     this.x = this.y; this.y = this.z; this.z = this.w;
//     return this.w = (this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8));
//   }

//   // min"以上"max"以下"の乱数を生成する
//   nextInt(min, max) {
//     const r = Math.abs(this.next());
//     return min + (r % (max + 1 - min));
//   }

//   /**
//    * @return {float} - 0以上1未満
//    */
//   nextFloat() {
//     return this.nextInt(0, 999999999) / 1000000000;
//   }
// }

// TODO: クラスのほうで、どんな値がきても9桁にしてほしい
// Usage:
// const random = new Random(seedValue * 1000000000);
// random.random()
export default window.Random = class Random {
	x = 123456789; y = 362436069; z = 521288629;
	// TODO:
	// - 現在9桁でないと偏りがでるので、
	// - どんな値がきても9桁にしてほしい
	constructor(n) {
		this.setSeed(n);
	}
	setSeed(n = 88675123) {
		this.w = n;
	}
	random() {
		const t = this.x ^ (this.x << 11);
		this.x = this.y; this.y = this.z; this.z = this.w;
		this.w = (this.w^(this.w>>19))^(t^(t>>8));
		// INFO: Math.randomと同じ0以上1未満に
		this.w = this.w % 1000000000 * .000000001;
		return this.w;
	}
}
