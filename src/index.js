import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LayerContent from './component/LayerContent';
import LayerNavigation from './component/LayerNavigation';
import LayerOverlay from './component/LayerOverlay';
import LayerAppNotification from './component/LayerAppNotification';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
  primary: {
    main: '#880e4f',
  },
  secondary: {
    main: '#f06292',
  },
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <LayerNavigation />
  </MuiThemeProvider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

    // <LayerContent />
    // <LayerNavigation />
    // <LayerOverlay />
    // <LayerAppNotification />
