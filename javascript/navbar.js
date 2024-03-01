const navbar = document.getElementById("navbar");

navbar.insertAdjacentHTML("afterbegin", ` <nav class="navbar navbar-expand-lg bg-body-tertiary" aria-label="Thirteenth navbar example">
<div class="container-fluid ">
    <span class="navbar-toggler material-symbols-outlined" type="button" data-bs-toggle="offcanvas" data-bs-target="#menuLateral" aria-controls="navbarsExample11" aria-expanded="false" aria-label="Toggle navigation">
      menu
    </span>
  <a class="navbar-brand img-logo" href="#top"><img class="logo" src="https://raw.githubusercontent.com/Aridai-Perez/Images_Alo-Bomnito/main/ImagenesElementos/LogoOficial.png" alt="logo Alo' Bomnito"></a>
  <a class="navbar-brand desactive" href="./iniciar_sesion.html" id="cuentaIconMobile"><span class="material-symbols-outlined navbar-brand">account_circle</span></a>
  <a class="navbar-brand desactive_desktop" href="./carrito_de_compras.html" id="carritoIconMobile"><span class="material-symbols-outlined">shopping_cart</span></a>
    <div class="offcanvas offcanvas-start canvas-body" id="menuLateral">
      <div class="offcanvas-header">
        <button class="btn-cerrar-border" type="button" aria-label="Close" data-bs-dismiss="offcanvas">
          <span class="material-symbols-outlined">
            close
            </span>
        </button>
      </div>
      <div class="offcanvas-body d-flex flex-column">
        <ul class="navbar-nav col-lg-5 justify-content-lg-center justifyContent-desktop">
            <li class="nav-item" id="homecito">
              <a class="nav-link" aria-current="page" href="./index.html">Home</a>
            </li>
            <li class="nav-item" id="pielecitas">
                <a class="nav-link" data-bs-toggle="collapse" data-bs-target="#collapseTipos">
                  Tipos de piel <span class="material-symbols-outlined">arrow_drop_down</span>
                </a>
              <ul class="collapse colapsable show1" id="collapseTipos">
                <li><a class="nav-link" href="./mixta.html">Mixta</a></li>
                <li><a class="nav-link" href="./grasa.html">Grasa</a></li>
                <li><a class="nav-link" href="./seca.html">Seca</a></li>
                <li><a class="nav-link" href="./normal.html">Normal</a></li>
                <li><a class="nav-link" href="./productos.html">Productos</a></li>
              </ul>
            </li>
            <li class="nav-item" id="conoce_TuPiel">
              <a class="nav-link" href="./cuestionario.html">Conoce tu tipo de piel</a>
            </li>
            <li class="nav-item desactive" id="cuentitaIniciada">
              <a class="nav-link" href="./cuenta.html" data-bs-toggle="collapse" data-bs-target="#collapseCuenta">
                Cuenta <span class="material-symbols-outlined">arrow_drop_down</span>
              </a>
            <ul class="collapse colapsable show1" id="collapseCuenta">
              <li>
                <a class="nav-link" href="mis_datos.html">Mis datos</a>
              </li>
            </ul>
            </li>
            <li class="nav-item desactive_desktop" id="cuentita">
                <a class="nav-link" href="./cuenta.html" data-bs-toggle="collapse" data-bs-target="#collapseCuentaIniciada">
                  Cuenta <span class="material-symbols-outlined">arrow_drop_down</span>
                </a>
              <ul class="collapse colapsable show1" id="collapseCuentaIniciada">
                <li><a class="nav-link" href="./iniciar_sesion.html">Iniciar sesión</a></li>
                <li><a class="nav-link" href="./crear_mi_cuenta.html">Crear mi cuenta</a></li>
              </ul>
            </li>
            <li class="nav-item" id="nosotres"> 
              <a class="nav-link" aria-current="page" href="./nosotros.html">Sobre nosotres</a>
            </li>
            <li class="nav-item" id="contactito">
              <a class="nav-link" href="./contacto.html">Contacto</a>
            </li>
            <li class="nav-item desactive" id="adminPage">
              <a class="nav-link" href="./administrar_productos.html">Administrar productos</a>
            </li>
            <li class="nav-item desactive" id="cerrarSesion">
              <a class="nav-link" href="./cerrar_sesion.html">Cerrar sesión</a>
            </li>
        </ul>
      </div>
        <div class="d-lg-none aling-self-center canvas-footer titulo">
          <p>ALO' BOMNITO</p>
        </div>
    </div>
</div>
  <div class="icons">
    <a class="navbar-brand" href="./iniciar_sesion.html" id="cuentaIconDesktop"><span class="material-symbols-outlined navbar-brand">account_circle</span></a>
    <a class="navbar-brand" href="./carrito_de_compras.html" id="carritoIconDesktop"><span class="material-symbols-outlined navbar-brand">shopping_cart</span></a>
  </div>
</nav>`)