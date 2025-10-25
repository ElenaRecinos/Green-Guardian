// ===== NAVEGACIÓN ENTRE SECCIONES =====
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('main');

// Función para cambiar de sección
function changeSection(targetId) {
  // Remover 'active' de todas las secciones
  sections.forEach(section => section.classList.remove('active'));

  // Activar la sección correspondiente
  const targetSection = document.getElementById(targetId);
  if (targetSection) {
    targetSection.classList.add('active');

    // Scroll suave al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Navegación desde el header
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    changeSection(targetId);
  });
});

// Navegación desde las tarjetas de resumen (inicio)
const summaryCards = document.querySelectorAll('.summary-card');

summaryCards.forEach(card => {
  card.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = card.getAttribute('href').substring(1);
    changeSection(targetId);
  });
});

// ===== LIGHTBOX PARA IMÁGENES =====
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = '<span class="lightbox-close">&times;</span><img src="" alt="">';
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');

// Función para abrir el lightbox
function openLightbox(imgSrc, imgAlt) {
  lightboxImg.src = imgSrc;
  lightboxImg.alt = imgAlt;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden'; // Evita scroll cuando el lightbox está abierto
}

// Función para cerrar el lightbox
function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = ''; // Restaura el scroll
}

// Agregar evento click a todas las imágenes (excepto logo y welcome-logo)
document.querySelectorAll('main:not(#inicio) img').forEach(img => {
  img.addEventListener('click', () => {
    openLightbox(img.src, img.alt);
  });
});

// Cerrar lightbox con el botón X
lightboxClose.addEventListener('click', closeLightbox);

// Cerrar lightbox al hacer clic fuera de la imagen
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Cerrar lightbox con tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('active')) {
    closeLightbox();
  }
});

// ===== ANIMACIONES AL HACER SCROLL =====
// Observer para animar elementos cuando entran en el viewport
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observar párrafos y listas para animarlos
document.querySelectorAll('main:not(#inicio) p, main:not(#inicio) ul').forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';
  element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(element);
});

// ===== EFECTO PARALLAX EN EL HEADER =====
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  // Ocultar/mostrar header al hacer scroll
  if (currentScroll > lastScroll && currentScroll > 100) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }

  lastScroll = currentScroll;
});

// ===== CONTADOR DE ANIMALES AFECTADOS (OPCIONAL) =====
// Puedes activar esto si quieres mostrar estadísticas animadas
function animateCounter(element, start, end, duration) {
  let startTime = null;

  const step = (currentTime) => {
    if (!startTime) startTime = currentTime;
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    element.textContent = value.toLocaleString();

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
}

// ===== TOOLTIP PARA IMÁGENES =====
// Muestra un tooltip cuando pasas el cursor sobre las imágenes
document.querySelectorAll('main:not(#inicio) img').forEach(img => {
  img.setAttribute('title', 'Haz clic para ver en grande');

  img.addEventListener('mouseenter', function () {
    this.style.cursor = 'pointer';
  });
});

// ===== SMOOTH SCROLL PARA TODA LA PÁGINA =====
document.documentElement.style.scrollBehavior = 'smooth';

console.log('✅ Green Guardian cargado correctamente!');

img.addEventListener('click', function () {
  // Agregar clase de animación
  this.classList.add('image-clicked');

  // Abrir lightbox
  openLightbox(this.src, this.alt);

  // Remover clase después de la animación
  setTimeout(() => {
    this.classList.remove('image-clicked');
  }, 500);
});