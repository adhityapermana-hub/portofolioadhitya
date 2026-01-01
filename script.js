// Main JavaScript for Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    // Remove loading screen after page loads
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);

    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Change active nav link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Initialize Skills
    initializeSkills();
    
    // Initialize Portfolio
    initializePortfolio();
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Terima kasih! Pesan Anda telah dikirim. Saya akan menghubungi Anda segera.');
            this.reset();
        });
    }
    
    // Animate skill bars when they come into view
    const skillItems = document.querySelectorAll('.skill-item');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillProgress = entry.target.querySelector('.skill-progress');
                const percentage = skillProgress.getAttribute('data-percentage');
                skillProgress.style.width = percentage + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Add scroll animations for elements
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.skill-item, .portfolio-item, .about-img-container');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    // Call functions
    animateOnScroll();
});

// Initialize Skills with Data
function initializeSkills() {
    const skillsData = [
        { name: "HTML/CSS", percentage: 95, icon: "fab fa-html5", color: "#e34f26" },
        { name: "JavaScript", percentage: 90, icon: "fab fa-js", color: "#f7df1e" },
        { name: "React", percentage: 88, icon: "fab fa-react", color: "#61dafb" },
        { name: "Node.js", percentage: 85, icon: "fab fa-node-js", color: "#339933" },
        { name: "UI/UX Design", percentage: 92, icon: "fas fa-palette", color: "#ff6b6b" },
        { name: "Python", percentage: 80, icon: "fab fa-python", color: "#3776ab" },
        { name: "Git/Github", percentage: 90, icon: "fab fa-git-alt", color: "#f05032" },
        { name: "Database Management", percentage: 85, icon: "fas fa-database", color: "#00758f" }
    ];
    
    const skillsContainer = document.querySelector('.skills-container');
    
    if (skillsContainer) {
        skillsData.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            
            skillItem.innerHTML = `
                <div class="skill-header">
                    <div class="skill-icon">
                        <i class="${skill.icon}"></i>
                    </div>
                    <div class="skill-name">${skill.name}</div>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" data-percentage="${skill.percentage}"></div>
                </div>
                <div class="skill-percentage">${skill.percentage}%</div>
            `;
            
            skillsContainer.appendChild(skillItem);
        });
    }
}

// Initialize Portfolio with Data
function initializePortfolio() {
    const portfolioData = [
        { title: "E-commerce Website", description: "Website e-commerce dengan React dan Node.js", category: "web", icon: "fas fa-shopping-cart" },
        { title: "Mobile Banking App", description: "Aplikasi mobile banking untuk iOS dan Android", category: "mobile", icon: "fas fa-mobile-alt" },
        { title: "Dashboard Analytics", description: "Dashboard analitik dengan visualisasi data real-time", category: "web", icon: "fas fa-chart-line" },
        { title: "UI/UX Redesign", description: "Redesign UI/UX untuk aplikasi perusahaan", category: "design", icon: "fas fa-paint-brush" },
        { title: "Social Media App", description: "Aplikasi sosial media dengan fitur chat real-time", category: "mobile", icon: "fas fa-users" },
        { title: "Landing Page Modern", description: "Landing page modern dengan animasi dan responsif", category: "design", icon: "fas fa-laptop" }
    ];
    
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (portfolioGrid) {
        // Render portfolio items
        portfolioData.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = `portfolio-item ${item.category}`;
            
            portfolioItem.innerHTML = `
                <div class="portfolio-img" style="background-color: ${getRandomColor()}">
                    <i class="${item.icon}"></i>
                </div>
                <div class="portfolio-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <span class="portfolio-tag">${getCategoryName(item.category)}</span>
                </div>
            `;
            
            portfolioGrid.appendChild(portfolioItem);
        });
        
        // Add filter functionality
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                const portfolioItems = document.querySelectorAll('.portfolio-item');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// Helper functions
function getRandomColor() {
    const colors = [
        'rgba(59, 130, 246, 0.1)',
        'rgba(139, 92, 246, 0.1)',
        'rgba(16, 185, 129, 0.1)',
        'rgba(245, 158, 11, 0.1)',
        'rgba(239, 68, 68, 0.1)',
        'rgba(99, 102, 241, 0.1)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function getCategoryName(category) {
    const categories = {
        'web': 'Web Development',
        'design': 'UI/UX Design',
        'mobile': 'Mobile Apps'
    };
    return categories[category] || category;
}