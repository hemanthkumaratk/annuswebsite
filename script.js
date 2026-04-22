document.addEventListener('DOMContentLoaded', () => {
    // --- HAMBURGER MENU LOGIC ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('nav ul');
    const closeMenu = document.getElementById('close-menu');

    if (hamburger && navMenu) {
        const toggleMenu = () => {
            navMenu.classList.toggle('active');
            if (navMenu.classList.contains('active')) {
                hamburger.style.opacity = "0";
            } else {
                hamburger.style.opacity = "1";
            }
        };

        hamburger.addEventListener('click', toggleMenu);
        
        if (closeMenu) {
            closeMenu.addEventListener('click', (e) => {
                e.preventDefault();
                toggleMenu();
            });
        }

        document.querySelectorAll('nav ul li a').forEach(link => {
            if (link.id !== 'close-menu') {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    hamburger.style.opacity = "1";
                });
            }
        });
    }

    // --- SCROLL REVEAL LOGIC ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -20px 0px" 
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Dynamic reveal for maps or other specific interactive elements
    document.querySelectorAll('.map-card-interactive').forEach(card => {
        card.addEventListener('click', (e) => {
            if(e.target.tagName && e.target.tagName.toLowerCase() === 'iframe') {
                return;
            }
            const lat = card.getAttribute('data-lat');
            const lng = card.getAttribute('data-lng');
            if (lat && lng) {
                const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
                window.open(googleMapsUrl, '_blank');
            }
        });
    });

    // Directions buttons
    document.querySelectorAll('.campus-directions').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const lat = btn.getAttribute('data-lat');
            const lng = btn.getAttribute('data-lng');
            if (lat && lng) {
                const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
                window.open(googleMapsUrl, '_blank');
            }
        });
    });
});
