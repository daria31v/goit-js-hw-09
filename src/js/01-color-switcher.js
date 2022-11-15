// Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону <body> 
// на випадкове значення, використовуючи інлайн стиль.
//  Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.
// *******
// УВАГА
// Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів. 
// Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною(disabled).

const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
const mainColor = document.querySelector('body');

let colorId = mainColor.style.backgroundColor;

buttonStop.setAttribute('disabled', true);

buttonStart.addEventListener('click', () => {
  colorId = setInterval(() => {
    mainColor.style.backgroundColor = getRandomHexColor();
  }, 1000);
 
  buttonStop.removeAttribute('disabled');
  buttonStart.setAttribute('disabled', true);
})

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

buttonStop.addEventListener('click', () => {
  clearInterval(colorId);
  buttonStart.removeAttribute('disabled');
  buttonStop.setAttribute('disabled', true);
});

