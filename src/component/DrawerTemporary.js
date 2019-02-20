import $ from 'jquery';
import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Badge from '@material-ui/core/Badge';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import Toast from '../object/Toast';
import {
  logout,
  getName
} from '../component.env/_util';
import OverlayToSign from '../component.env/OverlayToSign';
import DialogCanDoWithLogin from '../component.env/DialogCanDoWithLogin';

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
            {!(window.app && window.app.session) && (
              <ListItem
                button
                onClick={()=> {
                  OverlayToSign.create();
                  this.setState({ left: false });
                }}
              >
                <ListItemText primary="ログイン" />
              </ListItem>
            )}
            <ListItem
              button
              selected={window.Route.is('imagesSortedByNewer')}
              onClick={()=> {
                window.Route.push('imagesSortedByNewer');
                this.setState({ left: false });
              }}
            >{/*
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>*/}
              <ListItemText primary="新着順" />
            </ListItem>
            <ListItem
              button
              selected={window.Route.is('user')}
              onClick={()=> {
                window.Route.push('user');
                this.setState({ left: false });
              }}
            >
              <Badge badgeContent={window.app.favorites.length} color="error" max={Infinity}>
                <ListItemText
                  primary="みんな"
                  secondary={<small style={{ fontWeight: 'bold' }}>（利用者数 {window.app.favorites.length}人以上）</small>}
                />
              </Badge>
            </ListItem>
            <ListItem
              button
              selected={this.state.selectedIndex === 2}
              onClick={()=> {
                window.Me.isLogined() ? new Toast('近日解禁🌟', true) :
                  this.cDialogCanDoWithLogin.setState({ open: true })
              }}
            >
              <ListItemText>
                人気順
              </ListItemText>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem>
              {window.app && window.app.session ? (
                <small style={{ color: '#808080' }}>
                  Me: {window.app && window.app.session.email}
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
              disabled={!(window.app && window.app.session)}
              selected={this.state.selectedIndex === 2}
              selected={window.Route.is('myFavorites')}
              onClick={()=> {
                window.Route.push('myFavorites');
                this.setState({ left: false });
                window.slack.postMessage(`${getName()}さんが Drawerの"お気に入り" をタップしました`);
              }}
            >{/*
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>*/}
              <ListItemText primary="お気入り画像" />
            </ListItem>
            <ListItem
              button
              disabled={!(window.app && window.app.session)}
              selected={this.state.selectedIndex === 3}
              onClick={()=> new Toast('近日解禁🌟', true)}
            >{/*
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>*/}
              <ListItemText primary="アップロードした画像" />
            </ListItem>
            <ListItem
              button
              disabled={!(window.app && window.app.session)}
              onClick={()=> logout()}
            >
              <ListItemText>
                <div style={{ color: '#aaa' }}>ログアウト</div>
              </ListItemText>
            </ListItem>
          </List>
        </div>
      </div>

      <DialogCanDoWithLogin
        ref={(c)=> this.cDialogCanDoWithLogin = c}
        html="閲覧するにはログインします"
      />
    </Drawer>
    );
  }
}
