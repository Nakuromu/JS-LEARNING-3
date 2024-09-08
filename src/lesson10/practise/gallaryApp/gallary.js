import {UnsplashApi} from './gallaryAPI';

const searchFormEl = document.querySelector('.js-search-form');
const gallaryListEl = document.querySelector('.js-gallary');
const loadMoreBtnEl = document.querySelector('.load-more');

const unsplashApi = new UnsplashApi()

const handleSearchPhoto = async event => {
    event.preventDefault();

    const searchQuery = event.target.elements['user-search-query'].value;
    unsplashApi.query = searchQuery;

    try {
        const {data} = await unsplashApi.fetchPhotos()

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
        
    } catch (error) {
        console.log(error)
    }
}

const handleLoadMore = async event => {
    unsplashApi.page += 1;

    try {
        const {data} = await unsplashApi.fetchPhotos();

        if(unsplashApi.page === data.total_pages){
            loadMoreBtnEl.classList.add('is-hiden');
        }
        const photos = data.results;

        const markup = photos.map(item => {
            return `<li>
        <img src="${item.urls.small}" alt="${item.alt_description}">
    </li>`
        }).join('')

        gallaryListEl.insertAdjacentHTML('beforeend', markup);
        
    } catch (error) {
        console.log(error)
    }
}

searchFormEl.addEventListener('submit', handleSearchPhoto)
loadMoreBtnEl.addEventListener('click', handleLoadMore)