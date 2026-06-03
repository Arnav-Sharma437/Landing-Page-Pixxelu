/* PIXELU LANDING PAGE - SCRIPTS */

document.addEventListener('DOMContentLoaded', () => {

  /* Sticky header shadow on scroll */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Scroll fade-up */
  const fadeEls = document.querySelectorAll('.fade-up');
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const fadeObs = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    fadeEls.forEach(el => fadeObs.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  /* Stat counters */
  const statNums = document.querySelectorAll('.stat-num[data-target]');
  const animateStat = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '+';
    if (isNaN(target)) return;
    let current = 0;
    const steps = 40;
    const stepVal = target / steps;
    const timer = setInterval(() => {
      current += stepVal;
      if (current >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current) + suffix;
      }
    }, 40);
  };

  const statObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStat(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => statObs.observe(el));

  /* Process stepper */
  const processTexts = [
    'We start by understanding your goals, audience, and competitors. Our website design company team creates a detailed project roadmap and sitemap before any design work begins.',
    'Our designers craft wireframes and high-fidelity mockups aligned with your brand. You review and approve visuals before development starts.',
    'Developers build your site with clean, scalable code. We integrate CMS, forms, analytics, and third-party tools as needed.',
    'Rigorous QA across devices and browsers ensures performance, accessibility, and security. We launch only when everything meets our standards.',
    'Post-launch, we provide training, updates, and ongoing support so your website continues to perform and grow with your business.'
  ];

  const tabs = document.querySelectorAll('.process-tab');
  const panel = document.getElementById('process-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const step = parseInt(tab.getAttribute('data-step'), 10);
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      if (panel && processTexts[step]) {
        panel.querySelector('p').textContent = processTexts[step];
      }
    });
  });

  /* FAQ accordion */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => {
        i.classList.remove('active');
        const q = i.querySelector('.faq-question');
        const icon = i.querySelector('.faq-icon');
        q.setAttribute('aria-expanded', 'false');
        if (icon) icon.textContent = '+';
      });
      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        const icon = item.querySelector('.faq-icon');
        if (icon) icon.textContent = '×';
      }
    });
  });

  /* Contact form */
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        showFeedback('Please fill in all required fields.', 'error');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFeedback('Please enter a valid email.', 'error');
        return;
      }

      showFeedback('Thank you! Your message has been received. We will contact you shortly.', 'success');
      form.reset();
    });
  }

  function showFeedback(msg, type) {
    if (!feedback) return;
    feedback.textContent = msg;
    feedback.className = 'form-feedback ' + type;
    feedback.hidden = false;
    setTimeout(() => { feedback.hidden = true; }, 6000);
  }
});
