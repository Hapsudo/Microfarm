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

  function applyTheme(isDark) {
    body.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
    if (thumb && toggleSwitch) {
      thumb.style.transform = isDark ? "translateX(100%)" : "translateX(0)";
      toggleSwitch.classList.toggle("bg-green-500", isDark);
      toggleSwitch.classList.toggle("bg-gray-300", !isDark);
    }
  }

  if (localStorage.getItem("theme") === "dark") {
    toggle.checked = true;
    applyTheme(true);
  }

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
    if (mainNav.classList.contains("hidden")) {
      mainNav.classList.remove("hidden");
      mainNav.classList.add("flex", "flex-col", "absolute", "top-full", "right-4", "bg-green-800", "p-4", "rounded-lg", "shadow-lg", "md:hidden");
    } else {
      mainNav.classList.add("hidden");
      mainNav.classList.remove("flex", "flex-col", "absolute", "top-full", "right-4", "bg-green-800", "p-4", "rounded-lg", "shadow-lg");
    }
  });

  // Optional: Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!menuToggle.contains(e.target) && !mainNav.contains(e.target)) {
      if (!mainNav.classList.contains("hidden")) {
        mainNav.classList.add("hidden");
        mainNav.classList.remove("flex", "flex-col", "absolute", "top-full", "right-4", "bg-green-800", "p-4", "rounded-lg", "shadow-lg");
      }
    }
  });
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
