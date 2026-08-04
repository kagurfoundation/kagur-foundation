// Render Lucide icons
if (window.lucide) { lucide.createIcons(); }

// Mobile nav
var toggle = document.getElementById('navToggle');
var links = document.getElementById('navLinks');
var iconOpen = document.getElementById('navIconOpen');
var iconClose = document.getElementById('navIconClose');
toggle.addEventListener('click', function(){
  var isOpen = links.classList.contains('max-h-[480px]');
  links.classList.toggle('max-h-0', isOpen);
  links.classList.toggle('max-h-[480px]', !isOpen);
  iconOpen.classList.toggle('hidden', !isOpen);
  iconClose.classList.toggle('hidden', isOpen);
  toggle.setAttribute('aria-expanded', (!isOpen).toString());
});
links.addEventListener('click', function(e){
  if (e.target.tagName === 'A'){
    links.classList.remove('max-h-[480px]');
    links.classList.add('max-h-0');
    iconOpen.classList.remove('hidden');
    iconClose.classList.add('hidden');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

// Nav shadow on scroll
var nav = document.getElementById('nav');
var onScroll = function(){
  var scrolled = window.scrollY > 8;
  nav.classList.toggle('border-line-cool', scrolled);
  nav.classList.toggle('shadow-[0_4px_24px_rgba(26,26,26,0.05)]', scrolled);
};
onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

// Scroll reveal — slight fade + rise as sections enter the viewport
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
