import { fetchWeatherByCityName } from './weatherAPI';

const weatherFormEl = document.querySelector('.js-search-form');
const weatherWrapperEl = document.querySelector('.weather_wrapper');

const handleSearchWeather = event => {
    event.preventDefault();
    const searchQuery = event.target.elements.user_country.value.trim();

    fetchWeatherByCityName(searchQuery).then(data => {
        const weatherMarkup = (data) => {
            return `
                <div>
                    <h2>${data.name}</h2>
                    <ul>
                        <li>
                            <p>Температура: ${Math.round(((data.main.temp)-273))}°C</p>
                        </li>
                        <li>
                            <p>Відчувається як: ${Math.round((data.main.feels_like)-273)}°C</p>
                        </li>
                        <li>
                            <p>Схід сонця: ${convertSecondsToHoursAndMinuts(data.sys.sunrise)}</p>
                        </li>
                        <li>
                            <p>Захід сонця: ${convertSecondsToHoursAndMinuts(data.sys.sunset)}</p>
                        </li>
                        <li>
                            <p>Хмарність: ${data.clouds.all}%</p>
                        </li>
                    </ul>
                </div>`;
        };

        weatherWrapperEl.innerHTML = weatherMarkup(data);
    }).catch(error => {
        console.error('Error fetching weather data:', error);
    });
};

weatherFormEl.addEventListener('submit', handleSearchWeather);

const convertSecondsToHoursAndMinuts = seconds => {
    const date = new Date(seconds * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};
