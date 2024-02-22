const PRODUCTOS = self.obtenerProductos();

/**
 * se llama a  inicio de la pagina 
 * para hacer operaciones de insercion dinamica de los elementos de html
 */
this.inicio();


function inicio() {
    self.agregarProductosCarrito();
    self.controlDinamico();
    self.obtenerDatosDePago();
}

function obtenerProductos() {
    const productos = window.localStorage.getItem('productosPago');
    return JSON.parse(productos);
}

/**
 * Funciona para dar inicio a la regla de mediaquery y agregar un listener para realizar 
 * los cambios de la estructura html
 */
function controlDinamico() {
    var areaMovs = window.matchMedia("(min-width: 330px) and (max-width: 1200px)");
    areaMovs.addListener(listenerDimensions)
    this.modificador(areaMovs);
}

/**
 * Esta funcion solo sirve de callback para accionar la funcion que modifica
 * el html de forma dinamica de acuerdo a la regla de mediaquery
 * @param {Event} e // evento de cambios en la pantalla 
 */
function listenerDimensions(e) {
    self.modificador(e);
}

/**
 * Modifica el html de forma dinamica en funcion de la regla de mediaquery
 * @param {Event} regla // Evento recibido cuando se cumple o no la regla de mediaquery
 */
function modificador(regla) {
    PRODUCTOS.forEach((producto, index) => {
        var precio = document.getElementById(`precioRow${index}`);
        var productContainer = document.getElementById(`productContainer${index}`);
        if (regla.matches) {
            var nodoReferencia = document.getElementById(`contador${index}`);
    
            precio.style.display = "none";
            productContainer.style.display = "block";
            
            var precioMov = document.createElement('p');
            precioMov.setAttribute('id', `precioMovil${index}`);
            precioMov.textContent = "$" + producto.precio + ".00 MXN";
            productContainer.insertBefore(precioMov,nodoReferencia);
            precioMov.style.position = "relative";
            precioMov.style.left = "50px";

            let nodoReferencia2 = document.getElementById(`precioMovil${index}`);
            let cantidad = document.createElement('p');
            cantidad.setAttribute('id', `cantidadMov${index}`);
            cantidad.textContent = producto.cantidad;
            productContainer.insertBefore(cantidad, nodoReferencia2);
            cantidad.style.position = "relative";
            cantidad.style.left = "130px";
        } else {
            if(document.getElementById(`precioMovil${index}`)){
                document.getElementById(`precioMovil${index}`).remove();
                document.getElementById(`cantidadMov${index}`).remove();
            }
            precio.style.display = "block";
            productContainer.style.display = "flex";
        }    
    });
}

function agregarProductosCarrito() {
    const wrapper = document.getElementById('contenedorVacio');
    PRODUCTOS.forEach((producto, index)=> {
        
          wrapper.innerHTML += `
          <div class="cart-info" id="cartInfo">
          <div class="row-product" id="row-product">
            <img src="${producto.imagen.imagen1}">
            <div class="product-info" id="productContainer${index}">
              <p>${producto.nombre}</p>
              <p id="marca${index}">${producto.marca}</p>
            </div>
          </div>

          <div class="product-specs" id="productSpecs">
            <div class="row-specs">
              <p id="precioRow${index}">$${producto.precio}.00 MXN</p>
            </div>
          </div>

        </div>`
      
      });
}

/*function obtenerSubTotal() {
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
}*/

function obtenerDatosDePago() {
    const cantidadSubTotal = localStorage.getItem('subTotal');
    const cantidadImpuestos = Math.floor(cantidadSubTotal * .16);

    const inputSubtotal = document.getElementById('subTotal');
    const inputImpuesto = document.getElementById('Impuestos');
    const inputEnvio = document.getElementById('Envio');
    const inputTotal = document.getElementById('Total');

    inputSubtotal.textContent = "$" + cantidadSubTotal + ".00 MXN";
    inputImpuesto.textContent = "$" + cantidadImpuestos + ".00 MXN";
    inputEnvio.textContent = "$ 150.00 MXN";

    inputSubtotal.value = parseInt(cantidadSubTotal);
    inputImpuesto.value = parseInt(cantidadImpuestos);
    inputEnvio.value = 150;

    const total = inputSubtotal.value + inputImpuesto.value + inputEnvio.value;

    inputTotal.textContent = "$" + total + ".00 MXN";
}