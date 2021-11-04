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
  };
  window.addEventListener('scroll', showModalScroll);



});

