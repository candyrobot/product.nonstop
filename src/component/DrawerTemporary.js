import $ from 'jquery';
import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import Toast from '../object/Toast';
import {
  logout
} from '../component.env/_util';
import Route from '../object/Route';

export default class extends React.Component {

  state = {
    left: false,
    selectedIndex: 0,
  };

  constructor() {
    super();
    window.drawer = this;
  }

  // 公式にあったけどこれtoggleしてなくない？
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;

    return (
    <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
      <div
        tabIndex={0}
        role="button"
      >
        <div className={classes.list}>
          <List>
            {!(window.dat && window.dat.session) && (
              <ListItem
                button
                onClick={()=> {
                  $('#component-login').show(300);
                  this.setState({ left: false });
                }}
              >
                <ListItemText primary="ログイン" />
              </ListItem>
            )}
            <ListItem
              button
              selected={Route.is('imagesSortedByNewer')}
              onClick={()=> {
                Route.push('imagesSortedByNewer');
                this.setState({ left: false });
              }}
            >{/*
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>*/}
              <ListItemText primary="新着" />
            </ListItem>
            {!(window.dat && window.dat.session) && (
              <ListItem
                button
                selected={Route.is('users')}
                onClick={()=> {
                  Route.push('users');
                  this.setState({ left: false });
                }}
              >
                <ListItemText>
                  みんな
                  <small style={{ fontWeight: 'bold' }}>（利用者数 1,520人以上）</small>
                </ListItemText>
              </ListItem>
            )}
            {!(window.dat && window.dat.session) && (
              <ListItem
                button
                disabled
                selected={this.state.selectedIndex === 2}
                onClick={()=> new Toast('ログインしたユーザーのみ使えます', true)}
              >
                <ListItemText>
                  人気順
                </ListItemText>
              </ListItem>
            )}
          </List>
          <Divider />
          <List>
            <ListItem>
              {window.dat && window.dat.session ? (
                <small style={{ color: '#808080' }}>
                  Me: {window.dat && window.dat.session.email}
                </small>
              ) : (
                <small>
                  ログイン後利用できます！
                  <RadioButtonUncheckedIcon
                    style={{
                      color: '#85d632e0',
                      verticalAlign: '-6px',
                      marginLeft: '2px'
                    }}
                  />
                </small>
              )}
            </ListItem>
            <ListItem
              button
              disabled={!(window.dat && window.dat.session)}
              selected={this.state.selectedIndex === 2}
            >{/*
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>*/}
              <ListItemText primary="お気入り" />
            </ListItem>
            <ListItem
              button
              disabled={!(window.dat && window.dat.session)}
              selected={this.state.selectedIndex === 3}
            >{/*
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>*/}
              <ListItemText primary="アップロードした画像" />
            </ListItem>
            <ListItem
              button
              disabled={!(window.dat && window.dat.session)}
              onClick={()=> logout()}
            >
              <ListItemText primary={'ログアウト'} />
            </ListItem>
          </List>
        </div>
      </div>
    </Drawer>
    );
  }
}
