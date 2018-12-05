import React, { Component } from 'react';
// import './Conspicuous.css';

class Conspicuous extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="Conspicuous">
        <div className="title">
          TwitterやTumblrより効率的に画像を収集しませんか？
        </div>
        <p>※Tumblrは12/17以降、成人向けの画像は一切投稿できなくなります</p>
        <p>百聞は一見にしかず。</p>
        <p>まずは使ってみて下さい！</p>
      </div>
    );
  }
}

export default Conspicuous;
