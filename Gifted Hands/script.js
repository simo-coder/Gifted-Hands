const serviceCarousels = document.querySelectorAll('.service-carousel');

serviceCarousels.forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const delay = Number(carousel.dataset.delay) || 3500;
  let currentIndex = 0;
  let timerId = null;

  const showSlide = (nextIndex) => {
    const previousIndex = currentIndex;

    slides.forEach((slide, index) => {
      slide.classList.remove('active', 'exit-left');

      if (index === nextIndex) {
        slide.classList.add('active');
      }

      if (index === previousIndex && previousIndex !== nextIndex) {
        slide.classList.add('exit-left');
      }
    });

    currentIndex = nextIndex;
  };

  const cycleSlides = () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
    timerId = setTimeout(cycleSlides, delay);
  };

  const startCarousel = () => {
    clearTimeout(timerId);
    timerId = setTimeout(cycleSlides, delay);
  };

  const stopCarousel = () => {
    clearTimeout(timerId);
  };

  showSlide(currentIndex);
  carousel.addEventListener('mouseenter', startCarousel);
  carousel.addEventListener('mouseleave', stopCarousel);
});
