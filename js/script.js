document.addEventListener("DOMContentLoaded", function () {
  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.innerHTML = navLinks.classList.contains("active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  // Carousel functionality
  const carouselItems = document.querySelectorAll(".carousel-item");
  const indicators = document.querySelectorAll(".indicator");
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

  // Set up automatic sliding
  function startCarousel() {
    slideInterval = setInterval(nextSlide, 5000);
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

  // Animated statistics counter
  function animateStats() {
    const statElements = document.querySelectorAll(".stat-number");
    const speed = 200; // The lower the slower

    statElements.forEach((statElement) => {
      const target = parseInt(statElement.getAttribute("data-target"));
      const count = parseInt(statElement.innerText || "0");
      const increment = Math.trunc(target / speed);

      if (count < target) {
        statElement.innerText = count + increment;
        setTimeout(() => animateStats(), 1);
      } else {
        statElement.innerText = target;
      }
    });
  }

  // Set initial styles for animated elements
  function setInitialStyles() {
    document.querySelectorAll("").forEach((element) => {
      element.style.opacity = 0;
      element.style.transform = "translateY(20px)";
      element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });

    document.querySelectorAll("").forEach((card) => {
      card.style.opacity = 0;
      card.style.transform = "translateY(30px)";
    });

    // Note: stat-box, team-member, timeline-item likely have initial states in CSS
  }

  // Animation on scroll (merged all versions)
  function checkScroll() {
    // For stat boxes, team members, timeline items (class-based animation)
    const statBoxes = document.querySelectorAll("");
    statBoxes.forEach((box) => {
      const position = box.getBoundingClientRect();
      if (position.top < window.innerHeight - 100) {
        box.classList.add("animate");
      }
    });

    const teamMembers = document.querySelectorAll("");
    teamMembers.forEach((member) => {
      const position = member.getBoundingClientRect();
      if (position.top < window.innerHeight - 100) {
        member.classList.add("animate");
      }
    });

    const timelineItems = document.querySelectorAll("");
    timelineItems.forEach((item) => {
      const position = item.getBoundingClientRect();
      if (position.top < window.innerHeight - 100) {
        item.classList.add("animate");
      }
    });

    // For animated, delay classes (style-based animation)
    const elements = document.querySelectorAll("");
    elements.forEach((element) => {
      const position = element.getBoundingClientRect();
      if (position.top < window.innerHeight - 100) {
        element.style.opacity = 1;
        element.style.transform = "translateY(0)";
      }
    });

    // For value cards (staggered animation)
    const cards = document.querySelectorAll("");
    cards.forEach((card, index) => {
      const position = card.getBoundingClientRect();
      if (position.top < window.innerHeight - 100) {
        card.style.transition =
          "opacity 0.5s ease " +
          index * 0.2 +
          "s, transform 0.5s ease " +
          index * 0.2 +
          "s";
        card.classList.add("animate");
      }
    });
  }

  // Newsletter form validation
  document
    .querySelector(".newsletter-form")
    .addEventListener("submit", function (e) {
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

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Initialize everything
  setInitialStyles();
  animateStats();
  window.addEventListener("scroll", checkScroll);
  checkScroll(); // Check initial state
});
