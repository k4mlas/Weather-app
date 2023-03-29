const input = document.querySelector('input');
const button = document.querySelector('button');
const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = '&appid=c48b035fd93d6404c86ddd9070a9ead2';
const API_UNITS = '&units=metric';

const getWeather = () => {
	const city = input.value || 'London';
	const URL = API_LINK + city + API_KEY + API_UNITS;

	axios
		.get(URL)
		.then((res) => {
			const temp = res.data.main.temp;
			const huma = res.data.main.humidity;
			const status = Object.assign({}, ...res.data.weather);
			cityName.textContent = res.data.name;
			temperature.textContent = temp.toFixed() + '℃';
			humidity.textContent = huma + '%';
			weather.textContent = status.main;
			input.value = '';
			warning.textContent = '';
			const icon = status.id;
			if (icon == 200 && icon <= 232) {
				photo.setAttribute('src', './img/thunderstorm.png');
			} else if (icon == 300 && icon <= 321) {
				photo.setAttribute('src', './img/drizzle.png');
			} else if (icon == 500 && icon <= 531) {
				photo.setAttribute('src', './img/rain.png');
			} else if (icon == 600 && icon <= 622) {
				photo.setAttribute('src', './img/ice.png');
			} else if (icon == 701 && icon <= 781) {
				photo.setAttribute('src', './img/fog.png');
			} else if (icon == 800) {
				photo.setAttribute('src', './img/sun.png');
			} else if (icon == 801 && icon <= 804) {
				photo.setAttribute('src', './img/cloud.png');
			} else {
				photo.setAttribute('src', './img/unknown.png');
			}
		})
		.catch((warning.textContent = 'Wpisz poprawną nazwę miasta'));
};

const enterCheck = (e) => {
	if (e.key === 'Enter') {
		getWeather();
	}
};
input.addEventListener('keyup', enterCheck);
button.addEventListener('click', getWeather);
