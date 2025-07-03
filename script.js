document.addEventListener('DOMContentLoaded', () => {
  const hamburgerInput = document.getElementById('hamburger-toggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = navMenu.querySelectorAll('li, button');

  // Toggle menu on hamburger click
  hamburgerInput.addEventListener('change', () => {
    if (hamburgerInput.checked) {
      navMenu.style.display = 'flex';
      setTimeout(() => {
        navMenu.style.opacity = '1';
        navMenu.style.transform = 'translateY(0)';
      }, 10); // Small delay to allow display change
      navMenu.setAttribute('aria-expanded', 'true');
    } else {
      navMenu.style.opacity = '0';
      navMenu.style.transform = 'translateY(-10px)';
      setTimeout(() => {
        navMenu.style.display = 'none';
      }, 300); // Match CSS transition duration
      navMenu.setAttribute('aria-expanded', 'false');
    }
  });

  // Collapse menu on nav item or button click
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      hamburgerInput.checked = false;
      navMenu.style.opacity = '0';
      navMenu.style.transform = 'translateY(-10px)';
      setTimeout(() => {
        navMenu.style.display = 'none';
      }, 300); // Match CSS transition duration
      navMenu.setAttribute('aria-expanded', 'false');
    });
  });

  // Reset menu state on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navMenu.style.display = 'flex';
      navMenu.style.opacity = '1';
      navMenu.style.transform = 'translateY(0)';
      navMenu.setAttribute('aria-expanded', 'true');
      hamburgerInput.checked = false;
    } else {
      navMenu.style.display = hamburgerInput.checked ? 'flex' : 'none';
      navMenu.style.opacity = hamburgerInput.checked ? '1' : '0';
      navMenu.style.transform = hamburgerInput.checked
        ? 'translateY(0)'
        : 'translateY(-10px)';
      navMenu.setAttribute(
        'aria-expanded',
        hamburgerInput.checked ? 'true' : 'false'
      );
    }
  });

  // Trigger resize on load to set initial state
  window.dispatchEvent(new Event('resize'));

  // Video Playback
  window.playVideo = () => {
    const image = document.querySelector('.podcast_image');
    const video = document.querySelector('.podcast_video');
    const playCircle = document.querySelector('.podcast_play_circle');

    if (!video) {
      console.error('YouTube iframe not found');
      return;
    }

    image.style.display = 'none';
    video.style.display = 'block';
    playCircle.style.display = 'none';

    try {
      video.contentWindow.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        '*'
      );
    } catch (e) {
      console.error('Error triggering YouTube video:', e);
    }
  };

  // FAQ Toggle
  window.toggleFAQ = (event) => {
    const faqItem = event.currentTarget;
    const content = faqItem.querySelector('.faq_content');
    const icon = faqItem.querySelector('.faq_toggle_icon');
    const isExpanded = faqItem.getAttribute('data-expanded') === 'true';

    if (!content || !icon) {
      console.error('FAQ content or icon not found');
      return;
    }

    if (isExpanded) {
      content.style.display = 'none';
      faqItem.setAttribute('data-expanded', 'false');
      faqItem.setAttribute('aria-expanded', 'false');
      faqItem.classList.remove('expanded');
      icon.src = './img/add sign.png';
      icon.alt = 'Expand FAQ';
    } else {
      content.style.display = 'block';
      faqItem.setAttribute('data-expanded', 'true');
      faqItem.setAttribute('aria-expanded', 'true');
      faqItem.classList.add('expanded');
      icon.src = './img/minus.png';
      icon.alt = 'Collapse FAQ';
    }
  };

  // Newsletter Form Validation
  document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
    const email = e.target.querySelector('input[type="email"]').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      e.preventDefault();
      alert('Please enter a valid email address');
    }
  });
});
