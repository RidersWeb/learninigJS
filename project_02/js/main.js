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
    modal = document.querySelector('.modal');


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


  modal.addEventListener('click', event => {
    if (event.target === modal || event.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.code === 'Escape' && modal.style.display == 'block') {
      closeModal();
    }
  });

  // Timer modal


  const timerId = setTimeout(openModal, 50000);

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

  // Forms


  const forms = document.querySelectorAll('form');

  const message = {
    load: 'img/spinner.svg',
    success: 'Спасибо скоро с Вами свяжемся',
    failure: 'Что то пошло не так'
  };

  forms.forEach(item => {
    postData(item);
  });

  function postData(form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.load;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
    
      form.insertAdjacentElement('afterend', statusMessage);


      const request = new XMLHttpRequest();
      
      request.open('POST', '/project_02/server.php');

      const formData = new FormData(form);
      
      const object = {};

      formData.forEach((value, key) => {
        object[key] = value;
      });

      const json = JSON.stringify(object);

      request.send(json);

      request.addEventListener('load', () => {
       if(request.status === 200) {
         console.log(request.response);

         showThanksModal(message.success);
         form.reset();
        statusMessage.remove();
         
       } else {
        showThanksModal(message.failure);
       }
      });
    
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
      <div data-close class="modal__close">&times;</div>
      <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      thanksModal.classList.add('show');
      thanksModal.classList.remove('hide');
      closeModal();
    }, 4000);
  }

// Слайдер

const slides = document.querySelectorAll('.offer__slide'),
      prev = document.querySelector('.offer__slider-prev'),
      next = document.querySelector('.offer__slider-next'),
      total = document.querySelector('#total'),
      current = document.querySelector('#current'),
      slidesWrapper = document.querySelector('.offer__slider-wrapper'),
      slidesField = document.querySelector('.offer__slider-inner'),
      width = window.getComputedStyle(slidesWrapper).width;
      let slideIndex = 1;
      let offset = 0;

      if (slides.length < 10) {
          total.textContent = `0${slides.length}`;
          current.textContent = `0${slideIndex}`;
        } else {
          total.textContent = slides.length;
          current.textContent = slideIndex;
        }


      slidesField.style.width = 100 * slides.length + '%';
      slidesField.style.display = 'flex';
      slidesField.style.transition = '0.5s all';
      slidesWrapper.style.overflow = 'hidden';

      slides.forEach(slide => {
        slide.style.width = width;
      });

      next.addEventListener('click', () => {
        if (offset === +width.replace(/\D/g, '') * (slides.length - 1)) {
          offset = 0;
        } else {
          offset += +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
          slideIndex = 1;
        } else {
          slideIndex++;
        }

        if (slides.length < 10) {
          current.textContent = `0${slideIndex}`;
        } else {
          current.textContent = slideIndex;
        }
      });


      prev.addEventListener('click', () => {
        if (offset == 0) {
          offset = +width.replace(/\D/g, '') * (slides.length - 1);
        } else {
          offset -= +width.replace(/\D/g, '');
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
          slideIndex = slides.length;
        } else {
          slideIndex--;
        }

        if (slides.length < 10) {
          current.textContent = `0${slideIndex}`;
        } else {
          current.textContent = slideIndex;
        }

        
      });



      // showSlaides(slideIndex);

      // if (slides.length < 10) {
      //   total.textContent = `0${slides.length}`;
      // } else {
      //   total.textContent = slides.length;
      // }

      // function showSlaides(n) {
      //   if(n > slides.length) {
      //     slideIndex = 1;
      //   }

      //   if(n < 1) {
      //     slideIndex = slides.length;
      //   }

      //   slides.forEach(item => item.style.display = 'none');

      //   slides[slideIndex - 1].style.display = 'block';

      //   if (slideIndex < 10) {
      //     current.textContent = `0${slideIndex}`;
      //   } else {
      //     current.textContent = slideIndex;
      //   }
      // }

      // function plusSlides(n) {
      //   showSlaides(slideIndex += n);
      // }

      // prev.addEventListener('click', () => {
      //   plusSlides(-1);
      // });
      // next.addEventListener('click', () => {
      //   plusSlides(1);
      // });




  // Calc

  const result = document.querySelector('.calculating__result span');

  let sex, height, weight, age, ratio;

  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', 'female');
  }

  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  }

  function calcTotal() {
  if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '____';
      return;
  }
  if (sex === 'female') {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
  } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
  }
}

calcTotal();

function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
        elem.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-ratio')) {
                ratio = +e.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
            } else {
                sex = e.target.getAttribute('id');
                localStorage.setItem('sex', e.target.getAttribute('id'));
            }

            elements.forEach(elem => {
                elem.classList.remove(activeClass);
            });

            e.target.classList.add(activeClass);

            calcTotal();
        });
    });
}


getStaticInformation('#gender div', 'calculating__choose-item_active');
getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

function getDynamicInformation(selector) {
  const input = document.querySelector(selector);

  input.addEventListener('input', () => {
      if (input.value.match(/\D/g)) {
          input.style.border = "1px solid red";
      } else {
          input.style.border = 'none';
      }
      switch(input.getAttribute('id')) {
          case "height":
              height = +input.value;
              break;
          case "weight":
              weight = +input.value;
              break;
          case "age":
              age = +input.value;
              break;
      }

      calcTotal();
  });
}

getDynamicInformation('#height');
getDynamicInformation('#weight');
getDynamicInformation('#age');
});