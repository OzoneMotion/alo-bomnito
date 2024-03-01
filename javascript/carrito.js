
//localStorage.setItem("#row-product")

// Contador de Stock

let PRODUCTOS = self.obtenerProductos();

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
    var areaMovs = window.matchMedia("(min-width: 320px) and (max-width: 1200px)");
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

function eliminarProductosCarrito(index){
 //let productos = window.localStorage.removeItem('productosCarrito')
 // return JSON.parse(productos);
  const elementoEliminar = document.getElementById(`cartInfo${index}`);
  const nombreDeProducto = document.getElementById(`productName${index}`).innerText;
  let productosActualizados = [];
  productosActualizados.push(...PRODUCTOS);
  productosActualizados = productosActualizados.filter((producto) => producto.nombre != nombreDeProducto);
  localStorage.setItem('productosCarrito', JSON.stringify(productosActualizados));
  elementoEliminar.remove();
  PRODUCTOS = productosActualizados;
  const element = document.getElementById("contenedorVacio");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  self.inicio();
}

// function productoParaEliminar(producto) {
//   return producto.nombre === "cherries";
// }

function agregarProductosCarrito(productos) {
    // let p = [];
    //p.push(productos);
    //console.log(p);
    const wrapper = document.getElementById('contenedorVacio');
    productos.forEach((producto, index)=> {
          wrapper.innerHTML += `
          <div class="cart-info" id="cartInfo${index}">
          <div class="row-product" id="row-product">
            <img class="imagenes" id="imagenesProductos" src="${producto.imagenesProductos[0].url}">
            <div class="product-info" id="productContainer${index}">
              <p id="productName${index}" value="${producto.nombre}">${producto.nombre}</p>
              <p>${producto.marca}</p>
              <!-- CONTADOR -->
              <div class="contador-carrito" id="contador${index}">
                <div class="restar" id="boty${index}" onClick="clickME2(${index});"> <span class="material-symbols-outlined">
                    remove
                  </span></div>
                <input type="text" value="${producto.cantidad_existencia}" id="clicks${index}" name="clicks" minlength="1" maxlength="3000" required>
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
                <button type="submit" id="btn-delete" onClick="eliminarProductosCarrito(${index});"> Eliminar </button>
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
    self.obtenerSubTotal();
}

function obtenerSubTotal() {
    let subtotal = 0;
    PRODUCTOS.forEach((producto, index) => {
        let elementosSeleccionados = parseInt(document.getElementById(`clicks${index}`).value);
        let precioElemento = producto.precio;
        subtotal = subtotal + (elementosSeleccionados * precioElemento);
    });
    
    //console.log('subtotal', subtotal);
    let subTotalActualizado = document.getElementById("subTotal");
    subTotalActualizado.textContent = ( " $ " + subtotal +  ".00 MXN "); 
    const guardarLocal = window.localStorage;
    guardarLocal.setItem("subTotal", subtotal);
}

const button = document.getElementById("procederPago")


 button.onclick = function procederPago() {
  const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'))
  if (!usuarioActivo) {
    window.alert('Debes iniciar sesion para continuar')
    return;
  }
  PRODUCTOS.forEach((producto, index) => {
    producto.cantidad = parseInt(document.getElementById(`clicks${index}`).value);
  });

  console.log(PRODUCTOS);
  localStorage.setItem('productosPago', JSON.stringify(PRODUCTOS));
  window.location.href = "carrito_de_pago.html";
}

function obtenerDatosSub(){
  const inputSubtotal = document.getElementById("subTotal")
  inputSubtotal.textContent = "$" + subtotal + ".00 MXN"
}


// let carrito = async () => {
//   const precio = getElementById('precioRow')
//   const marca = getElementById('marca')
//   const imagenes = getElementById("imagenesProductos")

//   const productosBd = 
// }
