// Topics: Design Pattern
// Challenge: add close button

// create a Gallery function
function Gallery(gallery) {
  if (!gallery)
  {
    throw new Error('No Gallery Found!');
  }
  this.gallery = gallery;
  // select the elements we need
  // gallery.querySelectorAll('img') returns NodeList(9) [img, img, img, img, img, img, img, img, img]
  this.images = Array.from(gallery.querySelectorAll('img')); //(array) (9) [img, img, img, img, img, img, img, img, img]
  // console.log(images);
  this.modal = document.querySelector('.modal');
  this.modalInner = document.querySelector('.modalInner');
  this.prevButton = this.modal.querySelector('.prev');
  this.nextButton = this.modal.querySelector('.next');
  this.close = this.modalInner.querySelector('.close'); // added close icon
  // let currentImage; no longer need currentImage, can set this to the element in showImage

  // bind our methods to the instance when we need them
  this.handleKeyUp = this.handleKeyUp.bind(this);
  this.showNextImage = this.showNextImage.bind(this);
  this.showPrevImage = this.showPrevImage.bind(this);
  this.handleClick = this.handleClick.bind(this);

  /* refactor below passing in showImage()
    function handleImageClick(e) {
      // console.log(e.target);
      showImage(e.currentTarget);
    }
    images.forEach(image => image.addEventListener('click', handleImageClick));
  */

  // these are our event listeners
  this.images.forEach(image =>
    image.addEventListener('click', e =>
      this.showImage(e.currentTarget)
    )
  );
  // loop over each image
  this.images.forEach(image =>
    // attach an event listener for each iamge
    image.addEventListener('keyup', e => {
      // when that is keyup'd, check if it was enter
      if (e.key === 'Enter') {
        // if it was enter, show that image
        this.showImage(e.currentTarget);
      }
    })
  );

  this.modal.addEventListener('click', this.handleClick);
}

Gallery.prototype.openModal = function() {
  // console.log('opening modal');
  if (this.modal.matches('.open')) {
    // console.info('modal already open');
    return; // stop the function from running
  }

  this.modal.classList.add('open');
  this.close.style.cssText = "position:absolute; top:0; right:2em; font-size: 1.5em"
  // event listeners to be bound when we open the modal to target the listeners
  window.addEventListener('keyup', this.handleKeyUp);
  this.nextButton.addEventListener('click', this.showNextImage);
  this.prevButton.addEventListener('click', this.showPrevImage);
  this.close.addEventListener('click', this.handleClick);
}

Gallery.prototype.closeModal = function() {
  this.modal.classList.remove('open');
  // add event listeners for clicks and keyboard
  window.removeEventListener('keyup', this.handleKeyUp);
  this.nextButton.removeEventListener('click', this.showNextImage);
  this.prevButton.removeEventListener('click', this.showPrevImage);
  this.close.removeEventListener('click', this.handleClick);
}

Gallery.prototype.handleClick = function(e) {
  /* my alternate way
    const innerModal = document.querySelector('.modalInner');
    if (e.closet !== innerModal) {
      closeModal();
    }
  */
  /* e.currentTarget tells us on which element the event was attached or the element whose eventListener triggered the event.
    e.target tells where the event started.*/
  if (e.target === e.currentTarget) {
    return this.closeModal();
  }

  if (e.currentTarget === close) {
    return this.closeModal();
  }
}

Gallery.prototype.handleKeyUp = function(e) {
  // console.log(e.key)
  /* if (e.key === 'Escape') {
    closeModal();
  } */
   // one liner refactor, using returns stops function from checking the other if statements
  if (e.key === 'Escape') return this.closeModal();
  if (e.key === 'ArrowLeft')  return this.showPrevImage();
  if (e.key === 'ArrowRight') return this.showNextImage();
}

Gallery.prototype.showNextImage = function() {
  // console.log("this: ", this);
  this.showImage(
    this.currentImage.nextElementSibling || this.gallery.firstElementChild);
}

Gallery.prototype.showPrevImage = function() {
  this.showImage(
    this.currentImage.previousElementSibling || this.gallery.lastElementChild);
}

Gallery.prototype.showImage = function(img) {
  if (!img) {
    console.info('no image to show');
    return;
  }

  // console.log(img);
  this.modal.querySelector('figure img').src = img.src;
  this.modal.querySelector('figure h2').textContent = img.title;
  this.modal.querySelector('figure p').textContent = img.dataset.description;
  this.currentImage = img;
  // console.log('this.currentImage', this.currentImage);
  // console.log(modal);
  this.openModal();
}

// use it on the page
const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));

console.log(gallery1, gallery2);
/*
  Gallery {gallery: div.gallery.gallery2, images: Array(9), modal: div.modal, modalInner: div.modalInner, prevButton: button.prev, …}
    close: span.close
    gallery: div.gallery.gallery2
    images: (9) [img, img, img, img, img, img, img, img, img]
    modal: div.modal
    modalInner: div.modalInner
    nextButton: button.next
    prevButton: button.prev
      __proto__: Object
*/

