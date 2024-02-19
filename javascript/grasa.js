import data from '../productos.json' assert {type: 'json'}



let contenedorCards = document.querySelector('#contenedor-cards');

data.forEach((element, index)=> {
    if (element.piel === 'grasa') {
  let imagen1 =element.imagen1[0];
  let imagenUrl1= imagen1 ? Object.values(imagen1)[0]:'';

  let imagen2 =element.imagen2[0];
  let imagenUrl2= imagen2 ? Object.values(imagen2)[0]:'';

  let imagen3 =element.imagen3[0];
  let imagenUrl3= imagen3 ? Object.values(imagen3)[0]:'';
  
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
    }
});