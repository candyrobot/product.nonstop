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
				class="Pic fas fa-unlink"
				data-imageID="${image.id}">
				<div
					class="background"
					data-load-image="${image.url}"
					onclick="Route.push('images', { id: ${image.id} }).refresh()"
					>
				</div>
				${htmlFav}
				` + (image.favorites ? `
					<div class="favoriteNum">${image.favorites.length ? image.favorites.length : ''}</div>
				` : '') + `
			</div>
		`
	}
}
