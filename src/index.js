import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LayerContent from './component/LayerContent';
import LayerNavigation from './component/LayerNavigation';
import LayerOverlay from './component/LayerOverlay';
import LayerAppNotification from './component/LayerAppNotification';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import reducer from './reducers/index';
import Gateway from './Gateway';

import $ from 'jquery';

const theme = createMuiTheme({
  // Docker's gradient #2453a5 -> #1f95f0
  palette: {
    primary: {
      main: '#36465d',
      light: '#608ba4', // Tumblr's light original color
      // dark: '#002884',
      contrastText: '#fff',
    },
    // secondary: {
      // main: '#608ba4',
    // },
  },
});

// const store = createStore(reducer);

class App extends React.Component {
  state = {}
  constructor() {
    super();
    $.get('http://with-one-account-prd.herokuapp.com/application')
    .done((dat)=> {
      this.setState({ dat: dat });
      console.log(dat)
      console.log("setState")
      this.render();
    });
  }
  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <LayerContent dat={this.state.dat} />
          <LayerNavigation dat={this.state.dat} />
          <LayerOverlay dat={this.state.dat} />
          <LayerAppNotification dat={this.state.dat} />
        </MuiThemeProvider>
      </div>
    );
  }
}

ReactDOM.render( <App />, document.getElementById('root') );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
