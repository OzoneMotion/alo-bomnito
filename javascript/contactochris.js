document.getElementById('phoneId').addEventListener('input', function () {
    const numero = this.value;

    if (numero.length > 10) {
        this.value = numero.slice(0, 10); // Recorta el valor a 10 caracteres
    }
});