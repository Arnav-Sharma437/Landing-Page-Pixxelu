/* PIXELU LANDING PAGE - SCRIPTS */

document.addEventListener('DOMContentLoaded', () => {

  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

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

  const statNums = document.querySelectorAll('.stat-num[data-target], .trust-stat-num[data-target]');
  const animateStat = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') ?? '+';
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

  const processSteps = [
    {
      title: 'Discovery & Planning',
      icon: 'fa-search',
      text: 'We map your guest journey, competitor landscape, and booking goals — essential for hotels, resorts, and travel brands before design begins.'
    },
    {
      title: 'Design & Prototyping',
      icon: 'fa-pencil-ruler',
      text: 'Wireframes and luxury mockups for room pages, tour packages, and booking flows. You approve every key screen before development.'
    },
    {
      title: 'Development',
      icon: 'fa-code',
      text: 'Clean, scalable builds with CMS, inquiry forms, WhatsApp CTAs, galleries, and integrations tailored to hospitality and travel.'
    },
    {
      title: 'Testing & Launch',
      icon: 'fa-vial',
      text: 'Cross-device QA, speed optimization, and conversion checks — we launch only when your site is ready to drive bookings and leads.'
    },
    {
      title: 'Support & Growth',
      icon: 'fa-life-ring',
      text: 'Training, updates, seasonal offer changes, and ongoing optimization so your website keeps performing after go-live.'
    }
  ];

  const timelineSteps = document.querySelectorAll('.timeline-step');
  const timelineFill = document.getElementById('timeline-fill');
  const processTitle = document.getElementById('process-title');
  const processText = document.getElementById('process-text');
  const processIcon = document.getElementById('process-icon');

  const setProcessStep = (step) => {
    const data = processSteps[step];
    if (!data) return;

    timelineSteps.forEach((t, i) => {
      const active = i === step;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    if (timelineFill) {
      timelineFill.style.width = `${((step + 1) / processSteps.length) * 100}%`;
    }
    if (processTitle) processTitle.textContent = data.title;
    if (processText) processText.textContent = data.text;
    if (processIcon) {
      processIcon.innerHTML = `<i class="fas ${data.icon}"></i>`;
    }
  };

  timelineSteps.forEach(tab => {
    tab.addEventListener('click', () => {
      const step = parseInt(tab.getAttribute('data-step'), 10);
      setProcessStep(step);
    });
  });

  setProcessStep(0);

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
