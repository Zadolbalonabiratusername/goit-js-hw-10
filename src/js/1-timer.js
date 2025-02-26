import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import errorIcon from "../img/icon-error.svg";

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  startTimer: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate = null;
refs.startTimer.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (checkUserDate(selectedDates[0])) {
      userSelectedDate = selectedDates[0];
    } else {
      console.log('Please choose a date in the future');
      showAlert();
      timer.stop();
      refs.startTimer.disabled = true;
    }
    console.log(selectedDates[0]);
  },
};


flatpickr("#datetime-picker", options);


function checkUserDate(selectedDate) {
  if (new Date(selectedDate) > new Date()) {
    refs.startTimer.disabled = false;
    return true;
  } else {
    return false;
  }
}

function showAlert() {
  iziToast.show({
    position: 'topRight',
    message: 'Please choose a date in the future',
    messageSize: '16px',
    messageLineHeight: '24px',
    messageColor: '#fff',
    iconUrl : errorIcon,
    backgroundColor: '#ef4040',
    close: false,
  });
}




const timer = {
  intervalId: null,

  start() {
    console.log('START');

    this.intervalId = setInterval(() => {
      this.tick();
    }, 1000);

    refs.inputDate.disabled = true;
    refs.startTimer.disabled = true;
  },

  stop() {
    console.log('STOP');
    refs.inputDate.disabled = false;

    clearInterval(this.intervalId);
    refs.days.textContent = '00';
    refs.hours.textContent = '00';
    refs.minutes.textContent = '00';
    refs.seconds.textContent = '00';
  },


  tick() {
    const timeRemaining = userSelectedDate - Date.now();
    const time = getTimeComponents(timeRemaining);
    refs.days.textContent = time.days.toString().padStart(2, '0');
    refs.hours.textContent = time.hours.toString().padStart(2, '0');
    refs.minutes.textContent = time.minutes.toString().padStart(2, '0');
    refs.seconds.textContent = time.seconds.toString().padStart(2, '0');

    if (timeRemaining < 1000) {
      this.stop();
    }
  },
};



refs.startTimer.addEventListener('click', () => {
  timer.start();
});



function getTimeComponents(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

