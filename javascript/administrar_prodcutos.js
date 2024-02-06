import productos from '../productos.json' assert {type: 'json'};

let productosID = document.querySelector('.main-container');
let tablaIngredientes =document.querySelector('.new-cont');

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
                        <th id="pie-card">
                          <button id="open">
                            <span class="material-symbols-outlined">
                            gallery_thumbnail
                            </span>
                          </button>
                          <button id="abrir">
                            <span class="material-symbols-outlined">
                            contact_support
                            </span>
                          </button>
                          <button id="delate" onclick="delateProduct">
                            <span class="material-symbols-outlined">
                            delete
                            </span>
                          </button>
                          <button id="edit" onclick="location.href='./agregar_productos'">
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



const open = document.getElementById('open');
const mod_cont = document.getElementById('mod_cont');
const close = document.getElementById('close');
const abrir = document.getElementById('abrir');
const mod_contenedor = document.getElementById('mod_contenedor');
const cerrar = document.getElementById('cerrar');

open.addEventListener('click', () => {
    mod_cont.classList.add('show');
});

abrir.addEventListener('click', () => {
    mod_contenedor.classList.add('show');
});

close.addEventListener('click', () => {
    mod_cont.classList.remove('show');
});

cerrar.addEventListener('click', () => {
    mod_contenedor.classList.remove('show');
});
