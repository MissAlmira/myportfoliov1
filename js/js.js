/**
 * Almira R. Bogayan - Personal Portfolio JavaScript
 * Vanilla JS script providing interactivity for navigation, dynamic UI components,
 * case study accordions, clipboard copying, lightbox gallery, and scroll events.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Footer Copyright Year
  initCopyrightYear();

  // 2. Mobile Navigation Toggle
  initMobileNavigation();

  // 3. Smooth Scrolling for Navigation Links
  initSmoothScrolling();

  // 4. Accordion Toggle for Case Studies
  initCaseStudyAccordions();

  // 5. Copy to Clipboard for Email Templates
  initCopyToClipboard();

  // 6. AI Evaluation Tab Switching
  initAiEvaluationTabs();

  // 7. Lightbox Modal for Photography
  initLightbox();

  // 8. Scroll Reveal Animations & Back-to-Top Button
  initScrollEffects();
});

/**
 * 1. Automatically sets the current year in the footer span.
 */
function initCopyrightYear() {
  const yearElement = document.getElementById('copyright-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * 2. Mobile Navigation Toggle functionality with ARIA state updates.
 */
function initMobileNavigation() {
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!mobileBtn || !mobileMenu) return;

  function toggleMenu(open) {
    const isExpanded = open !== undefined ? open : mobileBtn.getAttribute('aria-expanded') !== 'true';
    mobileBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    
    if (isExpanded) {
      mobileMenu.classList.remove('hidden');
      if (menuIcon) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-xmark');
      }
    } else {
      mobileMenu.classList.add('hidden');
      if (menuIcon) {
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
      }
    }
  }

  mobileBtn.addEventListener('click', () => toggleMenu());

  // Close mobile menu when a navigation link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Close mobile menu when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
      toggleMenu(false);
    }
  });
}

/**
 * 3. Smooth scrolling behavior for internal anchor links.
 */
function initSmoothScrolling() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

  anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();
        
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        targetElement.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start'
        });

        // Set focus to target for keyboard accessibility
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus({ preventScroll: true });
      }
    });
  });
}

/**
 * 4. Expandable Case Study Accordions.
 */
function initCaseStudyAccordions() {
  const accordionTriggers = document.querySelectorAll('.accordion-header');

  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target') || this.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
      
      // If trigger uses inline onclick, let inline handler execute or manage programmatically
      if (targetId) {
        toggleAccordion(targetId);
      }
    });
  });
}

/**
 * Global function to toggle an accordion panel by ID.
 * Exposed on window for compatibility with inline `onclick="toggleAccordion('case-1')"` handlers.
 */
window.toggleAccordion = function(id) {
  const content = document.getElementById(id);
  const icon = document.getElementById(id + '-icon');

  if (!content) return;

  const isHidden = content.classList.contains('hidden');

  if (isHidden) {
    content.classList.remove('hidden');
    if (icon) {
      icon.classList.add('rotate-180');
    }
  } else {
    content.classList.add('hidden');
    if (icon) {
      icon.classList.remove('rotate-180');
    }
  }
};

/**
 * 5. Copy to Clipboard implementation with fallback for restricted environments.
 */
function initCopyToClipboard() {
  const copyButtons = document.querySelectorAll('[data-copy-target]');

  copyButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetId = this.getAttribute('data-copy-target');
      if (targetId) {
        copyToClipboard(targetId, this);
      }
    });
  });
}

/**
 * Global function to copy text content of an element to clipboard.
 * Exposed on window for compatibility with inline `onclick="copyToClipboard('email-1', this)"` handlers.
 */
window.copyToClipboard = function(elementId, btnElement) {
  const targetElement = document.getElementById(elementId);
  if (!targetElement) return;

  const textToCopy = targetElement.innerText || targetElement.textContent;

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(textToCopy)
      .then(() => showToast('Email copied to clipboard!'))
      .catch(() => fallbackCopyText(textToCopy));
  } else {
    fallbackCopyText(textToCopy);
  }
};

/**
 * Fallback mechanism for execCommand copying.
 */
function fallbackCopyText(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  textarea.style.top = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    const successful = document.execCommand('copy');
    if (successful) {
      showToast('Email text copied to clipboard!');
    } else {
      showToast('Unable to copy text automatically.');
    }
  } catch (err) {
    showToast('Copying not supported in this browser.');
  } finally {
    document.body.removeChild(textarea);
  }
}

/**
 * Displays feedback toast message.
 */
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');

  if (!toast) return;

  if (toastMsg) {
    toastMsg.textContent = message;
  }

  toast.classList.remove('opacity-0', 'pointer-events-none');
  toast.classList.add('opacity-100');

  setTimeout(() => {
    toast.classList.add('opacity-0', 'pointer-events-none');
    toast.classList.remove('opacity-100');
  }, 3000);
}

/**
 * 6. AI Evaluation Tab Switching Interface.
 */
function initAiEvaluationTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const tabKey = this.getAttribute('data-tab') || this.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
      if (tabKey) {
        switchTab(tabKey);
      }
    });
  });
}

/**
 * Global function to switch AI evaluation tabs.
 * Exposed on window for compatibility with inline `onclick="switchTab('h2h')"` handlers.
 */
window.switchTab = function(tabKey) {
  const tabs = ['h2h', 'sxs', 'transcription'];

  tabs.forEach(key => {
    const content = document.getElementById(`tab-content-${key}`);
    const btn = document.getElementById(`tab-btn-${key}`);

    if (key === tabKey) {
      if (content) content.classList.remove('hidden');
      if (btn) {
        btn.classList.add('bg-teal-accent', 'text-navy-900', 'shadow-lg');
        btn.classList.remove('bg-white/5', 'text-gray-300');
        btn.setAttribute('aria-selected', 'true');
      }
    } else {
      if (content) content.classList.add('hidden');
      if (btn) {
        btn.classList.remove('bg-teal-accent', 'text-navy-900', 'shadow-lg');
        btn.classList.add('bg-white/5', 'text-gray-300');
        btn.setAttribute('aria-selected', 'false');
      }
    }
  });
};

/**
 * 7. Photography Lightbox Modal implementation.
 */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  // Close lightbox when clicking outside image content
  lightbox.addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
      closeLightbox();
    }
  });

  // Global keydown handler for modal closure
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
      closeLightbox();
    }
  });
}

/**
 * Opens lightbox with given image source and caption text.
 * Exposed on window for compatibility with inline `onclick="openLightbox(...)"` handlers.
 */
window.openLightbox = function(imgSrc, caption) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');

  if (!lightbox || !lightboxImg) return;

  lightboxImg.src = imgSrc;
  lightboxImg.alt = caption || 'Enlarged photo view';
  
  if (lightboxCaption) {
    lightboxCaption.textContent = caption || '';
  }

  lightbox.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

/**
 * Closes lightbox modal and restores scrolling.
 * Exposed on window for compatibility with inline `onclick="closeLightbox()"` handlers.
 */
window.closeLightbox = function() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  lightbox.classList.add('hidden');
  document.body.style.overflow = 'auto';
};

/**
 * 8. Scroll reveal animations and Back-to-Top button behavior.
 */
function initScrollEffects() {
  const backToTopBtn = document.getElementById('back-to-top');

  // Back to Top button visibility handling
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  }

  // Scroll Reveal Observer
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll('.glass-card, section h2, .timeline-item');

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
      el.classList.add('reveal-init');
      revealObserver.observe(el);
    });
  }
}