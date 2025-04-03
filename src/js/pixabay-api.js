import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { hideLoader, clearGallery, createGallery } from './render-functions';

export const refs = {
  form: document.querySelector('.form'),
  input: document.querySelector('#input'),
  button: document.querySelector('button-search'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader-text'),
};

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export async function getImagesByQuery(query) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '49636460-73c540aa8750c0befabaf1348';
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  };

  try {
    const { data } = await axios.get(BASE_URL, { params });

    if (data.hits.length === 0) {
      iziToast.info({
        title: 'No Results',
        message: `Sorry, there are no images matching your search query. Please try again!`,
        position: 'topRight',
      });
      hideLoader();
      refs.gallery.classList.add('hidden');
      return null;
    }

    refs.input.value = '';
    clearGallery();
    createGallery(data.hits);
    hideLoader();
    lightbox.refresh();
    return data.hits;
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: `❌ Error fetching images: ${error.message}. Please try again!`,
      position: 'topRight',
    });
    return null;
  }
}
