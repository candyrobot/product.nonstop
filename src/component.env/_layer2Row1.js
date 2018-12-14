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
  loadImage
} from './_util';
import Image from '../model/Image';
import Toggle from './Toggle';
import Pic from './Pic';
// import { renderImage, renderImages } from './gridList';

export function renderLayer2Row1(imageID) {

  $('#layer2-row1').html(`
    ${countUp('x') > 3 ? '' : `
      <div class="balloon">
        タップして "お気入り" に入れると…　👉
      </div>
    `}
    <div class="fav-area" onclick="$(this).prev().hide()">
      ${new Toggle(
        'favorites',
        'imageID',
        Image.isIFavorited(imageID),
        { isRounded: true }
      ).html()}
    </div>
  `);

  $('#layer2-row1 .component-fav').on('click', function() {
    Toggle.toggle(this, imageID);

    let images = Image.sortByRelated(imageID);
    if(images.length === 0)
      images = Image.sortByNewer();

    images = Image.excludeIFavorited(images.exclude({ id: imageID }));

    const html = images.reduce((p, i)=> p + new Pic().html(i), '');
    $('.component-images-horizontal').html(html);
    if(html === '')
      return;
    $('.area-recommendation').show(300);

    loadImage();
    $('.component-images-horizontal').on('scroll', loadImage);
    ;
  });
}
