// Topics: Design Pattern
// Challenge: add close button

// create a Gallery function
function Gallery(gallery) {
  if (!gallery)
  {
    throw new Error('No Gallery Found!');
  }
  // select the elements we need
  const images = Array.from(gallery.querySelectorAll('img'));
  // console.log(images);
  const modal = document.querySelector('.modal');
  const modalInner = document.querySelector('.modalInner');
  const prevButton = modal.querySelector('.prev');
  const nextButton = modal.querySelector('.next');
  const close = modalInner.querySelector('.close');
  let currentImage;

  function openModal() {
    console.log('opening modal');
    if (modal.matches('.open')) {
      console.info('modal already open');
      return; // stop the function from running
    }

    modal.classList.add('open');
    close.style.cssText = "position:absolute; top:0; right:2em; font-size: 1.5em"

    // event listerers to be bound when we open the modal to target the listeners
    window.addEventListener('keyup', handleKeyUp);
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);
    close.addEventListener('click', handleClick);

  }

  function closeModal() {
    modal.classList.remove('open');
    // add event listeners for clicks and keyboard
    window.removeEventListener('keyup', handleKeyUp);
    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPrevImage);
    close.removeEventListener('click', handleClick);
  }

  function handleClick(e) {
    /* alternate way
      const innerModal = document.querySelector('.modalInner');
      if (e.closet !== innerModal) {
        closeModal();
      }
    */
    /* e.currentTarget tells us on which element the event was attached or the element whose eventListener triggered the event.
      e.target tells where the event started.*/
    if (e.target === e.currentTarget) {
      return closeModal();
    }

    if (e.currentTarget === close) {
      return closeModal();
    }
  }

  function handleKeyUp(e) {
    // console.log(e.key)
    /* if (e.key === 'Escape') {
      closeModal();
    } */
     // one liner refactor, using returns stops function from checking the other if statements
    if (e.key === 'Escape') return closeModal();
    if (e.key === 'ArrowLeft')  return showPrevImage();
    if (e.key === 'ArrowRight') return showNextImage();
    /* (below, i used switch to handle all the key ups), works if a bit wordy LOL
    switch(e.key) {
      case 'Escape':
      closeModal();
      break;
      case 'ArrowLeft':
      showPrevImage();
      break;
      case "ArrowRight":
      showNextImage();
      break;
      default:
      '';
      break;
    }*/
  }

  function showNextImage() {
    showImage(currentImage.nextElementSibling ||
      gallery.firstElementChild);
  }

  function showPrevImage() {
    showImage(currentImage.previousElementSibling ||
      gallery.lastElementChild);
  }

  function showImage(img) {
    if (!img) {
      console.info('no image to show');
      return;
    }

    // console.log(img);
    modal.querySelector('figure img').src = img.src;
    modal.querySelector('figure h2').textContent = img.title;
    modal.querySelector('figure p').textContent = img.dataset.description;
    currentImage = img;
    // console.log('currentImage', currentImage);
    // console.log(modal);
    openModal();
  }
  /* refactor below passing in showImage()
    function handleImageClick(e) {
      // console.log(e.target);
      showImage(e.currentTarget);
    }
    images.forEach(image => image.addEventListener('click', handleImageClick));
  */

  // these are our event listeners
  images.forEach(image =>
    image.addEventListener('click', e =>
      showImage(e.currentTarget)
    )
  );
  // loop over each image
  images.forEach(image =>
    // attach an event listener for each iamge
    image.addEventListener('keyup', e => {
      // when that is keyup'd, check if it was enter
      if (e.key === 'Enter') {
        // if it was enter, show that image
        showImage(e.currentTarget);
      }
    })
  );

  modal.addEventListener('click', handleClick);
}

// use it on the page
const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
