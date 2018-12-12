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
import Image from '../model/Image';
import Toggle from './Toggle';
// import { renderImage, renderImages } from './gridList';

export function renderLayer2Row1(imageID) {

  $('#layer2-row1').html(`
    ${countUp('x') > 3 ? '' : `
      <div class="balloon">
        タップして "お気入り" に入れると…　👉
      </div>
    `}
    <div class="fav-area" onclick="$(this).prev().hide()">
      ${new Toggle('favorites', 'imageID', Image.isIFavorited(imageID)).html()}
    </div>
  `);

  $('#layer2-row1 .component-fav').on('click', function() {
    Toggle.toggle(this, imageID);

    let images = Image.sortByRelated(imageID);
    if(images.length === 0)
      images = Image.sortByNewer();

    images = Image.excludeIFavorited(images.exclude({ id: imageID }));

    renderRecommendation(images);
  });
}

const renderRecommendation = function(images) {
  const html = images.reduce((html, image)=> {
    return html + `
    <a
      onclick="
        countUp('clickRecommend');
        window.showDrawer();

        Route.push('images', { id: ${image.id} }).refresh()
      "
      style="background-image: url(${image.url})"></a>`;
  }, '');
  if (!html)
    return;
  countUp('showRecommendation');
  window.showDrawer();
  $('.component-images-horizontal').html(html).closest('.area-recommendation').show(300);
};
