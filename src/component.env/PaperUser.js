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
        <div
          style="padding-left: 0.35em;"
          >
          <div
            style="
            font-size: 10px;
            "
            >
            ${user.created_at.replace('T', ' ').replace(/\..*$/, '')}
          </div>
          <div
            style="
            font-size: 11px;
            font-weight: bold;
            "
            >
            ？？？？　このユーザーのお気入り▼
          </div>
        </div>
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
