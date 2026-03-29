/* ============================================
   KAUSHIK TALUKDAR — PORTFOLIO JAVASCRIPT
   script.js
   ============================================ */

/* ── SCROLL REVEAL ANIMATION ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

// Observe all reveal and timeline elements
document.querySelectorAll('.reveal, .tl-item').forEach((el, i) => {
  // Stagger timeline items with a delay
  if (el.classList.contains('tl-item')) {
    el.style.transitionDelay = `${i * 0.08}s`;
  }
  revealObserver.observe(el);
});

/* ── CONTACT FORM SUBMISSION ── */
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-submit');
  const originalText = btn.textContent;

  // Show success state
  btn.textContent = '✓ Message Sent!';
  btn.style.background = '#2a52be';
  btn.style.color = '#fff';

  // Reset after 3 seconds
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
    btn.style.color = '';
    e.target.reset();
  }, 3000);
}

/* ── PHOTO HELPER ── */
// Call this in browser console to set your profile photo:
// setProfilePhoto('your-photo.jpg')
function setProfilePhoto(src) {
  const frame = document.querySelector('.photo-frame');
  if (frame) {
    frame.innerHTML = `<img src="${src}" alt="Kaushik Talukdar">`;
  }
}

/* ── ACTIVE NAV LINK ON SCROLL ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = 'var(--navy)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => navObserver.observe(section));
