/**
 * Responsive Utilities JavaScript
 * Enhances the responsive behavior of the website
 */
document.addEventListener('DOMContentLoaded', function() {
    // ===== Responsive Navigation =====
    function setupResponsiveNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        // Skip if no hamburger menu (already handled in main script)
        if (!hamburger) return;
        
        // Create and show mobile navigation
        function showMobileNav() {
            // Only create if it doesn't exist
            if (!document.querySelector('.mobile-nav')) {
                const mobileNav = document.createElement('div');
                mobileNav.classList.add('mobile-nav');
                
                // Clone the navigation links
                const navLinksClone = navLinks.cloneNode(true);
                mobileNav.appendChild(navLinksClone);
                
                // Add close button
                const closeBtn = document.createElement('div');
                closeBtn.classList.add('close-btn');
                closeBtn.innerHTML = '&times;';
                mobileNav.prepend(closeBtn);
                
                // Add theme toggle if it exists
                const themeToggle = document.querySelector('.theme-toggle');
                if (themeToggle) {
                    const themeToggleClone = themeToggle.cloneNode(true);
                    themeToggleClone.classList.add('mobile-theme-toggle');
                    mobileNav.appendChild(themeToggleClone);
                    
                    // Make the clone functional
                    const switchClone = themeToggleClone.querySelector('#theme-switch');
                    if (switchClone) {
                        // Sync with the original switch
                        const originalSwitch = document.querySelector('#theme-switch');
                        switchClone.checked = originalSwitch.checked;
                        
                        // Add event listener
                        switchClone.addEventListener('change', function() {
                            // Update the original switch
                            originalSwitch.checked = this.checked;
                            // Trigger the change event on the original
                            originalSwitch.dispatchEvent(new Event('change'));
                        });
                    }
                }
                
                // Style mobile nav
                Object.assign(mobileNav.style, {
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100vh',
                    backgroundColor: 'var(--bg-color)',
                    zIndex: '1000',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: 'translateY(-100%)',
                    transition: 'transform 0.3s ease'
                });
                
                // Style close button
                Object.assign(closeBtn.style, {
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    fontSize: '40px',
                    cursor: 'pointer',
                    color: 'var(--text-color)'
                });
                
                // Style nav links in mobile view
                Object.assign(navLinksClone.style, {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px'
                });
                
                // Style mobile theme toggle
                if (themeToggleClone) {
                    Object.assign(themeToggleClone.style, {
                        margin: '30px 0',
                        justifyContent: 'center'
                    });
                }
                
                // Make links larger for touch
                const mobileLinks = navLinksClone.querySelectorAll('a');
                mobileLinks.forEach(link => {
                    Object.assign(link.style, {
                        fontSize: '1.5rem',
                        padding: '15px',
                        display: 'block'
                    });
                });
                
                // Add to DOM
                document.body.appendChild(mobileNav);
                
                // Close button functionality
                closeBtn.addEventListener('click', function() {
                    mobileNav.style.transform = 'translateY(-100%)';
                });
                
                // Link clicks should close menu too
                mobileLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        mobileNav.style.transform = 'translateY(-100%)';
                    });
                });
            }
            
            // Show the mobile nav
            const mobileNav = document.querySelector('.mobile-nav');
            mobileNav.style.transform = 'translateY(0)';
        }
        
        // Toggle mobile nav when hamburger is clicked
        hamburger.addEventListener('click', showMobileNav);
    }
    
    // ===== Responsive Images =====
    function setupResponsiveImages() {
        const images = document.querySelectorAll('img:not([loading])');
        
        // Add lazy loading to images
        images.forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Add intrinsic aspect ratio if dimensions are known
            if (img.width && img.height) {
                img.style.aspectRatio = `${img.width} / ${img.height}`;
            }
        });
    }
    
    // ===== Enhanced Touch Interactions =====
    function enhanceTouchInteractions() {
        const interactiveElements = document.querySelectorAll(
            'button, .btn, a.btn, input[type="submit"], input[type="button"], .filter-btn, .expand-btn'
        );
        
        // Check if user is on touch device
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        if (isTouch) {
            interactiveElements.forEach(el => {
                // Ensure larger touch targets
                if (getComputedStyle(el).getPropertyValue('min-height') < '44px') {
                    el.style.minHeight = '44px';
                }
                
                if (getComputedStyle(el).getPropertyValue('min-width') < '44px') {
                    el.style.minWidth = '44px';
                }
                
                // Add hover effect on touch
                el.addEventListener('touchstart', function() {
                    this.classList.add('touch-active');
                });
                
                el.addEventListener('touchend', function() {
                    this.classList.remove('touch-active');
                });
            });
        }
    }
    
    // ===== Responsive Form Elements =====
    function setupResponsiveForms() {
        const formElements = document.querySelectorAll('input, textarea, select');
        
        formElements.forEach(el => {
            // Make sure inputs are large enough
            if (window.innerWidth <= 768) {
                el.style.fontSize = '16px'; // Prevent zoom on iOS
                el.style.padding = '12px 15px';
            }
            
            // Add better focus styles
            el.addEventListener('focus', function() {
                this.parentElement.classList.add('input-focused');
            });
            
            el.addEventListener('blur', function() {
                this.parentElement.classList.remove('input-focused');
            });
        });
    }
    
    // ===== Responsive Typography =====
    function setupResponsiveTypography() {
        // Calculate root font size based on viewport width
        function updateFontSize() {
            const minWidth = 320;
            const maxWidth = 1200;
            const minFontSize = 16;
            const maxFontSize = 19;
            
            const width = window.innerWidth;
            
            // If beyond min/max range, use the fixed values
            if (width <= minWidth) {
                document.documentElement.style.fontSize = minFontSize + 'px';
                return;
            }
            
            if (width >= maxWidth) {
                document.documentElement.style.fontSize = maxFontSize + 'px';
                return;
            }
            
            // Linear interpolation
            const fontSize = minFontSize + (maxFontSize - minFontSize) * 
                ((width - minWidth) / (maxWidth - minWidth));
            
            document.documentElement.style.fontSize = fontSize + 'px';
        }
        
        // Run on page load and resize
        updateFontSize();
        window.addEventListener('resize', updateFontSize);
    }
    
    // ===== Responsive Grid Layouts =====
    function setupResponsiveGrids() {
        function updateGrids() {
            const width = window.innerWidth;
            
            // About Grid
            const aboutGrid = document.querySelector('.about-grid');
            if (aboutGrid) {
                if (width < 576) {
                    // Mobile - single column
                    aboutGrid.style.gridTemplateColumns = '1fr';
                } else if (width < 768) {
                    // Small tablets - two columns
                    aboutGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                } else if (width < 992) {
                    // Tablets - six columns
                    aboutGrid.style.gridTemplateColumns = 'repeat(6, 1fr)';
                } else {
                    // Desktop - twelve columns
                    aboutGrid.style.gridTemplateColumns = 'repeat(12, 1fr)';
                }
            }
            
            // Projects Grid
            const projectsGrid = document.querySelector('.projects-grid');
            if (projectsGrid) {
                if (width < 768) {
                    // Mobile - single column
                    projectsGrid.style.gridTemplateColumns = '1fr';
                } else if (width < 992) {
                    // Tablets - two columns
                    projectsGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                } else if (width < 1200) {
                    // Desktop - three columns
                    projectsGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
                } else {
                    // Large desktop - four columns
                    projectsGrid.style.gridTemplateColumns = 'repeat(4, 1fr)';
                }
            }
        }
        
        // Run on page load and resize
        updateGrids();
        window.addEventListener('resize', updateGrids);
    }
    
    // ===== Responsive Animations =====
    function setupResponsiveAnimations() {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            // Disable animations
            const styleElement = document.createElement('style');
            styleElement.textContent = `
                * {
                    animation-duration: 0.001s !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.001s !important;
                    scroll-behavior: auto !important;
                }
            `;
            document.head.appendChild(styleElement);
            
            // Remove animations from specific elements
            const animatedElements = document.querySelectorAll(
                '.filtered-in, .filtered-out, .project-card, .grid-item, .skill-level'
            );
            
            animatedElements.forEach(el => {
                el.style.animation = 'none';
                el.style.transition = 'none';
            });
        }
    }
    
    // ===== Safe Area Insets (for notched devices) =====
    function setupSafeAreaInsets() {
        // Only if CSS environment variables are supported
        if (CSS.supports('padding-top: env(safe-area-inset-top)')) {
            // Apply safe area insets to relevant elements
            const header = document.querySelector('header');
            if (header) {
                header.style.paddingTop = 'env(safe-area-inset-top)';
                header.style.paddingLeft = 'env(safe-area-inset-left)';
                header.style.paddingRight = 'env(safe-area-inset-right)';
            }
            
            const footer = document.querySelector('footer');
            if (footer) {
                footer.style.paddingBottom = 'env(safe-area-inset-bottom)';
                footer.style.paddingLeft = 'env(safe-area-inset-left)';
                footer.style.paddingRight = 'env(safe-area-inset-right)';
            }
        }
    }
    
    // ===== Initialize all responsive enhancements =====
    setupResponsiveNavigation();
    setupResponsiveImages();
    enhanceTouchInteractions();
    setupResponsiveForms();
    setupResponsiveTypography();
    setupResponsiveGrids();
    setupResponsiveAnimations();
    setupSafeAreaInsets();
    
    // ===== Handle Orientation Changes =====
    window.addEventListener('orientationchange', function() {
        // Short delay to let the browser adjust
        setTimeout(function() {
            setupResponsiveGrids();
            enhanceTouchInteractions();
            setupResponsiveForms();
        }, 200);
    });
    
    // ===== Debug Function for Responsive Testing =====
    window.checkResponsiveBreakpoint = function() {
        const width = window.innerWidth;
        let breakpoint = 'xs';
        
        if (width >= 1200) breakpoint = 'xl';
        else if (width >= 992) breakpoint = 'lg';
        else if (width >= 768) breakpoint = 'md';
        else if (width >= 576) breakpoint = 'sm';
        
        console.log(`Current breakpoint: ${breakpoint} (${width}px)`);
        return breakpoint;
    };
});