document.querySelector('div.menu-toggle').addEventListener('click', function() {
  document.querySelector('div.menu').classList.toggle('open');
  document.querySelectorAll('header div.menu-toggle span.menu-line').forEach(span => {
    span.classList.toggle('open');
  });
  document.querySelector('div.overlay').classList.toggle('open');
});

document.querySelectorAll('div.menu div.nav-content a').forEach(link => {
  link.addEventListener('click', function() {
    document.querySelector('div.menu').classList.remove('open');
    document.querySelectorAll('header div.menu-toggle span.menu-line').forEach(span => {
      span.classList.remove('open');
    });
    document.querySelector('div.overlay').classList.remove('open');
  });
});