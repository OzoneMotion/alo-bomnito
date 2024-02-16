import productos from '../productos.json' assert {type: 'json'};

let back = document.getElementById('back');
let forward = document.getElementById('forward');
let img = document.getElementById('img');
let information = document.querySelector('#info');
let accordionDesc = document.querySelector('#accordionDesc');
let accordionIndica = document.querySelector('#accordionIndica');
let accordionIngred = document.querySelector('#accordionIngred');
let tarjetaDescripcion = document.querySelector('#tarjetaDescripcion');
let tarjetaIndicaciones = document.querySelector('#tarjetaIndicaciones');
let tarjetaIngredientes = document.querySelector('#tarjetaIngredientes');
let actual = 0;

const recuperarIngredProducto = (producto) => {
    let ingredientes = "";

    producto.tabla.forEach(element => {
        ingredientes += `<tr>
        <td>${element.ingrediente}</td>
        <td>${element.funcion}</td>
    </tr>`;
    });
    return ingredientes;
};

function actualizarImagen() {
    let element = productos[actual,0];
    let imagen1 =element.imagen1[0];
    let imagenUrl1= imagen1 ? Object.values(imagen1)[0]:'';
  
    let imagen2 =element.imagen2[0];
    let imagenUrl2= imagen2 ? Object.values(imagen2)[0]:'';
  
    let imagen3 =element.imagen3[0];
    let imagenUrl3= imagen3 ? Object.values(imagen3)[0]:'';


    img.innerHTML = `<img src="${actual === 0 ? imagenUrl1 : (actual === 1 ? imagenUrl2 : imagenUrl3)}" alt="imagen producto">`;

    information.innerHTML = 
    `<p class="nombre">${element.nombre}</p>
    <p>${element.marca}</p>
    <p>${element.contenido}</p>
    <p class="precio">$${element.precio}.00</p>
    <div class="button-carrito">
                <button id="add-car" onclick="location.href=''">Agregar al carrito</button>
            </div>`;

    tarjetaDescripcion.innerHTML = 
    `<p>${element.descripcion}</p>`;

    tarjetaIndicaciones.innerHTML = 
    `<p>${element.uso}</p>`;

    tarjetaIngredientes.innerHTML = 
    recuperarIngredProducto(element);

    accordionDesc.innerHTML = 
    `<p>${element.descripcion}</p>`;

    accordionIndica.innerHTML = 
    `<p>${element.uso}</p>`;

    accordionIngred.innerHTML = 
    recuperarIngredProducto(element);
}

back.addEventListener('click', function() {
    actual -= 1;

    if (actual === -1) {
        actual = 2;
    }
    actualizarImagen();
});

forward.addEventListener('click', function() {
    actual += 1;

    if (actual === 3) {
        actual = 0;
    }
    actualizarImagen();
});
actualizarImagen();

let miniCarrusel = document.querySelector('#mini-carrusel');
let miniBack = document.getElementById('miniBack');
let miniForward = document.getElementById('miniForward');
let miniProductos = [];

productos.forEach(producto => {
    let imagen1 =producto.imagen1[0];
    let imagenUrl1= imagen1 ? Object.values(imagen1)[0]:'';
  
    let imagen2 =producto.imagen2[0];
    let imagenUrl2= imagen2 ? Object.values(imagen2)[0]:'';
  
    let imagen3 =producto.imagen3[0];
    let imagenUrl3= imagen3 ? Object.values(imagen3)[0]:'';

    let mini = document.createElement('div');
    mini.classList.add('mini-mini');
    mini.innerHTML +=
    `<div class="tarjeta-mini">
    <div id="image">
    <img class="image-mini" alt="Imagen mini" onmouseout="this.src='${imagenUrl1}';" onmouseover="this.src='${imagenUrl2}';" src="${imagenUrl3}"/>
    </div>
    <div id="information" class="information-text">
        <p class="mini-nombre">${producto.nombre}</p>
        <p class="mini-texty">${producto.marca}</p>
        <p class="mini-contenido">${producto.contenido}</p>
        <p class="mini-texty">$${producto.precio}.00</p>
    </div>
    </div>`;
    miniProductos.push(mini);
});

let inicio = 0;

function actualizarProducto() {
    miniCarrusel.innerHTML = '';
    let cantidadAMostrar;

    if (window.innerWidth < 744) {
        cantidadAMostrar = 2;
    } else if (window.innerWidth < 992) {
        cantidadAMostrar = 2;
    } else {
        cantidadAMostrar = 4;
    }
    for (let i = 0; i < cantidadAMostrar; i++) {
        let index = (inicio + i) % miniProductos.length;
        miniCarrusel.appendChild(miniProductos[index]);
    }
}

function ajustarInicio(desplazamiento) {
    let cantidadAMostrar;

    if (window.innerWidth < 744) {
        cantidadAMostrar = 2;
    } else if (window.innerWidth <992) {
        cantidadAMostrar = 2;
    } else {
        cantidadAMostrar = 4;
    }

    inicio = (inicio + desplazamiento + miniProductos.length) % miniProductos.length;

    while (inicio > miniProductos.length - cantidadAMostrar) {
        inicio -= cantidadAMostrar;
    }
}

miniBack.addEventListener('click', function() {
    ajustarInicio(-1);
    actualizarProducto();
});

miniForward.addEventListener('click', function() {
    ajustarInicio(1);
    actualizarProducto();
});

window.addEventListener('resize', function() {
    ajustarInicio(0);
    actualizarProducto();
});

ajustarInicio(0);
actualizarProducto();