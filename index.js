function setActive(input){
  const a = document.getElementsByClassName('content');
  Array.from(a).forEach(x => x.classList.toggle('hide', true));
  document.getElementById(input.id.replace('mnu','div')).classList.toggle('hide', false);

  const b = document.getElementsByClassName('mnuButton');
  Array.from(b).forEach(x => x.classList.toggle('activeButton', false));
  input.classList.toggle('activeButton', true);
}

function navigateMenu(direction) {
  const buttons = Array.from(document.getElementsByClassName('mnuButton'));
  const currentIndex = buttons.findIndex(btn => btn.classList.contains('activeButton'));
  
  let newIndex;
  if (direction === 'left') {
    newIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
  } else {
    newIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
  }
  
  setActive(buttons[newIndex]);
}

function init(){
  const buttons = Array.from(document.getElementsByClassName('mnuButton'));
  buttons.forEach(x => {
    x.addEventListener('click', () => setActive(x));
  });

  // Add keyboard navigation
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      navigateMenu('left');
    } else if (event.key === 'ArrowRight') {
      navigateMenu('right');
    }
  });

  // Set initial active button
  setActive(buttons[0]);
}

init();
