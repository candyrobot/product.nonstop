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
} from './old.child';

window.renderRecommendation = function(images) {
  var html;
  html = sortByFrequency(images.serialize()).reduce(function(prev, image) {
    return prev + (isShouldNotRender(image) ? "" : "<a\nhref=\"/images?imageID=" + image.id + "\"\nstyle=\"background-image: url(" + image.url + ")\"></a>");
  }, "");
  if (!html) {
    return;
  }
  return $('.component-images-horizontal').html(html).closest('.area-recommendation').show(300);
};

window.renderImage = function(image) {
  var html;
  html = "<div class=\"fluid\" data-imageID=\"" + image.id + "\">\n	<img src=\"" + image.url + "\">\n</div>";
  return $('#component-images').html(html);
};
