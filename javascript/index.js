const verificarSesion = () => {
    const usuario = JSON.parse(localStorage.getItem('inicio_exitoso'));
    if (!usuario){
        window.location.html = 'iniciar_sesion.html'
    }
}

const cerrar = document.querySelector('#cerrarSesion')

cerrar.addEventListener('click', () =>{
    alert ('Hasta pronto')
    localStorage.removeItem ('inicio_exitoso')
    window.location.href = 'index.html'
})

/*
const usuario = JSON.parse(localStorage.getItem('inicio_exitoso')) || false
if (!usuario){
    window.location.html = 'iniciar_sesion.html'
}

const cerrar = document.querySelector('#cerrarSesion')

cerrar.addEventListener('click', () =>{
    alert ('Hasta pronto')
    localStorage.removeItem ('inicio_exitoso')
    window.location.href = 'index.html'
})
*/



/*
PARA VERIFICAR EL INICIO DE SESION EN EL CARRITO
const verificarSesionEnCarrito = () => {
    const usuario = JSON.parse(localStorage.getItem('inicio_exitoso'));
    if (!usuario) {
        
        alert("Por favor, inicia sesión o regístrate antes de continuar.");
        window.location.href = 'a que ventana manda'; // Redirigir a la página de inicio de sesión o registro
    } else {
        // Si el usuario ha iniciado sesión, mostrar la barra de navegación para usuarios autenticados
        document.getElementById("navAutenticado").style.display = "block";
        document.getElementById("navNoAutenticado").style.display = "none";
    }
}
*/