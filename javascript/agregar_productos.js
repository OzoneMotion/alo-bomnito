const maxIngredientes = 6;
const ingredientesSeleccionados = [];
const imagenesSeleccionadas = [];
const formularioIngredientes = document.getElementById('miFormulario');

// Seleccion de imagenes y visualizacion
const file = document.getElementById('imagesInput');

file.addEventListener('change', e => {
    // console.log(e);
    const reader = new FileReader();

    reader.onload = function (e) {
        inyectarImage(e);
    }
    reader.readAsDataURL(e.target.files[0])

    // console.log(e.target.files)

})

function inyectarImage(e) {
    // primero se crean los elementos html dinamicos
    const carruselWrapper = document.getElementById('carruselWrapper');
    const nuevoDiv = document.createElement('div');
    const nuevaImagen = document.createElement('img');
    // carruselWrapper.removeChild(eliminar);

    // se agregan los atributos que tenias en el html
    nuevaImagen.className = "d-block w-100";
    nuevaImagen.className = "containerImg";
    nuevoDiv.className = "carousel-item active";
    nuevaImagen.src = e.target.result;

    // por ultimo se inyectan
    nuevoDiv.appendChild(nuevaImagen);
    carruselWrapper.appendChild(nuevoDiv);
}


//Validacion de inputs
const formValidation = document.getElementById('validation');
const inputs = document.querySelectorAll('#validation input');
const textAreas = document.querySelectorAll('#validation textarea');
const btnSubmit = document.getElementById('btn_enviar');
const elements = [...inputs, ...textAreas];
const eliminar = document.getElementById("cancelar");

const regex = {
    descripcion: /^(?!\s*$)[\s\S]{1,300}$/,
    modo_uso: /^(?!\s*$)[\s\S]{1,300}$/,
    contenido: /^[0-9]+ ml|[0-9]+ g$/,
    precio: /^([0-9]{1,3})+|[0-9]+(\,[0-9]{1,3})+$/,
    cantidad_existencia: /^(0*[1-9][0-9]*|0+\.[0-9]*[1-9][0-9]*)$/,
    nombre: /^(?!\s*$)[\s\S]{1,20}$/,
    marca: /^(?!\s*$)[\s\S]{1,20}$/
}

const names = {
    cantidad_existencia: false,
    nombre: false,
    marca: false,
    precio: false,
    contenido: false,
    descripcion: false,
    modo_uso: false,
}

const formNamesValidation = (e) => {
    const validations = {
        "descripcion": regex.descripcion,
        "modo_uso": regex.modo_uso,
        "contenido": regex.contenido,
        "precio": regex.precio,
        "cantidad_existencia": regex.cantidad_existencia,
        "nombre": regex.nombre,
        "marca": regex.marca
    };

    if (validations[e.target.name]) {
        inputValidation(validations[e.target.name], e.target, e.target.name);
    }
}

elements.forEach((element) => {
    element.addEventListener('keyup', formNamesValidation);
    element.addEventListener('blur', formNamesValidation);
});

const inputValidation = (regex, input, name) => {
    const idElement = document.getElementById(`id-${name}`);
    const iconElement = document.querySelector(`#id-${name} span`);
    const feedbackEmptyElement = document.querySelector(`#id-${name} .invalid-feedback#${name}-empty`);
    const feedbackRegexElement = document.querySelector(`#id-${name} .invalid-feedback#${name}-regex`);
    const feddbackValidate = document.querySelector(`#id-${name} .containerInput`)

    if (input.value.trim() === "") {
        names[name] = false;
        // console.log(names[name])
        feedbackEmptyElement.classList.add('invalid-feedback-active');
        feedbackRegexElement.classList.remove('invalid-feedback-active');
        feddbackValidate.classList.remove('valid-feedback-active');
        feddbackValidate.classList.add('invalid-feeback-active-input');
    } else if (!regex.test(input.value)) {
        names[name] = false;
        feedbackEmptyElement.classList.remove('invalid-feedback-active');
        feedbackRegexElement.classList.add('invalid-feedback-active');
        feddbackValidate.classList.remove('valid-feedback-active');
        feddbackValidate.classList.add('invalid-feeback-active-input');
    } else {
        names[name] = true;
        feedbackEmptyElement.classList.remove('invalid-feedback-active');
        feedbackRegexElement.classList.remove('invalid-feedback-active');
        feddbackValidate.classList.remove('invalid-feeback-active-input');
        feddbackValidate.classList.add('valid-feedback-active');
    }

    idElement.classList.toggle('input-text-container-incorrect', !names[name]);
    idElement.classList.toggle('input-text-container-correct', names[name]);
    iconElement.classList.toggle('fa-times-circle', !names[name]);
    iconElement.classList.toggle('fa-check-circle', names[name]);

}

