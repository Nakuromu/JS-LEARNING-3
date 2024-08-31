import { fetchBreeds, fetchCatByBreed } from './cat_API';

const selectEL = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader')
const errorEl = document.querySelector('.error')

document.addEventListener('DOMContentLoaded', event => {
    event.preventDefault();
    fetchBreeds()
        .then(breeds => {
            selectEL.classList.remove('is-hiden')
            loaderEl.classList.add('is-hiden')
           return populateBreedSelect(breeds)})
        .catch(error => {
            console.error('Error fetching breeds:', error);
            errorEl.classList.remove('is-hiden')
        });
});

function populateBreedSelect(breeds) {
    const optionsMarkup = breeds.map(breed => {
        return `<option value="${breed.id}">${breed.name}</option>`;
    }).join('');
    
    selectEL.innerHTML = optionsMarkup;
}

function handleSelectBreed(event) {
    loaderEl.classList.remove('is-hiden')
    const selectedBreedId = event.target.value;

    fetchCatByBreed(selectedBreedId)
        .then(data => {
            loaderEl.classList.add('is-hiden')
            const cat = data[0];
            const { name, description, temperament } = cat.breeds[0];
            const markup = `
                <img src="${cat.url}" alt="${name}">
                <h2>${name}</h2>
                <p>Description: ${description}</p>
                <p>Temperament: ${temperament}</p>
            `;

            catInfoEl.innerHTML = markup;
        })
        .catch(error => {
            console.error('Error fetching cat info:', error);
            errorEl.classList.remove('is-hiden')
        });
}

selectEL.addEventListener('change', handleSelectBreed);