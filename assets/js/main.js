// Mobile nav
var toggle = document.getElementById('navToggle');
var links = document.getElementById('navLinks');
toggle.addEventListener('click', function(){
  var open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});
links.addEventListener('click', function(e){
  if (e.target.tagName === 'A'){ links.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); }
});

// Nav shadow on scroll
var nav = document.getElementById('nav');
var onScroll = function(){ nav.classList.toggle('scrolled', window.scrollY > 8); };
onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

// Scroll reveal
var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var items = document.querySelectorAll('.reveal');
if (reduce || !('IntersectionObserver' in window)) {
  items.forEach(function(el){ el.classList.add('in'); });
} else {
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
  }, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});
  items.forEach(function(el){ io.observe(el); });
}

// Donate button reminder until a real payment link is wired up
document.querySelectorAll('[data-pay-link]').forEach(function(btn){
  btn.addEventListener('click', function(e){
    if (btn.getAttribute('href') === '#donate'){
      e.preventDefault();
      alert('Payment gateway not yet connected. Add a Razorpay/Instamojo link to enable donations.');
    }
  });
});
