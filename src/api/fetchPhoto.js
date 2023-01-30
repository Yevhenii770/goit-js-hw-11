import axios from 'axios'
const KEY = '33191219-dc41095899386e0adcb39eb2c';

export default class SearchPhotoApiService {
    constructor() {
        this.serchQuery = '';
        this.page = 1;
    }

   async fetchchPhoto() {
        const url = `https://pixabay.com/api/?key=${KEY}&q=${this.serchQuery}&page=${this.page}&image_type=photo&${this.page}&per_page=40&orientation=horizontal&safesearch=true`;
         return fetch(url)
            .then(r => r.json())
            .then(data => {
                this.incrementPage()
                return data.hits
            });
    }

    incrementPage() {
        this.page += 1;
    }
    resetPage() {
        this.page = 1;
    }
    get query() {
        return this.serchQuery
    }
    set query(newQuery) {
        this.serchQuery = newQuery;    
    }
}
