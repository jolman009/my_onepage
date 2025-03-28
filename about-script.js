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
    
    // Project Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the filter value
            const filter = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                card.classList.remove('filtered-in', 'filtered-out');
                
                // Get a small delay for the animation
                setTimeout(() => {
                    if (filter === 'all') {
                        card.style.display = 'flex';
                        card.classList.add('filtered-in');
                    } else {
                        // Check if card has the selected category
                        const categories = card.getAttribute('data-categories').split(',');
                        if (categories.includes(filter)) {
                            card.style.display = 'flex';
                            card.classList.add('filtered-in');
                        } else {
                            card.classList.add('filtered-out');
                            // Hide after animation completes
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 400);
                        }
                    }
                }, 10);
            });
        });
    });
    
    // Expandable Project Details
    const expandButtons = document.querySelectorAll('.expand-btn');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const expandedContent = this.parentElement.querySelector('.project-expanded-content');
            const icon = this.querySelector('i');
            
            expandedContent.classList.toggle('active');
            
            if (expandedContent.classList.contains('active')) {
                this.querySelector('span').textContent = 'Hide Details';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                this.querySelector('span').textContent = 'View Details';
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });
    
    // Staggered animation for project cards
    function animateProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }
    
    // Initialize the animation
    animateProjectCards();
    
    // Responsive image handling
    function checkResponsiveImages() {
        const windowWidth = window.innerWidth;
        const projectImgs = document.querySelectorAll('.image-placeholder');
        
        projectImgs.forEach(img => {
            // Adjust height based on screen size
            if (windowWidth <= 576) {
                img.style.height = '180px';  // Smaller height on mobile
            } else {
                img.style.height = '200px';  // Default height
            }
        });
    }
    
    // Run on page load and resize
    checkResponsiveImages();
    window.addEventListener('resize', checkResponsiveImages);
    
    // Enhance touch targets for mobile
    function enhanceTouchTargets() {
        const buttons = document.querySelectorAll('.btn, .filter-btn, .expand-btn');
        const windowWidth = window.innerWidth;
        
        if (windowWidth <= 768) {
            buttons.forEach(button => {
                button.style.minHeight = '44px';
                button.style.minWidth = '44px';
                button.style.padding = button.classList.contains('btn-small') ? '10px 15px' : '12px 20px';
            });
        } else {
            buttons.forEach(button => {
                button.style.minHeight = '';
                button.style.minWidth = '';
                button.style.padding = '';
            });
        }
    }
    
    // Run on page load and resize
    enhanceTouchTargets();
    window.addEventListener('resize', enhanceTouchTargets);
    
    // Lazy loading for project cards
    function lazyLoadProjects() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('filtered-in');
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            observer.observe(card);
        });
    }
    
    // Initialize lazy loading
    lazyLoadProjects();
});