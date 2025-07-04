document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".testimonials-wrapper");
  const testimonials = document.querySelectorAll(".testimonial-item");
  const btnPrev = document.querySelector(".nav-arrow:first-child");
  const btnNext = document.querySelector(".nav-arrow:last-child");
  const total = testimonials.length;
  let currentIndex = 0;
  let autoSlideInterval;

  function updateSlider() {
    // Смещаем обёртку по оси X влево на width * индекс
    wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;

    btnPrev.disabled = currentIndex === 0;
    btnNext.disabled = currentIndex === total - 1;

    btnPrev.classList.toggle("active", currentIndex > 0);
    btnNext.classList.toggle("active", currentIndex < total - 1);
  }

  function nextSlide() {
    if (currentIndex < total - 1) {
      currentIndex++;
    } else {
      currentIndex = 0; // Зациклить прокрутку
    }
    updateSlider();
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = total - 1; // Зациклить прокрутку назад
    }
    updateSlider();
  }

  btnPrev.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
  });

  btnNext.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
  });

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 15000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // Инициализация
  updateSlider();
  startAutoSlide();
});

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target); // отключаем наблюдение после анимации
        }
      });
    },
    {
      threshold: 0.1, // срабатывает, когда 10% элемента видно
    },
  );

  elements.forEach((el) => observer.observe(el));
});

(() => {
  let scrollTarget = window.scrollY;
  let ticking = false;

  function smoothScroll() {
    const currentScroll = window.scrollY;
    const distance = scrollTarget - currentScroll;
    if (Math.abs(distance) > 0.5) {
      window.scrollBy(0, distance * 0.1); // скорость плавности 0.1 — можно регулировать
      requestAnimationFrame(smoothScroll);
    } else {
      ticking = false;
    }
  }

  window.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      scrollTarget += e.deltaY;
      scrollTarget = Math.max(
        0,
        Math.min(scrollTarget, document.body.scrollHeight - window.innerHeight),
      );
      if (!ticking) {
        ticking = true;
        smoothScroll();
      }
    },
    { passive: false },
  );
})();
