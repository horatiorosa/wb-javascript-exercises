function Slider(slider) {
  if (!(slider instanceof Element))
  {
    throw new Error('No slider passed in!');
  }

  this.slider = slider;
  // create some variables for working with the slider.
  // let current;
  // let prev;
  // let next; these 3 vars are no longer needed, they are defined in Slider.prototype.startSlider
  // select the elements needed for the slider
  this.slides = this.slider.querySelector('.slides');
  // console.log(this.slides);
  this.prevButton = this.slider.querySelector('.goToPrev');
  this.nextButton = this.slider.querySelector('.goToNext');

  // event listeners to be bound when we open the modal to target the listeners
  this.startSlider = this.startSlider.bind(this);
  this.applyClasses = this.applyClasses.bind(this);
  this.move = this.move.bind(this);

  // when this slider is created, run the start slider function
  this.startSlider();
  this.applyClasses();
  // event listeners
  this.prevButton.addEventListener('click', () =>  this.move('back'));
  this.nextButton.addEventListener('click', this.move);
  // slider.addEventListener('click', function() {
  //   if (document.activeElement === slider.querySelector('.slides')) {
  //     return console.log('focused')
  //   }
  // })
} // closes Slider constructor

Slider.prototype.startSlider = function() {
  this.current = this.slider.querySelector('.current') ||  this.slides.firstElementChild;
  // console.log(current)
  this.prev = this.current.previousElementSibling || this.slides.lastElementChild;
  this.next = this.current.nextElementSibling || this.slides.firstElementChild;
  // console.log('prev', prev,'current', current, 'next', next);
  // console.log({prev, current, next});

}

Slider.prototype.applyClasses = function() {
  // console.log({prev, current, next});
  this.current.classList.add('current');
  this.prev.classList.add('prev');
  this.next.classList.add('next');
  // prev.classList.remove('current');
}

Slider.prototype.move = function(direction) {
  // strip all the classes off the current slides
  this.classesToRemove = ['prev', 'current', 'next'];
  // prev.classList.remove('prev', 'current', 'next');
  // current.classList.remove('prev', 'current', 'next');
  // next.classList.remove('prev', 'current', 'next');
  /*
  prev.classList.remove(...classesToRemove);
  current.classList.remove(...classesToRemove);
  next.classList.remove(...classesToRemove); */
  [this.prev, this.current, this.next].forEach(e =>
    e.classList.remove(...this.classesToRemove));

  if (direction === 'back') {
    // make a new array of the new values and destructure them over and into the prev, current and next variables.
    [this.prev, this.current, this.next] = [
    // get the prev slide, if there is none, get the last slide from the entire slider for wrapping
     this.prev.previousElementSibling || this.slides.lastElementChild,
      this.prev,
      this.current,
    ];
  } else {
    [this.prev, this.current, this.next] = [
      this.current,
      this.next,
      // get the next slide, if it's at the end, loop around and grab the first slide from the entire slider.
      this.next.nextElementSibling || this.slides.firstElementChild,
    ];
  }
  this.applyClasses();
}

const mySlider = new Slider(document.querySelector('.slider'));
const dogSlider = new Slider(document.querySelector('.dog-slider'));

console.log(mySlider, dogSlider);
