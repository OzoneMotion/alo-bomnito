// Ejemplo de JavaScript inicial para deshabilitar el envío de formularios si hay campos no válidos
(() => {
    'use strict'

    // Obtenga todos los formularios a los que queremos aplicar estilos de validación Bootstrap personalizados
    const forms = document.querySelectorAll('.needs-validation')

    // Bucle sobre ellos y evitar la presentación
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }

        form.classList.add('was-validated')
        }, false)
    })
    })()