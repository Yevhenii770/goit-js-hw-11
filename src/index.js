import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImages } from './api/fetchPhoto.js'




const refs = {
  searchForm: document.querySelector('.search-form'),
  container: document.querySelector('.gallery'),
  btnMore: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
}


let simpL = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
})

let query = '';
console.log(query)
let page = 1;
const perPage = 20;

refs.searchForm.addEventListener('submit', onSearch)
refs.btnMore.addEventListener('click', onLoadMore)



function onSearch(e) {
  e.preventDefault()
  refs.btnMore.removeAttribute("disabled")


  page = 1;
  query = e.currentTarget.searchQuery.value.trim();
  console.log(e.currentTarget.searchQuery.value.trim())
  clearContainer();
  refs.btnMore.classList.remove('is-hidden');

  onLoadMore()
  e.target.reset()
}


function clearContainer() {
  refs.container.innerHTML = ''
}

function onLoadMore() {
  page += 1;
  
  fetchImages(query, page, perPage)
    .then(({ data }) => {
      renderGallery(data.hits);
   simpL.refresh();
 });
  
}

function renderGallery(images) {
  const markup = images
    .map(image => {
      const { id, largeImageURL, webformatURL, tags, likes, views, comments, downloads } = image;
      return `
        <a class="gallery__link" href="${largeImageURL}">
          <div class="gallery-item" id="${id}">
            <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item"><b>Likes</b>${likes}</p>
              <p class="info-item"><b>Views</b>${views}</p>
              <p class="info-item"><b>Comments</b>${comments}</p>
              <p class="info-item"><b>Downloads</b>${downloads}</p>
            </div>
          </div>
        </a>
      `;
    })
    .join('');

  refs.container.insertAdjacentHTML('beforeend', markup);
}







