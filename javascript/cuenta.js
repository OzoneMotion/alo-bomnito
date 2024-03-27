const nameId = document.getElementById("nameId");
const emailId = document.getElementById("emailId");
const passwordId =  document.getElementById("password")

async function imprimirUsuario(idCliente) {
    const usuariosLocales = JSON.parse(localStorage.getItem('usuarioActivo'));
    //usuarioEncontrado = usuariosLocales.find((usuario) => (usuario.emailId === usuarioActual && usuario.password === passwordActual));
    console.log(usuariosLocales)

    // const usuarios = await getData();
    // const usuario = usuarios.find(usuario => usuario.idCliente === idCliente)
    nameId.innerHTML = `${usuariosLocales.nombre}`;
    emailId.innerHTML = `${usuariosLocales.correo}`;
    mostrarContrasenia(usuariosLocales)
    verificar()
}

function mostrarContrasenia(usuario) {
    const contrasenia = usuario.contrasenia;
    const contraseniaLenght = contrasenia.length;
    let passwordAst = "";

    for (let i = 1; i < contraseniaLenght; i++) {
        passwordAst = passwordAst + '*';
    }

    if (passwordId.innerText == "") {
        passwordId.innerHTML = `${passwordAst}`;
    }

}

function Visibility(){
    //const Usuarios = await getData();
    const usuariosLocales = JSON.parse(localStorage.getItem('usuarioActivo'));
    const password = usuariosLocales.contrasenia;
    const passwordLenght = `${usuariosLocales.contrasenia}`.length;
    let passwordAst = ""

    for(let i = 1; i < passwordLenght; i++) {
        passwordAst = passwordAst + '*'
    }

    if(passwordId.innerText == `${password}`){
        passwordId.innerHTML = `${passwordAst}`;
    } else if(passwordId.innerText == passwordAst) {
        passwordId.innerHTML = `${password}`;
    } else if(passwordId.innerText == ""){
        passwordId.innerHTML = `${passwordAst}`;
    }

}

function verificar() {
    const cerrarSes = document.getElementById("cerrarSes")
    const cerrarSesion = document.getElementById("cerrarSesion")
    const cuentitaIniciada = document.getElementById("cuentitaIniciada")
    const cuentita = document.getElementById("cuentita")
    const cuentaIconDesktop = document.getElementById("cuentaIconDesktop")

    if (localStorage.getItem('usuarioActivo') == null){

     } else{
        cuentitaIniciada.classList.remove("desactive")
        cuentita.classList.remove("desactive_desktop")
        cerrarSesion.classList.remove("desactive")
        cuentaIconDesktop.href = "./cuenta.html"
        cuentitaIniciada.classList.add("desactive_desktop")
        cuentita.classList.add("desactive")
     }

    cerrarSesion.addEventListener('click', () => {
        localStorage.clear();
    });
    
    cerrarSes.addEventListener('click', () => {
        localStorage.clear();
        window.location = "index.html"    
    });

}

imprimirUsuario(1);