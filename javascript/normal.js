import data from '../productos.json' assert {type: 'json'}

let contenedorCards = document.querySelector('#contenedor-cards');


data.forEach((element, index)=> {

if (element.piel && element.piel.toLowerCase() === 'normal') {
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
</ul>`;
}
});

document.querySelectorAll('.products-name').forEach(item => {
  item.addEventListener('click', function() {
    
    console.log("hola")
    let ides = item.id -1;
    console.log(ides)
    producto(ides)

    modal.showModal();
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