import Toggle from './Toggle';
import './Pic.css';

export default class Pic {
	html(image, opt = {}) {
		const htmlFav = new Toggle(
			'favorites',
			{ imageID: image.id },
			!!window.dat.favorites.where({imageID: image.id, userID: window.dat.session.id}).length,
			opt.toggle
		).html();

		return `
			<div
				style="display: none"
				class="Pic fas fa-unlink"
				data-imageID="${image.id}">
				<div
					class="background"
					onclick="Route.push('images', { id: ${image.id} }).refresh()"
					style="background-image: url(${image.url})">
				</div>
				${htmlFav}
				` + (image.favorites ? `
					<div class="favoriteNum">${image.favorites.length ? image.favorites.length : ''}</div>
				` : '') + `
			</div>
		`
	}
}
