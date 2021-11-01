/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

//const adv = document.querySelector('.promo__adv').remove();

document.addEventListener('DOMContentLoaded', () => {

    const gener = document.querySelector('.promo__bg .promo__genre'),
        adv = document.querySelectorAll('.promo__adv img'),
        bg = document.querySelector('.promo__bg'),
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]'),
        btn = document.querySelector('button'),
        deleteFilm = document.querySelector('.delete');
    
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    const arrFilms = movieDB.movies;

    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    }

    deleteAdv(adv);

    const makeChanges = () => {
        gener.textContent = 'ДРАМА';

        bg.style.backgroundImage = "url('/img/bg.jpg')";
    }

    makeChanges();
    
   addForm.addEventListener('submit', event => {
       event.preventDefault();
       let newFilm = addInput.value;
        if(newFilm) {

            if(newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            if(checkbox.checked) {
                console.log('Любимый фильм');
            }

            arrFilms.push(newFilm);
            sortArr(arrFilms);
            console.log(arrFilms);
            createMoveList(arrFilms, movieList);
        }
       event.target.reset();
   });

// Функция удаления фильма

// deleteFilm.addEventListener('click', event => {
//     console.log(event);
// });

// функция сортировки и вставка в страницу HTML

const sortArr = (arr) => {
    arr.sort();
};


function createMoveList(films, parent) {
    parent.innerHTML = '';
    sortArr(films);
    films.forEach((film, i) => {
        parent.innerHTML += `
        <li class="promo__interactive-item">${i+1} - ${film}
                            <div class="delete"></div>
                        </li>
        `;
    });
};

createMoveList(arrFilms, movieList);

});