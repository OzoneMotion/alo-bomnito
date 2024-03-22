// import productos from '../productos2.json' assert {type: 'json'};

const obtenerProductos = async () => {
    try {
        // Cambiar la url con el endpoint final para productos
        //const respuesta = await fetch('http://localhost:3000/productos');
        const respuesta = await fetch('https://alobomnito.onrender.com/api/v1/Productos');
        if (!respuesta.ok) {
            throw new Error('Error al obtener los productos. Código de estado: ' + respuesta.status);
        } else {
            const productos = await respuesta.json();
            console.log(productos)
            return productos;
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
};

const productos = await obtenerProductos();
let productosID = document.querySelector('.main-container');
const modContenedor = document.querySelector('.mod-contenedor');

const recuperarIngredientesProducto = (productos, idProducto) => {
    let ingredientes = "";
    const jsonProducto = productos.find(producto => producto.id_producto === idProducto);
    jsonProducto.ingrediente.forEach(elemento => {
        ingredientes += `<tr>
                            <th class="tabl">${elemento.nombre}</th>
                            <th class="tabr">${elemento.funcion}</th>
                        </tr>`;
    });

    return ingredientes;
}

const recuperarImagenesProducto = (productos, idProducto) => {
    let imagenes = "";
    const jsonProducto = productos.find(producto => producto.id_producto === idProducto);
    if (jsonProducto && jsonProducto.imagenesProductos) {
        jsonProducto.imagenesProductos.forEach((imagen, index) => {

            // Agrega la clase 'active' solo si es la primera imagen
            const activeClass = index === 0 ? 'active' : '';
            imagenes += `<div class="carousel-item ${activeClass}">
                    <img src="${imagen.url}" class="d-block w-100">
                </div>`;
        });
    }

    let resultado = `<aside id="carrusel-modal-p${idProducto}" class="carousel slide carrusel-imgs-modal" data-bs-touch="true">
                <div class="carousel-inner">
                ${imagenes}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carrusel-modal-p${idProducto}" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carrusel-modal-p${idProducto}" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
            </aside>
    `;

    return resultado;
}

// const deleteProduct = (id) => {
//     const index = productos.findIndex((producto) => {
//         return producto.id_producto == id;
//     });

//     let validar = confirm('¿Desea eliminar el producto?');
//     console.log(validar);
//     if (validar) {
//         productos.splice(index, 1);
//         alert('El producto fue eliminado');
//     }
// }

productos.forEach(item => {
    productosID.innerHTML += `<section class="card-container" id="card-producto-${item.id_producto}">
            <aside id="carrusel-p${item.id_producto}" class="carousel slide carrusel-imgs" data-bs-touch="true">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="${item.imagenesProductos[0].url}"
                            class="d-block w-100">
                    </div>
                    <div class="carousel-item">
                        <img src="${item.imagenesProductos[1].url}"
                            class="d-block w-100">
                    </div>
                    <div class="carousel-item">
                        <img src="${item.imagenesProductos[2].url}"
                            class="d-block w-100">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carrusel-p${item.id_producto}" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carrusel-p${item.id_producto}" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
            </aside>
            <div class="datos-producto">
            <header class="header-producto-container" id="producto-${item.id_producto}">
                <div class="id-container">
                    <p>ID</p>
                    <p id="id-producto-${item.id_producto}">${item.id_producto}</p>
                </div>
                <div class="nombre-container">
                    <p id="id-producto-${item.id_producto}">${item.nombre}</p>
                    <p id="id-marca-${item.id_producto}">${item.marca}</p>
                </div>
            </header>
            <hr class="hr">
            <main class="main-producto-container">
                <div class="tipo-piel-container">
                    <p class="etiqueta-producto">Tipo de piel</p>
                    <p class="tipo-piel" id="tipo-piel-producto-${item.id_producto}">${item.tipo_piel}</p>
                </div>
                <div class="precio-container">
                    <p class="etiqueta-producto">Precio</p>
                    <p class="tipo-piel" id="precio-producto-${item.id_producto}">$${item.precio}</p>
                </div>
                <div class="cantidad-container">
                    <p class="etiqueta-producto">Cantidad</p>
                    <p class="tipo-piel" id="cantidad-producto-${item.id_producto}">000</p>
                </div>
                <div class="contenido-container">
                    <p class="etiqueta-producto">Contenido</p>
                    <p class="tipo-piel" id="contenido-producto-${item.id_producto}">${item.contenido}</p>
                </div>
            </main>
            <div class="botones-producto-footer">
                <button class="abrir-imagen" id="btn-abrir-img-p${item.id_producto}">
                    <span class="material-symbols-outlined">
                        gallery_thumbnail
                    </span>
                </button>
                <button class="abrir-info" id="btn-abrir-info-p${item.id_producto}">
                    <span class="material-symbols-outlined">
                        contact_support
                    </span>
                </button>
                <button class="borrar-producto" id="btn-borrar-p${item.id_producto}" onclick="deleteProduct(${item.id_producto})">
                    <span class="material-symbols-outlined">
                        delete
                    </span>
                </button>
                <button class="editar-producto" id="btn-editar-p${item.id_producto}" onclick="location.href='./agregar_productos'">
                    <span class="material-symbols-outlined">
                        border_color
                    </span>
                </button>
            </div>
            </div>
        </section>`;
});

let modalesDescripcion = "";
productos.forEach(producto => {
    modalesDescripcion += `<div class="mod-cont" id="mod_contenedor-${producto.id_producto}">
    <div class="mod" id="mod-${producto.id_producto}">
    <ul class="accordion">

        <li>
            <input type="radio" name="accordion" id="first-${producto.id_producto}" checked>
                <label for="first-${producto.id_producto}">Descripción</label>
                <div class="content">
                    <p class="contenido">${producto.descripcion}</p>
                </div>
        </li>

        <li>
            <input type="radio" name="accordion" id="second-${producto.id_producto}">
                <label for="second-${producto.id_producto}">Ingredientes</label>
                <div class="content">
                    <table>
                        <tbody>
                            ${recuperarIngredientesProducto(productos, parseInt(producto.id_producto), 10)}
                        </tbody>
                    </table>
                </div>
        </li>

        <li>
            <input type="radio" name="accordion" id="third-${producto.id_producto}" checked>
                <label for="third-${producto.id_producto}">Indicaciones</label>
                <div class="content">
                    <p class="contenido">${producto.modo_uso}</p>
                </div>
        </li>

    </ul>

    <button class="cerrar btn-alo" id="cerrar-${producto.id_producto}">Cerrar</button>
</div>
</div>`
});

let modalesImagenes = "";
productos.forEach(producto => {
    modalesImagenes += `<div class="mod-cont" id="mod_cont-${producto.id_producto}">
        <div class="mod mod-img">
            <h1 class="cont-text">Imágenes</h1>
            ${recuperarImagenesProducto(productos, parseInt(producto.id_producto, 10))}
            <button class="close btn-alo" id="close-${producto.id_producto}">Cerrar</button>
        </div>
    </div>`
});

modContenedor.insertAdjacentHTML('beforeend', modalesDescripcion);
modContenedor.insertAdjacentHTML('beforeend', modalesImagenes);

const abrirInfoButtons = document.querySelectorAll('.abrir-info');
abrirInfoButtons.forEach(abrirInfoBtn => {
    abrirInfoBtn.addEventListener('click', () => {
        const id = abrirInfoBtn.id;
        // console.log(id);
        // const idBtn = id.charAt(id.length - 2) + id.charAt(id.length - 1); 
        const idBtn = obtenerUltimosNumeros(id);
        console.log(idBtn);
        const mod_contenedor = document.getElementById(`mod_contenedor-${idBtn}`);
        mod_contenedor.classList.add('show');
    });
});

const cerrarButtons = document.querySelectorAll('.cerrar');
cerrarButtons.forEach(cerrarBtn => {
    cerrarBtn.addEventListener('click', () => {
        const id = cerrarBtn.id;
        // const idBtn = id.charAt(id.length - 2) + id.charAt(id.length - 1); 
        const idBtn = obtenerUltimosNumeros(id);
        const mod_contenedor = document.getElementById(`mod_contenedor-${idBtn}`);
        mod_contenedor.classList.remove('show');
    });
});

const abrirImgBtns = document.querySelectorAll('.abrir-imagen');
abrirImgBtns.forEach(abrirImgBtn => {
    abrirImgBtn.addEventListener('click', () => {
        const id = abrirImgBtn.id;
        // const idBtn = id.charAt(id.length - 2) + id.charAt(id.length - 1); 
        const idBtn = obtenerUltimosNumeros(id);
        const mod_cont = document.getElementById(`mod_cont-${idBtn}`);
        mod_cont.classList.add('show');
    });
});

const closeButtons = document.querySelectorAll('.close');
closeButtons.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        const id = closeBtn.id;
        // const idBtn = id.charAt(id.length - 2) + id.charAt(id.length - 1); 
        const idBtn = obtenerUltimosNumeros(id);
        const mod_cont = document.getElementById(`mod_cont-${idBtn}`)
        mod_cont.classList.remove('show');
    });
});

const obtenerUltimosNumeros = (cadena) => {
    const regex = /\d+$/; // Busca uno o más dígitos al final de la cadena
    const numerosEncontrados = cadena.match(regex);
    return numerosEncontrados ? numerosEncontrados[0] : null;
}