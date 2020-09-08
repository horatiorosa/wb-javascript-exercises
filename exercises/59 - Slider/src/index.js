function Slider(slider) {
  if (!(slider instanceof Element))
  {
    throw new Error('No slider passed in!');
  }
  // create some variables for working with the slider.
  let current;
  let prev;
  let next;
  // select the elements needed for the slider
  const slides = slider.querySelector('.slides'); // had this wrong before, document.querySelector rather than slider.querySelector
  // console.log(slides);
  const prevButton = slider.querySelector('.goToPrev');
  const nextButton = slider.querySelector('.goToNext');

  function startSlider() {
    current = slider.querySelector('.current') ||  slides.firstElementChild;
    // console.log(current)
    prev = current.previousElementSibling || slides.lastElementChild;
    next = current.nextElementSibling || slides.firstElementChild;
    // console.log('prev', prev,'current', current, 'next', next);
    // console.log({prev, current, next});

  }

  function applyClasses() {
    // console.log({prev, current, next});
    current.classList.add('current');
    prev.classList.add('prev');
    next.classList.add('next');
    // prev.classList.remove('current');
  }

  function move(direction) {
    // strip all the classes off the current slides
    const classesToRemove = ['prev', 'current', 'next'];
    // prev.classList.remove('prev', 'current', 'next');
    // current.classList.remove('prev', 'current', 'next');
    // next.classList.remove('prev', 'current', 'next');
    /*
    prev.classList.remove(...classesToRemove);
    current.classList.remove(...classesToRemove);
    next.classList.remove(...classesToRemove); */
    [prev, current, next].forEach(e =>
      e.classList.remove(...classesToRemove));

    if (direction === 'back') {
      // const oldPrev = prev;
      // const oldCurrent = current;
      // prev = prev.previousElementSibling;
      // current = oldPrev;
      // next = oldCurrent;
      // the above is a hot mess, let's use destructuring instead!
      // make a new array of the new values and destructure them over and into the prev, current and next variables.
      [prev, current, next] = [
      // get the prev slide, if there is none, get the last slide from the entire slider for wrapping
        prev.previousElementSibling || slides.lastElementChild,
        prev,
        current,
      ];
    } else {
      [prev, current, next] = [
        current,
        next,
        // get the next slide, if it's at the end, loop around and grab the first slide from the entire slider.
        next.nextElementSibling || slides.firstElementChild,
      ];


    }

    applyClasses();
  }

  // when this slider is created, run the start slider function
  startSlider();
  applyClasses();
  // event listeners
  prevButton.addEventListener('click', () =>  move('back'));
  nextButton.addEventListener('click', move);
  // slider.addEventListener('click', function() {
  //   if (document.activeElement === slider.querySelector('.slides')) {
  //     return console.log('focused')
  //   }
  // })
}

const mySlider = Slider(document.querySelector('.slider'));
const dogSlider = Slider(document.querySelector('.dog-slider'));
