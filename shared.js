// Back to Top Button
function initBackToTop() {
  const backToTopButton = document.createElement('button');
  backToTopButton.innerHTML = `
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
    </svg>
  `;
  backToTopButton.className = 'fixed bottom-8 right-8 bg-green-600 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-green-700 transition-all duration-300 opacity-0 invisible';
  document.body.appendChild(backToTopButton);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.remove('opacity-0', 'invisible');
      backToTopButton.classList.add('opacity-100', 'visible');
    } else {
      backToTopButton.classList.add('opacity-0', 'invisible');
      backToTopButton.classList.remove('opacity-100', 'visible');
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Cookie Consent Banner
function initCookieConsent() {
  if (localStorage.getItem('cookieConsent')) return;

  const cookieBanner = document.createElement('div');
  cookieBanner.className = 'fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 z-50';
  cookieBanner.innerHTML = `
    <div class="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <p class="text-gray-600">
        We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
      </p>
      <div class="flex gap-4">
        <button id="acceptCookies" class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-all duration-300">
          Accept
        </button>
        <button id="declineCookies" class="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 transition-all duration-300">
          Decline
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(cookieBanner);

  document.getElementById('acceptCookies').addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    cookieBanner.remove();
  });

  document.getElementById('declineCookies').addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'declined');
    cookieBanner.remove();
  });
}

// Loading Animation
function initLoadingAnimation() {
  const loader = document.createElement('div');
  loader.className = 'fixed inset-0 bg-white z-50 flex items-center justify-center transition-opacity duration-500';
  loader.innerHTML = `
    <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
  `;
  document.body.appendChild(loader);

  window.addEventListener('load', () => {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.remove();
    }, 500);
  });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
  initBackToTop();
  initCookieConsent();
  initLoadingAnimation();
}); 