// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Change hamburger to X
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }
    
    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans.forEach(span => span.classList.remove('active'));
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const icon = otherItem.querySelector('.faq-toggle i');
                    if (icon) icon.className = 'fas fa-plus';
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            
            // Change icon
            const icon = item.querySelector('.faq-toggle i');
            if (icon) {
                if (item.classList.contains('active')) {
                    icon.className = 'fas fa-minus';
                } else {
                    icon.className = 'fas fa-plus';
                }
            }
        });
    });
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let isAnimating = false;
    
    function showSlide(index) {
        if (isAnimating) return;
        isAnimating = true;
        
        // Hide all testimonials with fade out
        testimonials.forEach(testimonial => {
            testimonial.style.opacity = '0';
            testimonial.style.transform = 'translateY(20px)';
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current testimonial with fade in after a short delay
        setTimeout(() => {
            testimonials.forEach(testimonial => {
                testimonial.style.display = 'none';
            });
            
            if (testimonials[index]) {
                testimonials[index].style.display = 'block';
                
                // Trigger reflow
                void testimonials[index].offsetWidth;
                
                testimonials[index].style.opacity = '1';
                testimonials[index].style.transform = 'translateY(0)';
                dots[index].classList.add('active');
            }
            
            setTimeout(() => {
                isAnimating = false;
            }, 300);
        }, 300);
    }
    
    // Initialize slider
    if (testimonials.length > 0) {
        // Set initial styles
        testimonials.forEach((testimonial, i) => {
            if (i !== 0) {
                testimonial.style.display = 'none';
            }
            testimonial.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        });
        
        showSlide(currentSlide);
        
        // Add click event to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                if (currentSlide !== index && !isAnimating) {
                    currentSlide = index;
                    showSlide(currentSlide);
                }
            });
        });
        
        // Auto slide every 5 seconds
        setInterval(function() {
            if (!isAnimating) {
                currentSlide = (currentSlide + 1) % testimonials.length;
                showSlide(currentSlide);
            }
        }, 5000);
    }
    
    // Form Submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Add focus and blur events for form inputs
        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        formInputs.forEach(input => {
            // Add focused class to parent when input is focused
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            // Remove focused class when input loses focus
            input.addEventListener('blur', function() {
                if (this.value === '') {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Check if input already has value on page load
            if (input.value !== '') {
                input.parentElement.classList.add('focused');
            }
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send the form data to a server
            // For this demo, we'll just show a success message
            
            const formData = new FormData(contactForm);
            let formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            console.log('Form submitted with values:', formValues);
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitButton.disabled = true;
            
            // Simulate server request
            setTimeout(() => {
                // Show success message
                contactForm.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Thank you for your interest!</h3>
                        <p>We've received your information and will be in touch soon.</p>
                        <a href="#" class="cta-button gradient" onclick="window.location.reload(); return false;">Back to Home</a>
                    </div>
                `;
            }, 1500);
        });
    }
    
    // Add animation on scroll
    const animatedElements = document.querySelectorAll('.feature-card, .step, .pricing-card, .benefits-column');
    
    function checkScroll() {
        const triggerPosition = window.innerHeight / 1.2;
        
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            
            if (elementPosition < triggerPosition) {
                element.classList.add('animate');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Add floating effect to hero image
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        let floatY = 0;
        let floatDirection = 1;
        
        function floatAnimation() {
            floatY += 0.1 * floatDirection;
            
            if (floatY > 10) {
                floatDirection = -1;
            } else if (floatY < 0) {
                floatDirection = 1;
            }
            
            heroImage.style.transform = `translateY(${floatY}px)`;
            requestAnimationFrame(floatAnimation);
        }
        
        floatAnimation();
    }
    
    // Add parallax effect to hero section
    const hero = document.getElementById('hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < window.innerHeight) {
                hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
            }
        });
    }
    
    // Add animation classes to CSS
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .step, .pricing-card, .benefits-column {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.animate, .step.animate, .pricing-card.animate, .benefits-column.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature-card:nth-child(2), .step:nth-child(2), .pricing-card:nth-child(2) {
            transition-delay: 0.1s;
        }
        
        .feature-card:nth-child(3), .step:nth-child(3), .pricing-card:nth-child(3) {
            transition-delay: 0.2s;
        }
        
        .feature-card:nth-child(4) {
            transition-delay: 0.3s;
        }
        
        .feature-card:nth-child(5) {
            transition-delay: 0.4s;
        }
        
        .feature-card:nth-child(6) {
            transition-delay: 0.5s;
        }
        
        .success-message {
            text-align: center;
            padding: 3rem;
            animation: fadeIn 0.5s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .success-message i {
            font-size: 4rem;
            color: var(--primary-color);
            margin-bottom: 1.5rem;
            display: inline-block;
            animation: scaleIn 0.5s ease;
        }
        
        @keyframes scaleIn {
            from { transform: scale(0); }
            to { transform: scale(1); }
        }
        
        .success-message h3 {
            margin-bottom: 1rem;
            font-size: 1.8rem;
        }
        
        .success-message p {
            margin-bottom: 2rem;
            color: #666;
        }
        
        .success-message .cta-button {
            display: inline-block;
            margin-top: 1rem;
        }
        
        .hamburger span.active:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger span.active:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger span.active:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .form-group.focused label {
            color: var(--primary-color);
            transform: translateY(-5px);
            font-size: 0.8rem;
        }
        
        .form-group label {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}); 