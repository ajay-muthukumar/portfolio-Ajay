// Main JavaScript for Portfolio SIO SISR

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe all sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Active navigation highlighting
function setActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('custom-navigation a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-accent', 'font-semibold');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('text-accent', 'font-semibold');
        }
    });
}

window.addEventListener('scroll', setActiveNav);

// Form handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        // Ajout de "async" ici pour pouvoir utiliser fetch
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // On bloque toujours le rechargement de la page
            
            // Simple form validation
            const inputs = contactForm.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('border-red-500');
                } else {
                    input.classList.remove('border-red-500');
                }
            });
            
            if (isValid) {
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                // État de chargement
                submitBtn.textContent = 'Envoi en cours...';
                submitBtn.disabled = true;

                try {
                    // On récupère les données et on les envoie à Formspree
                    const formData = new FormData(contactForm);
                    const response = await fetch(contactForm.action, {
                        method: contactForm.method,
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (response.ok) {
                        // Si Formspree confirme la réception :
                        submitBtn.textContent = 'Message envoyé !';
                        submitBtn.classList.add('bg-secondary');
                        
                        // Reset form après 3 secondes
                        setTimeout(() => {
                            contactForm.reset();
                            submitBtn.textContent = originalText;
                            submitBtn.classList.remove('bg-secondary');
                            submitBtn.disabled = false;
                        }, 3000);
                    } else {
                        // En cas d'erreur de Formspree
                        submitBtn.textContent = "Erreur d'envoi";
                        setTimeout(() => {
                            submitBtn.textContent = originalText;
                            submitBtn.disabled = false;
                        }, 3000);
                    }
                } catch (error) {
                    // En cas de problème de connexion internet
                    submitBtn.textContent = "Erreur réseau";
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                }
            }
        });
    }
});
// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
document.addEventListener('DOMContentLoaded', () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i data-feather="arrow-up"></i>';
    scrollBtn.className = 'fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 opacity-0 transform translate-y-4';
    scrollBtn.id = 'scrollToTop';
    scrollBtn.addEventListener('click', scrollToTop);
    document.body.appendChild(scrollBtn);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', () => {
        const scrollBtn = document.getElementById('scrollToTop');
        if (window.scrollY > 500) {
            scrollBtn.classList.remove('opacity-0', 'translate-y-4');
            scrollBtn.classList.add('opacity-100', 'translate-y-0');
        } else {
            scrollBtn.classList.remove('opacity-100', 'translate-y-0');
            scrollBtn.classList.add('opacity-0', 'translate-y-4');
        }
    });
});

// Feather icons replacement on dynamic content
function updateFeatherIcons() {
    feather.replace();
}

// Update icons when needed
setInterval(updateFeatherIcons, 1000);

