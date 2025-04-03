import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from './pixabay-api';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(img => {
      const {
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = img;
      return `<li class="gallery-item">
              <a class="gallery-link" href="${largeImageURL}">
                <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
              </a>
              <div class="info">
                <p>Likes: <span class="likes">${likes}</span></p>
                <p>Views: <span class="views">${views}</span></p>
                <p>Comments: <span class="comments">${comments}</span></p>
                <p>Downloads: <span class="downloads">${downloads}</span></p>
              </div>
            </li>`;
    })
    .join('');

  refs.gallery.innerHTML = markup;
  lightbox.destroy();
}

export function clearGallery() {
  refs.gallery.innerHTML = '';
}

export function showLoader() {
  refs.gallery.classList.add('hidden');
}

export function hideLoader() {
  refs.gallery.classList.remove('hidden');
}
