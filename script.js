// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        // Create mobile nav if it doesn't exist
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
            
            // Add to the DOM
            document.body.appendChild(mobileNav);
            
            // Style the mobile navigation
            mobileNav.style.position = 'fixed';
            mobileNav.style.top = '0';
            mobileNav.style.left = '0';
            mobileNav.style.width = '100%';
            mobileNav.style.height = '100vh';
            mobileNav.style.backgroundColor = 'var(--bg-color)';
            mobileNav.style.zIndex = '1000';
            mobileNav.style.display = 'flex';
            mobileNav.style.flexDirection = 'column';
            mobileNav.style.justifyContent = 'center';
            mobileNav.style.alignItems = 'center';
            mobileNav.style.transform = 'translateY(-100%)';
            mobileNav.style.transition = 'transform 0.3s ease';
            
            // Style the close button
            closeBtn.style.position = 'absolute';
            closeBtn.style.top = '20px';
            closeBtn.style.right = '20px';
            closeBtn.style.fontSize = '40px';
            closeBtn.style.cursor = 'pointer';
            
            // Style the nav links inside mobile menu
            navLinksClone.style.display = 'flex';
            navLinksClone.style.flexDirection = 'column';
            navLinksClone.style.alignItems = 'center';
            navLinksClone.style.gap = '20px';
            
            // Make the links bigger for touch
            const links = navLinksClone.querySelectorAll('a');
            links.forEach(link => {
                link.style.fontSize = '1.5rem';
                link.style.padding = '15px';
            });
            
            // Close button functionality
            closeBtn.addEventListener('click', function() {
                mobileNav.style.transform = 'translateY(-100%)';
            });
            
            // Links should also close the menu when clicked
            links.forEach(link => {
                link.addEventListener('click', function() {
                    mobileNav.style.transform = 'translateY(-100%)';
                });
            });
        }
        
        // Toggle mobile nav visibility
        const mobileNav = document.querySelector('.mobile-nav');
        mobileNav.style.transform = 'translateY(0)';
    });
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Get the target element
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                e.preventDefault();
                
                // Smooth scroll to target
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Project filter functionality (for projects page)
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-showcase');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get the filter value
                const filter = this.getAttribute('data-filter');
                
                // Show/hide projects based on filter
                projectCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'flex';
                    } else {
                        // Check if the project has the tag
                        const tags = card.querySelectorAll('.project-tags span');
                        let hasTag = false;
                        
                        tags.forEach(tag => {
                            if (tag.textContent.toLowerCase() === filter.toLowerCase()) {
                                hasTag = true;
                            }
                        });
                        
                        card.style.display = hasTag ? 'flex' : 'none';
                    }
                });
            });
        });
    }
});

// Simple form validation (for contact form if added later)
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const formFields = contactForm.querySelectorAll('input, textarea');
            
            formFields.forEach(field => {
                if (field.hasAttribute('required') && !field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
                
                // Basic email validation
                if (field.type === 'email' && field.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        isValid = false;
                        field.classList.add('error');
                    }
                }
            });
            
            if (isValid) {
                // Normally, you would submit the form to a server here
                // For now, just show a success message
                const formContainer = contactForm.parentElement;
                formContainer.innerHTML = '<div class="success-message"><h3>Thank you!</h3><p>Your message has been sent successfully.</p></div>';
            }
        });
    }
});