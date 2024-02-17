// Contador de Stock
var clicks = 0;

function clickME() {
    clicks += 1;
    document.getElementById("clicks").value = clicks;
    document.getElementById("bote").value = "0";
}

function clickME2() {
    if (clicks > 0) {
        clicks -= 1;
        document.getElementById("clicks").value = clicks;
    }
}

/**
 * se llama a controlDinamico al inicio de la pagina 
 * para hacer operaciones de insercion dinamica de los elementos de html
 */
this.controlDinamico();

/**
 * Funciona para dar inicio a la regla de mediaquery y agregar un listener para realizar 
 * los cambios de la estructura html
 */
function controlDinamico() {
    var areaMovs = window.matchMedia("(min-width: 350px) and (max-width: 1200px)");
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
    var precio = document.getElementById('precioRow');
    var productContainer = document.getElementById('productContainer');
    if (regla.matches) {
        var nodoReferencia = document.getElementById('contador');

        precio.style.display = "none";
        productContainer.style.display = "block";
        
        var precioMov = document.createElement('p');
        precioMov.setAttribute('id', 'precioMovil');
        precioMov.textContent = "precio";
        productContainer.insertBefore(precioMov,nodoReferencia)
    } else {
        console.log('else');
        if(document.getElementById('precioMovil')){
            document.getElementById('precioMovil').remove();
        }
        precio.style.display = "block";
        productContainer.style.display = "flex";
    }
}
