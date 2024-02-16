import productos from '../productos.json' assert {type: 'json'};

let productosID = document.querySelector('.main-container');


const recuperarIngredientesProducto = (idProducto) => {
    let ingrendientes = "";

    productos[idProducto - 1].tabla.forEach(elemento => {
        ingrendientes += `<tr>
                            <th class="tabl">${elemento.ingrediente}</th>
                            <th class="tabr">${elemento.funcion}</th>
                        </tr>`;
    });

    return ingrendientes;
}


const recuperarImagenesProducto = (idProducto) => {
    let imagenes = "";

    productos[idProducto - 1].images.forEach(element => {
        imagenes += `<img src="${element.imagen}" alt="">`;
    });

    return imagenes;
}


productos.forEach(item => {
    productosID.innerHTML += `<div class="main-container">
    <div class="col-md-4">
        <div class="card-producto" style="margin-bottom: 1.5rem;">
        <div><img src="../imagenes/1.jpg" class="img-p-card"></div>
            <table>
                <thead>
                    <tr>
                        <th class="textl">ID</th>
                        <th class="textr">${item.nombre}</th>
                    </tr>
                    <tr>
                        <th class="textl">${item.id}</th>
                        <th class="textr">${item.marca}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th class="textl">Tipo de piel</th>
                        <th class="textr">${item.piel}</th>
                    </tr>
                    <tr>
                        <th class="textl">Precio</th>
                        <th class="textr">$${item.precio}</th>
                    </tr>
                    <tr>
                        <th class="textl">Cantidad</th>
                        <th class="textr">00</th>
                    </tr>
                    <tr>
                        <th class="textl">Contenido</th>
                        <th class="textr">${item.contenido}</th>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th class="pie-card">
                          <button class="open" id="btn2-${item.id}">
                            <span class="material-symbols-outlined" id="gallery">
                            gallery_thumbnail
                            </span>
                          </button>
                          <button class="abrir" id="btn-${item.id}">
                            <span class="material-symbols-outlined">
                            contact_support
                            </span>
                          </button>
                          <button class="delete" onclick="deleteProduct(${item.id})">
                            <span class="material-symbols-outlined">
                            delete
                            </span>
                          </button>
                          <button class="edit" onclick="location.href='./agregar_productos'">
                            <span class="material-symbols-outlined">
                            border_color
                            </span>
                          </button>
                        </th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
  </div>`
});


function deleteProduct(id) {

    const index = productos.findIndex((producto) => {
        return producto.id == id;
    });

    let validar = confirm('¿Desea eliminar el producto?');
    console.log(validar);
    if(validar) {
        productos.splice(index, 1);
        alert('El producto fue eliminado');
    }
}

let mods = "";
productos.forEach(producto => {
    mods += `<div class="mod-cont" id="mod_contenedor-${producto.id}">
    <div class="mod" id="mod-${producto.id}">
    <h1 class="cont-text"></h1>

    <ul class="accordion">

        <li>
            <input type="radio" name="accordion" id="first-${producto.id}" checked>
                <label for="first-${producto.id}">Descripción</label>
                <div class="content">
                    <p>${producto.descripcion}</p>
                </div>
        </li>

        <li>
            <input type="radio" name="accordion" id="second-${producto.id}">
                <label for="second-${producto.id}">Ingredientes</label>
                <div class="content">
                    <table>
                        <tbody>
                            ${recuperarIngredientesProducto(producto.id)}
                        </tbody>
                    </table>
                </div>
        </li>

        <li>
            <input type="radio" name="accordion" id="third-${producto.id}" checked>
                <label for="third-${producto.id}">Indicaciones</label>
                <div class="content">
                    <p>${producto.uso}</p>
                </div>
        </li>

    </ul>

    <button class="cerrar" id="cerrar-${producto.id}">Cerrar</button>
</div>
</div>`
});





// console.log(mods);


const abrirButtons = document.querySelectorAll('.abrir');
const modContainer = document.querySelector('.mod-container');

modContainer.insertAdjacentHTML('beforeend', mods);

abrirButtons.forEach(abrirBtn => {
    const abrir = document.getElementById(abrirBtn.id);

    abrir.addEventListener('click', () => {
        const mod_contenedor = document.getElementById(`mod_contenedor-${abrirBtn.id.split('-')[1]}`);
        mod_contenedor.classList.add('show');
    });
});


const cerrarButtons = document.querySelectorAll('.cerrar');

cerrarButtons.forEach(cerrarBtn => {
    cerrarBtn.addEventListener('click', () => {
        const mod_contenedor = document.getElementById(`mod_contenedor-${cerrarBtn.id.split('-')[1]}`);
        mod_contenedor.classList.remove('show');
    });
});



let modales = "";
productos.forEach(producto => {
    modales += `<div class="mod-cont" id="mod_cont-${producto.id}">
    <div class="mod">
      <h1 class="cont-text">Imágenes</h1>
      ${recuperarImagenesProducto(producto.id)}
      <button class="close" id="close-${producto.id}">Cerrar</button>
    </div>
  </div>`
});

const openButtons = document.querySelectorAll('.open');
const modContenedor = document.querySelector('.mod-contenedor');

modContenedor.insertAdjacentHTML('beforeend', modales);

openButtons.forEach(openBtn => {
    const open = document.getElementById(openBtn.id);

    open.addEventListener('click', () => {
        const mod_cont = document.getElementById(`mod_cont-${openBtn.id.split('-')[1]}`);
        mod_cont.classList.add('show');
    });
});

const closeButtons = document.querySelectorAll('.close');

closeButtons.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        const mod_cont = document.getElementById(`mod_cont-${closeBtn.id.split('-')[1]}`)
        mod_cont.classList.remove('show');
        });
    });

