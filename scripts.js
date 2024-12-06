// scripts.js

document.addEventListener('DOMContentLoaded', () => {

    // Mobile menu toggle functionality
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active'); // Toggle mobile menu
        menuToggle.classList.toggle('active'); // Toggle active state on the menu button for visual feedback
    });

    // Scroll-based animations for section headers and cards
    const elementsToAnimate = document.querySelectorAll('.container h2, .card');

    // Function to check if elements are in the viewport and animate them
    const animateOnScroll = () => {
        elementsToAnimate.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            // If element is in the viewport, apply animation
            if (elementTop < windowHeight - 100) {
                element.classList.add('animate');  // Add class to trigger animation
            }
        });
    };

    // Throttling function to optimize the scroll event listener
    const throttle = (callback, delay) => {
        let lastTime = 0;
        return function () {
            const now = new Date().getTime();
            if (now - lastTime >= delay) {
                lastTime = now;
                callback();
            }
        };
    };

    // Adding throttle to the scroll event listener
    window.addEventListener('scroll', throttle(animateOnScroll, 200));

    // Initially call the animation function to trigger animation on page load
    animateOnScroll();

    // Contact form validation and submission handler
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();  // Prevent default form submission

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all fields before submitting!');
            return;
        }

        // Show a success message (placeholder for future form submission logic)
        const formData = {
            name: name,
            email: email,
            message: message,
        };
        
        // Use modern JavaScript `fetch` to simulate form submission
        fetch('/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            alert(`Thank you, ${data.name}! Your message has been successfully sent.`);
            contactForm.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Something went wrong, please try again.');
        });
    });

    // Smooth scroll functionality for anchor links (for better user experience)
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for navbar height
                    behavior: 'smooth',
                });
            }
        });
    });

});
