/**
 * Aqua Haven Swim - Core JavaScript logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar Effect on Scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Hero Carousel Logic ---
    const carouselItems = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const prevControl = document.querySelector('.carousel-control.prev');
    const nextControl = document.querySelector('.carousel-control.next');
    
    if(carouselItems.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        const showSlide = (index) => {
            // Check bounds
            if (index >= carouselItems.length) currentSlide = 0;
            else if (index < 0) currentSlide = carouselItems.length - 1;
            else currentSlide = index;

            // Remove active class
            carouselItems.forEach(item => item.classList.remove('active'));
            indicators.forEach(ind => ind.classList.remove('active'));

            // Add active class to precise index
            carouselItems[currentSlide].classList.add('active');
            indicators[currentSlide].classList.add('active');
        };

        const nextSlide = () => showSlide(currentSlide + 1);
        const prevSlide = () => showSlide(currentSlide - 1);

        // Event Listeners for controls
        if (nextControl) nextControl.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
        
        if (prevControl) prevControl.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        // Event Listeners for indicator dots
        indicators.forEach((ind, i) => {
            ind.addEventListener('click', () => {
                showSlide(i);
                resetInterval();
            });
        });

        // Auto-play interval
        const startInterval = () => {
            slideInterval = setInterval(nextSlide, 5000); // 5 seconds
        };

        const resetInterval = () => {
            clearInterval(slideInterval);
            startInterval();
        };

        // Start auto-play initially
        startInterval();
    }
    // --- End Carousel Logic ---

    // 2. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    // Apply observation to relevant sections and cards
    const animElements = document.querySelectorAll(
        '.section-title, .section-subtitle, .about-content, .about-image, .service-card, .pricing-card, .community-grid > div'
    );
    
    animElements.forEach(el => {
        el.classList.add('fade-up-element');
        observer.observe(el);
    });

    // 3. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Toggle icon between bars and times
        const icon = hamburger.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

        // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 4. Multi-Step Booking Modal Logic
    const bookingModal = document.getElementById('bookingModal');
    
    // Safety check in case modal HTML isn't loaded on this specific page yet
    if (bookingModal) {
        const bookNowButtons = document.querySelectorAll('a[href="#contact"], a[href="index.html#contact"]');
        const closeModalBtns = document.querySelectorAll('.modal-close, .modal-close-btn');
        const nextBtns = document.querySelectorAll('.btn-next');
        const prevBtns = document.querySelectorAll('.btn-prev');
        const submitBookingBtn = document.getElementById('submitBooking');
        const progressSteps = document.querySelectorAll('.progress-step');
        const progressLines = document.querySelectorAll('.progress-line');
        const formSteps = document.querySelectorAll('.form-step');
        
        let currentStep = 1;

        // Open Modal
        bookNowButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if(btn.textContent.trim() === 'Book Now') {
                    e.preventDefault();
                    bookingModal.classList.remove('hidden');
                    // Reset to step 1
                    currentStep = 1;
                    updateFormSteps();
                    document.body.style.overflow = 'hidden'; // Prevent background scrolling
                }
            });
        });

        // Close Modal
        const closeModal = () => {
            bookingModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        };

        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', closeModal);
        });

        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) {
                closeModal();
            }
        });

        // Navigation Next
        nextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (validateStep(currentStep)) {
                    currentStep++;
                    updateFormSteps();
                }
            });
        });

        // Navigation Prev
        prevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                currentStep--;
                updateFormSteps();
            });
        });

        // Update UI based on currentStep
        const updateFormSteps = () => {
            // Update Forms
            formSteps.forEach(step => {
                step.classList.remove('active');
                step.classList.add('hidden');
            });
            
            const currentFormObj = document.getElementById(`step${currentStep}`);
            if (currentFormObj) {
                currentFormObj.classList.remove('hidden');
                currentFormObj.classList.add('active');
            } else if (currentStep === 4) {
                // Success Step
                document.getElementById('stepSuccess').classList.remove('hidden');
                document.getElementById('stepSuccess').classList.add('active');
            }

            // Update Progress Bar
            progressSteps.forEach((step, idx) => {
                if (idx < currentStep) {
                    step.classList.add('active');
                    if(idx < currentStep - 1) {
                         step.classList.add('completed');
                    }
                } else {
                    step.classList.remove('active', 'completed');
                }
            });

            progressLines.forEach((line, idx) => {
                if (idx < currentStep - 1) {
                    line.classList.add('filled');
                } else {
                    line.classList.remove('filled');
                }
            });
        };

        // Basic Validation
        const validateStep = (step) => {
            let isValid = true;
            const currentFormObj = document.getElementById(`step${step}`);
            if(!currentFormObj) return true;

            const inputs = currentFormObj.querySelectorAll('input[required], select[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.closest('.form-group').classList.add('has-error');
                    isValid = false;
                } else {
                    input.closest('.form-group').classList.remove('has-error');
                    
                    // Specific email validation
                    if (input.type === 'email' && !input.value.includes('@')) {
                        input.closest('.form-group').classList.add('has-error');
                        isValid = false;
                    }
                }
            });
            
            // Remove error state on input
            inputs.forEach(input => {
                input.addEventListener('input', () => {
                    if (input.value.trim()) {
                        input.closest('.form-group').classList.remove('has-error');
                    }
                }, { once: true });
            });

            return isValid;
        };

        // Handle Payment Method Toggle (Show/Hide M-Pesa Instructions)
        const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
        const mpesaInstructions = document.getElementById('mpesaInstructions');
        
        paymentRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.value === 'mpesa') {
                    mpesaInstructions.classList.remove('hidden');
                } else {
                    mpesaInstructions.classList.add('hidden');
                }
            });
        });

        // Submit Booking
        if (submitBookingBtn) {
            submitBookingBtn.addEventListener('click', () => {
                const isMpesa = document.querySelector('input[name="paymentMethod"]:checked').value === 'mpesa';
                const transactionCode = document.getElementById('transactionCode');
                
                if (isMpesa && (!transactionCode || !transactionCode.value.trim())) {
                    transactionCode.closest('.form-group').classList.add('has-error');
                    alert('Please enter your M-Pesa transaction code.');
                    return;
                }
                
                // Simulate API call and success
                const previousBtnText = submitBookingBtn.innerHTML;
                submitBookingBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
                submitBookingBtn.disabled = true;
                
                setTimeout(() => {
                    submitBookingBtn.innerHTML = previousBtnText;
                    submitBookingBtn.disabled = false;
                    currentStep = 4; // Move to Success state
                    updateFormSteps();
                }, 1500);
            });
        }
    }
});
