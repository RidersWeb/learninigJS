"use strict";

document.addEventListener('DOMContentLoaded', () => {


  // tabs
  const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.style.display = 'none';
    });

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  };

  function showTabContent(i = 0) {
    tabsContent[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', event => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });


  // Timer

  const deadline = '2021-11-10';

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60) % 24)),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function numZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = numZero(t.days);
      hours.innerHTML = numZero(t.hours);
      minutes.innerHTML = numZero(t.minutes);
      seconds.innerHTML = numZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', deadline);



  // Modal



  const btns = document.querySelectorAll('[data-open]'),
    modal = document.querySelector('.modal'),
    btnClose = document.querySelector('[data-close]');

    function openModal() {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
      clearTimeout(timerId);
    }

  btns.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  btnClose.addEventListener('click', closeModal);

  modal.addEventListener('click', event => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.code === 'Escape' && modal.style.display == 'block') {
      closeModal();
    }
  });

  // Timer modal


  const timerId = setTimeout(openModal, 3000);

  function showModalScroll() {
    if(window.pageYOffset + document.documentElement.clientHeight >= document.
      documentElement.scrollHeight) {
        openModal();
        window.removeEventListener('scroll', showModalScroll);
  }
  }

  window.addEventListener('scroll', showModalScroll);

class MenuCard {
  constructor(src, alt, title, descr, price, parentElem, ...classes) {
    this.src = src;
    this.alt = alt;
    this.classes = classes;
    this.title = title;
    this.descr = descr;
    this.parentElem = document.querySelector(parentElem);
    this.cursUSD = 71.49;
    this.price = price;
    this.changeToRub = this.changeToRub();
  }
  changeToRub() {
    this.price = Math.round(this.price * this.cursUSD);
  }
  
  render() {
    const elem = document.createElement('div');

    if(this.classes.length === 0) {
      this.elem = 'menu__item';
      elem.classList.add(this.elem);
    } else {
      this.classes.forEach(className => elem.classList.add(className));
    }

    elem.innerHTML = `
    <img src=${this.src} alt=${this.alt}>
    <h3 class="menu__item-subtitle">${this.title}</h3>
    <div class="menu__item-descr">${this.descr}</div>
    <div class="menu__item-divider"></div>
    <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
    </div>
    `;
    this.parentElem.append(elem);
  }
}


new MenuCard(
    '"img/tabs/vegy.jpg"',
    '"vegy"',
    'Меню "Фитнес"',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    5,
    '.menu .container',
    
  ).render();

  new MenuCard(
    '"img/tabs/elite.jpg"',
    '"elite"',
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    7,
    '.menu .container',
    'menu__item',
    'testClass'
  ).render();

  new MenuCard(
    '"img/tabs/post.jpg"',
    '"post"',
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    6,
    '.menu .container',
    'menu__item',
    'testClass'
  ).render();

});