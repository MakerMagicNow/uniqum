// === Прятать/показывать шапку (hide on scroll) ===
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  if (currentScroll > lastScrollTop) {
    header.style.top = '-80px';  // Скролл вниз — скрываем
  } else {
    header.style.top = '0';      // Скролл вверх — показываем
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// === Бургер-меню ===
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  nav.classList.toggle('active');
});

// === Анимации при скролле ===
const animatedElements = document.querySelectorAll(
  // Все элементы, которые должны анимироваться
  '.fade-on-scroll, .slide-in-left, .slide-in-right'
);

const observerOptions = {
  threshold: 0.2
};

// Создаём IntersectionObserver
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Если элемент вошёл в зону видимости — добавим .visible
      entry.target.classList.add('visible');
    } else {
      // Если элемент вышел из зоны видимости — убираем .visible 
      // (значит анимация может воспроизводиться заново)
      entry.target.classList.remove('visible');
    }
  });
}, observerOptions);

// Подключаем наблюдатель
animatedElements.forEach(el => {
  scrollObserver.observe(el);
});

// === Параллакс для "О нас" ===
const aboutSection = document.querySelector('.about-section');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const parallaxFactor = 0.5; // Чем меньше, тем медленнее фон
  aboutSection.style.backgroundPositionY = (scrollTop * parallaxFactor) + 'px';
});
document.addEventListener("DOMContentLoaded", function () {
  let index = 0;
  const reviews = document.querySelectorAll(".review-card");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const dotsContainer = document.querySelector(".slider-dots");

  function showReview(i) {
    reviews.forEach((review, idx) => {
      review.classList.remove("active");
      dotsContainer.children[idx].classList.remove("active");
      if (idx === i) {
        review.classList.add("active");
        dotsContainer.children[idx].classList.add("active");
      }
    });
  }

  function createDots() {
    reviews.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.classList.add("slider-dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        index = i;
        showReview(index);
      });
      dotsContainer.appendChild(dot);
    });
  }

  prevBtn.addEventListener("click", function () {
    index = (index - 1 + reviews.length) % reviews.length;
    showReview(index);
  });

  nextBtn.addEventListener("click", function () {
    index = (index + 1) % reviews.length;
    showReview(index);
  });

  createDots();
  showReview(index);
});