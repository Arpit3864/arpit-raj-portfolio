(function(){
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var menu = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav-links');
  if(menu && nav){
    menu.addEventListener('click',function(){
      var open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded',open?'true':'false');
    });
    nav.addEventListener('click',function(e){
      if(e.target.closest('a')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}
    });
  }

  var form = document.querySelector('[data-mail-form]');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      if(!form.reportValidity()) return;
      var data = new FormData(form);
      var name = String(data.get('name') || '').trim();
      var email = String(data.get('email') || '').trim();
      var message = String(data.get('message') || '').trim();
      var subject = encodeURIComponent('Portfolio enquiry from ' + name);
      var body = encodeURIComponent('Name: '+name+'\nEmail: '+email+'\n\n'+message);
      window.location.href = 'mailto:arpitraj2332@gmail.com?subject='+subject+'&body='+body;
    });
  }

  if(!reduced && window.gsap){
    if(window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    var intro = gsap.timeline({defaults:{ease:'power4.out'}});
    intro.from('.nav',{y:-72,opacity:0,duration:.65})
      .from('.hero-hi',{yPercent:100,opacity:0,duration:.75},'-=.2')
      .from('.hero-name',{yPercent:100,opacity:0,duration:.85},'-=.52')
      .from('.avatar-wrap',{y:90,opacity:0,duration:1},'-=.62')
      .from('.hero-bottom>*',{y:22,opacity:0,duration:.55,stagger:.1},'-=.48')
      .from('.hero .shape',{scale:0,opacity:0,duration:.5,stagger:.08},'-=.45');

    document.querySelectorAll('.reveal').forEach(function(el){
      gsap.from(el,{y:48,opacity:0,duration:.8,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 86%',once:true}});
    });
    document.querySelectorAll('.stagger').forEach(function(group){
      gsap.from(group.children,{y:42,opacity:0,duration:.72,stagger:.09,ease:'power3.out',scrollTrigger:{trigger:group,start:'top 84%',once:true}});
    });
    document.querySelectorAll('[data-float]').forEach(function(shape,index){
      gsap.to(shape,{y:index%2?18:-20,rotation:index%2?8:-7,duration:3.2+index*.35,repeat:-1,yoyo:true,ease:'sine.inOut'});
    });
    gsap.to('.about-word',{xPercent:-5,ease:'none',scrollTrigger:{trigger:'.about',start:'top bottom',end:'bottom top',scrub:.7}});
  }

  var avatar = document.querySelector('[data-avatar]');
  var hero = document.querySelector('.hero');
  if(avatar && hero && !reduced && window.matchMedia('(pointer:fine)').matches){
    hero.addEventListener('pointermove',function(e){
      var r=hero.getBoundingClientRect();
      var x=(e.clientX-r.left)/r.width-.5;
      var y=(e.clientY-r.top)/r.height-.5;
      avatar.style.transform='translateX(-50%) perspective(900px) rotateY('+(x*8)+'deg) rotateX('+(-y*5)+'deg) translate3d('+(x*10)+'px,'+(y*7)+'px,0)';
    });
    hero.addEventListener('pointerleave',function(){avatar.style.transform='translateX(-50%)';});
  }
})();
