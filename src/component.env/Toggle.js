import $ from 'jquery';
import './toggle.css';
export default class Toggle {
  constructor(isTrue) {
    this.isTrue = isTrue;
  }

  html() {
    return `
    <div class="component-fav ${this.isTrue}">
      <span>♡</span>
      <span>♥</span>
    </div>
    `;
  }
}
