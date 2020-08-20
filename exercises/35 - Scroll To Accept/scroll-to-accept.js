// console.log('IT WORKS!');
const terms = document.querySelector('.terms-and-conditions');
const watch = document.querySelector('.watch');
const button = document.querySelector('.accept')


function obCallback(payload) {
  console.log(payload);
  // console.log(payload[0].isIntersecting);
  // console.log(payload[0].intersectionRatio);
  // is target on the page


  if (payload[0].intersectionRatio === 1) {
    button.disabled = false;
    // stop observing button
    ob.unobserve(terms.lastElementChild);
  } /* else {
    button.disabled = true;
  }*/
}


let options = {
  root: terms,
  threshold: 1.0 // % of targets visibility to execute callback
}



const ob = new IntersectionObserver(obCallback, options);

// ob.observe(watch);

ob.observe(terms.lastElementChild); // 👀 for last <p> in div


/*
we will not use an event listener but rather the IntersectionObserver to monitor the scrolling down the page to the accept button

function attachScrollListener(e) {
  console.log('scroll top',e.currentTarget.scrollTop);
}

function scrollToAccept() {
  if (!terms) {
    return; // quit  bc terms is not found on current page
  } else {


  terms.addEventListener('scroll', attachScrollListener);
  }
}

scrollToAccept();
*/
