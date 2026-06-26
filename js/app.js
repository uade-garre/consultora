(function(){
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

  if (header) {
    window.addEventListener('scroll', function(){
      const current = window.scrollY;
      if (current > 120 && current > lastScroll) {
        header.classList.add('header-hidden');
      } else {
        header.classList.remove('header-hidden');
      }
      header.classList.toggle('header-compact', current > 24);
      lastScroll = current;
    }, { passive: true });
  }

  const revealItems = document.querySelectorAll('.reveal-on-scroll, .service-card, .case-card, .content-card, .stat-card, .contact-card, .panel, .highlight-box');
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
