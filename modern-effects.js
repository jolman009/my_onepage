/**
 * Modern Visual Effects and Enhanced Interactions
 * Add this file to your HTML after the main script.js file
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create scroll progress indicator
    createScrollProgress();
    
    // Initialize animations
    initializeAnimations();
    
    // Add background elements
    addBackgroundElements();
    
    // Apply advanced hover effects
    applyCardHoverEffects();
    
    // Initialize the smooth scrolling
    initSmoothScrolling();
    
    // Initialize animated burger menu
    initAnimatedBurger();
    
    // Add dynamic clip paths for project cards
    enhanceProjectCards();
});

/**
 * Creates a scroll progress indicator at the top of the page
 */
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = scrollPercentage + '%';
    });
}

/**
 * Initialize scroll-triggered animations using Intersection Observer
 */
function initializeAnimations() {
    // Add data-animate attribute to elements that should animate
    const elementsToAnimate = [
        {selector: '.section-title', attribute: 'data-animate="fade-in"'},
        {selector: '.project-card', attribute: 'data-animate="fade-in"'},
        {selector: '.skill-category', attribute: 'data-animate="fade-in"'},
        {selector: '.cta-content', attribute: 'data-animate="fade-in"'}
    ];
    
    elementsToAnimate.forEach(item => {
        document.querySelectorAll(item.selector).forEach(element => {
            if (!element.hasAttribute('data-animate')) {
                element.setAttribute('data-animate', item.attribute.split('=')[1].replace(/"/g, ''));
            }
        });
    });
    
    // Set up Intersection Observer
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Only animate once
                animateObserver.unobserve(entry.target);
            }
        });
    }, {threshold: 0.2});
    
    // Observe all elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(element => {
        animateObserver.observe(element);
    });
}

/**
 * Add dynamic background elements for visual interest
 */
function addBackgroundElements() {
    const sections = [document.querySelector('.hero'), document.querySelector('.skills')];
    
    sections.forEach(section => {
        if (section) {
            // Create first background element
            const bgElement1 = document.createElement('div');
            bgElement1.className = 'bg-element bg-element-1';
            section.appendChild(bgElement1);
            
            // Create second background element
            const bgElement2 = document.createElement('div');
            bgElement2.className = 'bg-element bg-element-2';
            section.appendChild(bgElement2);
        }
    });
}

/**
 * Apply advanced hover effects to cards with 3D perspective
 */
function applyCardHoverEffects() {
    const cards = document.querySelectorAll('.project-card, .skill-category');
    
    cards.forEach(card => {
        card.classList.add('card-hover-effect');
        
        // Add 3D tilt effect on mouse move
        card.addEventListener('mousemove', e => {
            // Get position of mouse relative to card
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation values based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = ((x - centerX) / centerX) * 5; // Max 5deg rotation
            const rotateX = ((centerY - y) / centerY) * 5; // Max 5deg rotation
            
            // Apply rotation and other effects
            card.style.setProperty('--card-rotate-y', `${rotateY}deg`);
            card.style.setProperty('--card-rotate-x', `${rotateX}deg`);
            
            // Adjust shadow based on rotation (create dynamic lighting effect)
            const shadowX = (rotateY / 5) * 10;
            const shadowY = (rotateX / 5) * 10;
            card.style.setProperty('--card-shadow-color', `rgba(0, 0, 0, ${0.3 + Math.abs(rotateY) / 50})`);
        });
        
        // Reset on mouse leave
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--card-rotate-y', '0deg');
            card.style.setProperty('--card-rotate-x', '0deg');
            card.style.setProperty('--card-translate-y', '-10px');
            card.style.setProperty('--card-shadow-color', 'rgba(0, 0, 0, 0.3)');
        });
    });
}

/**
 * Initialize smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Add highlight effect to target section
                targetElement.style.animation = 'none';
                setTimeout(() => {
                    targetElement.style.animation = 'highlight 1.5s ease';
                }, 10);
                
                // Calculate header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;
                
                // Smooth scroll to target with offset
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize animated burger menu icon
 */
