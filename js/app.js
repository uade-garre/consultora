// Script general: controla menu responsive, header al hacer scroll y animaciones de entrada.
(function(){
  // Referencias a elementos principales de navegacion y cabecera.
  const btn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const header = document.querySelector('.site-header');
  let lastScroll = window.scrollY;

  if (btn && nav) {
    btn.addEventListener('click', function(){
      const isOpen = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    document.addEventListener('click', function(event){
      if (!event.target.closest('.site-header')) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Ajusta el fondo de la cabecera segun el desplazamiento vertical.
  if (header) {
    window.addEventListener('scroll', function(){
      const current = window.scrollY;
      header.classList.toggle('header-compact', current > 24);
      lastScroll = current;
    }, { passive: true });
  }

  // Animaciones de aparicion progresiva para tarjetas y secciones.
  const revealItems = document.querySelectorAll('.reveal-on-scroll, .service-card, .case-card, .content-card, .stat-card, .contact-card, .panel, .highlight-box');
  revealItems.forEach(function(item, index){
    if (!item.dataset.reveal) {
      item.dataset.reveal = ['up', 'left', 'right'][index % 3];
    }
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });
    revealItems.forEach(function(item){ observer.observe(item); });
  } else {
    revealItems.forEach(function(item){ item.classList.add('is-visible'); });
  }
})();
