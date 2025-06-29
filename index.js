//theme-toggle
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const themeIcon = themeToggle.querySelector("i");

function applyTheme(theme) {
  if (theme === "dark") {
    body.setAttribute("data-theme", "dark");
    themeIcon.className = "fas fa-sun";
  } else {
    body.removeAttribute("data-theme"); // default to light
    themeIcon.className = "fas fa-moon";
  }
  localStorage.setItem("theme", theme);
  updateNavbarTheme(); 
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);
});

themeToggle.addEventListener("click", () => {
  const isDark = body.getAttribute("data-theme") === "dark";
  const newTheme = isDark ? "light" : "dark";
  applyTheme(newTheme);
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const navMenu = document.querySelector(".nav-menu");

mobileMenuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  const icon = mobileMenuToggle.querySelector("i");
  icon.className = navMenu.classList.contains("active")
    ? "fas fa-times"
    : "fas fa-bars";
});

// Close mobile menu when clicking on links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    mobileMenuToggle.querySelector("i").className = "fas fa-bars";
  });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Animate skill bars
      if (entry.target.classList.contains("slide-in-right")) {
        const skillBars = entry.target.querySelectorAll(".skill-progress");
        skillBars.forEach((bar) => {
          const width = bar.getAttribute("data-width");
          setTimeout(() => {
            bar.style.width = width + "%";
          }, 300);
        });
      }

      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animated elements
document
  .querySelectorAll(".fade-in, .slide-in-left, .slide-in-right")
  .forEach((el) => {
    observer.observe(el);
  });

// Back to Top Button
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});


// Navbar scroll effect
function updateNavbarTheme() {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background =
      body.getAttribute("data-theme") === "dark"
        ? "rgba(15, 23, 42, 0.98)"
        : "rgba(255, 255, 255, 0.98)";
  } else {
    navbar.style.background =
      body.getAttribute("data-theme") === "dark"
        ? "rgba(15, 23, 42, 0.95)"
        : "rgba(255, 255, 255, 0.95)";
  }
}

window.addEventListener("scroll", updateNavbarTheme);
  

// Typing animation for hero section
const subtitle = document.querySelector(".subtitle");
const titles = [
  "Software Developer",
  "Full Stack Developer",
  "UI/UX Enthusiast",
  "Problem Solver",
];
let currentTitle = 0;
let currentChar = 0;
let isDeleting = false;
let typingDelay = 100;
let deletingDelay = 40;
let pauseAfterTyping = 2000;
let pauseAfterDeleting = 500;

function typeAnimation() {
  const current = titles[currentTitle];
  const nextChar = isDeleting
    ? current.substring(0, currentChar - 1)
    : current.substring(0, currentChar + 1);

  subtitle.textContent = nextChar;
  currentChar = isDeleting ? currentChar - 1 : currentChar + 1;

  let nextDelay = isDeleting ? deletingDelay : typingDelay;

  if (!isDeleting && currentChar === current.length) {
    nextDelay = pauseAfterTyping;
    isDeleting = true;
  } else if (isDeleting && currentChar === 0) {
    isDeleting = false;
    currentTitle = (currentTitle + 1) % titles.length;
    nextDelay = pauseAfterDeleting;
  }

  setTimeout(typeAnimation, nextDelay);
}

// Initialize after DOM content loads
document.addEventListener("DOMContentLoaded", () => {
  subtitle.style.minHeight = "1.5em"; // Prevent layout shift
  typeAnimation();
});


// Add parallax effect to hero section
// window.addEventListener("scroll", () => {
//   const scrolled = window.pageYOffset;
//   const hero = document.querySelector(".hero");
//   const rate = scrolled * -0.2;

//   if (hero) {
//     hero.style.transform = `translateY(${rate}px)`;
//   }
// });

// Project card interactions
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Contact Form
// const contactForm = document.getElementById("contactForm");
// const formMessage = document.getElementById("formMessage");

// contactForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   // Get form data
//   const formData = new FormData(contactForm);
//   const name = formData.get("name");
//   const email = formData.get("email");
//   const subject = formData.get("subject");
//   const message = formData.get("message");

//   // Basic validation
//   if (!name || !email || !message) {
//     showFormMessage("Please fill in all required fields.", "error");
//     return;
//   }

//   if (!isValidEmail(email)) {
//     showFormMessage("Please enter a valid email address.", "error");
//     return;
//   }

//   // Simulate form submission
//   const submitButton = contactForm.querySelector('button[type="submit"]');
//   const originalText = submitButton.innerHTML;
//   submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
//   submitButton.disabled = true;

//   setTimeout(() => {
//     showFormMessage(
//       "Thank you for your message! I'll get back to you soon.",
//       "success"
//     );
//     contactForm.reset();
//     submitButton.innerHTML = originalText;
//     submitButton.disabled = false;
//   }, 2000);
// });

// function showFormMessage(message, type) {
//   formMessage.textContent = message;
//   formMessage.className = `form-message ${type}`;
//   formMessage.style.display = "block";

//   setTimeout(() => {
//     formMessage.style.display = "none";
//   }, 5000);
// }

// function isValidEmail(email) {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// }

// Contact Form Submission to Google Form
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    showFormMessage("Please fill in all required fields.", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showFormMessage("Please enter a valid email address.", "error");
    return;
  }

  // Google Form endpoint
  const googleFormURL = "https://forms.gle/VJdgjyB5KBTd5p9k6";

  const formData = new FormData();
  formData.append("entry.192204763", name);     // Name
  formData.append("entry.2127503447", email);    // Email
  formData.append("entry.373479535", subject);  // Subject
  formData.append("entry.2043924074", message);   // Message

  fetch(googleFormURL, {
    method: "POST",
    mode: "no-cors", // required for Google Forms
    body: formData,
  })
    .then(() => {
      showFormMessage("✅ Thank you! Your message has been sent.", "success");
      contactForm.reset();
    })
    .catch(() => {
      showFormMessage("❌ Oops! Something went wrong. Try again later.", "error");
    });
});

function showFormMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
  formMessage.style.display = "block";

  setTimeout(() => {
    formMessage.style.display = "none";
  }, 5000);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
