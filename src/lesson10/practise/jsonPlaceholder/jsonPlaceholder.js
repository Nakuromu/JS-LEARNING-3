import {JsonPlaceholderAPI} from './jsonPlaceholder-API';

const jsonPlaceholderAPI = new JsonPlaceholderAPI();

const loadMoreBtnEl = document.querySelector('.js-load-more');
const listEL = document.querySelector('.js-posts')

const handleClick = () => {
    jsonPlaceholderAPI.fetchPosts().then(data => {
        const markup = data.map(item => {
            return `<li>
        <h2>${item.title}</h2>
        <p>${item.body}</p>
        <p>id: ${item.id}</p>
    </li>`
        }).join('')

        listEL.insertAdjacentHTML('beforeend', markup);
        jsonPlaceholderAPI.page += 1;
    })
}

loadMoreBtnEl.addEventListener('click', handleClick)

handleClick();