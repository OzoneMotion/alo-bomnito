import data from '../productos.json' assert {type: 'json'}

let contenedorCards = document.querySelector('#contenedor-cards');


data.forEach((element, index)=> {
  if (element.piel === 'normal') {

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
  }
  
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


