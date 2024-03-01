function verificar() {
    const cerrarSesion = document.getElementById("cerrarSesion")
    const cuentitaIniciada = document.getElementById("cuentitaIniciada")
    const cuentita = document.getElementById("cuentita")
    const cuentaIconDesktop = document.getElementById("cuentaIconDesktop")
    let count = 1
    if (localStorage.getItem('usuarioActivo') == null){

     } else{
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

}