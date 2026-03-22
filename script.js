// Hero BG zoom
window.addEventListener('load', () => { document.getElementById('heroBg').classList.add('loaded'); });

// Launching Soon Popup
function closePopup() {
  const overlay = document.getElementById('launchPopup');
  overlay.classList.add('hide');
  setTimeout(() => { overlay.style.display = 'none'; }, 400);
}
// Auto show popup, close on overlay click
document.getElementById('launchPopup').addEventListener('click', function(e) {
  if (e.target === this) closePopup();
});

// Navbar + scroll top
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('scrollTopBtn').classList.toggle('visible', window.scrollY > 500);
});

// Mobile nav
function toggleNav() {
  document.getElementById('navToggle').classList.toggle('open');
  document.getElementById('mobileNav').classList.toggle('open');
}
function closeNav() {
  document.getElementById('navToggle').classList.remove('open');
  document.getElementById('mobileNav').classList.remove('open');
}

// Fade-up on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.08 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Gallery
let currentSlide = 0;
const totalSlides = 7;
let autoTimer;

function galleryGoTo(idx) {
  currentSlide = idx;
  document.getElementById('gallerySlider').style.transform = `translateX(-${idx * 100}%)`;
  document.querySelectorAll('.gallery-thumb').forEach((t, i) => t.classList.toggle('active', i === idx));
  document.getElementById('galleryProgress').style.width = ((idx + 1) / totalSlides * 100).toFixed(2) + '%';
  clearInterval(autoTimer);
  autoTimer = setInterval(galleryNext, 4500);
}
function galleryNext() { galleryGoTo((currentSlide + 1) % totalSlides); }
function galleryPrev() { galleryGoTo((currentSlide - 1 + totalSlides) % totalSlides); }
autoTimer = setInterval(galleryNext, 4500);

// Touch swipe
let touchStartX = 0;
document.getElementById('gallerySlider').addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
document.getElementById('gallerySlider').addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) diff > 0 ? galleryNext() : galleryPrev();
});

// Floor plans
const plans = [
  { img: 'images/4bhk type 1.jpg', config: '4.5 BHK Type 1', carpet: '2244 Sq.Ft', saleable: '3141 Sq.Ft', price: '₹5.50 Cr*' },
  { img: 'images/4bhk type 2.jpg', config: '4.5 BHK Type 2', carpet: '2269 Sq.Ft', saleable: '3177 Sq.Ft', price: '₹5.50 Cr*' },
  { img: 'images/4bhk type 3.jpg', config: '4.5 BHK Type 3', carpet: '2244 Sq.Ft', saleable: '3141 Sq.Ft', price: '₹5.50 Cr*' },
  { img: 'images/4 bhk type.jpg',  config: '4 BHK',          carpet: '2141 Sq.Ft', saleable: '2998 Sq.Ft', price: '₹5.20 Cr*' },
];
function switchPlan(idx, btn) {
  document.querySelectorAll('.plan-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  const p = plans[idx];
  const img = document.getElementById('planImage');
  img.style.opacity = '0';
  setTimeout(() => { img.src = p.img; img.style.opacity = '1'; }, 280);
  document.getElementById('piConfig').textContent = p.config;
  document.getElementById('piCarpet').textContent = p.carpet;
  document.getElementById('piSaleable').textContent = p.saleable;
  document.getElementById('piPrice').textContent = p.price;
}

// Captcha
let captchaChecked = false;
function toggleCaptcha() {
  captchaChecked = !captchaChecked;
  document.getElementById('captchaCheck').classList.toggle('checked', captchaChecked);
  document.getElementById('captchaIcon').style.display = captchaChecked ? 'block' : 'none';
}

// Forms
function submitHeroForm(e) {
  e.preventDefault();
  alert('Thank you! Our team will contact you within 24 hours with the exclusive brochure.');
  e.target.reset();
}
function submitContactForm(e) {
  e.preventDefault();
  if (!captchaChecked) { alert('Please verify you are not a robot.'); return; }
  alert('Thank you! Your site visit request has been received. Our team will call you shortly.');
  e.target.reset();
  captchaChecked = false;
  document.getElementById('captchaCheck').classList.remove('checked');
  document.getElementById('captchaIcon').style.display = 'none';
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = window.innerWidth < 992 ? 58 : 70;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      closeNav();
    }
  });
});