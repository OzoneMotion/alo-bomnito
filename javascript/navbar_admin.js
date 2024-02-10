const navbar_admin = document.getElementById("navbar_admin");

navbar_admin.insertAdjacentHTML("beforeend", `<nav class="navbar navbar-expand-lg bg-body-tertiary subtitulo" aria-label="Thirteenth navbar example">
<div class="container-fluid">
  <span class="navbar-toggler material-symbols-outlined" type="button" data-bs-toggle="offcanvas" data-bs-target="#menuLateral" aria-controls="navbarsExample11" aria-expanded="false" aria-label="Toggle navigation">
    menu
  </span>
  <a class="navbar-brand" href="#"><img class="logo" src="https://raw.githubusercontent.com/Aridai-Perez/Images_Alo-Bomnito/main/ImagenesElementos/LogoOficial.png" alt="logo Alo' Bomnito"> Alo' Bomnito</a>
  <a class="navbar-brand " href="./iniciar_sesion.html"><span class="material-symbols-outlined navbar-brand ocultar-usuario">account_circle</span></a>
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
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="./home.html">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="./administrar_productos.html">Administrar productos</a>
          </li>
          <li class="nav-item oculto-desktop">
              <a class="nav-link" href="./cuenta.html" data-bs-toggle="collapse" data-bs-target="#collapseCuenta">
                Cuenta <span class="material-symbols-outlined">arrow_drop_down</span>
              </a>
            <ul class="collapse colapsable show1" id="collapseCuenta">
              <li><a class="nav-link" href="./iniciar_sesion.html">Mis datos</a></li>
            </ul>
          </li>
          <li> 
            <a class="nav-link" aria-current="page" href="./nosotros.html">Cerrar sesión</a>
          </li>
      </ul>
    </div>
      <div class="d-lg-none aling-self-center canvas-footer titulo">
        <p>ALO' BOMNITO</p>
      </div>
  </div>
</div>
    <div class="icons">
      <a class="navbar-brand" href="./iniciar_sesion.html"><span class="material-symbols-outlined navbar-brand">account_circle</span></a>
    </div>
</nav>`)