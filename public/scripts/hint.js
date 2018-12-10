var hint = document.getElementById('hint');
var content = document.getElementById('content');
var button = document.createElement('button');
button.innerHTML = "Show hint";
content.appendChild(button);
button.addEventListener("click", event => {
  hint.style.display = '';
  button.style.display = 'none';
});
