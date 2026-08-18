// Menú móvil (hamburguesa)
const botonHamburguesa = document.getElementById('botonHamburguesa');
const menuNavegacion = document.getElementById('menuNavegacion');

if (botonHamburguesa && menuNavegacion) {
    // Abre y cierra el menú al dar clic
    botonHamburguesa.addEventListener('click', () => {
        menuNavegacion.classList.toggle('active');
    });

    // Cierra el menú cuando haces clic en cualquier enlace
    document.querySelectorAll('.enlace-navegacion').forEach(link => {
        link.addEventListener('click', () => {
            menuNavegacion.classList.remove('active');
        });
    });
}

// Modal para ver el video de la demo
const botonDemoVideo = document.getElementById('botonDemoVideo');
const modalVideo = document.getElementById('modalVideo');
const cerrarModal = document.getElementById('cerrarModal');

if (botonDemoVideo && modalVideo && cerrarModal) {
    // Abre el modal y desactiva el scroll del fondo
    botonDemoVideo.addEventListener('click', () => {
        modalVideo.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    // Cierra el modal y reactiva el scroll
    cerrarModal.addEventListener('click', () => {
        modalVideo.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Cierra si haces clic fuera del recuadro del video
    window.addEventListener('click', (event) => {
        if (event.target === modalVideo) {
            modalVideo.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Botón Probar Gratis (scroll suave a la sección contacto)
const botonProbar = document.getElementById('botonProbar');
if (botonProbar) {
    botonProbar.addEventListener('click', () => {
        const contactoSection = document.getElementById('contacto');
        if (contactoSection) {
            contactoSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Enviar formulario de contacto usando la API de Web3Forms
const formularioContacto = document.getElementById('formularioContacto');

if (formularioContacto) {
    formularioContacto.addEventListener('submit', (e) => {
        // e.preventDefault evita que la página cambie de URL o se recargue
        e.preventDefault();

        // Agarra los datos del formulario
        const formData = new FormData(formularioContacto);
        showNotification('Enviando mensaje...', 'success');

        // Petición POST para enviar el correo en segundo plano
        fetch(formularioContacto.action, {
            method: 'POST',
            body: formData
        })
        .then(respuesta => respuesta.json())
        .then(resultado => {
            if (resultado.success) {
                showNotification('Mensaje enviado correctamente.', 'success');
                formularioContacto.reset(); // Limpia los inputs
            } else {
                showNotification(resultado.message || 'Error al enviar el mensaje.', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('Error de red, revisa tu conexión.', 'error');
        });
    });
}

// Formulario de Newsletter (boletín)
const formularioBoletin = document.getElementById('formularioBoletin');

if (formularioBoletin) {
    formularioBoletin.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailInput = formularioBoletin.querySelector('input[type="email"]');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Valida que el correo esté bien escrito
        if (emailInput && emailRegex.test(emailInput.value)) {
            showNotification('¡Suscripción completada!', 'success');
            formularioBoletin.reset();
        } else {
            showNotification('Ingresa un correo válido', 'error');
        }
    });
}

// Función para crear las notificaciones en la esquina inferior
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    
    // Estilos CSS desde JS para la notificación
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 14px 20px;
        border-radius: 6px;
        color: #fff;
        font-weight: 700;
        font-size: 0.9rem;
        z-index: 3000;
        animation: slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        gap: 10px;
        border: 1px solid transparent;
        background: var(--fondo-tarjeta);
    `;

    // Cambia el color del borde y brillo según el tipo
    if (type === 'success') {
        notification.style.borderColor = 'var(--color-primario)';
        notification.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.4)';
        notification.innerHTML = `<i class="fas fa-check-circle" style="color: var(--color-primario);"></i> ${message}`;
    } else if (type === 'error') {
        notification.style.borderColor = 'var(--error)';
        notification.style.boxShadow = '0 0 15px rgba(239, 68, 68, 0.4)';
        notification.innerHTML = `<i class="fas fa-exclamation-circle" style="color: var(--error);"></i> ${message}`;
    }

    document.body.appendChild(notification);

    // Se borra sola después de 4 segundos con animación de salida
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Scroll suave para todos los enlaces que apunten a secciones de la página
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Funciones al terminar de cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Inyecta las animaciones de las notificaciones
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Efecto de foco para los inputs de los formularios
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.borderColor = 'var(--color-primario)';
            input.style.boxShadow = '0 0 10px rgba(16, 185, 129, 0.2)';
        });
        
        input.addEventListener('blur', () => {
            if (!input.value.trim()) {
                input.style.borderColor = 'var(--color-borde)';
            }
            input.style.boxShadow = 'none';
        });
    });
});