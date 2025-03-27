document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeSwitch = document.getElementById('theme-switch');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    // Apply saved theme or default to light
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            themeSwitch.checked = true;
        }
    }
    
    // Theme switch event listener
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Bio Expandable Content
    const expandBtn = document.querySelector('.expand-btn');
    const expandedContent = document.querySelector('.expanded-content');
    const expandIcon = expandBtn.querySelector('i');
    
    expandBtn.addEventListener('click', function() {
        expandedContent.classList.toggle('active');
        
        if (expandedContent.classList.contains('active')) {
            expandBtn.querySelector('span').textContent = 'Read Less';
            expandIcon.classList.remove('fa-chevron-down');
            expandIcon.classList.add('fa-chevron-up');
        } else {
            expandBtn.querySelector('span').textContent = 'Read More';
            expandIcon.classList.remove('fa-chevron-up');
            expandIcon.classList.add('fa-chevron-down');
        }
    });
    
    // Skills Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show the corresponding panel
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-panel`).classList.add('active');
        });
    });
    
    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-level');
    
    // Initialize skill bars with width 0
    skillBars.forEach(bar => {
        bar.style.width = '0';
    });
    
    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get the target width from the style attribute
                const targetWidth = entry.target.getAttribute('style').split('width: ')[1].split('%)')[0];
                
                // Set a small timeout for animation to trigger after the card animation
                setTimeout(() => {
                    entry.target.style.width = `${targetWidth}%`;
                }, 300);
                
                // Unobserve after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe each skill bar
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
    
    // Contact Form Validation and Submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            let isValid = true;
            const formFields = contactForm.querySelectorAll('input, textarea');
            
            formFields.forEach(field => {
                if (field.hasAttribute('required') && !field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Add error styling
                    field.style.borderColor = 'var(--accent-color)';
                    
                    // Remove error styling on input
                    field.addEventListener('input', function() {
                        if (field.value.trim()) {
                            field.classList.remove('error');
                            field.style.borderColor = 'var(--border-color)';
                        }
                    });
                } else {
                    field.classList.remove('error');
                }
                
                // Email validation
                if (field.type === 'email' && field.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        isValid = false;
                        field.classList.add('error');
                        field.style.borderColor = 'var(--accent-color)';
                    }
                }
            });
            
            if (isValid) {
                // Simulate form submission with loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.textContent;
                
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate API call with setTimeout
                setTimeout(() => {
                    // Replace form with success message
                    const formContainer = contactForm.parentElement;
                    
                    // Create success message
                    const successMessage = document.createElement('div');
                    successMessage.classList.add('success-message');
                    successMessage.innerHTML = `
                        <div class="success-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h3>Message Sent!</h3>
                        <p>Thank you for your message. I'll get back to you as soon as possible.</p>
                    `;
                    
                    // Style the success message
                    successMessage.style.textAlign = 'center';
                    successMessage.style.padding = '30px';
                    
                    const successIcon = successMessage.querySelector('.success-icon');
                    successIcon.style.fontSize = '4rem';
                    successIcon.style.color = 'var(--primary-color)';
                    successIcon.style.marginBottom = '15px';
                    
                    // Replace form with success message
                    formContainer.innerHTML = '';
                    formContainer.appendChild(successMessage);
                    
                    // Add animation
                    successMessage.animate([
                        { opacity: 0, transform: 'translateY(20px)' },
                        { opacity: 1, transform: 'translateY(0)' }
                    ], {
                        duration: 500,
                        easing: 'ease-out',
                        fill: 'forwards'
                    });
                }, 2000); // 2-second simulation
            }
        });
    }
    
    // Add hover effect to grid items
    const gridItems = document.querySelectorAll('.grid-item');
    
    gridItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Add a subtle glow effect
            this.style.boxShadow = '0 10px 30px var(--shadow-color), 0 0 10px var(--primary-color, rgba(52, 152, 219, 0.2))';
        });
        
        item.addEventListener('mouseleave', function() {
            // Restore original shadow
            this.style.boxShadow = '0 5px 15px var(--shadow-color)';
        });
    });
    
    // Interactive timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Make the timeline marker larger and change color
            const marker = this.querySelector('.timeline-marker');
            marker.style.transform = 'scale(1.3)';
            marker.style.backgroundColor = 'var(--accent-color)';
            
            // Highlight the current item
            this.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            // Restore original styles
            const marker = this.querySelector('.timeline-marker');
            marker.style.transform = 'scale(1)';
            marker.style.backgroundColor = 'var(--timeline-color)';
            
            // Remove highlight
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Interest item interactions
    const interestItems = document.querySelectorAll('.interest-item');
    
    interestItems.forEach(item => {
        item.addEventListener('click', function() {
            // Create a pulse animation
            const icon = this.querySelector('.interest-icon');
            icon.animate([
                { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(52, 152, 219, 0.4)' },
                { transform: 'scale(1.2)', boxShadow: '0 0 0 10px rgba(52, 152, 219, 0)' }
            ], {
                duration: 800,
                iterations: 1
            });
        });
    });
    
    // Add scroll-to-contact functionality
    const contactLinks = document.querySelectorAll('a[href="#contact"]');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the contact section
            const contactSection = document.getElementById('contact');
            
            // Scroll to contact section with smooth behavior
            contactSection.scrollIntoView({ behavior: 'smooth' });
            
            // Add a highlight effect
            contactSection.style.animation = 'none';
            setTimeout(() => {
                contactSection.style.animation = 'highlight 1.5s ease';
            }, 10);
        });
    });
    
    // Add highlight animation to stylesheet
    const style = document.createElement('style');
    style.textContent = `
        @keyframes highlight {
            0% { background-color: var(--card-bg); }
            30% { background-color: rgba(52, 152, 219, 0.1); }
            100% { background-color: var(--card-bg); }
        }
    `;
    document.head.appendChild(style);
});