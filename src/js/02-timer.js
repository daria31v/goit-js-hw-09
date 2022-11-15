// flatpickr and notiflix.
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix';
// console.log(Notify)

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
// console.log(refs);


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

// const currentTime = new Date();
// const dayFromInput = currentTime.getDay();
// console.log(dayFromInput);
// const hourFromInput = currentTime.getHours();
// console.dir(hourFromInput);
// const minutesFromInput = currentTime.getMinutes();
// // console.log(minutesFromInput);
// const secondsFromInput = currentTime.getSeconds();
// // console.log(secondsFromInput);

const currentTime = Date.now();
console.log(currentTime);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        //   console.log(selectedDates[0]);
        //   загальний
        let newData = Date.parse(selectedDates[0]);
        console.log(newData);
       
        if (newData <= currentTime) {
            refs.btnEl.disabled = true;
            Notify.failure("Please choose a date in the future");
            return;
        }
        refs.btnEl.disabled = false;
refs.btnEl.addEventListener('click', onCounter())
         
 function onCounter() {
                    
        refs.btnEl.disabled = true;
        setInterval(() => {                   
        let id = newData - currentTime;
        console.log(id)
            
        let timeMs = id;
        console.log(timeMs);
        const timeOnDisplay = convertMs(timeMs);
        console.log(timeOnDisplay);


        refs.daysEl.textContent = addLeadingZero(timeOnDisplay.days);
        refs.hoursEl.textContent = addLeadingZero(timeOnDisplay.hours);
        refs.minutesEl.textContent = addLeadingZero(timeOnDisplay.minutes);
        refs.secondsEl.textContent = addLeadingZero(timeOnDisplay.seconds);

        if (refs.secondsEl.textContent === 0) {
            clearInterval(timerID);
            Notify.info("The end");
            return
        }
    }, 1000)
}
   
    }


}  // ***********************************
    
       
        
    console.log(options)



    

let flatpicker =  flatpickr(refs.userDate, options)

// function updateClockface({ hours, mins, secs }) {
//     refs.clockface.textContent = `${hours} : ${mins} : ${secs}`;
// }
// const timer = new Timer({
//     onTick: updateClockface
//     });



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
    console.log('function convertMs')
    return { days, hours, minutes, seconds };
    
      
}


function addLeadingZero(value) {
    return value.toString().padStart(2, "0")
}


