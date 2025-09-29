// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// Navigation
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Active navigation link
function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Particles Animation
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random size between 2-6px
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Random horizontal position
        particle.style.left = Math.random() * 100 + '%';

        // Random animation duration between 4-8s
        const duration = Math.random() * 4 + 4;
        particle.style.animationDuration = duration + 's';

        // Random delay
        particle.style.animationDelay = Math.random() * 5 + 's';

        particlesContainer.appendChild(particle);
    }
}

// Call particles function when page loads
document.addEventListener('DOMContentLoaded', createParticles);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            // Animate skill levels
            if (entry.target.classList.contains('skill-item')) {
                const skillLevel = entry.target.querySelector('.skill-level');
                const level = skillLevel.getAttribute('data-level');
                setTimeout(() => {
                    skillLevel.style.setProperty('--width', level + '%');
                    skillLevel.querySelector('::after') ||
                    (skillLevel.style.background = `linear-gradient(to right,
                        linear-gradient(135deg, #667eea 0%, #764ba2 100%) 0% ${level}%,
                        rgba(255, 255, 255, 0.1) ${level}% 100%)`);
                }, 200);
            }

            // Animate counters
            if (entry.target.classList.contains('stat-item')) {
                const counter = entry.target.querySelector('.stat-number');
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.skill-item, .stat-item, .project-card, .timeline-item');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});

// Counter animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 20);
}

// Skill level animation with proper CSS
function animateSkillLevels() {
    const skillLevels = document.querySelectorAll('.skill-level');

    skillLevels.forEach(skill => {
        const level = skill.getAttribute('data-level');
        skill.style.position = 'relative';
        skill.style.overflow = 'hidden';

        // Create the animated bar
        const bar = document.createElement('div');
        bar.style.height = '100%';
        bar.style.width = '0%';
        bar.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        bar.style.borderRadius = '4px';
        bar.style.transition = 'width 2s ease-out';
        bar.style.position = 'absolute';
        bar.style.top = '0';
        bar.style.left = '0';

        skill.appendChild(bar);

        // Animate when in view
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        bar.style.width = level + '%';
                    }, 200);
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        skillObserver.observe(skill);
    });
}

// Call skill animation function
document.addEventListener('DOMContentLoaded', animateSkillLevels);

// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Validate form data
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Create mailto link
    const mailtoLink = `mailto:freemanscrib803@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

    // Try to open email client
    try {
        window.location.href = mailtoLink;

        // Reset form after a short delay
        setTimeout(() => {
            contactForm.reset();
        }, 1000);

        // Show success message
        showNotification('Opening your email client...', 'success');
    } catch (error) {
        // Fallback: copy email details to clipboard
        const emailContent = `To: freemanscrib803@gmail.com\nSubject: ${subject}\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

        navigator.clipboard.writeText(emailContent).then(() => {
            showNotification('Email details copied to clipboard!', 'success');
        }).catch(() => {
            showNotification('Please email freemanscrib803@gmail.com manually', 'info');
        });
    }
});

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    const backgrounds = {
        success: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        error: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
        info: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)'
    };

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${backgrounds[type] || backgrounds.success};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-visual, .animated-bg');

    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add floating animation to cards
function addFloatingAnimation() {
    const floatingCards = document.querySelectorAll('.floating-card');

    floatingCards.forEach((card, index) => {
        card.style.animation = `float 6s ease-in-out infinite`;
        card.style.animationDelay = `${index * 2}s`;
    });
}

// Call floating animation
document.addEventListener('DOMContentLoaded', addFloatingAnimation);

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        const titleName = document.querySelector('.title-name');
        if (titleName) {
            const originalText = titleName.textContent;
            typeWriter(titleName, originalText, 80);
        }
    }, 1000);
});

// Add hover effects to project cards
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotateX(5deg)';
            card.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.3)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0deg)';
            card.style.boxShadow = 'none';
        });
    });
});

// Add click ripple effect
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
    `;

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Cursor trail effect
function createCursorTrail() {
    const trail = [];
    const trailLength = 10;

    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - i / trailLength};
            transition: all 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }

    document.addEventListener('mousemove', (e) => {
        trail.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.left = e.clientX + 'px';
                dot.style.top = e.clientY + 'px';
            }, index * 20);
        });
    });
}

// Initialize cursor trail on desktop
if (window.innerWidth > 768) {
    createCursorTrail();
}

// Lazy loading for images and heavy content
const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;

            // Add loaded class for animations
            target.classList.add('loaded');

            lazyObserver.unobserve(target);
        }
    });
});

// Observe elements for lazy loading
document.addEventListener('DOMContentLoaded', () => {
    const lazyElements = document.querySelectorAll('.project-card, .skill-category, .timeline-item');
    lazyElements.forEach(el => lazyObserver.observe(el));
});

console.log('🚀 Modern Portfolio Loaded Successfully!');
console.log('✨ Welcome to John Paul Nicolasora\'s AI Automation Portfolio');
console.log('🤖 Built with cutting-edge web technologies');