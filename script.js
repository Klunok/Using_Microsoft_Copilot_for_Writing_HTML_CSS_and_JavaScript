/* ===========================
   Interactive Features with JavaScript
   Showcasing: DOM Manipulation, Event Handling, ES6 Basics
   =========================== */

// Counter functionality
let counterValue = 0;

function incrementCounter() {
    counterValue++;
    updateCounterDisplay();
}

function decrementCounter() {
    counterValue--;
    updateCounterDisplay();
}

function resetCounter() {
    counterValue = 0;
    updateCounterDisplay();
}

function updateCounterDisplay() {
    const display = document.getElementById('counter-display');
    display.textContent = counterValue;
    display.style.animation = 'none';
    setTimeout(() => {
        display.style.animation = 'pulse 0.3s ease';
    }, 10);
}

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(style);

// Development tips array
const devTips = [
    "Always use semantic HTML elements for better accessibility.",
    "CSS Grid and Flexbox are powerful tools for modern layouts.",
    "Use const and let instead of var in JavaScript for better scoping.",
    "Test your websites on different devices and screen sizes.",
    "Keep your CSS organized and use meaningful class names.",
    "Use CSS variables to maintain consistent colors throughout your site.",
    "Write clean, readable code with proper indentation and comments.",
    "Optimize images for the web to improve page loading speed.",
    "Use the browser DevTools to debug your code efficiently.",
    "Practice responsive design with mobile-first approach.",
    "Learn about JavaScript closures to master advanced concepts.",
    "Use meaningful variable names to make your code self-documenting.",
    "Test your forms with different inputs to ensure validation works.",
    "Use event delegation for better performance with multiple elements.",
    "Keep your functions small and focused on a single task.",
];

function showTip() {
    const randomIndex = Math.floor(Math.random() * devTips.length);
    const tip = devTips[randomIndex];
    const dynamicText = document.getElementById('dynamic-text');
    
    dynamicText.style.opacity = '0';
    setTimeout(() => {
        dynamicText.textContent = `💡 ${tip}`;
        dynamicText.style.opacity = '1';
    }, 150);
}

// Dark mode toggle functionality
let isDarkMode = false;

function toggleTheme() {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme preference on page load
function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        isDarkMode = true;
        document.body.classList.add('dark-mode');
    }
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    loadThemePreference();
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (!name || !email || !message) {
                showFormMessage('Please fill in all fields.', 'error');
                return;
            }
            
            // Email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showFormMessage('Message sent successfully! Thank you for reaching out.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Log form data (in real scenario, this would be sent to a server)
            console.log('Form submitted:', { name, email, message });
        });
    }
});

// Form message display
function showFormMessage(message, type) {
    const messageElement = document.getElementById('form-message');
    messageElement.textContent = message;
    messageElement.className = `form-message ${type}`;
    
    // Hide message after 5 seconds
    setTimeout(() => {
        messageElement.className = 'form-message';
    }, 5000);
}

// Intersection Observer for animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add slide up animation
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(animationStyle);

// Observe cards for animation
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.project-card, .skill-card, .info-card');
    cards.forEach(card => {
        observer.observe(card);
    });
});

// Smooth transition for dynamic text
const textStyle = document.createElement('style');
textStyle.textContent = `
    #dynamic-text {
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(textStyle);

// Update progress bars on scroll
window.addEventListener('scroll', function() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight && !bar.classList.contains('animated')) {
            bar.classList.add('animated');
        }
    });
});

// Add active state to navigation links on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key closes any open modals (placeholder for future use)
    if (e.key === 'Escape') {
        console.log('Escape key pressed');
    }
    
    // Add more keyboard shortcuts as needed
});

// Prevent form submission with Enter in input fields (allows only in textarea)
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"]');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
            }
        });
    });
});

// Log initial load
console.log('Portfolio loaded successfully!');
console.log('Technologies used: HTML5, CSS3, Vanilla JavaScript');
