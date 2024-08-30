const API_KEY = '37b13a88edfd4045ba5eab7317af8f52';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherByCityName = cityName => {
   return fetch(`${BASE_URL}?q=${cityName}&appid=${API_KEY}`).then(res => {
        if(!res.ok){
            throw new Error(res.status);
        }

        return res.json();
    })
}