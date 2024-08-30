import {fetchWeatherByCityName} from './weatherAPI'
import weatherCardTemplates from '../tamplates/test.hbs'

const weatherFormEl = document.querySelector('.js-search-form');
const weatherWrapperEl = document.querySelector('.weather_wrapper')

const handleSearchWeather = event => {
    event.preventDefault();
    const searchQuery = event.target.elements.user_country.value.trim();

    fetchWeatherByCityName(searchQuery).then(console.log)
}

weatherFormEl.addEventListener('submit', handleSearchWeather);


const convertSecondsToHoursAndMinuts = seconds => {
    const date = new Date(seconds * 1000);
    return `${date.getHours()}:${date.getMinutes()}`;
}