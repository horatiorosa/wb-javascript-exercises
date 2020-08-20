// console.log('ya ya wes we get it.. IT WORKS!');


const tabs = document.querySelector('.tabs');
const tabButtons = tabs.querySelectorAll('[role="tab"]');
const tabPanels = Array.from(tabs.querySelectorAll('[role="tabpanel"]'));

function handleTabClick(e) {
  // hide all  tabPanels
  tabPanels.forEach(panel => {
    panel.hidden = true
  });
  // mark all other tabs as unselected
  tabButtons.forEach(tab => {
    /* ARIA (or custom) attributes can't be accessed with dot notation
    ex: tab.ariaSeleted = false
    getAttribute and setAttribute must be used instead
    */
    tab.setAttribute('aria-selected', false);
  });
  // mark clicked tab as selected
  e.currentTarget.setAttribute('aria-selected', true);
  // find associated tabPanel and show it
  const { id } = e.currentTarget // same const id = e.currentTarget.id

  /* my original solution
  tabPanels.forEach(panel => {
    if (id === panel.getAttribute('aria-labelledby')) {
      panel.hidden = false;
    }
  })
  */

  /*
    METHOD 1
  const tabPanel = tabs.querySelector(`[aria-labelledby="${id}"]`); // note the backticks when accessing a html attribute
  tabPanel.hidden = false;
  */

  // METHOD 2 find on the array of tabPanels
  const tabPanel = tabPanels.find(panel => panel.getAttribute('aria-labelledby') === id
  );
  /*
   finds the panel where "panel.getAttribute('aria-labelledby') === id" is true and store it in a variable.
   */

  tabPanel.hidden = false // change hidden boolean on that panel

}

tabButtons.forEach(button => button.addEventListener('click', handleTabClick));
