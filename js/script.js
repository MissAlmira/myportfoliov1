document.addEventListener('DOMContentLoaded', () => {
    // Single-page navigation controller
    const navButtons = document.querySelectorAll('.nav-btn, .footer-nav-btn, [data-target]');
    const sections = document.querySelectorAll('.page-section');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const siteNav = document.querySelector('.site-nav');

    function switchSection(targetId) {
        sections.forEach(section => {
            if (section.id === targetId) {
                section.classList.add('active-section');
            } else {
                section.classList.remove('active-section');
            }
        });

        navButtons.forEach(btn => {
            if (btn.getAttribute('data-target') === targetId) {
                btn.classList.add('active');
            } else if (btn.classList.contains('nav-btn')) {
                btn.classList.remove('active');
            }
        });

        // Close mobile nav if open
        if (siteNav.classList.contains('active')) {
            siteNav.classList.remove('active');
            mobileNavToggle.setAttribute('aria-expanded', 'false');
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const target = button.getAttribute('data-target');
            if (target) {
                e.preventDefault();
                switchSection(target);
            }
        });
    });

    // Mobile nav toggle
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            const expanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
            mobileNavToggle.setAttribute('aria-expanded', !expanded);
            siteNav.classList.toggle('active');
        });
    }

    // Expandable case studies
    const expandCaseBtns = document.querySelectorAll('.expand-case-btn');
    expandCaseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.case-card');
            const isExpanded = card.classList.contains('expanded');
            card.classList.toggle('expanded', !isExpanded);
            btn.setAttribute('aria-expanded', !isExpanded);
            btn.textContent = isExpanded ? 'View Case Demonstration' : 'Hide Case Demonstration';
        });
    });

    // AI Evaluation Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.eval-tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            tabContents.forEach(content => {
                if (content.id === targetTab) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });

    // Photography Lightbox
    const photoSlots = document.querySelectorAll('.photo-slot');
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.querySelector('.lightbox-close');

    photoSlots.forEach((slot) => {
        slot.addEventListener('click', () => {
            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
        });
        slot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                lightbox.classList.add('active');
                lightbox.setAttribute('aria-hidden', 'false');
            }
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Dynamic Copyright Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
