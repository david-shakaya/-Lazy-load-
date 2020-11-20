//  Болтливые события

/*
 * Сhatty events
 * Приемы throttling и debouncing c Lodash
 */



//  _.throttle  - Затормаживает количество визовов события. Встваляеться на место колбек функц. А колбек уже внутри него.

// >>>>>>>>>> что бы воспользоватся этим методом идем https://www.jsdelivr.com/package/npm/lodash  (библиотека)
//  и копируем ссылку и вставляем в html перед js скриптом.

 //  Пример болтливых событий и как с ними бороться

const coordsOutputRef = document.querySelector('.js-coords'); // Находим абзац
let mousemoveCallbackCounter = 0   // Счетчик - считает количество событий
 
window.addEventListener('mousemove', _.throttle( event => {
    mousemoveCallbackCounter += 1
    coordsOutputRef.textContent = `Кол-иство вызовов  калбек функц. ${mousemoveCallbackCounter}   
      =  Координаты мышки по оси X: ${event.clientX}`
}, 100)) // 100 = это значит что за 100 милисекунд будет происходить одно событие





/*
 * Input и debounce
 */

  //  _.debounce  - Приостанавливает вызовы  события. (пример с инпутом) пока пользователь печатает события нет, когда он останавливается
   //  происходит событее. Время через которое начнет событие, если пользователь остановился, можно  контролировать.
// таким способом часто реализуют поиск

const inputRef = document.querySelector('.js-input');
const outputRef = document.querySelector('.js-output');
let inputCbInvocationCounter = 0;

inputRef.addEventListener('input', _.debounce(onInputChange, 300));

function onInputChange(event) {
  inputCbInvocationCounter += 1;

  outputRef.textContent = `
    Кол-во вызовов onInputChange: ${inputCbInvocationCounter},
    Значение: ${event.target.value}`;
}

  
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                           //   ПРИМЕР КАК СДЕЛАТЬ ПОИСК
const tech = [
  { label: 'HTML' },
  { label: 'CSS' },
  { label: 'JavaScript' },
  { label: 'Node.js' },
  { label: 'React' },
  { label: 'Vue' },
  { label: 'Next.js' },
  { label: 'Mobx' },
  { label: 'Redux' },
  { label: 'React Router' },
  { label: 'GraphQl' },
  { label: 'PostgreSQL' },
  { label: 'MongoDB' },
];

/*
 * 1. Рендерим разметку элементов списка
 * 2. Слушаем изменение фильтра
 * 3. Фильтруем данные и рендерим новые элементы
 */

const refs = {
  list: document.querySelector('.js-list'),
  input: document.querySelector('#filter'),
};

refs.input.addEventListener('input', _.debounce(onFilterChange, 300));

const listItemsMarkup = createListItemsMarkup(tech);
populateList(listItemsMarkup);

function createListItemsMarkup(items) {
  return items.map(item => `<li>${item.label}</li>`).join('');
}

function onFilterChange(evt) {
  console.log('INPUT');
  const filter = evt.target.value.toLowerCase();

  const filteredItems = tech.filter(t =>
    t.label.toLowerCase().includes(filter)
  );

  const listItemsMarkup = createListItemsMarkup(filteredItems);
  populateList(listItemsMarkup);
}

function populateList(markup) {
  refs.list.innerHTML = markup;
}



// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Intersection Observer (Наблюдатель за перекрестком)
/* 
 * То благодаря чему делаеться ленивая загрузка
 */

const boxRef = document.querySelector('.js-observ'); // Находим див за пересечением которого хотим следить


const options = {         // Добавляет маржин 100пикс. Тоесть событие пройзойдет на 100 пикс. раньше
   rootMargin: '100px'
}


const onEntry = (entries, observer) => {    //это метод позволяющий повешать на елемент слежку как бы.
   entries.forEach(entry => {                                    // Каждый раз когда элемент будет заежат во вюпорт в кщнсоле будет оповещение
      if (entry.isIntersecting) {      // если entry.isIntersecting равен  тру( если бокс появился на экране) то покажи консоль
        console.log(`Бокс номер ${entry.target.textContent} появился во ВЮПОРТЕ`); 

         // если  мы хотим первый раз при появлении елемента что то сделать а потом прервать слежку используем observer.disconnect()
         observer.disconnect()   


         // Если мы хотим снять наблюдение после первой загрузки (события) используем этот метод.
         // Также используе для ленивой загрузки изображен
         // observer.unobserve(boxRef)
     }
   })
} 

const io = new IntersectionObserver(onEntry, options)   // Ключевой момент


io.observe(boxRef)   // Благодаря такому методу вешаем на ДИВ слежку

// Также добавляем полифил с сайта https://polyfill.io/v3/url-builder/
// Полифил помагает старым браузерам поддерживать этот код