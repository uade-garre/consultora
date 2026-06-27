(function(){
  const btn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const header = document.querySelector('.site-header');
  const mega = document.querySelector('.mega-menu');
  const triggers = document.querySelectorAll('.menu-trigger');
  const panels = document.querySelectorAll('.mega-panel');
  let lastScroll = window.scrollY;

  function closeMega() {
    if (!mega) return;
    mega.classList.remove('open');
    mega.setAttribute('aria-hidden', 'true');
    triggers.forEach(function(trigger){ trigger.setAttribute('aria-expanded', 'false'); });
    panels.forEach(function(panel){ panel.classList.remove('active'); });
  }

  function openMega(name, trigger) {
    if (!mega) return;
    const panel = document.querySelector('.mega-panel[data-panel="' + name + '"]');
    if (!panel) return;
    panels.forEach(function(item){ item.classList.remove('active'); });
    triggers.forEach(function(item){ item.setAttribute('aria-expanded', 'false'); });
    panel.classList.add('active');
    mega.classList.add('open');
    mega.setAttribute('aria-hidden', 'false');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
  }

  triggers.forEach(function(trigger){
    trigger.addEventListener('click', function(event){
      event.stopPropagation();
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMega();
      } else {
        openMega(trigger.dataset.menu, trigger);
      }
    });
    trigger.addEventListener('mouseenter', function(){
      if (window.matchMedia('(min-width: 981px)').matches) {
        openMega(trigger.dataset.menu, trigger);
      }
    });
  });

  if (mega) {
    mega.addEventListener('mouseleave', closeMega);
    mega.addEventListener('click', function(event){ event.stopPropagation(); });
  }

  if (btn && nav) {
    btn.addEventListener('click', function(){
      const isOpen = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      closeMega();
    });
    document.addEventListener('click', function(event){
      if (!event.target.closest('.site-header')) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        closeMega();
      }
    });
  }

  if (header) {
    window.addEventListener('scroll', function(){
      const current = window.scrollY;
      if (current > 120 && current > lastScroll) {
        header.classList.add('header-hidden');
        closeMega();
      } else {
        header.classList.remove('header-hidden');
      }
      header.classList.toggle('header-compact', current > 24);
      lastScroll = current;
    }, { passive: true });
  }

  document.addEventListener('keydown', function(event){
    if (event.key === 'Escape') closeMega();
  });

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
