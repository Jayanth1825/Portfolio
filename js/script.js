// ===========================================
// Portfolio JavaScript - Enhanced with Advanced Animations & Interactivity
// ===========================================

// ===========================================
// Reduced Motion Preference Check
// ===========================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Helper to respect user's motion preference
const reduceMotion = prefersReducedMotion.matches ? 'reduce' : 'no-reduction';

// ===========================================
// Navigation & Scroll Effects
// ===========================================
const header = document.querySelector('header');
const navLinks = document.querySelector('.nav-links');
const burger = document.querySelector('.burger');
const navItems = document.querySelectorAll('.nav-links li');
const scrollToTopBtn = document.querySelector('.scroll-top-btn');

// Smooth scroll with offset consideration
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#' || !targetId) return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
        }
    });
});

// Scroll-triggered header shadow
const updateHeaderShadow = () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        header.style.backdropFilter = 'none';
    }
};

window.addEventListener('scroll', updateHeaderShadow);

// Mobile menu toggle with ARIA support
const toggleMobileMenu = () => {
    const isExpanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');

    // Focus trap for accessibility
    if (navLinks.classList.contains('active')) {
        navLinks.setAttribute('aria-hidden', 'false');
        focusFirstNavItem();
    } else {
        navLinks.setAttribute('aria-hidden', 'true');
    }
};

burger.addEventListener('click', toggleMobileMenu);

// Close menu on link click
navItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('toggle');
        navLinks.setAttribute('aria-hidden', 'true');
    });
});

// Focus first nav item when menu opens
const focusFirstNavItem = () => {
    const firstLink = navLinks.querySelector('a');
    if (firstLink) firstLink.focus();
};

// Initialize reduced motion observer
const motionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!prefersReducedMotion.matches) {
            entry.target.style.transitionTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)';
        }
    });
}, { threshold: 0.1 });

// ===========================================
// Hero Section Enhancements
// ===========================================
const hero = document.querySelector('.hero');
const heroImage = document.querySelector('.hero-image');
const avatar = document.querySelector('.avatar');

// Parallax effect on hero (disabled for reduced motion)
if (!prefersReducedMotion.matches) {
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const rotateX = (clientY - centerY) / 20;
        const rotateY = (centerX - clientX) / 20;

        hero.style.backgroundPosition = `${clientX}px ${clientY}px`;

        if (avatar) {
            avatar.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    });
}

// Enhanced typing effect
const initTypingEffect = () => {
    const subtitle = document.querySelector('.subtitle');
    if (!subtitle) return;

    const text = subtitle.getAttribute('data-text') || subtitle.textContent;
    const originalText = text;

    // Only apply if not already animated
    if (subtitle.getAttribute('data-typed')) return;
    subtitle.setAttribute('data-typed', 'true');

    subtitle.textContent = '';
    subtitle.style.borderRight = '2px solid var(--primary)';

    let i = 0;
    const speed = 50;

    const type = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Pause, then delete
            setTimeout(() => {
                deleteText();
            }, 1000);
        }
    };

    const deleteText = () => {
        if (i > 0) {
            subtitle.textContent = subtitle.textContent.slice(0, -1);
            i--;
            setTimeout(deleteText, speed / 2);
        } else {
            // Restart cycle
            subtitle.removeAttribute('data-typed');
            subtitle.style.borderRight = 'none';
            i = 0;
            setTimeout(type, 500);
        }
    };

    setTimeout(type, 500);
};

// ===========================================
// Scroll Reveal Animations with Stagger
// ===========================================
const initScrollReveal = () => {
    if (prefersReducedMotion.matches) return;

    const revealElements = document.querySelectorAll(
        '.about-text p, .skill-category, .project-card, .stat, .contact-form, .about-stats > div'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });
};

// ===========================================
// Project Card Interactive Hover Effects
// ===========================================
const initProjectCardEffects = () => {
    document.querySelectorAll('.project-card').forEach((card, index) => {
        const image = card.querySelector('.project-image');
        const placeholder = card.querySelector('.placeholder');
        const content = card.querySelector('.project-content');

        // Enhanced tilt effect on mouse move
        if (!prefersReducedMotion.matches) {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                // Tilt the card
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

                // Move the image
                if (placeholder) {
                    placeholder.style.transform = `translate(${ (x - centerX) / 10 }px, ${ (y - centerY) / 10 }px )`;
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                if (placeholder) {
                    placeholder.style.transform = '';
                }
            });
        }

        // Staggered reveal on enter
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
};

// ===========================================
// Skill Tags Hover Expansion
// ===========================================
const initSkillEffects = () => {
    document.querySelectorAll('.skill-category li').each((tag, index) => {
        tag.style.transition = 'all 0.3s ease';
        tag.style.transform = 'translateY(0)';

        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-3px) scale(1.05)';
            tag.style.boxShadow = '0 5px 15px rgba(74, 144, 226, 0.3)';
        });

        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
            tag.style.boxShadow = 'none';
        });
    });
};

