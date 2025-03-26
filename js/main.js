document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
      });
      
      // Close mobile menu when clicking on a nav link
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
        });
      });
    }
    
    // Theme Toggler
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-toggle__icon');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    // Apply saved theme or default to light
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
      if (themeIcon) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    }
    
    // Toggle theme on click
    if (themeToggle && themeIcon) {
      themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
          localStorage.setItem('theme', 'dark');
          themeIcon.classList.remove('fa-sun');
          themeIcon.classList.add('fa-moon');
        } else {
          localStorage.setItem('theme', 'light');
          themeIcon.classList.remove('fa-moon');
          themeIcon.classList.add('fa-sun');
        }
      });
    }
    
    // Header scroll effect
    const header = document.querySelector('.site-header');
    
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
    }
    
    // Portfolio/Projects Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item, .project-card');
    
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
      filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          // Remove active class from all buttons
          filterButtons.forEach(btn => btn.classList.remove('active'));
          
          // Add active class to clicked button
          button.classList.add('active');
          
          const filterValue = button.getAttribute('data-filter');
          
          // Filter items
          portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
              item.style.display = 'block';
              setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
              }, 50);
            } else {
              item.style.opacity = '0';
              item.style.transform = 'scale(0.8)';
              setTimeout(() => {
                item.style.display = 'none';
              }, 300);
            }
          });
        });
      });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') !== '#') {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            // Get header height for offset
            const headerHeight = document.querySelector('.site-header').offsetHeight;
            
            window.scrollTo({
              top: targetElement.offsetTop - headerHeight,
              behavior: 'smooth'
            });
          }
        }
      });
    });
    
    // Animate on scroll
    const animateElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up, .reveal-down, .reveal-scale, .reveal-rotate');
    
    if (animateElements.length > 0) {
      // Check if element is in viewport
      function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
          rect.bottom >= 0
        );
      }
      
      // Function to handle scroll animation
      function handleScrollAnimation() {
        animateElements.forEach(element => {
          if (isInViewport(element)) {
            element.classList.add('revealed');
          }
        });
      }
      
      // Initial check
      handleScrollAnimation();
      
      // Listen for scroll event
      window.addEventListener('scroll', handleScrollAnimation);
    }
    
    // Project gallery thumbnails
    const thumbnails = document.querySelectorAll('.project-detail__thumbnail');
    const mainImage = document.querySelector('.project-detail__main-image img');
    
    if (thumbnails.length > 0 && mainImage) {
      thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
          // Update main image src
          mainImage.src = thumbnail.src.replace('Thumbnail', 'Main');
          
          // Remove active class from all thumbnails
          thumbnails.forEach(thumb => thumb.classList.remove('active'));
          
          // Add active class to clicked thumbnail
          thumbnail.classList.add('active');
          
          // Add animation to main image
          mainImage.classList.add('fade-in');
          setTimeout(() => {
            mainImage.classList.remove('fade-in');
          }, 500);
        });
      });
    }
    
    // Form validation
    const contactForm = document.querySelector('.contact__form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            isValid = false;
            field.classList.add('is-invalid');
          } else {
            field.classList.remove('is-invalid');
          }
        });
        
        // Email validation
        const emailField = contactForm.querySelector('input[type="email"]');
        if (emailField && emailField.value) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(emailField.value)) {
            isValid = false;
            emailField.classList.add('is-invalid');
          }
        }
        
        if (isValid) {
          // Here you would normally submit the form with AJAX
          // For demo purposes, just show a success message
          const formFields = contactForm.querySelectorAll('input, textarea');
          formFields.forEach(field => field.value = '');
          
          const successMessage = document.createElement('div');
          successMessage.className = 'alert alert-success';
          successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent successfully!';
          
          contactForm.appendChild(successMessage);
          
          setTimeout(() => {
            successMessage.remove();
          }, 5000);
        }
      });
      
      // Remove invalid class on input
      contactForm.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('input', function() {
          if (this.value.trim()) {
            this.classList.remove('is-invalid');
          }
        });
      });
    }
    
    // Skill bars animation
    const skillBars = document.querySelectorAll('.progress__bar');
    
    if (skillBars.length > 0) {
      function animateSkillBars() {
        skillBars.forEach(bar => {
          const percentage = bar.parentElement.nextElementSibling.textContent;
          bar.style.width = '0';
          
          setTimeout(() => {
            bar.style.width = percentage;
          }, 100);
        });
      }
      
      // Observe skill section
      const skillsSection = document.querySelector('#skills');
      if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              animateSkillBars();
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.3 });
        
        observer.observe(skillsSection);
      }
    }
    
    // Active navigation link based on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length > 0 && navLinks.length > 0) {
      window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        
        sections.forEach(section => {
          const sectionTop = section.offsetTop - headerHeight - 100;
          const sectionHeight = section.offsetHeight;
          
          if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
          }
        });
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
          }
        });
      });
    }

    const sliders = document.querySelectorAll('.project-slider');
  
  sliders.forEach(slider => {
    const slides = slider.querySelectorAll('.slide');
    const indicators = slider.querySelectorAll('.indicator');
    const prevBtn = slider.querySelector('.prev-slide');
    const nextBtn = slider.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 5000; // Auto-advance every 5 seconds
    
    // Function to show specific slide
    function showSlide(index) {
      // Remove active class from all slides and indicators
      slides.forEach(slide => slide.classList.remove('active'));
      indicators.forEach(indicator => indicator.classList.remove('active'));
      
      // Handle index wrapping
      if (index >= slides.length) {
        currentSlide = 0;
      } else if (index < 0) {
        currentSlide = slides.length - 1;
      } else {
        currentSlide = index;
      }
      
      // Add active class to current slide and indicator
      slides[currentSlide].classList.add('active');
      indicators[currentSlide].classList.add('active');
    }
    
    // Next slide handler
    function nextSlide() {
      showSlide(currentSlide + 1);
    }
    
    // Previous slide handler
    function prevSlide() {
      showSlide(currentSlide - 1);
    }
    
    // Set up button click handlers
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
      });
    }
    
    // Set up indicator click handlers
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        showSlide(index);
        resetInterval();
      });
    });
    
    // Set up keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        resetInterval();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        resetInterval();
      }
    });
    
    // Set up touch swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
    
    function handleSwipe() {
      // Detect left or right swipe
      if (touchEndX < touchStartX - 50) {
        // Swiped left (next)
        nextSlide();
        resetInterval();
      } else if (touchEndX > touchStartX + 50) {
        // Swiped right (previous)
        prevSlide();
        resetInterval();
      }
    }
    
    // Auto-advance slides
    function startInterval() {
      slideInterval = setInterval(() => {
        nextSlide();
      }, intervalTime);
    }
    
    function resetInterval() {
      clearInterval(slideInterval);
      startInterval();
    }
    
    // Initialize the slider
    showSlide(0);
    startInterval();
    
    // Pause auto-advance when hovering over slider
    slider.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
      startInterval();
    });
  });
});