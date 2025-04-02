import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { hideLoader, showLoader } from './js/render-functions';
import { getImagesByQuery, refs } from './js/pixabay-api';

refs.form.addEventListener('submit', e => {
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
  getImagesByQuery(query);
});
