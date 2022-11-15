
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix';

const refs = {
    userDate: document.querySelector('#datetime-picker'),
    btnEl: document.querySelector('[data-start]'),
    timerContainer: document.querySelector('.timer'),
    fieldEl: document.querySelector('.field'),
    daysEl: document.querySelector('[data-days]'),
    hoursEl: document.querySelector('[data-hours]'),
    minutesEl: document.querySelector('[data-minutes]'),
    secondsEl: document.querySelector('[data-seconds]'),
} 

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
         refs.btnEl.disabled = true;
        let newData = new Date(selectedDates[0]);
        const nowDate = Date.now();
        if (newData <= nowDate) {
            refs.btnEl.disabled = true;
        Notify.failure("Please choose a date in the future");
            return;
        }
        refs.userDate.disabled = true;
        refs.btnEl.disabled = false;   
        refs.btnEl.addEventListener('click', () => {
            let idInterval = null;
            refs.btnEl.disabled = true;
             
            idInterval = setInterval(() => {
                const currentTime = new Date();
          
                let timeMs = newData - currentTime;
                const timeOnDisplay = convertMs(timeMs);
                                              
                refs.daysEl.textContent = addLeadingZero(timeOnDisplay.days);
                refs.hoursEl.textContent = addLeadingZero(timeOnDisplay.hours);
                refs.minutesEl.textContent = addLeadingZero(timeOnDisplay.minutes);
                refs.secondsEl.textContent = addLeadingZero(timeOnDisplay.seconds);

                let endTime = refs.daysEl.textContent + refs.hoursEl.textContent + refs.minutesEl.textContent + refs.secondsEl.textContent;
                

                if (endTime === '00000000'){
                    refs.btnEl.disabled = false;
                    refs.userDate.disabled = false;
                    clearInterval(idInterval);
                    Notify.info("Time's up. Choose another date");
                    return;
                }

            }, 1000);
        });
    } 
}   
           
let flatpicker =  flatpickr(refs.userDate, options)

function convertMs(timeMs) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;


  // Remaining days
  const days = Math.floor(timeMs / day);
  // Remaining hours
  const hours = Math.floor((timeMs % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((timeMs % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((timeMs % day) % hour) % minute) / second);
    
    return { days, hours, minutes, seconds };
    
      
}

function addLeadingZero(value) {
    return value.toString().padStart(2, "0")
}

// style
refs.btnEl.style.backgroundColor = '#00ccff';
refs.btnEl.style.borderColor = '#e9e22b';
refs.timerContainer.style.display = 'flex';
refs.timerContainer.style.margin = '50px';
refs.timerContainer.style.gap = '30px';
refs.timerContainer.style.justifyContent = 'center';
refs.timerContainer.style.alignItems = 'center';
refs.timerContainer.style.color = '#2b97e9';
refs.timerContainer.style.textShadow = '0 6px #e9e22b';
refs.timerContainer.style.fontSize = '31px';
refs.fieldEl.style.gap = '30px';
