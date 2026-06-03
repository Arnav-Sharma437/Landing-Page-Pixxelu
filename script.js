/* 
=========================================
   PIXXELU LANDING PAGE - SCRIPTS
=========================================
*/

document.addEventListener('DOMContentLoaded', () => {




  /* -----------------------------------------
     3. Scroll-Triggered Fade-Up Animation
     ----------------------------------------- */
  const fadeElements = document.querySelectorAll('.fade-up');
  
  const fadeObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.05
  };

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, fadeObserverOptions);

  fadeElements.forEach(el => {
    fadeObserver.observe(el);
  });


  /* -----------------------------------------
     4. Counters Animation for Stats Row
     ----------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-num');
  
  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;
    
    let count = 0;
    const duration = 2000;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    const increment = target / totalFrames;
    
    const counterInterval = setInterval(() => {
      count += increment;
      if (count >= target) {
        el.innerText = target + (target === 100 ? '%' : '+');
        clearInterval(counterInterval);
      } else {
        el.innerText = Math.floor(count) + (target === 100 ? '%' : '+');
      }
    }, frameRate);
  };

  const statsObserverOptions = {
    root: null,
    threshold: 0.5
  };

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stats = entry.target.querySelectorAll('.stat-num');
        stats.forEach(stat => animateCounter(stat));
        observer.unobserve(entry.target);
      }
    });
  }, statsObserverOptions);

  const statsRow = document.querySelector('.stats-row');
  if (statsRow) {
    statsObserver.observe(statsRow);
  }


  /* -----------------------------------------
     5. Accordion Open / Close (FAQ)
     ----------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const body = item.querySelector('.faq-body');
    
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-body').style.maxHeight = null;
        }
      });
      
      if (isActive) {
        item.classList.remove('active');
        body.style.maxHeight = null;
      } else {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + "px";
      }
    });
  });



  /* -----------------------------------------
     7. Lead Form Submission Handler & Feedback
     ----------------------------------------- */
  const leadForm = document.getElementById('lead-form');
  const successMsg = document.getElementById('form-success-msg');

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('form-name').value.trim();
      const bizName = document.getElementById('form-biz-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const phone = document.getElementById('form-phone').value.trim();
      const bizType = document.getElementById('form-biz-type').value;
      const requirements = document.getElementById('form-requirements').value.trim();

      if (name && bizName && email && phone && bizType && requirements) {
        successMsg.style.display = 'block';
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        leadForm.style.opacity = '0.3';
        leadForm.style.pointerEvents = 'none';
        
        leadForm.reset();
        
        setTimeout(() => {
          successMsg.style.display = 'none';
          leadForm.style.opacity = '1';
          leadForm.style.pointerEvents = 'auto';
        }, 5000);
      }
    });
  }


  /* -----------------------------------------
     8. Footer Copyright Auto-Year Setter
     ----------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.innerText = new Date().getFullYear();
  }

});
