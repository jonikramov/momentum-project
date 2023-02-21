// 1. Часы и календарь



function showTime() {
    const time = document.querySelector('.time');
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate()
    showGreeting()
    setTimeout(showTime, 1000);
  }

showTime();





function showDate() {
    const date = document.querySelector('.date');
    const date1 = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = date1.toLocaleDateString('en-US', options);
    date.textContent = currentDate;
  }

showDate();


// 2. Приветствие

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    if (hours <=5) return 'night'
    if (hours <=11) return 'morning'
    if (hours <=17) return 'afternoon'
    if (hours <=23) return 'evening'
}


function showGreeting() {
    const greeting = document.querySelector('.greeting');
    const timeOfDay = getTimeOfDay();
    const greetingText = `Good ${timeOfDay}`;
    greeting.textContent = greetingText;
}

function setLocalStorage() {
    const name = document.querySelector('.name');
    localStorage.setItem('name', name.value);
  }
  window.addEventListener('beforeunload', setLocalStorage)


  function getLocalStorage() {
    const name = document.querySelector('.name');
    if(localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
    }
  }
  window.addEventListener('load', getLocalStorage)



// 2. Слайдер изображений

const slideNext = document.querySelector('.slide-next')
const slidePrev = document.querySelector('.slide-prev')

function getRandomNum() {
  return Math.floor(Math.random() * (20 - 1 + 1)) + 1; //Максимум и минимум включаются
}

let randomNum = getRandomNum()

function setBg() {
  const timeOfDay = getTimeOfDay();
  let bgNum = String(randomNum).padStart(2, "0");
  const body = document.querySelector('.body');
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/jonikramov/momentum-backgrounds/main/${timeOfDay}/${bgNum}.webp`;
  img.onload = () => {
    body.style.backgroundImage = `url("${img.src}")`;
  };
}

setBg()



function getSlideNext() {
  if (randomNum === 20) {
    randomNum = 1
  } else {
    randomNum += 1
  }
  setBg()
}

function getSlidePrev() {
  if (randomNum === 1) {
    randomNum = 20
  } else {
    randomNum -= 1
  }
  setBg()
}

slideNext.addEventListener('click', getSlideNext)
slidePrev.addEventListener('click', getSlidePrev)

// // 4. Виджет погоды

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');
const city = document.querySelector('.city');
city.value = localStorage.getItem('city') || 'Tashkent';

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=7e7b7eeb9bfacdd317469108487b2f59&units=metric`;
  const res = await fetch(url);
  const data = await res.json();




  weatherError.textContent = `Error! city not found for ${city.value}! `;

  if(data.cod === '404'){
    temperature.textContent = ''
    weatherDescription.textContent = ''
    wind.textContent = ''
    humidity.textContent = ''
    weatherError.textContent = `Error! city not found for ${city.value}! `
  } else if (data.cod === '400'){
    temperature.textContent = ''
    weatherDescription.textContent = ''
    wind.textContent = ''
    humidity.textContent = ''
    weatherError.textContent = 'Nothing to geocode'
  } else {
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`
    humidity.textContent = `Humidity: ${data.main.humidity} %`
    weatherError.textContent = ''
  }

}


city.addEventListener('change', getWeather)
document.addEventListener('DOMContentLoaded', getWeather);


/* При перезагрузке страницы приложения названия города сохраняется */

function setCityLocalStorage() {
  localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setCityLocalStorage)

function getCityLocalStorage() {
  if(localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
}
window.addEventListener('load', getCityLocalStorage)


// 5. Виджет "цитата дня"

/* Получение случайного целого числа в заданном интервале */

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

const changeQuote = document.querySelector('.change-quote');
const quoteContent = document.querySelector('.quote');
const quoteAuthor = document.querySelector('.author');

async function getQuotes() {
  const quotes = 'quotes-en.json';
  const res = await fetch(quotes);
  const data = await res.json();
  const randomNumber = getRandomInt(0, data.length);
  const quoteObj = data[randomNumber];
  quoteContent.textContent = quoteObj.q;
  quoteAuthor.textContent = quoteObj.a;
}

getQuotes();


changeQuote.addEventListener('click', getQuotes)
window.addEventListener('load', getQuotes)








