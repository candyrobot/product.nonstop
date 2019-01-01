import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';

export default class extends React.Component {

  state = {
    left: false,
  };

  constructor() {
    super();
    window.drawer = this;
  }

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
        onClick={this.toggleDrawer('left', false)}
        onKeyDown={this.toggleDrawer('left', false)}
      >
        <div className={classes.list}>
          <List>
            <ListItem button>{/*
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>*/}
              <ListItemText primary="新着" />
            </ListItem>
            <ListItem button>{/*
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>*/}
              <ListItemText>
                みんな
                <small style={{ fontWeight: 'bold' }}>（利用者数 1,520人）</small>
              </ListItemText>
            </ListItem>
            <ListItem button>{/*
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>*/}
              <ListItemText primary="お気入り" />
            </ListItem>
            <ListItem button>{/*
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>*/}
              <ListItemText primary="アップロードした画像" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button>
              <ListItemText primary={'ログアウト'} />
            </ListItem>
          </List>
        </div>
      </div>
    </Drawer>
    );
  }
}
