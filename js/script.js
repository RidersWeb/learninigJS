/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */


/* Задания на урок второй день:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

// Возьмите свой код из предыдущей практики

document.addEventListener('DOMContentLoaded', () => {

    

    // Меняем жанр фильма
    document.querySelector('.promo__genre').innerText = 'Драма';
    

    // Все переменные
    const adv = document.querySelectorAll('.promo__adv img'),
          bg = document.querySelector('.promo__bg'),
          bgImg = "url('./img/bg.jpg')", //прописываем адрес нового фона
          movieList = document.querySelector('.promo__interactive-list'),
          addForm = document.querySelector('form.add'),
          addInput = document.querySelector('.adding__input'),
          checkbox = document.querySelector('[type="checkbox"]');
          

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
        bg.style.backgroundImage = img;
    };

    bgChange(bgImg);


    // Функция по удалению рекламы
    adv.forEach(elem => {
        elem.remove();
    });

    const createMoveList = (listFilm, parent) => {
        parent.innerText = '';
        listFilm.sort();
        listFilm.forEach((film, i) => {
            parent.innerHTML += `
            <li class="promo__interactive-item">${++i} - ${film}
            <div class="delete"></div>
            </li>`;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', event => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                createMoveList(movieDB.movies, movieList);
            });
        });
    };

    createMoveList(movieDB.movies, movieList);

    //функция добавляет новый фильм
    addForm.addEventListener('submit', event => {
        event.preventDefault();
        let newFilm = addInput.value;
        const favorite = checkbox.checked;

        if(favorite) {
            console.log('Любимый фильм');
        }

        if(newFilm) {
            if(newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }
            movieDB.movies.push(newFilm);
            createMoveList(movieDB.movies, movieList);
        }
    event.target.reset();
    });
    
});