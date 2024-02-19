import data from '../productos.json' assert {type: 'json'}

let contenedorCards = document.querySelector('#contenedor-cards');


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
    <li class="producto">
      <div class="contenedor-img">
      <img class="img-card" alt="Cambiar imagen"  onmouseout="this.src='${imagenUrl1}';" onmouseover="this.src='${imagenUrl2}';" src="${imagenUrl3}" />
      </div>
      <div class="info-produc">
        <p class="productoNombre" id="${element.id}">${element.nombre}</p>
        <p class="products-name" data-index="${index}">${element.marca}</p>
        <p class="products-mlgr">${element.contenido}</p>
        <div class="container-agregar">
          <p class="card-precio">$${element.precio}</p>
          <div class="${element.id}" id="addElement"><i class="fa-solid fa-plus" id="icon-card"></i></div>
        </div>
      </div>
    </li>
</ul>`

});


document.querySelectorAll('#addElement').forEach(item => {
  item.addEventListener('click', function() {
    let indexProducto = item.className - 1
    agregarAlCarrito(indexProducto)
  });
});

function agregarAlCarrito(indexProducto){

  const nombre = data[indexProducto].nombre;
  const marca = data[indexProducto].marca;
  const precio = data[indexProducto].precio;
  const imagen = data[indexProducto].imagen1[0]
  let cantidad = 1

  const productosCarrito = JSON.parse(localStorage.getItem('productosCarrito')) || []

  productosCarrito.push({nombre : nombre, marca : marca, precio : precio, imagen : imagen, cantidad : cantidad})
  localStorage.setItem('productosCarrito', JSON.stringify(productosCarrito))
  alert("Se agrego el producto al carrito")

}

document.querySelectorAll('.productoNombre').forEach(item => {
  item.addEventListener('click', function() {
    let ides = item.id -1;
    console.log(ides)
    producto(ides)
    
    modal.showModal();
  });
});

const boton = document.getElementById("add-car")
//document.querySelectorAll('#add-car').forEach(boton => {
  boton.addEventListener('click', function() {
    alert("hola")
  });


let img = document.getElementById('img');
let information = document.querySelector('#info');
let accordionDesc = document.querySelector('#accordionDesc');
let accordionIndica = document.querySelector('#accordionIndica');
let accordionIngred = document.querySelector('#accordionIngred');
let tarjetaDescripcion = document.querySelector('#tarjetaDescripcion');
let tarjetaIndicaciones = document.querySelector('#tarjetaIndicaciones');
let tarjetaIngredientes = document.querySelector('#tarjetaIngredientes');

function producto(ides){

  console.log(ides)
  console.log(data[ides])

  let imagen1 =data[ides].imagen1[0];
  let imagenUrl1= imagen1 ? Object.values(imagen1)[0]:'';
  
  let imagen2 =data[ides].imagen2[0];
  let imagenUrl2= imagen2 ? Object.values(imagen2)[0]:'';
  
  let imagen3 =data[ides].imagen3[0];
  let imagenUrl3= imagen3 ? Object.values(imagen3)[0]:'';



  img.innerHTML = `<div id="carouselExampleDark" class="carousel carousel-dark slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active" data-bs-interval="10000">
      <img src="${imagenUrl1}" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item" data-bs-interval="2000">
    <img src="${imagenUrl2}" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
    <img src="${imagenUrl3}" class="d-block w-100" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;
  
  information.innerHTML = 
  `<p class="nombre parrafo">${data[ides].nombre}</p>
  <p class="parrafo">${data[ides].marca}</p>
  <p class="parrafo">${data[ides].contenido}</p>
  <p class="precio parrafo">$${data[ides].precio}.00</p>
  <div class="button-carrito">
  <button type="button" id="add-car" class="${data[ides].id}" onclick="agregarAlCarrito(${data[ides].id - 1})"">Agregar al carrito</button>
  </div>`;
  
  tarjetaDescripcion.innerHTML = 
  `<p class="parrafo">${data[ides].descripcion}</p>`;
  
              tarjetaIndicaciones.innerHTML = 
              `<p class="parrafo">${data[ides].uso}</p>`;
              
              tarjetaIngredientes.innerHTML = 
              recuperarIngredProducto(data[ides]);
              
              accordionDesc.innerHTML = 
              `<p class="parrafo">${data[ides].descripcion}</p>`;

  accordionIndica.innerHTML = 
  `<p class="parrafo">${data[ides].uso}</p>`;
  
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

//});


const btnClose = document.getElementById("btnClose")

btnClose.addEventListener("click", function () {
  modal.close();
});