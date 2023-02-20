 /* 1. Часы и календарь */

  /* Часы */

function showTime() {
    const time = document.querySelector('.time');
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate()
    showGreeting()
    setTimeout(showTime, 1000);

  }

showTime()


 /* Календарь */

function showDate() {
    const date = document.querySelector('.date');
    const date1 = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = date1.toLocaleDateString('en-GB', options);
    date.textContent = currentDate;

  }

showDate();


 /* 2. Приветствие */

 /* Функция getTimeOfDay(), возвращающая время суток */

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  if (hours<=5) {
    return `night`;
  } else if (hours<=11) {
    return `morning`;
  } else if (hours<=17) {
    return `afternoon`;
  } else if (hours<=23) {
    return `evening`;
  }

}


function showGreeting() {
  const greeting = document.querySelector('.greeting');
  const timeOfDay = getTimeOfDay();
  const greetingText = `Good ${timeOfDay}`;
  greeting.textContent = greetingText;

}

showGreeting()

/* При перезагрузке страницы приложения имя пользователя сохраняется */

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


/* 3. Слайдер изображений */

/* Функцию возвращающую рандомное число от 1 до 20 включительно */
function getRandomNum() {
  return Math.floor(Math.random() * (21 - 1)) + 1;
}

let randomNum = getRandomNum();

function setBg() {

  let timeOfDay = getTimeOfDay();
  let bgNum = String(randomNum).padStart(2, "0");
  const body = document.querySelector('body');
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/jonikramov/momentum-backgrounds/main/${timeOfDay}/${bgNum}.webp`;
  img.onload = () => {
    body.style.backgroundImage = `url("${img.src}")`;
  };
}

setBg()

/* Изображения можно перелистывать кликами по стрелкам, расположенным по бокам экрана */

const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

slideNext.addEventListener('click', getSlideNext)
slidePrev.addEventListener('click', getSlidePrev)

function getSlideNext() {
  if (randomNum === 20) {
    randomNum = 1;

  } else {
    randomNum += 1;
  }

  setBg()
}

function getSlidePrev() {
  if (randomNum === 1) {
    randomNum = 20;

  } else {
    randomNum -= 1;
  }

  setBg()
}


/* 4. Погода */

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
city.value = getLocalStorage('city') || 'Minsk';
const weatherError = document.querySelector('.weather-error');

async function getWeather() {

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if(data.cod === '404'){
    weatherError.textContent = `Error! city not found for ${city.value}! `;
    weatherIcon.className = '';
    temperature.textContent = ``;
    weatherDescription.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
  } else if (data.cod === '400') {
    weatherError.textContent = `Nothing to geocode`;
    weatherIcon.className = '';
    temperature.textContent = ``;
    weatherDescription.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
  } else {
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${data.wind.speed.toFixed(0)} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    weatherError.textContent = "";
  }

}

function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);


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
  const quotes = "quotes-en.json";
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


 /* 6. Аудиоплеер */

 import playList from './playList.js';


const playBtn = document.querySelector('.play');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');

/* Флаг */
let isPlay = false;

const audio = new Audio();

let playNum = 0;


function playAudio() {
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  if (!isPlay) /* true -  start playing music */ {
    audio.play();
    playBtn.classList.add('pause');
    isPlay = true;
    activePlayingView()


  } else /* false - stop playing music */ {
    audio.pause();
    playBtn.classList.remove('pause');
    isPlay = false;
  }

  audio.onended = (event) => {
    playNext()
  };

}


function playNext() {
  if (playNum === playList.length-1) {
    playNum = 0;
    isPlay = false;
    playAudio()
    console.log(`${playNum} if part`)
    activePlayingView
    return

  } else {
    playNum = playNum + 1;
    isPlay = false;
    playAudio()
    activePlayingView
    console.log(`${playNum}  playNext() else`)
  }


}


function playPrev() {
  if (playNum === 0) {
    playNum = playList.length - 1;
    isPlay = false;
    playAudio()
    console.log(`${playNum} if part`)
    return

  } else {
    playNum = playNum - 1;
    isPlay = false;
    playAudio()
    console.log(playNum)
  }

}

// playBtn.addEventListener('click', toggleBtn);
playBtn.addEventListener('click', playAudio);
playNextBtn.addEventListener('click', playNext);
playPrevBtn.addEventListener('click', playPrev);

const playListContainer = document.querySelector('.play-list');

for(let i = 0; i < playList.length; i++) {
  const li = document.createElement('li');
  li.classList.add("play-item");
  li.textContent = playList[i].title;
  playListContainer.append(li);

}

const customAudioArray  = document.querySelectorAll('.play-item');

function activePlayingView() {
  customAudioArray.forEach(elem => {
    elem.classList.remove("item-active")
  })
  customAudioArray[playNum].classList.add("item-active");
}


// Перевод приложения на два языка (en/ru или en/be) +15
// Для перевода приложения может использоваться библиотека, например, i18n или аналогичная.
// переводится язык и меняется формат отображения даты +3
// переводится приветствие и placeholder +3
// переводится прогноз погоды в т.ч описание погоды (OpenWeatherMap API предоставляет такую возможность) и город по умолчанию +3
// переводится цитата дня (используйте подходящий для этой цели API, возвращающий цитаты на нужном языке или создайте с этой целью JSON-файл с цитатами на двух языках) +3
// переводятся настройки приложения. При переключении языка приложения в настройках, язык настроек тоже меняется +3
// не переводятся данные, которые вводит пользователь: имя, город, тег для получения фонового изображения от API

/* Перевод приложения на два языка (en/ru или en/be) +15 */

const greetingTranslation = {

}

// const greetingTranslation = {
//   'ru': [
//     ['Доброй ночи', 'Доброе утро', 'Добрый день', 'Добрый вечер'],
//     ['[введите ваше имя]']
//   ],
//   'en': [
//     ['Good night', 'Good morning', 'Good afternoon', 'Good evening'],
//     ['[enter your name]']
//   ]
// }





























// /* Флаг может принимать только два значения: true или false */
// let isPlay = false;

// const audio = new Audio();

// let playNum = 0;

// function playAudio() {
//   // audio.src = 'https://7oom.ru/audio/naturesounds/07%20Birds%20(7oom.ru).mp3';

//   audio.src = playList[playNum].src;
//     audio.currentTime = 0;
//   if(isPlay) /* false */  {
//     audio.pause();
//     isPlay = false;

//   } else /* true */ {
//     audio.play();
//     isPlay = true;

//   }


// }


// function toggleBtn() {
//   playBtn.classList.toggle('pause');
// }


// function playNext() {
//   playNum += 1;
//   playAudio()
//   isPlay = true;


// }

// function playPrev() {
//   playNum += 1;
//   playAudio()
//   isPlay = true;
// }

// playBtn.addEventListener('click', playAudio); /* for play/pause music */
// playBtn.addEventListener('click', toggleBtn); /* for change icon play/pause */

// playPrevBtn.addEventListener('click', playPrev);
// playNextBtn.addEventListener('click', playNext);


// import playList from './playList.js';
// console.log(playList);









































