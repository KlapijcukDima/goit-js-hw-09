import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';

class Timer {
  constructor() {
    this.refs = {
      body: document.querySelector('body'),
      dataInput: document.querySelector('input#datetime-picker'),
      btnStartTimer: document.querySelector('button[data-start]'),
      daysRemaining: document.querySelector('[data-days]'),
      hoursRemaining: document.querySelector('[data-hours]'),
      minutesRemaining: document.querySelector('[data-minutes]'),
      secondsRemaining: document.querySelector('[data-seconds]'),
    };
    this.refs.btnStartTimer.disabled = true;
    this.refs.btnStartTimer.addEventListener('click', this.startTimer.bind(this));
    this.selectedData = null;
    this.currentData = null;
    this.remainingTime = 0;
    this.timeId = null;
    this.TIMER_DELAY = 1000;
    this.options = {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose: this.onDataCheck.bind(this),
    };
    flatpickr(this.refs.dataInput, this.options);
    Report.info();
  }

  onDataCheck(selectedDates) {
    this.selectedData = selectedDates[0].getTime();
    this.currentData = new Date().getTime();

    if (this.selectedData > this.currentData) {
      this.refs.btnStartTimer.disabled = false;
      Report.success();
      return;
    }
    Report.failure();
  }

  startTimer() {
    this.timeId = setInterval(() => {
      this.currentData = new Date().getTime();
      if (this.selectedData - this.currentData < 1000){
        clearInterval(this.timeId);
        this.refs.btnStartTimer.disabled = true;
        this.refs.dataInput.disabled = false;
        Report.info();
        return;
      } else {
        this.refs.btnStartTimer.disabled = true;
        this.refs.dataInput.disabled = true;
        this.currentData += 1000;
        this.remainingTime = Math.floor(this.selectedData - this.currentData);
        this.convertMs(this.remainingTime);
      }
    }, this.TIMER_DELAY);
  }

  createMarkup({ days, hours, minutes, seconds }) {
    this.refs.daysRemaining.textContent = days;
    this.refs.hoursRemaining.textContent = hours;
    this.refs.minutesRemaining.textContent = minutes;
    this.refs.secondsRemaining.textContent = seconds;
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(ms / day));
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
    this.createMarkup({ days, hours, minutes, seconds })
    return { days, hours, minutes, seconds };
  }
}

const timer = new Timer();