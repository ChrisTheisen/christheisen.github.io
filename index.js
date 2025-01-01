function setActive(input){
  const a = document.getElementsByClassName('content');
  Array.from(a).forEach(x => x.classList.toggle('hide', true));
  document.getElementById(input.id.replace('mnu','div')).classList.toggle('hide', false);

  const b = document.getElementsByClassName('mnuButton');
  Array.from(b).forEach(x => x.classList.toggle('activeButton', false));
  input.classList.toggle('activeButton', true);
}

function init(){
  const buttons = Array.from(document.getElementsByClassName('mnuButton'));
  buttons.forEach(x => {
    x.addEventListener('click', () => setActive(this));
  });
}

init();
