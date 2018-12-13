import Toggle from './Toggle';

export default class Pic {
	html(image) {

		const htmlFav = new Toggle(
			'favorites',
			{ imageID: image.id },
			!!window.dat.favorites.where({imageID: image.id, userID: window.dat.session.id}).length
		).html();

		return `
			<div
				style="display: none"
				class="outer fas fa-unlink"
				data-imageID="${image.id}">
				<div
					class="inner"
					onclick="Route.push('images', { id: ${image.id} }).refresh()"
					style="background-image: url(${image.url})">
				</div>
				${htmlFav}
				<div class="favoriteNum">${image.favorites ? image.favorites.length : ''}</div>
			</div>
		`
	}
}
