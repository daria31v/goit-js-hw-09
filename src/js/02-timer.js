// flatpickr and notiflix.
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const userDate = document.querySelector('#datetime-picker');


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr(userDate, options);






// flatpickr(userDate,{
//     onClose(selectedDates){
//         const time = selectedDates[0];
//         console.log(time);
// }
// });

// console.log(flatpickr);

// із завдання
// if (currentDate < selectedDates) {
//     window.alert("Please choose a date in the future");
//  }