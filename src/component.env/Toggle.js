import $ from 'jquery';
import Toast from '../object/Toast';
import {
  getUrlParameter,
  existParameter,
  countUp,
  startLoading,
  stopLoading,
  domain
} from './_util';
import './toggle.css';
export default class Toggle {
  constructor(dbTableName, columnName, isTrue = false, opt = {}) {
    this.isTrue = isTrue;
    this.isRounded = !!opt.isRounded || false;
  }

  html() {
    return `
    <div class="component-fav ${this.isTrue} ${this.isRounded ? 'isRounded' : ''}">
      <span>♡</span>
      <span>♥</span>
    </div>
    `;
  }
}
