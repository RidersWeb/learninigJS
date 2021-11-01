'use strict';
const btn = document.querySelector('button').addEventListener('mouseenter', event => {
    console.log(event.target);
    event.target.remove();
});
document.querySelector('.promo__adv-title').parentNode.remove();
console.log(document.querySelector('.promo__adv-title').parentNode);

