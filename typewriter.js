// Получаем элемент заголовка по id
let typeWriterElement = document.getElementById('typewriter');

// Создаем массив текстовых строк, которые будут выводиться поочередно
let textArray = ["Упакуем ваш бренд🎁😘"];

// Определяем функцию, которая будет выводить текст посимвольно с задержкой
function typeWriter(text, i, cb) {
  if ( i < text.length ) {
    typeWriterElement.innerHTML += text.charAt(i);
    i++;
    setTimeout( function () {
      typeWriter(text, i, cb)
    }, 100); // задержка в миллисекундах между символами
  } else if (typeof cb == 'function') {
    setTimeout(cb, 1000); // задержка в миллисекундах перед вызовом колбэка
  }
}

// Функция для запуска анимации
function startAnimation() {
  let i = 0;
  // Запускаем анимацию только если заголовок находится на экране
  if (typeWriterElement.getBoundingClientRect().top < window.innerHeight) {
    typeWriterElement.style.opacity = 1; // отображаем заголовок
    typeWriter(textArray[i], 0, function () {
      i++;
      if (i < textArray.length) {
        setTimeout(function () {
          typeWriterElement.innerHTML = ''; // очищаем заголовок
          typeWriter(textArray[i], 0, arguments.callee);
        }, 2000); // задержка в миллисекундах между анимациями
      }
    });
  } else {
    // Если заголовок еще не находится на экране, ждем 100 миллисекунд и повторяем попытку
    setTimeout(startAnimation, 100);
  }
}

// Запускаем анимацию при загрузке страницы
window.addEventListener('load', startAnimation);
