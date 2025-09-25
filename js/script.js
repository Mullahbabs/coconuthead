// Wait for DOM to be fully parsed
document.addEventListener("DOMContentLoaded", function () {
  // Detect mobile devices
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  // Show loading indicator on mobile
  if (isMobile) {
    document.body.classList.add("loading");
  }

  // Initialize everything after window load
  window.addEventListener("load", function () {
    // Remove loading indicator
    document.body.classList.remove("loading");

    // Initialize all components
    initNavbar();
    initMobileMenu();
    initCarousel();
    initAnimations();
    initNewsletter();

    // Mobile-specific optimizations
    if (isMobile) {
      optimizeForMobile();
    }
  });

  // Navbar scroll effect
  function initNavbar() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    let scrollTimeout;

    function updateNavbar() {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    // Throttle scroll events
    window.addEventListener("scroll", function () {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(function () {
          scrollTimeout = null;
          updateNavbar();
        }, 100);
      }
    });

    // Initial update
    updateNavbar();
  }

  // Mobile menu toggle
  function initMobileMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.innerHTML = navLinks.classList.contains("active")
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });
  }

  // Carousel functionality
  function initCarousel() {
    const carouselItems = document.querySelectorAll(".carousel-item");
    const indicators = document.querySelectorAll(".indicator");

    if (carouselItems.length === 0) return;

    let currentSlide = 0;
    let slideInterval;

    function showSlide(n) {
      // Remove active class from all slides and indicators
      carouselItems.forEach((item) => item.classList.remove("active"));
      indicators.forEach((indicator) => indicator.classList.remove("active"));

      // Update current slide
      currentSlide = (n + carouselItems.length) % carouselItems.length;

      // Add active class to current slide and indicator
      carouselItems[currentSlide].classList.add("active");
      indicators[currentSlide].classList.add("active");
    }

    function nextSlide() {
      showSlide(currentSlide + 1);
    }

    // Set up automatic sliding with mobile optimization
    function startCarousel() {
      const intervalTime = isMobile ? 8000 : 5000;
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, intervalTime);
    }

    // Add click events to indicators
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        clearInterval(slideInterval);
        showSlide(index);
        startCarousel();
      });
    });

    // Initialize carousel
    startCarousel();
  }

  // Animated statistics counter
  function initAnimations() {
    // Set initial styles for animated elements
    function setInitialStyles() {
      document
        .querySelectorAll(".animated, .delay-1, .delay-2, .delay-3")
        .forEach((element) => {
          element.style.opacity = 0;
          element.style.transform = "translateY(20px)";
          element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        });

      document.querySelectorAll(".values-card").forEach((card) => {
        card.style.opacity = 0;
        card.style.transform = "translateY(30px)";
      });
    }

    // Improved statistics counter without recursion
    function animateStats() {
      const statElements = document.querySelectorAll(".stat-number");
      if (statElements.length === 0) return;

      statElements.forEach((statElement) => {
        const target = parseInt(statElement.getAttribute("data-target")) || 0;
        let count = 0;
        const duration = 2000; // 2 seconds total
        const steps = 100;
        const increment = target / steps;
        const interval = duration / steps;

        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            count = target;
            clearInterval(timer);
          }
          statElement.textContent = Math.round(count);
        }, interval);
      });
    }

    // Throttle function for scroll events
    function throttle(func, wait) {
      let timeout = null;
      let previous = 0;

      return function () {
        const now = Date.now();
        const remaining = wait - (now - previous);

        if (remaining <= 0 || remaining > wait) {
          if (timeout) {
            clearTimeout(timeout);
            timeout = null;
          }
          previous = now;
          func.apply(this, arguments);
        } else if (!timeout) {
          timeout = setTimeout(() => {
            previous = Date.now();
            timeout = null;
            func.apply(this, arguments);
          }, remaining);
        }
      };
    }

    // Animation on scroll
    function checkScroll() {
      statBoxes.forEach((box) => {
        const position = box.getBoundingClientRect();
        if (position.top < window.innerHeight - 100) {
          box.classList.add("animate");
        }
      });
      // For stat boxes, team members, timeline items
      const statBoxes = document.querySelectorAll(".stat-box");
      statBoxes.forEach((box) => {
        const position = box.getBoundingClientRect();
        if (position.top < window.innerHeight - 100) {
          box.classList.add("animate");
        }
      });

      const teamMembers = document.querySelectorAll(".team-member");
      teamMembers.forEach((member) => {
        const position = member.getBoundingClientRect();
        if (position.top < window.innerHeight - 100) {
          member.classList.add("animate");
        }
      });

      const timelineItems = document.querySelectorAll(".timeline-item");
      timelineItems.forEach((item) => {
        const position = item.getBoundingClientRect();
        if (position.top < window.innerHeight - 100) {
          item.classList.add("animate");
        }
      });

      // For value cards
      const cards = document.querySelectorAll(".value-card");
      cards.forEach((card, index) => {
        const position = card.getBoundingClientRect();
        if (position.top < window.innerHeight - 100) {
          card.style.transition = `opacity 0.5s ease ${
            index * 0.2
          }s, transform 0.5s ease ${index * 0.2}s`;
          card.classList.add("animate");
        }
      });
    }

    // Initialize animations
    setInitialStyles();
    animateStats();

    // Use throttled scroll event with Intersection Observer if available
    if ("IntersectionObserver" in window) {
      // More efficient animation triggering with Intersection Observer
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            if (entry.target.classList.contains("stat-box")) {
              animateStats();
            }
          }
        });
      }, observerOptions);

      // Observe all animateable elements
      document
        .querySelectorAll(
          ".stat-box, .team-member, .timeline-item, .value-card"
        )
        .forEach((el) => {
          observer.observe(el);
        });
    } else {
      // Fallback to scroll event with throttling
      window.addEventListener("scroll", throttle(checkScroll, 100));
      checkScroll(); // Check initial state
    }
  }

  // Newsletter form validation
  function initNewsletter() {
    const newsletterForm = document.querySelector(".newsletter-form");
    if (!newsletterForm) return;

    function isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }

    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();

      if (!email) {
        alert("Please enter your email address.");
        emailInput.focus();
        return;
      }

      if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        emailInput.focus();
        return;
      }

      // Simulate form submission
      alert("Thank you for subscribing to our newsletter!");
      emailInput.value = "";
    });
  }

  // Mobile-specific optimizations
  function optimizeForMobile() {
    // Reduce animation intensity on mobile
    document.documentElement.style.setProperty("--transition", "all 0.4s ease");

    // Simplify carousel animations if needed
    const carouselItems = document.querySelectorAll(".carousel-item");
    carouselItems.forEach((item) => {
      item.style.transition = "opacity 0.8s ease";
    });

    // Limit parallax effects on mobile
    if (window.innerWidth < 992) {
      const floatingShapes = document.querySelector(".floating-shapes");
      if (floatingShapes) {
        floatingShapes.style.display = "none";
      }
    }
  }
});
