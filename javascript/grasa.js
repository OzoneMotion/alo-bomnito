

const obtenerProductos = async () => {
  try {
    // Cambiar la url con el endpoint final para productos
    const respuesta = await fetch('http://localhost:3000/productos');
    // const respuesta = await fetch('https://alobomnito.onrender.com/api/v1/Productos');
    if (!respuesta.ok) {
      throw new Error('Error al obtener los productos. Código de estado: ' + respuesta.status);
    }
    const productos = await respuesta.json();
    return productos;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

const data = await obtenerProductos();

let productosContainer = document.querySelector('.productos-container');
productosContainer.innerHTML += `<div class="producto frase">
                <p> ¡Tod@s merecen sentirse bien en su propia piel!</p>
            </div>`;

// const seca = data.filter(element => element.piel === "seca")
// const mixta = data.filter(element => element.piel === "mixta")

const pielGrasa = data.filter(element => element.tipo_piel === "Grasa");


pielGrasa.forEach((element, index) => {
  let imagen1 = element.imagenesProductos[0];
  let imagenUrl1 = imagen1 ? imagen1.url : '';
  let imagen2 = element.imagenesProductos[1];
  let imagenUrl2 = imagen2 ? imagen2.url : '';
  let imagen3 = element.imagenesProductos[2];
  let imagenUrl3 = imagen3 ? imagen3.url : '';

  //Crear la card con el html correspondiente
  productosContainer.innerHTML += `
    <div class="producto">
      <div class="producto__imgs">
      <img class="img-card" alt="Cambiar imagen"  onmouseout="this.src='${imagenUrl1}';" onmouseover="this.src='${imagenUrl2}';" src="${imagenUrl3}" />
      </div>
      <div class="producto__info">
        <p class="producto__nombre" id="${element.id_producto}">${element.nombre}</p>
        <p class="producto__marca" data-index="${index}">${element.marca}</p>
        <p class="producto__contenido">${element.contenido}</p>
        <div class="producto__agregar">
          <p class="producto__precio">$${element.precio}</p>
          <div class="addElement" id="${element.id_producto}"><i class="fa-solid fa-plus" id="icon-card"></i></div>
        </div>
      </div>
    </div>`
});

document.querySelectorAll('.addElement').forEach(item => {
  item.addEventListener('click', function () {
    let indexProducto = parseInt(item.id)
    const producto = data.find(producto => producto.id_producto === indexProducto);
    agregarAlCarrito(producto);
  });
});

const agregarAlCarrito = (producto) => {
  const datosProducto = {
    "nombre": producto.nombre,
    "nombre": producto.nombre,
    "marca": producto.marca,
    "precio": producto.precio,
    "imagenesProductos": producto.imagenesProductos,
    "cantidad_existencia": 1
  }
  const productosCarrito = JSON.parse(localStorage.getItem('productosCarrito')) || []
  productosCarrito.push(datosProducto)
  localStorage.setItem('productosCarrito', JSON.stringify(productosCarrito))
  alert("Se agrego el producto al carrito")
}

document.querySelectorAll('.producto__nombre').forEach(item => {
  item.addEventListener('click', function () {
    let indexProducto = parseInt(item.id);
    const producto = data.find(producto => producto.id_producto === indexProducto);

    crearProductoModal(producto, () => {
      document.getElementById(`add-car-${producto.id_producto}`).addEventListener('click', () => {
        agregarAlCarrito(producto);
      });
    });
    modal.showModal();
  });

});

let img = document.getElementById('img');
let information = document.querySelector('#info');
let accordionDesc = document.querySelector('#accordionDesc');
let accordionIndica = document.querySelector('#accordionIndica');
let accordionIngred = document.querySelector('#accordionIngred');
let tarjetaDescripcion = document.querySelector('#tarjetaDescripcion');
let tarjetaIndicaciones = document.querySelector('#tarjetaIndicaciones');
let tarjetaIngredientes = document.querySelector('#tarjetaIngredientes');

const crearProductoModal = (producto, callback) => {
  let imagen1 = producto.imagenesProductos[0];
  let imagenUrl1 = imagen1 ? imagen1.url : '';

  let imagen2 = producto.imagenesProductos[1];
  let imagenUrl2 = imagen2 ? imagen2.url : '';

  let imagen3 = producto.imagenesProductos[2];
  let imagenUrl3 = imagen3 ? imagen3.url : '';

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
    `<p class="nombre parrafo">${producto.nombre}</p>
  <p class="parrafo">${producto.marca}</p>
  <p class="parrafo">${producto.contenido}</p>
  <p class="precio parrafo">$${producto.precio}.00</p>
  <div class="button-carrito">
  <button id="add-car-${producto.id_producto}" class="add-car">Agregar al carrito</button>
  </div>`;

  tarjetaDescripcion.innerHTML =
    `<p class="parrafo">${producto.descripcion}</p>`;

  tarjetaIndicaciones.innerHTML =
    `<p class="parrafo">${producto.modo_uso}</p>`;

  tarjetaIngredientes.innerHTML =
    recuperarIngredProducto(producto);

  accordionDesc.innerHTML =
    `<p class="parrafo">${producto.descripcion}</p>`;

  accordionIndica.innerHTML =
    `<p class="parrafo">${producto.modo_uso}</p>`;

  accordionIngred.innerHTML =
    recuperarIngredProducto(producto);

  callback();
}

const recuperarIngredProducto = (producto) => {
  let ingredientes = "";

  producto.ingrediente.forEach(producto => {
    ingredientes += `<tr>
      <td>${producto.nombre}</td>
      <td>${producto.funcion}</td>
  </tr>`;
  });
  return ingredientes;
};

const btnClose = document.getElementById("btnClose")
btnClose.addEventListener("click", function () {
  modal.close();
});