function initAnimatedBurger() {
    const hamburger = document.querySelector('.hamburger');
    
    if (hamburger) {
        // Replace existing hamburger with animated version
        const parent = hamburger.parentNode;
        const animatedBurger = document.createElement('div');
        animatedBurger.className = 'animated-burger';
        animatedBurger.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        `;
        
        parent.replaceChild(animatedBurger, hamburger);
        
        // Add click event
        animatedBurger.addEventListener('click', function() {
            this.classList.toggle('open');
            
            // Get any existing showMobileNav function from the main script
            if (typeof showMobileNav === 'function') {
                showMobileNav();
            } else {
                // Fallback implementation
                const mobileNav = document.querySelector('.mobile-nav');
                if (mobileNav) {
                    if (this.classList.contains('open')) {
                        mobileNav.style.transform = 'translateY(0)';
                    } else {
                        mobileNav.style.transform = 'translateY(-100%)';
                    }
                }
            }
        });
    }
}

/**
 * Apply enhanced visual effects to project cards
 */
function enhanceProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add glass morphism to project cards
        const projectDetails = card.querySelector('.project-details');
        if (projectDetails) {
            projectDetails.classList.add('glass-card');
        }
        
        // Add image zoom effect to project images
        const projectImg = card.querySelector('.project-img');
        if (projectImg) {
            projectImg.classList.add('img-hover-zoom');
        }
        
        // Add gradient text effect to project titles
        const projectTitle = card.querySelector('.project-title');
        if (projectTitle) {
            projectTitle.classList.add('text-gradient');
        }
    });
}

/**
 * Creates a parallax scrolling effect for elements
 */
function createParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const offset = scrollPosition * speed;
            
            element.style.transform = `translateY(${offset}px)`;
        });
    });
}

/**
 * Add text typing animation to specified elements
 * @param {string} selector - CSS selector for elements to animate
 * @param {number} speed - Typing speed in milliseconds
 */
function addTypingAnimation(selector, speed = 100) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--primary-color)';
        
        let charIndex = 0;
        
        function typeChar() {
            if (charIndex < text.length) {
                element.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, speed);
            } else {
                element.style.borderRight = 'none';
            }
        }
        
        typeChar();
    });
}

/**
 * Apply a "morph" animation between two shapes on hover
 * @param {string} selector - CSS selector for elements to apply effect to
 */
function applyShapeMorphing(selector) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
        // Set initial clip path
        element.style.clipPath = 'circle(50% at 50% 50%)';
        element.style.transition = 'clip-path 0.5s ease';
        
        element.addEventListener('mouseenter', () => {
            element.style.clipPath = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.clipPath = 'circle(50% at 50% 50%)';
        });
    });
}

/**
 * Create a floating action button with specified options
 * @param {Object} options - Configuration options
 */
function createFloatingButton(options = {}) {
    const defaults = {
        icon: 'arrow-up',
        position: 'bottom-right',
        backgroundColor: 'var(--primary-color)',
        textColor: 'white',
        action: () => window.scrollTo({ top: 0, behavior: 'smooth' })
    };
    
    const config = { ...defaults, ...options };
    
    const button = document.createElement('button');
    button.className = `floating-button ${config.position}`;
    button.innerHTML = `<i class="fas fa-${config.icon}"></i>`;
    
    Object.assign(button.style, {
        position: 'fixed',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: config.backgroundColor,
        color: config.textColor,
        border: 'none',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        cursor: 'pointer',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'all 0.3s ease',
        opacity: 0,
        visibility: 'hidden'
    });
    
    // Set position based on config
    if (config.position.includes('bottom')) {
        button.style.bottom = '20px';
    } else {
        button.style.top = '20px';
    }
    
    if (config.position.includes('right')) {
        button.style.right = '20px';
    } else {
        button.style.left = '20px';
    }
    
    button.addEventListener('click', config.action);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    document.body.appendChild(button);
    return button;
}

// Wait for page to fully load before initializing scroll-to-top button
window.addEventListener('load', function() {
    // Create scroll-to-top button
    createFloatingButton();
});