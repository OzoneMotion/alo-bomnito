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


const recuperarImagenesProducto = (idProduct) => {
    let imagenes = "";

    productos[idProduct - 1].images.forEach(element => {
        imagenes += `<img src="${element.imagen}" alt="">`;
    });

    return imagenes;
}


productos.forEach(item => {
    productosID.innerHTML += `<div class="main-container">
    <div class="col-md-4">
        <div class="card-producto" style="margin-bottom: 1.5rem;">
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
                          <button class="open">
                            <span class="material-symbols-outlined">
                            gallery_thumbnail
                            </span>
                          </button>
                          <button class="abrir" id="btn-${item.id}">
                            <span class="material-symbols-outlined">
                            contact_support
                            </span>
                          </button>
                          <button class="delate" onclick="delateProduct">
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

let mods = "";
productos.forEach(producto => {
    mods += `<div class="mod-cont" id="mod_contenedor-${producto.id}">
    <div class="mod" id="mod-${producto.id}">
    <h1 class="cont-text"></h1>

    <ul class="accordion">

        <li>
            <input type="radio" name="accordion" id="first-${producto.id}" checked>
                <label for="first-${producto.id}">Modo de uso</label>
                <div class="content">
                    <p>${producto.uso}</p>
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

    </ul>

    <button class="cerrar" id="cerrar-${producto.id}">Cerrar</button>
</div>
</div>`
});

// console.log(mods);

const openButtons = document.querySelectorAll('.open');
const modCtenedor = document.querySelector('.mod_ctenedor');
const closeButtons = document.querySelectorAll('.close');
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




let modes = "";
productos.forEach(product => {
    mods += `<div class="mod-cont" id="mod_cont-${product.id}">
    <div class="mod">
      <h1 class="cont-text">Imágenes</h1>
      ${recuperarImagenesProducto(product.id)}
      <button class="close" id="close-${product.id}">Cerrar</button>
    </div>
  </div>`
});

// console.log(modes);

modCtenedor.insertAdjacentHTML('beforeend', modes);

openButtons.forEach(openBtn => {
    const open = document.getElementById(openBtn.id);

    open.addEventListener('click', () => {
        const mod_cont = document.getElementById(`mod_cont-${openBtn.id.split('-')[1]}`);
        mod_cont.classList.add('show');
    });
});

closeButtons.forEach(closeBtn => {
    const close = document.getElementById(closeBtn.id);

    close.addEventListener('click', () => {
        const mod_cont = document.getElementById(`mod_cont-${closeBtn.id.split('-')[1]}`)
        mod_cont.classList.remove('show');
        });
    });