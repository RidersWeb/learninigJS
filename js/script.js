/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    

    // Меняем жанр фильма
    document.querySelector('.promo__genre').innerText = 'Драма';
    

    // Все переменные
    const adv = document.querySelectorAll('.promo__adv img'),
          bg = document.querySelector('.promo__bg'),
          bgImg = "url('/img/bg.jpg')", //прописываем адрес нового фона
          movieList = document.querySelector('.promo__interactive-list');

const movieDB = {
    movies: [
              "Логан",
              "Лига справедливости",
              "Ла-ла лэнд",
              "Одержимость",
              "Скотт Пилигрим против..."
            ]
        };
        
    // Функция по замене фона    
    const bgChange = img => {
        console.log(img);
        bg.style.backgroundImage = img;
    };

    bgChange(bgImg);


    // Функция по удалению рекламы
    adv.forEach(elem => {
        elem.remove();
    });

    const createMoveList = (listFilm, parent) => {
        movieList.innerText = '';
        listFilm.forEach((film, i) => {
            movieList.innerHTML += `
            <li class="promo__interactive-item">${++i} - ${film}
            <div class="delete"></div>
            </li>`;
        });





    }

    createMoveList(movieDB.movies, parent);
        
});