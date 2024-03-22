function verificar() {
    const cerrarSesion = document.getElementById("cerrarSesion")
    const cuentitaIniciada = document.getElementById("cuentitaIniciada")
    const cuentita = document.getElementById("cuentita")
    const cuentaIconDesktop = document.getElementById("cuentaIconDesktop")
    const cuentitaMobil = document.getElementById("cuentitaMobil")
     
    let admin = JSON.parse(localStorage.getItem('usuarioActivo'))
    let count = 1
    if (localStorage.getItem('usuarioActivo') == null){

    } else if (admin.num_administrador){
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
        cuentaIconMobile.href = "cuenta_admin.html"
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
        cuentaIconDesktop.href = "cuenta_admin.html"
        carritoIconDesktop.classList.add("desactive")
        cuentitaMobil.href = "cuenta_admin.html"
    } else {
        cuentitaIniciada.classList.remove("desactive")
        cuentita.classList.remove("desactive_desktop")
        cerrarSesion.classList.remove("desactive")
        cuentaIconDesktop.href = "cuenta.html"
        cuentitaIniciada.classList.add("desactive_desktop")
        cuentita.classList.add("desactive")
        cuentitaMobil.href = "cuenta.html"
     }

    console.log(cerrarSesion)
    cerrarSesion.addEventListener('click', () => {
        localStorage.clear();
        window.location = "index.html"
    });

}