import $ from 'jquery';
import './GridList.css';
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
	loadImage
} from './_util';
import Pic from './Pic';
import Image from '../model/Image';
import Toggle from './Toggle';

export default new class {
  html(images) {
    return `
    <div id="component-images" class="gridList">
    `+(
      images.reduce(function(prev, image, i) {

        // var htmlAdditional = '';
        var htmlAdditional = window.dat.session && i === 0 ? `
        <div
          class="Pic additional"
          onclick="window.promptToUpload()"
          >
          <div class="background">
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
      }, '')
    )+`
    </div>
    `
  }

  run(el) {
    loadImage();

    $(el).find('#component-images .component-fav').on('click', function() {
      var imageID = $(this).closest('.Pic').data('imageid');
      Toggle.toggle(this, imageID);
    });

    $(el).find('#component-images .message').on('click', function() {
      if (isAndroid()) {
        return showWebview('https://www.youtube.com/embed/f9MsSWxJXhc');
      } else {
        return showWebview('https://www.youtube.com/embed/8iueP5sRQ-Y');
      }
    });
  }
}