formValidation.addEventListener('submit', async (e) => {
    e.preventDefault();
    // console.log(Object.values(names).every(state => state));
    const imageInput = document.getElementById('imagesInput');
    const inputNombre = document.getElementById('nombre');
    const inputMarca = document.getElementById('marca');
    const nombreProducto = inputNombre.value;
    const marcaProducto = inputMarca.value;
    const nombreArchivos = nombreProducto[0] + nombreProducto[1] + marcaProducto[0] + marcaProducto[1];
    let index = 1;
    const archivos = imageInput.files;
    console.log(archivos);

    if (archivos.length > 0) {
        try {
            for (const archivo of archivos) {
                const extension = archivo.name.split('.').pop();
                const nombreArchivo = `aloBomnito_${nombreArchivos.toLowerCase()}_${index}.${extension}`;
                console.log(nombreArchivo);
                const conenidoBase64 = await cambiarABase64(archivo);
                const respuesta = await subirImagen(conenidoBase64, nombreArchivo);
                if (respuesta.ok) {
                    const datos = await respuesta.json();
                    const imagen = crearJsonImagenes(datos);
                    imagenesSeleccionadas.push(imagen);
                } else {
                    console.error("Error: ", respuesta.status);
                }
                index++;
            }
            alert('Imágenes subidas exitosamente a GitHub.');
        } catch (error) {
            console.error('Error al subir la imagen:', error);
        }
    } else {
        alert('Selecciona una imagen antes de enviarla.');
    }

    const datosProcesados = await obtenerJsonDatos(e.target);
    console.log(datosProcesados);
    // Enviar los datos al servidor
    enviarDatosProducto(datosProcesados);
    alert('Producto dado de alta')
});


// eliminar.addEventListener('click', (e) => {
//     console.log("hola")

// })


const obtenerJsonDatos = async (eTarget) => {
    const datos = new FormData(eTarget);
    // const datos = new FormData(formValidation);
    const datosProcesados = Object.fromEntries(datos.entries());
    datosProcesados['ingrediente'] = ingredientesSeleccionados;
    datosProcesados['imagenesProductos'] = imagenesSeleccionadas;
    datosProcesados['id_producto'] = await ultimoIdProductos() + 1;
    datosProcesados['administrador'] = JSON.parse(localStorage.getItem('usuarioActivo'));
    console.log(datosProcesados);
    console.log(datosProcesados['id_producto']);

    if (Object.values(names).every(state => state)) {
        formValidation.reset();
    }

    return datosProcesados;
}

const enviarDatosProducto = async (producto) => {
    const url = 'https://alobomnito.onrender.com/api/v1/Productos';
    //const url = 'http://localhost:3000/productos';
    try {
        const respuesta = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(producto),
        });

        if (respuesta.ok) {
            const data = await respuesta.json();
            console.log('Datos enviados correctamente:', data);
            return respuesta;
        } else if (respuesta.status === 500) {
            alert('Error de servidor');
        } else {
            console.error('Error al enviar los datos:', respuesta.status);
        }
    } catch (error) {
        console.error(error);
    }
}

const cambiarABase64 = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}

const subirImagen = async (contenidoBase64, nombreArchivo) => {
    try {
        // Obtener el token
        const respuestaToken = await fetch('https://alobomnito.onrender.com/api/v1/Admins');
        if (respuestaToken.ok) {
            const dato = await respuestaToken.json();
            const datoToken = dato[14]
            const token = `${datoToken.contrasenia}${datoToken.correo}${datoToken.num_administrador}`;
            console.log(dato);

            // Subir la imagen a GitHub
            const apiUrl = `https://api.github.com/repos/ChrisMHM/Images_Alo-Bomnito/contents/ImagenesProductos/${nombreArchivo}`;
            const respuesta = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: `Agregando mi imagen ${nombreArchivo}`,
                    content: contenidoBase64,
                }),
            });

            if (!respuesta.ok) {
                throw new Error('Error al subir la imagen a GitHub.');
            }
            return respuesta;
        } else {
            throw new Error('Error al obtener el token.');
        }
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

const crearJsonImagenes = (datos) => {
    return {
        nombre_imagen: datos.content.name,
        url: datos.content.download_url
    }
}

const ultimoIdProductos = async () => {
    try {
        const respuesta = await fetch('https://alobomnito.onrender.com/api/v1/Productos');
        if (respuesta.ok) {
            const datos = await respuesta.json();
            const idProductos = datos.map(producto => producto.id_producto);
            return Math.max(...idProductos);
        } else {
            console.error(respuesta.status);
        }
    } catch (error) {
        console.error(error);
    }
}

// JavaScript

// Obtén los datos de la API (puedes usar fetch o axios)
const obtenerDatos = async () => {
    //const url = 'https://alobomnito.onrender.com/api/v1/ingrediente';
    try {
        const respuesta = await fetch('https://alobomnito.onrender.com/api/v1/ingrediente');
        if (respuesta.ok) {
            return await respuesta.json();
        } else if (respuesta.status === 500) {
            alert('Error de servidor');
        } else {
            console.log("No se obtuvieron los datos");
        }
    } catch (error) {
        console.error(error);
    }
}

