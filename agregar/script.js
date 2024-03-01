// JavaScript
const maxIngredientes = 6;
const ingredientesSeleccionados = [];
const formularioIngredientes = document.getElementById('miFormulario');
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
        datos.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es')).forEach(ingrediente => {
            const option = document.createElement('option');
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
                crearMenu(div, 'ingredientes');
            } else {
                alert('Has alcanzado el máximo de ingredientes seleccionados.');
            }
        });
    } catch (error) {
        console.error(error);
    }
}

const seleccionarOpcion = async () => {
    const label = document.querySelector('label[for="ingredientes"]');
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
    console.log(e.cancelable);
    const modal = document.getElementById('modalNuevoIngrediente');
    const datos = await obtenerDatos();
    const nombreNuevoIngrediente = document.getElementById('nombreIngrediente').value.trim();
    const funcionNuevoIngrediente = document.getElementById('funcionIngrediente').value.trim();
    const ingredienteEncontrado = datos.find(ingrediente => ingrediente.nombre.trim().toLowerCase() === nombreNuevoIngrediente.toLowerCase());

    if (!ingredienteEncontrado) {
        const ingrediente = crearJsonIngrediente(nombreNuevoIngrediente, funcionNuevoIngrediente, datos);
        await enviarDatos(ingrediente);
        // if (respuesta.ok) {
        console.log(ingrediente);
        const selectElement = document.getElementById('ingredientes');
        const option = document.createElement('option');
        option.value = ingrediente.id_ingrediente;
        option.textContent = ingrediente.nombre;
        selectElement.appendChild(option);
        // }
        modal.style.display = 'none';
    } else {
        console.log("Encontrado");
    }
    e.stopPropagation();
});

const ultimoIdIngredientes = (datos) => {
    // const idIngredientes = datos.map(ingrediente => ingrediente.id_ingrediente);
    // console.log(idIngredientes.sort());
    return datos.length;
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
        funcion: funcionIngrediente,
        id: idAdminIngrediente(datos)
    }
}