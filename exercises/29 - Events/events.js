const butts = document.querySelector('.butts');
const coolButton = document.querySelector('.cool');

function handleClick() {
  console.log('🐛 IT GOT CLICKED!!!');
}

const hooray = () => console.log('HOORAY!');

butts.addEventListener('click', function() {
  console.log('Im an anon!');
});
coolButton.addEventListener('click', hooray);

butts.removeEventListener('click', handleClick);

// Listen on multiple items
const buyButtons = document.querySelectorAll('button.buy');

function handleBuyButtonClick(event) {
  console.log('You clicked a buy button!');
  const button = event.target;
  // console.log(button.textContent);
  // console.log(parseFloat(event.target.dataset.price));
  console.log("handleBuyButtonClick, event.target ", event.target);
  console.log("handleBuyButtonClick, event.currentTarget ", event.currentTarget);
  console.log("handleBuyButtonClick, event.target === event.currentTarget ", event.target === event.currentTarget);
  // Stop this event from bubbling up
  // event.stopPropagation();
}

buyButtons.forEach(function(buyButton) {
  buyButton.addEventListener('click', handleBuyButtonClick);
});

window.addEventListener(
  'click',
  function(event) {
    console.log('YOU CLICKED THE WINDOW');
    console.log("window.addEventListener event.target", event.target);
    console.log("window.addEventListener event.type", event.type);
    // event.stopPropagation();
    console.log("window.addEventListener event.bubbles", event.bubbles);
  },
  { capture: true }
);

const photoEl = document.querySelector('.photo');

photoEl.addEventListener('mouseenter', e => {
  console.log("photoEl.addEventListener e.currentTarget", e.currentTarget);
  console.log("photoEl.addEventListener - this", this);
});
