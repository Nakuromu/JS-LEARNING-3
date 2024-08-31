
export class UnsplashApi {
    #API_KEY = '7WrDmQF9n0aePvtQxuIXjFA_DFTqjxXR7LHlJjxnV0k';
    #BASE_URL = 'https://api.unsplash.com';
    #BASE_SEARCH_PARAMS = {
        per_page: 12,
        color: 'black_and_white',
        client_id: this.#API_KEY
    }

    query = null;
    page = 1;

    fetchPhotos(){
        const searchParams = new URLSearchParams({
            ...this.#BASE_SEARCH_PARAMS,
            query: this.query,
            page: this.page,
        })
        return fetch(`${this.#BASE_URL}/search/photos?${searchParams}`).then(res => {
            if(!res.ok){
                throw new Error(res.status);
            }
            return res.json();
        })
    }
}