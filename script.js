// 1. Часы и календарь



function showTime() {
    const time = document.querySelector('.time');
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate()
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





















