
//localStorage.setItem("#row-product")

// Contador de Stock

const PRODUCTOS = self.obtenerProductos();

function clickME(index) {
    let elementosSeleccionados = parseInt(document.getElementById(`clicks${index}`).value);
    elementosSeleccionados += 1;
    document.getElementById(`clicks${index}`).value = elementosSeleccionados;
    document.getElementById(`bote${index}`).value = "0";
    self.obtenerSubTotal();
}

function clickME2(index) {
    let elementosSeleccionados = parseInt(document.getElementById(`clicks${index}`).value);
    if (elementosSeleccionados > 0) {
        elementosSeleccionados -= 1;
        document.getElementById(`clicks${index}`).value = elementosSeleccionados;
    }
    self.obtenerSubTotal();
}

/**
 * se llama a controlDinamico al inicio de la pagina 
 * para hacer operaciones de insercion dinamica de los elementos de html
 */
this.inicio();

/**
 * Funciona para dar inicio a la regla de mediaquery y agregar un listener para realizar 
 * los cambios de la estructura html
 */
function controlDinamico(productos) {
    var areaMovs = window.matchMedia("(min-width: 330px) and (max-width: 1200px)");
    areaMovs.addListener(listenerDimensions)
    this.modificador(areaMovs, productos);
}

/**
 * Esta funcion solo sirve de callback para accionar la funcion que modifica
 * el html de forma dinamica de acuerdo a la regla de mediaquery
 * @param {Event} e // evento de cambios en la pantalla 
 */
function listenerDimensions(e) {
    const productos = self.obtenerProductos();
    self.modificador(e, productos);
}

/**
 * Modifica el html de forma dinamica en funcion de la regla de mediaquery
 * @param {Event} regla // Evento recibido cuando se cumple o no la regla de mediaquery
 */
function modificador(regla, productos) {
    productos.forEach((producto, index) => {
        var precio = document.getElementById(`precioRow${index}`);
        var productContainer = document.getElementById(`productContainer${index}`);
        if (regla.matches) {
            var nodoReferencia = document.getElementById(`contador${index}`);
    
            precio.style.display = "none";
            productContainer.style.display = "block";
            
            var precioMov = document.createElement('p');
            precioMov.setAttribute('id', `precioMovil${index}`);
            precioMov.textContent = producto.precio;
            productContainer.insertBefore(precioMov,nodoReferencia)
        } else {
            console.log('else');
            if(document.getElementById(`precioMovil${index}`)){
                document.getElementById(`precioMovil${index}`).remove();
            }
            precio.style.display = "block";
            productContainer.style.display = "flex";
        }    
    });
}

function obtenerProductos() {
    const productos = window.localStorage.getItem('productosCarrito');
    return JSON.parse(productos);
}

function agregarProductosCarrito(productos) {
    // let p = [];
    //p.push(productos);
    //console.log(p);
    const wrapper = document.getElementById('contenedorVacio');
    productos.forEach((producto, index)=> {
        
          wrapper.innerHTML += `
          <div class="cart-info" id="cartInfo">
          <div class="row-product" id="row-product">
            <img src="${producto.imagen.imagen1}">
            <div class="product-info" id="productContainer${index}">
              <p>${producto.nombre}</p>
              <p>${producto.marca}</p>
              <!-- CONTADOR -->
              <div class="contador-carrito" id="contador${index}">
                <div class="restar" id="boty${index}" onClick="clickME2(${index});"> <span class="material-symbols-outlined">
                    remove
                  </span></div>
                <input type="text" value="0" id="clicks${index}" name="clicks" minlength="1" maxlength="3000" required>
                <div class="sumar" id="bote${index}" onClick="clickME(${index});"> <span class="material-symbols-outlined">
                    add
                  </span></div>
              </div>
            </div>
          </div>

          <div class="product-specs" id="productSpecs">
            <div class="row-specs">
              <p id="precioRow${index}">${producto.precio}</p>
              <div class="btn-container">
                <button type="submit" id="btn-delete"> Eliminar </button>
              </div>
            </div>
          </div>

        </div>`
      
      });
}

function inicio() {
   // const productos = self.obtenerProductos();
    self.agregarProductosCarrito(PRODUCTOS);
    self.controlDinamico(PRODUCTOS);
}

function obtenerSubTotal() {
    let subtotal = 0;
    PRODUCTOS.forEach((producto, index) => {
        let elementosSeleccionados = parseInt(document.getElementById(`clicks${index}`).value);
        let precioElemento = producto.precio;
        subtotal = subtotal + (elementosSeleccionados * precioElemento);
    });
    
    //console.log('subtotal', subtotal);
    let subTotal2 = document.getElementById("subTotal");
    subTotal2.textContent = ( " $ " + subtotal +  ".00 MXN "); 
    const guardarLocal = window.localStorage;
    guardarLocal.setItem("subTotal", subtotal);
}

const button = document.getElementById("procederPago")


 button.onclick = function procederPago() {
  PRODUCTOS.forEach((producto, index) => {
    producto.cantidad = parseInt(document.getElementById(`clicks${index}`).value);
  });

  console.log(PRODUCTOS);
  localStorage.setItem('productosPago', JSON.stringify(PRODUCTOS));
  window.location.href = "carrito_de_pago.html";
  /*button.innerHTML = `
  <div class="total-price">
  <div id="subtotal">
      <p >Subtotal</p> 
      <p>Impuestos</p>
      <p>Envío</p>
      <p id="subTotal">${obtenerSubTotal}</p>
      <p id="Impuestos">$0.00 MXN</p>
      <p id="Envio">$150.00 MXN</p>
  </div>
<div class="total2">
  <p class="totalT">Total</p>
  <p class="totalT">$0.00 MXN </p>
</div>

  <div class="btn-container">
      <button type="submit" id="btn-go-toPayment"><a href="./avisoExitoCarrito.html">Ir a pagar</a></button>
  </div>
</div>
  `*/
}