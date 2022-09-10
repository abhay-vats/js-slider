function Slider(slider) {
  if (!(slider instanceof Element))
    throw new TypeError('Passed slider is not element');

  const slides = slider.querySelector('.slides');
  const previousButton = slider.querySelector('.goToPrev');
  const nextButton = slider.querySelector('.goToNext');

  let current;
  let previous;
  let next;

  // Helpers
  function getPreviousElement(el) {
    return el.previousElementSibling || slides.lastElementChild;
  }

  function getCurrentElement(el) {
    return slides.querySelector('.current') || slides.firstElementChild;
  }

  function getNextElement(el) {
    return el.nextElementSibling || slides.firstElementChild;
  }

  // Handlers
  function startSlider() {
    current = getCurrentElement();
    previous = getPreviousElement(current);
    next = getNextElement(current);
  }

  function applyClasses() {
    current.classList.add('current');
    previous.classList.add('prev');
    next.classList.add('next');
  }

  function move(direction) {
    const classesToRemove = ['prev', 'current', 'next'];
    [previous, current, next].forEach((el) =>
      el.classList.remove(...classesToRemove)
    );

    switch (direction) {
      case 'forward':
        [previous, current, next] = [current, next, getNextElement(next)];
        break;

      case 'backward':
        [previous, current, next] = [
          getPreviousElement(previous),
          previous,
          current
        ];
        break;
    }

    applyClasses();
  }

  previousButton.addEventListener('click', () => move('backward'));
  nextButton.addEventListener('click', () => move('forward'));

  startSlider();
  applyClasses();
}

const slider1 = Slider(document.querySelector('.slider'));
const slider2 = Slider(document.querySelector('.dog-slider'));
