import data from '../productos.json' assert {type: 'json'}

//import productos from '../productos.json' assert {type: 'json'}


let contenedorCards = document.querySelector('#contenedor-cards');
// let miniCarrusel = document.querySelector('#mini-carrusel');
// let miniBack = document.getElementById('miniBack');
// let miniForward = document.getElementById('miniForward');
// let miniProductos = [];


data.forEach((element, index)=> {
  let imagen1 =element.imagen1[0];
  let imagenUrl1= imagen1 ? Object.values(imagen1)[0]:'';

  let imagen2 =element.imagen2[0];
  let imagenUrl2= imagen2 ? Object.values(imagen2)[0]:'';

  let imagen3 =element.imagen3[0];
  let imagenUrl3= imagen3 ? Object.values(imagen3)[0]:'';
  
  //Crear la card con el html correspondiente
    contenedorCards.innerHTML += `
    <ul class="products">
    <li>
      <div class="contenedor-img">
      <img  class="img-card" alt="Cambiar imagen"  onmouseout="this.src='${imagenUrl1}';" onmouseover="this.src='${imagenUrl2}';" src="${imagenUrl3}" />
      </div>
      <div class="info-produc">
        <h1>${element.nombre}</h1>
        <p class="products-name" data-index="${index}" id="${element.id}">${element.marca}</p>
        <p class="products-mlgr">${element.contenido}</p>
        <div class="container-agregar">
          <p class="card-precio">$${element.precio}</p>
          <a href="../html/carrito_de_compras.html"><i class="fa-solid fa-plus" id="icon-card"></i></a>
        </div>
      </div>
    </li>
</ul>`

//producto(imagenUrl1,imagenUrl2,imagenUrl3, element)

// let mini = document.createElement('div');
// mini.classList.add('mini-mini');
// mini.innerHTML +=
// `<div class="tarjeta-mini">
// <div id="image">
// <img class="image-mini" alt="Imagen mini" onmouseout="this.src='${imagenUrl1}';" onmouseover="this.src='${imagenUrl2}';" src="${imagenUrl3}"/>
// </div>
// <div id="information" class="information-text">
//     <p class="mini-nombre">${element.nombre}</p>
//     <p class="mini-texty">${element.marca}</p>
//     <p class="mini-contenido">${element.contenido}</p>
//     <p class="mini-texty">$${element.precio}.00</p>
// </div>
// </div>`;
// miniProductos.push(mini);
});


// let inicio = 0;

// function actualizarProducto() {
//     miniCarrusel.innerHTML = '';
//     let cantidadAMostrar;

//     if (window.innerWidth < 744) {
//         cantidadAMostrar = 2;
//     } else if (window.innerWidth < 992) {
//         cantidadAMostrar = 2;
//     } else {
//         cantidadAMostrar = 4;
//     }
//     for (let i = 0; i < cantidadAMostrar; i++) {
//         let index = (inicio + i) % miniProductos.length;
//         miniCarrusel.appendChild(miniProductos[index]);
//     }
// }

// function ajustarInicio(desplazamiento) {
//     let cantidadAMostrar;

//     if (window.innerWidth < 744) {
//         cantidadAMostrar = 2;
//     } else if (window.innerWidth <992) {
//         cantidadAMostrar = 2;
//     } else {
//         cantidadAMostrar = 4;
//     }

//     inicio = (inicio + desplazamiento + miniProductos.length) % miniProductos.length;

//     while (inicio > miniProductos.length - cantidadAMostrar) {
//         inicio -= cantidadAMostrar;
//     }
// }

// miniBack.addEventListener('click', function() {
//     ajustarInicio(-1);
//     actualizarProducto();
// });

// miniForward.addEventListener('click', function() {
//     ajustarInicio(1);
//     actualizarProducto();
// });

// window.addEventListener('resize', function() {
//     ajustarInicio(0);
//     actualizarProducto();
// });

// ajustarInicio(0);
// actualizarProducto();



document.querySelectorAll('.products-name').forEach(item => {
  item.addEventListener('click', function() {
    //alert("hola")
    console.log("hola")
    let ides = item.id -1;
    console.log(ides)
    producto(ides)
    //const aidi = document.getElementById("document")
    
    //console.log(produc)
    
    //const modal = document.getElementById("modal")
    
    modal.showModal();
    // let index = parseInt(this.getAttribute('data-index'));
    // let producto = productos[index];
    // let url = '../html/producto_individual.html'; // Reemplaza 'ruta_del_archivo_del_segundo_codigo.html' por la ruta correcta del segundo código
    
    // // Abrir en una nueva pestaña
    // window.open(url, '_blank');
  });
});

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

function producto(ides){
  console.log(ides)
  console.log(data[ides])

  let imagen1 =data[ides].imagen1[0];
  let imagenUrl1= imagen1 ? Object.values(imagen1)[0]:'';
  
  let imagen2 =data[ides].imagen2[0];
  let imagenUrl2= imagen2 ? Object.values(imagen2)[0]:'';
  
  let imagen3 =data[ides].imagen3[0];
  let imagenUrl3= imagen3 ? Object.values(imagen3)[0]:'';



  img.innerHTML = `<img src="${actual === 0 ? imagenUrl1 : (actual === 1 ? imagenUrl2 : imagenUrl3)}" alt="imagen producto">`;
  
  information.innerHTML = 
  `<p class="nombre">${data[ides].nombre}</p>
  <p>${data[ides].marca}</p>
  <p>${data[ides].contenido}</p>
  <p class="precio">$${data[ides].precio}.00</p>
  <div class="button-carrito">
              <button id="add-car" onclick="location.href=''">Agregar al carrito</button>
              </div>`;

              tarjetaDescripcion.innerHTML = 
              `<p>${data[ides].descripcion}</p>`;
              
              tarjetaIndicaciones.innerHTML = 
              `<p>${data[ides].uso}</p>`;
              
              tarjetaIngredientes.innerHTML = 
              recuperarIngredProducto(data[ides]);
              
              accordionDesc.innerHTML = 
              `<p>${data[ides].descripcion}</p>`;

  accordionIndica.innerHTML = 
  `<p>${data[ides].uso}</p>`;
  
  accordionIngred.innerHTML = 
  recuperarIngredProducto(data[ides]);
}

const recuperarIngredProducto = (producto) => {
  let ingredientes = "";

  producto.tabla.forEach(producto => {
      ingredientes += `<tr>
      <td>${producto.ingrediente}</td>
      <td>${producto.funcion}</td>
  </tr>`;
  });
  return ingredientes;
};


// back.addEventListener('click', function() {
//   actual -= 1;

//   if (actual === -1) {
//       actual = 2;
//   }
//   producto();
// });

// forward.addEventListener('click', function() {
//   actual += 1;

//   if (actual === 3) {
//       actual = 0;
//   }
//   actualizarImagen();
// });
// actualizarImagen();