// *** header submenu toggle
const $submenu = document.querySelector('.header__list-submenu');
const $submenuBtn = document.querySelector('#headerButton');
const $arrow = document.querySelector('.header__list-arrow');

$submenuBtn.addEventListener('click', function(){
  $submenu.classList.toggle('active');
  $arrow.classList.toggle('rotate');
});

console.dir($submenu);