import React, { Component } from 'react';
import './PaperUser.css';
import Route from './Route';

// TODO: 他... の部分を黒グラデ白文字にしたい

export default class extends Component {
  render() {
    const user = this.props.user;
    const favorites = window.dat.favorites.where({ userID: user.id });
    if(favorites.length === 0)
      return null;
    return (
    <div className="PaperUser">
      <div className="user">
        <i className="fas fa-user-circle"></i>
        <div
          style={{ paddingLeft: '0.35em' }}
          >
          <div style={{ fontSize: 10 }}>
            {user.created_at.replace('T', ' ').replace(/\..*$/, '')}
          </div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 'bold'
            }}
          >
            ？？？？　このユーザーのお気入り▼
          </div>
        </div>
      </div>
      <div>
        {/*.splice(0, 5)*/}
        {window.dat.favorites.where({ userID: user.id })
        .map((f, i)=> {
          const image = window.dat.images.find(f.imageID);
          return (
          <div
            key={i}
            className="image"
            onClick={()=> Route.push('images', { id: image.id }).refresh()}
            style={{ backgroundImage: `url(${image.url})` }}
            >
          </div>
          )
        })}

        <div
          className="image"
          style={{ height: 'initial' }}
          >
          <h3 style={{ marginBottom: -10 }}>
            …他{favorites.length}件
          </h3>
          <p className="small">（全部見るには登録する必要があります）</p>
        </div>
      </div>
    </div>
    );
  }
}
