const btn = document.querySelector('button');

btn.addEventListener('mouseover', function(e) {
  console.log('moused over');
  const height = Math.floor(Math.random() * window.innerHeight);
  const width = Math.floor(Math.random() * window.innerWidth);

  btn.style.top = `${height}px`;
  btn.style.left = `${width}px`;
});

btn.addEventListener('click', function (e) {
  btn.innerText = 'You got me!';
  document.body.style.backgroundColor = 'green';
})