const enviarDatosIngrediente = async (ingrediente) => {
    const url = 'https://alobomnito.onrender.com/api/v1/ingrediente';
    try {
        const respuesta = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ingrediente),
        });

        if (respuesta.ok) {
            const data = await respuesta.json();
            console.log('Datos enviados correctamente:', data);
            return respuesta;
        } else if (respuesta.status === 500) {
            alert('Error de servidor');
        } else {
            console.error('Error al enviar los datos:', respuesta.status);
        }
    } catch (error) {
        console.error(error);
    }
}

const crearMenu = async (contenedor, atributosIdName) => {
    try {
        let datos = await obtenerDatos();
        const select = document.createElement('select');
        select.name = atributosIdName;
        select.id = atributosIdName;
        select.classList.add('containerInput');
        let option = document.createElement('option');
        option.textContent = "Selecciona un ingrediente";
        select.appendChild(option);

        datos.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es')).forEach(ingrediente => {
            option = document.createElement('option');
            option.value = ingrediente.id_ingrediente;
            option.textContent = ingrediente.nombre;
            select.appendChild(option);
        });
        contenedor.appendChild(select);

        select.addEventListener('change', async () => {
            const selectedValue = select.value;
            datos = await obtenerDatos();
            const ingredienteSeleccionado = datos.find(ingrediente => ingrediente.id_ingrediente === parseInt(selectedValue));
            // console.log(ingredienteSeleccionado);
            ingredientesSeleccionados.push(ingredienteSeleccionado);
            if (ingredientesSeleccionados.length < maxIngredientes) {
                console.log(ingredientesSeleccionados);
                const div = document.getElementById('ingredientesNuevos');
                // div.classList.add('containerInput');
                crearMenu(div, 'ingrediente');
            } else {
                alert('Has alcanzado el máximo de ingredientes seleccionados.');
            }
        });
    } catch (error) {
        console.error(error);
    }
}

const seleccionarOpcion = async () => {
    const label = document.querySelector('label[for="ingrediente"]');
    const atributos = label.getAttribute('for');
    await crearMenu(formularioIngredientes, atributos);
};

seleccionarOpcion();

const btnAgregarIngrediente = document.getElementById('agregarIngrediente');
btnAgregarIngrediente.addEventListener('click', () => {
    const modal = document.getElementById('modalNuevoIngrediente');
    modal.style.display = 'block';
});

// Agrega evento al botón de cierre de la ventana modal
const btnCerrarModal = document.getElementById("btnClose");
btnCerrarModal.addEventListener('click', () => {
    const modal = document.getElementById('modalNuevoIngrediente');
    modal.style.display = 'none';
});

// Agrega evento al formulario de nuevo ingrediente
const formularioNuevoIngrediente = document.getElementById('formularioNuevoIngrediente');
formularioNuevoIngrediente.addEventListener('submit', async (e) => {
    e.preventDefault();
    const modal = document.getElementById('modalNuevoIngrediente');
    const datos = await obtenerDatos();
    const nombreNuevoIngrediente = document.getElementById('nombreIngrediente').value.trim();
    const funcionNuevoIngrediente = document.getElementById('funcionIngrediente').value.trim();
    const ingredienteEncontrado = datos.find(ingrediente => ingrediente.nombre.trim().toLowerCase() === nombreNuevoIngrediente.toLowerCase());

    if (!ingredienteEncontrado) {
        const ingrediente = crearJsonIngrediente(nombreNuevoIngrediente, funcionNuevoIngrediente, datos);
        const respuesta = await enviarDatosIngrediente(ingrediente);
        if (respuesta.ok) {
            // console.log(ingrediente);
            e.preventDefault();
            const selectElement = document.getElementById('ingrediente');
            const option = document.createElement('option');
            option.value = ingrediente.id_ingrediente;
            option.textContent = ingrediente.nombre;
            selectElement.appendChild(option);
        }
        modal.style.display = 'none';
    } else {
        console.log("Encontrado");
    }
    e.stopPropagation();
});

const ultimoIdIngredientes = (datos) => {
    const idIngredientes = datos.map(ingrediente => ingrediente.id_ingrediente);
    return Math.max(...idIngredientes);
}

const idAdminIngrediente = (datos) => {
    const idAdmin = datos.map(ingrediente => ingrediente.id);
    const randomId = Math.floor(Math.random() * (idAdmin.length));
    return idAdmin[randomId];
}

const crearJsonIngrediente = (nombreIngrediente, funcionIngrediente, datos) => {
    return {
        id_ingrediente: ultimoIdIngredientes(datos) + 1,
        nombre: nombreIngrediente,
        funcion: funcionIngrediente
    }
}