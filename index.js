function setActive(input){
  const a = document.getElementsByClassName('content');
  Array.from(a).forEach(x => x.classList.toggle('hide', true));
  document.getElementById(input).classList.toggle('hide', false);
}

function init(){
  const buttons = Array.from(document.getElementsByClassName('mnuButton'));
  buttons.forEach(x => {
    const id = x.id.replace('mnu','div'); 
    console.log(id);
    x.addEventListener('click', () => setActive(id));
  });
}

init();
