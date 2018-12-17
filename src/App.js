import React, { Component } from 'react';
import $ from 'jquery';
// import 'jquery.transit';
import './object/$';
import './object/Array';
import './component.env/Route';
import {
  domain,
  loadImage
} from './component.env/_util';
import {
  DrawerConspicuous,
  DrawerLetsSignup,
  DrawerLetsShare
} from './component.env/drawer';
import _overlays from './component.env/_overlays';
import BottomNavigation from './component.env/bottomNavigation';

// INFO: https://qiita.com/peutes/items/d74e5758a36478fbc039
// document.addEventListener('touchend', event => {
//   event.preventDefault();
// }, false);
disableUsersZoom();
function disableUsersZoom() {
  // for zoom with multiple fingers
  document.addEventListener('touchstart', event => {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }, true);

  // for zoom with double tap.
  let lastTouch = 0;
  document.addEventListener('touchend', event => {
    const now = window.performance.now();
    if (now - lastTouch <= 500) {
      event.preventDefault();
    }
    lastTouch = now;
  }, true);
}

window.$ = $;

export default class extends Component {
  render() {
    return (
    <div className="App">
      <div className="layer-1"></div>

      <div className="component-layer layer-2">
        <div id="drawer"></div>
        <div className="frombottom">
          <div className="row" id="layer2-row1"></div>
          <div className="area-recommendation" style={{display: 'none'}}>
            <h4>関連</h4>
            <div className="component-images-horizontal"></div>
            <div className="close" onClick={function() { $(this).parent().hide(300) }}>×</div>
          </div>
          <BottomNavigation />
        </div>
      </div>

      <div className="component-layer"
        dangerouslySetInnerHTML={{ __html: _overlays }}>
      </div>

      <div id="layer-appMessages" className="component-layer">
        <div className="loadingLine">
          <span className="expand"></span>
        </div>
        <div className="alerts"></div>
      </div>
    </div>
    );
  }
};

(function initializeApp() {
  $(window).on('scroll', loadImage);

  $.get(domain + '/application' + window.location.search, function(dat) {
    console.log(dat);
    window.dat = dat;
    window.Route.refresh();

    $('#component-logout h1').text(window.dat.session.id);
    $('#component-logout h5').text(window.dat.session.email);
    if(window.dat.session) {
      setInterval(()=> {
        new DrawerLetsShare().create();
      }, 1000 * 60 * 1);
    }
    else {
      new DrawerConspicuous().create();
      setTimeout(()=> {
        new DrawerLetsSignup().create();
      }, 1000 * 30);
    }
  });
})();
