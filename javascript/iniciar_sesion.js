const formInicio = document.querySelector('#validacion-inicio');
formInicio .addEventListener('submit', (e) =>{
    e.preventDefault()
    
    const email = document.querySelector('#emailId').value
    const password = document.querySelector('#password').value
    console.log(email, password)
    const Usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
    const validarUsuario = Usuarios.find(usuario => usuario.emailId === email && usuario.password === password)

    if(!validarUsuario){
        return alert ('Correo o contraseña incorrectos')
    }
    window.location.href = 'index.html'
})