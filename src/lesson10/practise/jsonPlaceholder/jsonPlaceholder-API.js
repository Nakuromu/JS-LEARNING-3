

export class JsonPlaceholderAPI{
    #BASE_URL = 'https://jsonplaceholder.typicode.com';
    page = 1;

    fetchPosts(){
return fetch(`${this.#BASE_URL}/posts?_limit=10&_page=${this.page}`).then(res => {
    if(!res.ok){
        throw new Error(res.status);
    }
    return res.json();
})  }
}