document.addEventListener("DOMContentLoaded", () => {
  // Hide Loader
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";

  renderServices();
  setupDarkMode();
  setupMobileMenu();
  setupObservers();
  setupSmoothScroll();
  setupHomeBackground();
});

// ========================== Services ==========================
const services = [
  { name: "Business Process Improvement", icon: "bpi.png" },
  { name: "Change Management", icon: "change.png" },
  { name: "Strategic Planning", icon: "planning.png" },
  { name: "Business Analysis", icon: "analysis.png" },
  { name: "Risk Management", icon: "risk.png" },
  { name: "Project Management", icon: "project.png" },
  { name: "Operational Analysis", icon: "ops.png" },
  { name: "Financial Analysis", icon: "finance.png" },
  { name: "Organizational Management", icon: "org.png" },
  { name: "Training and Development", icon: "training.png" },
  { name: "Market Assessment", icon: "market.png" },
  { name: "Corporate Performance Management", icon: "performance.png" },
  { name: "Mergers and Acquisitions Advisory", icon: "mergers.png" },
  { name: "Interim Management", icon: "interim.png" },
  { name: "Investment Appraisal and Evaluation", icon: "investment.png" },
  { name: "Sales and Marketing", icon: "sales.png" },
  { name: "Business Restructuring", icon: "restructuring.png" },
  { name: "Corporate Strategy", icon: "strategy.png" },
  { name: "Supply Chain Solutions", icon: "supply.png" },
  { name: "Business Intelligence", icon: "intelligence.png" }
];

function renderServices() {
  const grid = document.getElementById("servicesGrid");
  if (!grid) return;

  grid.innerHTML = "";
  services.forEach(service => {
    const card = document.createElement("div");
    card.className = "bg-white border rounded-lg p-4 shadow hover:shadow-lg transition duration-300 flex flex-col items-center";

    const img = document.createElement("img");
    img.src = `./assets/icons/${service.icon}`;
    img.alt = service.name;
    img.className = "w-16 h-16 mb-4";

    const name = document.createElement("h3");
    name.textContent = service.name;
    name.className = "text-center text-lg font-semibold";

    card.appendChild(img);
    card.appendChild(name);
    grid.appendChild(card);
  });
}

// ========================== Counters ==========================
function animateCounters() {
  const counters = document.querySelectorAll(".counter");

  counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const speed = 200;

    const updateCount = () => {
      count += target / speed;
      if (count < target) {
        counter.innerText = Math.ceil(count);
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
}

// ========================== Progress Bars ==========================
function animateProgressBars() {
  const progressBars = document.querySelectorAll(".progress-bar");

  progressBars.forEach(bar => {
    const target = parseInt(bar.getAttribute("data-progress"));
    let width = 0;
    const interval = setInterval(() => {
      if (width >= target) {
        clearInterval(interval);
      } else {
        width++;
        bar.style.width = width + "%";
      }
    }, 10);
  });
}

// ========================== Observers ==========================
function setupObservers() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.id === "stats") animateCounters();
        if (entry.target.id === "progress") animateProgressBars();
        observer.unobserve(entry.target); // Animate only once
      }
    });
  });

  const statsSection = document.getElementById("stats");
  const progressSection = document.getElementById("progress");
  if (statsSection) observer.observe(statsSection);
  if (progressSection) observer.observe(progressSection);
}

