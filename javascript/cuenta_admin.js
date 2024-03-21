const admnId = document.getElementById("admnId")
const nameId = document.getElementById("nameId");
const emailId = document.getElementById("emailId");
const passwordId =  document.getElementById("password")

async function imprimirUsuario(idCliente) {
    const usuariosLocales = JSON.parse(localStorage.getItem('usuarioActivo'));
    //usuarioEncontrado = usuariosLocales.find((usuario) => (usuario.emailId === usuarioActual && usuario.password === passwordActual));
    console.log(usuariosLocales)

    // const usuarios = await getData();
    // const usuario = usuarios.find(usuario => usuario.idCliente === idCliente)
    nameId.innerHTML = "Cheems"
    emailId.innerHTML = `${usuariosLocales.correo}`;
    admnId.innerHTML = `${usuariosLocales.nombre}`;
    mostrarContrasenia(usuariosLocales)
    verificar()
}

function mostrarContrasenia(usuario) {
    const contrasenia = usuario.password;
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
        let admin = JSON.parse(localStorage.getItem('usuarioActivo'))

        if (localStorage.getItem('usuarioActivo') == null){
    
        } else if (admin.num_administrador != ""){
            const cuentaIconMobile = document.getElementById("cuentaIconMobile")
            const carritoIconMobile = document.getElementById("carritoIconMobile")
            const homecito = document.getElementById("homecito")
            const pielecitas = document.getElementById( "pielecitas" )
            const conoce_TuPiel = document.getElementById( 'conoce_TuPiel' )
            const nosotres = document.getElementById("nosotres")
            const contactito = document.getElementById("contactito")
            const carritoIconDesktop = document.getElementById("carritoIconDesktop")
            const adminPage = document.getElementById("adminPage")
    
            cuentaIconMobile.classList.remove("desactive")
            cuentaIconMobile.classList.add("desactive_desktop")
            carritoIconMobile.classList.remove("desactive_desktop")
            carritoIconMobile.classList.add("desactive")
            homecito.classList.add("desactive")
            pielecitas.classList.add("desactive")
            conoce_TuPiel.classList.add("desactive")
            cuentitaIniciada.classList.remove("desactive")
            cuentitaIniciada.classList.add("desactive_desktop")
            cuentita.classList.remove("desactive_desktop")
            cuentita.classList.add("desactive")
            nosotres.classList.add("desactive")
            contactito.classList.add("desactive")
            adminPage.classList.remove("desactive")
            cerrarSesion.classList.remove("desactive")
            cuentaIconDesktop.href = "./cuenta_admin.html"
            carritoIconDesktop.classList.add("desactive")
        } else {
            cuentitaIniciada.classList.remove("desactive")
            cuentita.classList.remove("desactive_desktop")
            cerrarSesion.classList.remove("desactive")
            cuentaIconDesktop.href = "./cuenta.html"
            cuentitaIniciada.classList.add("desactive_desktop")
            cuentita.classList.add("desactive")
         }
    
        console.log(cerrarSesion)
        cerrarSesion.addEventListener('click', () => {
            localStorage.clear();
            window.location = "index.html"
        });
    
        cerrarSes.addEventListener('click', () => {
            localStorage.clear();
            window.location = "index.html"    
        });
    }
    

