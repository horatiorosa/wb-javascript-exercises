const wes = document.querySelector('.wes');

function attachListener(e) {
  console.log('clicked wes link');
  console.log(e);
  const shouldChangePage = confirm('This website might be malicious! Do you want to proceed?');
  if (!shouldChangePage) {
    e.preventDefault();
  }
}

function handleFormSubmit(e) {
  console.log(e.currentTarget.name.value);
  console.log(e.currentTarget.email.value);
  console.log(e.currentTarget.agree.checked);
  agreeToTerms = e.currentTarget.agree.checked
  if (!agreeToTerms) {
    e.preventDefault();
    alert("You must agree to the terms and conditions");
  }
}

wes.addEventListener('click', attachListener);

const signupForm = document.querySelector('[name="signup"]');

signupForm.addEventListener('submit', handleFormSubmit);


// other events
// 'keyup'
// 'keydown'
// 'focus'
// 'blur'

function logEvent(e) {
  console.log(e.type);
  console.log(e.currentTarget.value);
}



signupForm.name.addEventListener('keyup', logEvent);
signupForm.name.addEventListener('keydown', logEvent);
signupForm.name.addEventListener('focus', logEvent);
signupForm.name.addEventListener('blur', logEvent);

const photo = document.querySelector('.photo');

function handlePhotoClick(event) {
  if (event.type === 'click' || event.key === 'Enter') {
    console.log('You clicked the photo');
  }
}

photo.addEventListener('click', handlePhotoClick);
photo.addEventListener('keyup', handlePhotoClick);