// ===========================================
// Form Enhancements
// ===========================================
const initFormEffects = () => {
    const formGroups = document.querySelectorAll('.form-group');

    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');

        if (!input || !label) return;

        // Input focus effect
        input.addEventListener('focus', () => {
            group.style.borderColor = 'var(--primary)';
            group.style.boxShadow = '0 0 0 3px rgba(74, 144, 226, 0.1)';
            if (label) {
                label.style.color = 'var(--primary)';
                label.style.top = '0';
                label.style.left = '20px';
            }
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                group.style.borderColor = '#e9ecef';
                group.style.boxShadow = 'none';
                if (label) {
                    label.style.color = 'var(--secondary)';
                    label.style.top = '50%';
                    label.style.left = '20px';
                }
            }
        });

        // Initial state check
        if (input.value) {
            input.dispatchEvent(new Event('blur'));
        }
    });
};

// ===========================================
// Custom Scrollbar Styling
// ===========================================
const initCustomScrollbar = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const scrollbarColor = prefersDark ? '#4a90e2' : '#e9ecef';
    const scrollbarTrackColor = prefersDark ? 'rgba(74, 144, 226, 0.1)' : '#f1f3f4';

    const style = document.createElement('style');
    style.textContent = `
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        ::-webkit-scrollbar-track {
            background: ${scrollbarTrackColor};
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb {
            background: ${scrollbarColor};
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: var(--primary);
        }
    `;
    document.head.appendChild(style);
};

// ===========================================
// Notification System (Enhanced)
// ===========================================
function showNotification(message, type = 'success', duration = 5000) {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    // Check if reduced motion is preferred
    const animationDuration = prefersReducedMotion.matches ? 0 : 300;

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.animationDuration = `${animationDuration}ms`;

    // Accessible notification
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    notification.setAttribute('aria-atomic', 'true');

    // Style
    const colors = {
        success: { background: '#28a745', borderColor: '#28a745' },
        error: { background: '#dc3545', borderColor: '#dc3545' },
        warning: { background: '#ffc107', color: '#212529', borderColor: '#ffc107' },
        info: { background: '#17a2b8', borderColor: '#17a2b8' }
    };

    const color = colors[type] || colors.success;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        background: ${color.background};
        border: 1px solid ${color.borderColor};
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
        animation: slideIn ${animationDuration}ms ease;
        ${color.borderColor ? 'border: 1px solid ' + color.borderColor : ''}
    `;

    // Add close button for accessibility
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.2s;
    `;
    closeBtn.addEventListener('mouseenter', () => closeBtn.style.opacity = '1');
    closeBtn.addEventListener('mouseleave', () => closeBtn.style.opacity = '0.7');
    closeBtn.addEventListener('click', () => notification.remove());
    notification.appendChild(closeBtn);

    document.body.appendChild(notification);

    // Auto-remove after duration
    setTimeout(() => {
        notification.style.animation = `slideOut ${animationDuration}ms ease forwards`;
        setTimeout(() => notification.remove(), animationDuration);
    }, duration);
}

// Add keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    .burger.toggle .line1 { transform: rotate(45deg) translate(5px, 5px); }
    .burger.toggle .line2 { opacity: 0; }
    .burger.toggle .line3 { transform: rotate(-45deg) translate(5px, -5px); }
`;
document.head.appendChild(style);

// ===========================================
// Intersection Observer for Scroll Animations
// ===========================================
const initObserverAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transitionTimingFunction = reduceMotion;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and key elements
    document.querySelectorAll('section, .skill-category, .project-card, .about-stats > div').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ${reduceMotion} ease ${index * 0.05}s, transform 0.6s ${reduceMotion} ease ${index * 0.05}s`;
        observer.observe(el);
    });
};

// ===========================================
// Scroll to Top Button
// ===========================================
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
        scrollToTopBtn.style.transform = 'translateY(0)';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
        scrollToTopBtn.style.transform = 'translateY(20px)';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
});

// ===========================================
// Initialize All Effects on DOM Content Loaded
// ===========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize reduced motion check first
    // (prefersReducedMotion is already set at top)

    // Initialize animations respecting user preferences
    initScrollReveal();
    initObserverAnimations();

    // Only initialize enhanced effects if not reduced motion
    if (!prefersReducedMotion.matches) {
        initTypingEffect();
        initProjectCardEffects();
        initSkillEffects();
        initCustomScrollbar();
    }

    // Always initialize these
    initFormEffects();
    initScrollAnimations();

    // Form submission handler (kept from original)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            } catch (error) {
                showNotification('Failed to send message. Please try again later.', 'error');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});

// ===========================================
// Page Load Animation
// ===========================================
window.addEventListener('load', () => {
    // Hero content fade-in
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');

    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease forwards';
    }
    if (heroImage) {
        heroImage.style.animation = 'fadeInUp 1s ease 0.3s forwards';
    }

    // Preloader (if you want to add later)
    // const loader = document.querySelector('.loader');
    // if (loader) {
    //     loader.style.opacity = '0';
    //     setTimeout(() => loader.remove(), 300);
    // }
});

console.log('Portfolio loaded with enhanced animations! 🚀');

// Helper function for initializing scroll animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-aos]');

    const aosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        aosObserver.observe(el);
    });
}