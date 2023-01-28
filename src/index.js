import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SearchPhotoApiService from './api/fetchPhoto.js'
import photoTpl from './templates/photo-tpl.hbs'
const debounce = require('lodash.debounce');


const refs = {
  form: document.querySelector('#search-form') , 
  btnSub: document.querySelector('button'),
}
