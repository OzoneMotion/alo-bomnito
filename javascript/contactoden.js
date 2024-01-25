// Ejemplo de JavaScript inicial para deshabilitar el envío de formularios si hay campos no válidos
(() => {
    'use strict';

    // Obtiene todos los formularios a los que queremos aplicar estilos de validación Bootstrap
    const forms = document.querySelectorAll('.needs-validation')

    // Bucle sobre ellos y evitar la presentación
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }

        form.classList.add('was-validated');
        }, false);
    });
})();

    document.getElementById('phoneId').addEventListener('input', function () {
        const numero = this.value;

        if (numero.length > 10) {
            this.value = numero.slice(0, 10); // Recorta el valor a 10 caracteres
        }
    });

