import {UnsplashApi} from './gallaryAPI';

const searchFormEl = document.querySelector('.js-search-form');
const gallaryListEl = document.querySelector('.js-gallary');
const loadMoreBtnEl = document.querySelector('.load-more');

const unsplashApi = new UnsplashApi()

const handleSearchPhoto = event => {
    event.preventDefault();

    const searchQuery = event.target.elements['user-search-query'].value;
    unsplashApi.query = searchQuery;

    unsplashApi.fetchPhotos().then(data => {
        if(unsplashApi.page === data.total_pages){
            remove;
        }
        if(!data.result.length){
            throw new Error();
        }
        const photos = data.results;

        const markup = photos.map(item => {
            return `<li>
        <img src="${item.urls.small}" alt="${item.alt_description}">
    </li>`
        }).join('')

        gallaryListEl.innerHTML = markup;
        loadMoreBtnEl.classList.remove('is-hiden')
    }).catch(() => {
        loadMoreBtnEl.classList.add('is-hiden');
        gallaryListEl.textContent = 'Images not found';
    })
}

const handleLoadMore = event => {
    unsplashApi.page += 1;

    unsplashApi.fetchPhotos().then(data => {
        if(unsplashApi.page === data.total_pages){
            loadMoreBtnEl.classList.add('is-hiden');
        }
        const photos = data.results;

        const markup = photos.map(item => {
            return `<li>
        <img src="${item.urls.small}" alt="${item.alt_description}">
    </li>`
        }).join('')

        gallaryListEl.insertAdjacentHTML('beforeend', markup)
    })
}

searchFormEl.addEventListener('submit', handleSearchPhoto)
loadMoreBtnEl.addEventListener('click', handleLoadMore)