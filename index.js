function setActive(input){
  const a = document.getElementsByClassName('content');
  Array.from(a).forEach(x => x.classList.toggle('hide', true));
  document.getElementById(input).classList.toggle('hide', false);
}
