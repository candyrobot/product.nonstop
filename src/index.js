import $ from 'jquery';
// import 'jquery.transit';
import './object/$';
import './object/Array';
import './old.css';
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
import gridList from './component.env/gridList';
import bottomNavigation from './component.env/bottomNavigation';

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

$(`
<div class="layer-1">
  ${gridList}
</div>

<div class="component-layer layer-2">
  <div id="drawer"></div>
  <div class="frombottom">
    <div class="row" id="layer2-row1"></div>
    <div class="area-recommendation" style="display: none">
      <h4>関連</h4>
      <div class="component-images-horizontal"></div>
      <div class="close" onclick="$(this).parent().hide(300)">×</div>
    </div>
    ${bottomNavigation}
  </div>
</div>

<div class="component-layer">
  ${_overlays}
</div>

<div id="layer-appMessages" class="component-layer">
  <div class="loadingLine">
    <span class="expand"></span>
  </div>
  <div class="alerts"></div>
</div>
`).appendTo('body');

(function initializeApp() {
  $('#component-actions > .sort-newer').addClass('current');

  $.get(domain + '/application' + window.location.search, function(dat) {
    console.log(dat);
    window.dat = dat;
    window.Route.refresh();

    $('#component-logout h1').text(window.dat.session.id);
    $('#component-logout h5').text(window.dat.session.email);
    if(window.dat.session) {
      new DrawerLetsShare().create();
      setInterval(()=> {
        new DrawerLetsShare().create();
      }, 1000 * 40);
    }
    else {
      new DrawerConspicuous().create();
      setTimeout(()=> {
        new DrawerLetsSignup().create();
      }, 1000 * 10);
    }
  });
})();
