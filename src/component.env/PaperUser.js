import './PaperUser.css';

export default class PaperUser {
  html(user) {
    if(window.dat.favorites.where({ userID: user.id }).length === 0)
      return '';
    var n = window.dat.favorites.where({ userID: user.id }).length - 3;
    return `
    <div class="PaperUser">
      <div class="user">
        <i class="fas fa-user-circle"></i>
        <small
        style="
        vertical-align: super;
        padding-left: 0.25em;
        font-size: 12px;
        "
        >このユーザーのお気入り💛</small>
      </div>
      <div>
        ${window.dat.favorites.where({ userID: user.id }).reduce((prev, f, i)=> {
          if(i > 2)
            return prev;
          const image = window.dat.images.find(f.imageID);
          return prev + `
          <div
            class="image"
            onclick="Route.push('images', { id: ${image.id} }).refresh()"
            style="
            background-image: url(${image.url})
            "
            >
          </div>
          `
        }, '') || '<p align="center">なし</p>'}

        <div
          class="image"
          onclick="xxxxxxx"
          style="height: initial"
          >
          <h2 style="margin-bottom: -10px">
            …他${n > 0 ? n : 2}件！
          </h2>
          <p class="small">（全部見るには登録する必要があります）</p>
        </div>
      </div>
    </div>
    `;
  }
}
