import $ from 'jquery';
import {
  sortByFrequency,
  getUrlParameter,
  existParameter,
  countUp,
  startLoading,
  stopLoading,
  deleteFav,
  domain,
  toast
} from './_util';
import Toggle from './Toggle';
// import { renderImage, renderImages } from './gridList';

export function renderLayer2Row1(imageID) {

  var isFavorite = !!window.dat.favorites.filter(function(fav) {
    return imageID === parseInt(fav.imageID)
    && parseInt(fav.userID) === window.dat.session.id;
  }).length;

  $('#layer2-row1').html(`
    ${countUp('x') > 3 ? '' : `
      <div class="balloon">
        タップして "お気入り" に入れると…　👉
      </div>
    `}
    <div class="fav-area" onclick="$(this).prev().hide()">
      ${new Toggle('favorites', 'imageID', isFavorite).html()}
    </div>
  `);

  $('#layer2-row1 .component-fav').on('click', function() {

    Toggle.toggle(this, imageID);

    var images = window.dat.favorites.map((dat)=> {
      return window.dat.favorites.filter((datB)=> datB.userID === dat.userID)
      .map((datB)=> window.dat.images.find(datB.imageID));
    });
    renderRecommendation(images);
  });
}

const renderRecommendation = function(images) {
  const html = sortByFrequency(images.serialize())
  .reduce((prev, image)=> {
    console.log(prev)
    console.log(image)
    return prev + (isShouldNotRender(image) ? '' : `
    <a
      onclick="Route.images(${image.id})"
      style="background-image: url(${image.url})"></a>`);
  }, '');
  if (!html)
    return;
  $('.component-images-horizontal').html(html).closest('.area-recommendation').show(300);
};

const isShouldNotRender = function(image) {
  return image.id === parseInt($('.fluid').attr('data-imageID'))
  // INFO: 既にfavしてあるやつ
  || window.dat.favorites.filter(function(fav) {
    return parseInt(fav.imageID) === image.id
    && parseInt(fav.userID) === window.dat.session.id;
  }).length;
};
