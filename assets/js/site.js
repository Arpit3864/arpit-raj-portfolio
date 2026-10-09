(function(){
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var menu = document.querySelector('[data-menu]');
  var links = document.querySelector('[data-nav-links]');
  if(menu && links){
    menu.addEventListener('click', function(){
      var open = links.classList.toggle('open');
      menu.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function(e){
      if(e.target.closest('a')){ links.classList.remove('open'); menu.setAttribute('aria-expanded','false'); }
    });
  }

  document.querySelectorAll('[data-theme-toggle]').forEach(function(button){
    function sync(){
      var attr = document.documentElement.getAttribute('data-theme');
      var light = attr ? attr === 'light' : window.matchMedia('(prefers-color-scheme: light)').matches;
      button.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
      button.setAttribute('aria-pressed', light ? 'true' : 'false');
      button.innerHTML = light
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
    }
    sync();
    button.addEventListener('click', function(){
      var current = document.documentElement.getAttribute('data-theme');
      var isLight = current ? current === 'light' : window.matchMedia('(prefers-color-scheme: light)').matches;
      document.documentElement.setAttribute('data-theme', isLight ? 'dark' : 'light');
      sync();
    });
  });

  var modal = document.querySelector('[data-modal]');
  var modalFrame = modal && modal.querySelector('[data-modal-frame]');
  var modalTitle = modal && modal.querySelector('[data-modal-title]');
  var modalClose = modal && modal.querySelector('[data-modal-close]');
  var returnFocus = null;
  function closeModal(){
    if(!modal || !modal.classList.contains('open')) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
    if(modalFrame) modalFrame.innerHTML = '';
    if(returnFocus) returnFocus.focus();
  }
  document.querySelectorAll('[data-video-src]').forEach(function(trigger){
    trigger.addEventListener('click', function(){
      if(!modal || !modalFrame) return;
      returnFocus = trigger;
      var iframe = document.createElement('iframe');
      iframe.src = trigger.getAttribute('data-video-src');
      iframe.title = trigger.getAttribute('data-video-title') || 'Portfolio video';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.setAttribute('allowfullscreen','');
      modalFrame.appendChild(iframe);
      if(modalTitle) modalTitle.textContent = trigger.getAttribute('data-video-code') + ' / ' + (trigger.getAttribute('data-video-title') || 'Portfolio video');
      modal.classList.add('open');
      modal.setAttribute('aria-hidden','false');
      document.body.classList.add('modal-open');
      if(modalClose) modalClose.focus();
    });
  });
  if(modalClose) modalClose.addEventListener('click', closeModal);
  if(modal) modal.addEventListener('click', function(e){ if(e.target === modal) closeModal(); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeModal(); });

  if(!reduced && window.gsap){
    if(window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    gsap.from('.hero-copy > *', {opacity:0,y:30,duration:.8,stagger:.1,ease:'power3.out'});
    gsap.from('.showreel', {opacity:0,x:45,rotateY:-5,duration:1,ease:'power3.out',delay:.18});
    document.querySelectorAll('[data-reveal]').forEach(function(el){
      gsap.from(el,{opacity:0,y:34,duration:.75,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}});
    });
    document.querySelectorAll('[data-stagger]').forEach(function(group){
      gsap.from(group.children,{opacity:0,y:38,duration:.72,stagger:.09,ease:'power3.out',scrollTrigger:{trigger:group,start:'top 86%',once:true}});
    });
    gsap.from('.category-hero h1 span',{opacity:0,yPercent:70,duration:.85,stagger:.09,ease:'power4.out'});
  }

  if(!reduced && window.matchMedia('(pointer:fine)').matches){
    document.querySelectorAll('[data-tilt]').forEach(function(card){
      card.addEventListener('pointermove', function(e){
        var r = card.getBoundingClientRect();
        var rx = ((e.clientY-r.top)/r.height-.5)*-4;
        var ry = ((e.clientX-r.left)/r.width-.5)*5;
        card.style.transform = 'perspective(900px) rotateX('+rx+'deg) rotateY('+ry+'deg)';
      });
      card.addEventListener('pointerleave', function(){ card.style.transform=''; });
    });
  }
})();
