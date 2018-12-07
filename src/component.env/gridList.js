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
import dependsOnPath from './_dependsOnPath';

export default `
<div id="component-images" class="gridList">

</div>
`;

window.renderImages = function() {
  var html = window.dat.images.reduce(function(prev, dat, i) {

    var u = window.dat.session && i === 0 ? `
    <div class="outer additional">
      <div class="inner">
        <i class="fas fa-plus"></i>
      </div>
    </div>
    ` : '';
    window.dat.session && i++;

    var s = new Toggle('favorites', { imageID: dat.id }, window.dat.favorites.filter(function(fav) {
      return dat.id === parseInt(fav.imageID);
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
        <a
          class="inner"
          href="/images?imageID=${dat.id}"
          style="background-image: url(${dat.url && ''})">
        </a>
        ${s}
        <div class="favoriteNum">${dat.favorite ? dat.favorite : ''}</div>
      </div>
    `;
  }, '');

  $('#component-images').html(html).find('.component-fav').on('click', function() {
    var imageID;
    imageID = $(this).closest('.outer').data('imageid');
    if ($(this).is('.true')) {
      return deleteFav(imageID).done((function(_this) {
        return function() {
          return $(_this).removeClass('true');
        };
      })(this));
    } else {
      return $.post(domain + '/favorites', {
        imageID: imageID
      }).fail(function(dat) {
        return toast(dat.responseJSON.toast);
      }).done((function(_this) {
        return function() {
          return $(_this).addClass('true');
        };
      })(this));
    }
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

window.renderImage = function(image) {
  $('#component-images').html(`
  <div class="fluid" data-imageID="${image.id}">
    <img src="${image.url}">
  </div>`);
};
