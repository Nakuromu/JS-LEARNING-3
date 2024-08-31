const API_KEY = 'live_8gNr5ZMcCKRRjeWe9WwfyTtXPZdIw9Nuu3wJ58zt5trBn24JPLex0r51EhpeBwCb';
const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchCatByBreed(catId){
    return fetch(`${BASE_URL}/images/search?limit=10&breed_ids=${catId}&api_key=${API_KEY}`).then(res => {
        if(!res.ok){
            throw new Error(res.status);
        }
        return res.json();
    })
}

export function fetchBreeds(){
    return fetch(`${BASE_URL}/breeds`).then(res => {
        if(!res.ok){
            throw new Error(res.status);
        }

        return res.json();
    })
}

