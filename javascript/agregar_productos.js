const maxIngredientes = 6;
const ingredientesSeleccionados = [];
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
    console.log(Object.values(names).every(state => state));
    const imageInput = document.getElementById('imagesInput');
    const files = imageInput.files;

    if (files.length > 0) {
        try {
            // const formData = new FormData();
            for (const file of files) {
                const fileName = file.name;
                const base64Content = await cambiarABase64(file);
                const response = await subirImagen(base64Content, fileName);
                const data = await response.json();
                const url = data.content.download_url;
                console.log(url);
            }

            alert('Imágenes subidas exitosamente a GitHub.');
        } catch (error) {
            console.error('Error al subir la imagen:', error);
        }
    } else {
        alert('Selecciona una imagen antes de enviarla.');
    }

    const datosProcesados = obtenerJsonDatos(e.target);
});


// eliminar.addEventListener('click', (e) => {
//     console.log("hola")

// })


const obtenerJsonDatos = (eTarget) => {
    const datos = new FormData(eTarget);
    // const datos = new FormData(formValidation);
    const datosProcesados = Object.fromEntries(datos.entries());
    console.log(datosProcesados);

    if (Object.values(names).every(state => state)) {
        formValidation.reset();
    }

    return datosProcesados;
}

// const postData = async () => {
//     const newUser = getData();

//     try {
//         const response = await fetch("http://localhost:3000/productos", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(newUser)
//         })
//         if (response.ok) {
//             const jsonResponse = await response.json()
//         }
//     }
//     catch (error) { console.log(error) }
// }

const cambiarABase64 = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}

const subirImagenasync = async (base64Content, fileName) => {
    const apiUrl = `https://api.github.com/repos/ChrisMHM/Github-API-test/contents/ImagenesProductos/${fileName}`;
    const token = '';

    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'Agregando mi imagen',
                content: base64Content
            }),
        });

        if (!response.ok) {
            throw new Error('Error al subir la imagen a GitHub.');
        }
        return response;
    } catch (error) {
        throw error;
    }
}

// JavaScript

// Obtén los datos de la API (puedes usar fetch o axios)
const obtenerDatos = async () => {
    // const url = 'https://alobomnito.onrender.com/api/v1/ingrediente';
    const url = 'http://localhost:3000/ingrediente';
    try {
        const respuesta = await fetch(url);
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

const enviarDatos = async (ingrediente) => {
    // const url = 'https://alobomnito.onrender.com/api/v1/ingrediente';
    const url = 'http://localhost:3000/ingrediente';
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
            console.log(ingredienteSeleccionado);
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
const btnCerrarModal = document.querySelector('.close');
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
        const respuesta = await enviarDatos(ingrediente);
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
    return Math.max(...idIngredientes) + 1;
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
        // ,
        // id: idAdminIngrediente(datos)
    }
}