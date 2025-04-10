import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  hideLoader,
  showLoader,
  clearGallery,
  createGallery,
} from './js/render-functions';
import { getImagesByQuery, refs } from './js/pixabay-api';

refs.form.addEventListener('submit', async e => {
  e.preventDefault();
  const query = e.target.elements.input.value.trim();
  showLoader();

  if (!query) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    refs.gallery.classList.add('hidden');
    return;
  }

  clearGallery();

  try {
    const images = await getImagesByQuery(query);

    if (images && images.length > 0) {
      createGallery(images);

      iziToast.success({
        title: 'Success',
        message: `Found ${images.length} images for your query!`,
        position: 'topRight',
      });
    } else {
      iziToast.info({
        title: 'No Results',
        message: 'No images found. Try another keyword.',
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
      position: 'topRight',
    });
    console.error('Fetch error:', error);
  } finally {
    hideLoader();
  }
});
