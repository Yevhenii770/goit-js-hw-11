import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SearchPhotoApiService from './api/fetchPhoto.js'
import photoTpl from './templates/photo-tpl.hbs'



const refs = {
  searchForm: document.querySelector('.search-form'),
  container: document.querySelector('.gallery'),
  btnMore: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
}

const searchPhotoApi = new SearchPhotoApiService();


refs.searchForm.addEventListener('submit', onSearch)
refs.btnMore.addEventListener('click', onLoadMore)
// refs.gallery.addEventListener('click', onGallaryClick);


// function onGallaryClick() {
//   new SimpleLightbox('.gallery a')
// }


function onSearch(e) {
  e.preventDefault()
  refs.btnMore.removeAttribute("disabled")

   if (!e.target.searchQuery.value.trim()) {
    return;
  } 
  
  searchPhotoApi.query = e.currentTarget.elements.searchQuery.value.trim();
  refs.btnMore.classList.remove('is-hidden');
  onLoadMore()
  e.target.reset()
  clearContainer();
}






function makeMarkup(hits) {
  for (const element of hits) {
     refs.container.insertAdjacentHTML('beforeend', photoTpl(element))
  }
}

function clearContainer() {
  refs.container.innerHTML = ''
}

function onLoadMore() {

 searchPhotoApi.fetchchPhoto().then(hits => {
    if (hits.length == 0) {
      return Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    }
    makeMarkup(hits);
 });
  
}














