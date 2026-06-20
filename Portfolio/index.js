/* ==========================================
   INTERACTIVE JAVASCRIPT FOR PORTFOLIO
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initScrollActiveHighlight();
  initTypewriter();
  initLanguageAnimation();
  initContactForm();
});

/* ==========================================
   NAVBAR SCROLL EFFECT
   ========================================== */
function initNavbarScroll() {
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================
   MOBILE NAVIGATION MENU
   ========================================== */
function initMobileMenu() {
  const toggle = document.getElementById('mobile-nav-toggle');
  const menu = document.getElementById('nav-menu');
  const links = document.querySelectorAll('.nav-link');
  
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    menu.classList.toggle('open');
  });
  
  links.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      menu.classList.remove('open');
    });
  });
}

/* ==========================================
   SCROLL ACTIVE LINK HIGHLIGHTING
   ========================================== */
function initScrollActiveHighlight() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================
   TYPEWRITER EFFECT (HERO)
   ========================================== */
function initTypewriter() {
  const words = ["Future of Web", "BCA Architecture", "Next-Gen UI/UX", "Responsive Code"];
  let i = 0;
  let timer;
  const target = document.getElementById('typed-text');
  
  function typingEffect() {
    let word = words[i].split("");
    var loopTyping = function() {
      if (word.length > 0) {
        target.innerHTML += word.shift();
      } else {
        setTimeout(deletingEffect, 2000);
        return false;
      }
      timer = setTimeout(loopTyping, 100);
    };
    loopTyping();
  }
  
  function deletingEffect() {
    let word = words[i].split("");
    var loopDeleting = function() {
      if (word.length > 0) {
        word.pop();
        target.innerHTML = word.join("");
      } else {
        if (words.length > (i + 1)) {
          i++;
        } else {
          i = 0;
        }
        setTimeout(typingEffect, 500);
        return false;
      }
      timer = setTimeout(loopDeleting, 60);
    };
    loopDeleting();
  }
  
  // Clear original content to start clean
  target.innerHTML = '';
  typingEffect();
}

/* ==========================================
   INTERSECTION OBSERVER FOR LANGUAGE BARS
   ========================================== */
function initLanguageAnimation() {
  const progressBars = document.querySelectorAll('.progress-bar');
  
  const observerOptions = {
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetPercent = bar.getAttribute('data-progress');
        bar.style.width = targetPercent;
        observer.unobserve(bar);
      }
    });
  }, observerOptions);
  
  progressBars.forEach(bar => {
    observer.observe(bar);
  });
}

/* ==========================================
   CONTACT FORM SUBMISSION
   ========================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.innerText = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      submitBtn.innerText = 'Send Message';
      submitBtn.disabled = false;
      
      status.style.display = 'block';
      status.classList.add('success');
      
      form.reset();
      
      setTimeout(() => {
        status.style.display = 'none';
      }, 5000);
    }, 1500);
  });
}
