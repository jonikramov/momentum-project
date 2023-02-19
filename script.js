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


// function setBg() {
//   const timeOfDay = getTimeOfDay();
//   let bgNum = String(randomNum).padStart(2, "0");
//   const body = document.querySelector('.body');
//   body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
// }

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






