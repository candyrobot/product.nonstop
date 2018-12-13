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
import Pic from './Pic';
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

  var html = getViewableData(opt).reduce(function(prev, image, i) {

    // var htmlAdditional = '';
    var htmlAdditional = window.dat.session && i === 0 ? `
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

    var htmlBanners = i % 12 ? '' : `
    <div class="message">
      スマホのホーム画面にこのアプリを追加することができるのです
      <i>(ここをタップ)</i>
    </div>
    <div class="starbacks">
      <div>
        <div class="title">
          20枚投稿でもれなくスターバックス券もらえる！
        </div>
        <div class="small">
          🌟達成した時点でメールをお送りします
        </div>
        <div class="small">
          🌟但し、同じ画像、当サービスのコンセプトにあっていない画像は対象外です<br>
        </div>
        <div class="small">
          🌟20枚毎に何回でも入手可能です！
        </div>
      </div>
    </div>
    `;

    return `
      ${prev}
      ${htmlBanners}
      ${htmlAdditional}
      ${new Pic().html(image)}
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
  // lazyShow('#component-images .outer');
};

export const renderImage = function(id) {
  const image = window.dat.images.filter((image)=> image.id == id)[0];
  $('#component-images').html(`
  <div class="fluid" data-imageID="${image.id}">
    <img src="${image.url}">
  </div>`);
};