// ========================== Dark Mode ==========================
function setupDarkMode() {
  const toggle = document.getElementById("darkModeToggle");
  const toggleSwitch = document.getElementById("toggleSwitch");
  const body = document.body;
  const thumb = toggleSwitch?.querySelector("div");

  // Remove any existing theme class first
  document.documentElement.classList.remove('dark');
  body.classList.remove('dark');
  localStorage.removeItem('theme');
  
  function applyTheme(isDark) {
    body.classList.toggle("dark", isDark);
    document.documentElement.classList.toggle("dark", isDark);
    if (isDark) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.removeItem("theme");
    }
    
    if (thumb && toggleSwitch) {
      thumb.style.transform = isDark ? "translateX(100%)" : "translateX(0)";
      toggleSwitch.classList.toggle("bg-green-600", isDark);
      toggleSwitch.classList.toggle("bg-gray-300", !isDark);
    }

    // Update header background
    const header = document.querySelector("header");
    if (header) {
      header.classList.toggle("bg-green-800", !isDark);
      header.classList.toggle("bg-gray-900", isDark);
    }

    // Update all sections with proper backgrounds
    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
      // Handle sections that should have green-50 background in light mode
      if (section.id === "mission" || 
          section.id === "vision" || 
          section.id === "progress" || 
          section.id === "testimonials" || 
          section.id === "contact") {
        section.classList.toggle("bg-green-50", !isDark);
        section.classList.toggle("bg-gray-800", isDark);
      }

      // Handle stats section
      if (section.id === "stats") {
        section.classList.toggle("bg-white", !isDark);
        section.classList.toggle("bg-gray-800", isDark);
      }
      
      // Update text colors for all section headings
      const heading = section.querySelector("h2");
      if (heading) {
        heading.classList.toggle("text-green-800", !isDark);
        heading.classList.toggle("text-gray-200", isDark);
      }

      // Update text colors for mission and vision paragraphs
      if (section.id === "mission" || section.id === "vision") {
        const paragraph = section.querySelector("p");
        if (paragraph) {
          paragraph.classList.toggle("text-gray-800", !isDark);
          paragraph.classList.toggle("text-gray-200", isDark);
        }
      }

      // Update Values and Why Choose Us sections
      if (section.id === "values" || section.id === "whyChooseUs") {
        const list = section.querySelector("ul");
        if (list) {
          list.classList.toggle("text-gray-800", !isDark);
          list.classList.toggle("text-gray-200", isDark);
        }
      }
    });

    // Update cards background
    const cards = document.querySelectorAll(".bg-white");
    cards.forEach(card => {
      card.classList.toggle("bg-white", !isDark);
      card.classList.toggle("bg-gray-800", isDark);
      card.classList.toggle("text-white", isDark);
    });

    // Update footer
    const footer = document.querySelector("footer");
    if (footer) {
      footer.classList.toggle("bg-green-800", !isDark);
      footer.classList.toggle("bg-gray-900", isDark);
    }

    // Update cookie consent if it exists
    const cookieConsent = document.querySelector("#cookieConsent");
    if (cookieConsent) {
      cookieConsent.classList.toggle("bg-white", !isDark);
      cookieConsent.classList.toggle("bg-gray-800", isDark);
      cookieConsent.classList.toggle("text-gray-800", !isDark);
      cookieConsent.classList.toggle("text-gray-200", isDark);
    }
  }

  // Initialize in light mode
  toggle.checked = false;
  applyTheme(false);

  toggle?.addEventListener("change", () => applyTheme(toggle.checked));
  toggleSwitch?.addEventListener("click", () => {
    toggle.checked = !toggle.checked;
    toggle.dispatchEvent(new Event("change"));
  });
}

// ========================== Mobile Menu ==========================
function setupMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  menuToggle?.addEventListener("click", () => {
    mainNav.classList.toggle("show");
    mainNav.classList.toggle("hidden");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!menuToggle.contains(e.target) && !mainNav.contains(e.target)) {
      mainNav.classList.remove("show");
      mainNav.classList.add("hidden");
    }
  });

  // Contact Form Handling
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = {
        name: contactForm.querySelector("input[type='text']").value,
        email: contactForm.querySelector("input[type='email']").value,
        message: contactForm.querySelector("textarea").value
      };

      // Show success message
      const submitButton = contactForm.querySelector("button[type='submit']");
      const originalText = submitButton.textContent;
      submitButton.textContent = "Message Sent!";
      submitButton.style.backgroundColor = "#059669"; // green-600
      submitButton.style.color = "white";

      // Reset form
      contactForm.reset();

      // Reset button after 3 seconds
      setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.style.backgroundColor = "";
        submitButton.style.color = "";
      }, 3000);

      // Log the form data (replace with your actual form handling logic)
      console.log("Form submitted:", formData);
    });
  }
}

// ========================== Smooth Scroll ==========================
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

// ========================== Home Background Animation ==========================
function setupHomeBackground() {
  const homeLink = document.getElementById("homeLink");
  homeLink?.addEventListener("click", (e) => {
    e.preventDefault();
    document.body.classList.add("home-active");
  });
}

// typing effect
const text = "Grow Smarter with Microfarm";
const typingSpeed = 150; // milliseconds per character
const deletingSpeed = 100; 
const delayBetween = 1500; // delay before deleting and restarting

let index = 0;
let isDeleting = false;
const typingElement = document.getElementById("typingText");

function type() {
  if (!isDeleting) {
    typingElement.textContent = text.slice(0, index + 1);
    index++;
    if (index === text.length) {
      isDeleting = true;
      setTimeout(type, delayBetween);
    } else {
      setTimeout(type, typingSpeed);
    }
  } else {
    typingElement.textContent = text.slice(0, index - 1);
    index--;
    if (index === 0) {
      isDeleting = false;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(type, deletingSpeed);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  type();
});
