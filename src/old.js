import $ from 'jquery';
import 'jquery.transit';
import {
	sortByFrequency,
	deleteFav,
	isShouldNotRender,
	domain,
	toast,
	isAlmostThere,
	isAndroid,
	showWebview,
	lazyShow
} from './component.env/_util';

window.renderRecommendation = function(images) {
  const html = sortByFrequency(images.serialize())
  .reduce((prev, image)=> {
    return prev + isShouldNotRender(image) ? '' : `
    <a
      onclick="Route.images(${image.id})"
      style="background-image: url(${image.url})"></a>`;
  }, '');
  if (!html)
    return;
  $('.component-images-horizontal').html(html).closest('.area-recommendation').show(300);
};
