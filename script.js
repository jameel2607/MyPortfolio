// =====================
// FORM VALIDATION & SUBMISSION
// =====================

const contactForm = document.querySelector('.contact-form');
const formStatus = document.querySelector('.form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Reset status
        formStatus.textContent = '';
        formStatus.className = 'form-status';

        // Validation
        if (!name || !email || !message) {
            formStatus.textContent = '❌ All fields are required';
            formStatus.style.color = '#dc2626';
            return;
        }

        if (!isValidEmail(email)) {
            formStatus.textContent = '❌ Please enter a valid email';
            formStatus.style.color = '#dc2626';
            return;
        }

        if (message.length < 10) {
            formStatus.textContent = '❌ Message must be at least 10 characters';
            formStatus.style.color = '#dc2626';
            return;
        }

        // Show loading state
        formStatus.textContent = '📤 Sending...';
        formStatus.style.color = '#4f46e5';

        try {
            // Send email using Formspree
            const response = await fetch('https://formspree.io/f/xdalkvbl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message,
                }),
            });

            if (response.ok) {
                formStatus.textContent = '✅ Message sent successfully! I\'ll get back to you soon.';
                formStatus.style.color = '#10b981';
                contactForm.reset();
                
                // Clear success message after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                }, 5000);
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            formStatus.textContent = '❌ Error sending message. Please try again or email directly.';
            formStatus.style.color = '#dc2626';
            console.error('Form error:', error);
        }
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// =====================
// ACTIVE NAVIGATION HIGHLIGHTING
// =====================

const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

// Create an intersection observer to detect which section is in view
const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0,
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Remove active class from all links
            navLinks.forEach((link) => {
                link.classList.remove('active');
            });

            // Add active class to matching link
            const activeLink = document.querySelector(
                `.nav-links a[href="#${entry.target.id}"]`
            );
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, observerOptions);

// Observe all sections
sections.forEach((section) => {
    observer.observe(section);
});

// Add smooth scroll behavior for nav clicks
navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// =====================
// MOBILE MENU (OPTIONAL ENHANCEMENT)
// =====================
// If you add a hamburger menu button in the future, 
// you can add mobile menu toggle logic here
