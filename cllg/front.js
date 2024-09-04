
    let slideIndex = 0;
    showSlides();

    function showSlides() {
        let slides = document.querySelectorAll('.slideshow');
        slides.forEach(slide => slide.classList.remove('active'));
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }
        slides[slideIndex - 1].classList.add('active');
        setTimeout(showSlides, 5000); // Change image every 5 seconds
    }

    function plusSlides(n) {
        slideIndex += n - 1;
        showSlides();
    }

    document.querySelectorAll('.menu-item > a').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();

        let submenu = this.nextElementSibling;
        let isVisible = submenu.classList.contains('show');

        // Hide all submenus and remove 'active' class from all menu items
        document.querySelectorAll('.submenu').forEach(sub => {
            sub.classList.remove('show');
            sub.style.display = 'none';
        });
        document.querySelectorAll('.menu-item > a').forEach(menuItem => {
            menuItem.classList.remove('active');
        });

        // If the submenu was not visible, show it and add 'active' class
        if (!isVisible) {
            submenu.style.display = 'block'; // Set display to block to trigger animation
            requestAnimationFrame(() => {
                submenu.classList.add('show');
            });
            this.classList.add('active');
        }
    });
});

document.addEventListener('click', function(event) {
    // If click is outside the menu, hide all submenus and remove 'active' class
    if (!event.target.closest('.menu-item')) {
        document.querySelectorAll('.submenu').forEach(sub => {
            sub.classList.remove('show');
            sub.style.display = 'none';
        });
        document.querySelectorAll('.menu-item > a').forEach(menuItem => {
            menuItem.classList.remove('active');
        });
    }
});

// Initialize variables to store scroll positions
let lastScrollTop = 0;
const button = document.getElementById('contact-us-button');

window.addEventListener('scroll', function() {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  if (currentScroll > lastScrollTop) {
    // Scrolling down - hide the button
    button.classList.add('hidden');
  } else {
    // Scrolling up - show the button
    button.classList.remove('hidden');
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For mobile or negative scrolling
});