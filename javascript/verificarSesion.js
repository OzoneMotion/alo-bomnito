function verificar() {
    const cuentitaIniciada = document.getElementById("cuentitaIniciada")
    const cuentita = document.getElementById("cuentita")
    const cerrarSesion = document.getElementById("cerrarSesion")
    const cuentaIconDesktop = document.getElementById("cuentaIconDesktop")

    if (localStorage.getItem('usuarioActivo') == ""){
        console.log("inicia sesion")
     } else{
        cuentitaIniciada.classList.remove("desactive")
        cuentita.classList.remove("desactive_desktop")
        cerrarSesion.classList.remove("desactive")
        cuentaIconDesktop.href = "./cuenta.html"
        cuentitaIniciada.classList.add("desactive_desktop")
        cuentita.classList.add("desactive")
     }
}