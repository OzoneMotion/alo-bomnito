const formInicio = document.querySelector('#validacion-inicio');
const mensajeError = document.querySelector('#mensajeErrorIni');
const imputEmail = document.querySelector('#emailId');
const imputPassword = document.querySelector ('#password');

formInicio.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = imputEmail.value;
    const password = imputPassword.value;

    //const email = document.querySelector('#emailId').value;
    //const password = document.querySelector('#password').value;

    //const Usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const Usuarios = await getData();

    const validarUsuario = Usuarios.find(usuario => usuario.emailId === email && usuario.password === password);

    if (!validarUsuario) {
        mensajeError.style.display = 'block';
        return;
    } else {
        localStorage.setItem('inicio_exitoso', JSON.stringify(validarUsuario));
        window.location.href = 'index.html';
    }
});
    imputEmail.addEventListener('input', () => {
        mensajeError.style.display = 'none'; // Ocultar el mensaje de error cuando se modifica el campo de correo electrónico
    });

    imputPassword.addEventListener('input', () => {
        mensajeError.style.display = 'none'; // Ocultar el mensaje de error cuando se modifica el campo de contraseña
    });

// Función para obtener los datos del archivo JSON
const getData = async () => {
    try {
        const response = await fetch("http://localhost:3000/users", { 
        method: "GET",
        headers: {
            "Content-Type": "application/json"
            }
        });
        console.log (response);
        if (response.ok) {
            return await response.json();
        } else {
            console.log('Error al obtener los datos del archivo db.json:', response.statusText);
            return [];
        }
    } catch (error) {
        console.log('Error:', error);
        return [];
    }
};
