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
import Toggle from './Toggle';

export default `
<div id="component-images" class="gridList">
</div>
`;

function getViewableData(opt) {
  if(opt.sort === 'most') {
    return window.dat.images
    .map((i)=> {
      i.favorites = window.dat.favorites.filter((f)=> f.imageID == i.id);
      return i;
    })
    .sort((iA, iB)=> iA.favorites.length > iB.favorites.length ? -1 : 1 );
  }
  else if(opt.filter === 'favorite') {
    return window.dat.images.filter((i)=> window.dat.favorites.where({ imageID: i.id, userID: window.dat.session.id }).length);
  }
  else if(opt.sort === 'newer')
    return window.dat.images.sort((iA, iB)=> {
      return parseInt(iA.created_at.replace( /\D/g , '')) > parseInt(iB.created_at.replace( /\D/g , '')) ? -1 : 1;
    });
  else
    return window.dat.images;
};

export const renderImages = function(opt) {

  var html = getViewableData(opt).reduce(function(prev, dat, i) {

    var u = '';
    // var u = window.dat.session && i === 0 ? `
    // <div class="outer additional">
    //   <div class="inner">
    //     <i class="fas fa-plus"></i>
    //   </div>
    // </div>
    // ` : '';
    // window.dat.session && i++;

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

  $('#component-images > .outer').filter(isAlmostThere()).show();
  $(document).on('scroll', function() {
    $('#component-images > .outer').filter(isAlmostThere()).fadeIn();
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
