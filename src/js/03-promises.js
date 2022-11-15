// HTML містить розмітку форми, в поля якої користувач буде вводити першу затримку в мілісекундах, 
// крок збільшення затримки для кожного промісу після першого і кількість промісів, яку необхідно створити.
// Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay) стільки разів, скільки ввели в поле amount. 
// Під час кожного виклику передай їй номер промісу(position), що створюється, і затримку, враховуючи першу затримку(delay), 
// введену користувачем, і крок(step).
// Доповни код функції createPromise таким чином, щоб вона повертала один проміс, який виконується або відхиляється через delay часу. 
// Значенням промісу повинен бути об'єкт, в якому будуть властивості position і delay зі значеннями однойменних параметрів. 

import { Notify } from 'notiflix';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onSubmitFormEl);

// function
function onSubmitFormEl(evt) {
  evt.preventDefault();
  const { step, delay, amount } = evt.target.elements;
  const btn = evt.target.lastElementChild;
  
  let totalDelay = Number(delay.value);

  btn.disabled = true;

  for (let i = 1; i <= amount.value; i += 1) {
    createPromise(i, totalDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    totalDelay += Number(step.value);
  }
   // add disable
  setTimeout(() => {
    btn.disabled = false;
  }, totalDelay);
}

// promise
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
});
}
