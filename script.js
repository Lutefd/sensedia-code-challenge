import data from './data.js';
const navbar = document.querySelector('#nav');
const navBtn = document.querySelector('#nav-btn');
const closeBtn = document.querySelector('#close-btn');
const sidebar = document.querySelector('#sidebar');
const date = document.querySelector('#date');
const container = document.querySelector('.slide-container');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
// add fixed class to navbar
window.addEventListener('scroll', function () {
  if (window.pageYOffset > 80) {
    navbar.classList.add('navbar-fixed');
  } else {
    navbar.classList.remove('navbar-fixed');
  }
});
// show sidebar
navBtn.addEventListener('click', function () {
  sidebar.classList.add('show-sidebar');
});
closeBtn.addEventListener('click', function () {
  sidebar.classList.remove('show-sidebar');
});
// if carousel length is 1 hide buttons
if (data.length === 1) {
  nextBtn.style.display = 'none';
  prevBtn.style.display = 'none';
}
// if carousel length is 2, add copies of slides
let apis = [...data];
if (data.length === 2) {
  apis = [...data, ...data];
}
container.innerHTML = apis
  .map((api, slideIndex) => {
    const { name, text } = api;
    let position = 'next';
    if (slideIndex === 0) {
      position = 'active';
    }
    if (slideIndex === apis.length - 1) {
      position = 'last';
    }
    if (data.length <= 1) {
      position = 'active';
    }
    return `<article class="slide ${position}">
  <h4 class='slide-title'>${name}</h4>
  <p class="text">
   ${text}
  </p>
 </article>`;
  })
  .join('');

const startSlider = (type) => {
  // get all three slides active,last next
  const active = document.querySelector('.active');
  const last = document.querySelector('.last');
  let next = active.nextElementSibling;
  if (!next) {
    next = container.firstElementChild;
  }
  active.classList.remove('active');
  last.classList.remove('last');
  next.classList.remove('next');

  if (type === 'prev') {
    active.classList.add('next');
    last.classList.add('active');
    next = last.previousElementSibling;
    if (!next) {
      next = container.lastElementChild;
    }
    next.classList.remove('next');
    next.classList.add('last');
    return;
  }
  active.classList.add('last');
  last.classList.add('next');
  next.classList.add('active');
};
nextBtn.addEventListener('click', () => {
  startSlider();
});
prevBtn.addEventListener('click', () => {
  startSlider('prev');
});

// set year
date.innerHTML = new Date().getFullYear();