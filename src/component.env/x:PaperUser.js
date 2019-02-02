import React, { Component } from 'react';
import Grow from '@material-ui/core/Grow';
import Route from '../object.env/Route';
import './PaperUser.css';

// TODO: 他... の部分を黒グラデ白文字にしたい

export default class extends Component {
  isDisplayImages = false;
  render() {
    const user = this.props.user;
    const favorites = window.app.favorites.where({ userID: user.id });
    if(favorites.length === 0)
      return null;
    setTimeout(()=> {
      this.isDisplayImages = true;
      this.setState({});
    }, 2000);
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
      <div style={{ display: this.isDisplayImages ? 'block' : 'none' }}>
        {/*.splice(0, 5)*/}
        {window.app.favorites.where({ userID: user.id }).map((f, i)=> {
          const image = window.app.images.find(f.imageID);

          if (!image)
            return;

          return (
          <Grow in={this.isDisplayImages} key={i}
          timeout={3000}
          >
            <div
              className="image"
              onClick={()=> Route.push('image', { id: image.id })}
              style={{ backgroundImage: `url(${image.url})` }}
              >
            </div>
          </Grow>
          )
        })}

        <div
          className="image"
          style={{ height: 'initial' }}
          >
          <h3 style={{ marginBottom: -10 }}>
            …他{favorites.length}件
          </h3>
          <p className="small">（全部見るには？: ログイン）</p>
        </div>
      </div>
    </div>
    );
  }
}
