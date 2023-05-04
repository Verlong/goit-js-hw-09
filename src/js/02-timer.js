// Напиши скрипт таймера, який здійснює зворотний відлік до певної дати.
//  Такий таймер може використовуватися у блогах та інтернет - магазинах,
//     сторінках реєстрації подій, під час технічного обслуговування тощо.

// Елементи інтерфейсу
// HTML містить готову розмітку таймера, поля вибору кінцевої дати і кнопку,
//     по кліку на яку, таймер повинен запускатися.
//     Додай мінімальне оформлення елементів інтерфейсу.
// Описаний в документації

import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import { convertMs } from './02-converts.js';

import Notiflix from 'notiflix';
//знайти форми дат за атрибутами, кнопку та інпут
const datetimePicker = document.querySelector('#datetime-picker');

const startButton = document.querySelector('[data-start]');
const daysOutput = document.querySelector('[data-days]');
const hoursOutput = document.querySelector('[data-hours]');
const minutesOutput = document.querySelector('[data-minutes]');
const secondsOutput = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      startButton.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startButton.disabled = false;
    }
  },
};
const calendar = flatpickr(datetimePicker, options);

const timer = {
  isActive: false,
  intervalId: null, //
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    // const startTime = Date.now();
    const targetDate = calendar.selectedDates[0]; // change for back counts
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      //   const deltaTime = currentTime - startTime;
      const deltaTime = targetDate - currentTime; // change for back counts
      if (deltaTime > 0) {
        const time = convertMs(deltaTime);
        updateClockface(time);
        console.log(time);
      } else {
        this.stop();
      }
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  },
};

function updateClockface({ days, hours, minutes, seconds }) {
  secondsOutput.textContent = `${seconds}`;
  minutesOutput.textContent = `${minutes}`;
  hoursOutput.textContent = `${hours}`;
  daysOutput.textContent = `${days}`;
}

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  datetimePicker.disabled = true;
  timer.start();
});
