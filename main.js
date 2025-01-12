// Utility function to apply animation styles
const applyAnimationStyles = (element, options = {}) => {
  element.style.opacity = options.opacity || "0";
  element.style.transform = options.transform || "translateY(20px)";
  element.style.transition = options.transition || "all 0.6s ease";
};

// Common Intersection Observer setup
const setupObserver = (
  selector,
  onIntersect,
  onExit = null,
  threshold = 0.1
) => {
  const elements = document.querySelectorAll(selector);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersect(entry.target);
          if (!onExit) {
            // If no exit animation is needed, unobserve after animation
            observer.unobserve(entry.target);
          }
        } else if (onExit) {
          onExit(entry.target);
        }
      });
    },
    {
      threshold,
      rootMargin: "0px",
    }
  );

  elements.forEach((el) => {
    applyAnimationStyles(el); // Apply initial animation styles
    observer.observe(el);
  });
};

// Reset animation styles
const resetAnimation = (element) => {
  element.style.opacity = "0";
  element.style.transform = "translateY(20px)";
};

// About Section animation
const aboutSection = document.querySelector(".about");
const aboutContent = document.querySelector(".about-content");

if (aboutSection && aboutContent) {
  setupObserver(
    ".about",
    (element) => {
      element.classList.add("active");
      element.style.opacity = "1"; // Ensure opacity is set correctly
      element.style.transform = "translateY(0)"; // Bring into view smoothly

      // About text animation
      const aboutText = element.querySelector(".about-text");
      if (aboutText) {
        aboutText.style.opacity = "1";
        aboutText.style.transform = "translateX(0)"; // Slide in from the left
        aboutText.style.transition = "transform 1.3s ease, opacity 0.6s ease";
      }

      // About photo animation
      const aboutPhoto = element.querySelector(".about-photo");
      if (aboutPhoto) {
        aboutPhoto.style.opacity = "1";
        aboutPhoto.style.transform = "translateX(0)"; // Slide in from the right
        aboutPhoto.style.transition = "transform 1.3s ease, opacity 0.6s ease";
      }
    },
    (element) => {
      element.classList.remove("active");
      element.style.opacity = "0"; // Reset opacity on exit
      element.style.transform = "translateY(20px)"; // Reset transform on exit

      // Reset about text animation
      const aboutText = element.querySelector(".about-text");
      if (aboutText) {
        aboutText.style.opacity = "0";
        aboutText.style.transform = "translateX(-460px)"; // Slide out to the left
      }

      // Reset about photo animation
      const aboutPhoto = element.querySelector(".about-photo");
      if (aboutPhoto) {
        aboutPhoto.style.opacity = "0";
        aboutPhoto.style.transform = "translateX(460px)"; // Slide out to the right
      }
    },
    0.5
  );
}

// Add event listener for the read-more button
const readMoreBtn = document.getElementById("read-more-btn");
if (readMoreBtn) {
  readMoreBtn.addEventListener("click", () => {
    const fullText = document.querySelector(".full-text");
    const shortText = document.querySelector(".short-text");

    if (fullText) {
      fullText.classList.toggle("active");
      shortText.style.display = fullText.classList.contains("active")
        ? "none"
        : "block";

      readMoreBtn.textContent = fullText.classList.contains("active")
        ? "Read Less"
        : "Read More";
    }
  });
}

// Hero Section animation (including profile photo)
setupObserver(
  ".hero",
  (element) => {
    element.style.opacity = "1";
    element.style.transform = "translateX(0)"; // Smooth transition for the hero

    // Profile photo animation inside the hero section
    const profilePhoto = element.querySelector(".profile-photo");
    if (profilePhoto) {
      profilePhoto.style.opacity = "1"; // Make sure the profile photo appears
      profilePhoto.style.transform = "scale(1)"; // Ensure it scales correctly
      profilePhoto.style.transition = "transform 0.6s ease, opacity 0.6s ease"; // Smooth animation
    }
  },
  resetAnimation,
  0.5
);

// Portfolio Section animation
setupObserver(
  ".portfolio-item",
  (element) => {
    element.style.opacity = "1";
    element.style.transform = "translateX(0)";
    element.style.transition = "transform 1s ease, opacity 1s ease"; // Longer animation duration
  },
  (element) => {
    element.style.opacity = "0";
    element.style.transform = "translateX(170px)";
    element.style.transition = "transform 1s ease, opacity 1s ease"; // Longer animation duration
  }
);

// Blog Cards animation
setupObserver(
  ".blog-card",
  (element) => {
    element.style.opacity = "1";
    element.style.transform = "translateX(0)";
    element.style.transition = "transform 1s ease, opacity 1s ease"; // Longer animation duration
  },
  (element) => {
    element.style.opacity = "0";
    element.style.transform = "translateX(-170px)";
    element.style.transition = "transform 1s ease, opacity 1s ease"; // Longer animation duration
  }
);

