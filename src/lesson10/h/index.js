import { fetchBreeds, fetchCatByBreed } from './cat_API';

const selectEL = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');

document.addEventListener('click', event => {
    event.preventDefault();
    fetchBreeds()
        .then(breeds => populateBreedSelect(breeds))
        .catch(error => {
            console.error('Error fetching breeds:', error);
            selectEL.innerHTML = '<option value="">Failed to load breeds</option>';
        });
});

function populateBreedSelect(breeds) {
    const optionsMarkup = breeds.map(breed => {
        return `<option value="${breed.id}">${breed.name}</option>`;
    }).join('');
    
    selectEL.innerHTML = optionsMarkup;
}

function handleSelectBreed(event) {
    const selectedBreedId = event.target.value;

    fetchCatByBreed(selectedBreedId)
        .then(data => {
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
            catInfoEl.innerHTML = '<p>Something went wrong. Please try again later.</p>';
        });
}

selectEL.addEventListener('change', handleSelectBreed);