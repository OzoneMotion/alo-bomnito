let footer = document.getElementById("footer");

footer.insertAdjacentHTML("beforeend", `<footer>
<div class="contenedor-base-escritorio ocultar-en-mobile">
  <!-- Lado izquierdo -->
  <div class="contenedor-izq ">
    <ul>
      <li> <a href="./iniciar_sesion.html" class="link1">Inicio de sesión</a></li>
      <li> <a href="./conoce_tu_tipo.html" class="link1">Conoce tu tipo de piel</a></li>
      <li> <a href="./carrito_de_compras.html" class="link1">Carrito de compras</a></li>
      <li> <a href="./contacto.html" class="link1">Contacto</a></li>
      <li> <a href="./nosotros.html" class="link1">Sobre nosotros</a></li>
    </ul>
  </div>
  <div class="contenedor-der">
    <!-- Lado derecho-->    
    <ul>
      <li> <a href="https://www.facebook.com/" ><i class="fa-brands fa-facebook-f link1"></i></a><a href="https://www.instagram.com/"><i class="fa-brands fa-instagram link1"></i></a> </li>                    
    </ul> 
  </div>
</div>
<div class="contenedor-base-mobile ocultar-en-escritorio">
<div class="contenedor-base-mobile">
  <!-- Lado izquierdo -->
  <div class="contenedor-izq-mobile">
    <ul>
      <li> <a href="./iniciar_sesion.html" class="link1 ">Inicio de sesión</a></li>
      <li> <a href="" class="link1">Conoce tu tipo de piel</a></li>
      <li> <a href="./carrito_de_compras.html" class="link1">Carrito de compras</a></li>
     </ul>
  </div>
  <div class="contenedor-der-mobile">
    <!-- Lado derecho-->    
    <ul>
      <li> <a href="./nosotros.html" class="link1">Sobre Nosotros</a></li>
      <li> <a href="./contacto.html" class="link1">Contacto</a></li>
      <li> <a href="https://www.facebook.com/" ><i class="fa-brands fa-facebook-f link1"></i></a> <a href="https://www.instagram.com/"><i class="fa-brands fa-instagram link1"></i></a> </li>                    
    </ul> 
  </div>
  </div>
</div>
</footer>
`);
