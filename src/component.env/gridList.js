import $ from 'jquery';
import './gridList.css';
import {
	getUrlParameter,
	existParameter,
	countUp,
	startLoading,
	stopLoading,
	deleteFav,
	sortByFrequency,
	isShouldNotRender,
	domain,
	toast,
	isAlmostThere,
	isAndroid,
	showWebview,
	lazyShow
} from './_util';
import Image from '../model/Image';
import Toggle from './Toggle';

export default `
<div id="component-images" class="gridList">
</div>
`;

function getViewableData(opt) {
  if(opt.sort === 'favorites')
    return Image.sortByFavorites();
  else if(opt.filter === 'myFavorite')
    return Image.filterByMyFavorite();
  else if(opt.sort === 'newer')
    return Image.sortByNewer();
  else
    return window.dat.images;
};

export const renderImages = function(opt) {

  var html = getViewableData(opt).reduce(function(prev, dat, i) {

    // var u = '';
    var u = window.dat.session && i === 0 ? `
    <div 
      class="outer additional"
      onclick="window.promptToUpload()"
      >
      <div class="inner">
        <i class="fas fa-plus"></i>
      </div>
    </div>
    ` : '';
    window.dat.session && i++;

    var s = new Toggle('favorites', { imageID: dat.id }, !!window.dat.favorites.filter(function(fav) {
      return dat.id === parseInt(fav.imageID)
      && parseInt(fav.userID) === window.dat.session.id;
    }).length).html();

    var t = i % 12 ? '' : `
    <div class="message">
      スマホのホーム画面にこのアプリを追加することができるのです
      <i>(ここをタップ)</i>
    </div>
    `;

    return `
      ${prev}
      ${t}
      ${u}
      <div
        style="display: none"
        class="outer fas fa-unlink"
        data-imageID="${dat.id}">
        <div
          class="inner"
          onclick="Route.push('images', { id: ${dat.id} }).refresh()"
          style="background-image: url(${dat.url})">
        </div>
        ${s}
        <div class="favoriteNum">${dat.favorite ? dat.favorite : ''}</div>
      </div>
    `;
  }, '');

  $('#component-images').html(html)
  .find('.component-fav').on('click', function() {
    var imageID = $(this).closest('.outer').data('imageid');
    Toggle.toggle(this, imageID);
  });

  $('#component-images > .outer').inAlmostThere().show();
  $(document).on('scroll', function() {
    $('#component-images > .outer').inAlmostThere().fadeIn();
  });

  $('#component-images').find('.message').on('click', function() {
    if (isAndroid()) {
      return showWebview('https://www.youtube.com/embed/f9MsSWxJXhc');
    } else {
      return showWebview('https://www.youtube.com/embed/8iueP5sRQ-Y');
    }
  });
  return lazyShow('#component-images .outer');
};

export const renderImage = function(id) {
  const image = window.dat.images.filter((image)=> image.id == id)[0];
  $('#component-images').html(`
  <div class="fluid" data-imageID="${image.id}">
    <img src="${image.url}">
  </div>`);
};
