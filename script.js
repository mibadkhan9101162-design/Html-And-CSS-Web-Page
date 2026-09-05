document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    const navClose = document.getElementById('navClose');
    const navLinks = document.querySelectorAll('.nav__link');

    const openNav = () => {
        nav.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeNav = () => {
        nav.classList.remove('active');
        document.body.style.overflow = '';
    };

    navToggle.addEventListener('click', openNav);
    navClose.addEventListener('click', closeNav);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeNav();
        });
    });

    // Close nav when clicking outside
    nav.addEventListener('click', (e) => {
        if (e.target === nav) {
            closeNav();
        }
    });

    // Header background on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // Active nav links on scroll
    const sections = document.querySelectorAll('section');
    const navLinkItems = document.querySelectorAll('.nav__link');

    const setActiveNav = () => {
        let index = sections.length;

        while (--index && window.scrollY + 100 < sections[index].offsetTop) {}
        navLinkItems.forEach(link => link.classList.remove('active'));
        sections[index].getAttribute('id') && 
            (document.querySelector('.nav__link[href="#' + sections[index].getAttribute('id') + '"]'))?.classList.add('active');
    };

    setActiveNav();
    window.addEventListener('scroll', setActiveNav);

    // Number counter animation
    const counters = document.querySelectorAll('[data-target]');

    const updateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 200;

        if (count < target) {
            counter.innerText = Math.min(Math.ceil(count + increment), target);
            setTimeout(() => updateCounter(counter), 10);
        }
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    counter.innerText = '0';
                    updateCounter(counter);
                });
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter.closest('.stat'));
    });

    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.testimonial__dot');
    let currentTestimonial = 0;
    let testimonialInterval;

    const showTestimonial = (index) => {
        testimonials.forEach(t => t.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        currentTestimonial = index;
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
    };

    const nextTestimonial = () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    };

    const startAutoPlay = () => {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    };

    const stopAutoPlay = () => {
        clearInterval(testimonialInterval);
    };

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            stopAutoPlay();
            showTestimonial(parseInt(dot.getAttribute('data-slide')));
            startAutoPlay();
        });
    });

    // Start testimonials auto-play
    if (testimonials.length > 0) {
        showTestimonial(0);
        startAutoPlay();
    }

    // Scroll to top button
    const scrollTop = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTop.classList.add('active');
        } else {
            scrollTop.classList.remove('active');
        }
    });

    scrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Contact form validation and submission
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        let isValid = true;
        let errorMessage = '';

        if (!name.value.trim()) {
            isValid = false;
            errorMessage = 'Please enter your full name.';
        } else if (email.value && !/^\S+@\S+\.\S+$/.test(email.value.trim())) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        } else if (phone.value && !/^[\d\s\-\+\(\)]+$/.test(phone.value.trim())) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number.';
        }

        if (!isValid) {
            alert(errorMessage);
            return;
        }

        // Show success message
        alert('Thank you for your message! We will contact you shortly.');
        contactForm.reset();
    });

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]');
        
        if (email.value && /^\S+@\S+\.\S+$/.test(email.value.trim())) {
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        } else {
            alert('Please enter a valid email address.');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = 70;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .project-card, .about__image');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize elements for animation
    document.querySelectorAll('.service-card, .project-card, .about__image').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});
