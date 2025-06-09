console.log('Portfolio script starting...');

// Simple theme manager
let currentTheme = 'light';

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing theme system...');
    
    const themeToggle = document.getElementById('themeToggle');
    console.log('Theme toggle found:', !!themeToggle);
    
    if (!themeToggle) {
        console.error('Theme toggle button not found!');
        return;
    }
    
    // Initialize theme from localStorage or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // Add click event
    themeToggle.addEventListener('click', function() {
        console.log('Theme toggle clicked!');
        toggleTheme();
    });
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize mobile menu
    initMobileMenu();
    
    console.log('Theme system initialized successfully');
});

function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    console.log('Switching from', currentTheme, 'to', newTheme);
    setTheme(newTheme);
}

function setTheme(theme) {
    console.log('Setting theme to:', theme);
    
    document.documentElement.setAttribute('data-theme', theme);
    currentTheme = theme;
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    // Update button icon
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            if (theme === 'dark') {
                icon.className = 'fas fa-sun';
                themeToggle.setAttribute('aria-label', 'Toggle light mode');
            } else {
                icon.className = 'fas fa-moon';
                themeToggle.setAttribute('aria-label', 'Toggle dark mode');
            }
        }
    }
    
    console.log('Theme set to:', theme);
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
}

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

console.log('Portfolio script loaded successfully!'); 