// Contact Section animation
setupObserver(
  ".contact-info",
  (element) => {
    element.classList.add("visible");
    element.style.opacity = "1";
    element.style.transform = "translateX(0)";
  },
  (element) => {
    element.classList.remove("visible");
    element.style.opacity = "0";
    element.style.transform =
      window.innerWidth <= 768 ? "translateX(-100px)" : "translateX(-460px)";
  }
);

setupObserver(
  ".contact-form",
  (element) => {
    element.classList.add("visible");
    element.style.opacity = "1";
    element.style.transform = "translateX(0)";
  },
  (element) => {
    element.classList.remove("visible");
    element.style.opacity = "0";
    element.style.transform =
      window.innerWidth <= 768 ? "translateX(100px)" : "translateX(460px)";
  }
);

// Mobile menu toggle
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// Handle active menu item
const navItems = document.querySelectorAll(".nav-link");

navItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    navItems.forEach((nav) => nav.classList.remove("active"));
    event.target.classList.add("active");
  });
});

// Progress Bar Logic
window.addEventListener("scroll", () => {
  const totalHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / totalHeight) * 100;
  document.querySelector(".progress-bar").style.width = `${progress}%`;
});

// Input form validation
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!name || !email) {
      alert("Please fill out both the name and email fields.");
      return;
    }

    alert("Form submitted successfully!");
  });
}

// Skills section animation
document.addEventListener("DOMContentLoaded", function () {
  const skillsSection = document.querySelector(".skills");
  const skillItems = document.querySelectorAll(".skill-item");

  if (!skillsSection || !skillItems.length) return; // Guard clause

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        skillItems.forEach((item, index) => {
          if (entry.isIntersecting) {
            // When entering viewport
            item.style.animation = `fadeInUp 0.6s ease forwards ${
              index * 0.2
            }s`;
          } else {
            // When leaving viewport
            item.style.animation = `fadeOutDown 0.6s ease forwards ${
              (skillItems.length - 1 - index) * 0.2
            }s`;
          }
        });
      });
    },
    {
      threshold: 0.2,
      rootMargin: "-50px",
    }
  );

  observer.observe(skillsSection);
});

//dark mode and light mode button
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("mode-toggle");

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
  }

  toggleButton.addEventListener("click", () => {
    // Toggle the theme
    const isLightTheme = document.body.classList.toggle("light-theme");

    // Save preference
    localStorage.setItem("theme", isLightTheme ? "light" : "dark");
  });
});

// Animation on view and off view of the education section
document.addEventListener("DOMContentLoaded", function () {
  // Create an IntersectionObserver to observe the .timeline-item elements
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        // If the element is in view
        if (entry.isIntersecting) {
          entry.target.classList.add("visible"); // Trigger the animation
          const topContent = entry.target.querySelector(".top-content");
          const secondContent = entry.target.querySelector(".second-content");
          const lastText = entry.target.querySelector(".last-text");

          if (topContent) {
            topContent.style.opacity = "1";
            topContent.style.transform = "translateX(0)";
            topContent.style.transition = "transform 1s ease, opacity 1s ease";
          }

          if (secondContent) {
            secondContent.style.opacity = "1";
            secondContent.style.transform = "translateX(0)";
            secondContent.style.transition =
              "transform 1s ease, opacity 1s ease";
          }

          if (lastText) {
            lastText.style.opacity = "1";
            lastText.style.transform = "translateX(0)";
            lastText.style.transition = "transform 1s ease, opacity 1s ease";
          }
        } else {
          entry.target.classList.remove("visible"); // Reset the animation
          const topContent = entry.target.querySelector(".top-content");
          const secondContent = entry.target.querySelector(".second-content");
          const lastText = entry.target.querySelector(".last-text");

          if (topContent) {
            topContent.style.opacity = "0";
            topContent.style.transform = "translateX(-100px)";
          }

          if (secondContent) {
            secondContent.style.opacity = "0";
            secondContent.style.transform = "translateX(100px)";
          }

          if (lastText) {
            lastText.style.opacity = "0";
            lastText.style.transform = "translateX(-100px)";
          }
        }
      });
    },
    {
      threshold: 0.5, // Adjust the percentage of the element in view to trigger the animation
    }
  );

  // Observe each timeline item
  const timelineItems = document.querySelectorAll(".timeline-item");
  timelineItems.forEach((item) => observer.observe(item));
});

//loading screen
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    loadingScreen.style.transition = "opacity 1.5s ease"; // Slower transition duration
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 1500); // Adjusted timeout to match the transition duration
  }
});
