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
     6. Dynamic Pricing Switching Logic
     ----------------------------------------- */
  const pricingData = {
    starter: {
      badge: "Starter Package",
      name: "Starter Plan",
      price: "₹6,999",
      desc: "Perfect for homestays, single villas, or testing market ideas with a landing page.",
      features: [
        "Single-Page Landing Page Layout",
        "Mobile Responsive Architecture",
        "1 Booking Inquiry / Contact Form",
        "WhatsApp Call/Chat Integration",
        "SSL Security Certificate Setup",
        "Basic SEO (Title, Meta Tags) Setup",
        "Google Maps Embed Setup",
        "1 Year Free Domain & Hosting Setup"
      ]
    },
    business: {
      badge: "Best Seller",
      name: "Business Plan",
      price: "₹14,999",
      desc: "Designed for small hotels, resorts, and tour operator businesses requiring dedicated pages.",
      features: [
        "Up to 5 Pages (Home, Rooms, Contact, etc.)",
        "Room Booking Enquiry Forms & Fields",
        "Dynamic Rooms Image Gallery & Lightbox",
        "TripAdvisor / Social Review Link Integration",
        "Google Search Console & Analytics Setup",
        "Advanced SEO Setup & Schema Markup",
        "Social Media Accounts Linkage",
        "14-Day Priority Project Delivery"
      ]
    },
    premium: {
      badge: "Recommended",
      name: "Premium Plan",
      price: "₹24,999",
      desc: "Perfect for growing resorts, wellness retreats, and boutique travel agencies with active packages.",
      features: [
        "Up to 10 Pages (Home, Rooms, Packages, Blog, etc.)",
        "Interactive Room / Activity Booking Calendar System",
        "Dynamic Packages Slider & Filtering",
        "YouTube/Vimeo Header Video Setup",
        "TripAdvisor Widget Embedding",
        "Speed Score Optimizations (GTMetrix 90%+)",
        "Professional Travel Content Editing Support",
        "1 Year Free Maintenance Help Desk Support"
      ]
    },
    enterprise: {
      badge: "Ultimate Power",
      name: "Enterprise Plan",
      price: "₹39,999",
      desc: "Custom high-end design integrated with live booking engines and channel managers.",
      features: [
        "Fully Bespoke / Custom Figma Theme Design",
        "Direct Booking Engine Link (ResAvenue, Staah, etc.)",
        "Live Channel Manager Integration Support",
        "Automated Confirmation Email Templates",
        "Multi-language (English + Regional) Support",
        "Guaranteed Ultra-Fast Page Speeds",
        "Dedicated Technical Account Manager",
        "1 Year Free Custom Feature Updates & Backups"
      ]
    }
  };

  const tabButtons = document.querySelectorAll('.tab-btn');
  const badgeEl = document.getElementById('package-badge');
  const nameEl = document.getElementById('package-name');
  const priceEl = document.getElementById('package-price');
  const descEl = document.getElementById('package-desc');
  const featuresEl = document.getElementById('package-features');

  const updatePricingCard = (pkgKey) => {
    const data = pricingData[pkgKey];
    if (!data) return;

    badgeEl.innerText = data.badge;
    nameEl.innerText = data.name;
    priceEl.innerHTML = `${data.price}<span> / Onetime</span>`;
    descEl.innerText = data.desc;

    featuresEl.innerHTML = '';
    data.features.forEach(feat => {
      const li = document.createElement('li');
      li.innerHTML = `<i class="fas fa-check-circle"></i> ${feat}`;
      featuresEl.appendChild(li);
    });

    // Update package link with WhatsApp pre-filled message
    const packageLinkEl = document.getElementById('package-link');
    if (packageLinkEl) {
      const encodedMsg = encodeURIComponent(`Hi Pixxelu, I am interested in the ${data.name} package (${data.price}).`);
      packageLinkEl.href = `https://wa.me/91780721102?text=${encodedMsg}`;
    }
  };

  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const pkgKey = btn.getAttribute('data-package');
      updatePricingCard(pkgKey);
    });
  });

  updatePricingCard('starter');


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
