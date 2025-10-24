
// proceso para que el DOM este listo
document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  highlightActiveSection();
  initRevealOnScroll();
});

//para un sscroll suave entre las secciones  
function initSmoothScroll() {
  const links = document.querySelectorAll('nav a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// resaltar la sección activa en el menú
function highlightActiveSection() {
  const sections = document.querySelectorAll('main[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, {
    threshold: 0.3 // se activa cuando esta 30% de la sección es visible
  });

  sections.forEach(section => observer.observe(section));
}

// animaciones cuando el usuario hace scroll 
function initRevealOnScroll() {
  const revealElements = document.querySelectorAll('.texto, .imagen, .summary-card');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  revealElements.forEach(el => {
    el.classList.add('hidden'); // Estado inicial
    revealObserver.observe(el);
  });
}





